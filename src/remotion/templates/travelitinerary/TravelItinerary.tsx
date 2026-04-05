/**
 * Travel Itinerary Template
 *
 * Layouts:
 *   "day-by-day"      → TimelineShell (vertical day timeline)
 *   "route-overview"  → TimelineShell (horizontal route markers)
 *   "highlights"      → HeroStatShell (total stops hero + highlight cards)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge,
  TimelineShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface TravelItinerarySpec {
  trip_title: string;
  destination: string;
  duration: string;
  days: Array<{ day_number: number; location: string; activities: string[]; highlight: string }>;
  total_stops: number;
  summary: string;
  theme?: string;
  layout?: "day-by-day" | "route-overview" | "highlights";
}

export const TravelItinerary: React.FC<{ spec: TravelItinerarySpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "warm"] ?? THEMES.warm, brandKit);
  const layout = spec.layout ?? "day-by-day";

  if (layout === "route-overview") {
    return (
      <TimelineShell
        theme={theme} frame={frame} fps={fps}
        title={spec.trip_title}
        subtitle={`${spec.destination} · ${spec.duration}`}
        direction="horizontal"
        nodeCount={spec.days.length}
      >
        {spec.days.slice(0, 5).map((d, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px", minWidth: 140 }}>
            <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily, fontWeight: 600 }}>Day {d.day_number}</div>
            <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{d.location}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{d.highlight}</div>
          </GlassCard>
        ))}
      </TimelineShell>
    );
  }

  if (layout === "highlights") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.trip_title}
        subtitle={`${spec.destination} · ${spec.duration}`}
        badge="Travel Guide"
        stats={[
          { label: "Days", value: spec.days.length },
          { label: "Stops", value: spec.total_stops },
        ]}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {spec.days.slice(0, 4).map((d, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <GradientBadge text={`Day ${d.day_number}`} theme={theme} fontSize={9} />
              <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, marginTop: 4 }}>{d.location}</div>
              <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{d.highlight}</div>
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  // Default: "day-by-day"
  return (
    <TimelineShell
      theme={theme} frame={frame} fps={fps}
      title={spec.trip_title}
      subtitle={`${spec.destination} · ${spec.duration}`}
      badge="Itinerary"
      direction="vertical"
      nodeCount={spec.days.length}
    >
      {spec.days.slice(0, 5).map((d, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <GradientBadge text={`Day ${d.day_number}`} theme={theme} fontSize={9} />
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{d.location}</span>
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{d.highlight}</div>
          <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>{d.activities.join(" · ")}</div>
        </GlassCard>
      ))}
    </TimelineShell>
  );
};
