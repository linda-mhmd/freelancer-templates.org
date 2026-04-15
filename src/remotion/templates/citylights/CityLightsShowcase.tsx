import React from "react";
import { CityLights } from "./CityLights";
import { THEME_NEON, THEME_WARM } from "../_shared/themes";

export const CityLightsNeonPurple: React.FC = () => (
  <CityLights
    theme={THEME_NEON}
    style="neon"
    headline="The city never sleeps"
    subtext="Urban creator."
    sticker="🌃 NYC"
  />
);

export const CityLightsGoldenHour: React.FC = () => (
  <CityLights
    theme={THEME_WARM}
    style="golden"
    headline="Golden hour vibes"
    subtext="City living."
    sticker="🌆 Sunset"
  />
);
