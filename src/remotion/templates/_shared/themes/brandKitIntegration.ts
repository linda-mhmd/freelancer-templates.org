/**
 * BrandKit Integration - Applies BrandKit overrides on top of generated themes.
 *
 * Uses the existing `applyBrandKit` function from `../themes.ts` and validates
 * contrast after override. Produces warnings when overrides break WCAG AA 4.5:1.
 *
 * Usage:
 *   import { applyBrandKitToGenerated } from './brandKitIntegration';
 *   const { theme, warnings } = applyBrandKitToGenerated(generatedTheme, brandKit);
 */

import type { Theme, BrandKit } from '../themes';
import { applyBrandKit } from '../themes';
import {
  extractBgColor,
  hexToRgb,
  relativeLuminance,
  contrastRatio,
} from './themeGenerator';

export interface BrandKitResult {
  theme: Theme;
  warnings: string[];
}

/**
 * Apply BrandKit overrides to a generated (or any) theme and validate contrast.
 *
 * 1. Delegates to the existing `applyBrandKit` function for the actual merge.
 * 2. After merging, checks the contrast ratio between textPrimary and bg.
 * 3. If contrast < 4.5:1, adds a warning string identifying the failing pair.
 *
 * Does NOT auto-adjust - the caller decides how to handle warnings.
 */
export function applyBrandKitToGenerated(
  theme: Theme,
  brandKit: BrandKit,
): BrandKitResult {
  const warnings: string[] = [];

  // Apply overrides using the existing function
  const merged = applyBrandKit(theme, brandKit);

  // Validate contrast between textPrimary and bg
  const bgHex = extractBgColor(merged.bg);
  const textHex = extractBgColor(merged.textPrimary);

  const { r: bgR, g: bgG, b: bgB } = hexToRgb(bgHex);
  const { r: tR, g: tG, b: tB } = hexToRgb(textHex);

  const bgLum = relativeLuminance(bgR, bgG, bgB);
  const textLum = relativeLuminance(tR, tG, tB);
  const ratio = contrastRatio(bgLum, textLum);

  if (ratio < 4.5) {
    const warning = `BrandKit override: textPrimary (${textHex}) on bg (${bgHex}) has contrast ratio ${ratio.toFixed(2)}:1, below WCAG AA 4.5:1 minimum`;
    warnings.push(warning);
    console.warn(`[brandKitIntegration] ${warning}`);
  }

  return { theme: merged, warnings };
}
