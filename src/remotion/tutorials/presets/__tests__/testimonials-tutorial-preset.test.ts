/**
 * Unit Tests for Testimonials Tutorial Preset
 *
 * Validates the testimonials-tutorial preset configuration ensuring:
 * - Preset has exactly 6 slides
 * - All click target coordinates are within 0-100 range
 * - All zoom scale values are within 1.0-4.0 range
 * - Annotation text matches expected values for each slide
 *
 * **Validates: Requirements 12.3, 12.4**
 *
 * Feature: testimonials-tutorial-screencast
 */

import { describe, it, expect } from 'vitest';
import { TESTIMONIALS_TUTORIAL_SLIDES } from '../testimonials-tutorial-preset';
import type { SlideConfig } from '../types';

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

/** Expected number of slides in the testimonials tutorial */
const EXPECTED_SLIDE_COUNT = 6;

/** Expected annotation text for each slide (Requirements 10.1-10.6) */
const EXPECTED_ANNOTATIONS = [
  'Step 1: Visit freelancer-templates.org',
  'Step 2: Select Testimonials Template',
  'Step 3: Customize Brand Colors',
  'Step 4: Edit Testimonial Content',
  'Step 5: Preview Your Video',
  'Step 6: Export Final Video',
];

// =============================================================================
// Slide Count Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Slide Count', () => {
  it('should have exactly 6 slides', () => {
    expect(TESTIMONIALS_TUTORIAL_SLIDES).toHaveLength(EXPECTED_SLIDE_COUNT);
  });

  it('should export a valid array of SlideConfig objects', () => {
    expect(Array.isArray(TESTIMONIALS_TUTORIAL_SLIDES)).toBe(true);
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(slide).toBeDefined();
      expect(typeof slide).toBe('object');
      expect(slide.screenshot).toBeDefined();
    });
  });
});

// =============================================================================
// Click Target Coordinate Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Click Target Coordinates', () => {
  it('all click target x coordinates should be within 0-100 range', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.clickTarget) {
        expect(
          slide.clickTarget.x,
          `Slide ${index + 1}: clickTarget.x (${slide.clickTarget.x}) should be >= ${MIN_COORDINATE}`
        ).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(
          slide.clickTarget.x,
          `Slide ${index + 1}: clickTarget.x (${slide.clickTarget.x}) should be <= ${MAX_COORDINATE}`
        ).toBeLessThanOrEqual(MAX_COORDINATE);
      }
    });
  });

  it('all click target y coordinates should be within 0-100 range', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.clickTarget) {
        expect(
          slide.clickTarget.y,
          `Slide ${index + 1}: clickTarget.y (${slide.clickTarget.y}) should be >= ${MIN_COORDINATE}`
        ).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(
          slide.clickTarget.y,
          `Slide ${index + 1}: clickTarget.y (${slide.clickTarget.y}) should be <= ${MAX_COORDINATE}`
        ).toBeLessThanOrEqual(MAX_COORDINATE);
      }
    });
  });

  it('all slides should have click targets defined', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        slide.clickTarget,
        `Slide ${index + 1}: should have a clickTarget defined`
      ).toBeDefined();
    });
  });

  it('click target coordinates should be finite numbers', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.clickTarget) {
        expect(
          Number.isFinite(slide.clickTarget.x),
          `Slide ${index + 1}: clickTarget.x should be a finite number`
        ).toBe(true);
        expect(
          Number.isFinite(slide.clickTarget.y),
          `Slide ${index + 1}: clickTarget.y should be a finite number`
        ).toBe(true);
      }
    });
  });
});

// =============================================================================
// Zoom Region Scale Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Zoom Region Scale', () => {
  it('all zoom scale values should be within 1.0-4.0 range', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.zoomRegion) {
        expect(
          slide.zoomRegion.scale,
          `Slide ${index + 1}: zoomRegion.scale (${slide.zoomRegion.scale}) should be >= ${MIN_ZOOM_SCALE}`
        ).toBeGreaterThanOrEqual(MIN_ZOOM_SCALE);
        expect(
          slide.zoomRegion.scale,
          `Slide ${index + 1}: zoomRegion.scale (${slide.zoomRegion.scale}) should be <= ${MAX_ZOOM_SCALE}`
        ).toBeLessThanOrEqual(MAX_ZOOM_SCALE);
      }
    });
  });

  it('zoom region coordinates should be within 0-100 range', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.zoomRegion) {
        expect(
          slide.zoomRegion.x,
          `Slide ${index + 1}: zoomRegion.x (${slide.zoomRegion.x}) should be >= ${MIN_COORDINATE}`
        ).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(
          slide.zoomRegion.x,
          `Slide ${index + 1}: zoomRegion.x (${slide.zoomRegion.x}) should be <= ${MAX_COORDINATE}`
        ).toBeLessThanOrEqual(MAX_COORDINATE);
        expect(
          slide.zoomRegion.y,
          `Slide ${index + 1}: zoomRegion.y (${slide.zoomRegion.y}) should be >= ${MIN_COORDINATE}`
        ).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(
          slide.zoomRegion.y,
          `Slide ${index + 1}: zoomRegion.y (${slide.zoomRegion.y}) should be <= ${MAX_COORDINATE}`
        ).toBeLessThanOrEqual(MAX_COORDINATE);
      }
    });
  });

  it('zoom region values should be finite numbers', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      if (slide.zoomRegion) {
        expect(
          Number.isFinite(slide.zoomRegion.x),
          `Slide ${index + 1}: zoomRegion.x should be a finite number`
        ).toBe(true);
        expect(
          Number.isFinite(slide.zoomRegion.y),
          `Slide ${index + 1}: zoomRegion.y should be a finite number`
        ).toBe(true);
        expect(
          Number.isFinite(slide.zoomRegion.scale),
          `Slide ${index + 1}: zoomRegion.scale should be a finite number`
        ).toBe(true);
      }
    });
  });

  it('slides 2, 3, and 4 should have zoom regions defined', () => {
    // Per design doc: slides 2, 3, 4 have zoom regions
    const slidesWithZoom = [1, 2, 3]; // 0-indexed: slides 2, 3, 4
    slidesWithZoom.forEach((slideIndex) => {
      expect(
        TESTIMONIALS_TUTORIAL_SLIDES[slideIndex].zoomRegion,
        `Slide ${slideIndex + 1}: should have a zoomRegion defined`
      ).toBeDefined();
    });
  });
});

