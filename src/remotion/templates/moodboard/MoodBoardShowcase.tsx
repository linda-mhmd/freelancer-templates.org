import React from "react";
import { MoodBoard } from "./MoodBoard";
import { THEME_BOLD, THEME_CREAM } from "../_shared/themes";

export const MoodBoardVibrantMix: React.FC = () => (
  <MoodBoard
    theme={THEME_BOLD}
    style="vibrant"
    title="Current obsessions ✨"
  />
);

export const MoodBoardEditorialGrid: React.FC = () => (
  <MoodBoard
    theme={THEME_CREAM}
    style="editorial"
    title="This week's edit"
    categories={["minimalist", "coffee", "fashion", "nature", "food", "lifestyle", "travel", "sunset", "fitness"]}
  />
);
