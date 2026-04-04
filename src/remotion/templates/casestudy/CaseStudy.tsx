/**
 * Case Study Template - Before/After Project Deep Dives
 *
 * Different from Portfolio: this focuses on a SINGLE project with
 * problem → solution → results narrative. Deeper storytelling.
 *
 * LAYOUTS:
 *   "narrative"   - Linear story: problem → approach → results
 *   "comparison"  - Side-by-side before/after with metrics
 *   "spotlight"   - Hero result stat with supporting story cards
 *
 * USAGE:
 *   <CaseStudy spec={spec} theme={THEME_DARK} layout="narrative" />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Theme } from "../_shared/themes";
import {
  SPRING, springEntrance, fadeIn, slideIn, staggerDelay,
  CountUp, GradientBadge, GlassCard, BackgroundGrid, ProgressBar,
  PADDING, TOP_SAFE, TYPE,
} from "../_shared";

// ── Types ───────────────────────────────────────────────────────

export interface CaseStudyResult {
  label: string;
  before: number;
  after: number;
  suffix?: string;
  improvement?: string; // e.g. "+340%"
}

export interface CaseStudySpec {
  clientName: string;
  projectTitle: string;
  industry?: string;
  duration?: string;
  problem: string;
  approach: string[];
  results: CaseStudyResult[];
  testimonialQuote?: string;
  heroStat?: { label: string; value: number; suffix?: string };
}

export interface CaseStudyProps {
  spec: CaseStudySpec;
  theme: Theme;
  layout?: "narrative" | "comparison" | "spotlight";
}

// ── Main Component ──────────────────────────────────────────────

export const CaseStudy: React.FC<CaseStudyProps> = ({
  spec, theme, layout = "narrative",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bg = theme.bg.includes("gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  return (
    <AbsoluteFill style={{ ...bg, fontFamily: theme.fontFamily }}>
      <BackgroundGrid opacity={0.03} />
      {layout === "narrative" && <NarrativeLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "comparison" && <ComparisonLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
      {layout === "spotlight" && <SpotlightLayout spec={spec} theme={theme} frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};

interface LayoutProps {
  spec: CaseStudySpec;
  theme: Theme;
  frame: number;
  fps: number;
}

// ── Narrative Layout ────────────────────────────────────────────
// Linear story flow: header → problem → approach steps → results
// Best for: detailed project walkthroughs, client presentations

const NarrativeLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const problemS = springEntrance(frame, fps, 40, SPRING.default);
  const approachOpacity = fadeIn(frame, 90, 25);
  const resultsS = springEntrance(frame, fps, 180, SPRING.default);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header: client + project */}
      <div style={{ opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <GradientBadge text="CASE STUDY" theme={theme} fontSize={10} />
          {spec.industry && (
            <span style={{ fontSize: TYPE.caption, color: theme.textMuted }}>{spec.industry}</span>
          )}
          {spec.duration && (
            <span style={{ fontSize: TYPE.caption, color: theme.textMuted }}>• {spec.duration}</span>
          )}
        </div>
        <div style={{ fontSize: TYPE.hero - 8, fontWeight: theme.headingWeight, color: theme.textPrimary, marginBottom: 4 }}>
          {spec.projectTitle}
        </div>
        <div style={{ fontSize: TYPE.subtitle - 4, color: theme.textSecondary }}>
          Client: {spec.clientName}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: theme.cardBorder, margin: "16px 0", opacity: problemS }} />

      {/* Problem */}
      <div style={{ opacity: problemS, transform: `translateX(${slideIn(problemS, "left", 25)}px)`, marginBottom: 20 }}>
        <div style={{ fontSize: TYPE.label, color: theme.accent, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
          The Challenge
        </div>
        <div style={{ fontSize: TYPE.body + 1, color: theme.textSecondary, lineHeight: 1.5, maxWidth: 800 }}>
          {spec.problem}
        </div>
      </div>

      {/* Approach steps */}
      <div style={{ opacity: approachOpacity, marginBottom: 20 }}>
        <div style={{ fontSize: TYPE.label, color: theme.accent, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
          Our Approach
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {spec.approach.map((step, i) => {
            const delay = staggerDelay(i, 100, 25);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                flex: 1, padding: "14px 16px",
                opacity: s, transform: `translateY(${slideIn(s, "up", 15)}px)`,
              }}>
                <div style={{ fontSize: 20, fontWeight: theme.headingWeight, color: theme.accent, marginBottom: 6 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: TYPE.body - 1, color: theme.textSecondary, lineHeight: 1.4 }}>{step}</div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: TYPE.label, color: theme.accent, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, opacity: resultsS }}>
          Results
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {spec.results.map((r, i) => {
            const delay = staggerDelay(i, 190, 20);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            return (
              <GlassCard key={i} theme={theme} style={{
                flex: 1, padding: "14px 16px", textAlign: "center",
                opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
              }}>
                <div style={{ fontSize: TYPE.stat - 4, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                  <CountUp target={r.after} frame={frame} startFrame={delay} suffix={r.suffix || ""} />
                </div>
                <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 2 }}>{r.label}</div>
                {r.improvement && (
                  <div style={{ fontSize: TYPE.caption, color: "#22c55e", fontWeight: 600, marginTop: 4 }}>{r.improvement}</div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// ── Comparison Layout ───────────────────────────────────────────
// Side-by-side before/after with animated progress bars.
// Best for: measurable improvements, A/B results, performance gains

const ComparisonLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const headerS = springEntrance(frame, fps, 5, SPRING.default);
  const beforeS = springEntrance(frame, fps, 40, SPRING.default);
  const afterS = springEntrance(frame, fps, 80, SPRING.default);
  const quoteOpacity = fadeIn(frame, 180, 25);

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ opacity: headerS, transform: `translateY(${slideIn(headerS, "up", 20)}px)`, marginBottom: 24 }}>
        <GradientBadge text="CASE STUDY" theme={theme} fontSize={10} style={{ marginBottom: 12 }} />
        <div style={{ fontSize: TYPE.hero - 10, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
          {spec.projectTitle}
        </div>
        <div style={{ fontSize: TYPE.body, color: theme.textSecondary, marginTop: 4 }}>
          {spec.clientName} {spec.industry ? `• ${spec.industry}` : ""}
        </div>
      </div>

      {/* Before / After comparison grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flex: 1 }}>
        {/* Before column */}
        <GlassCard theme={theme} style={{
          opacity: beforeS, transform: `translateX(${slideIn(beforeS, "left", 30)}px)`,
          padding: "20px 24px",
        }}>
          <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.textMuted, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            Before
          </div>
          {spec.results.map((r, i) => {
            const delay = staggerDelay(i, 50, 20);
            return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: TYPE.body, color: theme.textSecondary }}>{r.label}</span>
                  <span style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textMuted }}>
                    <CountUp target={r.before} frame={frame} startFrame={delay} suffix={r.suffix || ""} />
                  </span>
                </div>
                <ProgressBar progress={Math.min(100, (r.before / Math.max(r.before, r.after)) * 100)} frame={frame} startFrame={delay} theme={theme} height={6} showPercent={false} />
              </div>
            );
          })}
        </GlassCard>

        {/* After column */}
        <GlassCard theme={theme} style={{
          opacity: afterS, transform: `translateX(${slideIn(afterS, "right", 30)}px)`,
          padding: "20px 24px", border: `1px solid ${theme.accent}40`,
        }}>
          <div style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
            After
          </div>
          {spec.results.map((r, i) => {
            const delay = staggerDelay(i, 90, 20);
            return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: TYPE.body, color: theme.textSecondary }}>{r.label}</span>
                  <span style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>
                    <CountUp target={r.after} frame={frame} startFrame={delay} suffix={r.suffix || ""} />
                  </span>
                </div>
                <ProgressBar progress={Math.min(100, (r.after / Math.max(r.before, r.after)) * 100)} frame={frame} startFrame={delay} theme={theme} height={6} showPercent={false} />
                {r.improvement && (
                  <div style={{ fontSize: TYPE.caption, color: "#22c55e", fontWeight: 600, marginTop: 4, textAlign: "right" }}>
                    {r.improvement}
                  </div>
                )}
              </div>
            );
          })}
        </GlassCard>
      </div>

      {/* Testimonial quote */}
      {spec.testimonialQuote && (
        <div style={{ marginTop: 20, opacity: quoteOpacity, fontStyle: "italic", fontSize: TYPE.body, color: theme.textSecondary, textAlign: "center" }}>
          "{spec.testimonialQuote}"
        </div>
      )}
    </div>
  );
};


