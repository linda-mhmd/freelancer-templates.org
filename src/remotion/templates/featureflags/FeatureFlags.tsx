/**
 * Feature Flags Template
 *
 * Layouts:
 *   "experiment-board" → CardGridShell (2 columns, flag cards with rollout bars)
 *   "results-view"     → ListDetailShell (completed experiments with winners)
 *   "rollout-tracker"  → ListDetailShell (flags with rollout ProgressBars)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, ProgressBar, StatusBadge, GradientBadge,
  CardGridShell, ListDetailShell,
  TYPE,
} from "../_shared";

export interface FeatureFlagsSpec {
  project_name: string;
  flags: Array<{ flag_name: string; status: string; rollout_percent: number; description: string; variant_count: number; winner?: string }>;
  active_experiments: number;
  total_flags: number;
  theme?: string;
  layout?: "experiment-board" | "results-view" | "rollout-tracker";
}

export const FeatureFlags: React.FC<{ spec: FeatureFlagsSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "experiment-board";

  if (layout === "results-view") {
    const completed = spec.flags.filter((f) => f.winner);
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Experiment Results`}
        subtitle={`${spec.total_flags} flags · ${spec.active_experiments} active`}
        badge="Results"
        itemCount={completed.length || spec.flags.length}
      >
        {(completed.length > 0 ? completed : spec.flags).slice(0, 5).map((f, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{f.flag_name}</span>
              <StatusBadge status={f.status as any} theme={theme} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{f.description}</div>
            {f.winner && <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily, marginTop: 4 }}>Winner: {f.winner}</div>}
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  if (layout === "rollout-tracker") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Rollout Tracker`}
        subtitle={`${spec.total_flags} flags · ${spec.active_experiments} active`}
        itemCount={spec.flags.length}
      >
        {spec.flags.slice(0, 5).map((f, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{f.flag_name}</span>
              <GradientBadge text={`${f.variant_count} variants`} theme={theme} fontSize={9} />
            </div>
            <ProgressBar progress={f.rollout_percent} frame={frame} startFrame={60 + i * 20} theme={theme} label="Rollout" height={6} />
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  // Default: "experiment-board"
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.project_name} - Feature Flags`}
      subtitle={`${spec.total_flags} flags · ${spec.active_experiments} active experiments`}
      columns={2}
    >
      {spec.flags.slice(0, 4).map((f, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{f.flag_name}</span>
            <StatusBadge status={f.status as any} theme={theme} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily, marginBottom: 6 }}>{f.description}</div>
          <ProgressBar progress={f.rollout_percent} frame={frame} startFrame={80 + i * 20} theme={theme} label="Rollout" height={6} />
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
