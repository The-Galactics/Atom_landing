/**
 * atomCoreEngine.ts — Framework-agnostic Canvas 2D rendering engine for the
 * Atom Core animation.
 *
 * This module contains no React imports and carries no lifecycle logic.  It
 * accepts a CanvasRenderingContext2D and a mutable AtomCoreState, updates the
 * physics, then paints one complete frame.  The rAF/setTimeout loop, resize
 * handling, and prop wiring all live in AtomCore.tsx.
 *
 * ─── Android → Canvas 2D mapping (overview) ────────────────────────────────
 *   RadialGradient       → ctx.createRadialGradient(cx,cy,0, cx,cy,R)
 *   SweepGradient        → ctx.createConicGradient(startAngle, cx, cy)
 *   BlurMaskFilter glow  → ctx.shadowColor + ctx.shadowBlur on same-colour shape
 *   canvas.rotate(deg)   → ctx.translate(cx,cy) / ctx.rotate(rad) / ctx.translate(-cx,-cy)
 *   canvas.scale(s,cx,cy)→ same translate-scale-translate pattern
 *   onDraw / invalidate  → rAF callback in AtomCore.tsx
 *   onSizeChanged        → ResizeObserver in AtomCore.tsx
 *   ColorMatrix (muted)  → CSS filter on <canvas> in AtomCore.tsx
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Ported 1:1 from AtomCoreView.java.  All numeric constants match the source.
 */

import { ACCENT, ACCENT_BRIGHT, ACCENT_DEEP, withAlpha, frac, lerp, toRadians } from './colors';

// ─── Orbit parameters ────────────────────────────────────────────────────────
// Three orbital planes at different tilts, speeds, and phase offsets.
// The depth-split in drawOrbitsAndElectrons relies on sin(a) to decide whether
// an electron is in the front or back half of its ellipse.

const ORBIT_TILT_DEG: number[] = [0, 62, 121];    // degrees; applied as canvas rotation
const ORBIT_SPEED:    number[] = [1.0, -0.78, 1.32]; // neg = counter-clockwise orbit
const ORBIT_OFFSET:   number[] = [0, 2.1, 4.2];   // initial phase offset per orbit (radians)

// ─── Public types ─────────────────────────────────────────────────────────────

/**
 * Mutable animation state owned by the component and mutated in-place each frame.
 * Keeping state in a plain object (not React state) lets the engine run without
 * triggering re-renders.
 */
export interface AtomCoreState {
  /** Current smoothed energy (0..1); lerps toward targetEnergy each frame. */
  energy: number;
  /** Target energy set imperatively or via prop; clamped 0..1. */
  targetEnergy: number;
  /** Ever-advancing phase accumulator (radians, unbounded). Drives all motion. */
  phase: number;
  /** Whether the muted look is requested; read by AtomCore.tsx for CSS filter. */
  muted: boolean;
}

/** Create zeroed initial state — call once at component mount. */
export function createAtomCoreState(): AtomCoreState {
  return { energy: 0, targetEnergy: 0, phase: 0, muted: false };
}

// ─── Main entry point ─────────────────────────────────────────────────────────

/**
 * tickAndDraw — update physics then paint one complete frame.
 *
 * Called by the rAF/setTimeout loop in AtomCore.tsx once per frame.
 * The canvas backing store must already be sized to physical pixels
 * (canvas.width = cssWidth * dpr, canvas.height = cssHeight * dpr).
 *
 * @param ctx       Canvas 2D rendering context (physical-pixel coordinate space)
 * @param state     Mutable animation state; updated in place
 * @param dt        Elapsed seconds since the last frame, already clamped to 0.05 s
 * @param cssWidth  Container width in CSS pixels
 * @param cssHeight Container height in CSS pixels
 * @param dpr       window.devicePixelRatio (converts CSS px to physical px)
 */
