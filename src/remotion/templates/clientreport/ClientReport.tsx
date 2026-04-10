/**
 * ClientReport Template - Freelancer Video Automation Platform
 *
 * A dashboard-style client performance report video.
 * Shows period headline, 3 animated KPI cards with CountUp numbers
 * and status badges, a summary paragraph, and a staggered highlight list.
 *
 * USAGE:
 *   <ClientReport spec={spec} theme={THEME_DARK} />
 *
 * DATA CONTRACT (ClientReportSpec):
 *   {
 *     title: "Q1 2025 Client Report",
 *     period: "Q1 2025",
 *     client_name: "Acme Corp",          // optional
 *     kpis: [
 *       { label: "Revenue", value: 128, suffix: "k", change: 24, status: "up" },
 *       { label: "Users",   value: 847,  suffix: "",  change: 18, status: "up" },
 *       { label: "CSAT",    value: 96,   suffix: "%", change:  4, status: "up" },
 *     ],
 *     summary: "An exceptional quarter...",
 *     highlights: ["Shipped redesign", "Zero incidents"],
 *     freelancer_name: "Linda Mohamed",  // optional credit
 *     freelancer_title: "Consultant",
 *   }
 *
 * CUSTOMIZATION POINTS (search for "CUSTOMIZE"):
 *   - Scene timing (TIMING object)
 *   - Status colors (STATUS_COLOR)
 *   - Background pattern type
 *   - fontScale prop (scales TYPE system via makeType())
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  springEntrance,
  fadeIn,
  slideIn,
  staggerDelay,
  SPRING,
} from "../_shared/animations";
import type { Theme } from "../_shared/themes";
import { THEME_DARK } from "../_shared/themes";
import { PADDING, TOP_SAFE, TYPE, GRID, makeType } from "../_shared/layouts";
import { GlassCard, CountUp, BackgroundGrid } from "../_shared/components";

// ── Data Contract ───────────────────────────────────────────────

export interface KPIItem {
  label: string;
  value: number;
  /** Unit suffix displayed after the CountUp number: "%", "k", "$", "x", etc. */
  suffix?: string;
  /** Percent change vs. prior period (positive = increased, negative = decreased). */
  change: number;
  /** "up" = green badge, "down" = red badge, "neutral" = muted badge. */
  status: "up" | "down" | "neutral";
}

export interface ClientReportSpec {
  title: string;
  /** Reporting period label, e.g. "Q1 2025" or "March 2025". */
  period: string;
  /** Optional client name appended to the period subtitle. */
  client_name?: string;
  /** Exactly 3 KPIs are shown in the three-column card row. */
  kpis: KPIItem[];
  /** One or two sentence summary paragraph. */
  summary: string;
  /** Bullet-point achievements (max 4 for comfortable fit at 720p). */
  highlights: string[];
  freelancer_name?: string;
  freelancer_title?: string;
}

export interface ClientReportProps {
  spec: ClientReportSpec;
  theme?: Theme;
  /** Background texture: "grid" | "dots" | "hex" | "none" */
  bgPattern?: "grid" | "dots" | "hex" | "none";
  /** Scale the entire TYPE system. 1.0 = default (calibrated for dense 720p). */
  fontScale?: number;
}

// ── CUSTOMIZE: Scene Timing ─────────────────────────────────────
const TIMING = {
  titleStart: 0,
  periodStart: 12,
  kpiBaseStart: 28,
  kpiStagger: 18,      // 18 frames ≈ 0.6s between cards
  countupStart: 65,
  summaryStart: 108,
  highlightBaseStart: 138,
  highlightStagger: 18,
  creditStart: 215,
};

// ── CUSTOMIZE: Status Colors ────────────────────────────────────
// Semantic green/red for financial metrics — the one hardcoded exception
// to the "always use theme object" rule. Background alpha is 0x1a ≈ 10%.
const STATUS_COLOR = {
  up: "#22c55e",
  down: "#ef4444",
  neutral: "#94a3b8",
} as const;

const STATUS_ICON = {
  up: "▲",
  down: "▼",
  neutral: "─",
} as const;

