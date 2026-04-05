/**
 * Platform Overview Template
 *
 * Layouts:
 *   "command-center" → StatusBoardShell (central metric + module cards)
 *   "module-grid"    → CardGridShell (3-column module cards)
 *   "stack"          → ListDetailShell (vertical module stack)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, CountUp,
  StatusBoardShell, CardGridShell, ListDetailShell,
  TYPE,
} from "../_shared";

export interface PlatformOverviewSpec {
  platform_name: string;
  tagline: string;
  modules: Array<{ name: string; status: string; description: string; metric_label?: string; metric_value?: number }>;
  summary_stats: Array<{ label: string; value: number; suffix?: string }>;
  theme?: string;
  layout?: "command-center" | "module-grid" | "stack";
}

export const PlatformOverview: React.FC<{ spec: PlatformOverviewSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "command-center";

  if (layout === "module-grid") {
    return (
      <CardGridShell
        theme={theme} frame={frame} fps={fps}
        title={spec.platform_name}
        subtitle={spec.tagline}
        columns={3}
      >
        {spec.modules.map((m, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.name}</span>
              <StatusBadge status={m.status as any} theme={theme} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{m.description}</div>
            {m.metric_value != null && (
              <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.accent, fontFamily: theme.fontFamily, marginTop: 8 }}>
                <CountUp target={m.metric_value} frame={frame} startFrame={90} suffix={m.metric_label ? ` ${m.metric_label}` : ""} />
              </div>
            )}
          </GlassCard>
        ))}
      </CardGridShell>
    );
  }

  if (layout === "stack") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={spec.platform_name}
        subtitle={spec.tagline}
        itemCount={spec.modules.length}
      >
        {spec.modules.map((m, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.name}</span>
                <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily, marginTop: 2 }}>{m.description}</div>
              </div>
              <StatusBadge status={m.status as any} theme={theme} />
            </div>
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  // Default: "command-center"
  const totalModules = spec.modules.length;
  return (
    <StatusBoardShell
      theme={theme} frame={frame} fps={fps}
      title={spec.platform_name}
      subtitle={spec.tagline}
      centralMetric={spec.summary_stats[0] ?? { label: "Modules", value: totalModules }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {spec.modules.map((m, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 14px" }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginBottom: 4 }}>{m.name}</div>
            <StatusBadge status={m.status as any} theme={theme} />
          </GlassCard>
        ))}
      </div>
    </StatusBoardShell>
  );
};
