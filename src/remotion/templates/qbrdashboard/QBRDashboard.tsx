/**
 * QBR Dashboard Template
 *
 * Layouts:
 *   "executive"  → HeroStatShell (revenue hero + key metrics + client cards)
 *   "detailed"   → ListDetailShell (sequential detail sections)
 *   "comparison" → ComparisonShell (quarter-over-quarter comparison)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, GradientBadge,
  HeroStatShell, ListDetailShell, ComparisonShell,
  TYPE,
} from "../_shared";

export interface QBRDashboardSpec {
  business_name: string;
  quarter_label: string;
  key_metrics: Array<{ label: string; value: number; suffix: string; trend: string }>;
  top_clients: Array<{ name: string; revenue: number }>;
  achievements: string[];
  next_quarter_goals: string[];
  total_revenue: number;
  total_projects: number;
  theme?: string;
  layout?: "executive" | "detailed" | "comparison";
}

export const QBRDashboard: React.FC<{ spec: QBRDashboardSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "executive";

  if (layout === "detailed") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.business_name} - ${spec.quarter_label}`}
        subtitle="Quarterly Business Review"
        badge="QBR"
        itemCount={spec.key_metrics.length + spec.top_clients.length}
      >
        {spec.key_metrics.map((m, i) => (
          <GlassCard key={`m-${i}`} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{m.label}</span>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 700, color: theme.accent, fontFamily: theme.fontFamily }}>{m.value}{m.suffix}</span>
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{m.trend}</div>
          </GlassCard>
        ))}
        {spec.top_clients.slice(0, 3).map((c, i) => (
          <GlassCard key={`c-${i}`} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: TYPE.label, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.name}</span>
              <span style={{ fontSize: TYPE.label, color: theme.accent, fontFamily: theme.fontFamily }}>${c.revenue.toLocaleString()}</span>
            </div>
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  if (layout === "comparison") {
    return (
      <ComparisonShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.business_name} - ${spec.quarter_label}`}
        subtitle="Quarterly Business Review"
        leftLabel="Achievements"
        rightLabel="Next Quarter Goals"
      >
        {spec.achievements.slice(0, 3).map((a, i) => (
          <GlassCard key={`a-${i}`} theme={theme} style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: TYPE.label, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{a}</div>
          </GlassCard>
        ))}
        {spec.next_quarter_goals.slice(0, 3).map((g, i) => (
          <GlassCard key={`g-${i}`} theme={theme} style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: TYPE.label, color: theme.textPrimary, fontFamily: theme.fontFamily }}>→ {g}</div>
          </GlassCard>
        ))}
      </ComparisonShell>
    );
  }

  // Default: "executive"
  return (
    <HeroStatShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.business_name} - ${spec.quarter_label}`}
      subtitle="Quarterly Business Review"
      badge="QBR"
      stats={[
        { label: "Revenue", value: spec.total_revenue, suffix: "k" },
        { label: "Projects", value: spec.total_projects },
        ...spec.key_metrics.slice(0, 1).map((m) => ({ label: m.label, value: m.value, suffix: m.suffix })),
      ]}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {spec.top_clients.slice(0, 4).map((c, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.name}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily }}>${c.revenue.toLocaleString()}</div>
          </GlassCard>
        ))}
      </div>
    </HeroStatShell>
  );
};
