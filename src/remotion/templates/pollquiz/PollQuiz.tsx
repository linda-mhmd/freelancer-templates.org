/**
 * Poll/Quiz Template — Creator Economy Templates (V5)
 *
 * A reusable, theme-aware poll/quiz video template.
 * Renders interactive-style question cards, answer reveals, and results displays.
 *
 * LAYOUT VARIANTS (via `layout` prop):
 *   "question-card" — Centered question with staggered answer option cards (default)
 *   "results-bar"   — Horizontal bar chart showing vote percentages with CountUp
 *   "reveal"        — Question followed by dramatic correct answer highlight
 *
 * DATA CONTRACT (PollQuizSpec):
 *   {
 *     question: "What is the most popular programming language?",
 *     options: [
 *       { text: "JavaScript", percentage: 42, isCorrect: true },
 *       { text: "Python", percentage: 35 },
 *       { text: "TypeScript", percentage: 15 },
 *       { text: "Rust", percentage: 8 }
 *     ],
 *     theme: "dark",
 *     layout: "question-card"
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
  CountUp,
  CaptionItem,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface PollQuizSpec {
  question: string;
  options: Array<{ text: string; percentage?: number; isCorrect?: boolean }>;
  theme?: string;
  brandKit?: BrandKit;
  layout?: "question-card" | "results-bar" | "reveal";
  format?: VideoFormat;
  captions?: CaptionItem[];
  captionLanguage?: string;
  platformHints?: PlatformHints;
  metadata?: CollabMetadata;
}

export interface PollQuizProps {
  spec: PollQuizSpec;
  theme?: Theme;
  layout?: "question-card" | "results-bar" | "reveal";
}

// ── Scene Timing ────────────────────────────────────────────────
const TIMING = {
  bgStart: 0,
  questionStart: 5,
  optionsStart: 40,
  resultsStart: 50,
  revealStart: 120,
  correctHighlight: 150,
};


// ── QuickStart Defaults ─────────────────────────────────────────
/** Sensible defaults for QuickStart specs (title + theme only). */
const QUICKSTART_DEFAULTS: Omit<PollQuizSpec, "question" | "theme" | "brandKit" | "layout"> = {
  options: [
    { text: "Option A", percentage: 42, isCorrect: true },
    { text: "Option B", percentage: 31 },
    { text: "Option C", percentage: 18 },
    { text: "Option D", percentage: 9 },
  ],
};

