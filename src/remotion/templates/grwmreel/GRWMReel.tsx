/**
 * Get Ready With Me (GRWM) Reel — 1080×1920 portrait
 *
 * 4-scene auto-cut: bare face → makeup → hair → outfit reveal.
 * Each scene is 60 frames (2s) for TikTok-native quick cuts.
 * Final scene triggers ConfettiBurst for the reveal moment.
 *
 * Platform toggle: "tiktok_vertical" puts captions in upper_third
 * (mandatory — TikTok action bar covers the bottom). "instagram_reels"
 * uses editorial lower_third styling.
 *
 * Total: 4 × 60 = 240 frames (8s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import {
  getCaptionAnchor,
  getCaptionStyle,
  getSafeZone,
  type PlatformId,
} from "../_shared/PlatformSafeZones";
import { getStockImageSequence } from "../_shared/StockImages";
import { ConfettiBurst, StickerBadge } from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ────────────────────────────────────────────────────

export const GRWM_SCENE_F = 60;
export const GRWM_SCENES = 4;
export const GRWM_TOTAL_FRAMES = GRWM_SCENE_F * GRWM_SCENES; // 240

// ── Data Contract ────────────────────────────────────────────────

export interface GRWMStep {
  label: string;
  sublabel?: string;
  imageUrl?: string;
}

export interface GRWMReelProps {
  platform: PlatformId;
  theme: Theme;
  steps?: GRWMStep[];
  creatorHandle?: string;
}

// ── Default content ──────────────────────────────────────────────

const DEFAULT_STEPS: GRWMStep[] = [
  { label: "Morning Face",  sublabel: "bare & honest ☁️" },
  { label: "Eyes & Glow",   sublabel: "making it happen ✨" },
  { label: "Hair Era",      sublabel: "styling time 💇‍♀️" },
  { label: "Final Look",    sublabel: "outfit check 🔥" },
];

const STOCK_IMAGES = getStockImageSequence("makeup", 4, 1080, 1920);

// ── Scene Component ──────────────────────────────────────────────

const GRWMScene: React.FC<{
  step: GRWMStep;
  index: number;
  total: number;
  platform: PlatformId;
  theme: Theme;
  isLast: boolean;
}> = ({ step, index, total, platform, theme, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const safeZone = getSafeZone(platform);
  const captionAnchor = getCaptionAnchor(platform);
  const captionCss = getCaptionStyle(platform);

  // Text entrance
  const labelEnter = spring({ frame: frame - 6, fps, config: SPRING.snappy });
  const sublabelEnter = spring({ frame: frame - 16, fps, config: SPRING.default });
  const stickerEnter = spring({ frame: frame - 4, fps, config: SPRING.bouncy });

  // Exit fade
  const exitOpacity = interpolate(frame, [GRWM_SCENE_F - 10, GRWM_SCENE_F - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imgSrc = step.imageUrl || STOCK_IMAGES[index % STOCK_IMAGES.length];

  return (
    <AbsoluteFill>
      {/* Background image */}
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

      {/* Dark gradient overlay — heavier where captions go */}
      <AbsoluteFill
        style={{
          background: platform === "tiktok_vertical"
            ? "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Caption block — platform-safe position */}
      <div
        style={{
          position: "absolute",
          left: PORTRAIT_PADDING,
          right: PORTRAIT_PADDING,
          top: captionAnchor.top,
          height: captionAnchor.height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 10,
          opacity: exitOpacity,
        }}
      >
        <div
          style={{
            ...captionCss,
            fontSize: PORTRAIT_TYPE.title,
            lineHeight: 1.15,
            opacity: labelEnter,
            transform: `translateY(${interpolate(labelEnter, [0, 1], [20, 0])}px)`,
          }}
        >
          {step.label}
        </div>

        {step.sublabel && (
          <div
            style={{
              fontFamily: captionCss.fontFamily,
              fontWeight: 700,
              fontSize: PORTRAIT_TYPE.body,
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              opacity: sublabelEnter,
              transform: `translateY(${interpolate(sublabelEnter, [0, 1], [12, 0])}px)`,
            }}
          >
            {step.sublabel}
          </div>
        )}
      </div>

      {/* Step counter sticker — upper right inside safe zone */}
      <div
        style={{
          position: "absolute",
          top: safeZone.top + 20,
          right: PORTRAIT_PADDING,
          transform: `scale(${stickerEnter})`,
          transformOrigin: "top right",
          opacity: exitOpacity,
        }}
      >
        <StickerBadge
          text={`${index + 1}/${total}`}
          color={theme.accent}
          textColor="#ffffff"
          rotation={-6}
          enterAt={0}
          size="sm"
        />
      </div>

      {/* Scene progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: safeZone.bottom + 16,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 8,
          opacity: exitOpacity,
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 28 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === index ? theme.accent : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* ConfettiBurst on the last (outfit reveal) scene */}
      {isLast && (
        <ConfettiBurst
          triggerFrame={4}
          count={50}
          colors={[theme.accent, "#ffffff", "#ffd700", theme.accentSecondary]}
          cx={0.5}
          cy={0.45}
        />
      )}
    </AbsoluteFill>
  );
};

// ── Main Component ───────────────────────────────────────────────

export const GRWMReel: React.FC<GRWMReelProps> = ({
  platform,
  theme,
  steps,
  creatorHandle,
}) => {
  const merged = DEFAULT_STEPS.map((d, i) => ({ ...d, ...(steps?.[i] ?? {}) }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {merged.map((step, i) => (
        <Sequence
          key={i}
          from={i * GRWM_SCENE_F}
          durationInFrames={GRWM_SCENE_F}
          layout="none"
        >
          <GRWMScene
            step={step}
            index={i}
            total={merged.length}
            platform={platform}
            theme={theme}
            isLast={i === merged.length - 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
