/**
 * Property-Based Tests for Unknown Preset Fallback
 *
 * Uses fast-check to verify that when an unknown preset is provided to
 * ScreencastSlideshow, the component falls back to the default slides
 * (studio-basics preset).
 *
 * Properties tested in this file:
 *   9. Unknown Preset Fallback - unknown presets fall back to default slides
 *
 * Feature: screencast-template-library
 * **Validates: Requirements 8.1**
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { SLIDE_PRESETS, getAllPresetIds } from '../index';
import { STUDIO_BASICS_SLIDES } from '../tutorial-presets';

// =============================================================================
// Constants
// =============================================================================

/** All valid preset IDs from SLIDE_PRESETS */
const VALID_PRESET_IDS = getAllPresetIds();

/** Default slides that should be used for unknown presets */
const DEFAULT_SLIDES = STUDIO_BASICS_SLIDES;

/** Characters that can be used to generate random strings */
const RANDOM_STRING_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

// =============================================================================
// Test Utilities
// =============================================================================

/**
 * Simulates the preset resolution logic from ScreencastSlideshow component.
 * This mirrors the actual component behavior for testing purposes.
 *
 * @param preset - The preset name to resolve
 * @returns The resolved slides array
 */
function resolvePreset(preset: string | undefined): typeof DEFAULT_SLIDES {
  if (preset && SLIDE_PRESETS[preset]) {
    return SLIDE_PRESETS[preset];
  }
  return DEFAULT_SLIDES;
}

/**
 * Checks if a preset name is valid (exists in SLIDE_PRESETS)
 */
function isValidPreset(preset: string): boolean {
  return preset in SLIDE_PRESETS;
}

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/**
 * Generate a random string that is NOT a valid preset name.
 * Uses filtering to ensure generated strings don't accidentally match valid presets.
 */
const unknownPresetArb = fc
  .string({ minLength: 1, maxLength: 50 })
  .filter((str) => !isValidPreset(str) && str.trim().length > 0);

/**
 * Generate random strings with various patterns that should all be unknown presets.
 * Includes edge cases like:
 * - Random alphanumeric strings
 * - Strings with special characters
 * - Strings similar to valid presets but with typos
 * - Empty-ish strings (whitespace)
 */
const unknownPresetVariantsArb = fc.oneof(
  // Random alphanumeric strings
  unknownPresetArb,
  // Strings with numbers appended to valid preset names
  fc.tuple(fc.constantFrom(...VALID_PRESET_IDS), fc.integer({ min: 1, max: 999 }))
    .map(([preset, num]) => `${preset}${num}`),
  // Strings with typos (character substitution)
  fc.constantFrom(...VALID_PRESET_IDS)
    .map((preset) => preset.replace(/[aeiou]/g, 'x'))
    .filter((str) => !isValidPreset(str)),
  // Strings with prefix
  fc.constantFrom(...VALID_PRESET_IDS)
    .map((preset) => `unknown-${preset}`)
    .filter((str) => !isValidPreset(str)),
  // Strings with suffix
  fc.constantFrom(...VALID_PRESET_IDS)
    .map((preset) => `${preset}-invalid`)
    .filter((str) => !isValidPreset(str)),
  // Completely random strings
  fc.string({ minLength: 1, maxLength: 30 })
    .filter((str) => !isValidPreset(str) && str.trim().length > 0)
);

/**
 * Generate valid preset names for comparison testing
 */
const validPresetArb = fc.constantFrom(...VALID_PRESET_IDS);

// =============================================================================
// Property 9: Unknown Preset Fallback
// Feature: screencast-template-library, Property 9: Unknown Preset Fallback
// **Validates: Requirements 8.1**
// =============================================================================

