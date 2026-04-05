/**
 * Feature Roadmap Template
 *
 * Layouts:
 *   "timeline"  → TimelineShell (horizontal feature timeline)
 *   "swimlane"  → CategoryGroupShell (features grouped by category)
 *   "grid"      → CardGridShell (3-column feature cards)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, ProgressBar,
  TimelineShell, CategoryGroupShell, CardGridShell,
  TYPE,
} from "../_shared";

export interface FeatureRoadmapSpec {
  product_name: string;
  roadmap_title: string;
  time_horizon: string;
  features: Array<{ name: string; description: string; status: string; category: string; progress_percent?: number }>;
  theme?: string;
  layout?: "timeline" | "swimlane" | "grid";
}

export const FeatureRoadmap: React.FC<{ spec: FeatureRoadmapSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "timeline";

  if (layout === "swimlane") {
    const categories = Array.from(new Set(spec.features.map((f) => f.category)));
    return (
      <CategoryGroupShell
        theme={theme} frame={frame} fps={fps}
        title={spec.roadmap_title}
        subtitle={`${spec.product_name} · ${spec.time_horizon}`}
        groups={categories.map((c) => ({ label: c }))}
      >
        {categories.map((cat, ci) => (
          <div key={ci} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {spec.features.filter((f) => f.category === cat).map((f, fi) => (
              <GlassCard key={fi} theme={theme} style={{ padding: "10px 14px", flex: "1 1 200px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{f.name}</span>
                  <StatusBadge status={f.status as any} theme={theme} />
                </div>
                <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{f.description}</div>
              </GlassCard>
            ))}
          </div>
        ))}
      </CategoryGroupShell>
    );
  }

  if (layout === "grid") {
    return (
      <CardGridShell
        theme={theme} frame={frame} fps={fps}
        title={spec.roadmap_title}
        subtitle={`${spec.product_name} · ${spec.time_horizon}`}
        columns={3}
      >
        {spec.features.map((f, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "14px 16px", borderLeft: `3px solid ${theme.accent}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{f.name}</span>
              <StatusBadge status={f.status as any} theme={theme} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily, marginBottom: 8 }}>{f.description}</div>
            {f.progress_percent != null && (
              <ProgressBar progress={f.progress_percent} frame={frame} startFrame={80} theme={theme} height={4} />
            )}
          </GlassCard>
        ))}
      </CardGridShell>
    );
  }

  // Default: "timeline"
  return (
    <TimelineShell
      theme={theme} frame={frame} fps={fps}
      title={spec.roadmap_title}
      subtitle={`${spec.product_name} · ${spec.time_horizon}`}
      direction="horizontal"
      nodeCount={spec.features.length}
    >
      {spec.features.map((f, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginBottom: 4 }}>{f.name}</div>
          <StatusBadge status={f.status as any} theme={theme} />
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 6 }}>{f.description}</div>
        </GlassCard>
      ))}
    </TimelineShell>
  );
};
