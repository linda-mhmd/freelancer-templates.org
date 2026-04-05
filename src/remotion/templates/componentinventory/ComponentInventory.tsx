/**
 * Component Inventory Template
 *
 * Layouts:
 *   "architecture-grid" → CardGridShell (3 columns, component cards by type)
 *   "dependency-map"    → StatusBoardShell (total central + component cards)
 *   "inventory-list"    → ListDetailShell (detailed component list)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StatusBadge, GradientBadge,
  CardGridShell, StatusBoardShell, ListDetailShell,
  TYPE,
} from "../_shared";

export interface ComponentInventorySpec {
  system_name: string;
  components: Array<{ name: string; type: string; status: string; description: string; version: string; dependency_count: number }>;
  total_components: number;
  architecture_summary: string;
  theme?: string;
  layout?: "architecture-grid" | "dependency-map" | "inventory-list";
}

export const ComponentInventory: React.FC<{ spec: ComponentInventorySpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "architecture-grid";

  if (layout === "dependency-map") {
    return (
      <StatusBoardShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.system_name} - Architecture`}
        subtitle={spec.architecture_summary}
        centralMetric={{ label: "Components", value: spec.total_components }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.components.slice(0, 4).map((c, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.name}</span>
                <StatusBadge status={c.status as any} theme={theme} />
              </div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.dependency_count} deps · {c.version}</div>
            </GlassCard>
          ))}
        </div>
      </StatusBoardShell>
    );
  }

  if (layout === "inventory-list") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.system_name} - Component Inventory`}
        subtitle={spec.architecture_summary}
        badge={`${spec.total_components} Components`}
        itemCount={spec.components.length}
      >
        {spec.components.slice(0, 5).map((c, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.name}</span>
              <StatusBadge status={c.status as any} theme={theme} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.description}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <GradientBadge text={c.type} theme={theme} fontSize={9} />
              <GradientBadge text={c.version} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily }}>{c.dependency_count} deps</span>
            </div>
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  // Default: "architecture-grid"
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.system_name} - Architecture`}
      subtitle={spec.architecture_summary}
      columns={3}
    >
      {spec.components.slice(0, 6).map((c, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.name}</span>
            <StatusBadge status={c.status as any} theme={theme} />
          </div>
          <GradientBadge text={c.type} theme={theme} fontSize={9} />
          <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily, marginTop: 4 }}>{c.version} · {c.dependency_count} deps</div>
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
