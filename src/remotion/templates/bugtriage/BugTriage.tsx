/**
 * Bug Triage Template
 *
 * Layouts:
 *   "priority-columns"   → CategoryGroupShell (bugs grouped by priority)
 *   "triage-list"        → ListDetailShell (ordered bug list with priority badges)
 *   "summary-dashboard"  → HeroStatShell (total triaged hero + priority bars)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge, ProgressBar,
  CategoryGroupShell, ListDetailShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface BugTriageSpec {
  session_title: string;
  session_date: string;
  total_triaged: number;
  bugs: Array<{ title: string; priority: string; assignee: string; effort_estimate: string; resolution_target: string }>;
  priority_counts: { p0: number; p1: number; p2: number; p3: number };
  session_summary: string;
  theme?: string;
  layout?: "priority-columns" | "triage-list" | "summary-dashboard";
}

export const BugTriage: React.FC<{ spec: BugTriageSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "priority-columns";

  if (layout === "triage-list") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={spec.session_title}
        subtitle={spec.session_date}
        badge={`${spec.total_triaged} Triaged`}
        itemCount={spec.bugs.length}
      >
        {spec.bugs.slice(0, 5).map((b, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <GradientBadge text={b.priority} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{b.title}</span>
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{b.assignee} · {b.effort_estimate} · {b.resolution_target}</div>
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  if (layout === "summary-dashboard") {
    const total = spec.priority_counts.p0 + spec.priority_counts.p1 + spec.priority_counts.p2 + spec.priority_counts.p3;
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.session_title}
        subtitle={spec.session_date}
        badge="Triage Summary"
        stats={[
          { label: "Total Triaged", value: spec.total_triaged },
          { label: "P0 Critical", value: spec.priority_counts.p0 },
          { label: "P1 High", value: spec.priority_counts.p1 },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ProgressBar progress={total > 0 ? Math.round((spec.priority_counts.p0 / total) * 100) : 0} frame={frame} startFrame={130} theme={theme} label="P0 Critical" height={6} />
          <ProgressBar progress={total > 0 ? Math.round((spec.priority_counts.p1 / total) * 100) : 0} frame={frame} startFrame={150} theme={theme} label="P1 High" height={6} />
          <ProgressBar progress={total > 0 ? Math.round((spec.priority_counts.p2 / total) * 100) : 0} frame={frame} startFrame={170} theme={theme} label="P2 Medium" height={6} />
          <ProgressBar progress={total > 0 ? Math.round((spec.priority_counts.p3 / total) * 100) : 0} frame={frame} startFrame={190} theme={theme} label="P3 Low" height={6} />
        </div>
      </HeroStatShell>
    );
  }

  // Default: "priority-columns"
  return (
    <CategoryGroupShell
      theme={theme} frame={frame} fps={fps}
      title={spec.session_title}
      subtitle={spec.session_date}
      groups={[
        { label: "P0 Critical", badge: String(spec.priority_counts.p0) },
        { label: "P1 High", badge: String(spec.priority_counts.p1) },
        { label: "P2 Medium", badge: String(spec.priority_counts.p2) },
        { label: "P3 Low", badge: String(spec.priority_counts.p3) },
      ]}
    >
      {spec.bugs.slice(0, 6).map((b, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <GradientBadge text={b.priority} theme={theme} fontSize={9} />
            <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{b.title}</span>
          </div>
          <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{b.assignee} · {b.effort_estimate}</div>
        </GlassCard>
      ))}
    </CategoryGroupShell>
  );
};
