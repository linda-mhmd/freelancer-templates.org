/**
 * Milestone Template — Celebrating achievements and anniversaries
 *
 * For freelancers celebrating: 100th client, 1-year anniversary, revenue goals,
 * certifications earned, community milestones, etc.
 *
 * LAYOUTS:
 *   "celebration" — Big number hero with confetti-style accents + journey timeline
 *   "journey"     — Timeline-focused: past milestones leading to the current one
 *   "gratitude"   — Thank-you focused: names/logos of people who helped
 *
 * SPEC SHAPE (MilestoneSpec):
 *   headline         — Main celebration text
 *   achievement      — The specific achievement { value, suffix, label }
 *   journey_points   — Array of { title, date, description }
 *   thank_you_names  — Array of names/entities to thank
 *   author_name      — Freelancer name
 *   author_title     — Freelancer title
 *   cta_text         — Call to action
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Theme } from "../_shared/themes";
import {
  CountUp,
  GlassCard,
  GradientBadge,
  BackgroundGrid,
} from "../_shared/components";
import {
  springEntrance,
  slideIn,
  fadeIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";

// ── Data Contract ───────────────────────────────────────────────

export interface MilestoneAchievement {
  value: number;
  suffix?: string;
  label: string;
}

export interface JourneyPoint {
  title: string;
  date: string;
  description?: string;
  emoji?: string;
}

export interface MilestoneSpec {
  headline: string;
  subheadline?: string;
  achievement: MilestoneAchievement;
  journey_points?: JourneyPoint[];
  thank_you_names?: string[];
  author_name: string;
  author_title?: string;
  cta_text?: string;
}

export interface MilestoneProps {
  spec: MilestoneSpec;
  theme: Theme;
  layout?: "celebration" | "journey" | "gratitude";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Milestone: React.FC<MilestoneProps> = ({
  spec,
  theme,
  layout = "celebration",
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bg = theme.bg.startsWith("linear") ? theme.bg : undefined;
  const bgColor = theme.bg.startsWith("linear") ? undefined : theme.bg;

  return (
    <AbsoluteFill
      style={{
        background: bg,
        backgroundColor: bgColor,
        fontFamily: theme.fontFamily,
      }}
    >
      {bgPattern !== "none" && <BackgroundGrid opacity={0.04} pattern={bgPattern} />}
      {layout === "celebration" && (
        <CelebrationLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
      {layout === "journey" && (
        <JourneyLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
      {layout === "gratitude" && (
        <GratitudeLayout spec={spec} theme={theme} frame={frame} fps={fps} />
      )}
    </AbsoluteFill>
  );
};

interface LayoutProps {
  spec: MilestoneSpec;
  theme: Theme;
  frame: number;
  fps: number;
}

// ── Decorative Sparkle ──────────────────────────────────────────

const Sparkle: React.FC<{
  x: number; y: number; delay: number; size: number;
  frame: number; fps: number; color: string;
}> = ({ x, y, delay, size, frame, fps, color }) => {
  const s = springEntrance(frame, fps, delay, SPRING.bouncy);
  return (
    <div style={{
      position: "absolute" as const,
      left: `${x}%`,
      top: `${y}%`,
      fontSize: size,
      opacity: interpolate(s, [0, 1], [0, 0.6]),
      transform: `scale(${interpolate(s, [0, 1], [0, 1.2])}) rotate(${interpolate(s, [0, 1], [0, 15])}deg)`,
      color,
      pointerEvents: "none" as const,
    }}>
      ·
    </div>
  );
};

// ── Celebration Layout ──────────────────────────────────────────
// Big number hero with decorative sparkles + journey context.

const CelebrationLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const titleS = springEntrance(frame, fps, 5, SPRING.default);
  const numberS = springEntrance(frame, fps, 25, SPRING.bouncy);
  const ctaOpacity = fadeIn(frame, 300, 20);

  // Sparkle positions (decorative)
  const sparkles = [
    { x: 15, y: 20, delay: 35, size: 18 },
    { x: 78, y: 15, delay: 42, size: 14 },
    { x: 85, y: 55, delay: 50, size: 20 },
    { x: 10, y: 65, delay: 55, size: 12 },
    { x: 60, y: 80, delay: 60, size: 16 },
    { x: 30, y: 85, delay: 65, size: 10 },
  ];

  return (
    <div style={{ position: "relative" as const, height: "100%" }}>
      {/* Sparkles */}
      {sparkles.map((sp, i) => (
        <Sparkle key={i} {...sp} frame={frame} fps={fps} color={theme.accent} />
      ))}

      <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column", position: "relative" as const, zIndex: 1 }}>
        {/* Emoji celebration */}
        <div style={{
          fontSize: 40,
          opacity: fadeIn(frame, 0, 15),
          textAlign: "center" as const,
          marginBottom: 8,
        }}>
          <svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        </div>

        {/* Headline */}
        <div style={{
          textAlign: "center" as const,
          opacity: titleS,
          transform: `translateY(${slideIn(titleS, "up", 20)}px)`,
        }}>
          <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
            {spec.headline}
          </div>
          {spec.subheadline && (
            <div style={{ fontSize: TYPE.subtitle, color: theme.textSecondary, marginTop: 8 }}>
              {spec.subheadline}
            </div>
          )}
        </div>

        {/* Big achievement number */}
        <div style={{
          textAlign: "center" as const,
          marginTop: 32,
          opacity: numberS,
          transform: `scale(${interpolate(numberS, [0, 1], [0.6, 1])})`,
        }}>
          <div style={{
            fontSize: 96,
            fontWeight: 900,
            background: theme.accentGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}>
            <CountUp target={spec.achievement.value} frame={frame} startFrame={35} suffix={spec.achievement.suffix} />
          </div>
          <div style={{ fontSize: TYPE.subtitle, color: theme.textSecondary, marginTop: 8 }}>
            {spec.achievement.label}
          </div>
        </div>

        {/* Journey highlights (compact) */}
        {spec.journey_points && spec.journey_points.length > 0 && (
          <div style={{ display: "flex", gap: 12, marginTop: 32, justifyContent: "center", flexWrap: "wrap" as const }}>
            {spec.journey_points.slice(0, 4).map((jp, i) => {
              const delay = staggerDelay(i, 140, 25);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 20)}px)`,
                  padding: "12px 16px",
                  textAlign: "center" as const,
                  minWidth: 140,
                }}>
                  {jp.emoji && <div style={{ fontSize: 24, marginBottom: 4 }}>{jp.emoji}</div>}
                  <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary }}>{jp.title}</div>
                  <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 2 }}>{jp.date}</div>
                </GlassCard>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ opacity: fadeIn(frame, 260, 20) }}>
            <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.author_name}</div>
            {spec.author_title && (
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{spec.author_title}</div>
            )}
          </div>
          {spec.cta_text && (
            <div style={{ opacity: ctaOpacity }}>
              <GradientBadge text={spec.cta_text} theme={theme} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ── Journey Layout ──────────────────────────────────────────────
// Timeline-focused: past milestones leading to the current achievement.

const JourneyLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const titleS = springEntrance(frame, fps, 5, SPRING.default);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header with achievement */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div style={{
          opacity: titleS,
          transform: `translateY(${slideIn(titleS, "up", 20)}px)`,
          flex: 1,
        }}>
          <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
            {spec.headline}
          </div>
          {spec.subheadline && (
            <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary, marginTop: 6 }}>
              {spec.subheadline}
            </div>
          )}
        </div>

        {/* Achievement badge */}
        <div style={{
          opacity: springEntrance(frame, fps, 20, SPRING.bouncy),
          transform: `scale(${interpolate(springEntrance(frame, fps, 20, SPRING.bouncy), [0, 1], [0.8, 1])})`,
          textAlign: "center" as const,
          marginLeft: 24,
        }}>
          <GlassCard theme={theme} style={{ padding: "16px 24px", borderColor: theme.accent }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: theme.accent, lineHeight: 1 }}>
              <CountUp target={spec.achievement.value} frame={frame} startFrame={30} suffix={spec.achievement.suffix} />
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, marginTop: 4 }}>
              {spec.achievement.label}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Timeline */}
      {spec.journey_points && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
          {spec.journey_points.map((jp, i) => {
            const delay = staggerDelay(i, 60, 30);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const isLast = i === spec.journey_points!.length - 1;

            return (
              <div key={i} style={{
                display: "flex", gap: 16,
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)`,
              }}>
                {/* Timeline track */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                  <div style={{
                    width: isLast ? 16 : 12,
                    height: isLast ? 16 : 12,
                    borderRadius: "50%",
                    background: isLast ? theme.accent : theme.bgGlass,
                    border: `2px solid ${isLast ? theme.accent : theme.cardBorder}`,
                    flexShrink: 0,
                    boxShadow: isLast ? `0 0 12px ${theme.accent}44` : "none",
                  }} />
                  {!isLast && (
                    <div style={{ width: 2, flex: 1, minHeight: 16, background: theme.cardBorder, opacity: 0.4 }} />
                  )}
                </div>

                {/* Content */}
                <GlassCard theme={theme} style={{
                  flex: 1,
                  padding: "12px 16px",
                  marginBottom: isLast ? 0 : 8,
                  borderColor: isLast ? theme.accent : theme.cardBorder,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {jp.emoji && <span style={{ fontSize: 24 }}>{jp.emoji}</span>}
                      <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary }}>
                        {jp.title}
                      </span>
                    </div>
                    <span style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{jp.date}</span>
                  </div>
                  {jp.description && (
                    <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 4 }}>
                      {jp.description}
                    </div>
                  )}
                </GlassCard>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <div style={{ opacity: fadeIn(frame, 280, 20) }}>
          <span style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.author_name}</span>
          {spec.author_title && (
            <span style={{ fontSize: TYPE.caption, color: theme.textMuted, marginLeft: 8 }}>{spec.author_title}</span>
          )}
        </div>
        {spec.cta_text && (
          <div style={{ opacity: fadeIn(frame, 300, 20) }}>
            <GradientBadge text={spec.cta_text} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Gratitude Layout ────────────────────────────────────────────
// Thank-you focused: achievement + names of people/entities who helped.

const GratitudeLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const titleS = springEntrance(frame, fps, 5, SPRING.default);
  const numberS = springEntrance(frame, fps, 25, SPRING.gentle);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        textAlign: "center" as const,
        opacity: titleS,
        transform: `translateY(${slideIn(titleS, "up", 20)}px)`,
      }}>
        <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        <div style={{ fontSize: TYPE.title, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
          {spec.headline}
        </div>
      </div>

      {/* Achievement */}
      <div style={{
        textAlign: "center" as const,
        marginTop: 20,
        opacity: numberS,
        transform: `scale(${interpolate(numberS, [0, 1], [0.8, 1])})`,
      }}>
        <span style={{ fontSize: 64, fontWeight: 900, color: theme.accent }}>
          <CountUp target={spec.achievement.value} frame={frame} startFrame={35} suffix={spec.achievement.suffix} />
        </span>
        <div style={{ fontSize: TYPE.subtitle, color: theme.textSecondary, marginTop: 4 }}>
          {spec.achievement.label}
        </div>
      </div>

      {/* Thank you names */}
      {spec.thank_you_names && spec.thank_you_names.length > 0 && (
        <div style={{ marginTop: 28, flex: 1 }}>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: 700,
            color: theme.textMuted,
            textAlign: "center" as const,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            marginBottom: 16,
            opacity: fadeIn(frame, 80, 15),
          }}>
            Thank you to
          </div>
          <div style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 10,
            justifyContent: "center",
          }}>
            {spec.thank_you_names.map((name, i) => {
              const delay = staggerDelay(i, 100, 8);
              const s = springEntrance(frame, fps, delay, SPRING.snappy);
              return (
                <div key={i} style={{
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
                }}>
                  <GlassCard theme={theme} style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                  }}>
                    <span style={{ fontSize: TYPE.body, fontWeight: 500, color: theme.textPrimary }}>
                      {name}
                    </span>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subheadline */}
      {spec.subheadline && (
        <div style={{
          textAlign: "center" as const,
          marginTop: 20,
          opacity: fadeIn(frame, 240, 20),
          fontSize: TYPE.body,
          color: theme.textSecondary,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.5,
        }}>
          {spec.subheadline}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ opacity: fadeIn(frame, 280, 20) }}>
          <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.author_name}</div>
          {spec.author_title && (
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{spec.author_title}</div>
          )}
        </div>
        {spec.cta_text && (
          <div style={{ opacity: fadeIn(frame, 300, 20) }}>
            <GradientBadge text={spec.cta_text} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
};
