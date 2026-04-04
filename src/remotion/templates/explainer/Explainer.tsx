/**
 * Explainer Template — "What do you actually do?" service explainer videos.
 *
 * LAYOUTS:
 *   "whiteboard"  — Educational feel. White-ish bg, step-by-step reveal, hand-drawn borders.
 *   "cinematic"   — Premium dark bg, gradient accents, parallax-style layers.
 *   "process"     — Numbered process flow, horizontal steps, clean and direct.
 *
 * BACKGROUND PATTERNS:
 *   "grid" | "dots" | "hex" | "none"
 *
 * DATA CONTRACT (ExplainerSpec):
 *   {
 *     service_name: string,
 *     tagline: string,
 *     pain_points: [{ icon: string, text: string }],
 *     solution_steps: [{ number: number, title: string, description: string }],
 *     results: [{ stat: string, label: string }],
 *     cta_text: string,
 *   }
 *
 * USAGE:
 *   <Explainer spec={mySpec} theme={THEME_DARK} layout="cinematic" />
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import type { Theme } from "../_shared/themes";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import { PADDING, TOP_SAFE, TYPE } from "../_shared/layouts";
import { GlassCard, GradientBadge, BackgroundGrid } from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface PainPoint {
  icon: string;
  text: string;
}

export interface SolutionStep {
  number: number;
  title: string;
  description: string;
}

export interface ResultStat {
  stat: string;   // e.g. "95" or "3x"
  label: string;  // e.g. "Client Satisfaction"
}

export interface ExplainerSpec {
  service_name: string;
  tagline: string;
  pain_points: PainPoint[];
  solution_steps: SolutionStep[];
  results: ResultStat[];
  cta_text: string;
}

export interface ExplainerProps {
  spec: ExplainerSpec;
  theme: Theme;
  layout: "whiteboard" | "cinematic" | "process";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Explainer: React.FC<ExplainerProps> = ({
  spec,
  theme,
  layout,
  bgPattern = "grid",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgStyle: React.CSSProperties = theme.bg.startsWith("linear")
    ? { backgroundImage: theme.bg }
    : { backgroundColor: theme.bg };

  const layoutProps: LayoutProps = { spec, theme, bgPattern, frame, fps, bgStyle };

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern} opacity={0.03} />}
      {layout === "whiteboard" && <WhiteboardLayout {...layoutProps} />}
      {layout === "cinematic" && <CinematicLayout {...layoutProps} />}
      {layout === "process" && <ProcessLayout {...layoutProps} />}
    </AbsoluteFill>
  );
};

// ── Shared Layout Props ─────────────────────────────────────────

interface LayoutProps {
  spec: ExplainerSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}


// ── Helper: Step Number Circle ──────────────────────────────────

const StepCircle: React.FC<{
  num: number;
  theme: Theme;
  size?: number;
}> = ({ num, theme, size = 36 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: "50%",
    background: theme.accentGradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.42,
    fontWeight: 800,
    color: "#fff",
    flexShrink: 0,
  }}>
    {num}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// LAYOUT 1: Whiteboard — Educational, step-by-step reveal
// Light feel even on dark themes. Dashed borders, numbered steps.
// Best with: THEME_CLEAN, THEME_MINIMAL, THEME_WARM
// ═══════════════════════════════════════════════════════════════

const WhiteboardLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero (frames 0–90)
  const heroS = springEntrance(frame, fps, 5, SPRING.gentle);
  const heroOp = fadeIn(frame, 5, 25);

  // Scene 2: Pain points (frames 80–200)
  const painLabelOp = fadeIn(frame, 80, 20);

  // Scene 3: Solution steps (frames 200–400)
  const solLabelOp = fadeIn(frame, 200, 20);

  // Scene 4: Results (frames 400–520)
  // Scene 5: CTA (frames 520+)
  const ctaOp = fadeIn(frame, 520, 20);
  const ctaS = springEntrance(frame, fps, 520, SPRING.bouncy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 20,
    }}>
      {/* Hero: service name + tagline */}
      <div style={{
        opacity: heroOp,
        transform: `translateY(${slideIn(heroS, "up", 25)}px)`,
        textAlign: "center" as const,
        marginBottom: 8,
      }}>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: theme.accent,
          marginBottom: 10,
        }}>
          What I Do
        </div>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          {spec.service_name}
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          lineHeight: 1.4,
        }}>
          {spec.tagline}
        </div>
      </div>

      {/* Pain points — horizontal row with dashed borders */}
      <Sequence from={80} layout="none">
        <div>
          <div style={{
            opacity: painLabelOp,
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
            color: theme.textMuted,
            marginBottom: 10,
            textAlign: "center" as const,
          }}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> The Problem
          </div>
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
          }}>
            {spec.pain_points.slice(0, 3).map((pt, i) => {
              const delay = staggerDelay(i, 95, 22);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              return (
                <div key={i} style={{
                  opacity: op,
                  transform: `translateY(${slideIn(s, "down", 20)}px)`,
                  border: `1.5px dashed ${theme.cardBorder}`,
                  borderRadius: 10,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: "1 1 0",
                  maxWidth: 360,
                  background: theme.bgSecondary,
                }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{pt.icon}</div>
                  <div style={{
                    fontSize: TYPE.body,
                    color: theme.textPrimary,
                    lineHeight: 1.4,
                  }}>
                    {pt.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* Solution steps — numbered vertical list */}
      <Sequence from={200} layout="none">
        <div>
          <div style={{
            opacity: solLabelOp,
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
            color: theme.textMuted,
            marginBottom: 10,
            textAlign: "center" as const,
          }}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg> My Process
          </div>
          <div style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
          }}>
            {spec.solution_steps.slice(0, 3).map((step, i) => {
              const delay = staggerDelay(i, 220, 28);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: op,
                  transform: `translateY(${slideIn(s, "down", 25)}px)`,
                  flex: "1 1 0",
                  maxWidth: 340,
                  padding: "16px 20px",
                  textAlign: "center" as const,
                }}>
                  <StepCircle num={step.number} theme={theme} size={32} />
                  <div style={{
                    fontSize: TYPE.cardTitle,
                    fontWeight: 700,
                    color: theme.textPrimary,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textSecondary,
                    lineHeight: 1.4,
                  }}>
                    {step.description}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* Results row + CTA */}
      <Sequence from={400} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}>
          {spec.results.slice(0, 3).map((r, i) => {
            const delay = staggerDelay(i, 410, 22);
            const op = fadeIn(frame, delay, 20);
            return (
              <div key={i} style={{
                opacity: op,
                textAlign: "center" as const,
              }}>
                <div style={{
                  fontSize: TYPE.stat,
                  fontWeight: theme.headingWeight,
                  color: theme.accent,
                  lineHeight: 1,
                }}>
                  {r.stat}
                </div>
                <div style={{
                  fontSize: TYPE.caption,
                  color: theme.textMuted,
                  marginTop: 4,
                }}>
                  {r.label}
                </div>
              </div>
            );
          })}

          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
            marginLeft: 12,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// LAYOUT 2: Cinematic — Premium dark, gradient accents, layered
// Full-width sections with dramatic reveals. Big text, bold stats.
// Best with: THEME_DARK, THEME_BOLD, THEME_NEON
// ═══════════════════════════════════════════════════════════════

const CinematicLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero (frames 0–90)
  const heroS = springEntrance(frame, fps, 5, SPRING.default);
  const heroOp = fadeIn(frame, 5, 30);

  // Scene 2: Pain points (frames 90–210)
  const painOp = fadeIn(frame, 90, 25);
  const painS = springEntrance(frame, fps, 90, SPRING.default);

  // Scene 3: Solution steps (frames 210–400)
  // Scene 4: Results (frames 400–520)
  // Scene 5: CTA (frames 530+)
  const ctaOp = fadeIn(frame, 530, 20);
  const ctaS = springEntrance(frame, fps, 530, SPRING.snappy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 24,
    }}>
      {/* Hero — big service name with gradient underline */}
      <div style={{
        opacity: heroOp,
        transform: `translateY(${slideIn(heroS, "up", 30)}px)`,
      }}>
        <div style={{
          fontSize: TYPE.hero + 4,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.05,
          marginBottom: 8,
        }}>
          {spec.service_name}
        </div>
        <div style={{
          width: 80,
          height: 3,
          background: theme.accentGradient,
          borderRadius: 2,
          marginBottom: 10,
        }} />
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          lineHeight: 1.4,
          maxWidth: 700,
        }}>
          {spec.tagline}
        </div>
      </div>

      {/* Pain points — left-aligned with accent icons */}
      <Sequence from={90} layout="none">
        <div style={{
          opacity: painOp,
          transform: `translateX(${slideIn(painS, "left", 30)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: theme.accent,
            marginBottom: 10,
          }}>
            The Problem
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {spec.pain_points.slice(0, 3).map((pt, i) => {
              const delay = staggerDelay(i, 105, 22);
              const op = fadeIn(frame, delay, 18);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <div key={i} style={{
                  opacity: op,
                  transform: `translateX(${slideIn(s, "right", 25)}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: theme.bgGlass,
                  border: `1px solid ${theme.cardBorder}`,
                  borderRadius: 10,
                  padding: "10px 16px",
                  flex: "1 1 0",
                }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{pt.icon}</div>
                  <div style={{
                    fontSize: TYPE.body,
                    color: theme.textPrimary,
                    lineHeight: 1.4,
                  }}>
                    {pt.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* Solution steps — horizontal numbered cards */}
      <Sequence from={210} layout="none">
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: theme.accent,
            marginBottom: 10,
            opacity: fadeIn(frame, 210, 20),
          }}>
            How It Works
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {spec.solution_steps.slice(0, 3).map((step, i) => {
              const delay = staggerDelay(i, 230, 28);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: op,
                  transform: `translateY(${slideIn(s, "down", 30)}px)`,
                  flex: "1 1 0",
                  padding: "18px 20px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <StepCircle num={step.number} theme={theme} />
                    <div style={{
                      fontSize: TYPE.cardTitle,
                      fontWeight: 700,
                      color: theme.textPrimary,
                    }}>
                      {step.title}
                    </div>
                  </div>
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textSecondary,
                    lineHeight: 1.5,
                  }}>
                    {step.description}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* Results stats + CTA */}
      <Sequence from={400} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}>
          {spec.results.slice(0, 3).map((r, i) => {
            const delay = staggerDelay(i, 410, 22);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            const op = fadeIn(frame, delay, 18);
            return (
              <div key={i} style={{
                opacity: op,
                transform: `scale(${0.8 + 0.2 * s})`,
              }}>
                <div style={{
                  fontSize: TYPE.stat,
                  fontWeight: theme.headingWeight,
                  color: theme.accent,
                  lineHeight: 1,
                }}>
                  {r.stat}
                </div>
                <div style={{
                  fontSize: TYPE.caption,
                  color: theme.textMuted,
                  marginTop: 4,
                }}>
                  {r.label}
                </div>
              </div>
            );
          })}

          <div style={{ flex: 1 }} />

          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={15} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// LAYOUT 3: Process — Numbered horizontal flow, clean and direct
