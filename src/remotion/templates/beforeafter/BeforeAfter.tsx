/**
 * Before/After Template - Creator Economy Templates (V4)
 *
 * A reusable, theme-aware before/after comparison video template.
 * Renders transformation showcases with split-screen, wipe, and metrics layouts.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "split-screen"     - SplitScreen component with before/after labels and animated divider (default)
 *   "reveal-wipe"      - Animated wipe transition from before to after state
 *   "metrics-compare"  - Before/after stat cards with CountUp animating from before→after values
 *
 * DATA CONTRACT (BeforeAfterSpec):
 *   {
 *     title: "My Transformation",
 *     before_label: "Before",
 *     after_label: "After",
 *     description: "See the difference",
 *     metrics: [{ label: "Revenue", before: 10, after: 85, suffix: "%" }],
 *     theme: "dark",
 *     layout: "split-screen"
 *   }
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
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
  CountUp,
  SplitScreen,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface BeforeAfterSpec {
  title: string;
  before_label: string;
  after_label: string;
  description: string;
  metrics?: Array<{ label: string; before: number; after: number; suffix?: string }>;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "split-screen" | "reveal-wipe" | "metrics-compare";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface BeforeAfterProps {
  spec: BeforeAfterSpec;
  theme?: Theme;
  layout?: "split-screen" | "reveal-wipe" | "metrics-compare";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  descriptionStart: 25,
  labelsStart: 50,
  metricsStart: 80,
  wipeStart: 60,
  wipeEnd: 160,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<BeforeAfterSpec, "title" | "theme" | "brandKit" | "layout"> = {
  before_label: "Before",
  after_label: "After",
  description: "See the transformation in action",
  metrics: [
    { label: "Performance", before: 35, after: 92, suffix: "%" },
    { label: "Efficiency", before: 20, after: 78, suffix: "%" },
    { label: "Satisfaction", before: 45, after: 96, suffix: "%" },
  ],
};

// ── Main Component ──────────────────────────────────────────────
export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "split-screen";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "reveal-wipe") {
    return <RevealWipeLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "metrics-compare") {
    return <MetricsCompareLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <SplitScreenLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Split Screen ────────────────────────────────────────
// SplitScreen component with before/after labels and animated divider.
const SplitScreenLayout: React.FC<{
  spec: BeforeAfterSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const descOpacity = fadeIn(frame, TIMING.descriptionStart);
  const labelsSpring = springEntrance(frame, fps, TIMING.labelsStart, SPRING.default);

  const leftContent = (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", padding: 32,
    }}>
      <div style={{
        fontSize: TYPE.subtitle,
        fontWeight: theme.headingWeight,
        color: theme.textMuted,
        textTransform: "uppercase" as const,
        letterSpacing: 2,
        marginBottom: 16,
        opacity: labelsSpring,
      }}>
        {spec.before_label}
      </div>
      {(spec.metrics ?? []).slice(0, 3).map((metric, i) => {
        const delay = staggerDelay(i, TIMING.metricsStart, 20);
        const s = springEntrance(frame, fps, delay, SPRING.default);
        return (
          <div key={i} style={{
            opacity: s,
            transform: `translateY(${slideIn(s, "up", 20)}px)`,
            marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textMuted }}>
              <CountUp target={metric.before} frame={frame} startFrame={delay} suffix={metric.suffix} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  const rightContent = (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", padding: 32,
    }}>
      <div style={{
        fontSize: TYPE.subtitle,
        fontWeight: theme.headingWeight,
        color: theme.accent,
        textTransform: "uppercase" as const,
        letterSpacing: 2,
        marginBottom: 16,
        opacity: labelsSpring,
      }}>
        {spec.after_label}
      </div>
      {(spec.metrics ?? []).slice(0, 3).map((metric, i) => {
        const delay = staggerDelay(i, TIMING.metricsStart, 20);
        const s = springEntrance(frame, fps, delay, SPRING.default);
        return (
          <div key={i} style={{
            opacity: s,
            transform: `translateY(${slideIn(s, "up", 20)}px)`,
            marginBottom: 16, textAlign: "center",
          }}>
            <div style={{
              fontSize: TYPE.stat, fontWeight: theme.headingWeight,
              background: theme.accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <CountUp target={metric.after} frame={frame} startFrame={delay + 30} suffix={metric.suffix} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, marginTop: 4 }}>
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      {/* Title + Description */}
      <div style={{
        position: "absolute", top: TOP_SAFE, left: 0, right: 0,
        textAlign: "center", padding: `0 ${PADDING}px`, zIndex: 2,
      }}>
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.title}
        </div>
        <div style={{
          fontSize: TYPE.body,
          color: theme.textSecondary,
          marginTop: 8,
          opacity: descOpacity,
        }}>
          {spec.description}
        </div>
      </div>

      {/* Split Screen */}
      <div style={{
        position: "absolute", top: TOP_SAFE + 80, bottom: 40,
        left: PADDING, right: PADDING,
      }}>
        <SplitScreen
          leftContent={leftContent}
          rightContent={rightContent}
          frame={frame}
          startFrame={TIMING.labelsStart}
          fps={fps}
          theme={theme}
          dividerAnimated
        />
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Reveal Wipe ─────────────────────────────────────────
// Animated wipe transition from before to after state.
const RevealWipeLayout: React.FC<{
  spec: BeforeAfterSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const descOpacity = fadeIn(frame, TIMING.descriptionStart);

  // Wipe progress: 0 = fully "before", 1 = fully "after"
  const wipeProgress = interpolate(
    frame,
    [TIMING.wipeStart, TIMING.wipeEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const beforeOpacity = interpolate(wipeProgress, [0, 0.4, 0.6], [1, 1, 0.2], {
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(wipeProgress, [0.4, 0.6, 1], [0.2, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beforeLabelSpring = springEntrance(frame, fps, TIMING.labelsStart, SPRING.default);
  const afterLabelSpring = springEntrance(frame, fps, TIMING.labelsStart + 60, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      {/* Title + Description */}
      <div style={{
        position: "absolute", top: TOP_SAFE, left: 0, right: 0,
        textAlign: "center", padding: `0 ${PADDING}px`, zIndex: 2,
      }}>
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
        }}>
          {spec.title}
        </div>
        <div style={{
          fontSize: TYPE.body,
          color: theme.textSecondary,
          marginTop: 8,
          opacity: descOpacity,
        }}>
          {spec.description}
        </div>
      </div>

      {/* Wipe container */}
      <div style={{
        position: "absolute", top: TOP_SAFE + 80, bottom: 40,
        left: PADDING, right: PADDING,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 32,
      }}>
        {/* Before state */}
        <div style={{
          opacity: beforeOpacity,
          transform: `translateX(${interpolate(wipeProgress, [0, 1], [0, -60], { extrapolateRight: "clamp" })}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: TYPE.subtitle,
            fontWeight: theme.headingWeight,
            color: theme.textMuted,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 16,
            opacity: beforeLabelSpring,
          }}>
            {spec.before_label}
          </div>
          <GlassCard theme={theme} style={{ minWidth: 300, padding: "24px 40px" }}>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
              {(spec.metrics ?? []).slice(0, 3).map((metric, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textMuted }}>
                    {metric.before}{metric.suffix ?? ""}
                  </div>
                  <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Wipe divider line */}
        <div style={{
          width: interpolate(wipeProgress, [0.3, 0.5], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: 2,
          background: theme.accentGradient,
          borderRadius: 1,
        }} />

        {/* After state */}
        <div style={{
          opacity: afterOpacity,
          transform: `translateX(${interpolate(wipeProgress, [0, 1], [60, 0], { extrapolateRight: "clamp" })}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: TYPE.subtitle,
            fontWeight: theme.headingWeight,
            color: theme.accent,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 16,
            opacity: afterLabelSpring,
          }}>
            {spec.after_label}
          </div>
          <GlassCard theme={theme} style={{ minWidth: 300, padding: "24px 40px" }}>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
              {(spec.metrics ?? []).slice(0, 3).map((metric, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: TYPE.stat, fontWeight: theme.headingWeight,
                    background: theme.accentGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {metric.after}{metric.suffix ?? ""}
                  </div>
                  <div style={{ fontSize: TYPE.label, color: theme.textSecondary, marginTop: 4 }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Metrics Compare ─────────────────────────────────────
// Before/after stat cards with CountUp animating from before→after values.
const MetricsCompareLayout: React.FC<{
  spec: BeforeAfterSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const descOpacity = fadeIn(frame, TIMING.descriptionStart);

  const metrics = spec.metrics ?? [];

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            opacity: titleSpring,
            transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          }}>
            {spec.title}
          </div>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginTop: 8,
            opacity: descOpacity,
          }}>
            {spec.description}
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 120,
          marginTop: 16, marginBottom: 8,
        }}>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: 700,
            color: theme.textMuted,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: fadeIn(frame, TIMING.labelsStart),
          }}>
            {spec.before_label}
          </div>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: 700,
            color: theme.accent,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            opacity: fadeIn(frame, TIMING.labelsStart),
          }}>
            {spec.after_label}
          </div>
        </div>

        {/* Metric cards */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          gap: 12, justifyContent: "center",
          maxWidth: 800, margin: "0 auto", width: "100%",
        }}>
          {metrics.slice(0, 4).map((metric, i) => {
            const delay = staggerDelay(i, TIMING.metricsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);

            // CountUp animates from before value to after value
            const countUpDuration = 60;
            const countUpStart = delay + 20;
            const progress = Math.min(1, Math.max(0, (frame - countUpStart) / countUpDuration));
            const eased = 1 - Math.pow(1 - progress, 3);
            const animatedValue = Math.round(metric.before + eased * (metric.after - metric.before));
            const formatted = animatedValue >= 1000
              ? `${(animatedValue / 1000).toFixed(0)}k`
              : `${animatedValue}`;

            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 20)}px)`,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  {/* Before value */}
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{
                      fontSize: TYPE.stat,
                      fontWeight: theme.headingWeight,
                      color: theme.textMuted,
                    }}>
                      <CountUp target={metric.before} frame={frame} startFrame={delay} suffix={metric.suffix} />
                    </div>
                  </div>

                  {/* Label + arrow */}
                  <div style={{
                    textAlign: "center", flex: 1,
                    display: "flex", flexDirection: "column", alignItems: "center",
                  }}>
                    <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textSecondary }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontSize: 18, color: theme.accent, marginTop: 4,
                    }}>
                      →
                    </div>
                  </div>

                  {/* After value (animated from before→after) */}
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{
                      fontSize: TYPE.stat,
                      fontWeight: theme.headingWeight,
                      background: theme.accentGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                      {formatted}{metric.suffix ?? ""}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
