/**
 * Tutorial / How-To Template - Creator Economy Templates (V4)
 *
 * A reusable, theme-aware tutorial video template.
 * Renders step-by-step instructional content with progress indicators.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "numbered-steps"  - Vertical numbered list with StepIndicator + ProgressBar (default)
 *   "card-sequence"   - Horizontal scrolling step cards with GlassCard styling
 *   "split-demo"      - Step text on left, visual placeholder on right using SplitScreen
 *
 * DATA CONTRACT (TutorialSpec):
 *   {
 *     title: "How to Set Up CI/CD",
 *     steps: [{ title: "Step 1", description: "...", duration_estimate: "5 min" }],
 *     theme: "dark",
 *     layout: "numbered-steps"
 *   }
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
  slideIn,
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
  ProgressBar,
  StepIndicator,
  SplitScreen,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface TutorialSpec {
  title: string;
  steps: Array<{ title: string; description: string; duration_estimate?: string }>;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "numbered-steps" | "card-sequence" | "split-demo";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface TutorialProps {
  spec: TutorialSpec;
  theme?: Theme;
  layout?: "numbered-steps" | "card-sequence" | "split-demo";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  progressStart: 25,
  stepsStart: 50,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<TutorialSpec, "title" | "theme" | "brandKit" | "layout"> = {
  steps: [
    { title: "Getting Started", description: "Set up your environment and install dependencies", duration_estimate: "5 min" },
    { title: "Configuration", description: "Configure your project settings and preferences", duration_estimate: "3 min" },
    { title: "Core Concepts", description: "Learn the fundamental building blocks", duration_estimate: "10 min" },
    { title: "Build & Deploy", description: "Package and ship your project to production", duration_estimate: "7 min" },
  ],
};

// ── Main Component ──────────────────────────────────────────────
export const Tutorial: React.FC<TutorialProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "numbered-steps";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "card-sequence") {
    return <CardSequenceLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "split-demo") {
    return <SplitDemoLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <NumberedStepsLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Numbered Steps ──────────────────────────────────────
// Vertical numbered list with StepIndicator components, ProgressBar at top.
const NumberedStepsLayout: React.FC<{
  spec: TutorialSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const totalSteps = spec.steps.length;

  // Calculate how many steps are "visible" based on frame
  const visibleSteps = spec.steps.filter((_, i) => {
    const delay = staggerDelay(i, TIMING.stepsStart, 25);
    return frame >= delay;
  }).length;
  const completionPercent = totalSteps > 0 ? Math.round((visibleSteps / totalSteps) * 100) : 0;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Title */}
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          textAlign: "center",
          marginBottom: 16,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.title}
        </div>

        {/* Progress Bar */}
        <div style={{
          maxWidth: 600, width: "100%", margin: "0 auto 24px",
          opacity: fadeIn(frame, TIMING.progressStart),
        }}>
          <ProgressBar
            progress={completionPercent}
            frame={frame}
            startFrame={TIMING.progressStart}
            theme={theme}
            label="Progress"
            showPercent
          />
        </div>

        {/* Steps list */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          maxWidth: 700, width: "100%", margin: "0 auto",
          flex: 1, overflow: "hidden",
        }}>
          {spec.steps.map((step, i) => {
            const delay = staggerDelay(i, TIMING.stepsStart, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const status: "pending" | "active" | "completed" =
              i < visibleSteps - 1 ? "completed" : i === visibleSteps - 1 ? "active" : "pending";

            return (
              <div key={i} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 20)}px)`,
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <StepIndicator
                  stepNumber={i + 1}
                  status={status}
                  label={step.title}
                  theme={theme}
                />
                <div style={{
                  marginLeft: 44,
                  fontSize: TYPE.body,
                  color: theme.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {step.description}
                  {step.duration_estimate && (
                    <span style={{ color: theme.textMuted, marginLeft: 8, fontSize: TYPE.caption }}>
                      ({step.duration_estimate})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Card Sequence ───────────────────────────────────────
// Horizontal scrolling step cards with GlassCard styling.
const CardSequenceLayout: React.FC<{
  spec: TutorialSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const totalSteps = spec.steps.length;

  const visibleSteps = spec.steps.filter((_, i) => {
    const delay = staggerDelay(i, TIMING.stepsStart, 25);
    return frame >= delay;
  }).length;
  const completionPercent = totalSteps > 0 ? Math.round((visibleSteps / totalSteps) * 100) : 0;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Title */}
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          textAlign: "center",
          marginBottom: 12,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.title}
        </div>

        {/* Progress Bar */}
        <div style={{
          maxWidth: 500, width: "100%", margin: "0 auto 24px",
          opacity: fadeIn(frame, TIMING.progressStart),
        }}>
          <ProgressBar
            progress={completionPercent}
            frame={frame}
            startFrame={TIMING.progressStart}
            theme={theme}
            showPercent
          />
        </div>

        {/* Horizontal card row */}
        <div style={{
          display: "flex", gap: 16, flex: 1,
          alignItems: "stretch", overflow: "hidden",
        }}>
          {spec.steps.map((step, i) => {
            const delay = staggerDelay(i, TIMING.stepsStart, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                flex: `0 0 ${Math.max(200, Math.floor(900 / Math.max(totalSteps, 1)))}px`,
                opacity: s,
                transform: `translateX(${slideIn(s, "right", 40)}px)`,
                display: "flex", flexDirection: "column",
              }}>
                {/* Step number badge */}
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: theme.accent, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#ffffff",
                  marginBottom: 12, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  fontSize: TYPE.cardTitle, fontWeight: 700,
                  color: theme.accent, marginBottom: 8,
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: TYPE.body, color: theme.textSecondary,
                  lineHeight: 1.5, flex: 1,
                }}>
                  {step.description}
                </div>
                {step.duration_estimate && (
                  <div style={{
                    fontSize: TYPE.caption, color: theme.textMuted,
                    marginTop: 8,
                  }}>
                    ⏱ {step.duration_estimate}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Split Demo ──────────────────────────────────────────
// Step text on left, visual placeholder on right using SplitScreen.
const SplitDemoLayout: React.FC<{
  spec: TutorialSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const totalSteps = spec.steps.length;

  const visibleSteps = spec.steps.filter((_, i) => {
    const delay = staggerDelay(i, TIMING.stepsStart, 25);
    return frame >= delay;
  }).length;
  const completionPercent = totalSteps > 0 ? Math.round((visibleSteps / totalSteps) * 100) : 0;

  // Determine which step is currently "active" for the demo panel
  const activeIndex = Math.max(0, visibleSteps - 1);

  const leftContent = (
    <div style={{
      padding: `${TOP_SAFE}px ${PADDING / 2}px ${TOP_SAFE}px ${PADDING}px`,
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      {/* Title */}
      <div style={{
        fontSize: TYPE.title,
        fontWeight: theme.headingWeight,
        marginBottom: 12,
        opacity: titleSpring,
        transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
      }}>
        {spec.title}
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: 20,
        opacity: fadeIn(frame, TIMING.progressStart),
      }}>
        <ProgressBar
          progress={completionPercent}
          frame={frame}
          startFrame={TIMING.progressStart}
          theme={theme}
          showPercent
        />
      </div>

      {/* Steps list */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 12,
        flex: 1, overflow: "hidden",
      }}>
        {spec.steps.map((step, i) => {
          const delay = staggerDelay(i, TIMING.stepsStart, 25);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const status: "pending" | "active" | "completed" =
            i < activeIndex ? "completed" : i === activeIndex ? "active" : "pending";

          return (
            <div key={i} style={{
              opacity: s,
              transform: `translateY(${slideIn(s, "up", 15)}px)`,
            }}>
              <StepIndicator
                stepNumber={i + 1}
                status={status}
                label={step.title}
                theme={theme}
              />
              {step.duration_estimate && (
                <div style={{
                  marginLeft: 44, fontSize: TYPE.caption,
                  color: theme.textMuted, marginTop: 2,
                }}>
                  ⏱ {step.duration_estimate}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const rightContent = (
    <div style={{
      padding: `${TOP_SAFE}px ${PADDING}px ${TOP_SAFE}px ${PADDING / 2}px`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%",
    }}>
      {/* Visual placeholder showing active step detail */}
      <GlassCard theme={theme} style={{ width: "100%", textAlign: "center" }}>
        <div style={{
          fontSize: TYPE.label, color: theme.textMuted,
          textTransform: "uppercase" as const, letterSpacing: 2,
          marginBottom: 12,
        }}>
          Step {activeIndex + 1} of {totalSteps}
        </div>
        <div style={{
          fontSize: TYPE.subtitle, fontWeight: theme.headingWeight,
          color: theme.accent, marginBottom: 12,
        }}>
          {spec.steps[activeIndex]?.title ?? ""}
        </div>
        <div style={{
          fontSize: TYPE.body, color: theme.textSecondary,
          lineHeight: 1.6,
        }}>
          {spec.steps[activeIndex]?.description ?? ""}
        </div>
      </GlassCard>
    </div>
  );

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />
      <SplitScreen
        leftContent={leftContent}
        rightContent={rightContent}
        splitRatio={0.45}
        frame={frame}
        startFrame={TIMING.bgStart + 10}
        fps={fps}
        theme={theme}
      />
    </AbsoluteFill>
  );
};
