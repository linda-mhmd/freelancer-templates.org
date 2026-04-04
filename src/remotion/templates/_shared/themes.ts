/**
 * Theme System - Color Palettes & Typography
 * 
 * Each theme defines a complete visual identity: background, text colors,
 * accent colors, card styles, and font weights.
 * 
 * To create a new theme variant for any template:
 *   1. Pick a base theme below (or create a new one)
 *   2. Pass it as the `theme` prop to the template component
 *   3. The template reads colors/fonts from the theme object
 * 
 * ADDING A NEW THEME:
 *   Copy an existing theme object, change the name and colors.
 *   All templates that accept a Theme will automatically support it.
 */

export interface Theme {
  name: string;
  // Backgrounds
  bg: string;                    // main background color or gradient
  bgSecondary: string;           // card/panel background
  bgGlass: string;               // glassmorphism card bg (with alpha)
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // Accents
  accent: string;                // primary accent (buttons, highlights)
  accentSecondary: string;       // secondary accent (gradients, borders)
  accentGradient: string;        // CSS gradient string for badges/CTAs
  // Cards
  cardBorder: string;
  cardShadow: string;
  // Typography
  fontFamily: string;
  headingWeight: number;
  bodyWeight: number;
}

// ── Dark Professional ───────────────────────────────────────────
// The default project theme. Dark bg, indigo→pink gradient accents.
export const THEME_DARK: Theme = {
  name: "dark",
  bg: "#0a0a0f",
  bgSecondary: "rgba(255,255,255,0.04)",
  bgGlass: "rgba(255,255,255,0.06)",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accent: "#6366f1",
  accentSecondary: "#a855f7",
  accentGradient: "linear-gradient(135deg, #6366f1, #ec4899)",
  cardBorder: "rgba(99,102,241,0.25)",
  cardShadow: "0 4px 24px rgba(0,0,0,0.3)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 800,
  bodyWeight: 400,
};

