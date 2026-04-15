import React from "react";
import { AnimatedIcons } from "./AnimatedIcons";
import { THEME_NEON, THEME_MINIMAL } from "../_shared/themes";

export const AnimatedIconsNeonOrbit: React.FC = () => (
  <AnimatedIcons
    theme={THEME_NEON}
    style="neon"
    title="How it works"
    tagline="Powered by ideas."
    centerIcon="zap"
  />
);

export const AnimatedIconsMinimalFlow: React.FC = () => (
  <AnimatedIcons
    theme={THEME_MINIMAL}
    style="minimal"
    title="Simple. Fast."
    tagline="Built for creators."
    centerIcon="rocket"
  />
);
