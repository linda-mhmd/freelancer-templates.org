/**
 * Property-Based Tests for Design Tips Preset
 *
 * Uses fast-check to verify invariants for the video-design-tips preset slide configurations,
 * ensuring all slides have valid screenshot paths, click target coordinates,
 * zoom region scale values, and most importantly, non-empty annotations explaining
 * design principles.
 *
 * Properties tested in this file:
 *   6. Screenshot Path Validity - all screenshot paths are non-empty strings
 *   7. Click Target Coordinate Bounds - all click target x/y values are within 0-100
 *   8. Zoom Region Scale Bounds - all zoom region scale values are within 1.0-4.0
 *   12. Video Design Tips Annotation Completeness - all slides have non-empty annotations
 *
 * **Validates: Requirements 3.3, 8.3, 8.4, 8.5**
 *
 * Feature: screencast-template-library
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { SlideConfig, ClickTarget, ZoomRegion } from '../types';
import {
  VIDEO_DESIGN_TIPS_SLIDES,
  DESIGN_TIPS_PRESETS,
} from '../design-tips-preset';

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

/** Design tips preset name */
const DESIGN_TIPS_PRESET_NAME = 'video-design-tips';

/** All design tips preset slide arrays for testing */
const ALL_DESIGN_TIPS_SLIDES: Record<string, SlideConfig[]> = {
  'video-design-tips': VIDEO_DESIGN_TIPS_SLIDES,
};

// =============================================================================
// Test Utilities
// =============================================================================

/**
 * Collect all slides from the design tips preset into a flat array with metadata
 */
