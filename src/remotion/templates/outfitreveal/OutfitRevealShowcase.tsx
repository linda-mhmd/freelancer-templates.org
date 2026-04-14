/**
 * Outfit Reveal Showcase — 2 visual variants
 *
 *   OutfitRevealBoldNeon    → ID: OutfitReveal-BoldNeon
 *     hot pink sticker (#ff6b9d) + gold sparkles (#ffd700)
 *
 *   OutfitRevealPastelDream → ID: OutfitReveal-PastelDream
 *     mint sticker (#00cba9) + soft pink sparkles (#ff9cc2)
 *
 * 240 frames (8s) · 1080×1920 · 30fps
 */

import React from "react";
import { OutfitReveal } from "./OutfitReveal";

// ── BoldNeon ─────────────────────────────────────────────────────
export const OutfitRevealBoldNeon: React.FC = () => (
  <OutfitReveal
    headline="FIT CHECK"
    badgeText="@brand $89"
    stickerColor="#ff6b9d"
    stickerTextColor="#ffffff"
    sparkleColor="#ffd700"
    headlineColor="#ffffff"
    overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.5) 100%)"
  />
);

// ── PastelDream ──────────────────────────────────────────────────
export const OutfitRevealPastelDream: React.FC = () => (
  <OutfitReveal
    headline="FIT CHECK"
    badgeText="@brand $89"
    stickerColor="#00cba9"
    stickerTextColor="#ffffff"
    sparkleColor="#ff9cc2"
    headlineColor="#ffffff"
    overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.0) 40%, rgba(255,204,230,0.2) 100%)"
  />
);
