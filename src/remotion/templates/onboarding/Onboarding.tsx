/**
 * Onboarding Template - Personalized welcome videos for new clients.
 *
 * LAYOUTS:
 *   "friendly"      - Warm, soft gradients, welcoming icons, personal feel.
 *   "professional"   - Clean grid, timeline visualization, corporate palette.
 *   "creative"       - Colorful, animated icons, playful transitions.
 *
 * BACKGROUND PATTERNS:
 *   "grid" | "dots" | "hex" | "none"
 *
 * DATA CONTRACT (OnboardingSpec):
 *   {
 *     client_name: string,
 *     freelancer_name: string,
 *     project_name: string,
 *     welcome_message: string,
 *     next_steps: [{ step: number, title: string, description: string }],
 *     tools_used: [{ name: string, icon: string }],
 *     timeline_overview: string,
 *   }
 *
 * USAGE:
 *   <Onboarding spec={mySpec} theme={THEME_WARM} layout="friendly" />
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

export interface OnboardingStep {
  step: number;
  title: string;
  description: string;
}

export interface OnboardingTool {
  name: string;
  icon: string;
}

export interface OnboardingSpec {
  client_name: string;
  freelancer_name: string;
  project_name: string;
  welcome_message: string;
  next_steps: OnboardingStep[];
  tools_used: OnboardingTool[];
  timeline_overview: string;
}

export interface OnboardingProps {
  spec: OnboardingSpec;
  theme: Theme;
  layout: "friendly" | "professional" | "creative";
  bgPattern?: "grid" | "dots" | "hex" | "none";
}

// ── Main Component ──────────────────────────────────────────────

export const Onboarding: React.FC<OnboardingProps> = ({
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
      {layout === "friendly" && <FriendlyLayout {...layoutProps} />}
      {layout === "professional" && <ProfessionalLayout {...layoutProps} />}
      {layout === "creative" && <CreativeLayout {...layoutProps} />}
    </AbsoluteFill>
  );
};

// ── Shared Layout Props ─────────────────────────────────────────

interface LayoutProps {
  spec: OnboardingSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
}

// ── Helper: Step Badge ──────────────────────────────────────────

const StepBadge: React.FC<{
  num: number;
  theme: Theme;
  size?: number;
}> = ({ num, theme, size = 32 }) => (
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

// ── Helper: Tool Chip ───────────────────────────────────────────

const ToolChip: React.FC<{
  tool: OnboardingTool;
  theme: Theme;
  opacity?: number;
}> = ({ tool, theme, opacity = 1 }) => (
  <div style={{
    opacity,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 8,
    background: theme.bgGlass,
    border: `1px solid ${theme.cardBorder}`,
    fontSize: TYPE.caption,
    fontWeight: 600,
    color: theme.textPrimary,
  }}>
    <span style={{ fontSize: 24 }}>{tool.icon}</span>
    {tool.name}
  </div>
);


// ═══════════════════════════════════════════════════════════════
// LAYOUT 1: Friendly - Warm, welcoming, personal feel
// Centered greeting, soft card entrances, emoji-rich.
// Best with: THEME_WARM, THEME_CLEAN, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const FriendlyLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Welcome greeting (frames 0–100)
  const greetS = springEntrance(frame, fps, 5, SPRING.gentle);
  const greetOp = fadeIn(frame, 5, 30);

  // Scene 2: Next steps (frames 100–320)
  // Scene 3: Tools + timeline (frames 340+)
  const timelineOp = fadeIn(frame, 380, 20);
  const timelineS = springEntrance(frame, fps, 380, SPRING.default);

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
      {/* Welcome greeting - centered, warm */}
      <div style={{
        opacity: greetOp,
        transform: `translateY(${slideIn(greetS, "up", 25)}px)`,
        textAlign: "center" as const,
      }}>
        <div style={{
          fontSize: 40,
          marginBottom: 10,
        }}>
          <svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5" /><path d="M14 10V4a2 2 0 0 0-4 0v2" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
        </div>
        <div style={{
          fontSize: TYPE.hero,
          fontWeight: theme.headingWeight,
          color: theme.textPrimary,
          lineHeight: 1.1,
          marginBottom: 6,
        }}>
          Welcome, {spec.client_name}
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          color: theme.textSecondary,
          lineHeight: 1.4,
          maxWidth: 700,
          margin: "0 auto",
        }}>
          {spec.welcome_message}
        </div>
        <div style={{
          fontSize: TYPE.label,
          fontWeight: 600,
          color: theme.accent,
          marginTop: 10,
          letterSpacing: 1,
          textTransform: "uppercase" as const,
        }}>
          Project: {spec.project_name}
        </div>
      </div>

      {/* Next steps - horizontal cards */}
      <Sequence from={100} layout="none">
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
            color: theme.textMuted,
            marginBottom: 12,
            textAlign: "center" as const,
            opacity: fadeIn(frame, 100, 20),
          }}>
            What Happens Next
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            {spec.next_steps.slice(0, 3).map((step, i) => {
              const delay = staggerDelay(i, 115, 25);
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
                  <StepBadge num={step.step} theme={theme} />
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

      {/* Tools + timeline overview */}
      <Sequence from={340} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: theme.textMuted,
              marginBottom: 8,
              opacity: fadeIn(frame, 345, 18),
            }}>
              Tools We'll Use
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {spec.tools_used.slice(0, 5).map((tool, i) => {
                const op = fadeIn(frame, staggerDelay(i, 355, 8), 15);
                return <ToolChip key={i} tool={tool} theme={theme} opacity={op} />;
              })}
            </div>
          </div>

          <div style={{
            opacity: timelineOp,
            transform: `translateX(${slideIn(timelineS, "right", 20)}px)`,
            textAlign: "right" as const,
          }}>
            <div style={{
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: theme.textMuted,
              marginBottom: 4,
            }}>
              Timeline
            </div>
            <GradientBadge text={spec.timeline_overview} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 2: Professional - Clean grid, timeline, corporate feel
// Left-aligned, structured, business-like. Numbered steps in a column.
// Best with: THEME_CLEAN, THEME_MINIMAL, THEME_DARK
// ═══════════════════════════════════════════════════════════════

const ProfessionalLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Header (frames 0–80)
  const headerS = springEntrance(frame, fps, 5, SPRING.snappy);
  const headerOp = fadeIn(frame, 5, 25);

  // Scene 2: Steps (frames 80–300)
  // Scene 3: Tools + timeline (frames 320+)
  const footerOp = fadeIn(frame, 360, 20);
  const footerS = springEntrance(frame, fps, 360, SPRING.default);

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
      {/* Header - left-aligned, professional */}
      <div style={{
        opacity: headerOp,
        transform: `translateX(${slideIn(headerS, "left", 25)}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}>
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: theme.accent,
            marginBottom: 8,
          }}>
            Client Onboarding
          </div>
          <div style={{
            fontSize: TYPE.hero,
            fontWeight: theme.headingWeight,
            color: theme.textPrimary,
            lineHeight: 1.1,
          }}>
            Welcome, {spec.client_name}
          </div>
          <div style={{
            fontSize: TYPE.subtitle,
            color: theme.textSecondary,
            marginTop: 4,
          }}>
            {spec.project_name} - by {spec.freelancer_name}
          </div>
        </div>
        <div style={{
          width: 60,
          height: 3,
          background: theme.accentGradient,
          borderRadius: 2,
        }} />
      </div>

      {/* Welcome message */}
      <Sequence from={60} layout="none">
        <div style={{
          opacity: fadeIn(frame, 60, 20),
          fontSize: TYPE.body,
          color: theme.textSecondary,
          lineHeight: 1.5,
          maxWidth: 800,
          borderLeft: `3px solid ${theme.accent}`,
          paddingLeft: 16,
        }}>
          {spec.welcome_message}
        </div>
      </Sequence>

      {/* Next steps - horizontal row */}
      <Sequence from={120} layout="none">
        <div>
          <div style={{
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase" as const,
            color: theme.textMuted,
            marginBottom: 12,
            opacity: fadeIn(frame, 120, 18),
          }}>
            Your Onboarding Roadmap
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {spec.next_steps.slice(0, 3).map((step, i) => {
              const delay = staggerDelay(i, 135, 28);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const op = fadeIn(frame, delay, 20);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: op,
                  transform: `translateY(${slideIn(s, "down", 25)}px)`,
                  flex: "1 1 0",
                  padding: "14px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <StepBadge num={step.step} theme={theme} size={28} />
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

      {/* Tools + timeline footer */}
      <Sequence from={320} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 8, opacity: fadeIn(frame, 330, 18) }}>
            {spec.tools_used.slice(0, 5).map((tool, i) => {
              const op = fadeIn(frame, staggerDelay(i, 335, 8), 12);
              return <ToolChip key={i} tool={tool} theme={theme} opacity={op} />;
            })}
          </div>
          <div style={{
            opacity: footerOp,
            transform: `scale(${0.85 + 0.15 * footerS})`,
          }}>
            <GradientBadge text={`Timeline: ${spec.timeline_overview}`} theme={theme} fontSize={12} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// LAYOUT 3: Creative - Colorful, playful, animated feel
// Big emoji, bouncy cards, fun energy. Great for creative freelancers.
// Best with: THEME_BOLD, THEME_NEON, THEME_WARM
// ═══════════════════════════════════════════════════════════════

const CreativeLayout: React.FC<LayoutProps> = ({ spec, theme, frame, fps }) => {
  // Scene 1: Big greeting (frames 0–90)
  const greetS = springEntrance(frame, fps, 0, SPRING.bouncy);
  const greetOp = fadeIn(frame, 0, 25);

  // Scene 2: Steps (frames 90–300)
  // Scene 3: Tools + CTA (frames 320+)
  const ctaOp = fadeIn(frame, 380, 20);
  const ctaS = springEntrance(frame, fps, 380, SPRING.bouncy);

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
      {/* Big greeting - playful */}
      <div style={{
        opacity: greetOp,
        transform: `scale(${0.85 + 0.15 * greetS})`,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 8,
        }}>
          <div style={{ fontSize: 48 }}><svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>
          <div>
            <div style={{
              fontSize: TYPE.hero + 4,
              fontWeight: theme.headingWeight,
              color: theme.textPrimary,
              lineHeight: 1.05,
            }}>
              Hey {spec.client_name}!
            </div>
            <div style={{
              fontSize: TYPE.subtitle,
              color: theme.accent,
              fontWeight: 600,
            }}>
              Let's build {spec.project_name} together
            </div>
          </div>
        </div>
        <div style={{
          fontSize: TYPE.body,
          color: theme.textSecondary,
          lineHeight: 1.5,
          maxWidth: 700,
        }}>
          {spec.welcome_message}
        </div>
      </div>

      {/* Steps - staggered bouncy cards */}
      <Sequence from={90} layout="none">
        <div style={{ display: "flex", gap: 14 }}>
          {spec.next_steps.slice(0, 3).map((step, i) => {
            const delay = staggerDelay(i, 100, 25);
            const s = springEntrance(frame, fps, delay, SPRING.bouncy);
            const op = fadeIn(frame, delay, 18);
            const emojis = ["+", "~", "*"];
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: op,
                transform: `scale(${0.85 + 0.15 * s}) translateY(${slideIn(s, "down", 20)}px)`,
                flex: "1 1 0",
                padding: "16px 20px",
                textAlign: "center" as const,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>
                  {emojis[i] || "+"}
                </div>
                <div style={{
                  fontSize: TYPE.cardTitle,
                  fontWeight: 700,
                  color: theme.textPrimary,
                  marginBottom: 4,
                }}>
                  Step {step.step}: {step.title}
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
      </Sequence>

      {/* Tools row + timeline CTA */}
      <Sequence from={320} layout="none">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {spec.tools_used.slice(0, 5).map((tool, i) => {
              const delay = staggerDelay(i, 330, 8);
              const s = springEntrance(frame, fps, delay, SPRING.snappy);
              const op = fadeIn(frame, delay, 12);
              return (
                <div key={i} style={{
                  opacity: op,
                  transform: `scale(${0.8 + 0.2 * s})`,
                }}>
                  <ToolChip tool={tool} theme={theme} />
                </div>
              );
            })}
          </div>
          <div style={{
            opacity: ctaOp,
            transform: `scale(${0.85 + 0.15 * ctaS})`,
          }}>
            <GradientBadge text={`${spec.timeline_overview}`} theme={theme} fontSize={13} />
          </div>
        </div>
      </Sequence>
    </div>
  );
};
