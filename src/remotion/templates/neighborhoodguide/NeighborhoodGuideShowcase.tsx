import React from "react";
import { NeighborhoodGuide, NeighborhoodGuideSpec } from "./NeighborhoodGuide";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: NeighborhoodGuideSpec = {
  neighborhood_name: "Neubau",
  city_name: "Vienna",
  guide_title: "Neubau Neighborhood Guide",
  categories: [
    { category_name: "Cafés", emoji: "star", places: [
      { name: "Café Harvest", description: "Organic bowls and specialty coffee", rating: 4.8 },
      { name: "Kaffemik", description: "Cozy third-wave coffee spot", rating: 4.5 },
    ]},
    { category_name: "Restaurants", emoji: "star", places: [
      { name: "Ramasuri", description: "Creative Austrian-fusion plates", rating: 4.4 },
      { name: "Tian Bistro", description: "Vegetarian fine dining", rating: 4.7 },
    ]},
    { category_name: "Parks", emoji: "globe", places: [
      { name: "Volksgarten", description: "Rose garden and open-air café", rating: 4.6 },
    ]},
    { category_name: "Shops", emoji: "tag", places: [
      { name: "Die Sellerie", description: "Vintage clothing and vinyl", rating: 4.3 },
    ]},
  ],
  summary: "A vibrant creative district with the best of Vienna's café culture",
  highlights: ["Café Harvest brunch", "Tian Bistro tasting menu", "Volksgarten roses"],
};

export const NeighborhoodGuideExplorerWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "explorer", theme: "warm" }} brandKit={brandKit} />;
export const NeighborhoodGuideExplorerNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "explorer", theme: "neon" }} brandKit={brandKit} />;
export const NeighborhoodGuideHighlightsReelWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "highlights-reel", theme: "warm" }} brandKit={brandKit} />;
export const NeighborhoodGuideHighlightsReelNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "highlights-reel", theme: "neon" }} brandKit={brandKit} />;
export const NeighborhoodGuideOverviewWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "overview", theme: "warm" }} brandKit={brandKit} />;
export const NeighborhoodGuideOverviewNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <NeighborhoodGuide spec={{ ...BASE_SPEC, layout: "overview", theme: "neon" }} brandKit={brandKit} />;
