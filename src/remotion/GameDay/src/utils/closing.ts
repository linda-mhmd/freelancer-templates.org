// ── src/utils/closing.ts ──
// Shared utilities for closing ceremony compositions (Part A + Part B).
// Contains Phase enum, phase boundaries, pure utility functions,
// TeamData interface, placeholder data, and composition constants.

// ── Phase Enum ──
export enum Phase {
  Showcase = "showcase",
  Shuffle = "shuffle",
  Reveal = "reveal",
  ThankYou = "thankyou",
}

// ── Composition Constants ──
export const WIDTH = 1280;
export const HEIGHT = 720;
export const FPS = 30;
export const TOTAL_FRAMES = 9000;
export const GROUPS_PER_PAGE = 6;
export const PAGE_DURATION = 120;
export const SHUFFLE_POSITIONS = 6;
export const SHUFFLE_SCORE_MIN = 3000;
export const SHUFFLE_SCORE_MAX = 5000;
export const FLASH_DURATION = 60;

// ── Part B Phase Boundaries ──
// Part B is the winners template: Shuffle → Reveal → ThankYou
// Total: 9000 frames (5 minutes at 30fps)
export const PHASE_BOUNDARIES = {
  shuffleStart: 0,
  shuffleEnd: 1799,
  revealStart: 1800,
  revealEnd: 7799,
  thankYouStart: 7800,
  thankYouEnd: 8999,
} as const;

export const PHASE_BOUNDARY_FRAMES = [0, 1800, 7800];

export const FADE_START = 8910;
export const FADE_END = 8999;

// ── Reveal Schedule ──
// 6th→5th→4th: 600 frames each (quick reveals)
// 3rd→2nd→1st: 1200 frames each (dramatic reveals: bar-rise + country + UG)
// Roll call: 600 frames, ThankYou: 1200 frames
export const REVEAL_SCHEDULE: Array<{
  rank: number;
  frame: number;
  duration: number;
}> = [
  { rank: 6, frame: 1800, duration: 600 },
  { rank: 5, frame: 2400, duration: 600 },
  { rank: 4, frame: 3000, duration: 600 },
  { rank: 3, frame: 3600, duration: 1200 },
  { rank: 2, frame: 4800, duration: 1200 },
  { rank: 1, frame: 6000, duration: 1200 },
];

export const REVEAL_FRAMES: Record<number, number> = {
  6: 1800,
  5: 2400,
  4: 3000,
  3: 3600,
  2: 4800,
  1: 6000,
};

// ── Roll Call + Full Podium Timing ──
export const ROLL_CALL_START = 7200;
export const ROLL_CALL_END = 7799;
export const FULL_PODIUM_FRAME = 7200;

// ── TeamData Interface ──
export interface TeamData {
  name: string;
  flag: string;
  city: string;
  country: string;
  score: number;
  logoUrl: string | null;
}

// ── Podium Teams (1st through 6th, descending scores) ──
// Update these with real winner data before rendering ClosingWinnersTemplate.
// See TEMPLATE.md for instructions.
export const PODIUM_TEAMS: TeamData[] = [
  { name: "Team #1", flag: "🏳️", city: "City A", country: "Country A", score: 4850, logoUrl: null },
  { name: "Team #2", flag: "🏳️", city: "City B", country: "Country B", score: 4720, logoUrl: null },
  { name: "Team #3", flag: "🏳️", city: "City C", country: "Country C", score: 4580, logoUrl: null },
  { name: "Team #4", flag: "🏳️", city: "City D", country: "Country D", score: 4410, logoUrl: null },
  { name: "Team #5", flag: "🏳️", city: "City E", country: "Country E", score: 4250, logoUrl: null },
  { name: "Team #6", flag: "🏳️", city: "City F", country: "Country F", score: 4090, logoUrl: null },
];

// ── Winning City Teams (Top 6 teams from winning city, descending scores) ──
export const WINNING_CITY_TEAMS: TeamData[] = [
  { name: "Team #1", flag: "🏳️", city: "City A", country: "Country A", score: 17320, logoUrl: null },
  { name: "Team #2", flag: "🏳️", city: "City A", country: "Country A", score: 16890, logoUrl: null },
  { name: "Team #3", flag: "🏳️", city: "City A", country: "Country A", score: 15740, logoUrl: null },
  { name: "Team #4", flag: "🏳️", city: "City A", country: "Country A", score: 14200, logoUrl: null },
  { name: "Team #5", flag: "🏳️", city: "City A", country: "Country A", score: 13650, logoUrl: null },
  { name: "Team #6", flag: "🏳️", city: "City A", country: "Country A", score: 12980, logoUrl: null },
];

// ── Pure Utility Functions ──

/**
 * Determine the active phase for a given frame in Part B.
 * Shuffle: 0 - 1799, Reveal: 1800 - 7799, ThankYou: 7800 - 8999
 */
export function getActivePhase(frame: number): Phase {
  if (frame <= PHASE_BOUNDARIES.shuffleEnd) return Phase.Shuffle;
  if (frame <= PHASE_BOUNDARIES.revealEnd) return Phase.Reveal;
  return Phase.ThankYou;
}

/**
 * Returns true if the frame is within the first 60 frames of a phase boundary.
 */
export function isTransitionFrame(frame: number): boolean {
  return PHASE_BOUNDARY_FRAMES.some((b) => frame >= b && frame < b + 60);
}

/**
 * Fade-to-black opacity for the final frames of Part B.
 * Returns 0 before FADE_START, ramps to 1 by FADE_END.
 */
export function getFadeOpacity(frame: number): number {
  if (frame < FADE_START) return 0;
  return Math.min(1, (frame - FADE_START) / (FADE_END - FADE_START));
}

/**
 * Animated count-up from 0 to target score using cubic ease-out.
 * Animation runs over 60 frames starting at revealFrame.
 */
export function getCountUpValue(
  target: number,
  frame: number,
  revealFrame: number,
): number {
  const elapsed = Math.max(0, frame - revealFrame);
  const progress = Math.min(1, elapsed / 60);
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(eased * target);
}

/**
 * Calculate podium bar height proportional to score.
 * Minimum bar height is 40% of maxHeight to keep all bars visible.
 */
export function getPodiumBarHeight(
  score: number,
  maxScore: number,
  maxHeight: number,
): number {
  return Math.max(0.4, score / maxScore) * maxHeight;
}

/**
 * Returns the list of placements revealed by the given frame.
 * Reveals in order: 6th, 5th, 4th, 3rd, 2nd, 1st.
 */
export function getRevealedPlacements(frame: number): number[] {
  const placements: number[] = [];
  for (const entry of REVEAL_SCHEDULE) {
    if (frame >= entry.frame) {
      placements.push(entry.rank);
    }
  }
  return placements;
}

/**
 * Returns the current showcase page index for the given frame.
 */
export function getShowcasePage(
  frame: number,
  groupCount: number,
): number {
  const totalPages = Math.ceil(groupCount / GROUPS_PER_PAGE);
  const page = Math.floor(frame / PAGE_DURATION);
  return Math.min(page, totalPages - 1);
}

/**
 * Returns the total number of showcase pages.
 */
export function getAllShowcasePages(groupCount: number): number {
  return Math.ceil(groupCount / GROUPS_PER_PAGE);
}

/**
 * Returns the shuffle cycle speed (frames between position changes).
 * Starts slow (10) and accelerates to ~60 over the shuffle phase.
 */
export function getShuffleCycleSpeed(frameInPhase: number): number {
  const progress = frameInPhase / 1800;
  return Math.round(10 + progress * 50);
}
