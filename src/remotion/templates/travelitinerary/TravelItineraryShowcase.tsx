import React from "react";
import { TravelItinerary, TravelItinerarySpec } from "./TravelItinerary";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: TravelItinerarySpec = {
  trip_title: "5 Days in Japan",
  destination: "Tokyo → Kyoto → Osaka",
  duration: "5 days",
  days: [
    { day_number: 1, location: "Tokyo", activities: ["Shibuya Crossing", "Meiji Shrine", "Harajuku"], highlight: "Explore the electric energy of Shibuya" },
    { day_number: 2, location: "Tokyo", activities: ["Tsukiji Market", "Akihabara", "Senso-ji"], highlight: "Morning sushi at Tsukiji outer market" },
    { day_number: 3, location: "Kyoto", activities: ["Fushimi Inari", "Arashiyama", "Tea Ceremony"], highlight: "Walk through 10,000 torii gates" },
    { day_number: 4, location: "Kyoto", activities: ["Kinkaku-ji", "Nishiki Market", "Gion"], highlight: "Golden Pavilion at sunset" },
    { day_number: 5, location: "Osaka", activities: ["Dotonbori", "Osaka Castle", "Street Food Tour"], highlight: "Takoyaki and okonomiyaki crawl" },
  ],
  total_stops: 15,
  summary: "A whirlwind tour through Japan's cultural heartland",
};

export const TravelItineraryDayByDayWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "warm" }} brandKit={brandKit} />;
export const TravelItineraryDayByDayBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "bold" }} brandKit={brandKit} />;
export const TravelItineraryRouteOverviewWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "warm" }} brandKit={brandKit} />;
export const TravelItineraryRouteOverviewBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "bold" }} brandKit={brandKit} />;
export const TravelItineraryHighlightsWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "highlights", theme: "warm" }} brandKit={brandKit} />;
export const TravelItineraryHighlightsBold: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "highlights", theme: "bold" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const TravelItineraryOceanDayByDay: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "ocean" }} brandKit={brandKit} />;
export const TravelItinerarySunsetDayByDay: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "sunset" }} brandKit={brandKit} />;
export const TravelItineraryForestRouteOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "forest" }} brandKit={brandKit} />;
export const TravelItineraryRoseRouteOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "rose" }} brandKit={brandKit} />;
export const TravelItineraryGoldHighlights: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "highlights", theme: "gold" }} brandKit={brandKit} />;
export const TravelItineraryMidnightHighlights: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "highlights", theme: "midnight" }} brandKit={brandKit} />;
export const TravelItineraryCrimsonDayByDay: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "crimson" }} brandKit={brandKit} />;
export const TravelItineraryLavenderDayByDay: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "day-by-day", theme: "lavender" }} brandKit={brandKit} />;
export const TravelItineraryArcticRouteOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "arctic" }} brandKit={brandKit} />;
export const TravelItineraryEspressoRouteOverview: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <TravelItinerary spec={{ ...BASE_SPEC, layout: "route-overview", theme: "espresso" }} brandKit={brandKit} />;
