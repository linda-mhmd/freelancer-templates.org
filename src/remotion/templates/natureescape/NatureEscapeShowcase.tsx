import React from "react";
import { NatureEscape } from "./NatureEscape";
import { THEME_FOREST, THEME_OCEAN } from "../_shared/themes";

export const NatureEscapeForestMorning: React.FC = () => (
  <NatureEscape
    theme={THEME_FOREST}
    style="forest"
    destination="Into the wild"
    tagline="Find your peace."
    hashtag="#ForestBathing"
  />
);

export const NatureEscapeOceanSunset: React.FC = () => (
  <NatureEscape
    theme={THEME_OCEAN}
    style="ocean"
    destination="Chase the horizon"
    tagline="Where the sky meets the sea."
    hashtag="#GoldenHour"
  />
);
