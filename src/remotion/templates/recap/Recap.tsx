/**
 * Recap / Report Template - Freelancer Video Automation Platform
 * 
 * A reusable, theme-aware monthly/weekly recap video template.
 * Renders key stats, milestones, next steps, and overall status.
 * 
 * USAGE:
 *   <Recap spec={recapSpec} theme={THEME_DARK} layout="dashboard" />
 * 
 * THEME VARIANTS:
 *   Pass any Theme from themes.ts. Built-in: dark, clean, bold, warm, minimal, neon
 * 
 * LAYOUT VARIANTS (via `layout` prop):
 *   "dashboard"  - Stats grid top, milestones below, status badge (default)
 *   "timeline"   - Vertical timeline with milestones, stats sidebar
 *   "cards"      - Full-width stacked cards, one per section
 * 
 * DATA CONTRACT (RecapSpec):
 *   {
 *     period: "January 2026",
 *     client_name: "Acme Corp",
 *     highlights: [{ label: "Tasks Completed", value: 24, suffix: "" }],
 *     milestones: [{ title: "MVP Launch", date: "Jan 15", status: "completed" }],
 *     next_steps: ["Finalize API docs", "User testing round 2"],
 *     overall_status: "on-track"
 *   }
 * 
 * CUSTOMIZATION POINTS (search for "CUSTOMIZE"):
 *   - Scene timing (TIMING object)
 *   - Typography sizes
 *   - Progress bar height/colors
 *   - Background pattern
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
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE, makeType } from "../_shared/layouts";
import {
  CountUp,
  GradientBadge,
  GlassCard,
  BackgroundGrid,
  ProgressBar,
  StatusBadge,
  TimelineDot,
} from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────
export interface RecapHighlight {
  label: string;
  value: number;
  suffix?: string;        // e.g. "%", "k", "h"
  /** Optional 0–100 progress for a bar visualization */
  progress?: number;
}

export interface RecapMilestone {
  title: string;
  date?: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface RecapSpec {
  period: string;                    // e.g. "January 2026"
  client_name?: string;
  highlights: RecapHighlight[];      // 2–4 key stats
  milestones?: RecapMilestone[];     // 2–6 milestones
  next_steps?: string[];             // 2–4 next steps
  overall_status?: "on-track" | "ahead" | "needs-attention";
  freelancer_name?: string;
  cta_text?: string;
}

export interface RecapProps {
  spec: RecapSpec;
  theme?: Theme;
  layout?: "dashboard" | "timeline" | "cards";
  bgPattern?: "grid" | "dots" | "hex" | "none";
  /** Multiplier for all font sizes. Adjust in Remotion Studio Props panel.
   *  1.0 = default (fits dense dashboard with 4 stats + milestones).
   *  1.2–1.4 = spacious layouts with fewer items. */
  fontScale?: number;
}

// ── CUSTOMIZE: Scene Timing ─────────────────────────────────────
const TIMING = {
  headerStart: 5,
  statsStart: 40,
  statsStagger: 20,       // gap between each stat
  milestonesStart: 140,
  milestoneStagger: 25,
  nextStepsStart: 280,
  nextStepStagger: 20,
  statusStart: 380,
  ctaStart: 420,
};

// ── Main Component ──────────────────────────────────────────────
export const Recap: React.FC<RecapProps> = ({
  spec,
  theme = THEME_DARK,
  layout = "dashboard",
  bgPattern = "grid",
  fontScale = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = makeType(fontScale);

  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  if (layout === "timeline") {
    return <TimelineLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} T={T} />;
  }
  if (layout === "cards") {
    return <CardsLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} T={T} />;
  }
  return <DashboardLayout spec={spec} theme={theme} bgPattern={bgPattern} frame={frame} fps={fps} bgStyle={bgStyle} T={T} />;
};

// ── Shared Props Type ───────────────────────────────────────────
interface LayoutProps {
  spec: RecapSpec;
  theme: Theme;
  bgPattern: string;
  frame: number;
  fps: number;
  bgStyle: React.CSSProperties;
  T: typeof TYPE;
}

