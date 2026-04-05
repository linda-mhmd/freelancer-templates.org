/**
 * Pin Collection Template
 *
 * Layouts:
 *   "card-gallery"  → ListDetailShell (scrolling pin cards with StarRating)
 *   "map-list"      → SplitPanelShell (stylized map left, pin list right)
 *   "category-grid" → CategoryGroupShell (pins grouped by category)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StarRating, GradientBadge,
  ListDetailShell, SplitPanelShell, CategoryGroupShell,
  TYPE,
} from "../_shared";

export interface PinCollectionSpec {
  collection_title: string;
  collection_description: string;
  curator_name: string;
  pins: Array<{ place_name: string; category: string; description: string; rating: number; tags?: string[] }>;
  total_pins: number;
  region: string;
  theme?: string;
  layout?: "card-gallery" | "map-list" | "category-grid";
}

export const PinCollection: React.FC<{ spec: PinCollectionSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "warm"] ?? THEMES.warm, brandKit);
  const layout = spec.layout ?? "card-gallery";

  if (layout === "map-list") {
    return (
      <SplitPanelShell
        theme={theme} frame={frame} fps={fps}
        title={spec.collection_title}
        subtitle={`${spec.region} · Curated by ${spec.curator_name}`}
        leftContent={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
            <svg viewBox="0 0 24 24" width={48} height={48} style={{ opacity: 0.3 }} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <div style={{ fontSize: TYPE.cardTitle, color: theme.textSecondary, fontFamily: theme.fontFamily, textAlign: "center" }}>{spec.region}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily }}>{spec.total_pins} pins</div>
          </div>
        }
        rightContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {spec.pins.slice(0, 5).map((p, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{p.place_name}</span>
                  <StarRating rating={p.rating} frame={frame} startFrame={60 + i * 20} fps={fps} size={10} />
                </div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{p.description}</div>
              </GlassCard>
            ))}
          </div>
        }
      />
    );
  }

  if (layout === "category-grid") {
    const categories = Array.from(new Set(spec.pins.map((p) => p.category)));
    return (
      <CategoryGroupShell
        theme={theme} frame={frame} fps={fps}
        title={spec.collection_title}
        subtitle={`${spec.region} · ${spec.total_pins} pins`}
        groups={categories.map((c) => ({ label: c }))}
      >
        {spec.pins.slice(0, 6).map((p, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <GradientBadge text={p.category} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{p.place_name}</span>
            </div>
            <StarRating rating={p.rating} frame={frame} startFrame={60 + i * 20} fps={fps} size={10} />
          </GlassCard>
        ))}
      </CategoryGroupShell>
    );
  }

  // Default: "card-gallery"
  return (
    <ListDetailShell
      theme={theme} frame={frame} fps={fps}
      title={spec.collection_title}
      subtitle={`${spec.region} · Curated by ${spec.curator_name}`}
      badge={`${spec.total_pins} Pins`}
      itemCount={spec.pins.length}
    >
      {spec.pins.slice(0, 5).map((p, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{p.place_name}</span>
            <StarRating rating={p.rating} frame={frame} startFrame={60 + i * 20} fps={fps} size={11} />
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{p.description}</div>
          {p.tags && <div style={{ display: "flex", gap: 6, marginTop: 6 }}>{p.tags.slice(0, 3).map((t, j) => <GradientBadge key={j} text={t} theme={theme} fontSize={8} />)}</div>}
        </GlassCard>
      ))}
    </ListDetailShell>
  );
};
