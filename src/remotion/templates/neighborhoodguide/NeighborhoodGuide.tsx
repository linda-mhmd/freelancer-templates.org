/**
 * Neighborhood Guide Template
 *
 * Layouts:
 *   "explorer"        → CategoryGroupShell (places grouped by category)
 *   "highlights-reel" → ListDetailShell (sequential highlight cards)
 *   "overview"        → HeroStatShell (summary stats + categorized grid)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, StarRating, GradientBadge,
  CategoryGroupShell, ListDetailShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface NeighborhoodGuideSpec {
  neighborhood_name: string;
  city_name: string;
  guide_title: string;
  categories: Array<{ category_name: string; emoji: string; places: Array<{ name: string; description: string; rating?: number }> }>;
  summary: string;
  highlights: string[];
  theme?: string;
  layout?: "explorer" | "highlights-reel" | "overview";
}

export const NeighborhoodGuide: React.FC<{ spec: NeighborhoodGuideSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "warm"] ?? THEMES.warm, brandKit);
  const layout = spec.layout ?? "explorer";

  if (layout === "highlights-reel") {
    const allPlaces = spec.categories.flatMap((c) => c.places.map((p) => ({ ...p, category: c.category_name })));
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={spec.guide_title}
        subtitle={`${spec.neighborhood_name}, ${spec.city_name}`}
        badge="Guide"
        itemCount={allPlaces.length}
      >
        {allPlaces.slice(0, 5).map((p, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <GradientBadge text={p.category} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{p.name}</span>
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{p.description}</div>
            {p.rating && <StarRating rating={p.rating} frame={frame} startFrame={60 + i * 20} fps={fps} size={10} />}
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  if (layout === "overview") {
    const totalPlaces = spec.categories.reduce((sum, c) => sum + c.places.length, 0);
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.guide_title}
        subtitle={`${spec.neighborhood_name}, ${spec.city_name}`}
        badge="Neighborhood"
        stats={[
          { label: "Categories", value: spec.categories.length },
          { label: "Places", value: totalPlaces },
        ]}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.categories.slice(0, 4).map((c, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.emoji} {c.category_name}</div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.places.length} places</div>
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  // Default: "explorer"
  return (
    <CategoryGroupShell
      theme={theme} frame={frame} fps={fps}
      title={spec.guide_title}
      subtitle={`${spec.neighborhood_name}, ${spec.city_name}`}
      groups={spec.categories.map((c) => ({ label: `${c.emoji} ${c.category_name}` }))}
    >
      {spec.categories.flatMap((c) => c.places).slice(0, 6).map((p, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{p.name}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{p.description}</div>
          {p.rating && <StarRating rating={p.rating} frame={frame} startFrame={60 + i * 20} fps={fps} size={10} />}
        </GlassCard>
      ))}
    </CategoryGroupShell>
  );
};
