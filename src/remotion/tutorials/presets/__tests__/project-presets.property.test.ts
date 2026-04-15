/**
 * Property-Based Tests for Project Presets
 *
 * Uses fast-check to verify invariants for project preset slide configurations,
 * ensuring all presets have valid screenshot paths, click target coordinates,
 * and zoom region scale values.
 *
 * Properties tested in this file:
 *   6. Screenshot Path Validity - all screenshot paths are non-empty strings
 *   7. Click Target Coordinate Bounds - all click target x/y values are within 0-100
 *   8. Zoom Region Scale Bounds - all zoom region scale values are within 1.0-4.0
 *
 * **Validates: Requirements 8.3, 8.4, 8.5**
 *
 * Feature: screencast-template-library
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { SlideConfig, ClickTarget, ZoomRegion } from '../types';
import {
  PROJECT_AGENCY_WORKFLOW_SLIDES,
  PROJECT_CONTENT_CREATOR_SLIDES,
  PROJECT_FREELANCER_PORTFOLIO_SLIDES,
  PROJECT_SAAS_MARKETING_SLIDES,
  PROJECT_PRESETS,
} from '../project-presets';

// =============================================================================
// Constants
// =============================================================================

/** Minimum allowed click target coordinate (percentage) */
const MIN_COORDINATE = 0;

/** Maximum allowed click target coordinate (percentage) */
const MAX_COORDINATE = 100;

/** Minimum allowed zoom scale */
const MIN_ZOOM_SCALE = 1.0;

/** Maximum allowed zoom scale */
const MAX_ZOOM_SCALE = 4.0;

/** All project preset names */
const PROJECT_PRESET_NAMES = [
  'project-agency-workflow',
  'project-content-creator',
  'project-freelancer-portfolio',
  'project-saas-marketing',
] as const;

/** All project preset slide arrays for testing */
const ALL_PROJECT_SLIDES: Record<string, SlideConfig[]> = {
  'project-agency-workflow': PROJECT_AGENCY_WORKFLOW_SLIDES,
  'project-content-creator': PROJECT_CONTENT_CREATOR_SLIDES,
  'project-freelancer-portfolio': PROJECT_FREELANCER_PORTFOLIO_SLIDES,
  'project-saas-marketing': PROJECT_SAAS_MARKETING_SLIDES,
};

// =============================================================================
// Test Utilities
// =============================================================================

/**
 * Collect all slides from all project presets into a flat array with metadata
 */
function getAllProjectSlides(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
}> {
  const allSlides: Array<{
    presetName: string;
    slideIndex: number;
    slide: SlideConfig;
  }> = [];

  for (const [presetName, slides] of Object.entries(ALL_PROJECT_SLIDES)) {
    slides.forEach((slide, index) => {
      allSlides.push({
        presetName,
        slideIndex: index,
        slide,
      });
    });
  }

  return allSlides;
}

/**
 * Collect all slides with click targets from all project presets
 */
function getSlidesWithClickTargets(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
  clickTarget: ClickTarget;
}> {
  return getAllProjectSlides()
    .filter((item) => item.slide.clickTarget !== undefined)
    .map((item) => ({
      ...item,
      clickTarget: item.slide.clickTarget!,
    }));
}

/**
 * Collect all slides with zoom regions from all project presets
 */
function getSlidesWithZoomRegions(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
  zoomRegion: ZoomRegion;
}> {
  return getAllProjectSlides()
    .filter((item) => item.slide.zoomRegion !== undefined)
    .map((item) => ({
      ...item,
      zoomRegion: item.slide.zoomRegion!,
    }));
}

// =============================================================================
// Arbitraries (Generators)
// =============================================================================

/**
 * Generate a valid project preset name
 */
const projectPresetNameArb = fc.constantFrom(...PROJECT_PRESET_NAMES);

/**
 * Generate a random slide index (0-4 for 5-slide presets)
 */
const slideIndexArb = fc.integer({ min: 0, max: 4 });

/**
 * Generate a random project slide by selecting a preset and index
 */
const projectSlideArb = fc.tuple(projectPresetNameArb, slideIndexArb).map(([presetName, index]) => {
  const slides = ALL_PROJECT_SLIDES[presetName];
  const safeIndex = index % slides.length;
  return {
    presetName,
    slideIndex: safeIndex,
    slide: slides[safeIndex],
  };
});

// =============================================================================
// Property 6: Screenshot Path Validity
// Feature: screencast-template-library, Property 6: Screenshot Path Validity
// **Validates: Requirements 8.3**
// =============================================================================

