/**
 * Outfit Reveal — 1080×1920 portrait
 *
 * Single hero shot: full-screen outfit image with WavyText "FIT CHECK",
 * AnimatedSparkles for wow energy, and a StickerBadge price/brand callout.
 *
 * Two visual flavors differentiate via stickerColor and sparkleColor:
 *   BoldNeon:    hot pink sticker (#ff6b9d) + gold sparkles (#ffd700)
 *   PastelDream: mint sticker (#00cba9)    + soft pink sparkles (#ff9cc2)
 *
 * Total: 240 frames (8s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PORTRAIT_TYPE, PORTRAIT_PADDING, PORTRAIT_TOP_SAFE } from "../_shared/PortraitTypes";
import { getStockImage } from "../_shared/StockImages";
import {
  AnimatedSparkles,
  StickerBadge,
  WavyText,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";

// ── Data Contract ────────────────────────────────────────────────

export interface OutfitRevealProps {
  /** Main WavyText headline, e.g. "FIT CHECK" */
  headline?: string;
  /** Sticker badge label, e.g. "@zara $89" */
  badgeText?: string;
  /** Custom override for the outfit image */
  imageUrl?: string;
  /** Sticker background color */
  stickerColor: string;
  /** Sticker text color */
  stickerTextColor?: string;
  /** Sparkle color */
  sparkleColor: string;
  /** Overlay gradient (CSS string) */
  overlayGradient?: string;
  /** WavyText color */
  headlineColor?: string;
}

// ── Main Component ───────────────────────────────────────────────

export const OutfitReveal: React.FC<OutfitRevealProps> = ({
  headline = "FIT CHECK",
  badgeText = "@brand $89",
  imageUrl,
  stickerColor,
  stickerTextColor = "#ffffff",
  sparkleColor,
  overlayGradient = "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.5) 100%)",
  headlineColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgSrc = imageUrl || getStockImage("outfit", 1080, 1920, 1);

  // Title entrance: scales + fades in
  const titleEnter = spring({ frame: frame - 12, fps, config: SPRING.bouncy });
  const titleOpacity = interpolate(titleEnter, [0, 1], [0, 1]);

  // Sticker entrance: bouncy pop
  const stickerEnter = spring({ frame: frame - 38, fps, config: SPRING.bouncy });

  // WavyText sub-caption
  const subEnter = spring({ frame: frame - 24, fps, config: SPRING.default });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Full-screen outfit image */}
      <Img
        src={imgSrc}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />

      {/* Gradient overlay */}
      <AbsoluteFill style={{ background: overlayGradient }} />

      {/* Sparkles — all over the frame for festival energy */}
      <AnimatedSparkles count={18} color={sparkleColor} startAt={20} seed="outfit" />

      {/* WavyText headline — upper third, hero size */}
      <div
        style={{
          position: "absolute",
          top: PORTRAIT_TOP_SAFE + 40,
          left: PORTRAIT_PADDING,
          right: PORTRAIT_PADDING,
          display: "flex",
          justifyContent: "center",
          opacity: titleOpacity,
          transform: `scale(${interpolate(titleEnter, [0, 1], [0.7, 1])})`,
        }}
      >
        <WavyText
          text={headline}
          color={headlineColor}
          fontSize={PORTRAIT_TYPE.hero}
          amplitude={14}
          speed={0.8}
        />
      </div>

      {/* Supporting text line */}
      <div
        style={{
          position: "absolute",
          top: PORTRAIT_TOP_SAFE + 180,
          left: PORTRAIT_PADDING,
          right: PORTRAIT_PADDING,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(subEnter, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subEnter, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 800,
            fontSize: PORTRAIT_TYPE.subtitle,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          rate this fit 🔥
        </div>
      </div>

      {/* Brand/price sticker — lower right, rotated */}
      <div
        style={{
          position: "absolute",
          bottom: 380,
          right: PORTRAIT_PADDING,
          transform: `scale(${stickerEnter})`,
          transformOrigin: "bottom right",
        }}
      >
        <StickerBadge
          text={badgeText}
          color={stickerColor}
          textColor={stickerTextColor}
          rotation={8}
          enterAt={0}
          size="md"
        />
      </div>
    </AbsoluteFill>
  );
};
