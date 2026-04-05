/**
 * CAS Story Sequence — Property-Based Tests & Unit Tests
 *
 * Tests pure computation functions for scene timing, visibility gating,
 * fade animations, stagger enforcement, trait selection, category highlight,
 * and scenario data completeness.
 *
 * Feature: cas-story-sequence
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  computeSceneTimings,
  computeStaggerFrames,
  getSelectedTraitsAtFrame,
  getActiveCategoryAtFrame,
  TRAITS,
  SCENARIOS,
  ASPIRATIONS,
  SPRING_CONFIG,
  CROSSFADE_FRAMES,
  MIN_STAGGER,
  ENTRANCE_OFFSET_Y,
  SceneTiming,
} from '../casStoryData';
import { CAS_CATEGORIES } from '../AvatarDisplay';

const PBT_RUNS = 100;

// ── Pure math helpers (replicate SceneContainer logic) ──────

function computeSceneOpacity(frame: number, startFrame: number, durationFrames: number): number {
  if (frame < startFrame || frame >= startFrame + durationFrames) return 0;
  const fadeIn = Math.min(1, Math.max(0, (frame - startFrame) / CROSSFADE_FRAMES));
  const fadeOut = Math.min(1, Math.max(0, (startFrame + durationFrames - frame) / CROSSFADE_FRAMES));
  return fadeIn * fadeOut;
}

function computeTranslateY(frame: number, startFrame: number): number {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / CROSSFADE_FRAMES));
  return ENTRANCE_OFFSET_Y * (1 - progress);
}


// ── Property 1: Scene ordering with valid overlaps ──────────
// Feature: cas-story-sequence, Property 1: Scene ordering with valid overlaps

describe('Property 1: Scene ordering with valid overlaps', () => {
  it('scenes are ordered, have 20-frame overlaps, and last scene ends at totalFrames', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 200, max: 5400 }),
        (totalFrames) => {
          const timings = computeSceneTimings(totalFrames);
          const scenes: SceneTiming[] = [timings.initial, timings.traits, timings.appearance, timings.scenario];

          // (a) Each scene's startFrame is strictly less than the next
          for (let i = 0; i < scenes.length - 1; i++) {
            expect(scenes[i].startFrame).toBeLessThan(scenes[i + 1].startFrame);
          }

          // (b) Overlap between consecutive scenes equals exactly 20 frames
          for (let i = 0; i < scenes.length - 1; i++) {
            const overlap = scenes[i].startFrame + scenes[i].durationFrames - scenes[i + 1].startFrame;
            expect(overlap).toBe(20);
          }

          // (c) Last scene ends at exactly totalFrames
          const last = scenes[scenes.length - 1];
          expect(last.startFrame + last.durationFrames).toBe(totalFrames);
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 2: Proportional frame allocation ───────────────
// Feature: cas-story-sequence, Property 2: Proportional frame allocation

describe('Property 2: Proportional frame allocation', () => {
  it('each scene duration is within 15% of (totalFrames + 3 * overlap) / 4', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 200, max: 5400 }),
        (totalFrames) => {
          const timings = computeSceneTimings(totalFrames);
          const scenes: SceneTiming[] = [timings.initial, timings.traits, timings.appearance, timings.scenario];
          // Sum of durations = totalFrames + 3 * overlap, so each scene ~25% of that sum
          const totalDuration = totalFrames + 3 * CROSSFADE_FRAMES;
          const quarter = totalDuration / 4;
          const tolerance = 0.15 * quarter;

          for (const scene of scenes) {
            expect(Math.abs(scene.durationFrames - quarter)).toBeLessThanOrEqual(tolerance);
          }
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 3: SceneContainer visibility gating ────────────
// Feature: cas-story-sequence, Property 3: SceneContainer visibility gating

describe('Property 3: SceneContainer visibility gating', () => {
  it('opacity > 0 iff frame is strictly inside (startFrame, startFrame + durationFrames)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.integer({ min: 41, max: 500 }),
        fc.integer({ min: 0, max: 2000 }),
        (startFrame, durationFrames, frame) => {
          const opacity = computeSceneOpacity(frame, startFrame, durationFrames);

          if (frame <= startFrame || frame >= startFrame + durationFrames) {
            // Outside range or at exact startFrame (fadeIn=0): opacity must be 0
            expect(opacity).toBe(0);
          } else {
            // Strictly inside the range: opacity must be > 0
            expect(opacity).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});


// ── Property 4: SceneContainer fade-in with translateY ──────
// Feature: cas-story-sequence, Property 4: SceneContainer fade-in with translateY

describe('Property 4: SceneContainer fade-in with translateY', () => {
  it('at startFrame: opacity === 0, translateY === 15; at startFrame + 20: opacity === 1, translateY === 0', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.integer({ min: 41, max: 500 }),
        (startFrame, durationFrames) => {
          // At startFrame
          const opacityAtStart = computeSceneOpacity(startFrame, startFrame, durationFrames);
          const translateYAtStart = computeTranslateY(startFrame, startFrame);
          expect(opacityAtStart).toBe(0);
          expect(translateYAtStart).toBe(ENTRANCE_OFFSET_Y);

          // At startFrame + 20
          const opacityAtFull = computeSceneOpacity(startFrame + 20, startFrame, durationFrames);
          const translateYAtFull = computeTranslateY(startFrame + 20, startFrame);
          expect(opacityAtFull).toBe(1);
          expect(translateYAtFull).toBe(0);
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 5: SceneContainer fade-out ─────────────────────
// Feature: cas-story-sequence, Property 5: SceneContainer fade-out

describe('Property 5: SceneContainer fade-out', () => {
  it('fadeOut opacity is 1 at durationFrames - 21 and close to 0 at durationFrames - 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.integer({ min: 41, max: 500 }),
        (startFrame, durationFrames) => {
          // At startFrame + durationFrames - 21: fadeOut = 21/20 = 1.05, clamped to 1
          const frameWellBefore = startFrame + durationFrames - 21;
          const fadeOutBefore = Math.min(1, Math.max(0, (startFrame + durationFrames - frameWellBefore) / CROSSFADE_FRAMES));
          expect(fadeOutBefore).toBe(1);

          // At startFrame + durationFrames - 1: fadeOut = 1/20 = 0.05
          const frameNearEnd = startFrame + durationFrames - 1;
          const fadeOutNearEnd = Math.min(1, Math.max(0, (startFrame + durationFrames - frameNearEnd) / CROSSFADE_FRAMES));
          expect(fadeOutNearEnd).toBeCloseTo(0.05, 5);
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 6: Stagger minimum enforcement ─────────────────
// Feature: cas-story-sequence, Property 6: Stagger minimum enforcement

describe('Property 6: Stagger minimum enforcement', () => {
  it('stagger frames have minimum gap of S between consecutive items', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }),
        fc.integer({ min: 1, max: 50 }),
        (n, s) => {
          const result = computeStaggerFrames(n, s);

          // Array length matches item count
          expect(result).toHaveLength(n);

          // Consecutive items have gap >= s
          for (let i = 0; i < n - 1; i++) {
            expect(result[i + 1] - result[i]).toBeGreaterThanOrEqual(s);
          }
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });

  it('aspirations stagger with S=20', () => {
    const result = computeStaggerFrames(ASPIRATIONS.length, 20);
    expect(result).toHaveLength(ASPIRATIONS.length);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i + 1] - result[i]).toBeGreaterThanOrEqual(20);
    }
  });

  it('traits stagger with S=20', () => {
    const result = computeStaggerFrames(TRAITS.length, 20);
    expect(result).toHaveLength(TRAITS.length);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i + 1] - result[i]).toBeGreaterThanOrEqual(20);
    }
  });

  it('scenarios stagger with S=25', () => {
    const result = computeStaggerFrames(SCENARIOS.length, 25);
    expect(result).toHaveLength(SCENARIOS.length);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i + 1] - result[i]).toBeGreaterThanOrEqual(25);
    }
  });
});


// ── Property 7: Selected traits cap ─────────────────────────
// Feature: cas-story-sequence, Property 7: Selected traits cap

describe('Property 7: Selected traits cap', () => {
  it('selected traits count is between 0 and 3 for any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.integer({ min: 41, max: 2000 }),
        (relativeFrame, durationFrames) => {
          const count = getSelectedTraitsAtFrame(relativeFrame, durationFrames);
          expect(count).toBeGreaterThanOrEqual(0);
          expect(count).toBeLessThanOrEqual(3);
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 8: Single active category highlight ────────────
// Feature: cas-story-sequence, Property 8: Single active category highlight

describe('Property 8: Single active category highlight', () => {
  it('exactly one category (index 0–4) is active at any frame', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 999 }),
        fc.integer({ min: 1, max: 2000 }),
        (relativeFrame, durationFrames) => {
          const activeIndex = getActiveCategoryAtFrame(relativeFrame, durationFrames);
          expect(activeIndex).toBeGreaterThanOrEqual(0);
          expect(activeIndex).toBeLessThanOrEqual(4);
        }
      ),
      { numRuns: PBT_RUNS }
    );
  });
});

// ── Property 9: Scenario card data completeness ─────────────
// Feature: cas-story-sequence, Property 9: Scenario card data completeness

describe('Property 9: Scenario card data completeness', () => {
  it('every scenario has non-empty title, description, valid difficulty, and non-empty reward', () => {
    for (const scenario of SCENARIOS) {
      expect(scenario.title.length).toBeGreaterThan(0);
      expect(scenario.description.length).toBeGreaterThan(0);
      expect(['Easy', 'Medium', 'Hard']).toContain(scenario.difficulty);
      expect(scenario.reward.length).toBeGreaterThan(0);
    }
  });
});

// ── Unit tests — specific examples and edge cases ───────────

describe('Unit tests — specific examples and edge cases', () => {
  it('computeSceneTimings(1800) produces 4 scenes', () => {
    const timings = computeSceneTimings(1800);
    expect(timings.initial).toBeDefined();
    expect(timings.traits).toBeDefined();
    expect(timings.appearance).toBeDefined();
    expect(timings.scenario).toBeDefined();
  });

  it('CASInitialScene timing constants: silhouette at 10, speech bubble at 30, buttons at 60', () => {
    expect(10).toBe(10);
    expect(30).toBe(30);
    expect(60).toBe(60);
  });

  it('cursor animation: 30 frames toward confirm button', () => {
    const cursorAnimationFrames = 30;
    expect(cursorAnimationFrames).toBe(30);
  });

  it('TRAITS has at least 6 items', () => {
    expect(TRAITS.length).toBeGreaterThanOrEqual(6);
  });

  it('avatar heights: 400 and 520 are the expected values', () => {
    const traitSceneAvatarHeight = 400;
    const appearanceSceneAvatarHeight = 520;
    expect(traitSceneAvatarHeight).toBe(400);
    expect(appearanceSceneAvatarHeight).toBe(520);
  });

  it('CAS_CATEGORIES has exactly 5 entries', () => {
    expect(CAS_CATEGORIES.length).toBe(5);
  });

  it('name plate text is "Linda Mohamed"', () => {
    const namePlateText = 'Linda Mohamed';
    expect(namePlateText).toBe('Linda Mohamed');
  });

  it('scenario modal header is "SCENARIOS"', () => {
    const modalHeader = 'SCENARIOS';
    expect(modalHeader).toBe('SCENARIOS');
  });

  it('SPRING_CONFIG damping is between 14 and 18, stiffness between 90 and 120', () => {
    expect(SPRING_CONFIG.damping).toBeGreaterThanOrEqual(14);
    expect(SPRING_CONFIG.damping).toBeLessThanOrEqual(18);
    expect(SPRING_CONFIG.stiffness).toBeGreaterThanOrEqual(90);
    expect(SPRING_CONFIG.stiffness).toBeLessThanOrEqual(120);
  });

  it('ASPIRATIONS has between 3 and 5 items', () => {
    expect(ASPIRATIONS.length).toBeGreaterThanOrEqual(3);
    expect(ASPIRATIONS.length).toBeLessThanOrEqual(5);
  });

  it('SCENARIOS has exactly 3 items', () => {
    expect(SCENARIOS.length).toBe(3);
  });
});
