/**
 * Fitness Routine Template - Creator Economy Templates (V6)
 *
 * A reusable, theme-aware fitness workout video template.
 * Renders exercise lists, timer-focused views, and circuit layouts.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "exercise-list"  - Scrolling exercise GlassCards with CountUp rep/set counts (default)
 *   "timer-focus"    - Large CountdownTimer with current exercise name
 *   "circuit"        - Circular ProgressBar indicator with exercise sequence
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  springEntrance,
  fadeIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import type { Theme, BrandKit, PlatformHints, CollabMetadata } from "../_shared/themes";
import type { VideoFormat } from "../_shared/formats";
import { THEMES, THEME_DARK, applyBrandKit } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  GlassCard,
  BackgroundGrid,
  CountUp,
  CountdownTimer,
  ProgressBar,
  StatusBadge,
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface FitnessRoutineSpec {
  workout_title: string;
  exercises: Array<{ name: string; reps?: number; sets?: number; duration?: number }>;
  total_duration?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  theme?: string;
  brandKit?: BrandKit;
  layout?: "exercise-list" | "timer-focus" | "circuit";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface FitnessRoutineProps {
  spec: FitnessRoutineSpec;
  theme?: Theme;
  layout?: "exercise-list" | "timer-focus" | "circuit";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  titleStart: 5,
  badgeStart: 20,
  exercisesStart: 50,
  timerStart: 40,
  progressStart: 60,
  ctaStart: 210,
};

// ── QuickStart Defaults ─────────────────────────────────────────
const QUICKSTART_DEFAULTS: Omit<FitnessRoutineSpec, "workout_title" | "theme" | "brandKit" | "layout"> = {
  exercises: [
    { name: "Warm-Up Jog", duration: 5 },
    { name: "Push-Ups", reps: 15, sets: 3 },
    { name: "Squats", reps: 20, sets: 3 },
    { name: "Plank Hold", duration: 1 },
    { name: "Cool-Down Stretch", duration: 5 },
  ],
  total_duration: 30,
  difficulty: "intermediate",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "#22c55e",
  intermediate: "#f59e0b",
  advanced: "#ef4444",
};

// ── Main Component ──────────────────────────────────────────────
export const FitnessRoutine: React.FC<FitnessRoutineProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "exercise-list";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "timer-focus") {
    return <TimerFocusLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "circuit") {
    return <CircuitLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <ExerciseListLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};

// ── Layout: Exercise List ───────────────────────────────────────
const ExerciseListLayout: React.FC<{
  spec: FitnessRoutineSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const badgeOpacity = fadeIn(frame, TIMING.badgeStart);
  const exercises = spec.exercises.slice(0, 6);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{
            opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
            fontSize: TYPE.hero, fontWeight: theme.headingWeight, flex: 1,
          }}>
            {spec.workout_title}
          </div>
          <div style={{ opacity: badgeOpacity }}>
            <StatusBadge status={spec.difficulty === "beginner" ? "on-track" : spec.difficulty === "intermediate" ? "in-progress" : "needs-attention"} theme={theme} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {exercises.map((ex, i) => {
            const delay = staggerDelay(i, TIMING.exercisesStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateX(${(1 - s) * -30}px)`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 20px",
              }}>
                <span style={{ fontSize: TYPE.body, fontWeight: 600 }}>{ex.name}</span>
                <span style={{ fontSize: TYPE.body, color: theme.accent }}>
                  {ex.reps != null && ex.sets != null
                    ? <><CountUp target={ex.reps} frame={frame} startFrame={delay} suffix="" /> × {ex.sets}</>
                    : ex.duration != null
                    ? `${ex.duration} min`
                    : "-"}
                </span>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Timer Focus ─────────────────────────────────────────
const TimerFocusLayout: React.FC<{
  spec: FitnessRoutineSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const timerSpring = springEntrance(frame, fps, TIMING.timerStart, SPRING.default);
  const totalDuration = spec.total_duration ?? 30;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`, textAlign: "center",
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 12,
        }}>
          {spec.workout_title}
        </div>
        <div style={{ opacity: fadeIn(frame, 15), marginBottom: 32 }}>
          <StatusBadge status={spec.difficulty === "beginner" ? "on-track" : spec.difficulty === "intermediate" ? "in-progress" : "needs-attention"} theme={theme} />
        </div>
        <div style={{
          opacity: timerSpring, transform: `scale(${0.8 + timerSpring * 0.2})`,
          marginBottom: 24,
        }}>
          <CountdownTimer
            targetValue={totalDuration}
            frame={frame}
            startFrame={TIMING.timerStart}
            theme={theme}
            duration={120}
          />
        </div>
        <div style={{ opacity: fadeIn(frame, 80), fontSize: TYPE.subtitle, color: theme.textSecondary }}>
          {spec.exercises.length} exercises · {totalDuration} min total
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Circuit ─────────────────────────────────────────────
const CircuitLayout: React.FC<{
  spec: FitnessRoutineSpec; theme: Theme; frame: number; fps: number; bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const progressSpring = springEntrance(frame, fps, TIMING.progressStart, SPRING.default);
  const exercises = spec.exercises.slice(0, 6);
  const completionPercent = Math.min(100, Math.round((frame / 270) * 100));

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`,
          fontSize: TYPE.hero, fontWeight: theme.headingWeight, marginBottom: 8,
        }}>
          {spec.workout_title}
        </div>
        <div style={{ opacity: fadeIn(frame, 15), marginBottom: 24 }}>
          <ProgressBar progress={completionPercent} frame={frame} startFrame={TIMING.progressStart} theme={theme} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, flex: 1 }}>
          {exercises.map((ex, i) => {
            const delay = staggerDelay(i, TIMING.exercisesStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s, transform: `translateY(${(1 - s) * 20}px)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: 16, textAlign: "center",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: DIFFICULTY_COLORS[spec.difficulty] ?? theme.accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: TYPE.label, fontWeight: 700, color: "#fff", marginBottom: 8,
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600 }}>{ex.name}</div>
                <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 4 }}>
                  {ex.reps != null ? `${ex.reps} reps` : ex.duration != null ? `${ex.duration} min` : "-"}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
