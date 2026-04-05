/**
 * Event Venue Template
 *
 * Layouts:
 *   "schedule-map"   → TimelineShell (vertical venue timeline with time slots)
 *   "venue-cards"    → CardGridShell (2 columns, venue cards)
 *   "event-overview" → HeroStatShell (total attendees hero + venue list)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge, StatusBadge,
  TimelineShell, CardGridShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface EventVenueSpec {
  event_name: string;
  event_date: string;
  venues: Array<{ venue_name: string; address: string; capacity: number; venue_type: string; time_slot: string }>;
  total_attendees: number;
  total_venues: number;
  event_description: string;
  theme?: string;
  layout?: "schedule-map" | "venue-cards" | "event-overview";
}

export const EventVenue: React.FC<{ spec: EventVenueSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "schedule-map";

  if (layout === "venue-cards") {
    return (
      <CardGridShell
        theme={theme} frame={frame} fps={fps}
        title={spec.event_name}
        subtitle={spec.event_date}
        columns={2}
      >
        {spec.venues.slice(0, 4).map((v, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{v.venue_name}</span>
              <GradientBadge text={v.venue_type} theme={theme} fontSize={9} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{v.address}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>{v.time_slot} · Capacity: {v.capacity}</div>
          </GlassCard>
        ))}
      </CardGridShell>
    );
  }

  if (layout === "event-overview") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.event_name}
        subtitle={spec.event_date}
        badge="Event"
        stats={[
          { label: "Attendees", value: spec.total_attendees },
          { label: "Venues", value: spec.total_venues },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spec.venues.slice(0, 4).map((v, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{v.venue_name}</span>
                <span style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{v.time_slot}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  // Default: "schedule-map"
  return (
    <TimelineShell
      theme={theme} frame={frame} fps={fps}
      title={spec.event_name}
      subtitle={spec.event_date}
      badge="Schedule"
      direction="vertical"
      nodeCount={spec.venues.length}
    >
      {spec.venues.slice(0, 5).map((v, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <GradientBadge text={v.time_slot} theme={theme} fontSize={9} />
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{v.venue_name}</span>
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{v.address} · Capacity: {v.capacity}</div>
        </GlassCard>
      ))}
    </TimelineShell>
  );
};
