import React from "react";
import { EventVenue, EventVenueSpec } from "./EventVenue";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: EventVenueSpec = {
  event_name: "PinBoard Maps Dev Summit 2026",
  event_date: "March 15, 2026",
  venues: [
    { venue_name: "Main Hall", address: "Museumsplatz 1, 1070 Wien", capacity: 500, venue_type: "Keynote", time_slot: "9:00 AM" },
    { venue_name: "Workshop Room A", address: "Museumsplatz 1, 1070 Wien", capacity: 60, venue_type: "Workshop", time_slot: "11:00 AM" },
    { venue_name: "Workshop Room B", address: "Museumsplatz 1, 1070 Wien", capacity: 40, venue_type: "Workshop", time_slot: "2:00 PM" },
    { venue_name: "Networking Lounge", address: "Museumsplatz 1, 1070 Wien", capacity: 150, venue_type: "Social", time_slot: "5:00 PM" },
  ],
  total_attendees: 420,
  total_venues: 4,
  event_description: "Annual developer summit for the PinBoard Maps community",
};

export const EventVenueScheduleMapDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "dark" }} brandKit={brandKit} />;
export const EventVenueScheduleMapBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "bold" }} brandKit={brandKit} />;
export const EventVenueVenueCardsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "dark" }} brandKit={brandKit} />;
export const EventVenueVenueCardsBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "bold" }} brandKit={brandKit} />;
export const EventVenueEventOverviewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "event-overview", theme: "dark" }} brandKit={brandKit} />;
export const EventVenueEventOverviewBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "event-overview", theme: "bold" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const EventVenueOceanScheduleMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "ocean" }} brandKit={brandKit} />;
export const EventVenueSunsetScheduleMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "sunset" }} brandKit={brandKit} />;
export const EventVenueForestVenueCards: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "forest" }} brandKit={brandKit} />;
export const EventVenueRoseVenueCards: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "rose" }} brandKit={brandKit} />;
export const EventVenueGoldEventOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "event-overview", theme: "gold" }} brandKit={brandKit} />;
export const EventVenueMidnightEventOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "event-overview", theme: "midnight" }} brandKit={brandKit} />;
export const EventVenueCrimsonScheduleMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "crimson" }} brandKit={brandKit} />;
export const EventVenueLavenderScheduleMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "schedule-map", theme: "lavender" }} brandKit={brandKit} />;
export const EventVenueArcticVenueCards: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "arctic" }} brandKit={brandKit} />;
export const EventVenueEspressoVenueCards: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EventVenue spec={{ ...BASE_SPEC, layout: "venue-cards", theme: "espresso" }} brandKit={brandKit} />;
