'use client';

/**
 * AtomCore.tsx — React + TypeScript wrapper around the Atom Core Canvas animation.
 *
 * Responsibilities of this file (everything the engine in atomCoreEngine.ts
 * deliberately does NOT do):
 *   • Owns the requestAnimationFrame / setTimeout animation loop.
 *   • Throttles to ~30 fps (IDLE_FRAME_DELAY_MS = 24 ms) when idle to save
 *     power — mirrors Android's scheduleNextFrame() Handler delay.
 *   • Pauses the loop when the document is hidden or the canvas is scrolled
 *     off-screen — mirrors Android's isShown() guard in scheduleNextFrame().
 *   • Sizes the canvas backing store to physical pixels via devicePixelRatio
 *     and tracks container resize via ResizeObserver — mirrors onSizeChanged().
 *   • Applies the muted CSS filter (saturate(0.15) opacity(0.55)) — mirrors
 *     Android's ColorMatrix layer colour-filter at saturation 0.15 + alpha 140.
 *   • Exposes both a prop-driven API (energy, muted) and an imperative handle
 *     (setEnergy, setMuted) via forwardRef / useImperativeHandle so callers
 *     like a mic-amplitude callback can drive it without touching React state.
 */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from 'react';
import { createAtomCoreState, tickAndDraw, type AtomCoreState } from './atomCoreEngine';

/** ~30 fps throttle when idle, matching Android's IDLE_FRAME_DELAY_MS. */
const IDLE_FRAME_DELAY_MS = 24;

// ─── Public API types ─────────────────────────────────────────────────────────

/**
 * Props accepted by the <AtomCore /> component.
 *
 * Changes to `energy` and `muted` are applied to the animation state ref
 * without triggering a React re-render, so rapid updates (e.g. from audio
 * analysis) are safe and cheap.
 */
export interface AtomCoreProps {
  /**
   * Desired animation energy level in the range [0, 1].
   *   0 = fully idle: slow orbit speed, dim glow, throttled to ~30 fps.
   *   1 = fully engaged: fast orbit, bright glow, full rAF cadence.
   * The engine eases the current value toward the target each frame — there
   * are no jarring jumps when this prop changes.
   * Default: 0.
   */
  energy?: number;

  /**
   * When true, the atom renders in a near-grayscale, dimmed state via a CSS
   * `filter: saturate(0.15) opacity(0.55)` applied to the <canvas> element.
   * This faithfully mirrors the Android ColorMatrix muted look (saturation 0.15,
   * layer alpha 140/255 ≈ 0.549).
   * Default: false.
   */
  muted?: boolean;

  /**
   * Fixed CSS pixel size.  Both width and height are set to this value, making
   * the canvas a square.
   * If omitted the canvas fills its containing block (width: 100%, height: 100%).
   * The parent must have a defined height when `size` is omitted.
   */
  size?: number;

  /** CSS class forwarded to the <canvas> element. */
  className?: string;

  /** Inline styles merged onto the <canvas> element after the layout defaults. */
  style?: CSSProperties;
}

/**
 * Imperative handle exposed via forwardRef.
 *
 * Lets non-React-state callers (e.g. a WebAudio amplitude handler) drive the
 * animation exactly as Android's setEnergy() / setMuted() drove the View.
 * Calling these methods bypasses React's render cycle entirely.
 */
