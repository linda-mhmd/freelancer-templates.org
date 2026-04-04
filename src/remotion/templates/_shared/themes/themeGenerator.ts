/**
 * Theme Generator - Produces Theme objects from StylePreset × ColorPalette combinations.
 *
 * Pure functions: no side effects except console.log for contrast adjustments.
 *
 * Usage:
 *   import { generateAllThemes } from './themeGenerator';
 *   import { STYLE_PRESETS } from './stylePresets';
 *   import { COLOR_PALETTES } from './colorPalettes';
 *   const themes = generateAllThemes(STYLE_PRESETS, COLOR_PALETTES);
 */

import type { Theme } from '../themes';
import type { StylePreset } from './stylePresets';
import type { ColorPalette } from './colorPalettes';

// ── Color Helpers ───────────────────────────────────────────────

/** Parse a hex color (#RGB or #RRGGBB) into { r, g, b } (0–255). */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace(/^#/, '');
  let r: number, g: number, b: number;
  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  } else {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return { r, g, b };
}

/** Convert RGB (0–255) back to a hex string. */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Linearize an sRGB channel value (0–255) for luminance calculation.
 * See https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function linearize(channel: number): number {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Calculate relative luminance per WCAG 2.0.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * where R, G, B are linearized sRGB values.
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Calculate WCAG contrast ratio between two luminance values.
 * Returns a value ≥ 1. WCAG AA requires ≥ 4.5 for normal text.
 */
export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Extract the first hex color from a CSS value.
 * Handles plain hex, linear-gradient(...), and rgba(...) strings.
 * For rgba, converts the rgb channels to hex (ignores alpha).
 */
export function extractBgColor(bg: string): string {
  // Try hex match first
  const hexMatch = bg.match(/#([0-9a-fA-F]{3,6})\b/);
  if (hexMatch) return hexMatch[0];

  // Try rgba/rgb match
  const rgbaMatch = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbaMatch) {
    return rgbToHex(
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10),
    );
  }

  // Fallback - assume dark
  return '#000000';
}

/** Lighten a hex color by `amount` (0–1). Moves each channel toward 255. */
export function lightenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

/** Darken a hex color by `amount` (0–1). Moves each channel toward 0. */
export function darkenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r * (1 - amount),
    g * (1 - amount),
    b * (1 - amount),
  );
}

// ── Theme Generation ────────────────────────────────────────────

/** Check if a background color is "dark" (luminance < 0.5). */
function isDarkBackground(bgHex: string): boolean {
  const { r, g, b } = hexToRgb(bgHex);
  return relativeLuminance(r, g, b) < 0.5;
}

/**
 * Generate a Theme from a StylePreset + ColorPalette.
 *
 * Mapping rules:
 * - name: `{preset.name}-{palette.name}`
 * - bg: solid → palette.background; gradient → linear-gradient(180deg, bg, darkerVariant)
 * - bgSecondary: rgba({primary_rgb}, {preset.bgOpacity})
 * - bgGlass: rgba({primary_rgb}, {preset.bgOpacity + 0.02})
 * - textPrimary: "#ffffff" for dark bg, "#0f172a" for light bg
 * - textSecondary: palette.secondary
 * - textMuted: palette.muted
 * - accent: palette.primary
 * - accentSecondary: palette.secondary
 * - accentGradient: linear-gradient(135deg, primary, accent)
 * - cardBorder: rgba({primary_rgb}, 0.25)
 * - cardShadow: computed from preset.cardShadowIntensity
 * - fontFamily: "'Inter', sans-serif"
 * - headingWeight / bodyWeight: from preset
 */