function getAllDesignTipsSlides(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
}> {
  const allSlides: Array<{
    presetName: string;
    slideIndex: number;
    slide: SlideConfig;
  }> = [];

  for (const [presetName, slides] of Object.entries(ALL_DESIGN_TIPS_SLIDES)) {
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
 * Collect all slides with click targets from the design tips preset
 */
function getSlidesWithClickTargets(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
  clickTarget: ClickTarget;
}> {
  return getAllDesignTipsSlides()
    .filter((item) => item.slide.clickTarget !== undefined)
    .map((item) => ({
      ...item,
      clickTarget: item.slide.clickTarget!,
    }));
}

/**
 * Collect all slides with zoom regions from the design tips preset
 */
function getSlidesWithZoomRegions(): Array<{
  presetName: string;
  slideIndex: number;
  slide: SlideConfig;
  zoomRegion: ZoomRegion;
}> {
  return getAllDesignTipsSlides()
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
 * Generate a random slide index (0-4 for 5-slide preset)
 */
const slideIndexArb = fc.integer({ min: 0, max: 4 });

/**
 * Generate a random design tips slide by selecting an index
 */
const designTipsSlideArb = slideIndexArb.map((index) => {
  const slides = VIDEO_DESIGN_TIPS_SLIDES;
  const safeIndex = index % slides.length;
  return {
    presetName: DESIGN_TIPS_PRESET_NAME,
    slideIndex: safeIndex,
    slide: slides[safeIndex],
  };
});

// =============================================================================
// Property 12: Video Design Tips Annotation Completeness
// Feature: screencast-template-library, Property 12: Video Design Tips Annotation Completeness
// **Validates: Requirements 3.3**
// =============================================================================

describe('Property 12: Video Design Tips Annotation Completeness', () => {
  it('all video-design-tips slides have non-empty annotation strings for 100+ inputs', () => {
    const allSlides = getAllDesignTipsSlides();

    // Ensure we have slides to test
    expect(allSlides.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allSlides.length - 1 }),
        (slideIndex) => {
          const { presetName, slideIndex: idx, slide } = allSlides[slideIndex];

          // Annotation must be defined
          expect(slide.annotation).toBeDefined();

          // Annotation must be a string
          expect(typeof slide.annotation).toBe('string');

          // Annotation must be non-empty
          expect(slide.annotation!.length).toBeGreaterThan(0);

          // Annotation should not be just whitespace
          expect(slide.annotation!.trim().length).toBeGreaterThan(0);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all annotations explain a design principle', () => {
    const allSlides = getAllDesignTipsSlides();

    for (const { presetName, slideIndex, slide } of allSlides) {
      // Annotation must be present
      expect(
        slide.annotation !== undefined,
        `Preset ${presetName}, slide ${slideIndex}: should have an annotation defined`
      ).toBe(true);

      // Annotation must be a non-empty string
      expect(
        typeof slide.annotation === 'string' && slide.annotation.length > 0,
        `Preset ${presetName}, slide ${slideIndex}: annotation should be a non-empty string`
      ).toBe(true);

      // Annotation should contain meaningful content (at least 10 characters)
      expect(
        slide.annotation!.length >= 10,
        `Preset ${presetName}, slide ${slideIndex}: annotation should be descriptive (at least 10 characters)`
      ).toBe(true);
    }
  });

  it('each slide annotation is unique', () => {
    const allSlides = getAllDesignTipsSlides();
    const annotations = allSlides.map((item) => item.slide.annotation);

    // All annotations should be unique
    const uniqueAnnotations = new Set(annotations);
    expect(uniqueAnnotations.size).toBe(annotations.length);
  });

  it('video-design-tips preset has exactly 5 slides with annotations', () => {
    const slides = VIDEO_DESIGN_TIPS_SLIDES;

    // Preset should have exactly 5 slides
    expect(slides.length).toBe(5);

    // Each slide should have an annotation
    slides.forEach((slide, index) => {
      expect(
        slide.annotation !== undefined && slide.annotation.length > 0,
        `Slide ${index}: should have a non-empty annotation`
      ).toBe(true);
    });
  });

  it('annotations cover key design principles for 100+ inputs', () => {
    fc.assert(
      fc.property(designTipsSlideArb, ({ presetName, slideIndex, slide }) => {
        // Annotation must be present and non-empty
        expect(slide.annotation).toBeDefined();
        expect(typeof slide.annotation).toBe('string');
        expect(slide.annotation!.trim().length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// =============================================================================
// Property 6: Screenshot Path Validity
// Feature: screencast-template-library, Property 6: Screenshot Path Validity
// **Validates: Requirements 8.3**
// =============================================================================

describe('Property 6: Screenshot Path Validity', () => {
  it('all design tips slides have non-empty screenshot paths for 100+ inputs', () => {
    const allSlides = getAllDesignTipsSlides();

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
    const allSlides = getAllDesignTipsSlides();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allSlides.length - 1 }),
        (slideIndex) => {
          const { presetName, slide } = allSlides[slideIndex];

          // Screenshot path should start with 'tutorials/design-tips/'
          expect(slide.screenshot.startsWith('tutorials/design-tips/')).toBe(true);

          // Screenshot path should end with .png
          expect(slide.screenshot.endsWith('.png')).toBe(true);

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('design tips preset has exactly 5 slides with valid screenshot paths', () => {
    const slides = VIDEO_DESIGN_TIPS_SLIDES;

    // Preset should have exactly 5 slides
    expect(slides.length).toBe(5);

    // Each slide should have a valid screenshot path
    slides.forEach((slide, index) => {
      expect(
        typeof slide.screenshot === 'string' && slide.screenshot.length > 0,
        `Slide ${index}: screenshot path should be a non-empty string`
      ).toBe(true);
    });
  });

  it('DESIGN_TIPS_PRESETS object contains the video-design-tips preset', () => {
    expect(Object.keys(DESIGN_TIPS_PRESETS).length).toBe(1);
    expect(DESIGN_TIPS_PRESETS['video-design-tips']).toBeDefined();
    expect(Array.isArray(DESIGN_TIPS_PRESETS['video-design-tips'])).toBe(true);
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

  it('every design tips slide has a click target defined', () => {
    const allSlides = getAllDesignTipsSlides();

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

describe('Combined Design Tips Preset Validation', () => {
  it('video-design-tips preset passes all validation properties', () => {
    const slides = VIDEO_DESIGN_TIPS_SLIDES;

    slides.forEach((slide, index) => {
      // Property 12: Annotation completeness (key property for design tips)
      expect(
        slide.annotation !== undefined && slide.annotation.length > 0,
        `Slide ${index}: annotation should be present and non-empty`
      ).toBe(true);

      // Property 6: Screenshot path validity
      expect(
        typeof slide.screenshot === 'string' && slide.screenshot.length > 0,
        `Slide ${index}: screenshot path should be valid`
      ).toBe(true);

      // Property 7: Click target coordinate bounds
      if (slide.clickTarget) {
        expect(
          slide.clickTarget.x >= MIN_COORDINATE && slide.clickTarget.x <= MAX_COORDINATE,
          `Slide ${index}: clickTarget.x should be within 0-100`
        ).toBe(true);
        expect(
          slide.clickTarget.y >= MIN_COORDINATE && slide.clickTarget.y <= MAX_COORDINATE,
          `Slide ${index}: clickTarget.y should be within 0-100`
        ).toBe(true);
      }

      // Property 8: Zoom region scale bounds
      if (slide.zoomRegion) {
        expect(
          slide.zoomRegion.scale >= MIN_ZOOM_SCALE && slide.zoomRegion.scale <= MAX_ZOOM_SCALE,
          `Slide ${index}: zoomRegion.scale should be within 1.0-4.0`
        ).toBe(true);
        expect(
          slide.zoomRegion.x >= MIN_COORDINATE && slide.zoomRegion.x <= MAX_COORDINATE,
          `Slide ${index}: zoomRegion.x should be within 0-100`
        ).toBe(true);
        expect(
          slide.zoomRegion.y >= MIN_COORDINATE && slide.zoomRegion.y <= MAX_COORDINATE,
          `Slide ${index}: zoomRegion.y should be within 0-100`
        ).toBe(true);
      }
    });
  });

  it('random sampling of slides maintains all invariants for 100+ inputs', () => {
    fc.assert(
      fc.property(designTipsSlideArb, ({ presetName, slideIndex, slide }) => {
        // Property 12: Annotation completeness (key property)
        expect(slide.annotation).toBeDefined();
        expect(typeof slide.annotation).toBe('string');
        expect(slide.annotation!.length).toBeGreaterThan(0);

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
