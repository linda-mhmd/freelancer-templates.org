import React from "react";
import { FoodieReel } from "./FoodieReel";
import { THEME_WARM, THEME_FOREST } from "../_shared/themes";

export const FoodieReelWarmBistro: React.FC = () => (
  <FoodieReel
    platform="tiktok_vertical"
    theme={THEME_WARM}
    style="warm"
    dishName="Truffle Ramen"
    restaurant="@littletokyonyc"
    price="$18"
    caption="10/10 would slurp again 🍜🔥"
  />
);

export const FoodieReelFreshVibes: React.FC = () => (
  <FoodieReel
    platform="instagram_reels"
    theme={THEME_FOREST}
    style="fresh"
    dishName="Acai Bowl"
    restaurant="@sunrisebowlco"
    price="$14"
    caption="Starting the day right 🌿✨"
  />
);
