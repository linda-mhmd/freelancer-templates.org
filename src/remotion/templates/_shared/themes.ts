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

// ── Ocean / Teal Professional ────────────────────────────────────
// Dark navy bg, teal/aqua accents. Tech-forward, trustworthy, calm.
// Popular with SaaS builders, cloud consultants, dev-tool freelancers.
export const THEME_OCEAN: Theme = {
  name: "ocean",
  bg: "#050f1a",
  bgSecondary: "rgba(8,145,178,0.06)",
  bgGlass: "rgba(8,145,178,0.08)",
  textPrimary: "#e0f7fa",
  textSecondary: "#67e8f9",
  textMuted: "#164e63",
  accent: "#0891b2",
  accentSecondary: "#06b6d4",
  accentGradient: "linear-gradient(135deg, #0891b2, #06b6d4)",
  cardBorder: "rgba(8,145,178,0.25)",
  cardShadow: "0 4px 24px rgba(8,145,178,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Sunset / Vibrant Creative ────────────────────────────────────
// Warm dark bg, hot pink + orange gradient. Energetic, bold, trendy.
// Dominant preference for content creators, social media managers, marketers.
export const THEME_SUNSET: Theme = {
  name: "sunset",
  bg: "#1a0a0f",
  bgSecondary: "rgba(244,114,182,0.06)",
  bgGlass: "rgba(244,114,182,0.08)",
  textPrimary: "#fff1f5",
  textSecondary: "#fda4af",
  textMuted: "#9f1239",
  accent: "#f472b6",
  accentSecondary: "#fb923c",
  accentGradient: "linear-gradient(135deg, #f472b6, #fb923c)",
  cardBorder: "rgba(244,114,182,0.25)",
  cardShadow: "0 4px 24px rgba(244,114,182,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 800,
  bodyWeight: 400,
};

// ── Forest / Nature & Growth ─────────────────────────────────────
// Very dark green base, emerald/lime accents. Grounded, sustainable.
// Top color for wellness coaches, eco-consultants, health/fitness brands.
export const THEME_FOREST: Theme = {
  name: "forest",
  bg: "#031a06",
  bgSecondary: "rgba(22,163,74,0.06)",
  bgGlass: "rgba(22,163,74,0.08)",
  textPrimary: "#f0fdf4",
  textSecondary: "#86efac",
  textMuted: "#166534",
  accent: "#16a34a",
  accentSecondary: "#4ade80",
  accentGradient: "linear-gradient(135deg, #16a34a, #4ade80)",
  cardBorder: "rgba(22,163,74,0.25)",
  cardShadow: "0 4px 24px rgba(22,163,74,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Rose / Bold Design ───────────────────────────────────────────
// Deep rose bg, crimson/rose accents. Passionate, design-forward, editorial.
// #1 preference for graphic designers, fashion, and lifestyle freelancers.
export const THEME_ROSE: Theme = {
  name: "rose",
  bg: "#1a050a",
  bgSecondary: "rgba(225,29,72,0.06)",
  bgGlass: "rgba(225,29,72,0.08)",
  textPrimary: "#fff1f2",
  textSecondary: "#fda4af",
  textMuted: "#9f1239",
  accent: "#e11d48",
  accentSecondary: "#fb7185",
  accentGradient: "linear-gradient(135deg, #e11d48, #fb7185)",
  cardBorder: "rgba(225,29,72,0.25)",
  cardShadow: "0 4px 24px rgba(225,29,72,0.15)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 800,
  bodyWeight: 400,
};

// ── Gold / Premium Consulting ────────────────────────────────────
// Near-black bg, rich amber/gold accents. Luxe positioning, authority.
// Preferred by executive coaches, strategy consultants, keynote speakers.
export const THEME_GOLD: Theme = {
  name: "gold",
  bg: "#0a0700",
  bgSecondary: "rgba(217,119,6,0.07)",
  bgGlass: "rgba(217,119,6,0.09)",
  textPrimary: "#fffbeb",
  textSecondary: "#fcd34d",
  textMuted: "#92400e",
  accent: "#d97706",
  accentSecondary: "#fbbf24",
  accentGradient: "linear-gradient(135deg, #d97706, #fbbf24)",
  cardBorder: "rgba(217,119,6,0.3)",
  cardShadow: "0 4px 24px rgba(217,119,6,0.2)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Midnight / Deep Corporate ────────────────────────────────────
// Navy base, electric blue accents. B2B, finance, legal, enterprise.
// Highest trust score in corporate & financial services branding studies.
export const THEME_MIDNIGHT: Theme = {
  name: "midnight",
  bg: "#020817",
  bgSecondary: "rgba(30,64,175,0.08)",
  bgGlass: "rgba(30,64,175,0.1)",
  textPrimary: "#f8fafc",
  textSecondary: "#93c5fd",
  textMuted: "#1e3a5f",
  accent: "#3b82f6",
  accentSecondary: "#60a5fa",
  accentGradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
  cardBorder: "rgba(59,130,246,0.2)",
  cardShadow: "0 4px 24px rgba(30,64,175,0.25)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Crimson / High Impact ────────────────────────────────────────
// Very dark red bg, crimson + orange accents. Urgency, power, bold.
// Highest click-through rates on CTAs and sales-focused content.
export const THEME_CRIMSON: Theme = {
  name: "crimson",
  bg: "#1a0000",
  bgSecondary: "rgba(220,38,38,0.06)",
  bgGlass: "rgba(220,38,38,0.08)",
  textPrimary: "#fff1f2",
  textSecondary: "#fca5a5",
  textMuted: "#7f1d1d",
  accent: "#dc2626",
  accentSecondary: "#f97316",
  accentGradient: "linear-gradient(135deg, #dc2626, #f97316)",
  cardBorder: "rgba(220,38,38,0.25)",
  cardShadow: "0 8px 32px rgba(220,38,38,0.2)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 900,
  bodyWeight: 500,
};

// ── Lavender / Soft Creative ─────────────────────────────────────
// Deep purple bg, soft violet/pink accents. Creative, calm, spiritual.
// Preferred by life coaches, wellness practitioners, creative consultants.
export const THEME_LAVENDER: Theme = {
  name: "lavender",
  bg: "#0d0414",
  bgSecondary: "rgba(167,139,250,0.06)",
  bgGlass: "rgba(167,139,250,0.08)",
  textPrimary: "#faf5ff",
  textSecondary: "#d8b4fe",
  textMuted: "#581c87",
  accent: "#a78bfa",
  accentSecondary: "#f0abfc",
  accentGradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  cardBorder: "rgba(167,139,250,0.2)",
  cardShadow: "0 4px 24px rgba(124,58,237,0.2)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Arctic / Ice Clean ───────────────────────────────────────────
// Crisp light bg, sky blue accents. Precise, cool, minimal-professional.
// Top preference for SaaS founders, technical writers, minimalist brands.
export const THEME_ARCTIC: Theme = {
  name: "arctic",
  bg: "#f0f9ff",
  bgSecondary: "#e0f2fe",
  bgGlass: "rgba(14,165,233,0.08)",
  textPrimary: "#0c4a6e",
  textSecondary: "#0369a1",
  textMuted: "#7dd3fc",
  accent: "#0ea5e9",
  accentSecondary: "#38bdf8",
  accentGradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
  cardBorder: "rgba(14,165,233,0.2)",
  cardShadow: "0 4px 24px rgba(14,165,233,0.1)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Espresso / Warm Personal Brand ──────────────────────────────
// Warm dark brown bg, caramel/amber accents. Cozy, personal, approachable.
// Highest engagement for personal brand coaches, lifestyle & food content.
export const THEME_ESPRESSO: Theme = {
  name: "espresso",
  bg: "#0f0a05",
  bgSecondary: "rgba(146,64,14,0.08)",
  bgGlass: "rgba(146,64,14,0.1)",
  textPrimary: "#fef3c7",
  textSecondary: "#d97706",
  textMuted: "#78350f",
  accent: "#b45309",
  accentSecondary: "#d97706",
  accentGradient: "linear-gradient(135deg, #92400e, #d97706)",
  cardBorder: "rgba(180,83,9,0.3)",
  cardShadow: "0 4px 24px rgba(146,64,14,0.2)",
  fontFamily: "'Inter', sans-serif",
  headingWeight: 700,
  bodyWeight: 400,
};

// ── Theme Registry ──────────────────────────────────────────────
// Use this to look up themes by name string (useful for AgentCore integration)
export const THEMES: Record<string, Theme> = {
  // Original 7 hand-crafted themes
  dark: THEME_DARK,
  clean: THEME_CLEAN,
  bold: THEME_BOLD,
  warm: THEME_WARM,
  minimal: THEME_MINIMAL,
  neon: THEME_NEON,
  lindamohamed: THEME_LINDAMOHAMED,
  // 10 additional themes (target-group optimised)
  ocean:     THEME_OCEAN,
  sunset:    THEME_SUNSET,
  forest:    THEME_FOREST,
  rose:      THEME_ROSE,
  gold:      THEME_GOLD,
  midnight:  THEME_MIDNIGHT,
  crimson:   THEME_CRIMSON,
  lavender:  THEME_LAVENDER,
  arctic:    THEME_ARCTIC,
  espresso:  THEME_ESPRESSO,
};

// ── Brand Kit ───────────────────────────────────────────────────
// Optional brand customization layer. When provided, overrides theme colors/fonts.
// All fields are JSON-serializable. Templates render correctly without a BrandKit.
export interface BrandKit {
  logoUrl?: string;
  primaryColor?: string;   // main brand color -> theme.accent + gradient start
  secondaryColor?: string; // 2nd brand color  -> theme.accentSecondary + gradient end
  accentColor?: string;    // 3rd brand color  -> fallback accentSecondary
  bgColor?: string;        // background color -> bg + derived bgSecondary/bgGlass
  textColor?: string;      // body text color  -> textPrimary + derived secondary/muted
  fontFamily?: string;
}

// ── Private color helpers for BrandKit derivation ───────────────
function _hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [0, 0, 0];
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}
function _luma(r: number, g: number, b: number): number {
  const lin = [r, g, b].map(c => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function _h(v: number): string { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }

/**
 * Apply BrandKit overrides to a theme. All derived fields (bgSecondary, bgGlass,
 * textSecondary, textMuted, cardShadow) are computed so the full theme stays coherent.
 *
 *   primaryColor   -> accent + accentGradient start + cardBorder
 *   secondaryColor -> accentSecondary + accentGradient end
 *   accentColor    -> fallback accentSecondary if secondaryColor absent
 *   bgColor        -> bg + bgSecondary (shifted) + bgGlass (55% alpha) + cardShadow
 *   textColor      -> textPrimary + textSecondary (70%) + textMuted (45%)
 */
export function applyBrandKit(theme: Theme, brandKit?: BrandKit): Theme {
  if (!brandKit) return theme;
  const result = { ...theme };

  if (brandKit.primaryColor) {
    const sec = brandKit.secondaryColor ?? brandKit.accentColor ?? theme.accentSecondary;
    result.accent = brandKit.primaryColor;
    result.accentSecondary = sec;
    result.accentGradient = `linear-gradient(135deg, ${brandKit.primaryColor}, ${sec})`;
    result.cardBorder = `${brandKit.primaryColor}40`;
  }
  if (brandKit.secondaryColor) {
    result.accentSecondary = brandKit.secondaryColor;
  } else if (brandKit.accentColor) {
    result.accentSecondary = brandKit.accentColor;
  }

  if (brandKit.bgColor) {
    const [r, g, b] = _hexToRgb(brandKit.bgColor);
    const isLight = _luma(r, g, b) > 0.18;
    const sh = isLight ? -14 : 22;
    result.bg = brandKit.bgColor;
    result.bgSecondary = `#${_h(r + sh)}${_h(g + sh)}${_h(b + sh)}`;
    result.bgGlass = `rgba(${r}, ${g}, ${b}, 0.55)`;
    result.cardShadow = isLight ? '0 4px 24px rgba(0,0,0,0.10)' : '0 4px 24px rgba(0,0,0,0.45)';
  }

  if (brandKit.textColor) {
    result.textPrimary = brandKit.textColor;
    result.textSecondary = `${brandKit.textColor}b3`;
    result.textMuted = `${brandKit.textColor}73`;
  }

  if (brandKit.fontFamily) {
    result.fontFamily = brandKit.fontFamily;
  }
  return result;
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

