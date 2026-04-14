/**
 * GRWM Reel Showcase — 2 platform variants
 *
 *   GRWMReelTikTok  → ID: GRWMReel-TikTok  (upper-third bold-sans captions)
 *   GRWMReelReels   → ID: GRWMReel-Reels   (lower-third editorial captions)
 *
 * 240 frames (8s) · 1080×1920 · 30fps
 */

import React from "react";
import { GRWMReel } from "./GRWMReel";
import { THEME_BOLD, THEME_DARK } from "../_shared/themes";

// ── TikTok variant ───────────────────────────────────────────────
// Bold-sticker style: THEME_BOLD accent (purple/pink), upper_third captions.
export const GRWMReelTikTok: React.FC = () => (
  <GRWMReel
    platform="tiktok_vertical"
    theme={THEME_BOLD}
    creatorHandle="@yourhandle"
  />
);

// ── Reels variant ────────────────────────────────────────────────
// Editorial serif style: THEME_DARK accent (indigo), lower_third captions.
export const GRWMReelReels: React.FC = () => (
  <GRWMReel
    platform="instagram_reels"
    theme={THEME_DARK}
    creatorHandle="@yourhandle"
  />
);
