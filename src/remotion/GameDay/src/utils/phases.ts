// ── Data Models ──
export interface ScheduleSegment {
  label: string;
  startFrame: number;
  endFrame: number;
  speakers?: string;
}

export type CardState = "active" | "upcoming" | "completed";

// ── Segment Helpers ──
export function getCardState(frame: number, segment: ScheduleSegment): CardState {
  if (frame > segment.endFrame) return "completed";
  if (frame >= segment.startFrame && frame <= segment.endFrame) return "active";
  return "upcoming";
}

export function getActiveSegment(
  frame: number,
  segments: ScheduleSegment[],
): ScheduleSegment | undefined {
  return segments.find((s) => frame >= s.startFrame && frame <= s.endFrame);
}

export function getPhaseInfo(
  frame: number,
  segments: ScheduleSegment[],
): { name: string; progress: number } {
  const seg = segments.find((s) => frame >= s.startFrame && frame <= s.endFrame);
  if (!seg) {
    const last = segments[segments.length - 1];
    return { name: last.label, progress: 1 };
  }
  const progress =
    (frame - seg.startFrame) / (seg.endFrame - seg.startFrame + 1);
  return { name: seg.label, progress: Math.min(1, Math.max(0, progress)) };
}