// =============================================================================
// Annotation Text Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Annotation Text', () => {
  it('all slides should have annotations defined', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        slide.annotation,
        `Slide ${index + 1}: should have an annotation defined`
      ).toBeDefined();
    });
  });

  it('annotation text should match expected values for each slide', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        slide.annotation,
        `Slide ${index + 1}: annotation should match expected text`
      ).toBe(EXPECTED_ANNOTATIONS[index]);
    });
  });

  it('annotations should be non-empty strings', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        typeof slide.annotation,
        `Slide ${index + 1}: annotation should be a string`
      ).toBe('string');
      expect(
        slide.annotation!.length,
        `Slide ${index + 1}: annotation should not be empty`
      ).toBeGreaterThan(0);
    });
  });

  it('each annotation should be unique', () => {
    const annotations = TESTIMONIALS_TUTORIAL_SLIDES.map((slide) => slide.annotation);
    const uniqueAnnotations = new Set(annotations);
    expect(uniqueAnnotations.size).toBe(annotations.length);
  });
});

// =============================================================================
// Screenshot Path Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Screenshot Paths', () => {
  it('all slides should have screenshot paths defined', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        slide.screenshot,
        `Slide ${index + 1}: should have a screenshot path defined`
      ).toBeDefined();
    });
  });

  it('screenshot paths should be non-empty strings', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        typeof slide.screenshot,
        `Slide ${index + 1}: screenshot should be a string`
      ).toBe('string');
      expect(
        slide.screenshot.length,
        `Slide ${index + 1}: screenshot path should not be empty`
      ).toBeGreaterThan(0);
    });
  });

  it('screenshot paths should follow expected directory structure', () => {
    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      expect(
        slide.screenshot.startsWith('tutorials/testimonials-tutorial/'),
        `Slide ${index + 1}: screenshot path should start with 'tutorials/testimonials-tutorial/'`
      ).toBe(true);
      expect(
        slide.screenshot.endsWith('.png'),
        `Slide ${index + 1}: screenshot path should end with '.png'`
      ).toBe(true);
    });
  });
});

// =============================================================================
// Combined Validation
// =============================================================================

describe('Testimonials Tutorial Preset - Combined Validation', () => {
  it('preset passes all validation rules', () => {
    // Verify slide count
    expect(TESTIMONIALS_TUTORIAL_SLIDES).toHaveLength(EXPECTED_SLIDE_COUNT);

    TESTIMONIALS_TUTORIAL_SLIDES.forEach((slide, index) => {
      // Screenshot path validity
      expect(typeof slide.screenshot).toBe('string');
      expect(slide.screenshot.length).toBeGreaterThan(0);

      // Annotation completeness
      expect(slide.annotation).toBeDefined();
      expect(typeof slide.annotation).toBe('string');
      expect(slide.annotation!.length).toBeGreaterThan(0);

      // Click target coordinate bounds
      if (slide.clickTarget) {
        expect(slide.clickTarget.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(slide.clickTarget.x).toBeLessThanOrEqual(MAX_COORDINATE);
        expect(slide.clickTarget.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(slide.clickTarget.y).toBeLessThanOrEqual(MAX_COORDINATE);
      }

      // Zoom region scale bounds
      if (slide.zoomRegion) {
        expect(slide.zoomRegion.scale).toBeGreaterThanOrEqual(MIN_ZOOM_SCALE);
        expect(slide.zoomRegion.scale).toBeLessThanOrEqual(MAX_ZOOM_SCALE);
        expect(slide.zoomRegion.x).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(slide.zoomRegion.x).toBeLessThanOrEqual(MAX_COORDINATE);
        expect(slide.zoomRegion.y).toBeGreaterThanOrEqual(MIN_COORDINATE);
        expect(slide.zoomRegion.y).toBeLessThanOrEqual(MAX_COORDINATE);
      }
    });
  });
});
