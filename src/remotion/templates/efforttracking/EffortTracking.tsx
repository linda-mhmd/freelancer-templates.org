/**
 * Effort Tracking Template
 *
 * Layouts:
 *   "team-allocation" → ContributorShell (team members with individual ProgressBars)
 *   "capacity"        → HeroStatShell (capacity utilization hero + story point breakdown)
 *   "breakdown"       → SplitPanelShell (hours left, story points right)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, ProgressBar,
  HeroStatShell, SplitPanelShell, ContributorShell,
  TYPE,
} from "../_shared";

export interface EffortTrackingSpec {
  project_name: string;
  time_period: string;
  story_points_planned: number;
  story_points_completed: number;
  hours_logged: number;
  team_members: Array<{ name: string; hours_logged: number; story_points_completed: number; allocation_percent: number }>;
  capacity_utilization: number;
  theme?: string;
  layout?: "team-allocation" | "capacity" | "breakdown";
}

export const EffortTracking: React.FC<{ spec: EffortTrackingSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "team-allocation";

  if (layout === "capacity") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Effort`}
        subtitle={spec.time_period}
        badge="Capacity"
        stats={[
          { label: "Utilization", value: spec.capacity_utilization, suffix: "%" },
          { label: "SP Completed", value: spec.story_points_completed },
          { label: "Hours Logged", value: spec.hours_logged },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ProgressBar progress={Math.round((spec.story_points_completed / spec.story_points_planned) * 100)} frame={frame} startFrame={130} theme={theme} label="Story Points" />
          {spec.team_members.slice(0, 4).map((m, i) => (
            <ProgressBar key={i} progress={m.allocation_percent} frame={frame} startFrame={150 + i * 20} theme={theme} label={m.name} height={6} />
          ))}
        </div>
      </HeroStatShell>
    );
  }

  if (layout === "breakdown") {
    return (
      <SplitPanelShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Effort`}
        subtitle={spec.time_period}
        leftContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 4 }}>Hours Logged</div>
            {spec.team_members.map((m, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.name}</div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{m.hours_logged}h logged</div>
              </GlassCard>
            ))}
          </div>
        }
        rightContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 4 }}>Story Points</div>
            {spec.team_members.map((m, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.name}</div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{m.story_points_completed} SP completed</div>
              </GlassCard>
            ))}
          </div>
        }
      />
    );
  }

  // Default: "team-allocation"
  return (
    <ContributorShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.project_name} - Effort`}
      subtitle={spec.time_period}
      contributorCount={spec.team_members.length}
    >
      {spec.team_members.map((m, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.name}</span>
            <span style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{m.hours_logged}h · {m.story_points_completed} SP</span>
          </div>
          <ProgressBar progress={m.allocation_percent} frame={frame} startFrame={60 + i * 25} theme={theme} label="Allocation" height={6} />
        </GlassCard>
      ))}
    </ContributorShell>
  );
};