export function generateTheme(preset: StylePreset, palette: ColorPalette): Theme {
  const bgHex = extractBgColor(palette.background);
  const dark = isDarkBackground(bgHex);
  const { r: pr, g: pg, b: pb } = hexToRgb(palette.primary);

  // Background
  let bg: string;
  if (preset.bgPattern === 'gradient') {
    const darker = darkenColor(bgHex, 0.3);
    bg = `linear-gradient(180deg, ${palette.background} 0%, ${darker} 100%)`;
  } else {
    bg = palette.background;
  }

  // Secondary / glass backgrounds
  const bgSecondary = `rgba(${pr},${pg},${pb},${preset.bgOpacity})`;
  const bgGlass = `rgba(${pr},${pg},${pb},${Math.min(1, preset.bgOpacity + 0.02)})`;

  // Text
  const textPrimary = dark ? '#ffffff' : '#0f172a';
  const textSecondary = palette.secondary;
  const textMuted = palette.muted;

  // Accents
  const accent = palette.primary;
  const accentSecondary = palette.secondary;
  const accentGradient = `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`;

  // Card styles
  const cardBorder = `rgba(${pr},${pg},${pb},0.25)`;
  const shadowBlur = 4 + preset.cardShadowIntensity * 8;
  const shadowSpread = 24 + preset.cardShadowIntensity * 16;
  const cardShadow = `0 ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,${preset.cardShadowIntensity})`;

  return {
    name: `${preset.name}-${palette.name}`,
    bg,
    bgSecondary,
    bgGlass,
    textPrimary,
    textSecondary,
    textMuted,
    accent,
    accentSecondary,
    accentGradient,
    cardBorder,
    cardShadow,
    fontFamily: "'Inter', sans-serif",
    headingWeight: preset.headingWeight,
    bodyWeight: preset.bodyWeight,
  };
}

// ── Contrast Validation ─────────────────────────────────────────

export interface ContrastResult {
  valid: boolean;
  failures: string[];
}

/**
 * Validate that a theme's textPrimary has sufficient contrast against its bg.
 * Uses WCAG AA 4.5:1 minimum ratio for normal text.
 *
 * Handles hex colors, gradients (extracts first hex), and rgba values.
 */
export function validateContrast(theme: Theme): ContrastResult {
  const failures: string[] = [];

  const bgHex = extractBgColor(theme.bg);
  const textHex = extractBgColor(theme.textPrimary);

  const { r: bgR, g: bgG, b: bgB } = hexToRgb(bgHex);
  const { r: tR, g: tG, b: tB } = hexToRgb(textHex);

  const bgLum = relativeLuminance(bgR, bgG, bgB);
  const textLum = relativeLuminance(tR, tG, tB);
  const ratio = contrastRatio(bgLum, textLum);

  if (ratio < 4.5) {
    failures.push(
      `textPrimary (${textHex}) on bg (${bgHex}) has contrast ratio ${ratio.toFixed(2)}:1, below WCAG AA 4.5:1 minimum`,
    );
  }

  return { valid: failures.length === 0, failures };
}

// ── Auto-Adjust ─────────────────────────────────────────────────

/**
 * Auto-adjust a theme's textPrimary until it meets WCAG AA 4.5:1 contrast
 * against the background. Lightens text on dark backgrounds, darkens on light.
 *
 * Returns a new Theme (does not mutate the input). Logs adjustments to console.
 */
export function autoAdjustContrast(theme: Theme): Theme {
  const bgHex = extractBgColor(theme.bg);
  const dark = isDarkBackground(bgHex);
  let textHex = extractBgColor(theme.textPrimary);

  const { r: bgR, g: bgG, b: bgB } = hexToRgb(bgHex);
  const bgLum = relativeLuminance(bgR, bgG, bgB);

  // Incrementally adjust until contrast passes (max 50 iterations as safety)
  const step = 0.05;
  for (let i = 0; i < 50; i++) {
    const { r: tR, g: tG, b: tB } = hexToRgb(textHex);
    const textLum = relativeLuminance(tR, tG, tB);
    const ratio = contrastRatio(bgLum, textLum);

    if (ratio >= 4.5) break;

    if (dark) {
      textHex = lightenColor(textHex, step);
    } else {
      textHex = darkenColor(textHex, step);
    }
  }

  if (textHex !== extractBgColor(theme.textPrimary)) {
    console.log(
      `[themeGenerator] Auto-adjusted textPrimary for "${theme.name}": ${extractBgColor(theme.textPrimary)} → ${textHex}`,
    );
  }

  return { ...theme, textPrimary: textHex };
}

// ── Batch Generation ────────────────────────────────────────────

/**
 * Generate all N×M themes from presets × palettes.
 * Each theme is contrast-validated and auto-adjusted if needed.
 * Returns an array of exactly N×M themes with unique `{preset}-{palette}` names.
 */
export function generateAllThemes(
  presets: StylePreset[],
  palettes: ColorPalette[],
): Theme[] {
  const themes: Theme[] = [];

  for (const preset of presets) {
    for (const palette of palettes) {
      let theme = generateTheme(preset, palette);
      const result = validateContrast(theme);
      if (!result.valid) {
        theme = autoAdjustContrast(theme);
      }
      themes.push(theme);
    }
  }

  return themes;
}