// ── Spotlight Layout ────────────────────────────────────────────
// Hero result stat dominates, with supporting story cards below.
// Best for: impressive single-metric results, social sharing

const SpotlightLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  const badgeS = springEntrance(frame, fps, 5, SPRING.snappy);
  const heroS = springEntrance(frame, fps, 20, SPRING.gentle);
  const cardsS = springEntrance(frame, fps, 90, SPRING.default);
  const quoteOpacity = fadeIn(frame, 170, 25);

  const hero = spec.heroStat || spec.results[0]
    ? { label: spec.results[0].label, value: spec.results[0].after, suffix: spec.results[0].suffix }
    : { label: "Impact", value: 100, suffix: "%" };

  return (
    <div style={{ padding: PADDING, paddingTop: TOP_SAFE, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Badge */}
      <div style={{ opacity: badgeS, transform: `scale(${interpolate(badgeS, [0, 1], [0.5, 1])})`, marginBottom: 20 }}>
        <GradientBadge text={spec.clientName} theme={theme} fontSize={11} />
      </div>

      {/* Project title */}
      <div style={{
        fontSize: TYPE.subtitle, color: theme.textSecondary, textAlign: "center",
        opacity: heroS, marginBottom: 12,
      }}>
        {spec.projectTitle}
      </div>

      {/* Hero stat */}
      <div style={{
        fontSize: 88, fontWeight: theme.headingWeight, color: theme.textPrimary,
        opacity: heroS, transform: `scale(${interpolate(heroS, [0, 1], [0.5, 1])})`,
        textAlign: "center", lineHeight: 1, marginBottom: 8,
      }}>
        <CountUp target={hero.value} frame={frame} startFrame={20} duration={80} suffix={hero.suffix || ""} />
      </div>
      <div style={{
        fontSize: TYPE.title - 4, color: theme.accent, fontWeight: 600,
        opacity: heroS, textAlign: "center", marginBottom: 36,
      }}>
        {hero.label}
      </div>

      {/* Supporting result cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {spec.results.slice(0, 4).map((r, i) => {
          const delay = staggerDelay(i, 90, 20);
          const s = springEntrance(frame, fps, delay, SPRING.snappy);
          return (
            <GlassCard key={i} theme={theme} style={{
              textAlign: "center", padding: "12px 20px", minWidth: 120,
              opacity: s, transform: `translateY(${slideIn(s, "up", 15)}px)`,
            }}>
              <div style={{ fontSize: TYPE.stat - 10, fontWeight: theme.headingWeight, color: theme.textPrimary }}>
                <CountUp target={r.after} frame={frame} startFrame={delay} suffix={r.suffix || ""} />
              </div>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginTop: 2 }}>{r.label}</div>
              {r.improvement && (
                <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, marginTop: 2 }}>{r.improvement}</div>
              )}
            </GlassCard>
          );
        })}
      </div>

      {/* Quote */}
      {spec.testimonialQuote && (
        <div style={{
          opacity: quoteOpacity, fontStyle: "italic",
          fontSize: TYPE.body, color: theme.textSecondary,
          textAlign: "center", maxWidth: 600,
        }}>
          "{spec.testimonialQuote}"
        </div>
      )}
    </div>
  );
};
