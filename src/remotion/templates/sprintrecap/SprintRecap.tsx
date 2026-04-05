/**
 * Sprint Recap Template
 *
 * Layouts:
 *   "shipped-list"        → TimelineShell (vertical shipped items timeline)
 *   "highlight-cards"     → HeroStatShell (total shipped hero + highlight cards)
 *   "team-contributions"  → ContributorShell (items grouped by contributor)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge,
  TimelineShell, HeroStatShell, ContributorShell,
  TYPE,
} from "../_shared";

export interface SprintRecapSpec {
  sprint_name: string;
  sprint_number: number;
  date_range: string;
  shipped_items: Array<{ title: string; description: string; category: string; contributor: string }>;
  total_shipped: number;
  highlights: string;
  next_sprint_preview: string;
  theme?: string;
  layout?: "shipped-list" | "highlight-cards" | "team-contributions";
}

export const SprintRecap: React.FC<{ spec: SprintRecapSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "shipped-list";

  if (layout === "highlight-cards") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.sprint_name}
        subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
        badge="Recap"
        stats={[{ label: "Shipped", value: spec.total_shipped }]}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.shipped_items.slice(0, 4).map((item, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <GradientBadge text={item.category} theme={theme} fontSize={9} />
              <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginTop: 4 }}>{item.title}</div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{item.description}</div>
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  if (layout === "team-contributions") {
    return (
      <ContributorShell
        theme={theme} frame={frame} fps={fps}
        title={spec.sprint_name}
        subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
        contributorCount={Array.from(new Set(spec.shipped_items.map((i) => i.contributor))).length}
      >
        {spec.shipped_items.slice(0, 6).map((item, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <GradientBadge text={item.contributor} theme={theme} fontSize={9} />
              <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{item.title}</span>
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{item.description}</div>
          </GlassCard>
        ))}
      </ContributorShell>
    );
  }

  // Default: "shipped-list"
  return (
    <TimelineShell
      theme={theme} frame={frame} fps={fps}
      title={spec.sprint_name}
      subtitle={`Sprint ${spec.sprint_number} · ${spec.date_range}`}
      badge="Shipped"
      direction="vertical"
      nodeCount={spec.shipped_items.length}
    >
      {spec.shipped_items.slice(0, 5).map((item, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <GradientBadge text={item.category} theme={theme} fontSize={9} />
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{item.title}</span>
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{item.description}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>by {item.contributor}</div>
        </GlassCard>
      ))}
    </TimelineShell>
  );
};
