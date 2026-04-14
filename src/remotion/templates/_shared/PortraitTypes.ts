/**
 * Type scale for 1080×1920 portrait video.
 *
 * Landscape templates use TYPE from layouts.ts which is calibrated for
 * 1280×720 (broadcast minimum 24px = 2% of frame height). When a phone
 * holds the video at full screen, the phone's actual rendered width is
 * around 400-500px, so 24px on a 1080-wide canvas becomes ~10px on screen
 * — unreadable in the feed.
 *
 * Portrait video gets watched on the phone in vertical full-screen, so we
 * scale UP the minimums:
 *
 *   Landscape min body: 24px on 720h canvas → ~13px on phone (bad)
 *   Portrait min body:  56px on 1920h canvas → ~22px on phone (readable)
 *
 * Source: legibility.info "Rules for text in videos" + Robust Branding
 * mobile typography guidelines (recommend 40-60px minimum on full HD).
 */

/** Pixel sizes calibrated for 1080×1920 portrait, viewed full-screen on phone. */
export const PORTRAIT_TYPE = {
  /** Massive headline — one per scene, max 3 words */
  hero: 128,
  /** Scene title — 4-7 words */
  title: 96,
  /** Subhead, supporting line under hero */
  subtitle: 72,
  /** Body copy — minimum readable on phone in feed */
  body: 56,
  /** Labels, badges, step counters */
  label: 48,
  /** Captions, timestamps, fine print — absolute minimum */
  caption: 40,
} as const;

/** Spacing scale for portrait. Larger than landscape to match the bigger type. */
export const PORTRAIT_SPACE = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
  xxl: 96,
} as const;

/** Standard side padding for portrait (matches landscape PADDING=80 ratio). */
export const PORTRAIT_PADDING = 64;

/** Top safe inset before native UI overlays (default — override per platform). */
export const PORTRAIT_TOP_SAFE = 220;

/** Bottom safe inset before native UI overlays (default — override per platform). */
export const PORTRAIT_BOTTOM_SAFE = 280;

/**
 * Returns the maximum content width (canvas - 2× padding) for portrait.
 * Use this when sizing text containers so they never bleed to the edge.
 */
export function portraitContentWidth(canvasWidth: number = 1080): number {
  return canvasWidth - PORTRAIT_PADDING * 2;
}
