/**
 * colors.ts — Brand palette constants and colour-math helpers.
 *
 * The three palette colours match the Android source exactly:
 *   ACCENT       = #BF94FF  (primary purple)
 *   ACCENT_BRIGHT = #D6B8FF (lighter lavender, used for electron highlight)
 *   ACCENT_DEEP  = #8C5CF0  (deeper violet, used in nucleus gradient tail)
 *
 * The muted ColorMatrix (saturation 0.15, layer alpha 140/255) from the
 * Android source is NOT applied here — it is handled at the component layer
 * as a CSS filter on the <canvas> element (see AtomCore.tsx).
 */

export const ACCENT        = '#BF94FF' as const;
export const ACCENT_BRIGHT = '#D6B8FF' as const;
export const ACCENT_DEEP   = '#8C5CF0' as const;

/** Parse a 6-digit hex colour string into [r, g, b] (0-255 each). */
function hexToRgb(hex: string): readonly [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

/**
 * withAlpha(hex, alpha) — mirrors Android's withAlpha / paint.setAlpha.
 * Converts a 6-digit hex colour + a 0-255 integer alpha into an rgba() CSS
 * colour string suitable for Canvas 2D fillStyle / strokeStyle / shadowColor.
 *
 * Alpha is clamped to [0, 255] and rounded before conversion.
 */
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.max(0, Math.min(255, Math.round(alpha)));
  const [r, g, b] = hexToRgb(hex);
  // Use 4 decimal places so tiny alphas (e.g. 0.0039) are not rounded to 0.
  return `rgba(${r},${g},${b},${(a / 255).toFixed(4)})`;
}

/**
 * frac(v) — fractional part of v.
 * Used for the aura-ring phase wrapping in drawAuraRings.
 * Mirrors the Android helper: v - Math.floor(v).
 */
export function frac(v: number): number {
  return v - Math.floor(v);
}

/**
 * lerp(a, b, t) — linear interpolation from a to b at fraction t.
 * Used for aura-ring radius lerp.
 * Mirrors the Android helper: a + (b - a) * t.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Convert degrees to radians — mirrors Android Math.toRadians(). */
export function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}
