/**
 * Proposal Template — Video proposals for freelancer pitches.
 *
 * LAYOUTS:
 *   "executive"  — Formal split layout: greeting left, content right. Professional feel.
 *   "creative"   — Card-based with staggered solution cards. Playful, visual.
 *   "pitch"      — Direct, punchy. Big text, fast reveals. Startup energy.
 *
 * BACKGROUND PATTERNS:
 *   "grid" | "dots" | "hex" | "none"
 *
 * DATA CONTRACT (ProposalSpec):
 *   {
 *     freelancer_name: string,
 *     freelancer_title: string,
 *     client_name: string,
 *     project_title: string,
 *     problem_statement: string,
 *     solution_points: [{ icon: string, title: string, description: string }],
 *     timeline: string,
 *     budget_range: string,
 *     cta_text: string,
 *   }
 *
 * USAGE:
 *   <Proposal spec={mySpec} theme={THEME_DARK} layout="executive" />
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

export interface SolutionPoint {
  icon: string;       // emoji or short string
  title: string;
  description: string;
}

export interface ProposalSpec {
  freelancer_name: string;
  freelancer_title: string;
  client_name: string;
  project_title: string;
  problem_statement: string;
  solution_points: SolutionPoint[];
  timeline: string;
  budget_range: string;
  cta_text: string;
}

export interface ProposalProps {
  spec: ProposalSpec;
  theme: Theme;
  layout: "executive" | "creative" | "pitch";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Proposal: React.FC<ProposalProps> = ({
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
      {layout === "executive" && <ExecutiveLayout {...layoutProps} />}
      {layout === "creative" && <CreativeLayout {...layoutProps} />}
      {layout === "pitch" && <PitchLayout {...layoutProps} />}
    </AbsoluteFill>
  );
};

// ── Shared Layout Props ─────────────────────────────────────────

interface LayoutProps {
  spec: ProposalSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}

// ── Helper: Freelancer Avatar ───────────────────────────────────

const FreelancerAvatar: React.FC<{
  name: string;
  theme: Theme;
  size?: number;
}> = ({ name, theme, size = 48 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: "50%",
    background: theme.accentGradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.4,
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

// ── Helper: Section Label ───────────────────────────────────────

const SectionLabel: React.FC<{
  text: string;
  theme: Theme;
  opacity: number;
}> = ({ text, theme, opacity }) => (
  <div style={{
    opacity,
    fontSize: TYPE.label,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    color: theme.accent,
    marginBottom: 12,
  }}>
    {text}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// LAYOUT 1: Executive — Formal split layout
// Left: greeting + freelancer info. Right: problem → solutions → details.
// Best with: THEME_DARK, THEME_CLEAN, THEME_MINIMAL
// ═══════════════════════════════════════════════════════════════

const ExecutiveLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Greeting (frames 0–90)
  const greetS = springEntrance(frame, fps, 5, SPRING.default);
  const greetSlide = slideIn(greetS, "left");
  const greetOp = fadeIn(frame, 5, 25);

  // Scene 2: Problem (frames 60–150)
  const probS = springEntrance(frame, fps, 60, SPRING.default);
  const probSlide = slideIn(probS, "right");
  const probOp = fadeIn(frame, 60, 25);

  // Scene 3: Solutions (frames 120+, staggered)
  // Scene 4: Timeline + Budget (frames 300+)
  const detailOp = fadeIn(frame, 300, 25);
  const detailS = springEntrance(frame, fps, 300, SPRING.default);

  // Scene 5: CTA (frames 400+)
  const ctaOp = fadeIn(frame, 400, 25);
  const ctaS = springEntrance(frame, fps, 400, SPRING.snappy);

  return (
    <div style={{
      display: "flex",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      gap: 48,
    }}>
      {/* Left column — greeting + freelancer info */}
      <div style={{
        width: 340,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: greetOp,
        transform: `translateX(${greetSlide}px)`,
      }}>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: theme.accent,
          marginBottom: 16,
        }}>
          Proposal
        </div>
        <div style={{
          fontSize: TYPE.hero - 8,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          Hi {spec.client_name},
        </div>
        <div style={{
          fontSize: TYPE.body,
          color: theme.textSecondary,
          lineHeight: 1.6,
          marginBottom: 32,
        }}>
          {spec.project_title}
        </div>

        {/* Freelancer card */}
        <GlassCard theme={theme} style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <FreelancerAvatar name={spec.freelancer_name} theme={theme} size={40} />
            <div>
              <div style={{
                fontSize: TYPE.cardTitle,
                fontWeight: 600,
                color: theme.textPrimary,
              }}>
                {spec.freelancer_name}
              </div>
              <div style={{
                fontSize: TYPE.caption,
                color: theme.textSecondary,
              }}>
                {spec.freelancer_title}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Right column — problem, solutions, details */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        overflow: "hidden",
      }}>
        {/* Problem statement */}
        <Sequence from={60} layout="none">
          <div style={{
            opacity: probOp,
            transform: `translateX(${probSlide}px)`,
          }}>
            <SectionLabel text="The Challenge" theme={theme} opacity={probOp} />
            <div style={{
              fontSize: TYPE.subtitle,
              color: theme.textPrimary,
              fontWeight: 500,
              lineHeight: 1.5,
              borderLeft: `3px solid ${theme.accent}`,
              paddingLeft: 16,
            }}>
              {spec.problem_statement}
            </div>
          </div>
        </Sequence>

        {/* Solution points */}
        <Sequence from={120} layout="none">
          <SectionLabel text="My Approach" theme={theme} opacity={fadeIn(frame, 120, 20)} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {spec.solution_points.slice(0, 3).map((pt, i) => {
              const delay = staggerDelay(i, 140, 25);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              return (
                <GlassCard key={i} theme={theme} style={{
                  padding: "12px 16px",
                  opacity: op,
                  transform: `translateX(${slideIn(s, "right", 30)}px)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{pt.icon}</div>
                    <div>
                      <div style={{
                        fontSize: TYPE.cardTitle,
                        fontWeight: 600,
                        color: theme.textPrimary,
                        marginBottom: 2,
                      }}>
                        {pt.title}
                      </div>
                      <div style={{
                        fontSize: TYPE.caption,
                        color: theme.textSecondary,
                        lineHeight: 1.4,
                      }}>
                        {pt.description}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </Sequence>

        {/* Timeline + Budget row */}
        <Sequence from={300} layout="none">
          <div style={{
            display: "flex",
            gap: 16,
            opacity: detailOp,
            transform: `translateY(${slideIn(detailS, "down", 20)}px)`,
          }}>
            <GlassCard theme={theme} style={{ flex: 1, padding: "12px 16px" }}>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginBottom: 4 }}>⏱ Timeline</div>
              <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.timeline}</div>
            </GlassCard>
            <GlassCard theme={theme} style={{ flex: 1, padding: "12px 16px" }}>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted, marginBottom: 4 }}><svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> Investment</div>
              <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.budget_range}</div>
            </GlassCard>
          </div>
        </Sequence>

        {/* CTA */}
        <Sequence from={400} layout="none">
          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.8 + 0.2 * ctaS})`,
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={14} />
          </div>
        </Sequence>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// LAYOUT 2: Creative — Card-based with staggered solution cards
// Full-width sections stacked vertically. Playful, visual.
// Best with: THEME_BOLD, THEME_WARM, THEME_NEON
// ═══════════════════════════════════════════════════════════════

const CreativeLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Hero greeting (frames 0–90)
  const heroS = springEntrance(frame, fps, 5, SPRING.bouncy);
  const heroOp = fadeIn(frame, 5, 25);

  // Scene 2: Problem (frames 70–150)
  const probOp = fadeIn(frame, 70, 25);
  const probS = springEntrance(frame, fps, 70, SPRING.default);

  // Scene 3: Solution grid (frames 140+)
  // Scene 4: Footer details (frames 340+)
  const footerOp = fadeIn(frame, 340, 25);
  const footerS = springEntrance(frame, fps, 340, SPRING.default);

  // CTA (frames 420+)
  const ctaOp = fadeIn(frame, 420, 20);

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
      {/* Hero: greeting + project title */}
      <div style={{
        textAlign: "center" as const,
        opacity: heroOp,
        transform: `translateY(${slideIn(heroS, "up", 30)}px)`,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 12,
        }}>
          <FreelancerAvatar name={spec.freelancer_name} theme={theme} size={36} />
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
          }}>
            {spec.freelancer_name} · {spec.freelancer_title}
          </div>
        </div>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          {spec.project_title}
        </div>
        <div style={{
          fontSize: TYPE.subtitle - 2,
          color: theme.textSecondary,
        }}>
          For {spec.client_name}
        </div>
      </div>

      {/* Problem statement — accent bar */}
      <Sequence from={70} layout="none">
        <div style={{
          opacity: probOp,
          transform: `translateX(${slideIn(probS, "left", 40)}px)`,
          textAlign: "center" as const,
        }}>
          <div style={{
            display: "inline-block",
            background: theme.bgGlass,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 12,
            padding: "14px 28px",
            fontSize: TYPE.body,
            color: theme.textPrimary,
            lineHeight: 1.5,
            maxWidth: 800,
          }}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" /></svg> {spec.problem_statement}
          </div>
        </div>
      </Sequence>

      {/* Solution cards — 2 or 3 column grid */}
      <Sequence from={140} layout="none">
        <div style={{
          display: "grid",
          gridTemplateColumns: spec.solution_points.length <= 2
            ? "1fr 1fr"
            : "1fr 1fr 1fr",
          gap: 14,
        }}>
          {spec.solution_points.slice(0, 3).map((pt, i) => {
            const delay = staggerDelay(i, 150, 25);
            const s = springEntrance(frame, fps, delay, SPRING.bouncy);
            const op = fadeIn(frame, delay, 20);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: op,
                transform: `translateY(${slideIn(s, "down", 30)}px) scale(${0.9 + 0.1 * s})`,
                textAlign: "center" as const,
                padding: "20px 16px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{pt.icon}</div>
                <div style={{
                  fontSize: TYPE.cardTitle,
                  fontWeight: 700,
                  color: theme.textPrimary,
                  marginBottom: 6,
                }}>
                  {pt.title}
                </div>
                <div style={{
                  fontSize: TYPE.caption,
                  color: theme.textSecondary,
                  lineHeight: 1.4,
                }}>
                  {pt.description}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Sequence>

      {/* Footer: timeline + budget + CTA */}
      <Sequence from={340} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          opacity: footerOp,
          transform: `translateY(${slideIn(footerS, "down", 20)}px)`,
        }}>
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
          }}>
            ⏱ {spec.timeline}
          </div>
          <div style={{
            width: 1,
            height: 20,
            background: theme.cardBorder,
          }} />
          <div style={{
            fontSize: TYPE.body,
            color: theme.textSecondary,
          }}>
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> {spec.budget_range}
          </div>
          <div style={{
            width: 1,
            height: 20,
            background: theme.cardBorder,
          }} />
          <div style={{ opacity: ctaOp }}>
            <GradientBadge text={spec.cta_text} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// LAYOUT 3: Pitch — Direct, punchy. Big text, fast reveals.
// Full-screen sections that transition vertically. Startup energy.
// Best with: THEME_BOLD, THEME_NEON, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const PitchLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Big greeting (frames 0–80)
  const greetOp = fadeIn(frame, 0, 20);
  const greetS = springEntrance(frame, fps, 0, SPRING.snappy);

  // Scene 2: Problem — big text (frames 60–140)
  const probOp = fadeIn(frame, 60, 20);
  const probS = springEntrance(frame, fps, 60, SPRING.snappy);

  // Scene 3: Solution list (frames 130+)
  // Scene 4: Details bar (frames 320+)
  const detailOp = fadeIn(frame, 320, 20);
  const detailS = springEntrance(frame, fps, 320, SPRING.default);

  // Scene 5: CTA (frames 400+)
  const ctaOp = fadeIn(frame, 400, 20);
  const ctaS = springEntrance(frame, fps, 400, SPRING.bouncy);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: PADDING,
      paddingTop: TOP_SAFE,
      justifyContent: "center",
      gap: 28,
    }}>
      {/* Big greeting */}
      <div style={{
        opacity: greetOp,
        transform: `translateY(${slideIn(greetS, "up", 20)}px)`,
      }}>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: theme.accent,
          marginBottom: 8,
        }}>
          {spec.freelancer_name} → {spec.client_name}
        </div>
        <div style={{
          fontSize: TYPE.hero + 4,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.05,
        }}>
          {spec.project_title}
        </div>
      </div>

      {/* Problem — bold statement */}
      <Sequence from={60} layout="none">
        <div style={{
          opacity: probOp,
          transform: `translateX(${slideIn(probS, "left", 30)}px)`,
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          lineHeight: 1.5,
          borderLeft: `4px solid ${theme.accent}`,
          paddingLeft: 20,
          maxWidth: 900,
        }}>
          {spec.problem_statement}
        </div>
      </Sequence>

      {/* Solution points — horizontal pills */}
      <Sequence from={130} layout="none">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          {spec.solution_points.slice(0, 4).map((pt, i) => {
            const delay = staggerDelay(i, 140, 22);
            const s = springEntrance(frame, fps, delay, SPRING.snappy);
            const op = fadeIn(frame, delay, 18);
            return (
              <div key={i} style={{
                opacity: op,
                transform: `translateY(${slideIn(s, "down", 20)}px)`,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 10,
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flex: "1 1 auto",
                minWidth: 200,
              }}>
                <div style={{ fontSize: 24 }}>{pt.icon}</div>
                <div>
                  <div style={{
                    fontSize: TYPE.cardTitle,
                    fontWeight: 700,
                    color: theme.textPrimary,
                  }}>
                    {pt.title}
                  </div>
                  <div style={{
                    fontSize: TYPE.caption,
                    color: theme.textMuted,
                    lineHeight: 1.3,
                  }}>
                    {pt.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Details bar + CTA */}
      <Sequence from={320} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: detailOp,
          transform: `translateY(${slideIn(detailS, "down", 15)}px)`,
        }}>
          <div style={{
            background: theme.bgGlass,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: 8,
            padding: "10px 18px",
            display: "flex",
            gap: 24,
          }}>
            <div>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>Timeline</div>
              <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.timeline}</div>
            </div>
            <div style={{ width: 1, background: theme.cardBorder }} />
            <div>
              <div style={{ fontSize: TYPE.caption, color: theme.textMuted }}>Budget</div>
              <div style={{ fontSize: TYPE.body, fontWeight: 600, color: theme.textPrimary }}>{spec.budget_range}</div>
            </div>
          </div>

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
