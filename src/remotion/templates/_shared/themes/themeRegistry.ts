/**
 * Theme Registry - Merges hand-crafted themes with generated themes.
 *
 * Hand-crafted themes always take priority. If a generated theme name
 * collides with an existing key, a numeric suffix is appended (e.g., "dark-2").
 *
 * Usage:
 *   import { buildFullThemeRegistry } from './themeRegistry';
 *   const allThemes = buildFullThemeRegistry(); // 7 hand-crafted + 60 generated
 */

import type { Theme } from '../themes';
import { THEMES } from '../themes';
import { STYLE_PRESETS } from './stylePresets';
import { COLOR_PALETTES } from './colorPalettes';
import { generateAllThemes } from './themeGenerator';

/**
 * Merge hand-crafted themes with generated themes into a single registry.
 *
 * Rules:
 * 1. All hand-crafted themes are added first, keyed by their `.name` property
 * 2. Each generated theme is added next
 * 3. If a generated theme's name collides with an existing key, append a
 *    numeric suffix ("-2", "-3", …) until the key is unique
 * 4. Hand-crafted themes are never overwritten
 */
export function buildThemeRegistry(
  handCrafted: Record<string, Theme>,
  generated: Theme[],
): Record<string, Theme> {
  const registry: Record<string, Theme> = {};

  // 1. Add all hand-crafted themes first (keyed by .name)
  for (const theme of Object.values(handCrafted)) {
    registry[theme.name] = theme;
  }

  // 2. Add generated themes, handling collisions
  for (const theme of generated) {
    let key = theme.name;

    if (!(key in registry)) {
      registry[key] = theme;
      continue;
    }

    // Collision - find a unique key with numeric suffix
    let suffix = 2;
    while (`${theme.name}-${suffix}` in registry) {
      suffix++;
    }
    key = `${theme.name}-${suffix}`;
    registry[key] = { ...theme, name: key };
  }

  return registry;
}

/**
 * Build the full theme registry using the actual presets, palettes,
 * and hand-crafted themes from the project.
 *
 * Returns a Record<string, Theme> containing all 7 hand-crafted themes
 * plus all generated StylePreset × ColorPalette themes.
 */
export function buildFullThemeRegistry(): Record<string, Theme> {
  const generated = generateAllThemes(STYLE_PRESETS, COLOR_PALETTES);
  return buildThemeRegistry(THEMES, generated);
}
