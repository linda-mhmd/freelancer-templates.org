/**
 * ProjectTimeline Template - Visual project milestone tracker.
 *
 * Dashboard layout:
 *   - Hero title + status badge
 *   - Horizontal or vertical milestone timeline with animated connector lines
 *   - Each milestone: date, title, description, status dot (done / active / upcoming)
 *   - Footer: overall progress bar + completion percentage
 *
 * DATA CONTRACT (ProjectTimelineSpec):
 *   {
 *     title: "Website Redesign",
 *     subtitle: "Apr – Jun 2025",
 *     overall_progress: 65,        // 0–100
 *     milestones: [
 *       { date: "Apr 1", title: "Kickoff", description: "Scope signed", status: "done" },
 *       { date: "Apr 15", title: "Wireframes", description: "UX review", status: "active" },
 *       { date: "May 10", title: "Dev Sprint", description: "Core features", status: "upcoming" },
 *     ],
 *     client_name?: "Acme Corp",
 *   }
 *
 * USAGE:
 *   <ProjectTimeline spec={spec} theme={THEME_DARK} />
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { springEntrance, fadeIn, slideIn, staggerDelay, SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE, makeType } from "../_shared/layouts";
import { GlassCard, BackgroundGrid, ProgressBar } from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface MilestoneItem {
  date: string;
  title: string;
  description: string;
  status: "done" | "active" | "upcoming";
}

export interface ProjectTimelineSpec {
  title: string;
  subtitle: string;
  overall_progress: number;   // 0–100
  milestones: MilestoneItem[];
  client_name?: string;
}

export interface ProjectTimelineProps {
  spec: ProjectTimelineSpec;
  theme?: Theme;
  bgPattern?: "grid" | "dots" | "hex" | "none";
  fontScale?: number;
}

// ── Timing ──────────────────────────────────────────────────────
const TIMING = {
  titleStart: 0,
  subtitleStart: 12,
  milestoneBase: 35,
  milestoneStagger: 22,
  progressStart: 180,
  creditStart: 220,
};

// ── Status styles ────────────────────────────────────────────────
const STATUS_DOT_COLOR = {
  done: "#22c55e",
  active: "#6366f1",
  upcoming: "#64748b",
} as const;

const STATUS_LABEL = {
  done: "Done",
  active: "In Progress",
  upcoming: "Upcoming",
} as const;

const STATUS_LABEL_COLOR = {
  done: "#22c55e",
  active: "#6366f1",
  upcoming: "#64748b",
} as const;

// ── Main Component ──────────────────────────────────────────────
export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  spec,
  theme = THEME_DARK,
  bgPattern = "dots",
  fontScale = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = makeType(fontScale);

  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const subtitleFade = fadeIn(frame, TIMING.subtitleStart, 18);

  const milestones = spec.milestones.slice(0, 5);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute",
        inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px 48px`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>

        {/* ── Header ───────────────────────────────────────────── */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 24)}px)`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: T.hero, fontWeight: theme.headingWeight, lineHeight: 1.1 }}>
              {spec.title}
            </div>
            <div style={{
              fontSize: T.subtitle,
              color: theme.accent,
              fontWeight: 600,
              marginTop: 6,
              opacity: subtitleFade,
            }}>
              {spec.subtitle}{spec.client_name ? ` · ${spec.client_name}` : ""}
            </div>
          </div>
          {/* Overall % badge */}
          <div style={{
            opacity: subtitleFade,
            background: theme.accentGradient,
            borderRadius: 999,
            padding: "8px 20px",
            fontSize: T.body,
            fontWeight: 700,
            color: "#fff",
          }}>
            {spec.overall_progress}% Complete
          </div>
        </div>

        {/* ── Milestone List ────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
          {milestones.map((ms, i) => {
            const delay = staggerDelay(i, TIMING.milestoneBase, TIMING.milestoneStagger);
            const s = springEntrance(frame, fps, delay, SPRING.default);
            const op = fadeIn(frame, delay, 18);
            const isLast = i === milestones.length - 1;

            // Connector line animates in after the card
            const lineOp = fadeIn(frame, delay + 10, 15);
            const lineH = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
                {/* Left: dot + vertical line */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 20,
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: STATUS_DOT_COLOR[ms.status],
                    border: ms.status === "active"
                      ? `3px solid ${theme.textPrimary}`
                      : `2px solid ${STATUS_DOT_COLOR[ms.status]}`,
                    opacity: op,
                    flexShrink: 0,
                    boxShadow: ms.status === "active"
                      ? `0 0 12px ${STATUS_DOT_COLOR.active}88`
                      : "none",
                    marginTop: 8,
                  }} />
                  {!isLast && (
                    <div style={{
                      width: 2,
                      flex: 1,
                      minHeight: 20,
                      background: theme.cardBorder,
                      opacity: lineOp * lineH,
                      marginTop: 4,
                    }} />
                  )}
                </div>

                {/* Right: card */}
                <GlassCard
                  theme={theme}
                  style={{
                    flex: 1,
                    opacity: op,
                    transform: `translateX(${slideIn(s, "right", 30)}px)`,
                    padding: "14px 18px",
                    marginBottom: isLast ? 0 : 12,
                    borderLeft: ms.status === "active"
                      ? `3px solid ${theme.accent}`
                      : `3px solid transparent`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        fontSize: T.caption,
                        color: theme.textMuted,
                        fontWeight: 600,
                        minWidth: 56,
                      }}>
                        {ms.date}
                      </div>
                      <div style={{ fontSize: T.body, fontWeight: 700, color: theme.textPrimary }}>
                        {ms.title}
                      </div>
                    </div>
                    <div style={{
                      fontSize: T.caption,
                      fontWeight: 600,
                      color: STATUS_LABEL_COLOR[ms.status],
                      background: `${STATUS_DOT_COLOR[ms.status]}1a`,
                      padding: "2px 10px",
                      borderRadius: 999,
                    }}>
                      {STATUS_LABEL[ms.status]}
                    </div>
                  </div>
                  <div style={{
                    fontSize: T.caption,
                    color: theme.textSecondary,
                    marginTop: 4,
                    marginLeft: 68,
                  }}>
                    {ms.description}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* ── Overall Progress Bar ──────────────────────────────── */}
        <div style={{ opacity: fadeIn(frame, TIMING.progressStart, 20) }}>
          <div style={{
            fontSize: T.label,
            color: theme.textSecondary,
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
          }}>
            Overall Progress
          </div>
          <ProgressBar
            progress={spec.overall_progress}
            frame={frame}
            startFrame={TIMING.progressStart}
            theme={theme}
            height={12}
            duration={50}
            showPercent={true}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
