/**
 * Bug Tracker Template
 *
 * Layouts:
 *   "severity-matrix" → StatusBoardShell (resolution rate central + severity grid)
 *   "triage-board"    → ContributorShell (bugs grouped by status columns)
 *   "overview"        → HeroStatShell (resolution rate hero + breakdown)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, StatusBadge, ProgressBar,
  StatusBoardShell, ContributorShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface BugTrackerSpec {
  project_name: string;
  time_period: string;
  severity_counts: { critical: number; high: number; medium: number; low: number };
  status_counts: { open: number; in_progress: number; resolved: number; closed: number };
  recent_bugs: Array<{ title: string; severity: string; assignee: string; status: string }>;
  resolution_rate: number;
  theme?: string;
  layout?: "severity-matrix" | "triage-board" | "overview";
}

export const BugTracker: React.FC<{ spec: BugTrackerSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "severity-matrix";

  if (layout === "triage-board") {
    const statuses = ["open", "in_progress", "resolved", "closed"] as const;
    const statusLabels: Record<string, string> = { open: "Open", in_progress: "In Progress", resolved: "Resolved", closed: "Closed" };
    return (
      <ContributorShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Bug Triage`}
        subtitle={spec.time_period}
        contributorCount={statuses.length}
      >
        {statuses.map((status, si) => (
          <div key={si}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 8 }}>
              {statusLabels[status]} ({spec.status_counts[status]})
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {spec.recent_bugs.filter((b) => b.status === status).map((b, bi) => (
                <GlassCard key={bi} theme={theme} style={{ padding: "8px 12px", flex: "1 1 200px" }}>
                  <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{b.title}</div>
                  <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 2 }}>{b.assignee}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </ContributorShell>
    );
  }

  if (layout === "overview") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Bug Overview`}
        subtitle={spec.time_period}
        stats={[
          { label: "Resolution Rate", value: spec.resolution_rate, suffix: "%" },
          { label: "Open", value: spec.status_counts.open },
          { label: "Resolved", value: spec.status_counts.resolved },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(["critical", "high", "medium", "low"] as const).map((sev, i) => (
            <ProgressBar
              key={i}
              progress={Math.round((spec.severity_counts[sev] / Math.max(1, spec.severity_counts.critical + spec.severity_counts.high + spec.severity_counts.medium + spec.severity_counts.low)) * 100)}
              frame={frame} startFrame={130 + i * 20} theme={theme}
              label={`${sev.charAt(0).toUpperCase() + sev.slice(1)} (${spec.severity_counts[sev]})`} height={6}
            />
          ))}
        </div>
      </HeroStatShell>
    );
  }

  // Default: "severity-matrix"
  return (
    <StatusBoardShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.project_name} - Bug Tracker`}
      subtitle={spec.time_period}
      centralMetric={{ label: "Resolution Rate", value: spec.resolution_rate, suffix: "%" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {(["critical", "high", "medium", "low"] as const).map((sev, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, textTransform: "capitalize" }}>{sev}</div>
            <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent, fontFamily: theme.fontFamily }}>{spec.severity_counts[sev]}</div>
          </GlassCard>
        ))}
      </div>
    </StatusBoardShell>
  );
};