export function tickAndDraw(
  ctx: CanvasRenderingContext2D,
  state: AtomCoreState,
  dt: number,
  cssWidth: number,
  cssHeight: number,
  dpr: number,
): void {
  // Physical-pixel canvas dimensions (the coordinate system we draw in)
  const w = cssWidth * dpr;
  const h = cssHeight * dpr;
  const cx     = w / 2;
  const cy     = h / 2;
  const radius = Math.min(w, h) / 2; // matches Android's: radius = min(width,height)/2

  // ── Physics update (mirrors onDraw top section) ───────────────────────────
  // energy eases toward targetEnergy: same formula as the Android source.
  state.energy += (state.targetEnergy - state.energy) * Math.min(1, dt * 4);
  // Slowed down for a calmer, more elegant orbit (was 0.5 + energy * 1.15).
  const speed = 0.22 + state.energy * 0.5;
  state.phase += dt * speed;

  // breathe oscillates ±1; pulse multiplies radii to give the atom a slow
  // breathing motion even when fully idle.
  const breathe = Math.sin(state.phase * 1.15);
  const pulse   = 1.0 + 0.055 * breathe + 0.03 * state.energy;

  // ── Clear ─────────────────────────────────────────────────────────────────
  ctx.clearRect(0, 0, w, h);

  // ── Draw order: back to front (matches onDraw call sequence) ─────────────
  drawBackgroundGlow(ctx, cx, cy, radius, state.energy, pulse);
  drawAuraRings(ctx, cx, cy, radius, state.energy, state.phase);
  drawOrbitsAndElectrons(ctx, cx, cy, radius, state.energy, state.phase, /*front=*/false);
  drawMainRing(ctx, cx, cy, radius, state.energy, state.phase, pulse);
  drawNucleus(ctx, cx, cy, radius, state.energy, pulse);
  drawOrbitsAndElectrons(ctx, cx, cy, radius, state.energy, state.phase, /*front=*/true);
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────

/**
 * drawBackgroundGlow — large diffuse bloom behind the entire atom.
 *
 * Android: RadialGradient(cx, cy, 0, cx, cy, radius*0.98)
 *   stops: ACCENT@90, ACCENT_DEEP@38, transparent at positions 0/0.55/1
 *   Paint alpha = 140 + 100*energy  (scales the whole gradient's opacity)
 *   Canvas scaled by `pulse` about (cx,cy) before fill
 *
 * Canvas 2D: createRadialGradient; ctx.globalAlpha for paint-alpha equivalent;
 *   translate/scale/translate for the pulse scale-about-center.
 */
function drawBackgroundGlow(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  energy: number, pulse: number,
): void {
  const r = radius * 0.98;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0,    withAlpha(ACCENT_BRIGHT, 110));
  grad.addColorStop(0.35, withAlpha(ACCENT, 70));
  grad.addColorStop(0.6,  withAlpha(ACCENT_DEEP, 42));
  grad.addColorStop(1,    'rgba(0,0,0,0)');

  ctx.save();
  // Scale about (cx,cy) to apply the breathing pulse to the glow radius
  ctx.translate(cx, cy);
  ctx.scale(pulse, pulse);
  ctx.translate(-cx, -cy);
  // globalAlpha acts as the paint alpha multiplier (Android: paint.setAlpha)
  ctx.globalAlpha = (140 + 100 * energy) / 255;
  ctx.fillStyle   = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore(); // resets globalAlpha and transform
}

/**
 * drawAuraRings — three concentric rings that expand outward from ~34% radius to
 * ~98% and fade as they grow, creating a pulsing halo.
 *
 * Android: for k=0..2, p = frac(phase*0.13 + k/3), lerp radius, fade alpha.
 * Canvas 2D: no special mapping needed — direct stroke arcs.
 */
