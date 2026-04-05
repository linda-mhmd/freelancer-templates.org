/**
 * Integration Status Template
 *
 * Layouts:
 *   "status-wall"     → CardGridShell (3-col integration cards)
 *   "category-groups" → CategoryGroupShell (grouped by category)
 *   "health-monitor"  → StatusBoardShell (uptime central + list)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, CountUp,
  CardGridShell, CategoryGroupShell, StatusBoardShell,
  TYPE,
} from "../_shared";

export interface IntegrationStatusSpec {
  board_title: string;
  integrations: Array<{ service_name: string; status: string; category: string; last_sync: string; uptime_percent?: number }>;
  summary: { total: number; connected: number; degraded: number; disconnected: number };
  theme?: string;
  layout?: "status-wall" | "category-groups" | "health-monitor";
}

export const IntegrationStatus: React.FC<{ spec: IntegrationStatusSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "status-wall";

  if (layout === "category-groups") {
    const categories = Array.from(new Set(spec.integrations.map((i) => i.category)));
    return (
      <CategoryGroupShell
        theme={theme} frame={frame} fps={fps}
        title={spec.board_title}
        subtitle={`${spec.summary.connected} of ${spec.summary.total} connected`}
        groups={categories.map((c) => ({ label: c }))}
      >
        {categories.map((cat, ci) => (
          <div key={ci} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {spec.integrations.filter((i) => i.category === cat).map((intg, ii) => (
              <GlassCard key={ii} theme={theme} style={{ padding: "10px 14px", flex: "1 1 180px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{intg.service_name}</span>
                  <StatusBadge status={intg.status as any} theme={theme} />
                </div>
                <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>Last sync: {intg.last_sync}</div>
              </GlassCard>
            ))}
          </div>
        ))}
      </CategoryGroupShell>
    );
  }

  if (layout === "health-monitor") {
    const avgUptime = Math.round(spec.integrations.reduce((sum, i) => sum + (i.uptime_percent ?? 0), 0) / Math.max(1, spec.integrations.length));
    return (
      <StatusBoardShell
        theme={theme} frame={frame} fps={fps}
        title={spec.board_title}
        centralMetric={{ label: "Average Uptime", value: avgUptime, suffix: "%" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {spec.integrations.map((intg, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{intg.service_name}</div>
              <StatusBadge status={intg.status as any} theme={theme} />
            </GlassCard>
          ))}
        </div>
      </StatusBoardShell>
    );
  }

  // Default: "status-wall"
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={spec.board_title}
      subtitle={`${spec.summary.connected} connected · ${spec.summary.degraded} degraded`}
      columns={3}
    >
      {spec.integrations.map((intg, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{intg.service_name}</span>
            <StatusBadge status={intg.status as any} theme={theme} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{intg.category}</div>
          {intg.uptime_percent != null && (
            <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily, marginTop: 4 }}>
              <CountUp target={intg.uptime_percent} frame={frame} startFrame={80} suffix="% uptime" />
            </div>
          )}
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
