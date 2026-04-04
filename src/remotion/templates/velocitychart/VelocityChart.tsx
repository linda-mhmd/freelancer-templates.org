/**
 * Velocity Chart Template
 *
 * Layouts:
 *   "bar-chart"  → SplitPanelShell (bar viz left, sprint legend right)
 *   "trend-line" → ComparisonShell (velocity trend with average overlay)
 *   "summary"    → HeroStatShell (avg velocity hero + sprint cards)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, ProgressBar,
  SplitPanelShell, ComparisonShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface VelocityChartSpec {
  team_name: string;
  sprints: Array<{ sprint_label: string; planned_points: number; completed_points: number; carry_over_points: number }>;
  average_velocity: number;
  velocity_trend: string;
  team_capacity: number;
  theme?: string;
  layout?: "bar-chart" | "trend-line" | "summary";
}

export const VelocityChart: React.FC<{ spec: VelocityChartSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "bar-chart";

  if (layout === "trend-line") {
    return (
      <ComparisonShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.team_name} - Velocity Trend`}
        subtitle={spec.velocity_trend}
        leftLabel="Planned"
        rightLabel="Completed"
      >
        {spec.sprints.slice(0, 6).map((s, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: TYPE.caption, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily }}>{s.sprint_label}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{s.planned_points} planned</span>
              <span style={{ fontSize: TYPE.label, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{s.completed_points} done</span>
            </div>
          </GlassCard>
        ))}
      </ComparisonShell>
    );
  }

  if (layout === "summary") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.team_name} - Velocity`}
        subtitle={spec.velocity_trend}
        badge="Summary"
        stats={[
          { label: "Avg Velocity", value: spec.average_velocity, suffix: " pts" },
          { label: "Capacity", value: spec.team_capacity, suffix: " pts" },
        ]}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.sprints.slice(0, 4).map((s, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: TYPE.caption, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily }}>{s.sprint_label}</div>
              <ProgressBar progress={Math.round((s.completed_points / s.planned_points) * 100)} frame={frame} startFrame={130 + i * 20} theme={theme} label={`${s.completed_points}/${s.planned_points}`} height={6} />
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  // Default: "bar-chart"
  const maxPoints = Math.max(...spec.sprints.map((s) => s.planned_points));
  return (
    <SplitPanelShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.team_name} - Velocity`}
      subtitle={spec.velocity_trend}
      leftContent={
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: "100%", paddingBottom: 12 }}>
          {spec.sprints.slice(0, 6).map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 }}>
              <div style={{ width: "100%", background: theme.accent, borderRadius: 4, height: `${(s.completed_points / maxPoints) * 100}%`, minHeight: 8, opacity: 0.8 }} />
              <div style={{ fontSize: 8, color: theme.textMuted, fontFamily: theme.fontFamily }}>{s.sprint_label}</div>
            </div>
          ))}
        </div>
      }
      rightContent={
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {spec.sprints.slice(0, 6).map((s, i) => (
            <div key={i} style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>
              <span style={{ fontWeight: 600, color: theme.textPrimary }}>{s.sprint_label}:</span> {s.completed_points}/{s.planned_points} pts
            </div>
          ))}
        </div>
      }
    />
  );
};
