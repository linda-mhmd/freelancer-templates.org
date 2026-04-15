import React from "react";
import { ComicStrip } from "./ComicStrip";
import { THEME_BOLD, THEME_MINIMAL } from "../_shared/themes";

export const ComicStripColorPop: React.FC = () => (
  <ComicStrip
    theme={THEME_BOLD}
    style="color"
    actionWord="BOOM!"
    cta="Follow for more tips →"
  />
);

export const ComicStripNoirClassic: React.FC = () => (
  <ComicStrip
    theme={THEME_MINIMAL}
    style="noir"
    actionWord="POW!"
    cta="Save this for later 📌"
  />
);
