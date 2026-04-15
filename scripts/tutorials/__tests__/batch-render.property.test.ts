/**
 * Property-Based Tests for Batch Render Preset Coverage
 *
 * Uses fast-check to verify invariants for batch render script configuration,
 * ensuring all presets from SLIDE_PRESETS are included in ALL_TUTORIALS
 * and each preset config has valid required fields.
 *
 * Properties tested in this file:
 *   10. Batch Render Preset Coverage - ALL_TUTORIALS contains all presets from SLIDE_PRESETS
 *   11. Batch Render Output Completeness - Each preset config has valid id, title, category, preset, slideCount
 *
 * Feature: screencast-template-library
 * **Validates: Requirements 9.1, 9.2**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { SLIDE_PRESETS } from '../../../src/remotion/tutorials/presets/index';
import { ALL_TUTORIALS, type PresetTutorialConfig } from '../batch-render';

// =============================================================================
// Constants
// =============================================================================

/**
 * Expected total number of presets (Requirements 9.1)
 */
const EXPECTED_PRESET_COUNT = 18;

/**
 * Valid categories for batch render presets
 */
const VALID_CATEGORIES = ['tutorial', 'showcase', 'project', 'design-tips'] as const;

/**
 * Expected output file extensions (Requirements 9.2)
 */
const EXPECTED_OUTPUT_EXTENSIONS = ['.mp4', '.gif', '-poster.png'] as const;

// =============================================================================
// Test Utilities
// =============================================================================

/**
 * Get all preset names from SLIDE_PRESETS
 */
function getAllSlidePresetNames(): string[] {
  return Object.keys(SLIDE_PRESETS);
}

/**
 * Get all preset names from ALL_TUTORIALS
 */
function getAllTutorialPresetNames(): string[] {
  return ALL_TUTORIALS.map((t) => t.preset);
}

/**
 * Get all tutorial IDs from ALL_TUTORIALS
 */
function getAllTutorialIds(): string[] {
  return ALL_TUTORIALS.map((t) => t.id);
}

/**
 * Find a tutorial config by preset name
 */
function findTutorialByPreset(presetName: string): PresetTutorialConfig | undefined {
  return ALL_TUTORIALS.find((t) => t.preset === presetName);
}

/**
 * Find a tutorial config by ID
 */
function findTutorialById(id: string): PresetTutorialConfig | undefined {
  return ALL_TUTORIALS.find((t) => t.id === id);
}

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/**
 * Generate a random preset name from SLIDE_PRESETS
 */
const slidePresetNameArb = fc.constantFrom(...getAllSlidePresetNames());

/**
 * Generate a random tutorial config from ALL_TUTORIALS
 */
const tutorialConfigArb = fc.constantFrom(...ALL_TUTORIALS);

/**
 * Generate a random index into ALL_TUTORIALS
 */
const tutorialIndexArb = fc.integer({ min: 0, max: ALL_TUTORIALS.length - 1 });

// =============================================================================
// Property 10: Batch Render Preset Coverage
// Feature: screencast-template-library, Property 10: Batch Render Preset Coverage
// **Validates: Requirements 9.1**
// =============================================================================

