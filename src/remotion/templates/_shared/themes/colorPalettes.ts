/**
 * Color Palettes - Harmonious 5-color sets for theme generation.
 *
 * Each palette provides primary, secondary, accent, muted, and background
 * colors. Palettes are preset-agnostic - the theme generator combines
 * any palette with any StylePreset to produce a full Theme.
 *
 * Background colors are in the dark range (#0a–#1a) so they work with
 * dark presets out of the box. The theme generator adjusts backgrounds
 * for light presets automatically.
 *
 * ADDING A NEW PALETTE:
 *   1. Create a ColorPalette object following the interface below
 *   2. Append it to the COLOR_PALETTES array
 *   3. The theme generator will automatically produce new themes for every preset
 */

export interface ColorPalette {
  name: string;                    // e.g. "ocean", "sunset", "forest"
  primary: string;                 // main accent
  secondary: string;               // secondary accent
  accent: string;                  // highlight color
  muted: string;                   // muted/disabled text
  background: string;              // base background
}

// ── Ocean - Blues and teals ─────────────────────────────────────
const PALETTE_OCEAN: ColorPalette = {
  name: "ocean",
  primary: "#0ea5e9",
  secondary: "#06b6d4",
  accent: "#38bdf8",
  muted: "#64748b",
  background: "#0a1628",
};

// ── Sunset - Oranges and pinks ──────────────────────────────────
const PALETTE_SUNSET: ColorPalette = {
  name: "sunset",
  primary: "#f97316",
  secondary: "#f43f5e",
  accent: "#fb923c",
  muted: "#78716c",
  background: "#1a0f0a",
};

// ── Forest - Greens and earth tones ─────────────────────────────
const PALETTE_FOREST: ColorPalette = {
  name: "forest",
  primary: "#22c55e",
  secondary: "#16a34a",
  accent: "#4ade80",
  muted: "#6b7280",
  background: "#0a1a0f",
};

// ── Arctic - Cool whites and light blues ────────────────────────
const PALETTE_ARCTIC: ColorPalette = {
  name: "arctic",
  primary: "#7dd3fc",
  secondary: "#bae6fd",
  accent: "#e0f2fe",
  muted: "#94a3b8",
  background: "#0c1520",
};

// ── Ember - Reds and warm oranges ───────────────────────────────
const PALETTE_EMBER: ColorPalette = {
  name: "ember",
  primary: "#ef4444",
  secondary: "#dc2626",
  accent: "#f87171",
  muted: "#78716c",
  background: "#1a0a0a",
};

// ── Lavender - Purples and soft pinks ───────────────────────────
const PALETTE_LAVENDER: ColorPalette = {
  name: "lavender",
  primary: "#a78bfa",
  secondary: "#c084fc",
  accent: "#e879f9",
  muted: "#7c7c91",
  background: "#120f1a",
};

// ── Slate - Grays and cool neutrals ────────────────────────────
const PALETTE_SLATE: ColorPalette = {
  name: "slate",
  primary: "#94a3b8",
  secondary: "#cbd5e1",
  accent: "#e2e8f0",
  muted: "#64748b",
  background: "#0f1218",
};

// ── Coral - Coral pinks and warm tones ──────────────────────────
const PALETTE_CORAL: ColorPalette = {
  name: "coral",
  primary: "#fb7185",
  secondary: "#f472b6",
  accent: "#fda4af",
  muted: "#9ca3af",
  background: "#1a0e12",
};

// ── Mint - Mint greens and fresh tones ──────────────────────────
const PALETTE_MINT: ColorPalette = {
  name: "mint",
  primary: "#34d399",
  secondary: "#2dd4bf",
  accent: "#6ee7b7",
  muted: "#6b7280",
  background: "#0a1a16",
};

// ── Gold - Golds and warm yellows ───────────────────────────────
const PALETTE_GOLD: ColorPalette = {
  name: "gold",
  primary: "#eab308",
  secondary: "#f59e0b",
  accent: "#fbbf24",
  muted: "#78716c",
  background: "#1a150a",
};

/** All available color palettes. */
export const COLOR_PALETTES: ColorPalette[] = [
  PALETTE_OCEAN,
  PALETTE_SUNSET,
  PALETTE_FOREST,
  PALETTE_ARCTIC,
  PALETTE_EMBER,
  PALETTE_LAVENDER,
  PALETTE_SLATE,
  PALETTE_CORAL,
  PALETTE_MINT,
  PALETTE_GOLD,
];
