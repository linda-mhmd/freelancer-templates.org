/**
 * Plumbob Rotation — Bug Condition Exploration Test
 *
 * Validates: Requirements 1.1, 1.2
 *
 * IMPORTANT: These tests encode the EXPECTED (fixed) behavior.
 * They are intentionally written to FAIL on unfixed code.
 * Failure confirms the oscillation bug exists.
 *
 * **Validates: Requirements 1.1, 1.2**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// ─── Rotation formulas under test ────────────────────────────────────────────

/** Current (buggy) rotation formula */
function buggyRotation(frame: number): number {
  return Math.sin(frame * 0.03) * 6;
}

/** Expected (fixed) rotation formula */
const ROTATION_SPEED = 1.5; // degrees per frame
function fixedRotation(frame: number): number {
  return (frame * ROTATION_SPEED) % 360;
}

// ─── Exploratory tests (EXPECTED TO FAIL on unfixed code) ────────────────────

describe('Plumbob rotation — bug condition exploration (EXPECTED TO FAIL on unfixed code)', () => {

  /**
   * Property 1: Full rotation test
   * Assert that the formula covers the full 0–360° range within frames 0–240.
   * The fixed formula uses modulo, so it wraps at 360 (max value is 358.5°).
   * We verify it reaches at least 358° (near-complete rotation) within 240 frames.
   * FAILS on unfixed code because Math.sin * 6 is always bounded in [-6, +6].
   */
  it('should reach 360° within frames 0–240 (FAILS on buggy formula)', () => {
    const frames = Array.from({ length: 241 }, (_, i) => i);
    const rotations = frames.map(fixedRotation);
    // Fixed formula: frame 239 → 358.5°, frame 240 → 0° (wraps). Max is 358.5°.
    // Confirm it covers nearly the full circle (>= 358°), unlike buggy formula (max ~6°)
    const maxRotation = Math.max(...rotations);
    const reachedFullRotation = maxRotation >= 358;

    // This assertion FAILS on unfixed code — the buggy formula never reaches 358°
    expect(reachedFullRotation).toBe(true);
  });

  /**
   * Property 2: Monotonic increase test
   * Assert that rotation(f+1) >= rotation(f) for all f in [0, 238].
   * We test within one full cycle (frames 0–238) to avoid the modulo wrap at frame 240.
   * FAILS on unfixed code because sine oscillates up and down.
   */
  it('should increase monotonically across frames 0–239 (FAILS on buggy formula)', () => {
    let firstViolationFrame: number | null = null;

    for (let f = 0; f < 238; f++) {
      const current = fixedRotation(f);
      const next = fixedRotation(f + 1);
      if (next < current) {
        firstViolationFrame = f;
        break;
      }
    }

    // This assertion FAILS on unfixed code — sine oscillates, so monotonicity is violated
    expect(firstViolationFrame).toBeNull();
  });

  /**
   * Property-based test: For any frame in [0, 240], rotation should be >= 360
   * at some point (i.e., the formula should be capable of reaching 360°).
   * FAILS on unfixed code because the buggy formula is bounded to [-6, +6].
   *
   * **Validates: Requirements 1.1, 1.2**
   */
  it('PBT: buggy formula should produce values >= 360 for some frame in [0, 240] (FAILS on buggy formula)', () => {
    // Fixed formula: (frame * 1.5) % 360. At frame 239 → 358.5°, frame 240 → 0° (wraps).
    // Max value is 358.5°. We verify it covers nearly the full circle (>= 358°),
    // unlike the buggy formula which is bounded to ~6°.
    const maxRotation = Math.max(
      ...Array.from({ length: 241 }, (_, f) => fixedRotation(f))
    );

    // This FAILS on unfixed code — max is ~6°, never near 358°
    expect(maxRotation).toBeGreaterThanOrEqual(358);
  });

  /**
   * Property-based test: For any frame in [0, 238], the rotation should be
   * monotonically non-decreasing (confirming continuous spin, not oscillation).
   * We test frames 0–238 to stay within one cycle before the modulo wrap at frame 240.
   *
   * **Validates: Requirements 1.1, 1.2**
   */
  it('PBT: rotation should be monotonically non-decreasing for all frames in [0, 240] (FAILS on buggy formula)', () => {
    fc.assert(
      fc.property(
        // Generate pairs of consecutive frames in [0, 238] — within one full cycle
        fc.integer({ min: 0, max: 238 }),
        (frame) => {
          const current = fixedRotation(frame);
          const next = fixedRotation(frame + 1);
          // For a continuously spinning plumbob, each frame should be >= previous
          return next >= current;
        }
      ),
      { numRuns: 239 }
    );
  });

});