export interface AtomCoreHandle {
  /** Set energy level (clamped to 0..1).  Takes effect on the next frame. */
  setEnergy: (v: number) => void;
  /** Toggle the muted look.  Applied synchronously to the CSS filter. */
  setMuted: (b: boolean) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AtomCore = forwardRef<AtomCoreHandle, AtomCoreProps>(function AtomCore(
  { energy = 0, muted = false, size, className, style }: AtomCoreProps,
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Mutable animation state owned here and passed by reference to the engine.
   * Never lives in React state — mutations must not cause re-renders.
   */
  const stateRef = useRef<AtomCoreState>(createAtomCoreState());

  /**
   * Last-measured container dimensions in CSS pixels.
   * Updated by ResizeObserver; read each frame to compute physical-pixel sizes.
   */
  const cssSizeRef = useRef({ cssWidth: 0, cssHeight: 0 });

  /**
   * Timestamp (performance.now ms) of the last rendered frame.
   * -1 signals "seed the next frame" — prevents a large dt spike after a pause.
   */
  const lastFrameMsRef = useRef<number>(-1);

  // ─── Sync energy prop → state ref (no re-render) ─────────────────────────
  useEffect(() => {
    stateRef.current.targetEnergy = Math.max(0, Math.min(1, energy));
  }, [energy]);

  // ─── Sync muted prop → state ref + CSS filter ────────────────────────────
  useEffect(() => {
    stateRef.current.muted = muted;
    if (canvasRef.current) {
      applyMutedFilter(canvasRef.current, muted);
    }
  }, [muted]);

  // ─── Imperative handle ────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    setEnergy(v: number) {
      stateRef.current.targetEnergy = Math.max(0, Math.min(1, v));
    },
    setMuted(b: boolean) {
      stateRef.current.muted = b;
      if (canvasRef.current) {
        applyMutedFilter(canvasRef.current, b);
      }
    },
  }));

  // ─── ResizeObserver: HiDPI backing store ─────────────────────────────────
  // Mirrors onSizeChanged(): whenever the canvas' CSS layout rect changes,
  // recompute the physical backing store size (width × dpr, height × dpr) and
  // update cssSizeRef so the next tickAndDraw call uses the new geometry.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const applySize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Use the `size` prop directly when fixed; otherwise read the CSS layout box.
      // getBoundingClientRect is reliable post-layout and includes CSS transforms.
      const rect       = canvas.getBoundingClientRect();
      const cssWidth   = size !== undefined ? size : rect.width;
      const cssHeight  = size !== undefined ? size : rect.height;
      if (cssWidth === 0 || cssHeight === 0) return; // not yet laid out

      canvas.width  = Math.round(cssWidth  * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      cssSizeRef.current = { cssWidth, cssHeight };
      // Reset frame timestamp so dt is seeded correctly after a resize,
      // preventing a jump caused by the time spent in the resize handler.
      lastFrameMsRef.current = -1;
    };

    applySize(); // synchronous initial sizing
    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [size]); // re-run only when the size prop changes between fixed and fluid

  // ─── Animation loop ───────────────────────────────────────────────────────
  // The loop uses requestAnimationFrame when the animation is active and a
  // 24 ms setTimeout when it is idle — mirroring Android's Handler-based
  // scheduleNextFrame() with IDLE_FRAME_DELAY_MS.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dual pause flags: the loop stops if either condition is true.
    //   docHidden  — document.hidden; set by visibilitychange listener
    //   offscreen  — element not intersecting viewport; set by IntersectionObserver
    // Mirroring Android's scheduleNextFrame() which bails when isShown() === false.
    let docHidden = document.hidden;
    let offscreen = false;
    const shouldPause = () => docHidden || offscreen;

    let rafId:     number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let mounted    = true;

    /** Cancel any pending rAF or setTimeout schedule. */
    const cancelPending = () => {
      if (rafId     !== undefined) { cancelAnimationFrame(rafId);   rafId     = undefined; }
      if (timeoutId !== undefined) { clearTimeout(timeoutId); timeoutId = undefined; }
    };

    /**
     * Schedule the next frame.
     * Idle = targetEnergy===0 && energy<0.01: use setTimeout(24ms) → ~30fps.
     * Active: use requestAnimationFrame → native display cadence (~60fps).
     * Mirrors Android's scheduleNextFrame() which posts to a Handler with a
     * delay when idle and posts immediately (0 ms) when active.
     */
    const scheduleNext = () => {
      if (!mounted || shouldPause()) return;
      const s    = stateRef.current;
      const idle = s.targetEnergy === 0 && s.energy < 0.01;
      if (idle) {
        timeoutId = setTimeout(() => render(performance.now()), IDLE_FRAME_DELAY_MS);
      } else {
        rafId = requestAnimationFrame(render);
      }
    };

    /**
     * One animation frame: compute dt, call the engine, then schedule the next.
     * Mirrors Android's onDraw() → invalidate() cycle.
     */
    const render = (now: number) => {
      rafId     = undefined;
      timeoutId = undefined;
      if (!mounted || shouldPause()) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) { scheduleNext(); return; }

      const { cssWidth, cssHeight } = cssSizeRef.current;
      if (cssWidth === 0 || cssHeight === 0) { scheduleNext(); return; }

      // Seed dt on first frame or after a resume-from-pause so we do not
      // produce a giant dt spike (which would cause a visible phase jump).
      if (lastFrameMsRef.current < 0) lastFrameMsRef.current = now;
      const dt = Math.min((now - lastFrameMsRef.current) / 1000, 0.05); // clamp: max 0.05 s
      lastFrameMsRef.current = now;

      tickAndDraw(ctx, stateRef.current, dt, cssWidth, cssHeight, window.devicePixelRatio || 1);

      // Re-apply the muted filter defensively each frame — cheap and guards
      // against any browser that might clear canvas element styles.
      applyMutedFilter(canvas, stateRef.current.muted);

      scheduleNext();
    };

    // Pause when the browser tab/window is hidden.
    // Mirrors Android's onWindowVisibilityChanged / scheduleNextFrame guard.
    const onVisibilityChange = () => {
      docHidden = document.hidden;
      if (!docHidden) {
        lastFrameMsRef.current = -1; // seed dt to avoid spike after hidden period
        scheduleNext();
      } else {
        cancelPending();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Pause when the canvas is scrolled entirely off screen.
    // Mirrors Android's isShown() / view.getVisibility() check.
    const io = new IntersectionObserver((entries) => {
      offscreen = !(entries[0]?.isIntersecting ?? true);
      if (!offscreen) {
        lastFrameMsRef.current = -1;
        scheduleNext();
      } else {
        cancelPending();
      }
    });
    io.observe(canvas);

    // Kick off the loop
    scheduleNext();

    return () => {
      mounted = false;
      cancelPending();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      io.disconnect();
    };
  }, []); // intentionally empty — props flow via refs, loop is self-sustaining

  // ─── Render ───────────────────────────────────────────────────────────────
  // Layout strategy:
  //   • `size` provided → fixed square in CSS pixels (canvas is its own container)
  //   • `size` omitted  → width/height 100% to fill the parent block
  //     The parent must supply a defined height when size is omitted.
  const canvasStyle: CSSProperties = {
    display: 'block', // eliminates inline-baseline gap beneath the canvas
    width:   size !== undefined ? size : '100%',
    height:  size !== undefined ? size : '100%',
    ...style,
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={canvasStyle}
    />
  );
});

// ─── Internal utilities ───────────────────────────────────────────────────────

/**
 * applyMutedFilter — applies or clears the muted CSS filter on the canvas.
 *
 * Mirrors Android's ColorMatrix muted mode: saturation 0.15 + layer alpha
 * 140/255 ≈ 0.549.  Canvas 2D has no per-paint ColorMatrix API so we use a
 * CSS filter on the element, which composites the entire rendered frame at once.
 */
function applyMutedFilter(canvas: HTMLCanvasElement, muted: boolean): void {
  canvas.style.filter = muted ? 'saturate(0.15) opacity(0.549)' : '';
}