// ── Main Component ──────────────────────────────────────────────
export const ClientReport: React.FC<ClientReportProps> = ({
  spec,
  theme = THEME_DARK,
  bgPattern = "grid",
  fontScale = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = makeType(fontScale);

  const bgStyle = theme.bg.startsWith("linear-gradient")
    ? { background: theme.bg }
    : { backgroundColor: theme.bg };

  const titleSpring = springEntrance(frame, fps, TIMING.titleStart, SPRING.default);
  const periodFade = fadeIn(frame, TIMING.periodStart, 18);
  const summaryFade = fadeIn(frame, TIMING.summaryStart, 25);
  const creditFade = fadeIn(frame, TIMING.creditStart, 20);

  return (
    <AbsoluteFill style={{ ...bgStyle, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
      {bgPattern !== "none" && <BackgroundGrid pattern={bgPattern as "grid" | "dots" | "hex"} />}

      <div style={{
        position: "absolute",
        inset: 0,
        padding: `${TOP_SAFE}px ${PADDING}px 48px`,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}>

        {/* ── Header: Title + Period ────────────────────────────── */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${slideIn(titleSpring, "up", 24)}px)`,
        }}>
          <div style={{
            fontSize: T.hero,
            fontWeight: theme.headingWeight,
            lineHeight: 1.1,
            color: theme.textPrimary,
          }}>
            {spec.title}
          </div>
          <div style={{
            fontSize: T.subtitle,
            color: theme.accent,
            fontWeight: 600,
            marginTop: 6,
            opacity: periodFade,
          }}>
            {spec.period}{spec.client_name ? ` · ${spec.client_name}` : ""}
          </div>
        </div>

        {/* ── KPI Cards Row ────────────────────────────────────── */}
        <div style={{ ...GRID.threeCol, alignContent: "start" }}>
          {spec.kpis.slice(0, 3).map((kpi, i) => {
            const delay = staggerDelay(i, TIMING.kpiBaseStart, TIMING.kpiStagger);
            const kpiSpring = springEntrance(frame, fps, delay, SPRING.default);
            return (
              <GlassCard
                key={i}
                theme={theme}
                style={{
                  opacity: kpiSpring,
                  transform: `translateY(${slideIn(kpiSpring, "up", 28)}px) scale(${0.95 + kpiSpring * 0.05})`,
                  padding: "20px 24px",
                }}
              >
                {/* Metric label */}
                <div style={{
                  fontSize: T.label,
                  color: theme.textSecondary,
                  textTransform: "uppercase" as const,
                  letterSpacing: 1,
                  marginBottom: 8,
                  fontWeight: 600,
                }}>
                  {kpi.label}
                </div>

                {/* Animated number */}
                <div style={{
                  fontSize: T.stat,
                  fontWeight: theme.headingWeight,
                  lineHeight: 1,
                  color: theme.textPrimary,
                }}>
                  <CountUp
                    target={kpi.value}
                    frame={frame}
                    startFrame={TIMING.countupStart + i * 5}
                    suffix={kpi.suffix ?? ""}
                    duration={55}
                  />
                </div>

                {/* Status badge + context label */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 10,
                }}>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: `${STATUS_COLOR[kpi.status]}1a`,
                    color: STATUS_COLOR[kpi.status],
                    fontSize: T.caption,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}>
                    <span style={{ fontSize: "0.7em" }}>{STATUS_ICON[kpi.status]}</span>
                    <span>{Math.abs(kpi.change)}%</span>
                  </div>
                  <span style={{ fontSize: T.caption, color: theme.textMuted }}>
                    vs prior period
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* ── Summary Paragraph ────────────────────────────────── */}
        <div style={{
          fontSize: T.body,
          color: theme.textSecondary,
          lineHeight: 1.5,
          opacity: summaryFade,
          maxWidth: 920,
        }}>
          {spec.summary}
        </div>

        {/* ── Highlight List (staggered entrance) ──────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spec.highlights.map((item, i) => {
            const hlDelay = staggerDelay(i, TIMING.highlightBaseStart, TIMING.highlightStagger);
            const hlSpring = springEntrance(frame, fps, hlDelay, SPRING.default);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  opacity: hlSpring,
                  transform: `translateX(${slideIn(hlSpring, "left", 24)}px)`,
                }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.accent,
                  flexShrink: 0,
                  marginTop: 8,
                }} />
                <div style={{
                  fontSize: T.body,
                  color: theme.textPrimary,
                  lineHeight: 1.3,
                }}>
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Freelancer Credit ────────────────────────────────────── */}
      {spec.freelancer_name && (
        <div style={{
          position: "absolute",
          bottom: 24,
          right: PADDING,
          fontSize: T.caption,
          color: theme.textMuted,
          opacity: creditFade,
        }}>
          {spec.freelancer_name}{spec.freelancer_title ? ` · ${spec.freelancer_title}` : ""}
        </div>
      )}
    </AbsoluteFill>
  );
};
