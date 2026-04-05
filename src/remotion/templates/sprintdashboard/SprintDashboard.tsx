/**
 * Sprint Dashboard Template
 *
 * Visualizes sprint progress with task counts, velocity, team allocation,
 * and deliverable status. Three layout variants over shared shells.
 *
 * Layouts:
 *   "kanban"   → CardGridShell (3 columns, deliverables grouped by status)
 *   "velocity" → HeroStatShell (velocity hero stat + task breakdown)
 *   "burndown" → TimelineShell (vertical deliverable timeline)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, ProgressBar,
  HeroStatShell, CardGridShell, TimelineShell,
  TYPE,
} from "../_shared";

// ── Spec ────────────────────────────────────────────────────────

export interface SprintDashboardSpec {
  sprint_name: string;
  sprint_number: number;
  date_range: string;
  tasks_completed: number;
  tasks_in_progress: number;
  tasks_remaining: number;
  velocity: number;
  velocity_trend: string;
  team_members: Array<{ name: string; allocation_percent: number }>;
  deliverables: Array<{ title: string; status: string }>;
  theme?: string;
  layout?: "kanban" | "velocity" | "burndown";
}

// ── Component ───────────────────────────────────────────────────

export const SprintDashboard: React.FC<{ spec: SprintDashboardSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "kanban";

  if (layout === "velocity") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.sprint_name}
        subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
        badge={spec.velocity_trend}
        stats={[
          { label: "Velocity", value: spec.velocity, suffix: " pts" },
          { label: "Completed", value: spec.tasks_completed },
          { label: "In Progress", value: spec.tasks_in_progress },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ProgressBar
            progress={Math.round((spec.tasks_completed / (spec.tasks_completed + spec.tasks_in_progress + spec.tasks_remaining)) * 100)}
            frame={frame} startFrame={130} theme={theme} label="Sprint Progress"
          />
          {spec.team_members.slice(0, 4).map((m, i) => (
            <ProgressBar
              key={i}
              progress={m.allocation_percent}
              frame={frame} startFrame={150 + i * 20} theme={theme}
              label={m.name} height={6}
            />
          ))}
        </div>
      </HeroStatShell>
    );
  }

  if (layout === "burndown") {
    return (
      <TimelineShell
        theme={theme} frame={frame} fps={fps}
        title={spec.sprint_name}
        subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
        direction="vertical"
        nodeCount={spec.deliverables.length}
        nodeDelay={40} staggerGap={25}
      >
        {spec.deliverables.map((d, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>
                {d.title}
              </span>
              <StatusBadge status={d.status as any} theme={theme} />
            </div>
          </GlassCard>
        ))}
      </TimelineShell>
    );
  }

  // Default: "kanban"
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={spec.sprint_name}
      subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
      columns={3}
      cardDelay={60} staggerGap={20}
    >
      {spec.deliverables.map((d, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginBottom: 8 }}>
            {d.title}
          </div>
          <StatusBadge status={d.status as any} theme={theme} />
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
