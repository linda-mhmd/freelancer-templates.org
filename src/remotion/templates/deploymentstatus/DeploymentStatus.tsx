/**
 * Deployment Status Template
 *
 * Layouts:
 *   "environment-cards" → ListDetailShell (vertical env cards)
 *   "pipeline-view"     → PipelineShell (dev → staging → prod pipeline)
 *   "health-dashboard"  → StatusBoardShell (uptime central + env grid)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, GradientBadge,
  ListDetailShell, PipelineShell, StatusBoardShell,
  TYPE,
} from "../_shared";

export interface DeploymentStatusSpec {
  project_name: string;
  environments: Array<{ env_name: string; version: string; status: string; last_deploy: string; deployer: string }>;
  total_deployments: number;
  uptime_percent: number;
  theme?: string;
  layout?: "environment-cards" | "pipeline-view" | "health-dashboard";
}

export const DeploymentStatus: React.FC<{ spec: DeploymentStatusSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "environment-cards";

  if (layout === "pipeline-view") {
    return (
      <PipelineShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Deployment Pipeline`}
        subtitle={`${spec.total_deployments} deployments`}
        stageCount={spec.environments.length}
      >
        {spec.environments.slice(0, 4).map((e, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px", minWidth: 140 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{e.env_name}</div>
            <GradientBadge text={e.version} theme={theme} fontSize={9} />
            <StatusBadge status={e.status as any} theme={theme} />
          </GlassCard>
        ))}
      </PipelineShell>
    );
  }

  if (layout === "health-dashboard") {
    return (
      <StatusBoardShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.project_name} - Health`}
        subtitle={`${spec.total_deployments} deployments`}
        centralMetric={{ label: "Uptime", value: spec.uptime_percent, suffix: "%" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.environments.slice(0, 4).map((e, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{e.env_name}</span>
                <StatusBadge status={e.status as any} theme={theme} />
              </div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{e.version}</div>
            </GlassCard>
          ))}
        </div>
      </StatusBoardShell>
    );
  }

  // Default: "environment-cards"
  return (
    <ListDetailShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.project_name} - Deployments`}
      subtitle={`${spec.total_deployments} total deployments`}
      itemCount={spec.environments.length}
    >
      {spec.environments.slice(0, 5).map((e, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{e.env_name}</span>
            <StatusBadge status={e.status as any} theme={theme} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{e.version} · Deployed by {e.deployer}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>{e.last_deploy}</div>
        </GlassCard>
      ))}
    </ListDetailShell>
  );
};
