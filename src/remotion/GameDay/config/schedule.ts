/**
 * Schedule Configuration  -  AWS Community GameDay Europe
 *
 * All times are expressed as minute offsets from EVENT_START_OFFSET_MINUTES
 * (17:30 CET for this edition) so they are timezone-independent.
 *
 * Update these segments to match your event's actual run-of-show.
 */

import {
  STREAM_FPS,
  EVENT_START_OFFSET_MINUTES,
  STREAM_START_OFFSET_MINUTES,
  GAME_START_OFFSET_MINUTES,
  GAME_END_OFFSET_MINUTES,
  EVENT_END_OFFSET_MINUTES,
} from "./event";

export interface ScheduleSegment {
  id: string;
  label: string;
  startMinute: number;    // minutes from EVENT_START (17:30 CET for this edition)
  durationMinutes: number;
  speaker?: string;
  notes?: string;
}

// ── Full Event Schedule ──
// Used for the Main Event composition and overview slides.
export const EVENT_SCHEDULE: ScheduleSegment[] = [
  {
    id: "preshow",
    label: "Pre-Show",
    startMinute: EVENT_START_OFFSET_MINUTES,
    durationMinutes: STREAM_START_OFFSET_MINUTES - EVENT_START_OFFSET_MINUTES,
    notes: "Countdown loop. Muted. Optional local setup time.",
  },
  {
    id: "introductions",
    label: "Introductions",
    startMinute: STREAM_START_OFFSET_MINUTES,
    durationMinutes: 15,
    speaker: "Linda (stream host)",
    notes: "Stream goes live. Welcome, organizer intros, user group roll-call.",
  },
  {
    id: "instructions",
    label: "GameDay Instructions",
    startMinute: STREAM_START_OFFSET_MINUTES + 15,
    durationMinutes: 10,
    speaker: "Arnaud & Loïc (Gamemasters)",
    notes: "How GameDay works, quests, scoring, hints.",
  },
  {
    id: "code-distribution",
    label: "Code Distribution",
    startMinute: STREAM_START_OFFSET_MINUTES + 25,
    durationMinutes: 5,
    notes: "AWS account codes distributed to each location.",
  },
  {
    id: "gameplay-phase1",
    label: "Phase 1",
    startMinute: GAME_START_OFFSET_MINUTES,
    durationMinutes: 30,
    notes: "First 30 minutes of gameplay. Early tips shown.",
  },
  {
    id: "gameplay-phase2",
    label: "Phase 2",
    startMinute: GAME_START_OFFSET_MINUTES + 30,
    durationMinutes: 30,
    notes: "Late tips shown. Amazon Q Developer reminder.",
  },
  {
    id: "gameplay-phase3",
    label: "Phase 3",
    startMinute: GAME_START_OFFSET_MINUTES + 60,
    durationMinutes: 30,
    notes: "Score drama. Audio cue reminder at end.",
  },
  {
    id: "gameplay-final",
    label: "Final Phase",
    startMinute: GAME_START_OFFSET_MINUTES + 90,
    durationMinutes: 30,
    notes: "Final 30 minutes. Urgency glow active at last 5 min. Audio cue for closing.",
  },
  {
    id: "closing-parta",
    label: "Closing Part A",
    startMinute: GAME_END_OFFSET_MINUTES,
    durationMinutes: 2.5,
    notes: "Pre-rendered. Hero intro, fast scroll, shuffle countdown.",
  },
  {
    id: "closing-partb",
    label: "Closing Part B",
    startMinute: GAME_END_OFFSET_MINUTES + 2.5,
    durationMinutes: 5,
    notes: "Live update required. Shuffle → Reveal (6th→1st) → Podium → Thank You.",
  },
  {
    id: "stream-end",
    label: "Stream End",
    startMinute: EVENT_END_OFFSET_MINUTES,
    durationMinutes: 0,
    notes: "Stream ends with music.",
  },
];

// ── Frame-based Phase Data for Gameplay Composition ──
// Derived from GAME_START_OFFSET_MINUTES (these are frames *within* the gameplay composition)
export const GAMEPLAY_PHASE_SEGMENTS = [
  { label: "Phase 1",     startFrame: 0,      endFrame: 53999 },
  { label: "Phase 2",     startFrame: 54000,  endFrame: 107999 },
  { label: "Phase 3",     startFrame: 108000, endFrame: 161999 },
  { label: "Final Phase", startFrame: 162000, endFrame: 215999 },
];

// ── Re-export convenience timing constants for compositions ──
export {
  EVENT_START_OFFSET_MINUTES as EVENT_START,
  STREAM_START_OFFSET_MINUTES as STREAM_START,
  GAME_START_OFFSET_MINUTES as GAME_START,
  GAME_END_OFFSET_MINUTES as GAME_END,
  EVENT_END_OFFSET_MINUTES as EVENT_END,
};
