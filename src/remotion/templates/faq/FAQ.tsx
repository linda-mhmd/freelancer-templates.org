/**
 * FAQ Template - Animated Q&A Videos
 *
 * Freelancers get the same questions repeatedly. This template turns
 * FAQ content into shareable animated videos for social media or websites.
 *
 * LAYOUTS:
 *   "accordion"  - Questions reveal answers one at a time (vertical stack)
 *   "cards"      - Q&A pairs as animated card grid
 *   "interview"  - Split layout: question left, answer right
 *
 * USAGE:
 *   <FAQ spec={spec} theme={THEME_DARK} layout="accordion" />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Theme } from "../_shared/themes";
import {
  SPRING, springEntrance, fadeIn, slideIn, staggerDelay,
  GradientBadge, GlassCard, BackgroundGrid,
  PADDING, TOP_SAFE, TYPE,
} from "../_shared";

// ── Types ───────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

export interface FAQSpec {
  headline: string;
  subheadline?: string;
  items: FAQItem[];
  ctaText?: string;
  freelancerName?: string;
}

export interface FAQProps {
  spec: FAQSpec;
  theme: Theme;
  layout?: "accordion" | "cards" | "interview";
}

// ── Main Component ──────────────────────────────────────────────

export const FAQ: React.FC<FAQProps> = ({
  spec, theme, layout = "accordion",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bg = theme.bg.includes("gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  return (
    <AbsoluteFill style={{ ...bg, fontFamily: theme.fontFamily }}>
      <BackgroundGrid opacity={0.03} pattern="dots" />
      {layout === "accordion" && <AccordionLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "cards" && <CardsLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "interview" && <InterviewLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

interface LayoutProps {
  spec: FAQSpec;
  theme: Theme;
  frame: number;
  fps: number;
}

// ── Accordion Layout ────────────────────────────────────────────
// Questions stack vertically, each revealing its answer in sequence.
// Best for: comprehensive FAQ videos, educational content

const AccordionLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const ctaOpacity = fadeIn(frame, 200, 25);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 28 }}>
        <GradientBadge text="FAQ" theme={theme} fontSize={10} style={{ marginBottom: 12 }} />
        <div style={{ fontSize: TYPE.hero - 8, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary, marginTop: 6 }}>{spec.subheadline}</div>
        )}
      </div>

      {/* FAQ items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {spec.items.slice(0, 4).map((item, i) => {
          const qDelay = staggerDelay(i, 35, 40);
          const aDelay = qDelay + 20;
          const qS = springEntrance(frame, fps, qDelay, SPRING.default);
          const aOpacity = fadeIn(frame, aDelay, 20);

          return (
            <div key={i} style={{
              background: theme.bgSecondary,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 12,
              padding: "14px 20px",
              opacity: qS,
              transform: `translateX(${slideIn(qS, "left", 25)}px)`,
            }}>
              {/* Question */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontSize: 24, fontWeight: theme.headingWeight,
                  color: theme.accent, flexShrink: 0,
                }}>
                  {item.icon || "Q"}
                </span>
                <span style={{ fontSize: TYPE.cardTitle + 1, fontWeight: 600, color: theme.textPrimary }}>
                  {item.question}
                </span>
              </div>
              {/* Answer */}
              <div style={{
                fontSize: TYPE.body, color: theme.textSecondary, lineHeight: 1.5,
                paddingLeft: 28, opacity: aOpacity,
              }}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {spec.ctaText && (
        <div style={{ textAlign: "center", marginTop: 16, opacity: ctaOpacity }}>
          <GradientBadge text={spec.ctaText} theme={theme} fontSize={12} />
        </div>
      )}
    </div>
  );
};


// ── Cards Layout ────────────────────────────────────────────────
// Q&A pairs as a 2×2 card grid. Compact, visual.
// Best for: social media, quick reference

const CardsLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const ctaOpacity = fadeIn(frame, 180, 25);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ textAlign: "center", opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 28 }}>
        <div style={{ fontSize: TYPE.hero - 10, fontWeight: theme.headingWeight, color: theme.textPrimary, marginBottom: 6 }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary }}>{spec.subheadline}</div>
        )}
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1 }}>
        {spec.items.slice(0, 4).map((item, i) => {
          const delay = staggerDelay(i, 30, 25);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          return (
            <GlassCard key={i} theme={theme} style={{
              padding: "18px 20px",
              opacity: s,
              transform: `translateY(${slideIn(s, "up", 20)}px) scale(${interpolate(s, [0, 1], [0.95, 1])})`,
            }}>
              {/* Icon + Question */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon || "?"}</span>
                <span style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.3 }}>
                  {item.question}
                </span>
              </div>
              {/* Answer */}
              <div style={{
                fontSize: TYPE.body - 1, color: theme.textSecondary, lineHeight: 1.5,
                opacity: fadeIn(frame, delay + 15, 18),
              }}>
                {item.answer}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {spec.ctaText && (
        <div style={{ textAlign: "center", marginTop: 16, opacity: ctaOpacity }}>
          <GradientBadge text={spec.ctaText} theme={theme} fontSize={12} />
        </div>
      )}
    </div>
  );
};


// ── Interview Layout ────────────────────────────────────────────
// Split layout: question on the left, answer on the right.
// Best for: conversational feel, longer answers, video-style Q&A

const InterviewLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const ctaOpacity = fadeIn(frame, 220, 25);

  // Show items sequentially - each gets ~55 frames of screen time
  const ITEM_DURATION = 55;

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 24 }}>
        <div style={{ fontSize: TYPE.hero - 10, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
          {spec.headline}
        </div>
        {spec.subheadline && (
          <div style={{ fontSize: TYPE.subtitle - 2, color: theme.textSecondary, marginTop: 6 }}>{spec.subheadline}</div>
        )}
      </div>

      {/* Q&A items - split layout */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {spec.items.slice(0, 4).map((item, i) => {
          const baseDelay = staggerDelay(i, 30, ITEM_DURATION);
          const qS = springEntrance(frame, fps, baseDelay, SPRING.default);
          const aS = springEntrance(frame, fps, baseDelay + 15, SPRING.default);

          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16,
              opacity: qS,
            }}>
              {/* Question side */}
              <div style={{
                background: theme.accentGradient,
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 10,
                transform: `translateX(${slideIn(qS, "left", 30)}px)`,
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon || "?"}</span>
                <span style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                  {item.question}
                </span>
              </div>

              {/* Answer side */}
              <GlassCard theme={theme} style={{
                padding: "16px 20px",
                opacity: aS,
                transform: `translateX(${slideIn(aS, "right", 30)}px)`,
              }}>
                <div style={{ fontSize: TYPE.body, color: theme.textSecondary, lineHeight: 1.5 }}>
                  {item.answer}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* CTA + freelancer name */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, opacity: ctaOpacity }}>
        {spec.freelancerName && (
          <div style={{ fontSize: TYPE.body, color: theme.textMuted }}>{spec.freelancerName}</div>
        )}
        {spec.ctaText && <GradientBadge text={spec.ctaText} theme={theme} fontSize={12} />}
      </div>
    </div>
  );
};
