// src/remotion/Sims4/components/casStoryData.ts
// Shared data models, constants, and pure helper functions for the CAS Story Sequence

import { SIMS_COLORS } from '../data/simsTheme';

// ── Interfaces ──────────────────────────────────────────────

export interface TraitData {
  icon: string;
  label: string;
  category: string;
}

export interface ScenarioData {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward: string;
  color: string;
}

export interface AspirationData {
  icon: string;
  label: string;
}

export interface SceneTiming {
  startFrame: number;
  durationFrames: number;
}

// ── Data Arrays ─────────────────────────────────────────────

export const TRAITS: TraitData[] = [
  { icon: '🎨', label: 'Creative', category: 'Emotional' },
  { icon: '💪', label: 'Ambitious', category: 'Social' },
  { icon: '📚', label: 'Bookworm', category: 'Lifestyle' },
  { icon: '🎵', label: 'Music Lover', category: 'Lifestyle' },
  { icon: '💻', label: 'Tech Savvy', category: 'Social' },
  { icon: '🌟', label: 'Self-Assured', category: 'Emotional' },
];

export const SCENARIOS: ScenarioData[] = [
  {
    title: 'Making Money',
    description: 'Start with nothing and build your fortune from scratch.',
    difficulty: 'Medium',
    reward: '§5,000',
    color: SIMS_COLORS.plumbobGreen,
  },
  {
    title: 'Finding Love',
    description: 'Navigate the dating scene and find your soulmate.',
    difficulty: 'Easy',
    reward: '§2,500',
    color: SIMS_COLORS.simsBlueLight,
  },
  {
    title: 'Academic Excellence',
    description: 'Enroll in university and graduate with honors.',
    difficulty: 'Hard',
    reward: '§10,000',
    color: SIMS_COLORS.needsPurple,
  },
];

export const ASPIRATIONS: AspirationData[] = [
  { icon: '🏠', label: 'Family' },
  { icon: '💰', label: 'Fortune' },
  { icon: '🎨', label: 'Creativity' },
  { icon: '❤️', label: 'Romance' },
  { icon: '🧠', label: 'Knowledge' },
];

// ── Animation Constants ─────────────────────────────────────

export const SPRING_CONFIG = { damping: 16, stiffness: 100 };
export const CROSSFADE_FRAMES = 20;
export const MIN_STAGGER = 20;
export const ENTRANCE_OFFSET_Y = 15;

// ── Pure Functions ───────────────────────────────────────────

/**
 * Compute scene timings for 4 scenes with 20-frame overlaps.
 *
 * totalFrames = sum(durations) - 3 * overlap
 * => sum(durations) = totalFrames + 60
 * Each scene gets ~25% of that sum. The last scene is adjusted
 * so it ends at exactly totalFrames.
 */
export function computeSceneTimings(totalFrames: number): {
  initial: SceneTiming;
  traits: SceneTiming;
  appearance: SceneTiming;
  scenario: SceneTiming;
} {
  const overlap = CROSSFADE_FRAMES;
  const totalDuration = totalFrames + 3 * overlap; // sum of all durations
  const baseDuration = Math.floor(totalDuration / 4);

  const initial: SceneTiming = {
    startFrame: 0,
    durationFrames: baseDuration,
  };

  const traits: SceneTiming = {
    startFrame: initial.startFrame + initial.durationFrames - overlap,
    durationFrames: baseDuration,
  };

  const appearance: SceneTiming = {
    startFrame: traits.startFrame + traits.durationFrames - overlap,
    durationFrames: baseDuration,
  };

  const scenarioStart = appearance.startFrame + appearance.durationFrames - overlap;
  const scenario: SceneTiming = {
    startFrame: scenarioStart,
    durationFrames: totalFrames - scenarioStart,
  };

  return { initial, traits, appearance, scenario };
}

/**
 * Returns array of entrance frame offsets for each item,
 * each at least `minStagger` apart: [0, minStagger, 2*minStagger, ...]
 */
export function computeStaggerFrames(itemCount: number, minStagger: number): number[] {
  return Array.from({ length: itemCount }, (_, i) => i * minStagger);
}

/**
 * Returns the count of selected traits (0–3) at a given relative frame.
 * Traits get selected at 30%, 50%, 70% of the scene duration.
 */
export function getSelectedTraitsAtFrame(relativeFrame: number, durationFrames: number): number {
  const thresholds = [0.3, 0.5, 0.7];
  let count = 0;
  for (const t of thresholds) {
    if (relativeFrame >= t * durationFrames) {
      count++;
    }
  }
  return count;
}

/**
 * Returns the active category index (0–4) at a given relative frame.
 * Categories cycle through at equal intervals across the scene duration.
 */
export function getActiveCategoryAtFrame(relativeFrame: number, durationFrames: number): number {
  const totalCategories = 5;
  if (durationFrames <= 0) return 0;
  const progress = Math.max(0, Math.min(relativeFrame / durationFrames, 1 - 1e-9));
  return Math.floor(progress * totalCategories);
}
