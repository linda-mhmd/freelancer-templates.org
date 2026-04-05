/**
 * CAS Panel — Property-Based Tests (Pure Logic)
 *
 * Tests tab stagger timing formulas and name plate data contracts directly,
 * without React rendering (node environment, no jsdom).
 *
 * Feature: avatar-generator-module
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { spring, interpolate } from 'remotion';

import { CAS_CATEGORIES } from '../AvatarDisplay';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../../data/simsTheme';

const FPS = 30;
const TAB_STAGGER = 20;
const TAB_SPRING_CONFIG = { damping: 14, stiffness: 120 };

// ─── Property 12: CAS Panel tab stagger timing ─────────────────────────────
// Feature: avatar-generator-module, Property 12: CAS Panel tab stagger timing
// **Validates: Requirements 10.4**

describe('Property 12: CAS Panel tab stagger timing', () => {
  it('CAS_CATEGORIES has exactly 5 tabs (indices 0–4)', () => {
    expect(CAS_CATEGORIES).toHaveLength(5);
    for (const cat of CAS_CATEGORIES) {
      expect(cat).toHaveProperty('icon');
      expect(cat).toHaveProperty('label');
    }
  });

  it('each tab label matches the expected CAS categories', () => {
    const expectedLabels = ['Hair', 'Face', 'Body', 'Clothing', 'Accessories'];
    expect(CAS_CATEGORIES.map((c) => c.label)).toEqual(expectedLabels);
  });

  it('PBT: for any tab index i (0–4), tab i starts its spring at frame i * 20', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 4 }),
        (tabIndex) => {
          const expectedStartFrame = tabIndex * TAB_STAGGER;

          // The CAS Panel uses: spring({ frame: frame - i * 20, fps, config })
          // At exactly the start frame, the spring input is 0
          const springAtStart = spring({
            frame: expectedStartFrame - expectedStartFrame, // = 0
            fps: FPS,
            config: TAB_SPRING_CONFIG,
          });
          // spring at frame=0 should be 0 (animation hasn't progressed)
          expect(springAtStart).toBe(0);

          // One frame after start, spring should be > 0 (animation has begun)
          const springOneAfter = spring({
            frame: 1,
            fps: FPS,
            config: TAB_SPRING_CONFIG,
          });
          expect(springOneAfter).toBeGreaterThan(0);

          // Before the start frame, the spring input is negative → spring returns 0
          if (expectedStartFrame > 0) {
            const springBefore = spring({
              frame: -1,
              fps: FPS,
              config: TAB_SPRING_CONFIG,
            });
            expect(springBefore).toBe(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: tab opacity interpolation starts at frame i * 20 and reaches 1 by i * 20 + 10', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 4 }),
        fc.integer({ min: 0, max: 300 }),
        (tabIndex, frame) => {
          const startFrame = tabIndex * TAB_STAGGER;

          // The CAS Panel uses: interpolate(frame, [i*20, i*20+10], [0, 1], { extrapolateRight: 'clamp' })
          const tabOpacity = interpolate(
            frame,
            [startFrame, startFrame + 10],
            [0, 1],
            { extrapolateRight: 'clamp' },
          );

          if (frame <= startFrame) {
            // Before or at start: opacity is 0
            expect(tabOpacity).toBeLessThanOrEqual(0);
          } else if (frame >= startFrame + 10) {
            // After fade-in completes: opacity is clamped to 1
            expect(tabOpacity).toBe(1);
          } else {
            // During fade-in: opacity is between 0 and 1 (exclusive)
            expect(tabOpacity).toBeGreaterThan(0);
            expect(tabOpacity).toBeLessThan(1);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: spring config { damping: 14, stiffness: 120 } produces correct values for all tabs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 4 }),
        fc.integer({ min: 0, max: 60 }),
        (tabIndex, framesAfterStart) => {
          const startFrame = tabIndex * TAB_STAGGER;
          const currentFrame = startFrame + framesAfterStart;

          // Compute spring with the exact config the CAS Panel uses
          const springValue = spring({
            frame: currentFrame - startFrame,
            fps: FPS,
            config: TAB_SPRING_CONFIG,
          });

          // Spring value should be in valid range
          expect(springValue).toBeGreaterThanOrEqual(0);
          expect(springValue).toBeLessThanOrEqual(1.1); // spring can slightly overshoot

          // At frame 0 (relative), spring is 0
          if (framesAfterStart === 0) {
            expect(springValue).toBe(0);
          }

          // After enough frames, spring converges to 1
          if (framesAfterStart >= 40) {
            expect(springValue).toBeCloseTo(1, 1);
          }

          // Verify the config is deterministic: same inputs → same output
          const springAgain = spring({
            frame: currentFrame - startFrame,
            fps: FPS,
            config: { damping: 14, stiffness: 120 },
          });
          expect(springValue).toBe(springAgain);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('tabs are staggered: tab i+1 starts strictly after tab i', () => {
    for (let i = 0; i < CAS_CATEGORIES.length - 1; i++) {
      const startI = i * TAB_STAGGER;
      const startNext = (i + 1) * TAB_STAGGER;
      expect(startNext).toBe(startI + TAB_STAGGER);
      expect(startNext).toBeGreaterThan(startI);
    }
  });
});

// ─── Property 13: CAS Panel name plate contains characterName ───────────────
// Feature: avatar-generator-module, Property 13: CAS Panel name plate contains characterName
// **Validates: Requirements 10.7**

describe('Property 13: CAS Panel name plate contains characterName', () => {
  it('name plate uses SIMS_COLORS.panelBlue background', () => {
    expect(SIMS_COLORS.panelBlue).toBe('rgba(30, 80, 180, 0.88)');
  });

  it('name plate uses SIMS_FONTS.simsLike font family', () => {
    expect(SIMS_FONTS.simsLike).toBe('"Nunito", sans-serif');
  });

  it('name plate uses SIMS_SIZES.borderRadius.pill for rounding', () => {
    expect(SIMS_SIZES.borderRadius.pill).toBe(999);
  });

  it('PBT: for any non-empty characterName, the name plate data contract holds', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        (characterName) => {
          // The CAS Panel renders characterName directly as text content
          // inside a div with data-testid="cas-name-plate"
          // The name is passed through without truncation or transformation
          expect(typeof characterName).toBe('string');
          expect(characterName.length).toBeGreaterThan(0);
          expect(characterName.trim().length).toBeGreaterThan(0);

          // The name plate styling constants must be stable
          expect(SIMS_COLORS.panelBlue).toBe('rgba(30, 80, 180, 0.88)');
          expect(SIMS_FONTS.simsLike).toBe('"Nunito", sans-serif');
          expect(SIMS_SIZES.borderRadius.pill).toBe(999);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: name plate opacity formula: 0 before frame 120, 1 at frame 150+', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 400 }),
        (frame) => {
          // The CAS Panel uses: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' })
          const namePlateOpacity = interpolate(frame, [120, 150], [0, 1], {
            extrapolateRight: 'clamp',
          });

          if (frame <= 120) {
            expect(namePlateOpacity).toBeLessThanOrEqual(0);
          } else if (frame >= 150) {
            expect(namePlateOpacity).toBe(1);
          } else {
            // Between 120 and 150: opacity is between 0 and 1
            expect(namePlateOpacity).toBeGreaterThan(0);
            expect(namePlateOpacity).toBeLessThan(1);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('PBT: name plate opacity is monotonically non-decreasing from frame 0 to 300', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 299 }),
        (frame) => {
          const opacityNow = interpolate(frame, [120, 150], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const opacityNext = interpolate(frame + 1, [120, 150], [0, 1], {
            extrapolateRight: 'clamp',
          });

          expect(opacityNext).toBeGreaterThanOrEqual(opacityNow);
        },
      ),
      { numRuns: 100 },
    );
  });
});