// ── Layout: Dashboard ───────────────────────────────────────────
// Stats grid at top, milestones + next steps below, status badge at bottom.
// Best for data-heavy recaps with 3–4 stats.
const DashboardLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle, T }) => {
  const headerSpring = springEntrance(frame, fps, TIMING.headerStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column",
      }}>
        {/* Header: Period + Client */}
        <div style={{
          opacity: headerSpring,
          transform: `translateY(${slideIn(headerSpring, "up", 20)}px)`,
        }}>
          <div style={{ fontSize: T.subtitle, color: theme.textSecondary, fontWeight: 500 }}>
            {spec.client_name ? `${spec.client_name} - ` : ""}{spec.period}
          </div>
          <div style={{ fontSize: T.hero, fontWeight: theme.headingWeight, marginTop: 4 }}>
            Monthly Recap
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(spec.highlights.length, 4)}, 1fr)`,
          gap: 16, marginTop: 28,
        }}>
          {spec.highlights.map((h, i) => {
            const delay = staggerDelay(i, TIMING.statsStart, TIMING.statsStagger);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard key={i} theme={theme} style={{
                opacity: s,
                transform: `translateY(${slideIn(s, "up", 24)}px)`,
                textAlign: "center",
                padding: "18px 16px",
              }}>
                <div style={{ fontSize: T.stat, fontWeight: theme.headingWeight, color: theme.accent }}>
                  <CountUp target={h.value} frame={frame} startFrame={delay + 10} suffix={h.suffix || ""} />
                </div>
                <div style={{ fontSize: T.label, color: theme.textSecondary, marginTop: 6, textTransform: "uppercase" as const, letterSpacing: 1 }}>
                  {h.label}
                </div>
                {h.progress !== undefined && (
                  <div style={{ marginTop: 10 }}>
                    <ProgressBar progress={h.progress} frame={frame} startFrame={delay + 20} theme={theme} showPercent={false} height={6} />
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom row: Milestones left, Next Steps right */}
        <div style={{ display: "flex", gap: 20, marginTop: 20, flex: 1, minHeight: 0 }}>
          {/* Milestones */}
          {spec.milestones && spec.milestones.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: T.cardTitle, color: theme.textMuted, fontWeight: 600,
                textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10,
                opacity: fadeIn(frame, TIMING.milestonesStart - 10),
              }}>
                Milestones
              </div>
              {spec.milestones.map((m, i) => {
                const delay = staggerDelay(i, TIMING.milestonesStart, TIMING.milestoneStagger);
                const s = springEntrance(frame, fps, delay, SPRING.default);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    marginBottom: 8,
                    opacity: s,
                    transform: `translateX(${slideIn(s, "left", 20)}px)`,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: m.status === "completed" ? "#22c55e" : m.status === "in-progress" ? "#3b82f6" : theme.cardBorder,
                    }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: T.body, fontWeight: 500 }}>{m.title}</span>
                      {m.date && <span style={{ fontSize: T.caption, color: theme.textMuted, marginLeft: 8 }}>{m.date}</span>}
                    </div>
                    <StatusBadge status={m.status} theme={theme} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Next Steps */}
          {spec.next_steps && spec.next_steps.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: T.cardTitle, color: theme.textMuted, fontWeight: 600,
                textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10,
                opacity: fadeIn(frame, TIMING.nextStepsStart - 10),
              }}>
                Next Steps
              </div>
              {spec.next_steps.map((step, i) => {
                const delay = staggerDelay(i, TIMING.nextStepsStart, TIMING.nextStepStagger);
                const s = springEntrance(frame, fps, delay, SPRING.default);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    marginBottom: 8,
                    opacity: s,
                    transform: `translateX(${slideIn(s, "right", 20)}px)`,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                      border: `1.5px solid ${theme.cardBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: theme.textMuted, fontWeight: 700,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: T.body, color: theme.textSecondary }}>{step}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Status + CTA */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 12,
          opacity: fadeIn(frame, TIMING.statusStart),
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {spec.overall_status && (
              <>
                <span style={{ fontSize: T.body, color: theme.textMuted }}>Overall:</span>
                <StatusBadge status={spec.overall_status} theme={theme} />
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {spec.cta_text && <GradientBadge text={spec.cta_text} theme={theme} />}
            {spec.freelancer_name && (
              <span style={{ fontSize: T.caption, color: theme.textMuted }}>{spec.freelancer_name}</span>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// ── Layout: Timeline ────────────────────────────────────────────
// Vertical timeline on the left, stats sidebar on the right.
// Best for milestone-heavy recaps.
const TimelineLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle, T }) => {
  const headerSpring = springEntrance(frame, fps, TIMING.headerStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute", inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          opacity: headerSpring,
          transform: `translateY(${slideIn(headerSpring, "up", 20)}px)`,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: T.subtitle, color: theme.textSecondary, fontWeight: 500 }}>
            {spec.client_name ? `${spec.client_name} - ` : ""}{spec.period}
          </div>
          <div style={{ fontSize: T.title, fontWeight: theme.headingWeight, marginTop: 4 }}>
            Project Timeline
          </div>
        </div>

        {/* Main content: Timeline left, Stats right */}
        <div style={{ display: "flex", gap: 32, flex: 1, minHeight: 0 }}>
          {/* Timeline */}
          <div style={{ flex: 1.3 }}>
            {spec.milestones?.map((m, i) => {
              const delay = staggerDelay(i, TIMING.milestonesStart, TIMING.milestoneStagger);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              const isLast = i === (spec.milestones?.length ?? 0) - 1;
              return (
                <div key={i} style={{
                  display: "flex", gap: 14,
                  opacity: s,
                  transform: `translateY(${slideIn(s, "up", 16)}px)`,
                  marginBottom: isLast ? 0 : 4,
                }}>
                  <TimelineDot completed={m.status === "completed"} theme={theme} isLast={isLast} />
                  <div style={{ paddingBottom: isLast ? 0 : 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: T.body, fontWeight: 600 }}>{m.title}</span>
                      <StatusBadge status={m.status} theme={theme} />
                    </div>
                    {m.date && (
                      <div style={{ fontSize: T.caption, color: theme.textMuted, marginTop: 3 }}>{m.date}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats sidebar */}
          <div style={{ flex: 0.7, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              fontSize: T.cardTitle, color: theme.textMuted, fontWeight: 600,
              textTransform: "uppercase" as const, letterSpacing: 1,
              opacity: fadeIn(frame, TIMING.statsStart - 10),
            }}>
              Key Metrics
            </div>
            {spec.highlights.map((h, i) => {
              const delay = staggerDelay(i, TIMING.statsStart, TIMING.statsStagger);
              const s = springEntrance(frame, fps, delay, SPRING.default);
              return (
                <GlassCard key={i} theme={theme} style={{
                  opacity: s,
                  transform: `translateX(${slideIn(s, "right", 20)}px)`,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: T.stat - 8, fontWeight: theme.headingWeight, color: theme.accent }}>
                    <CountUp target={h.value} frame={frame} startFrame={delay + 10} suffix={h.suffix || ""} />
                  </div>
                  <div style={{ fontSize: T.caption, color: theme.textSecondary, marginTop: 4 }}>{h.label}</div>
                  {h.progress !== undefined && (
                    <div style={{ marginTop: 8 }}>
                      <ProgressBar progress={h.progress} frame={frame} startFrame={delay + 15} theme={theme} showPercent={false} height={5} />
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 16,
          opacity: fadeIn(frame, TIMING.statusStart),
        }}>
          {spec.overall_status && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: T.body, color: theme.textMuted }}>Status:</span>
              <StatusBadge status={spec.overall_status} theme={theme} />
            </div>
          )}
          {spec.cta_text && <GradientBadge text={spec.cta_text} theme={theme} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Layout: Cards ───────────────────────────────────────────────
// Full-width stacked sections. Clean, report-style.
// Best for presentation-style recaps with clear sections.
const CardsLayout: React.FC<LayoutProps> = ({ spec, theme, bgPattern, frame, fps, bgStyle, T }) => {
  const headerSpring = springEntrance(frame, fps, TIMING.headerStart, SPRING.default);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} opacity={0.02} />}

      <div style={{
        position: "absolute", inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px`,
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {/* Header card */}
        <GlassCard theme={theme} style={{
          opacity: headerSpring,
          transform: `translateY(${slideIn(headerSpring, "up", 20)}px)`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 24px",
        }}>
          <div>
            <div style={{ fontSize: T.title, fontWeight: theme.headingWeight }}>
              {spec.period} Recap
            </div>
            {spec.client_name && (
              <div style={{ fontSize: T.body, color: theme.textSecondary, marginTop: 2 }}>{spec.client_name}</div>
            )}
          </div>
          {spec.overall_status && <StatusBadge status={spec.overall_status} theme={theme} />}
        </GlassCard>

        {/* Stats card */}
        <GlassCard theme={theme} style={{
          opacity: springEntrance(frame, fps, TIMING.statsStart, SPRING.default),
          transform: `translateY(${slideIn(springEntrance(frame, fps, TIMING.statsStart, SPRING.default), "up", 16)}px)`,
          padding: "16px 24px",
        }}>
          <div style={{
            fontSize: T.caption, color: theme.textMuted, fontWeight: 600,
            textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 12,
          }}>
            Highlights
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {spec.highlights.map((h, i) => {
              const delay = staggerDelay(i, TIMING.statsStart + 10, 15);
              return (
                <div key={i} style={{ flex: 1, opacity: fadeIn(frame, delay) }}>
                  <div style={{ fontSize: T.stat - 4, fontWeight: theme.headingWeight, color: theme.accent }}>
                    <CountUp target={h.value} frame={frame} startFrame={delay} suffix={h.suffix || ""} />
                  </div>
                  <div style={{ fontSize: T.caption, color: theme.textSecondary, marginTop: 4 }}>{h.label}</div>
                  {h.progress !== undefined && (
                    <div style={{ marginTop: 8 }}>
                      <ProgressBar progress={h.progress} frame={frame} startFrame={delay + 10} theme={theme} showPercent={false} height={5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Milestones + Next Steps row */}
        <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0 }}>
          {spec.milestones && spec.milestones.length > 0 && (
            <GlassCard theme={theme} style={{
              flex: 1,
              opacity: fadeIn(frame, TIMING.milestonesStart - 10),
              padding: "14px 20px",
            }}>
              <div style={{
                fontSize: T.caption, color: theme.textMuted, fontWeight: 600,
                textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10,
              }}>
                Milestones
              </div>
              {spec.milestones.map((m, i) => {
                const delay = staggerDelay(i, TIMING.milestonesStart, TIMING.milestoneStagger);
                const s = springEntrance(frame, fps, delay, SPRING.default);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: 6, opacity: s,
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: m.status === "completed" ? "#22c55e" : m.status === "in-progress" ? "#3b82f6" : theme.cardBorder,
                    }} />
                    <span style={{ fontSize: T.body - 1, fontWeight: 500, flex: 1 }}>{m.title}</span>
                    <StatusBadge status={m.status} theme={theme} />
                  </div>
                );
              })}
            </GlassCard>
          )}

          {spec.next_steps && spec.next_steps.length > 0 && (
            <GlassCard theme={theme} style={{
              flex: 1,
              opacity: fadeIn(frame, TIMING.nextStepsStart - 10),
              padding: "14px 20px",
            }}>
              <div style={{
                fontSize: T.caption, color: theme.textMuted, fontWeight: 600,
                textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 10,
              }}>
                Next Steps
              </div>
              {spec.next_steps.map((step, i) => {
                const delay = staggerDelay(i, TIMING.nextStepsStart, TIMING.nextStepStagger);
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 8,
                    marginBottom: 6, opacity: fadeIn(frame, delay),
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: theme.accent,
                      width: 16, height: 16, borderRadius: 4,
                      background: `${theme.accent}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: T.body - 1, color: theme.textSecondary }}>{step}</span>
                  </div>
                );
              })}
            </GlassCard>
          )}
        </div>

        {/* CTA footer */}
        {spec.cta_text && (
          <div style={{
            display: "flex", justifyContent: "center",
            opacity: fadeIn(frame, TIMING.ctaStart),
          }}>
            <GradientBadge text={spec.cta_text} theme={theme} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