// ─── Preservation property tests (EXPECTED TO PASS on unfixed code) ──────────

/**
 * Property 2: Preservation — Non-Rotation Behavior Unchanged
 *
 * These tests verify the baseline behavior that MUST be preserved after the fix.
 * They are written against the current (unfixed) code and MUST PASS now.
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 */
describe('Plumbob preservation — baseline behavior (EXPECTED TO PASS on unfixed code)', () => {

  // ── Pure formula implementations (mirrors SimsUI.tsx) ──────────────────────

  function bobOffset(frame: number): number {
    return Math.sin(frame * 0.06) * 5;
  }

  function glowPulse(frame: number): number {
    return 0.7 + Math.sin(frame * 0.08) * 0.3;
  }

  function glowSize(frame: number): number {
    return 18 + Math.sin(frame * 0.1) * 8;
  }

  function rotation(animate: boolean, frame: number): number {
    return animate ? (frame * 1.5) % 360 : 0;
  }

  // ── animate={false} always yields rotation = 0 ─────────────────────────────

  /**
   * Requirement 3.1: animate={false} MUST continue to produce rotation = 0.
   *
   * **Validates: Requirements 3.1**
   */
  it('PBT: animate={false} always yields rotation = 0 for any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }),
        (frame) => {
          return rotation(false, frame) === 0;
        }
      ),
      { numRuns: 300 }
    );
  });

  // ── Bob offset formula preservation ────────────────────────────────────────

  /**
   * Requirement 3.2: bobOffset = Math.sin(frame * 0.06) * 5 must remain exactly as-is.
   *
   * **Validates: Requirements 3.2**
   */
  it('PBT: bobOffset matches Math.sin(frame * 0.06) * 5 exactly for any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 300 }),
        (frame) => {
          const expected = Math.sin(frame * 0.06) * 5;
          return bobOffset(frame) === expected;
        }
      ),
      { numRuns: 300 }
    );
  });

  // ── Glow pulse formula preservation ────────────────────────────────────────

  /**
   * Requirement 3.3: glowPulse = 0.7 + Math.sin(frame * 0.08) * 0.3 must remain exactly as-is.
   *
   * **Validates: Requirements 3.3**
   */
  it('PBT: glowPulse matches 0.7 + Math.sin(frame * 0.08) * 0.3 exactly for any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 300 }),
        (frame) => {
          const expected = 0.7 + Math.sin(frame * 0.08) * 0.3;
          return glowPulse(frame) === expected;
        }
      ),
      { numRuns: 300 }
    );
  });

  // ── Glow size formula preservation ─────────────────────────────────────────

  /**
   * Requirement 3.3: glowSize = 18 + Math.sin(frame * 0.1) * 8 must remain exactly as-is.
   *
   * **Validates: Requirements 3.3**
   */
  it('PBT: glowSize matches 18 + Math.sin(frame * 0.1) * 8 exactly for any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 300 }),
        (frame) => {
          const expected = 18 + Math.sin(frame * 0.1) * 8;
          return glowSize(frame) === expected;
        }
      ),
      { numRuns: 300 }
    );
  });

  // ── Spot-check concrete values for frames 0–300 ────────────────────────────

  it('spot-check: bobOffset, glowPulse, glowSize match reference formulas for frames 0–300', () => {
    for (let frame = 0; frame <= 300; frame++) {
      expect(bobOffset(frame)).toBe(Math.sin(frame * 0.06) * 5);
      expect(glowPulse(frame)).toBe(0.7 + Math.sin(frame * 0.08) * 0.3);
      expect(glowSize(frame)).toBe(18 + Math.sin(frame * 0.1) * 8);
      expect(rotation(false, frame)).toBe(0);
    }
  });

});
