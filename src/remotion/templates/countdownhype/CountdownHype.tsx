/**
 * Countdown/Hype Template - Creator Economy Templates (V4)
 *
 * A reusable, theme-aware countdown and hype video template.
 * Renders launch countdowns, event teasers, and limited-time offers.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "timer"    - Large CountdownTimer digits with pulsing glow effect (default)
 *   "teaser"   - Event title with spring reveal animation and date
 *   "urgency"  - Limited-time offer with ProgressBar showing remaining availability
 *
 * DATA CONTRACT (CountdownHypeSpec):
 *   {
 *     event_title: "Product Launch 2025",
 *     countdown_value: 30,
 *     tagline: "The wait is almost over",
 *     urgency_message: "Only 15% of spots remaining!",
 *     availability_percent: 15,
 *     theme: "dark",
 *     layout: "timer"
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
  SPRING,
} from "../_shared/animations";
import type { Theme, BrandKit, PlatformHints, CollabMetadata } from "../_shared/themes";
import type { VideoFormat } from "../_shared/formats";
import { THEMES, THEME_DARK, applyBrandKit } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import {
  GlassCard,
  BackgroundGrid,
  CountdownTimer,
  ProgressBar,
  GradientBadge,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface CountdownHypeSpec {
  event_title: string;
  countdown_value: number;
  tagline: string;
  urgency_message?: string;
  availability_percent?: number;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "timer" | "teaser" | "urgency";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface CountdownHypeProps {
  spec: CountdownHypeSpec;
  theme?: Theme;
  layout?: "timer" | "teaser" | "urgency";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  titleStart: 5,
  taglineStart: 25,
  countdownStart: 50,
  messageStart: 80,
  badgeStart: 120,
  glowPulseStart: 60,
};

// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<CountdownHypeSpec, "event_title" | "theme" | "brandKit" | "layout"> = {
  countdown_value: 30,
  tagline: "The wait is almost over",
  urgency_message: "Limited spots remaining - act now",
  availability_percent: 15,
};

// ── Main Component ──────────────────────────────────────────────
export const CountdownHype: React.FC<CountdownHypeProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "timer";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "teaser") {
    return <TeaserLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "urgency") {
    return <UrgencyLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <TimerLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Timer ───────────────────────────────────────────────
// Large CountdownTimer digits with pulsing glow effect.
const TimerLayout: React.FC<{
  spec: CountdownHypeSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineOpacity = fadeIn(frame, TIMING.taglineStart);
  const countdownSpring = springEntrance(frame, fps, TIMING.countdownStart, SPRING.default);

  // Pulsing glow effect - oscillates between 0.4 and 1.0 opacity
  const glowActive = frame >= TIMING.glowPulseStart;
  const glowCycle = glowActive
    ? interpolate(
        Math.sin((frame - TIMING.glowPulseStart) * 0.12),
        [-1, 1],
        [0.4, 1],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
      )
    : 0;

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Title */}
        <div style={{
          fontSize: TYPE.title,
          fontWeight: theme.headingWeight,
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 20)}px)`,
          marginBottom: 12,
        }}>
          {spec.event_title}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          textAlign: "center",
          opacity: taglineOpacity,
          marginBottom: 48,
        }}>
          {spec.tagline}
        </div>

        {/* Large countdown with glow */}
        <div style={{
          opacity: countdownSpring,
          transform: `scale(${interpolate(countdownSpring, [0, 1], [0.8, 1], { extrapolateRight: "clamp" })})`,
          position: "relative",
        }}>
          {/* Glow layer */}
          <div style={{
            position: "absolute", inset: -40,
            borderRadius: 24,
            background: theme.accentGradient,
            opacity: glowCycle * 0.15,
            filter: "blur(40px)",
          }} />

          <GlassCard theme={theme} style={{
            padding: "40px 80px",
            textAlign: "center",
            position: "relative",
          }}>
            <div style={{
              fontSize: 96,
              fontWeight: theme.headingWeight,
              background: theme.accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}>
              <CountdownTimer
                targetValue={spec.countdown_value}
                frame={frame}
                startFrame={TIMING.countdownStart}
                theme={theme}
                duration={120}
              />
            </div>
            <div style={{
              fontSize: TYPE.cardTitle,
              color: theme.textMuted,
              marginTop: 8,
              textTransform: "uppercase" as const,
              letterSpacing: 2,
            }}>
              days remaining
            </div>
          </GlassCard>
        </div>

        {/* Urgency message if provided */}
        {spec.urgency_message && (
          <div style={{
            marginTop: 32,
            opacity: fadeIn(frame, TIMING.messageStart),
          }}>
            <GradientBadge text={spec.urgency_message} theme={theme} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Teaser ──────────────────────────────────────────────
// Event title with spring reveal animation and date.
const TeaserLayout: React.FC<{
  spec: CountdownHypeSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.bouncy);
  const taglineSpring = springEntrance(frame, fps, TIMING.taglineStart, SPRING.default);
  const countdownSpring = springEntrance(frame, fps, TIMING.countdownStart, SPRING.default);
  const badgeSpring = springEntrance(frame, fps, TIMING.badgeStart, SPRING.snappy);

  // Reveal line animation
  const lineWidth = interpolate(frame, [TIMING.titleStart, TIMING.titleStart + 40], [0, 400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Decorative reveal line */}
        <div style={{
          width: lineWidth,
          height: 2,
          background: theme.accentGradient,
          borderRadius: 1,
          marginBottom: 32,
        }} />

        {/* Event title - large spring reveal */}
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 30)}px) scale(${interpolate(titleSpring, [0, 1], [0.9, 1], { extrapolateRight: "clamp" })})`,
          marginBottom: 16,
          background: theme.accentGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {spec.event_title}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          textAlign: "center",
          opacity: taglineSpring,
          transform: `translateY(${slideIn(taglineSpring, "up", 20)}px)`,
          marginBottom: 40,
          maxWidth: 600,
        }}>
          {spec.tagline}
        </div>

        {/* Countdown value in a card */}
        <div style={{
          opacity: countdownSpring,
          transform: `translateY(${slideIn(countdownSpring, "up", 20)}px)`,
        }}>
          <GlassCard theme={theme} style={{ padding: "24px 48px", textAlign: "center" }}>
            <div style={{
              fontSize: TYPE.stat,
              fontWeight: theme.headingWeight,
              color: theme.accent,
            }}>
              <CountdownTimer
                targetValue={spec.countdown_value}
                frame={frame}
                startFrame={TIMING.countdownStart}
                theme={theme}
                duration={100}
              />
              <span style={{ fontSize: TYPE.cardTitle, color: theme.textMuted, marginLeft: 8 }}>
                days
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Badge CTA */}
        {spec.urgency_message && (
          <div style={{
            marginTop: 32,
            opacity: badgeSpring,
            transform: `translateY(${slideIn(badgeSpring, "up", 15)}px)`,
          }}>
            <GradientBadge text={spec.urgency_message} theme={theme} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Urgency ─────────────────────────────────────────────
// Limited-time offer with ProgressBar showing remaining availability.
const UrgencyLayout: React.FC<{
  spec: CountdownHypeSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const taglineOpacity = fadeIn(frame, TIMING.taglineStart);
  const countdownSpring = springEntrance(frame, fps, TIMING.countdownStart, SPRING.default);
  const progressSpring = springEntrance(frame, fps, TIMING.messageStart, SPRING.default);
  const messageOpacity = fadeIn(frame, TIMING.messageStart + 20);

  const availability = spec.availability_percent ?? 25;

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
            {spec.event_title}
          </div>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
            marginTop: 8,
            opacity: taglineOpacity,
          }}>
            {spec.tagline}
          </div>
        </div>

        {/* Main content area */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 24,
          maxWidth: 700, margin: "0 auto", width: "100%",
        }}>
          {/* Countdown card */}
          <div style={{
            opacity: countdownSpring,
            transform: `translateY(${slideIn(countdownSpring, "up", 20)}px)`,
            width: "100%",
          }}>
            <GlassCard theme={theme} style={{ padding: "24px 40px", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12 }}>
                <div style={{
                  fontSize: 64,
                  fontWeight: theme.headingWeight,
                  background: theme.accentGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}>
                  <CountdownTimer
                    targetValue={spec.countdown_value}
                    frame={frame}
                    startFrame={TIMING.countdownStart}
                    theme={theme}
                    duration={100}
                  />
                </div>
                <div style={{
                  fontSize: TYPE.subtitle,
                  color: theme.textMuted,
                  textTransform: "uppercase" as const,
                  letterSpacing: 2,
                }}>
                  days left
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Availability progress bar */}
          <div style={{
            opacity: progressSpring,
            transform: `translateY(${slideIn(progressSpring, "up", 20)}px)`,
            width: "100%",
          }}>
            <GlassCard theme={theme} style={{ padding: "20px 32px" }}>
              <ProgressBar
                progress={availability}
                frame={frame}
                startFrame={TIMING.messageStart}
                theme={theme}
                height={12}
                duration={60}
                label="Availability Remaining"
                showPercent
              />
            </GlassCard>
          </div>

          {/* Urgency message */}
          {spec.urgency_message && (
            <div style={{
              fontSize: TYPE.subtitle,
              fontWeight: 600,
              color: theme.accent,
              textAlign: "center",
              opacity: messageOpacity,
            }}>
              {spec.urgency_message}
            </div>
          )}

          {/* CTA badge */}
          <div style={{
            opacity: fadeIn(frame, TIMING.badgeStart),
            marginTop: 8,
          }}>
            <GradientBadge text="Act Now - Limited Time" theme={theme} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
