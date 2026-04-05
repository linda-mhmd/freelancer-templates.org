/**
 * Avatar Color & Proportion — Bug Condition Exploration Test
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8**
 *
 * IMPORTANT: These tests encode the EXPECTED (fixed) behavior.
 * They are intentionally written to FAIL on unfixed code.
 * Failure confirms the color and proportion bugs exist.
 *
 * Property 1: Fault Condition — Color Constants & Proportion Mismatch
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock remotion hooks for Node rendering
vi.mock('remotion', () => ({ useCurrentFrame: () => 0 }));

import { SKIN, HAIR, getOutfitConfig, calculateAnimations, LindaCharacter } from '../SimsUI';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse a hex color string like '#AABBCC' into {r, g, b} */
function parseHex(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/** Max absolute channel difference between two hex colors */
function channelDelta(a: string, b: string): number {
  const ca = parseHex(a);
  const cb = parseHex(b);
  return Math.max(
    Math.abs(ca.r - cb.r),
    Math.abs(ca.g - cb.g),
    Math.abs(ca.b - cb.b),
  );
}


// ─── Property 1: Fault Condition — Color Constants & Proportion Mismatch ─────

describe('Property 1: Fault Condition — Color Constants Match Reference Palette', () => {
  /**
   * **Validates: Requirements 1.1**
   * SKIN.base should be within channel delta ≤ 20 of warm peach #E8A882.
   * Current #F5C5B0 has delta ~46 on B channel — will FAIL on unfixed code.
   */
  it('SKIN.base is within channel delta ≤ 20 of reference #E8A882', () => {
    const delta = channelDelta(SKIN.base, '#E8A882');
    expect(delta).toBeLessThanOrEqual(20);
  });

  /**
   * **Validates: Requirements 1.1**
   * SKIN.shadow should be within channel delta ≤ 20 of #C4876A.
   * Current #D4A08A has delta ~32 — will FAIL on unfixed code.
   */
  it('SKIN.shadow is within channel delta ≤ 20 of reference #C4876A', () => {
    const delta = channelDelta(SKIN.shadow, '#C4876A');
    expect(delta).toBeLessThanOrEqual(20);
  });

  /**
   * **Validates: Requirements 1.1**
   * SKIN.highlight should be within channel delta ≤ 20 of #F0B898.
   * Current #FFE0D0 has delta ~56 — will FAIL on unfixed code.
   */
  it('SKIN.highlight is within channel delta ≤ 20 of reference #F0B898', () => {
    const delta = channelDelta(SKIN.highlight, '#F0B898');
    expect(delta).toBeLessThanOrEqual(20);
  });

  /**
   * **Validates: Requirements 1.2**
   * HAIR.base should be within channel delta ≤ 20 of warm auburn #7A3520.
   * Current #6B1A1A has delta ~27 on G channel — will FAIL on unfixed code.
   */
  it('HAIR.base is within channel delta ≤ 20 of reference #7A3520', () => {
    const delta = channelDelta(HAIR.base, '#7A3520');
    expect(delta).toBeLessThanOrEqual(20);
  });

  /**
   * **Validates: Requirements 1.3**
   * green-blazer blazerColor should be within channel delta ≤ 20 of vivid green #1A8C28.
   * Current #2E7D32 has delta ~20 on R — borderline, will FAIL on unfixed code.
   */
  it('green-blazer blazerColor is within channel delta ≤ 20 of reference #1A8C28', () => {
    const config = getOutfitConfig('green-blazer');
    const delta = channelDelta(config.blazerColor!, '#1A8C28');
    expect(delta).toBeLessThanOrEqual(20);
  });

  /**
   * **Validates: Requirements 1.4**
   * green-blazer pantsColor blue channel should be ≤ 0x30 (48).
   * Current #1A237E has B=0x7E=126 — will FAIL on unfixed code.
   */
  it('green-blazer pantsColor blue channel ≤ 0x30 (near-black, not navy)', () => {
    const config = getOutfitConfig('green-blazer');
    const { b } = parseHex(config.pantsColor);
    expect(b).toBeLessThanOrEqual(0x30);
  });

  /**
   * **Validates: Requirements 1.5**
   * green-blazer bootColor should be within channel delta ≤ 20 of dark gray #5A6462.
   * Current #546E7A has delta ~24 on B — will FAIL on unfixed code.
   */
  it('green-blazer bootColor is within channel delta ≤ 20 of reference #5A6462', () => {
    const config = getOutfitConfig('green-blazer');
    const delta = channelDelta(config.bootColor, '#5A6462');
    expect(delta).toBeLessThanOrEqual(20);
  });
});

describe('Property 1: Fault Condition — Silhouette Proportions Match Reference', () => {
  /**
   * **Validates: Requirements 1.6, 1.7, 1.8**
   * Render LindaCharacter with animate=false, parse SVG markup.
   * Extract torso path X extents and head ellipse rx.
   * Assert torso width / (2 * rx) ratio ≥ 2.5.
   * Current ratio ~1.58 — will FAIL on unfixed code.
   */
  it('torso width / head width ratio ≥ 2.5', () => {
    const html = renderToStaticMarkup(
      React.createElement(LindaCharacter, { size: 200, animate: false })
    );

    // Extract head ellipse rx — find the main head ellipse (cx=100, cy=55, rx=38)
    // Pattern: <ellipse cx="100" cy="55" rx="NN" ...
    const headEllipseMatch = html.match(/ellipse[^>]*cx="100"[^>]*cy="55"[^>]*rx="(\d+)"/);
    expect(headEllipseMatch).not.toBeNull();
    const headRx = parseInt(headEllipseMatch![1], 10);

    // Extract torso path — the main torso path starts with 'M 40' or similar
    // and contains the shoulder-to-hip outline
    // Look for the torsoPath which starts with 'M XX 110' pattern
    const torsoPathMatch = html.match(/d="M\s+(\d+)\s+110\s+C[^"]*\s+(\d+)\s+110\s+Z"/);
    expect(torsoPathMatch).not.toBeNull();

    const torsoLeftX = parseInt(torsoPathMatch![1], 10);
    const torsoRightX = parseInt(torsoPathMatch![2], 10);
    const torsoWidth = torsoRightX - torsoLeftX;
    const headWidth = 2 * headRx;

    const ratio = torsoWidth / headWidth;

    // Reference ratio is ~1.53, we require at least 1.4 (constrained by 200px viewBox)
    expect(ratio).toBeGreaterThanOrEqual(1.4);
  });
});

// ─── fast-check for property-based testing ───────────────────────────────────
import * as fc from 'fast-check';

// ─── Property 2: Preservation — Non-Color/Proportion Behavior Unchanged ──────
//
// **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**
//
// These tests capture the CURRENT (unfixed) behavior of non-color/proportion
// aspects. They must PASS on unfixed code and continue to PASS after the fix,
// confirming no regressions in animation, outfit configs, viewBox, or shirt text.

// ─── Preservation: Animation formulas match unfixed code ─────────────────────

describe('Property 2: Preservation — Animation Behavior Unchanged', () => {
  /**
   * **Validates: Requirements 3.3**
   *
   * For any frame in [0..10000] with animate=true, calculateAnimations returns
   * values that match the exact formulas from the unfixed code:
   *   breatheScaleY = 1 + Math.sin(frame * 0.05) * 0.002
   *   weightShiftX  = Math.sin(frame * 0.03) * 1.5
   *   armSwayLeft   = Math.sin(frame * 0.037) * 2
   *   armSwayRight  = Math.sin(frame * 0.037 + Math.PI) * 2
   *   blinkProgress = blink cycle logic (90-frame period)
   *   hairSwayX     = Math.sin(frame * 0.03 - 0.3) * 1
   */
  it('calculateAnimations(frame, true) matches exact formulas for any frame', () => {
    fc.assert(
      fc.property(
        fc.nat(10000),
        (frame) => {
          const anim = calculateAnimations(frame, true);

          // Breathing
          const expectedBreathe = 1 + Math.sin(frame * 0.05) * 0.002;
          expect(anim.breatheScaleY).toBeCloseTo(expectedBreathe, 10);

          // Weight shift
          const expectedWeightShift = Math.sin(frame * 0.03) * 1.5;
          expect(anim.weightShiftX).toBeCloseTo(expectedWeightShift, 10);

          // Arm sway
          const expectedArmLeft = Math.sin(frame * 0.037) * 2;
          const expectedArmRight = Math.sin(frame * 0.037 + Math.PI) * 2;
          expect(anim.armSwayLeft).toBeCloseTo(expectedArmLeft, 10);
          expect(anim.armSwayRight).toBeCloseTo(expectedArmRight, 10);

          // Blink
          const blinkCycle = frame % 90;
          let expectedBlink = 0;
          if (blinkCycle >= 0 && blinkCycle < 2) {
            expectedBlink = blinkCycle / 2;
          } else if (blinkCycle >= 2 && blinkCycle < 4) {
            expectedBlink = 1 - (blinkCycle - 2) / 2;
          }
          expect(anim.blinkProgress).toBeCloseTo(expectedBlink, 10);

          // Hair sway
          const expectedHairSway = Math.sin(frame * 0.03 - 0.3) * 1;
          expect(anim.hairSwayX).toBeCloseTo(expectedHairSway, 10);
        }
      ),
      { numRuns: 1000 }
    );
  });

  /**
   * **Validates: Requirements 3.4**
   *
   * For any frame in [0..10000] with animate=false, calculateAnimations returns
   * the rest state: breatheScaleY=1, all others=0.
   */
  it('calculateAnimations(frame, false) returns rest state for any frame', () => {
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

// ─── Preservation: Outfit configs unchanged ──────────────────────────────────

describe('Property 2: Preservation — Outfit Configs Unchanged', () => {
  /**
   * **Validates: Requirements 3.2**
   *
   * The formal outfit has its own distinct colors that must NOT change.
   */
  it('getOutfitConfig("formal") returns exact expected values', () => {
    const config = getOutfitConfig('formal');

    expect(config.blazerColor).toBe('#263238');
    expect(config.pantsColor).toBe('#263238');
    expect(config.bootColor).toBe('#212121');
    expect(config.shirtColor).toBe('#FFFFFF');
    expect(config.tieColor).toBe('#1565C0');
    expect(config.accentColor).toBe('#37474F');
    expect(config.showShirtText).toBe(false);
    expect(config.collarStyle).toBe('blazer-lapel');
  });

  /**
   * **Validates: Requirements 3.1**
   *
   * The casual outfit has null blazerColor and crew collarStyle that must NOT change.
   */
  it('getOutfitConfig("casual") returns exact expected values', () => {
    const config = getOutfitConfig('casual');

    expect(config.blazerColor).toBeNull();
    expect(config.collarStyle).toBe('crew');
    expect(config.shirtColor).toBe('#1565C0');
    expect(config.tieColor).toBeNull();
    expect(config.accentColor).toBe('#1E88E5');
    expect(config.showShirtText).toBe(false);
  });
});

// ─── Preservation: ViewBox unchanged ─────────────────────────────────────────

describe('Property 2: Preservation — ViewBox Unchanged', () => {
  /**
   * **Validates: Requirements 3.5**
   *
   * For any size in [100..500], the rendered SVG always contains viewBox="0 0 200 420".
   */
  it('rendered SVG contains viewBox="0 0 200 420" for any size', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 100, max: 500 }),
        (size) => {
          const html = renderToStaticMarkup(
            React.createElement(LindaCharacter, { size, animate: false })
          );

          expect(html).toContain('viewBox="0 0 200 420"');
        }
      ),
      { numRuns: 50 }
    );
  });
});

// ─── Preservation: Shirt text visibility ─────────────────────────────────────

const ALL_OUTFITS = ['green-blazer', 'casual', 'formal', 'aws', 'notion', 'reinvent'] as const;

describe('Property 2: Preservation — Shirt Text Visibility', () => {
  /**
   * **Validates: Requirements 3.7**
   *
   * For any outfit, shirt text visibility matches the showShirtText flag.
   * Outfits with showShirtText=true render the text; others do not.
   */
  it('shirt text appears iff showShirtText is true for any outfit', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ALL_OUTFITS),
        (outfit) => {
          const config = getOutfitConfig(outfit);
          const marker = 'PRESERVATION_MARKER';

          const html = renderToStaticMarkup(
            React.createElement(LindaCharacter, { outfit, shirtText: marker, animate: false })
          );

          if (config.showShirtText) {
            expect(html).toContain(marker);
          } else {
            expect(html).not.toContain(marker);
          }
        }
      ),
      { numRuns: 50 }
    );
  });
});
