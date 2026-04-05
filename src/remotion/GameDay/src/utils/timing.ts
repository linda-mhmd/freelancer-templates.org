import { STREAM_FPS } from "../../config/event";

export function staggeredEntry(
  baseFrame: number,
  index: number,
  stagger: number = 20,
): number {
  return baseFrame + index * stagger;
}

// ── Time Formatting ──
export function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ── Cross-Composition Countdown ──
/**
 * Returns seconds remaining until targetTime given the current frame
 * and the composition's offset within the event timeline.
 *
 * @param compositionFrame - Current frame within this composition (0-based)
 * @param compositionStartOffset - Minutes from event start (17:30 CET) when this composition begins
 * @param targetTime - Minutes from event start (17:30 CET) for the countdown target
 * @param fps - Frames per second (30)
 * @returns Non-negative integer: seconds remaining until targetTime
 */
export function calculateCountdown(
  compositionFrame: number,
  compositionStartOffset: number,
  targetTime: number,
  fps: number,
): number {
  return Math.max(
    0,
    Math.floor(targetTime * 60 - compositionStartOffset * 60 - compositionFrame / fps),
  );
}