// ── Clean / Light ───────────────────────────────────────────────
// White background, corporate feel. Good for proposals & reports.
export const THEME_CLEAN: Theme = {
  name: "clean",
  bg: "#f8fafc",
  bgSecondary: "#ffffff",
  bgGlass: "rgba(255,255,255,0.9)",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
  accent: "#2563eb",
  accentSecondary: "#3b82f6",
  accentGradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
  cardBorder: "rgba(37,99,235,0.15)",
  cardShadow: "0 4px 24px rgba(0,0,0,0.06)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Bold / Confident ────────────────────────────────────────────
// Dark bg, large text, strong gradient accents. High impact.
export const THEME_BOLD: Theme = {
  name: "bold",
  bg: "#0f0f1a",
  bgSecondary: "rgba(255,255,255,0.05)",
  bgGlass: "rgba(255,255,255,0.08)",
  textPrimary: "#ffffff",
  textSecondary: "#c4b5fd",
  textMuted: "#7c3aed",
  accent: "#8b5cf6",
  accentSecondary: "#ec4899",
  accentGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  cardBorder: "rgba(139,92,246,0.3)",
  cardShadow: "0 8px 32px rgba(139,92,246,0.2)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 900,
  bodyWeight: 500,
};

// ── Warm / Friendly ─────────────────────────────────────────────
// Soft gradient bg, coral/orange accents. Approachable feel.
export const THEME_WARM: Theme = {
  name: "warm",
  bg: "linear-gradient(180deg, #1a1520 0%, #1e1215 100%)",
  bgSecondary: "rgba(251,146,60,0.06)",
  bgGlass: "rgba(251,146,60,0.08)",
  textPrimary: "#fef3c7",
  textSecondary: "#fdba74",
  textMuted: "#9a7b4f",
  accent: "#f97316",
  accentSecondary: "#ef4444",
  accentGradient: "linear-gradient(135deg, #f97316, #ef4444)",
  cardBorder: "rgba(249,115,22,0.25)",
  cardShadow: "0 4px 24px rgba(249,115,22,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Minimal / Understated ───────────────────────────────────────
// Near-white bg, thin lines, lots of whitespace. Elegant.
export const THEME_MINIMAL: Theme = {
  name: "minimal",
  bg: "#fafafa",
  bgSecondary: "#f1f5f9",
  bgGlass: "rgba(241,245,249,0.8)",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#cbd5e1",
  accent: "#334155",
  accentSecondary: "#64748b",
  accentGradient: "linear-gradient(135deg, #334155, #64748b)",
  cardBorder: "rgba(51,65,85,0.1)",
  cardShadow: "0 1px 4px rgba(0,0,0,0.04)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 600,
  bodyWeight: 400,
};

// ── Neon / Energetic ────────────────────────────────────────────
// Dark bg, neon glow accents, cyberpunk feel. For creative/tech.
export const THEME_NEON: Theme = {
  name: "neon",
  bg: "#050510",
  bgSecondary: "rgba(0,255,136,0.04)",
  bgGlass: "rgba(0,255,136,0.06)",
  textPrimary: "#e0ffe0",
  textSecondary: "#00ff88",
  textMuted: "#0a6640",
  accent: "#00ff88",
  accentSecondary: "#00ccff",
  accentGradient: "linear-gradient(135deg, #00ff88, #00ccff)",
  cardBorder: "rgba(0,255,136,0.2)",
  cardShadow: "0 0 24px rgba(0,255,136,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 800,
  bodyWeight: 400,
};

// ── Linda Mohamed / Corporate Green ─────────────────────────────
// White bg, dark green accents, black text. Clean corporate style
// matching the Packages & Workshops slide deck design language.
export const THEME_LINDAMOHAMED: Theme = {
  name: "lindamohamed",
  bg: "#ffffff",
  bgSecondary: "#f5f7f5",
  bgGlass: "rgba(46,125,50,0.06)",
  textPrimary: "#1a1a1a",
  textSecondary: "#4a4a4a",
  textMuted: "#8a8a8a",
  accent: "#2E7D32",
  accentSecondary: "#43A047",
  accentGradient: "linear-gradient(135deg, #2E7D32, #66BB6A)",
  cardBorder: "rgba(46,125,50,0.2)",
  cardShadow: "0 2px 12px rgba(0,0,0,0.08)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Theme Registry ──────────────────────────────────────────────
// Use this to look up themes by name string (useful for AgentCore integration)
export const THEMES: Record<string, Theme> = {
  dark: THEME_DARK,
  clean: THEME_CLEAN,
  bold: THEME_BOLD,
  warm: THEME_WARM,
  minimal: THEME_MINIMAL,
  neon: THEME_NEON,
  lindamohamed: THEME_LINDAMOHAMED,
};

// ── Brand Kit ───────────────────────────────────────────────────
// Optional brand customization layer. When provided, overrides theme colors/fonts.
// All fields are JSON-serializable. Templates render correctly without a BrandKit.
export interface BrandKit {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  accentColor?: string;
}

/**
 * Apply BrandKit overrides to a theme. Returns a new theme with brand colors applied.
 * When brandKit is undefined, returns the original theme unchanged.
 */
export function applyBrandKit(theme: Theme, brandKit?: BrandKit): Theme {
  if (!brandKit) return theme;
  return {
    ...theme,
    ...(brandKit.accentColor ? { accent: brandKit.accentColor } : {}),
    ...(brandKit.primaryColor ? { textPrimary: brandKit.primaryColor } : {}),
    ...(brandKit.secondaryColor ? { cardBg: brandKit.secondaryColor } : {}),
    ...(brandKit.fontFamily ? { fontFamily: brandKit.fontFamily } : {}),
  };
}

// ── Platform Hints ──────────────────────────────────────────────
// Optional metadata describing target social platforms.
// When targetPlatforms includes "tiktok" or "instagram-reels", default format to "vertical".
// When targetPlatforms includes "instagram-feed", default format to "square".
export interface PlatformHints {
  targetPlatforms?: string[];
  hashtags?: string[];
  description?: string;
}

// ── Collaboration Metadata ──────────────────────────────────────
// Pass-through metadata for collaboration workflows. Not rendered visually.
export interface CollabMetadata {
  author?: string;
  version?: string;
  status?: "draft" | "review" | "approved" | "published";
  createdAt?: string;
}