// ── Main Component ──────────────────────────────────────────────
export const PollQuiz: React.FC<PollQuizProps> = ({
  spec: rawSpec,
  theme,
  layout,
}) => {
  const spec = { ...QUICKSTART_DEFAULTS, ...rawSpec };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTheme = applyBrandKit(theme ?? THEMES[spec.theme ?? "dark"] ?? THEME_DARK, spec.brandKit);
  const resolvedLayout = layout ?? spec.layout ?? "question-card";

  const bgStyle = resolvedTheme.bg.startsWith("linear-gradient")
    ? { background: resolvedTheme.bg }
    : { backgroundColor: resolvedTheme.bg };

  if (resolvedLayout === "results-bar") {
    return <ResultsBarLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  if (resolvedLayout === "reveal") {
    return <RevealLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
  }
  return <QuestionCardLayout spec={spec} theme={resolvedTheme} frame={frame} fps={fps} bgStyle={bgStyle} />;
};


// ── Layout: Question Card ───────────────────────────────────────
// Centered question with staggered answer option cards.
const QuestionCardLayout: React.FC<{
  spec: PollQuizSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const questionSpring = springEntrance(frame, fps, TIMING.questionStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="grid" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        alignItems: "center",
      }}>
        {/* Question */}
        <div style={{
          textAlign: "center",
          marginBottom: 32,
          marginTop: 24,
          opacity: questionSpring,
          transform: `translateY(${slideIn(questionSpring, "up", 20)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            maxWidth: 800,
            lineHeight: 1.3,
          }}>
            {spec.question}
          </div>
        </div>

        {/* Answer Options */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 14,
          maxWidth: 700, width: "100%",
        }}>
          {spec.options.slice(0, 6).map((option, i) => {
            const delay = staggerDelay(i, TIMING.optionsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const letter = String.fromCharCode(65 + i); // A, B, C, D...
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)`,
                padding: "16px 24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: theme.accentGradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: TYPE.cardTitle, fontWeight: 700,
                    color: "#ffffff",
                    flexShrink: 0,
                  }}>
                    {letter}
                  </div>
                  <span style={{ fontSize: TYPE.subtitle, fontWeight: 500 }}>
                    {option.text}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Results Bar ─────────────────────────────────────────
// Horizontal bar chart showing vote percentages with CountUp.
const ResultsBarLayout: React.FC<{
  spec: PollQuizSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const questionSpring = springEntrance(frame, fps, TIMING.questionStart, SPRING.default);

  // Find max percentage for bar scaling
  const maxPct = Math.max(...spec.options.map((o) => o.percentage ?? 0), 1);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="dots" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
      }}>
        {/* Question Header */}
        <div style={{
          textAlign: "center",
          marginBottom: 28,
          opacity: questionSpring,
          transform: `translateY(${slideIn(questionSpring, "up", 20)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.3,
          }}>
            {spec.question}
          </div>
        </div>

        {/* Results Bars */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          maxWidth: 900, margin: "0 auto", width: "100%",
        }}>
          {spec.options.slice(0, 6).map((option, i) => {
            const delay = staggerDelay(i, TIMING.resultsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const pct = option.percentage ?? 0;
            const barWidth = (pct / maxPct) * 100;

            return (
              <div key={i} style={{ opacity: s, transform: `translateX(${slideIn(s, "left", 20)}px)` }}>
                {/* Label row */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: TYPE.body, fontWeight: 600 }}>
                    {option.text}
                  </span>
                  <span style={{ fontSize: TYPE.body, fontWeight: 700, color: theme.accent }}>
                    <CountUp target={pct} frame={frame} startFrame={delay + 10} suffix="%" />
                  </span>
                </div>
                {/* Bar */}
                <div style={{
                  height: 28,
                  borderRadius: 8,
                  background: theme.bgSecondary,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${barWidth * s}%`,
                    background: theme.accentGradient,
                    borderRadius: 8,
                    transition: "width 0.1s",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Reveal ──────────────────────────────────────────────
// Question followed by dramatic correct answer highlight (spring entrance, 30-frame delay).
const RevealLayout: React.FC<{
  spec: PollQuizSpec;
  theme: Theme;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}> = ({ spec, theme, frame, fps, bgStyle }) => {
  const questionSpring = springEntrance(frame, fps, TIMING.questionStart, SPRING.default);
  const correctOption = spec.options.find((o) => o.isCorrect);
  const correctIndex = spec.options.findIndex((o) => o.isCorrect);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      <BackgroundGrid pattern="hex" />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        padding: `${TOP_SAFE}px ${PADDING}px`,
        alignItems: "center",
      }}>
        {/* Question */}
        <div style={{
          textAlign: "center",
          marginBottom: 28,
          marginTop: 16,
          opacity: questionSpring,
          transform: `translateY(${slideIn(questionSpring, "up", 20)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.title,
            fontWeight: theme.headingWeight,
            maxWidth: 800,
            lineHeight: 1.3,
          }}>
            {spec.question}
          </div>
        </div>

        {/* Options with reveal */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 12,
          maxWidth: 700, width: "100%",
        }}>
          {spec.options.slice(0, 6).map((option, i) => {
            const delay = staggerDelay(i, TIMING.optionsStart, 20);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const isCorrect = option.isCorrect === true;

            // Correct answer highlight: spring entrance 30 frames after last option appears
            const lastOptionDelay = staggerDelay(
              Math.min(spec.options.length - 1, 5),
              TIMING.optionsStart,
              20,
            );
            const highlightDelay = lastOptionDelay + 30;
            const highlightSpring = springEntrance(frame, fps, highlightDelay, SPRING.bouncy);
            const showHighlight = frame >= highlightDelay;

            const letter = String.fromCharCode(65 + i);

            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateX(${slideIn(s, "left", 30)}px)${
                  isCorrect && showHighlight
                    ? ` scale(${1 + highlightSpring * 0.05})`
                    : ""
                }`,
                padding: "16px 24px",
                border: isCorrect && showHighlight
                  ? `2px solid ${theme.accent}`
                  : `1px solid ${theme.cardBorder}`,
                boxShadow: isCorrect && showHighlight
                  ? `0 0 24px ${theme.accent}40`
                  : theme.cardShadow,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: isCorrect && showHighlight
                      ? theme.accentGradient
                      : theme.bgSecondary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: TYPE.cardTitle, fontWeight: 700,
                    color: isCorrect && showHighlight ? "#ffffff" : theme.textSecondary,
                    flexShrink: 0,
                  }}>
                    {isCorrect && showHighlight ? "+" : letter}
                  </div>
                  <span style={{
                    fontSize: TYPE.subtitle,
                    fontWeight: isCorrect && showHighlight ? 700 : 500,
                    color: isCorrect && showHighlight ? theme.accent : theme.textPrimary,
                  }}>
                    {option.text}
                  </span>
                  {isCorrect && showHighlight && option.percentage != null && (
                    <span style={{
                      marginLeft: "auto",
                      fontSize: TYPE.body,
                      fontWeight: 700,
                      color: theme.accent,
                    }}>
                      <CountUp target={option.percentage} frame={frame} startFrame={highlightDelay + 5} suffix="%" />
                    </span>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Correct Answer Label */}
        {correctOption && (
          <div style={{
            marginTop: 24,
            textAlign: "center",
            opacity: fadeIn(frame, TIMING.correctHighlight + 30),
          }}>
            <div style={{
              fontSize: TYPE.cardTitle,
              fontWeight: 700,
              color: theme.textSecondary,
              textTransform: "uppercase" as const,
              letterSpacing: 2,
            }}>
              Correct Answer: {String.fromCharCode(65 + (correctIndex >= 0 ? correctIndex : 0))}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