// Emphasizes the step-by-step nature. Connected dots between steps.
// Best with: THEME_CLEAN, THEME_BOLD, THEME_MINIMAL
// ═══════════════════════════════════════════════════════════════

const ProcessLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero (frames 0–80)
  const heroOp = fadeIn(frame, 0, 25);
  const heroS = springEntrance(frame, fps, 0, SPRING.snappy);

  // Scene 2: Pain points (frames 70–180)
  const painOp = fadeIn(frame, 70, 20);

  // Scene 3: Process steps with connecting line (frames 180–400)
  // Scene 4: Results (frames 400–520)
  // Scene 5: CTA (frames 520+)
  const ctaOp = fadeIn(frame, 520, 20);
  const ctaS = springEntrance(frame, fps, 520, SPRING.bouncy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 22,
    }}>
      {/* Hero — left-aligned, punchy */}
      <div style={{
        opacity: heroOp,
        transform: `translateX(${slideIn(heroS, "left", 25)}px)`,
      }}>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          {spec.service_name}
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
        }}>
          {spec.tagline}
        </div>
      </div>

      {/* Pain points — inline pills */}
      <Sequence from={70} layout="none">
        <div style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap" as const,
          opacity: painOp,
        }}>
          {spec.pain_points.slice(0, 4).map((pt, i) => {
            const delay = staggerDelay(i, 80, 20);
            const op = fadeIn(frame, delay, 18);
            return (
              <div key={i} style={{
                opacity: op,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: TYPE.body,
                color: theme.textPrimary,
              }}>
                <span style={{ fontSize: 24 }}>{pt.icon}</span>
                {pt.text}
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Process steps — horizontal with connecting line */}
      <Sequence from={180} layout="none">
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: theme.accent,
            marginBottom: 14,
            opacity: fadeIn(frame, 180, 20),
          }}>
            The Process
          </div>
          <div style={{
            display: "flex",
            gap: 0,
            alignItems: "flex-start",
          }}>
            {spec.solution_steps.slice(0, 3).map((step, i) => {
              const delay = staggerDelay(i, 200, 30);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              const isLast = i === Math.min(spec.solution_steps.length, 3) - 1;
              return (
                <React.Fragment key={i}>
                  <div style={{
                    opacity: op,
                    transform: `translateY(${slideIn(s, "down", 20)}px)`,
                    flex: "1 1 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center" as const,
                  }}>
                    <StepCircle num={step.number} theme={theme} size={40} />
                    <div style={{
                      fontSize: TYPE.cardTitle,
                      fontWeight: 700,
                      color: theme.textPrimary,
                      marginTop: 10,
                      marginBottom: 4,
                    }}>
                      {step.title}
                    </div>
                    <div style={{
                      fontSize: TYPE.caption,
                      color: theme.textSecondary,
                      lineHeight: 1.4,
                      maxWidth: 280,
                    }}>
                      {step.description}
                    </div>
                  </div>
                  {!isLast && (
                    <div style={{
                      width: 40,
                      height: 2,
                      background: theme.cardBorder,
                      marginTop: 18,
                      flexShrink: 0,
                      opacity: op,
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* Results + CTA row */}
      <Sequence from={400} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}>
          <GlassCard theme={theme} style={{
            display: "flex",
            gap: 28,
            padding: "14px 24px",
            opacity: fadeIn(frame, 410, 20),
          }}>
            {spec.results.slice(0, 3).map((r, i) => {
              const delay = staggerDelay(i, 415, 20);
              const op = fadeIn(frame, delay, 18);
              return (
                <div key={i} style={{ opacity: op, textAlign: "center" as const }}>
                  <div style={{
                    fontSize: TYPE.stat - 6,
                    fontWeight: theme.headingWeight,
                    color: theme.accent,
                    lineHeight: 1,
                  }}>
                    {r.stat}
                  </div>
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textMuted,
                    marginTop: 3,
                  }}>
                    {r.label}
                  </div>
                </div>
              );
            })}
          </GlassCard>

          <div style={{ flex: 1 }} />

          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={14} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};
