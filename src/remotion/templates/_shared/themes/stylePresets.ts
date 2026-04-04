/**
 * Style Presets - Structural visual parameters for theme generation.
 *
 * Each preset defines the "feel" of a theme (glass opacity, shadow depth,
 * font weights, corner style, background pattern) independent of color.
 * Combine any preset with any ColorPalette to produce a full Theme.
 *
 * ADDING A NEW PRESET:
 *   1. Create a StylePreset object following the interface below
 *   2. Append it to the STYLE_PRESETS array
 *   3. The theme generator will automatically produce new themes for every palette
 */

export interface StylePreset {
  name: string;                    // e.g. "dark", "light", "glassmorphism"
  bgOpacity: number;               // glass card opacity (0–1)
  cardShadowIntensity: number;     // 0–1 scale
  headingWeight: number;           // 600–900
  bodyWeight: number;              // 400–500
  borderRadius: string;            // "sharp" | "rounded" | "pill"
  bgPattern: "solid" | "gradient"; // how bg color is applied
}

// ── Dark ────────────────────────────────────────────────────────
// Dark background, moderate glass, rounded corners, solid bg.
const PRESET_DARK: StylePreset = {
  name: "dark",
  bgOpacity: 0.06,
  cardShadowIntensity: 0.3,
  headingWeight: 800,
  bodyWeight: 400,
  borderRadius: "rounded",
  bgPattern: "solid",
};

// ── Light ───────────────────────────────────────────────────────
// Light background, minimal shadow, rounded corners, solid bg.
const PRESET_LIGHT: StylePreset = {
  name: "light",
  bgOpacity: 0.9,
  cardShadowIntensity: 0.06,
  headingWeight: 700,
  bodyWeight: 400,
  borderRadius: "rounded",
  bgPattern: "solid",
};

// ── Glassmorphism ───────────────────────────────────────────────
// High glass opacity, heavy blur effect, rounded corners, solid bg.
const PRESET_GLASSMORPHISM: StylePreset = {
  name: "glassmorphism",
  bgOpacity: 0.15,
  cardShadowIntensity: 0.2,
  headingWeight: 700,
  bodyWeight: 400,
  borderRadius: "rounded",
  bgPattern: "solid",
};

// ── Brutalist ───────────────────────────────────────────────────
// Sharp corners, heavy shadows, bold weights, solid bg.
const PRESET_BRUTALIST: StylePreset = {
  name: "brutalist",
  bgOpacity: 0.04,
  cardShadowIntensity: 0.5,
  headingWeight: 900,
  bodyWeight: 500,
  borderRadius: "sharp",
  bgPattern: "solid",
};

// ── Gradient ────────────────────────────────────────────────────
// Gradient background pattern, moderate glass, rounded corners.
const PRESET_GRADIENT: StylePreset = {
  name: "gradient",
  bgOpacity: 0.08,
  cardShadowIntensity: 0.25,
  headingWeight: 700,
  bodyWeight: 400,
  borderRadius: "rounded",
  bgPattern: "gradient",
};

// ── Monochrome ──────────────────────────────────────────────────
// Minimal color, low shadow, rounded corners, solid bg.
const PRESET_MONOCHROME: StylePreset = {
  name: "monochrome",
  bgOpacity: 0.05,
  cardShadowIntensity: 0.04,
  headingWeight: 600,
  bodyWeight: 400,
  borderRadius: "rounded",
  bgPattern: "solid",
};

/** All available style presets. */
export const STYLE_PRESETS: StylePreset[] = [
  PRESET_DARK,
  PRESET_LIGHT,
  PRESET_GLASSMORPHISM,
  PRESET_BRUTALIST,
  PRESET_GRADIENT,
  PRESET_MONOCHROME,
];