function drawAuraRings(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  energy: number, phase: number,
): void {
  ctx.save();
  ctx.lineWidth = radius * 0.014;
  // Soft outer glow on the expanding rings for a richer halo.
  ctx.shadowColor = withAlpha(ACCENT_BRIGHT, 255);
  ctx.shadowBlur  = radius * 0.03;
  for (let k = 0; k < 4; k++) {
    const p     = frac(phase * 0.13 + k / 4);        // 0..1, wraps continuously
    const r     = lerp(radius * 0.34, radius * 0.98, p); // grows outward
    const alpha = (1 - p) * (80 + 70 * energy);      // fades as it expands
    ctx.strokeStyle = withAlpha(ACCENT, alpha);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * drawMainRing — the primary orbital ring around the nucleus, rendered in two passes.
 *
 * Pass 1 — Blurred glow underlay (wide stroke with shadowBlur):
 *   Android: separate Paint with BlurMaskFilter(radius*0.06, NORMAL)
 *   Canvas 2D: ctx.shadowBlur + ctx.shadowColor on the same stroke
 *
 * Pass 2 — Crisp conic-gradient ring:
 *   Android: SweepGradient [ACCENT@30, ACCENT_BRIGHT@255, ACCENT@70, …] then
 *            canvas.rotate(Math.toDegrees(phase * 0.85), cx, cy)
 *   Canvas 2D: ctx.createConicGradient(0, cx, cy) — start angle 0 = 3 o'clock,
 *            sweeping clockwise, same as Android's default SweepGradient.
 *            Canvas is rotated by phase*0.85 radians (same angle, different unit)
 *            so the bright spot travels with the phase.
 */
function drawMainRing(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  energy: number, phase: number, pulse: number,
): void {
  const r = radius * 0.44 * pulse;

  // ── Pass 1: glow underlay ─────────────────────────────────────────────────
  ctx.save();
  ctx.shadowColor = withAlpha(ACCENT, 255); // full-alpha shadow for maximum spread
  ctx.shadowBlur  = radius * 0.06;          // matches Android BlurMaskFilter radius
  ctx.strokeStyle = withAlpha(ACCENT, 55 + 90 * energy);
  ctx.lineWidth   = radius * 0.05;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore(); // clears shadowBlur before pass 2

  // ── Pass 2: crisp conic ring ──────────────────────────────────────────────
  // Rotate the canvas so the gradient's bright spot sweeps with the animation.
  // Android: canvas.rotate(Math.toDegrees(phase*0.85))  → same as rotating by
  //          phase*0.85 radians (toDegrees/toRadians cancel out in intent).
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(phase * 0.85); // radians — matches Android's rotation in practice
  ctx.translate(-cx, -cy);

  // SweepGradient → createConicGradient
  // Android stops: ACCENT@30, ACCENT_BRIGHT@255, ACCENT@70, ACCENT_BRIGHT@255, ACCENT@30
  //   at positions: 0, 0.25, 0.5, 0.75, 1
  // createConicGradient(startAngle, x, y): startAngle=0 → 3 o'clock, sweeps CW.
  // This matches Android SweepGradient's default orientation.
  const conic = ctx.createConicGradient(0, cx, cy);
  conic.addColorStop(0,    withAlpha(ACCENT, 30));
  conic.addColorStop(0.25, withAlpha(ACCENT_BRIGHT, 255));
  conic.addColorStop(0.5,  withAlpha(ACCENT, 70));
  conic.addColorStop(0.75, withAlpha(ACCENT_BRIGHT, 255));
  conic.addColorStop(1,    withAlpha(ACCENT, 30));

  ctx.strokeStyle = conic;
  ctx.lineWidth   = radius * 0.022 + radius * 0.01 * energy; // thickens with energy
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

/**
 * drawNucleus — the bright, pulsing core at the centre of the atom.
 *
 * Three concentric layers (drawn back to front):
 *   (1) Bloom halo  — large blurred filled circle; shadowBlur creates the glow.
 *                     Android: filled circle with BlurMaskFilter(NORMAL)
 *   (2) Body        — radial gradient #FFFFFF → ACCENT_BRIGHT → ACCENT_DEEP@210.
 *                     Android: RadialGradient paint scaled by pulse
 *   (3) Hot centre  — tiny white dot for the overexposed core look.
 *                     Android: small filled circle at #FFFFFF@230 (0xE6)
 */
function drawNucleus(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  energy: number, pulse: number,
): void {
  const nr = radius * 0.15; // nucleus radius (unscaled)

  // (1) Bloom halo
  ctx.save();
  ctx.shadowColor = withAlpha(ACCENT_BRIGHT, 255);
  ctx.shadowBlur  = radius * 0.08;
  ctx.fillStyle   = withAlpha(ACCENT_BRIGHT, 110 + 110 * energy);
  ctx.beginPath();
  ctx.arc(cx, cy, nr * 1.9 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // (2) Body — radial gradient, scaled by pulse about the centre
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(pulse, pulse);
  ctx.translate(-cx, -cy);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.16);
  grad.addColorStop(0,    '#FFFFFF');
  grad.addColorStop(0.45, ACCENT_BRIGHT);
  grad.addColorStop(1,    withAlpha(ACCENT_DEEP, 210));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, nr, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // (3) Hot centre — #FFFFFF @ alpha 230 (0xE6 in the Android source)
  ctx.save();
  ctx.fillStyle = withAlpha('#FFFFFF', 230);
  ctx.beginPath();
  ctx.arc(cx, cy, nr * 0.4 * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * drawOrbitsAndElectrons — two-pass depth-split for orbit tracks and electrons.
 *
 * Called twice per frame: once with front=false (back pass), once with front=true.
 *
 * BACK PASS (front=false):
 *   • Draws the tilted elliptical orbit track for every orbit.
 *   • Draws electrons whose sin(a) < 0 — i.e. moving "behind" the nucleus in Z.
 *     These are drawn before the main ring and nucleus so they appear underneath.
 *
 * FRONT PASS (front=true):
 *   • No orbit tracks (already painted in back pass).
 *   • Draws electrons whose sin(a) ≥ 0 — moving "in front" of the nucleus in Z.
 *     These are drawn last so they appear on top of everything.
 *
 * Depth cue: depth = 0.62 + 0.38*sin(a) — electron radius and glow alpha scale
 * with apparent Z-depth so near electrons look larger and brighter than far ones.
 *
 * Orbit tilt: Android applies canvas.rotate(ORBIT_TILT[i], cx, cy) before drawing
 * the oval, which matches our translate-rotate-translate pattern.
 *
 * Electron position: standard 2D rotation of the ellipse parametric point
 *   (orbRx*cos(a), orbRy*sin(a)) by the orbit's tilt angle.
 */
function drawOrbitsAndElectrons(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  energy: number, phase: number,
  front: boolean,
): void {
  const orbRx = radius * 0.64; // ellipse semi-major axis (horizontal, pre-tilt)
  const orbRy = radius * 0.26; // ellipse semi-minor axis (vertical, pre-tilt)

  for (let i = 0; i < 3; i++) {
    const tiltRad = toRadians(ORBIT_TILT_DEG[i]!); // non-null: array has exactly 3 elements

    // ── Orbit track (back pass only) ─────────────────────────────────────────
    if (!front) {
      // Rotate the canvas about (cx,cy) by the orbit's tilt angle, draw the
      // ellipse centred at (cx,cy) in the tilted coordinate frame.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tiltRad);
      ctx.translate(-cx, -cy);
      ctx.strokeStyle = withAlpha(ACCENT, 26 + 34 * energy); // dim, grows with energy
      ctx.lineWidth   = radius * 0.006;
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbRx, orbRy, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ── Electron ─────────────────────────────────────────────────────────────
    // Parametric angle along this orbit's ellipse
    const a = phase * ORBIT_SPEED[i]! * 1.25 + ORBIT_OFFSET[i]!;

    // Depth split: electrons with sin(a) ≥ 0 are on the near (front) half of
    // the ellipse; those with sin(a) < 0 are on the far (back) half.
    // Skip if this electron belongs to the other pass.
    const isFront = Math.sin(a) >= 0;
    if (isFront !== front) continue;

    // Project the ellipse parametric point into world coordinates by rotating
    // through the orbit tilt.  This is the standard 2D rotation formula applied
    // to (ex, ey) = (orbRx*cos(a), orbRy*sin(a)).
    const ex = orbRx * Math.cos(a);
    const ey = orbRy * Math.sin(a);
    const px = cx + ex * Math.cos(tiltRad) - ey * Math.sin(tiltRad);
    const py = cy + ex * Math.sin(tiltRad) + ey * Math.cos(tiltRad);

    // Depth cue — ranges 0.24..1.0 (back..front)
    const depth = 0.62 + 0.38 * Math.sin(a);
    const er    = radius * 0.034 * depth; // electron radius, larger when near

    // Glow (BlurMaskFilter → shadowBlur on a larger surrounding circle)
    ctx.save();
    ctx.shadowColor = withAlpha(ACCENT_BRIGHT, 255);
    ctx.shadowBlur  = radius * 0.035; // matches Android blur radius factor
    ctx.fillStyle   = withAlpha(ACCENT_BRIGHT, 130 * depth); // dims when far
    ctx.beginPath();
    ctx.arc(px, py, er * 2.3, 0, Math.PI * 2); // wider halo circle
    ctx.fill();
    ctx.restore();

    // Electron body — crisp, full-alpha ACCENT_BRIGHT circle
    ctx.save();
    ctx.fillStyle = withAlpha(ACCENT_BRIGHT, 255);
    ctx.beginPath();
    ctx.arc(px, py, er, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
