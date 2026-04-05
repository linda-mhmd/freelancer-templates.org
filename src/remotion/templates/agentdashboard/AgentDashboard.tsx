/**
 * Agent Dashboard Template
 *
 * Layouts:
 *   "control-panel" → CardGridShell (2-col agent cards + queue footer)
 *   "flow"          → PipelineShell (agent handoff pipeline)
 *   "matrix"        → CardGridShell (3-col agent matrix)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, CountUp,
  CardGridShell, PipelineShell,
  TYPE,
} from "../_shared";

export interface AgentDashboardSpec {
  dashboard_title: string;
  agents: Array<{ name: string; role: string; status: string; tasks_completed: number; current_task: string }>;
  queue_stats: { pending: number; processing: number; completed: number; failed: number };
  recent_completions: Array<{ task_name: string; timestamp: string }>;
  theme?: string;
  layout?: "control-panel" | "flow" | "matrix";
}

export const AgentDashboard: React.FC<{ spec: AgentDashboardSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "control-panel";

  if (layout === "flow") {
    return (
      <PipelineShell
        theme={theme} frame={frame} fps={fps}
        title={spec.dashboard_title}
        subtitle={`${spec.agents.length} agents active`}
        stageCount={spec.agents.length}
      >
        {spec.agents.map((a, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px", height: "100%" }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginBottom: 4 }}>{a.name}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginBottom: 6 }}>{a.role}</div>
            <StatusBadge status={a.status as any} theme={theme} />
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily, marginTop: 8 }}>{a.current_task}</div>
          </GlassCard>
        ))}
      </PipelineShell>
    );
  }

  if (layout === "matrix") {
    return (
      <CardGridShell
        theme={theme} frame={frame} fps={fps}
        title={spec.dashboard_title}
        columns={3}
      >
        {spec.agents.map((a, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{a.name}</span>
              <StatusBadge status={a.status as any} theme={theme} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{a.role}</div>
            <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent, fontFamily: theme.fontFamily, marginTop: 8 }}>
              <CountUp target={a.tasks_completed} frame={frame} startFrame={80} />
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily }}>tasks done</div>
          </GlassCard>
        ))}
      </CardGridShell>
    );
  }

  // Default: "control-panel"
  const total = spec.queue_stats.pending + spec.queue_stats.processing + spec.queue_stats.completed + spec.queue_stats.failed;
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={spec.dashboard_title}
      subtitle={`Queue: ${total} tasks`}
      columns={2}
      footer={
        <GlassCard theme={theme} style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Pending", value: spec.queue_stats.pending },
              { label: "Processing", value: spec.queue_stats.processing },
              { label: "Completed", value: spec.queue_stats.completed },
              { label: "Failed", value: spec.queue_stats.failed },
            ].map((q, i) => (
              <div key={i}>
                <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary, fontFamily: theme.fontFamily }}>
                  <CountUp target={q.value} frame={frame} startFrame={160 + i * 20} />
                </div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{q.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      }
    >
      {spec.agents.map((a, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{a.name}</span>
            <StatusBadge status={a.status as any} theme={theme} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{a.role}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 6 }}>Current: {a.current_task}</div>
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
