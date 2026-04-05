/**
 * Store Locator Template
 *
 * Layouts:
 *   "finder"    → CardGridShell (2 columns, store cards)
 *   "map-pins"  → StatusBoardShell (total stores central, map pins)
 *   "directory" → CategoryGroupShell (stores grouped by type)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge,
  CardGridShell, StatusBoardShell, CategoryGroupShell,
  TYPE,
} from "../_shared";

export interface StoreLocatorSpec {
  brand_name: string;
  locator_title: string;
  stores: Array<{ store_name: string; address: string; city: string; hours: string; phone: string; store_type: string }>;
  total_stores: number;
  regions_served: number;
  theme?: string;
  layout?: "finder" | "map-pins" | "directory";
}

export const StoreLocator: React.FC<{ spec: StoreLocatorSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "clean"] ?? THEMES.clean, brandKit);
  const layout = spec.layout ?? "finder";

  if (layout === "map-pins") {
    return (
      <StatusBoardShell
        theme={theme} frame={frame} fps={fps}
        title={spec.locator_title}
        subtitle={spec.brand_name}
        centralMetric={{ label: "Total Locations", value: spec.total_stores }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.stores.slice(0, 4).map((s, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{s.store_name}</div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{s.city} · {s.hours}</div>
            </GlassCard>
          ))}
        </div>
      </StatusBoardShell>
    );
  }

  if (layout === "directory") {
    const types = Array.from(new Set(spec.stores.map((s) => s.store_type)));
    return (
      <CategoryGroupShell
        theme={theme} frame={frame} fps={fps}
        title={spec.locator_title}
        subtitle={`${spec.brand_name} · ${spec.regions_served} regions`}
        groups={types.map((t) => ({ label: t }))}
      >
        {spec.stores.slice(0, 6).map((s, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <GradientBadge text={s.store_type} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{s.store_name}</span>
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{s.address}</div>
          </GlassCard>
        ))}
      </CategoryGroupShell>
    );
  }

  // Default: "finder"
  return (
    <CardGridShell
      theme={theme} frame={frame} fps={fps}
      title={spec.locator_title}
      subtitle={`${spec.brand_name} · ${spec.total_stores} locations`}
      columns={2}
    >
      {spec.stores.slice(0, 4).map((s, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginBottom: 4 }}>{s.store_name}</div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{s.address}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>{s.hours} · {s.phone}</div>
        </GlassCard>
      ))}
    </CardGridShell>
  );
};
