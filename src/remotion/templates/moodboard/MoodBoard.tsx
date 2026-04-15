/**
 * MoodBoard — 1080×1920 portrait
 *
 * 9-tile image grid (3×3) with a rotating selection highlight that cycles
 * through tiles drawing attention to each. Tile entries are staggered for
 * a cascading reveal effect. A neon border highlights the "active" tile.
 *
 * Total: 270 frames (9s @ 30fps) — 30 frames per tile cycle
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
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import { getStockImage, type StockCategory } from "../_shared/StockImages";
import {
  AnimatedSparkles,
  NeonGlowBorder,
  StickerBadge,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const MB_TOTAL_FRAMES = 270;
export const MB_TILES = 9;
export const MB_CYCLE_F = 30; // frames per highlighted tile

// ── Props ──────────────────────────────────────────────────────

export interface MoodBoardProps {
  theme: Theme;
  title?: string;
  categories?: StockCategory[];
  style?: "vibrant" | "editorial";
}

// ── Main composition ───────────────────────────────────────────

export const MoodBoard: React.FC<MoodBoardProps> = ({
  theme,
  title = "Aesthetic ✨",
  categories,
  style = "vibrant",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Default tile categories — mix of lifestyle imagery
  const cats: StockCategory[] = categories ?? [
    "lifestyle", "fashion", "coffee",
    "sunset", "nature", "food",
    "fitness", "travel", "minimalist",
  ];

  const gap = 8;
  const tileW = (width - gap * 4) / 3;
  const tileH = (height * 0.78 - gap * 4) / 3;

  // Which tile is currently highlighted (cycles through 0–8)
  const activeTile = Math.floor(frame / MB_CYCLE_F) % MB_TILES;

  // Title entrance
  const titleEnter = spring({ frame: Math.max(0, frame - 20), fps, config: SPRING.gentle });

  const titleY = height * 0.82;

  return (
    <AbsoluteFill style={{ backgroundColor: style === "editorial" ? "#f8f7f4" : theme.bg }}>
      {/* 9-tile grid */}
      {Array.from({ length: MB_TILES }, (_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = gap + col * (tileW + gap);
        const y = gap + row * (tileH + gap);

        // Staggered entrance
        const enterAt = i * 8;
        const tileEnter = spring({ frame: Math.max(0, frame - enterAt), fps, config: SPRING.snappy });

        const isActive = i === activeTile && frame > 10;
        const activeScale = isActive ? interpolate(
          frame % MB_CYCLE_F,
          [0, 5, MB_CYCLE_F - 5, MB_CYCLE_F],
          [1, 1.04, 1.04, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ) : 1;

        const imgUrl = getStockImage(cats[i], Math.round(tileW), Math.round(tileH), i + 1);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: tileW,
              height: tileH,
              transform: `scale(${tileEnter * activeScale})`,
              transformOrigin: "center center",
              opacity: tileEnter,
              overflow: "hidden",
              borderRadius: style === "editorial" ? 0 : 8,
              border: style === "editorial" ? "2px solid #000" : "none",
            }}
          >
            <Img
              src={imgUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: style === "editorial"
                  ? "grayscale(20%) contrast(1.05)"
                  : isActive ? "saturate(1.5) brightness(1.05)" : "saturate(1.1)",
              }}
            />
            {/* Active highlight overlay */}
            {isActive && (
              <>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: theme.accent,
                  opacity: 0.08,
                }} />
                <NeonGlowBorder
                  color={theme.accent}
                  width={tileW}
                  height={tileH}
                  borderRadius={style === "editorial" ? 0 : 8}
                  pulseSpeed={2}
                />
              </>
            )}
          </div>
        );
      })}

      {/* Gradient overlay at bottom for text */}
      <AbsoluteFill style={{
        background: style === "editorial"
          ? "linear-gradient(180deg, transparent 70%, rgba(248,247,244,0.98) 85%)"
          : `linear-gradient(180deg, transparent 70%, ${theme.bg} 85%)`,
      }} />

      {/* Title + sparkles */}
      <div style={{
        position: "absolute",
        top: titleY,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
        opacity: titleEnter,
        transform: `translateY(${(1 - titleEnter) * 30}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
      }}>
        <div style={{
          fontFamily: style === "editorial" ? "'Merriweather', serif" : theme.fontFamily,
          fontWeight: theme.headingWeight,
          fontSize: PORTRAIT_TYPE.title,
          color: style === "editorial" ? "#1a1a1a" : theme.textPrimary,
          lineHeight: 1.1,
        }}>
          {title}
        </div>
        <StickerBadge
          text={`${MB_TILES} picks this week`}
          color={theme.accent}
          textColor="#ffffff"
          rotation={-3}
          enterAt={40}
          size="sm"
        />
      </div>

      {/* Sparkles */}
      <AnimatedSparkles
        count={style === "vibrant" ? 10 : 5}
        color={theme.accent}
        startAt={30}
        seed="mb-sparks"
      />
    </AbsoluteFill>
  );
};