describe('Property 6: Screenshot Path Validity', () => {
  it('all project preset slides have non-empty screenshot paths for 100+ inputs', () => {
    const allSlides = getAllProjectSlides();

    // Ensure we have slides to test
    expect(allSlides.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allSlides.length - 1 }),
        (slideIndex) => {
          const { presetName, slideIndex: idx, slide } = allSlides[slideIndex];

          // Screenshot path must be a string
          expect(typeof slide.screenshot).toBe('string');

          // Screenshot path must be non-empty
          expect(slide.screenshot.length).toBeGreaterThan(0);

          // Screenshot path should not be just whitespace
          expect(slide.screenshot.trim().length).toBeGreaterThan(0);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all screenshot paths follow expected directory structure for 100+ inputs', () => {
    const allSlides = getAllProjectSlides();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allSlides.length - 1 }),
        (slideIndex) => {
          const { presetName, slide } = allSlides[slideIndex];

          // Screenshot path should start with 'tutorials/project/'
          expect(slide.screenshot.startsWith('tutorials/project/')).toBe(true);

          // Screenshot path should end with .png
          expect(slide.screenshot.endsWith('.png')).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('each project preset has exactly 5 slides with valid screenshot paths', () => {
    for (const presetName of PROJECT_PRESET_NAMES) {
      const slides = ALL_PROJECT_SLIDES[presetName];

      // Each preset should have exactly 5 slides
      expect(slides.length).toBe(5);

      // Each slide should have a valid screenshot path
      slides.forEach((slide, index) => {
        expect(
          typeof slide.screenshot === 'string' && slide.screenshot.length > 0,
          `Preset ${presetName}, slide ${index}: screenshot path should be a non-empty string`
        ).toBe(true);
      });
    }
  });

  it('PROJECT_PRESETS object contains all 4 project presets', () => {
    expect(Object.keys(PROJECT_PRESETS).length).toBe(4);

    for (const presetName of PROJECT_PRESET_NAMES) {
      expect(PROJECT_PRESETS[presetName]).toBeDefined();
      expect(Array.isArray(PROJECT_PRESETS[presetName])).toBe(true);
    }
  });
});

// =============================================================================
// Property 7: Click Target Coordinate Bounds
// Feature: screencast-template-library, Property 7: Click Target Coordinate Bounds
// **Validates: Requirements 8.4**
// =============================================================================

describe('Property 7: Click Target Coordinate Bounds', () => {
  it('all click target x coordinates are within 0-100 range for 100+ inputs', () => {
    const slidesWithClickTargets = getSlidesWithClickTargets();

    // Ensure we have click targets to test
    expect(slidesWithClickTargets.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithClickTargets.length - 1 }),
        (index) => {
          const { presetName, slideIndex, clickTarget } = slidesWithClickTargets[index];

          // X coordinate must be a number
          expect(typeof clickTarget.x).toBe('number');

          // X coordinate must be within 0-100 range
          expect(clickTarget.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(clickTarget.x).toBeLessThanOrEqual(MAX_COORDINATE);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all click target y coordinates are within 0-100 range for 100+ inputs', () => {
    const slidesWithClickTargets = getSlidesWithClickTargets();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithClickTargets.length - 1 }),
        (index) => {
          const { presetName, slideIndex, clickTarget } = slidesWithClickTargets[index];

          // Y coordinate must be a number
          expect(typeof clickTarget.y).toBe('number');

          // Y coordinate must be within 0-100 range
          expect(clickTarget.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(clickTarget.y).toBeLessThanOrEqual(MAX_COORDINATE);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all click targets have both x and y coordinates defined for 100+ inputs', () => {
    const slidesWithClickTargets = getSlidesWithClickTargets();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithClickTargets.length - 1 }),
        (index) => {
          const { clickTarget } = slidesWithClickTargets[index];

          // Both x and y must be defined
          expect(clickTarget.x).toBeDefined();
          expect(clickTarget.y).toBeDefined();

          // Both must be numbers (not NaN)
          expect(Number.isFinite(clickTarget.x)).toBe(true);
          expect(Number.isFinite(clickTarget.y)).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('every project slide has a click target defined', () => {
    const allSlides = getAllProjectSlides();

    for (const { presetName, slideIndex, slide } of allSlides) {
      expect(
        slide.clickTarget !== undefined,
        `Preset ${presetName}, slide ${slideIndex}: should have a clickTarget defined`
      ).toBe(true);
    }
  });

  it('click target labels are non-empty strings when present for 100+ inputs', () => {
    const slidesWithClickTargets = getSlidesWithClickTargets();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithClickTargets.length - 1 }),
        (index) => {
          const { clickTarget } = slidesWithClickTargets[index];

          // If label is present, it should be a non-empty string
          if (clickTarget.label !== undefined) {
            expect(typeof clickTarget.label).toBe('string');
            expect(clickTarget.label.length).toBeGreaterThan(0);
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Property 8: Zoom Region Scale Bounds
// Feature: screencast-template-library, Property 8: Zoom Region Scale Bounds
// **Validates: Requirements 8.5**
// =============================================================================

describe('Property 8: Zoom Region Scale Bounds', () => {
  it('all zoom region scale values are within 1.0-4.0 range for 100+ inputs', () => {
    const slidesWithZoomRegions = getSlidesWithZoomRegions();

    // Ensure we have zoom regions to test
    expect(slidesWithZoomRegions.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithZoomRegions.length - 1 }),
        (index) => {
          const { presetName, slideIndex, zoomRegion } = slidesWithZoomRegions[index];

          // Scale must be a number
          expect(typeof zoomRegion.scale).toBe('number');

          // Scale must be within 1.0-4.0 range
          expect(zoomRegion.scale).toBeGreaterThanOrEqual(MIN_ZOOM_SCALE);
          expect(zoomRegion.scale).toBeLessThanOrEqual(MAX_ZOOM_SCALE);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all zoom region x coordinates are within 0-100 range for 100+ inputs', () => {
    const slidesWithZoomRegions = getSlidesWithZoomRegions();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithZoomRegions.length - 1 }),
        (index) => {
          const { zoomRegion } = slidesWithZoomRegions[index];

          // X coordinate must be within 0-100 range
          expect(zoomRegion.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(zoomRegion.x).toBeLessThanOrEqual(MAX_COORDINATE);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all zoom region y coordinates are within 0-100 range for 100+ inputs', () => {
    const slidesWithZoomRegions = getSlidesWithZoomRegions();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithZoomRegions.length - 1 }),
        (index) => {
          const { zoomRegion } = slidesWithZoomRegions[index];

          // Y coordinate must be within 0-100 range
          expect(zoomRegion.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(zoomRegion.y).toBeLessThanOrEqual(MAX_COORDINATE);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('zoom regions have all required properties defined for 100+ inputs', () => {
    const slidesWithZoomRegions = getSlidesWithZoomRegions();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: slidesWithZoomRegions.length - 1 }),
        (index) => {
          const { zoomRegion } = slidesWithZoomRegions[index];

          // All properties must be defined
          expect(zoomRegion.x).toBeDefined();
          expect(zoomRegion.y).toBeDefined();
          expect(zoomRegion.scale).toBeDefined();

          // All must be finite numbers (not NaN or Infinity)
          expect(Number.isFinite(zoomRegion.x)).toBe(true);
          expect(Number.isFinite(zoomRegion.y)).toBe(true);
          expect(Number.isFinite(zoomRegion.scale)).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Combined Property Tests
// =============================================================================

describe('Combined Project Preset Validation', () => {
  it('all project presets pass all validation properties', () => {
    for (const presetName of PROJECT_PRESET_NAMES) {
      const slides = ALL_PROJECT_SLIDES[presetName];

      slides.forEach((slide, index) => {
        // Property 6: Screenshot path validity
        expect(
          typeof slide.screenshot === 'string' && slide.screenshot.length > 0,
          `${presetName}[${index}]: screenshot path should be valid`
        ).toBe(true);

        // Property 7: Click target coordinate bounds
        if (slide.clickTarget) {
          expect(
            slide.clickTarget.x >= MIN_COORDINATE && slide.clickTarget.x <= MAX_COORDINATE,
            `${presetName}[${index}]: clickTarget.x should be within 0-100`
          ).toBe(true);
          expect(
            slide.clickTarget.y >= MIN_COORDINATE && slide.clickTarget.y <= MAX_COORDINATE,
            `${presetName}[${index}]: clickTarget.y should be within 0-100`
          ).toBe(true);
        }

        // Property 8: Zoom region scale bounds
        if (slide.zoomRegion) {
          expect(
            slide.zoomRegion.scale >= MIN_ZOOM_SCALE && slide.zoomRegion.scale <= MAX_ZOOM_SCALE,
            `${presetName}[${index}]: zoomRegion.scale should be within 1.0-4.0`
          ).toBe(true);
          expect(
            slide.zoomRegion.x >= MIN_COORDINATE && slide.zoomRegion.x <= MAX_COORDINATE,
            `${presetName}[${index}]: zoomRegion.x should be within 0-100`
          ).toBe(true);
          expect(
            slide.zoomRegion.y >= MIN_COORDINATE && slide.zoomRegion.y <= MAX_COORDINATE,
            `${presetName}[${index}]: zoomRegion.y should be within 0-100`
          ).toBe(true);
        }
      });
    }
  });

  it('random sampling of slides maintains all invariants for 100+ inputs', () => {
    fc.assert(
      fc.property(projectSlideArb, ({ presetName, slideIndex, slide }) => {
        // Property 6: Screenshot path validity
        expect(typeof slide.screenshot).toBe('string');
        expect(slide.screenshot.length).toBeGreaterThan(0);

        // Property 7: Click target coordinate bounds (if present)
        if (slide.clickTarget) {
          expect(slide.clickTarget.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(slide.clickTarget.x).toBeLessThanOrEqual(MAX_COORDINATE);
          expect(slide.clickTarget.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(slide.clickTarget.y).toBeLessThanOrEqual(MAX_COORDINATE);
        }

        // Property 8: Zoom region scale bounds (if present)
        if (slide.zoomRegion) {
          expect(slide.zoomRegion.scale).toBeGreaterThanOrEqual(MIN_ZOOM_SCALE);
          expect(slide.zoomRegion.scale).toBeLessThanOrEqual(MAX_ZOOM_SCALE);
          expect(slide.zoomRegion.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(slide.zoomRegion.x).toBeLessThanOrEqual(MAX_COORDINATE);
          expect(slide.zoomRegion.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
          expect(slide.zoomRegion.y).toBeLessThanOrEqual(MAX_COORDINATE);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