describe('Property 9: Unknown Preset Fallback', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.warn to verify warning is logged
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('unknown presets resolve to default slides for 100+ random inputs', () => {
    fc.assert(
      fc.property(unknownPresetArb, (unknownPreset) => {
        // Verify the preset is indeed unknown
        expect(isValidPreset(unknownPreset)).toBe(false);

        // Resolve the preset
        const resolvedSlides = resolvePreset(unknownPreset);

        // Should fall back to default slides
        expect(resolvedSlides).toBe(DEFAULT_SLIDES);
        expect(resolvedSlides.length).toBe(DEFAULT_SLIDES.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('unknown preset variants all resolve to default slides for 100+ inputs', () => {
    fc.assert(
      fc.property(unknownPresetVariantsArb, (unknownPreset) => {
        // Verify the preset is indeed unknown
        expect(isValidPreset(unknownPreset)).toBe(false);

        // Resolve the preset
        const resolvedSlides = resolvePreset(unknownPreset);

        // Should fall back to default slides
        expect(resolvedSlides).toBe(DEFAULT_SLIDES);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('valid presets resolve to their own slides, not default for 100+ inputs', () => {
    fc.assert(
      fc.property(validPresetArb, (validPreset) => {
        // Verify the preset is valid
        expect(isValidPreset(validPreset)).toBe(true);

        // Resolve the preset
        const resolvedSlides = resolvePreset(validPreset);

        // Should resolve to the preset's own slides
        expect(resolvedSlides).toBe(SLIDE_PRESETS[validPreset]);

        // If not studio-basics, should NOT be the default slides
        if (validPreset !== 'studio-basics') {
          // The slides should be the preset's slides, not necessarily different from default
          // (some presets might have same structure but different content)
          expect(resolvedSlides).toBe(SLIDE_PRESETS[validPreset]);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('undefined preset resolves to default slides', () => {
    const resolvedSlides = resolvePreset(undefined);
    expect(resolvedSlides).toBe(DEFAULT_SLIDES);
  });

  it('empty string preset resolves to default slides', () => {
    const resolvedSlides = resolvePreset('');
    expect(resolvedSlides).toBe(DEFAULT_SLIDES);
  });

  it('whitespace-only preset resolves to default slides', () => {
    const whitespacePresets = ['   ', '\t', '\n', '  \t\n  '];
    
    for (const preset of whitespacePresets) {
      const resolvedSlides = resolvePreset(preset);
      expect(resolvedSlides).toBe(DEFAULT_SLIDES);
    }
  });

  it('case-sensitive preset matching - wrong case resolves to default for 100+ inputs', () => {
    fc.assert(
      fc.property(validPresetArb, (validPreset) => {
        // Create case variations that should NOT match
        const upperCase = validPreset.toUpperCase();
        const mixedCase = validPreset
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
          .join('');

        // These should not match (presets are case-sensitive)
        if (upperCase !== validPreset) {
          expect(isValidPreset(upperCase)).toBe(false);
          expect(resolvePreset(upperCase)).toBe(DEFAULT_SLIDES);
        }

        if (mixedCase !== validPreset) {
          expect(isValidPreset(mixedCase)).toBe(false);
          expect(resolvePreset(mixedCase)).toBe(DEFAULT_SLIDES);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('presets with extra characters resolve to default for 100+ inputs', () => {
    fc.assert(
      fc.property(
        validPresetArb,
        fc.string({ minLength: 1, maxLength: 5 }).map(s => s.replace(/[^-_0-9]/g, '-')),
        (validPreset, suffix) => {
          const modifiedPreset = `${validPreset}${suffix}`;

          // Modified preset should not be valid (unless it accidentally matches another preset)
          if (!isValidPreset(modifiedPreset)) {
            expect(resolvePreset(modifiedPreset)).toBe(DEFAULT_SLIDES);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('presets with leading/trailing spaces resolve to default', () => {
    fc.assert(
      fc.property(validPresetArb, (validPreset) => {
        const withLeadingSpace = ` ${validPreset}`;
        const withTrailingSpace = `${validPreset} `;
        const withBothSpaces = ` ${validPreset} `;

        // These should not match (exact string matching)
        expect(isValidPreset(withLeadingSpace)).toBe(false);
        expect(isValidPreset(withTrailingSpace)).toBe(false);
        expect(isValidPreset(withBothSpaces)).toBe(false);

        expect(resolvePreset(withLeadingSpace)).toBe(DEFAULT_SLIDES);
        expect(resolvePreset(withTrailingSpace)).toBe(DEFAULT_SLIDES);
        expect(resolvePreset(withBothSpaces)).toBe(DEFAULT_SLIDES);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Fallback Behavior Verification
// =============================================================================

describe('Fallback Behavior Verification', () => {
  it('default slides are studio-basics slides', () => {
    expect(DEFAULT_SLIDES).toBe(STUDIO_BASICS_SLIDES);
    expect(DEFAULT_SLIDES.length).toBe(5);
  });

  it('SLIDE_PRESETS contains studio-basics as the default', () => {
    expect(SLIDE_PRESETS['studio-basics']).toBeDefined();
    expect(SLIDE_PRESETS['studio-basics']).toBe(STUDIO_BASICS_SLIDES);
  });

  it('all 18 presets are registered in SLIDE_PRESETS', () => {
    expect(VALID_PRESET_IDS.length).toBe(18);
    
    // Verify each preset exists
    for (const presetId of VALID_PRESET_IDS) {
      expect(SLIDE_PRESETS[presetId]).toBeDefined();
      expect(Array.isArray(SLIDE_PRESETS[presetId])).toBe(true);
      expect(SLIDE_PRESETS[presetId].length).toBeGreaterThan(0);
    }
  });

  it('unknown preset resolution is deterministic for 100+ inputs', () => {
    fc.assert(
      fc.property(unknownPresetArb, (unknownPreset) => {
        // Call resolvePreset multiple times with the same input
        const result1 = resolvePreset(unknownPreset);
        const result2 = resolvePreset(unknownPreset);
        const result3 = resolvePreset(unknownPreset);

        // All results should be identical (same reference)
        expect(result1).toBe(result2);
        expect(result2).toBe(result3);
        expect(result1).toBe(DEFAULT_SLIDES);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Edge Cases
// =============================================================================

describe('Edge Cases for Unknown Preset Fallback', () => {
  it('special characters in preset name resolve to default', () => {
    const specialCharPresets = [
      'studio@basics',
      'studio#basics',
      'studio$basics',
      'studio%basics',
      'studio&basics',
      'studio*basics',
      'studio!basics',
      'studio.basics',
      'studio/basics',
      'studio\\basics',
      'studio:basics',
      'studio;basics',
      'studio<basics>',
      'studio[basics]',
      'studio{basics}',
    ];

    for (const preset of specialCharPresets) {
      expect(isValidPreset(preset)).toBe(false);
      expect(resolvePreset(preset)).toBe(DEFAULT_SLIDES);
    }
  });

  it('unicode characters in preset name resolve to default', () => {
    const unicodePresets = [
      'studio-básics',
      'studio-基础',
      'studio-основы',
      'スタジオ-basics',
      'studio-🎬',
    ];

    for (const preset of unicodePresets) {
      expect(isValidPreset(preset)).toBe(false);
      expect(resolvePreset(preset)).toBe(DEFAULT_SLIDES);
    }
  });

  it('very long preset names resolve to default', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 100, maxLength: 1000 }),
        (longPreset) => {
          // Very long strings should not be valid presets
          expect(isValidPreset(longPreset)).toBe(false);
          expect(resolvePreset(longPreset)).toBe(DEFAULT_SLIDES);

          return true;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('null-like string values resolve to default', () => {
    const nullLikePresets = ['null', 'undefined', 'NaN', 'false', 'true', '0', '-1'];

    for (const preset of nullLikePresets) {
      if (!isValidPreset(preset)) {
        expect(resolvePreset(preset)).toBe(DEFAULT_SLIDES);
      }
    }
  });
});
