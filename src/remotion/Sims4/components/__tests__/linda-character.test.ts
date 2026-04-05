/**
 * LindaCharacter — Property-Based Tests
 *
 * Property tests for the outfit configuration system and animation calculator
 * extracted from SimsUI.tsx.
 */

import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock remotion's useCurrentFrame so LindaCharacter can render in Node
vi.mock('remotion', () => ({ useCurrentFrame: () => 0 }));

import { getOutfitConfig, calculateAnimations, LindaCharacter } from '../SimsUI';

// ─── Valid outfit strings ────────────────────────────────────────────────────

const VALID_OUTFITS = ['green-blazer', 'casual', 'formal', 'aws', 'notion', 'reinvent'] as const;

// ─── Property 2: Outfit Config Completeness ──────────────────────────────────

/**
 * **Validates: Requirements 4.1**
 *
 * For any valid outfit string from the set {'green-blazer', 'casual', 'formal',
 * 'aws', 'notion', 'reinvent'}, getOutfitConfig() returns an OutfitConfig where
 * every field is defined (not undefined).
 *
 * Note: blazerColor and tieColor CAN be null (that's valid), but must not be undefined.
 */
describe('Property 2: Outfit Config Completeness', () => {
  it('every field is defined (not undefined) for any valid outfit', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_OUTFITS),
        (outfit) => {
          const config = getOutfitConfig(outfit);

          expect(config.blazerColor).not.toBeUndefined();
          expect(config.shirtColor).not.toBeUndefined();
          expect(config.tieColor).not.toBeUndefined();
          expect(config.accentColor).not.toBeUndefined();
          expect(config.showShirtText).not.toBeUndefined();
          expect(config.pantsColor).not.toBeUndefined();
          expect(config.bootColor).not.toBeUndefined();
          expect(config.collarStyle).not.toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Property 3: Blazer Outfit Constraints ───────────────────────────────────

/**
 * **Validates: Requirements 4.3**
 *
 * For any outfit in {'green-blazer', 'aws', 'notion', 'reinvent'}, the returned
 * OutfitConfig has a non-null blazerColor and collarStyle equal to 'blazer-lapel'.
 */
describe('Property 3: Blazer Outfit Constraints', () => {
  it('blazer outfits have non-null blazerColor and collarStyle "blazer-lapel"', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('green-blazer' as const, 'aws' as const, 'notion' as const, 'reinvent' as const),
        (outfit) => {
          const config = getOutfitConfig(outfit);

          expect(config.blazerColor).not.toBeNull();
          expect(config.collarStyle).toBe('blazer-lapel');
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ─── Property 5: Animation Boundedness ───────────────────────────────────────

/**
 * **Validates: Requirements 5.3, 5.4, 5.5, 5.6**
 *
 * For any frame ≥ 0 with animate=true, all animation values stay within
 * documented ranges: breatheScaleY in [0.998, 1.002], weightShiftX in [-1.5, 1.5],
 * armSwayLeft/armSwayRight in [-2, 2], blinkProgress in [0, 1], hairSwayX in [-1, 1].
 * No value is NaN or Infinity.
 */
describe('Property 5: Animation Boundedness', () => {
  it('all animation values stay within documented ranges for any frame', () => {
    fc.assert(
      fc.property(
        fc.nat(10000),
        (frame) => {
          const anim = calculateAnimations(frame, true);

          // breatheScaleY in [0.998, 1.002]
          expect(anim.breatheScaleY).toBeGreaterThanOrEqual(0.998);
          expect(anim.breatheScaleY).toBeLessThanOrEqual(1.002);

          // weightShiftX in [-1.5, 1.5]
          expect(anim.weightShiftX).toBeGreaterThanOrEqual(-1.5);
          expect(anim.weightShiftX).toBeLessThanOrEqual(1.5);

          // armSwayLeft in [-2, 2]
          expect(anim.armSwayLeft).toBeGreaterThanOrEqual(-2);
          expect(anim.armSwayLeft).toBeLessThanOrEqual(2);

          // armSwayRight in [-2, 2]
          expect(anim.armSwayRight).toBeGreaterThanOrEqual(-2);
          expect(anim.armSwayRight).toBeLessThanOrEqual(2);

          // blinkProgress in [0, 1]
          expect(anim.blinkProgress).toBeGreaterThanOrEqual(0);
          expect(anim.blinkProgress).toBeLessThanOrEqual(1);

          // hairSwayX in [-1, 1]
          expect(anim.hairSwayX).toBeGreaterThanOrEqual(-1);
          expect(anim.hairSwayX).toBeLessThanOrEqual(1);

          // No NaN or Infinity
          const values = [
            anim.breatheScaleY,
            anim.weightShiftX,
            anim.armSwayLeft,
            anim.armSwayRight,
            anim.blinkProgress,
            anim.hairSwayX,
          ];
          for (const v of values) {
            expect(Number.isFinite(v)).toBe(true);
            expect(Number.isNaN(v)).toBe(false);
          }
        }
      ),
      { numRuns: 1000 }
    );
  });
});

// ─── Property 6: Animation Rest State ────────────────────────────────────────

/**
 * **Validates: Requirements 5.2**
 *
 * For any frame ≥ 0 with animate=false, all values are at rest:
 * breatheScaleY=1, weightShiftX=0, armSwayLeft=0, armSwayRight=0,
 * blinkProgress=0, hairSwayX=0.
 */
describe('Property 6: Animation Rest State', () => {
  it('all animation values are at rest when animate=false for any frame', () => {
    fc.assert(
      fc.property(
        fc.nat(10000),
        (frame) => {
          const anim = calculateAnimations(frame, false);

          expect(anim.breatheScaleY).toBe(1);
          expect(anim.weightShiftX).toBe(0);
          expect(anim.armSwayLeft).toBe(0);
          expect(anim.armSwayRight).toBe(0);
          expect(anim.blinkProgress).toBe(0);
          expect(anim.hairSwayX).toBe(0);
        }
      ),
      { numRuns: 1000 }
    );
  });
});


// ─── Property 7: Opposite Arm Phase ──────────────────────────────────────────

/**
 * **Validates: Requirements 5.8**
 *
 * For any frame ≥ 0 with animate=true, armSwayLeft and armSwayRight have
 * opposite signs (or are both zero when crossing zero simultaneously).
 */
describe('Property 7: Opposite Arm Phase', () => {
  it('armSwayLeft and armSwayRight have opposite signs for any frame', () => {
    fc.assert(
      fc.property(
        fc.nat(10000),
        (frame) => {
          const anim = calculateAnimations(frame, true);

          if (anim.armSwayLeft > 0) {
            expect(anim.armSwayRight).toBeLessThanOrEqual(0);
          } else if (anim.armSwayLeft < 0) {
            expect(anim.armSwayRight).toBeGreaterThanOrEqual(0);
          }
          // If armSwayLeft === 0, armSwayRight can be anything (zero crossing)
        }
      ),
      { numRuns: 1000 }
    );
  });
});



// ─── Property 8: Blink Cycle Periodicity ─────────────────────────────────────

/**
 * **Validates: Requirements 6.1**
 *
 * For any frame f ≥ 0, blinkProgress at frame f equals blinkProgress at
 * frame f + 90. This confirms the blink cycle repeats every 90 frames.
 */
describe('Property 8: Blink Cycle Periodicity', () => {
  it('blinkProgress at frame f equals blinkProgress at frame f + 90', () => {
    fc.assert(
      fc.property(
        fc.nat(10000),
        (frame) => {
          const anim1 = calculateAnimations(frame, true);
          const anim2 = calculateAnimations(frame + 90, true);

          expect(anim2.blinkProgress).toBe(anim1.blinkProgress);
        }
      ),
      { numRuns: 1000 }
    );
  });
});


// ─── Property 9: Blink Duty Cycle ────────────────────────────────────────────

/**
 * **Validates: Requirements 6.5**
 *
 * For any 90-frame window starting at a multiple of 90, the number of frames
 * where blinkProgress === 0 is at least 86. This ensures the character's eyes
 * are open for the vast majority of each blink cycle.
 */
describe('Property 9: Blink Duty Cycle', () => {
  it('eyes are open (blinkProgress === 0) for at least 86 out of every 90 frames', () => {
    fc.assert(
      fc.property(
        fc.nat(100),
        (cycleIndex) => {
          const windowStart = cycleIndex * 90;
          let openCount = 0;

          for (let i = 0; i < 90; i++) {
            const anim = calculateAnimations(windowStart + i, true);
            if (anim.blinkProgress === 0) {
              openCount++;
            }
          }

          expect(openCount).toBeGreaterThanOrEqual(86);
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ─── Property 1: Scaling Invariant ───────────────────────────────────────────

/**
 * **Validates: Requirements 2.1, 2.2**
 *
 * For any size value, the outer div width equals size, height equals size * 2.1,
 * and the SVG viewBox is always "0 0 200 420" regardless of rendered pixel size.
 */
describe('Property 1: Scaling Invariant', () => {
  it('outer div dimensions match size and SVG viewBox is always "0 0 200 420"', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 500 }),
        (size) => {
          const html = renderToStaticMarkup(
            React.createElement(LindaCharacter, { size, animate: false })
          );

          // Verify outer div width equals size
          expect(html).toContain(`width:${size}px`);

          // Verify outer div height equals size * 2.1
          const expectedHeight = size * 2.1;
          expect(html).toContain(`height:${expectedHeight}px`);

          // Verify SVG viewBox is always "0 0 200 420"
          expect(html).toContain('viewBox="0 0 200 420"');
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Property 4: Shirt Text Visibility ───────────────────────────────────────

/**
 * **Validates: Requirements 4.6, 4.7**
 *
 * For any outfit variant, the rendered SVG contains a <text> element with
 * shirtText content if and only if the outfit's showShirtText is true.
 */
describe('Property 4: Shirt Text Visibility', () => {
  it('shirtText appears in SVG iff showShirtText is true for any outfit', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_OUTFITS),
        (outfit) => {
          const config = getOutfitConfig(outfit);
          const shirtText = 'TESTTEXT';

          const html = renderToStaticMarkup(
            React.createElement(LindaCharacter, { outfit, shirtText, animate: false })
          );

          if (config.showShirtText) {
            expect(html).toContain(shirtText);
          } else {
            expect(html).not.toContain(shirtText);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

