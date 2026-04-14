/**
 * Creator Recap Showcase — 2 platform variants
 *
 *   CreatorRecapTikTok → ID: CreatorRecap-TikTok
 *     upper-third captions, THEME_BOLD accent
 *
 *   CreatorRecapReels  → ID: CreatorRecap-Reels
 *     lower-third editorial captions, THEME_DARK accent
 *
 * 210 frames (~7s) · 1080×1920 · 30fps
 */

import React from "react";
import { CreatorRecap } from "./CreatorRecap";
import { THEME_BOLD, THEME_DARK } from "../_shared/themes";

// ── TikTok ───────────────────────────────────────────────────────
export const CreatorRecapTikTok: React.FC = () => (
  <CreatorRecap
    platform="tiktok_vertical"
    theme={THEME_BOLD}
    creatorHandle="@yourhandle"
  />
);

// ── Reels ────────────────────────────────────────────────────────
export const CreatorRecapReels: React.FC = () => (
  <CreatorRecap
    platform="instagram_reels"
    theme={THEME_DARK}
    creatorHandle="@yourhandle"
  />
);
