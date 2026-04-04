/**
 * Project Health Template
 *
 * Layouts:
 *   "health-scorecard"   → HeroStatShell (completion hero + budget/timeline bars)
 *   "workstream-view"    → ContributorShell (workstreams with individual progress)
 *   "executive-summary"  → StatusBoardShell (completion central + metrics + risks)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, ProgressBar, StatusBadge,
  HeroStatShell, ContributorShell, StatusBoardShell,
  TYPE,
} from "../_shared";

export interface ProjectHealthSpec {
  project_name: string;
  client_name: string;
  project_manager: string;
  health_status: string;
  budget_total: number;
  budget_spent: number;
  timeline_start: string;
  timeline_end: string;
  completion_percent: number;
  workstreams: Array<{ name: string; status: string; progress_percent: number }>;
  risks: Array<{ title: string; severity: string }>;
  theme?: string;
  layout?: "health-scorecard" | "workstream-view" | "executive-summary";
}

export const ProjectHealth: React.FC<{ spec: ProjectHealthSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "health-scorecard";

  if (layout === "workstream-view") {
    return (
      <ContributorShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Health`}
        subtitle={`Client: ${spec.client_name} · PM: ${spec.project_manager}`}
        contributorCount={spec.workstreams.length}
      >
        {spec.workstreams.slice(0, 5).map((w, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{w.name}</span>
              <StatusBadge status={w.status as any} theme={theme} />
            </div>
            <ProgressBar progress={w.progress_percent} frame={frame} startFrame={60 + i * 25} theme={theme} label="Progress" height={6} />
          </GlassCard>
        ))}
      </ContributorShell>
    );
  }

  if (layout === "executive-summary") {
    return (
      <StatusBoardShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Health`}
        subtitle={`Client: ${spec.client_name}`}
        centralMetric={{ label: "Completion", value: spec.completion_percent, suffix: "%" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {spec.workstreams.slice(0, 4).map((w, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "8px 10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: TYPE.caption, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{w.name}</span>
                  <StatusBadge status={w.status as any} theme={theme} />
                </div>
              </GlassCard>
            ))}
          </div>
          {spec.risks.length > 0 && (
            <GlassCard theme={theme} style={{ padding: "8px 10px" }}>
              <div style={{ fontSize: TYPE.caption, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 4 }}>Risks</div>
              {spec.risks.slice(0, 2).map((r, i) => (
                <div key={i} style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{r.title} ({r.severity})</div>
              ))}
            </GlassCard>
          )}
        </div>
      </StatusBoardShell>
    );
  }

  // Default: "health-scorecard"
  const budgetPercent = Math.round((spec.budget_spent / spec.budget_total) * 100);
  return (
    <HeroStatShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.project_name} - Health`}
      subtitle={`Client: ${spec.client_name} · PM: ${spec.project_manager}`}
      badge={spec.health_status}
      stats={[
        { label: "Completion", value: spec.completion_percent, suffix: "%" },
        { label: "Budget Used", value: budgetPercent, suffix: "%" },
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ProgressBar progress={spec.completion_percent} frame={frame} startFrame={130} theme={theme} label="Overall Progress" />
        <ProgressBar progress={budgetPercent} frame={frame} startFrame={150} theme={theme} label="Budget" height={6} />
        {spec.workstreams.slice(0, 3).map((w, i) => (
          <ProgressBar key={i} progress={w.progress_percent} frame={frame} startFrame={170 + i * 20} theme={theme} label={w.name} height={6} />
        ))}
      </div>
    </HeroStatShell>
  );
};
