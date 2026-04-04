/**
 * Social Proof Template — Shareable Milestone & Achievement Videos
 *
 * Different from Testimonial: this is for the freelancer's OWN achievements,
 * milestones, and social media announcements. Think "I just hit 100 clients!"
 * or "Project milestone: 50k users reached."
 *
 * LAYOUTS:
 *   "milestone"  — Big number hero + supporting context cards
 *   "achievement" — Badge/trophy centered with radiating stats
 *   "announcement" — News-style with headline + detail cards
 *
 * USAGE:
 *   <SocialProof spec={spec} theme={THEME_DARK} layout="milestone" />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import type { Theme } from "../_shared/themes";
import {
  SPRING, springEntrance, fadeIn, slideIn, staggerDelay,
  CountUp, GradientBadge, GlassCard, BackgroundGrid,
  PADDING, TOP_SAFE, TYPE,
} from "../_shared";

// ── Types ───────────────────────────────────────────────────────

export interface SocialProofStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface SocialProofSpec {
  headline: string;
  subheadline?: string;
  mainStat: SocialProofStat;
  supportingStats?: SocialProofStat[];
  context?: string;
  hashtags?: string[];
  freelancerName?: string;
  freelancerTitle?: string;
}

export interface SocialProofProps {
  spec: SocialProofSpec;
  theme: Theme;
  layout?: "milestone" | "achievement" | "announcement";
}

// ── Main Component ──────────────────────────────────────────────

export const SocialProof: React.FC<SocialProofProps> = ({
  spec, theme, layout = "milestone",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bg = theme.bg.includes("gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  return (
    <AbsoluteFill style={{ ...bg, fontFamily: theme.fontFamily }}>
      <BackgroundGrid opacity={0.03} pattern="dots" />
      {layout === "milestone" && <MilestoneLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "achievement" && <AchievementLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "announcement" && <AnnouncementLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

// ── Layout Props ────────────────────────────────────────────────

interface LayoutProps {
  spec: SocialProofSpec;
  theme: Theme;
  frame: number;
  fps: number;
}

// ── Milestone Layout ────────────────────────────────────────────
// Big hero number center-stage with supporting stats below.
// Best for: "100 clients!", "50k revenue", "1 year anniversary"

const MilestoneLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const titleS = springEntrance(frame, fps, 5, SPRING.default);
  const statS = springEntrance(frame, fps, 30, SPRING.gentle);
  const supportS = springEntrance(frame, fps, 70, SPRING.default);
  const contextOpacity = fadeIn(frame, 120, 25);
  const hashtagOpacity = fadeIn(frame, 160, 20);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Headline */}
      <div style={{
        fontSize: TYPE.subtitle,
        color: theme.textSecondary,
        fontWeight: theme.bodyWeight,
        opacity: titleS,
        transform: `translateY(${slideIn(titleS, "up", 20)}px)`,
        textAlign: "center",
        marginBottom: 16,
        letterSpacing: 2,
        textTransform: "uppercase",
      }}>
        {spec.headline}
      </div>

      {/* Main stat — big hero number */}
      <div style={{
        fontSize: 96,
        fontWeight: theme.headingWeight,
        color: theme.textPrimary,
        opacity: statS,
        transform: `scale(${interpolate(statS, [0, 1], [0.6, 1])})`,
        textAlign: "center",
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {spec.mainStat.prefix || ""}
        <CountUp target={spec.mainStat.value} frame={frame} startFrame={30} duration={80} suffix={spec.mainStat.suffix || ""} />
      </div>

      {/* Main stat label */}
      <div style={{
        fontSize: TYPE.title,
        color: theme.accent,
        fontWeight: 600,
        opacity: statS,
        textAlign: "center",
        marginBottom: 40,
      }}>
        {spec.mainStat.label}
      </div>

      {/* Supporting stats row */}
      {spec.supportingStats && spec.supportingStats.length > 0 && (
        <div style={{
          display: "flex", gap: 48, justifyContent: "center",
          opacity: supportS,
          transform: `translateY(${slideIn(supportS, "up", 30)}px)`,
          marginBottom: 32,
        }}>
          {spec.supportingStats.map((stat, i) => {
            const delay = staggerDelay(i, 70, 20);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            return (
              <div key={i} style={{ textAlign: "center", opacity: s }}>
                <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                  {stat.prefix || ""}
                  <CountUp target={stat.value} frame={frame} startFrame={delay} suffix={stat.suffix || ""} />
                </div>
                <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Context line */}
      {spec.context && (
        <div style={{
          fontSize: TYPE.body, color: theme.textSecondary, textAlign: "center",
          maxWidth: 600, opacity: contextOpacity, marginBottom: 20,
        }}>
          {spec.context}
        </div>
      )}

      {/* Hashtags */}
      {spec.hashtags && spec.hashtags.length > 0 && (
        <div style={{ display: "flex", gap: 12, opacity: hashtagOpacity }}>
          {spec.hashtags.map((tag, i) => (
            <span key={i} style={{
              fontSize: TYPE.label, color: theme.accent,
              background: theme.bgSecondary, borderRadius: 999,
              padding: "4px 14px", fontWeight: 500,
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};


// ── Achievement Layout ──────────────────────────────────────────
// Badge/trophy centered with radiating stat cards around it.
// Best for: certifications, awards, completed milestones

const AchievementLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const badgeS = springEntrance(frame, fps, 10, SPRING.bouncy);
  const headlineS = springEntrance(frame, fps, 40, SPRING.default);
  const cardsS = springEntrance(frame, fps, 80, SPRING.default);
  const footerOpacity = fadeIn(frame, 150, 25);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Achievement badge */}
      <div style={{
        width: 120, height: 120, borderRadius: "50%",
        background: theme.accentGradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: badgeS,
        transform: `scale(${interpolate(badgeS, [0, 1], [0.3, 1])})`,
        boxShadow: `0 0 40px ${theme.accent}40`,
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 48 }}><svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg></div>
      </div>

      {/* Headline */}
      <div style={{
        fontSize: TYPE.hero, fontWeight: theme.headingWeight,
        color: theme.textPrimary, textAlign: "center",
        opacity: headlineS,
        transform: `translateY(${slideIn(headlineS, "up", 20)}px)`,
        marginBottom: 8,
      }}>
        {spec.headline}
      </div>

      {spec.subheadline && (
        <div style={{
          fontSize: TYPE.subtitle, color: theme.textSecondary,
          textAlign: "center", opacity: headlineS, marginBottom: 32,
        }}>
          {spec.subheadline}
        </div>
      )}

      {/* Main stat */}
      <GlassCard theme={theme} style={{
        textAlign: "center", padding: "16px 48px", marginBottom: 24,
        opacity: cardsS, transform: `translateY(${slideIn(cardsS, "up", 20)}px)`,
      }}>
        <div style={{ fontSize: 56, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
          {spec.mainStat.prefix || ""}
          <CountUp target={spec.mainStat.value} frame={frame} startFrame={80} duration={70} suffix={spec.mainStat.suffix || ""} />
        </div>
        <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 4 }}>{spec.mainStat.label}</div>
      </GlassCard>

      {/* Supporting stats in a row of glass cards */}
      {spec.supportingStats && spec.supportingStats.length > 0 && (
        <div style={{ display: "flex", gap: 16 }}>
          {spec.supportingStats.map((stat, i) => {
            const delay = staggerDelay(i, 110, 20);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            return (
              <GlassCard key={i} theme={theme} style={{
                textAlign: "center", padding: "12px 24px", opacity: s,
                transform: `translateY(${slideIn(s, "up", 15)}px)`,
              }}>
                <div style={{ fontSize: TYPE.stat - 8, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                  {stat.prefix || ""}
                  <CountUp target={stat.value} frame={frame} startFrame={delay} suffix={stat.suffix || ""} />
                </div>
                <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 2 }}>{stat.label}</div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Footer context */}
      {spec.freelancerName && (
        <div style={{ marginTop: 32, opacity: footerOpacity, textAlign: "center" }}>
          <div style={{ fontSize: TYPE.body, color: theme.textSecondary }}>{spec.freelancerName}</div>
          {spec.freelancerTitle && (
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{spec.freelancerTitle}</div>
          )}
        </div>
      )}
    </div>
  );
};


// ── Announcement Layout ─────────────────────────────────────────
// News-style with bold headline + detail cards below.
// Best for: launches, new services, partnerships, big news

const AnnouncementLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const labelS = springEntrance(frame, fps, 5, SPRING.snappy);
  const headlineS = springEntrance(frame, fps, 20, SPRING.default);
  const subS = springEntrance(frame, fps, 45, SPRING.default);
  const statS = springEntrance(frame, fps, 75, SPRING.default);
  const footerOpacity = fadeIn(frame, 140, 25);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE + 20, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* "NEW" label badge */}
      <div style={{ opacity: labelS, transform: `scale(${interpolate(labelS, [0, 1], [0.5, 1])})`, marginBottom: 20 }}>
        <GradientBadge text="ANNOUNCEMENT" theme={theme} fontSize={11} />
      </div>

      {/* Headline */}
      <div style={{
        fontSize: TYPE.hero + 4, fontWeight: theme.headingWeight,
        color: theme.textPrimary, lineHeight: 1.15,
        opacity: headlineS,
        transform: `translateX(${slideIn(headlineS, "left", 30)}px)`,
        marginBottom: 12, maxWidth: 900,
      }}>
        {spec.headline}
      </div>

      {/* Subheadline */}
      {spec.subheadline && (
        <div style={{
          fontSize: TYPE.subtitle, color: theme.textSecondary,
          opacity: subS, transform: `translateX(${slideIn(subS, "left", 20)}px)`,
          marginBottom: 36, maxWidth: 700,
        }}>
          {spec.subheadline}
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const, marginBottom: 24 }}>
        {/* Main stat card */}
        <GlassCard theme={theme} style={{
          flex: "0 0 auto", padding: "20px 32px",
          opacity: statS, transform: `translateY(${slideIn(statS, "up", 20)}px)`,
        }}>
          <div style={{ fontSize: 48, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
            {spec.mainStat.prefix || ""}
            <CountUp target={spec.mainStat.value} frame={frame} startFrame={75} duration={70} suffix={spec.mainStat.suffix || ""} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>{spec.mainStat.label}</div>
        </GlassCard>

        {/* Supporting stats */}
        {spec.supportingStats?.map((stat, i) => {
          const delay = staggerDelay(i, 100, 20);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          return (
            <GlassCard key={i} theme={theme} style={{
              flex: "0 0 auto", padding: "20px 28px",
              opacity: s, transform: `translateY(${slideIn(s, "up", 20)}px)`,
            }}>
              <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                {stat.prefix || ""}
                <CountUp target={stat.value} frame={frame} startFrame={delay} suffix={stat.suffix || ""} />
              </div>
              <div style={{ fontSize: TYPE.label, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
            </GlassCard>
          );
        })}
      </div>

      {/* Context + hashtags footer */}
      <div style={{ marginTop: "auto", opacity: footerOpacity }}>
        {spec.context && (
          <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginBottom: 12 }}>{spec.context}</div>
        )}
        {spec.hashtags && spec.hashtags.length > 0 && (
          <div style={{ display: "flex", gap: 10 }}>
            {spec.hashtags.map((tag, i) => (
              <span key={i} style={{
                fontSize: TYPE.caption, color: theme.accent,
                fontWeight: 500,
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