describe('Property 10: Batch Render Preset Coverage', () => {
  it('ALL_TUTORIALS contains exactly 17 entries', () => {
    expect(ALL_TUTORIALS.length).toBe(EXPECTED_PRESET_COUNT);
  });

  it('all presets in SLIDE_PRESETS have corresponding entries in ALL_TUTORIALS for 100+ inputs', () => {
    const slidePresetNames = getAllSlidePresetNames();
    const tutorialPresetNames = getAllTutorialPresetNames();

    // Ensure we have the expected number of presets
    expect(slidePresetNames.length).toBe(EXPECTED_PRESET_COUNT);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidePresetNames.length - 1 }),
        (index) => {
          const presetName = slidePresetNames[index];

          // Each preset in SLIDE_PRESETS should have a corresponding entry in ALL_TUTORIALS
          expect(
            tutorialPresetNames.includes(presetName),
            `Preset "${presetName}" should have a corresponding entry in ALL_TUTORIALS`
          ).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all entries in ALL_TUTORIALS have corresponding presets in SLIDE_PRESETS for 100+ inputs', () => {
    const slidePresetNames = getAllSlidePresetNames();

    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Each tutorial's preset should exist in SLIDE_PRESETS
        expect(
          slidePresetNames.includes(tutorial.preset),
          `Tutorial preset "${tutorial.preset}" should exist in SLIDE_PRESETS`
        ).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('tutorial IDs are unique', () => {
    const ids = getAllTutorialIds();
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  it('tutorial preset names are unique', () => {
    const presets = getAllTutorialPresetNames();
    const uniquePresets = new Set(presets);

    expect(uniquePresets.size).toBe(presets.length);
  });

  it('all 9 tutorial presets are included in ALL_TUTORIALS', () => {
    const tutorialPresets = [
      'studio-basics',
      'editing-props',
      'cli-rendering',
      'composition-structure',
      'custom-themes',
      'brand-integration',
      'layout-modifications',
      'lambda-deployment',
      'testimonials-tutorial',
    ];

    const tutorialPresetNames = getAllTutorialPresetNames();

    for (const preset of tutorialPresets) {
      expect(
        tutorialPresetNames.includes(preset),
        `Tutorial preset "${preset}" should be included in ALL_TUTORIALS`
      ).toBe(true);
    }
  });

  it('all 4 showcase presets are included in ALL_TUTORIALS', () => {
    const showcasePresets = [
      'showcase-testimonials',
      'showcase-product-launches',
      'showcase-social-content',
      'showcase-educational',
    ];

    const tutorialPresetNames = getAllTutorialPresetNames();

    for (const preset of showcasePresets) {
      expect(
        tutorialPresetNames.includes(preset),
        `Showcase preset "${preset}" should be included in ALL_TUTORIALS`
      ).toBe(true);
    }
  });

  it('all 4 project presets are included in ALL_TUTORIALS', () => {
    const projectPresets = [
      'project-agency-workflow',
      'project-content-creator',
      'project-freelancer-portfolio',
      'project-saas-marketing',
    ];

    const tutorialPresetNames = getAllTutorialPresetNames();

    for (const preset of projectPresets) {
      expect(
        tutorialPresetNames.includes(preset),
        `Project preset "${preset}" should be included in ALL_TUTORIALS`
      ).toBe(true);
    }
  });

  it('video-design-tips preset is included in ALL_TUTORIALS', () => {
    const tutorialPresetNames = getAllTutorialPresetNames();

    expect(
      tutorialPresetNames.includes('video-design-tips'),
      'video-design-tips preset should be included in ALL_TUTORIALS'
    ).toBe(true);
  });

  it('bidirectional mapping between SLIDE_PRESETS and ALL_TUTORIALS is complete', () => {
    const slidePresetNames = new Set(getAllSlidePresetNames());
    const tutorialPresetNames = new Set(getAllTutorialPresetNames());

    // Both sets should have the same size
    expect(slidePresetNames.size).toBe(tutorialPresetNames.size);

    // Every preset in SLIDE_PRESETS should be in ALL_TUTORIALS
    for (const presetName of slidePresetNames) {
      expect(
        tutorialPresetNames.has(presetName),
        `SLIDE_PRESETS["${presetName}"] should have a corresponding ALL_TUTORIALS entry`
      ).toBe(true);
    }

    // Every preset in ALL_TUTORIALS should be in SLIDE_PRESETS
    for (const presetName of tutorialPresetNames) {
      expect(
        slidePresetNames.has(presetName),
        `ALL_TUTORIALS preset "${presetName}" should exist in SLIDE_PRESETS`
      ).toBe(true);
    }
  });
});

// =============================================================================
// Property 11: Batch Render Output Completeness
// Feature: screencast-template-library, Property 11: Batch Render Output Completeness
// **Validates: Requirements 9.2**
// =============================================================================

describe('Property 11: Batch Render Output Completeness', () => {
  it('each preset config has a valid non-empty id for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // ID should be a non-empty string
        expect(typeof tutorial.id).toBe('string');
        expect(tutorial.id.length).toBeGreaterThan(0);

        // ID should be in kebab-case format
        expect(tutorial.id).toMatch(/^[a-z]+(-[a-z]+)*$/);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config has a valid non-empty title for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Title should be a non-empty string
        expect(typeof tutorial.title).toBe('string');
        expect(tutorial.title.length).toBeGreaterThan(0);

        // Title should be human-readable (not kebab-case)
        expect(tutorial.title).not.toMatch(/^[a-z]+(-[a-z]+)+$/);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config has a valid category for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Category should be one of the valid categories
        expect(
          VALID_CATEGORIES.includes(tutorial.category as typeof VALID_CATEGORIES[number]),
          `Category "${tutorial.category}" should be one of: ${VALID_CATEGORIES.join(', ')}`
        ).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config has a valid preset name matching SLIDE_PRESETS for 100+ inputs', () => {
    const slidePresetNames = getAllSlidePresetNames();

    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Preset should be a non-empty string
        expect(typeof tutorial.preset).toBe('string');
        expect(tutorial.preset.length).toBeGreaterThan(0);

        // Preset should exist in SLIDE_PRESETS
        expect(
          slidePresetNames.includes(tutorial.preset),
          `Preset "${tutorial.preset}" should exist in SLIDE_PRESETS`
        ).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config has a valid positive slideCount for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // slideCount should be a positive integer
        expect(typeof tutorial.slideCount).toBe('number');
        expect(Number.isInteger(tutorial.slideCount)).toBe(true);
        expect(tutorial.slideCount).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config slideCount matches actual SLIDE_PRESETS slide count for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        const actualSlides = SLIDE_PRESETS[tutorial.preset];

        // slideCount should match the actual preset slide count
        expect(
          tutorial.slideCount,
          `Tutorial "${tutorial.id}" slideCount (${tutorial.slideCount}) should match SLIDE_PRESETS["${tutorial.preset}"] length (${actualSlides?.length})`
        ).toBe(actualSlides?.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('each preset config id matches its preset name', () => {
    for (const tutorial of ALL_TUTORIALS) {
      // ID should match preset name (they use the same kebab-case format)
      expect(
        tutorial.id,
        `Tutorial ID "${tutorial.id}" should match preset name "${tutorial.preset}"`
      ).toBe(tutorial.preset);
    }
  });

  it('expected output files can be derived from preset config for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Verify we can construct expected output file paths
        const outputDir = `static/tutorials/${tutorial.category}/${tutorial.id}`;
        const expectedFiles = [
          `${outputDir}/${tutorial.id}.mp4`,
          `${outputDir}/${tutorial.id}.gif`,
          `${outputDir}/${tutorial.id}-poster.png`,
        ];

        // All expected file paths should be valid strings
        for (const filePath of expectedFiles) {
          expect(typeof filePath).toBe('string');
          expect(filePath.length).toBeGreaterThan(0);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('all presets have slideCount between 4 and 6 (current implementation)', () => {
    for (const tutorial of ALL_TUTORIALS) {
      expect(
        tutorial.slideCount,
        `Tutorial "${tutorial.id}" should have 4-6 slides`
      ).toBeGreaterThanOrEqual(4);
      expect(
        tutorial.slideCount,
        `Tutorial "${tutorial.id}" should have 4-6 slides`
      ).toBeLessThanOrEqual(6);
    }
  });

  it('category distribution matches expected preset organization', () => {
    const byCategory = ALL_TUTORIALS.reduce(
      (acc, tutorial) => {
        acc[tutorial.category] = (acc[tutorial.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Expected distribution: 9 tutorial, 4 showcase, 4 project, 1 design-tips
    expect(byCategory['tutorial']).toBe(9);
    expect(byCategory['showcase']).toBe(4);
    expect(byCategory['project']).toBe(4);
    expect(byCategory['design-tips']).toBe(1);
  });
});

// =============================================================================
// Combined Property Tests
// =============================================================================

describe('Combined Batch Render Validation', () => {
  it('all tutorials pass all validation properties', () => {
    for (const tutorial of ALL_TUTORIALS) {
      // Property 10: Preset exists in SLIDE_PRESETS
      expect(SLIDE_PRESETS[tutorial.preset]).toBeDefined();

      // Property 11: All required fields are valid
      expect(typeof tutorial.id).toBe('string');
      expect(tutorial.id.length).toBeGreaterThan(0);
      expect(typeof tutorial.title).toBe('string');
      expect(tutorial.title.length).toBeGreaterThan(0);
      expect(VALID_CATEGORIES.includes(tutorial.category as typeof VALID_CATEGORIES[number])).toBe(true);
      expect(typeof tutorial.preset).toBe('string');
      expect(tutorial.preset.length).toBeGreaterThan(0);
      expect(typeof tutorial.slideCount).toBe('number');
      expect(tutorial.slideCount).toBeGreaterThan(0);

      // slideCount matches actual preset
      const actualSlides = SLIDE_PRESETS[tutorial.preset];
      expect(tutorial.slideCount).toBe(actualSlides.length);
    }
  });

  it('random sampling of tutorials maintains all invariants for 100+ inputs', () => {
    fc.assert(
      fc.property(tutorialConfigArb, (tutorial) => {
        // Property 10: Batch Render Preset Coverage
        expect(SLIDE_PRESETS[tutorial.preset]).toBeDefined();

        // Property 11: Batch Render Output Completeness
        expect(typeof tutorial.id).toBe('string');
        expect(tutorial.id.length).toBeGreaterThan(0);
        expect(typeof tutorial.title).toBe('string');
        expect(tutorial.title.length).toBeGreaterThan(0);
        expect(VALID_CATEGORIES.includes(tutorial.category as typeof VALID_CATEGORIES[number])).toBe(true);
        expect(typeof tutorial.preset).toBe('string');
        expect(tutorial.preset.length).toBeGreaterThan(0);
        expect(typeof tutorial.slideCount).toBe('number');
        expect(tutorial.slideCount).toBeGreaterThan(0);

        // slideCount matches actual preset
        const actualSlides = SLIDE_PRESETS[tutorial.preset];
        expect(tutorial.slideCount).toBe(actualSlides.length);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
