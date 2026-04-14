/**
 * Creator Recap — week-in-review portrait montage
 *
 * 5 quick scenes (36 frames each = 1.2s) showing different stock images
 * with sticker badges ("DAY 1" … "DAY 5"). Ends on a BlobShape outro
 * with creator handle for the follow CTA.
 *
 * Platform toggle:
 *   tiktok_vertical  → upper_third captions (bold-sans-stroke style)
 *   instagram_reels  → lower_third captions (editorial-serif style)
 *
 * Total: 5 × 36 + 30 outro = 210 frames (~7s @ 30fps)
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
import {
  PORTRAIT_TYPE,
  PORTRAIT_PADDING,
  PORTRAIT_TOP_SAFE,
} from "../_shared/PortraitTypes";
import {
  getCaptionAnchor,
  getCaptionStyle,
  getSafeZone,
  type PlatformId,
} from "../_shared/PlatformSafeZones";
import { getStockImage, type StockCategory } from "../_shared/StockImages";
import { BlobShape, StickerBadge } from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ────────────────────────────────────────────────────

const SCENE_F = 36;
const SCENE_COUNT = 5;
const OUTRO_F = 30;
export const CREATOR_RECAP_TOTAL_FRAMES = SCENE_F * SCENE_COUNT + OUTRO_F; // 210

// ── Data Contract ────────────────────────────────────────────────

export interface RecapSceneSpec {
  label: string;
  sublabel?: string;
  imageUrl?: string;
}

export interface CreatorRecapProps {
  platform: PlatformId;
  theme: Theme;
  scenes?: RecapSceneSpec[];
  creatorHandle?: string;
}

// ── Default scene data ───────────────────────────────────────────

interface DefaultScene {
  label: string;
  sublabel: string;
  category: StockCategory;
  seed: number;
}

const DEFAULT_SCENES: DefaultScene[] = [
  { label: "Day 1",  sublabel: "festival weekend 🎪",   category: "festival", seed: 1 },
  { label: "Day 2",  sublabel: "night out energy 🪩",    category: "party",    seed: 1 },
  { label: "Day 3",  sublabel: "fuelling up 🍜",          category: "food",     seed: 1 },
  { label: "Day 4",  sublabel: "fit check approved ✅",  category: "outfit",   seed: 1 },
  { label: "Day 5",  sublabel: "golden hour 🌅",         category: "sunset",   seed: 1 },
];

// ── Scene Component ───────────────────────────────────────────────

const RecapScene: React.FC<{
  label: string;
  sublabel?: string;
  imageUrl: string;
  index: number;
  platform: PlatformId;
  theme: Theme;
}> = ({ label, sublabel, imageUrl, index, platform, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionAnchor = getCaptionAnchor(platform);
  const captionCss = getCaptionStyle(platform);
  const safeZone = getSafeZone(platform);

  const labelEnter = spring({ frame: frame - 4, fps, config: SPRING.snappy });
  const stickerEnter = spring({ frame: frame - 2, fps, config: SPRING.bouncy });

  const exitOpacity = interpolate(frame, [SCENE_F - 8, SCENE_F - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={imageUrl}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      {/* Gradient for text legibility */}
      <AbsoluteFill
        style={{
          background: platform === "tiktok_vertical"
            ? "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.3) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Caption */}
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
          gap: 8,
          opacity: exitOpacity,
        }}
      >
        <div
          style={{
            ...captionCss,
            fontSize: PORTRAIT_TYPE.title,
            opacity: labelEnter,
            transform: `translateY(${interpolate(labelEnter, [0, 1], [18, 0])}px)`,
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontFamily: captionCss.fontFamily,
              fontWeight: 700,
              fontSize: PORTRAIT_TYPE.body,
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              opacity: interpolate(labelEnter, [0.4, 1], [0, 1]),
              transform: `translateY(${interpolate(labelEnter, [0, 1], [12, 0])}px)`,
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      {/* Day badge sticker — upper right, inside safe zone */}
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
          text={`DAY ${index + 1}`}
          color={theme.accent}
          textColor="#ffffff"
          rotation={-5}
          enterAt={0}
          size="sm"
        />
      </div>
    </AbsoluteFill>
  );
};

// ── Outro Component ───────────────────────────────────────────────

const RecapOutro: React.FC<{
  creatorHandle: string;
  theme: Theme;
}> = ({ creatorHandle, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blobIn = spring({ frame: frame - 2, fps, config: SPRING.gentle });
  const handleIn = spring({ frame: frame - 8, fps, config: SPRING.default });

  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.bg, justifyContent: "center", alignItems: "center" }}
    >
      {/* Background blob */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${blobIn})`,
        }}
      >
        <BlobShape color={theme.accent} size={900} opacity={0.25} morph={50} startAt={0} />
      </div>

      {/* Creator handle */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(handleIn, [0, 1], [0, 1]),
          transform: `scale(${interpolate(handleIn, [0, 1], [0.85, 1])})`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 900,
            fontSize: PORTRAIT_TYPE.hero,
            color: theme.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          {creatorHandle}
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 600,
            fontSize: PORTRAIT_TYPE.body,
            color: theme.accent,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Follow for more ↗
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Component ────────────────────────────────────────────────

export const CreatorRecap: React.FC<CreatorRecapProps> = ({
  platform,
  theme,
  scenes,
  creatorHandle = "@yourhandle",
}) => {
  const merged = DEFAULT_SCENES.map((def, i) => {
    const user = scenes?.[i];
    return {
      label: user?.label ?? def.label,
      sublabel: user?.sublabel ?? def.sublabel,
      imageUrl: user?.imageUrl || getStockImage(def.category, 1080, 1920, def.seed),
    };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {merged.map((scene, i) => (
        <Sequence
          key={i}
          from={i * SCENE_F}
          durationInFrames={SCENE_F}
          layout="none"
        >
          <RecapScene
            label={scene.label}
            sublabel={scene.sublabel}
            imageUrl={scene.imageUrl}
            index={i}
            platform={platform}
            theme={theme}
          />
        </Sequence>
      ))}

      {/* Outro */}
      <Sequence
        from={SCENE_F * SCENE_COUNT}
        durationInFrames={OUTRO_F}
        layout="none"
      >
        <RecapOutro creatorHandle={creatorHandle} theme={theme} />
      </Sequence>
    </AbsoluteFill>
  );
};
