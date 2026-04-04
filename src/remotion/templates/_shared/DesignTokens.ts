/**
 * DesignTokens - Single source of truth for all visual constants.
 *
 * GUIDELINES:
 *
 * Typography
 * ----------
 * All font sizes are in pixels for a 1280×720 video frame.
 * Broadcast minimum for readable text: ~2% of frame height = 24px.
 * Never go below TYPE.caption (24px) for any visible text.
 * TYPE.body (32px) is the minimum for body copy. TYPE.label (26px)
 * is the minimum for supporting labels and badges.
 * When exported as a thumbnail (~4x smaller), TYPE.caption renders
 * at ~6px screen pixels - still legible at small sizes.
 *
 * Spacing
 * -------
 * All spacing tokens are in pixels. Use SPACE.* for margins and
 * padding. Use PADDING / PADDING_NARROW from layouts.ts for safe zones.
 *
 * Border Radius
 * -------------
 * RADIUS.sm  - small elements (tags, pills)
 * RADIUS.md  - cards, inputs
 * RADIUS.lg  - large panels, hero cards
 * RADIUS.full - fully rounded (avatar, badge)
 *
 * Color
 * -----
 * Never hardcode colors inside template components. Always pull from
 * the Theme object passed as a prop. Use the THEME_* constants in
 * themes.ts when composing showcase variants.
 *
 * Adding a new theme
 * ------------------
 * 1. Copy an existing THEME_* object in themes.ts
 * 2. Change name + colors
 * 3. Register it in the THEMES record
 * 4. Add a showcase variant to each *Showcase.tsx that should support it
 * 5. Render previews: npx remotion render <CompositionId> out/<id>.png
 *
 * Current themes: dark, clean, bold, warm, minimal, neon, lindamohamed
 */

// ── Typography Scale ────────────────────────────────────────────
// Re-exported from layouts.ts - always import from here in new code.
// Use makeType(fontScale) in compositions that accept a fontScale prop.
export { TYPE, makeType } from "./layouts";

// ── Spacing ─────────────────────────────────────────────────────
export const SPACE = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  40,
  xxl: 64,
} as const;

// ── Border Radius ───────────────────────────────────────────────
export const RADIUS = {
  sm:   6,
  md:   12,
  lg:   20,
  full: 9999,
} as const;

// ── Animation Durations (frames @ 30fps) ────────────────────────
export const DUR = {
  instant:   3,   //  0.1s
  fast:      9,   //  0.3s
  normal:   18,   //  0.6s
  slow:     30,   //  1.0s
  xslow:    60,   //  2.0s
} as const;

// ── Opacity Levels ───────────────────────────────────────────────
export const ALPHA = {
  disabled:   0.35,
  muted:      0.55,
  subtle:     0.70,
  secondary:  0.85,
  full:       1.00,
} as const;

// ── Z-Index Layers ───────────────────────────────────────────────
export const Z = {
  base:    0,
  card:    10,
  overlay: 20,
  tooltip: 30,
  modal:   40,
} as const;

// ── Video Dimensions ─────────────────────────────────────────────
// Standard Remotion output. Import VIDEO from layouts.ts instead.
export { VIDEO } from "./layouts";
