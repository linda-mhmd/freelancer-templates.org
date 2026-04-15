/**
 * Nature Escape — 1080×1920 portrait
 *
 * Immersive nature scene with animated SVG overlays: falling leaves,
 * drifting clouds, floating particles. Stock nature/landscape image as
 * full-bleed background with a slow Ken Burns pan. Overlaid quote or
 * destination text fades in softly.
 *
 * Variants: ForestMorning (green/emerald) · OceanSunset (coral/blue)
 *
 * Total: 270 frames (9s @ 30fps)
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
import { getStockImage } from "../_shared/StockImages";
import {
  AnimatedLeaves,
  AnimatedCloud,
  AnimatedSparkles,
  StickerBadge,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const NE_TOTAL_FRAMES = 270;

// ── Props ──────────────────────────────────────────────────────

export interface NatureEscapeProps {
  theme: Theme;
  destination?: string;
  tagline?: string;
  hashtag?: string;
  backgroundImageUrl?: string;
  style?: "forest" | "ocean";
}

// ── Main composition ───────────────────────────────────────────

export const NatureEscape: React.FC<NatureEscapeProps> = ({
  theme,
  destination = "Into the wild",
  tagline = "Find your peace.",
  hashtag = "#NatureEscape",
  backgroundImageUrl,
  style = "forest",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const category = style === "forest" ? "nature" : "travel";
  const bgUrl = backgroundImageUrl ?? getStockImage(category, 1080, 1920, style === "forest" ? 2 : 4);

  // Slow Ken Burns pan
  const panX = interpolate(frame, [0, NE_TOTAL_FRAMES], [0, -width * 0.04]);
  const panY = interpolate(frame, [0, NE_TOTAL_FRAMES], [0, -height * 0.03]);
  const scale = interpolate(frame, [0, NE_TOTAL_FRAMES], [1.0, 1.06]);

  // Text entrances
  const titleEnter = spring({ frame: Math.max(0, frame - 30), fps, config: SPRING.gentle });
  const taglineEnter = spring({ frame: Math.max(0, frame - 60), fps, config: SPRING.gentle });
  const hashtagEnter = spring({ frame: Math.max(0, frame - 90), fps, config: SPRING.snappy });

  const leafColor = style === "forest" ? "#22c55e" : "#f97316";
  const accentGlow = style === "forest" ? "rgba(34,197,94,0.3)" : "rgba(249,115,22,0.3)";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Full-bleed nature photo with Ken Burns */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={bgUrl}
          style={{
            width: "110%",
            height: "110%",
            objectFit: "cover",
            transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
          }}
        />
        {/* Layered overlays */}
        <AbsoluteFill style={{
          background: style === "forest"
            ? "linear-gradient(180deg, rgba(0,30,10,0.3) 0%, transparent 30%, transparent 55%, rgba(0,20,0,0.8) 100%)"
            : "linear-gradient(180deg, rgba(10,20,40,0.4) 0%, transparent 30%, transparent 55%, rgba(20,5,30,0.85) 100%)",
        }} />
      </AbsoluteFill>

      {/* Animated leaves */}
      <AnimatedLeaves count={12} color={leafColor} seed="ne-leaves" startAt={10} />

      {/* Drifting clouds (forest morning only) */}
      {style === "forest" && (
        <>
          <AnimatedCloud x={-50} y={60} size={350} color="rgba(255,255,255,0.25)" driftSpeed={0.2} seed="c1" />
          <AnimatedCloud x={width - 200} y={140} size={280} color="rgba(255,255,255,0.2)" driftSpeed={0.15} seed="c2" />
        </>
      )}

      {/* Sparkles (ocean sunset variant) */}
      {style === "ocean" && (
        <AnimatedSparkles count={10} color="#f97316" startAt={20} seed="ne-ocean-sparks" />
      )}

      {/* Destination text */}
      <div style={{
        position: "absolute",
        bottom: 220,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
        opacity: titleEnter,
        transform: `translateY(${(1 - titleEnter) * 50}px)`,
      }}>
        <div style={{
          fontFamily: theme.fontFamily,
          fontWeight: 900,
          fontSize: PORTRAIT_TYPE.hero,
          color: "#ffffff",
          lineHeight: 1.0,
          textShadow: `0 4px 30px rgba(0,0,0,0.9), 0 0 60px ${accentGlow}`,
        }}>
          {destination}
        </div>

        <div style={{
          marginTop: 20,
          fontFamily: theme.fontFamily,
          fontWeight: 300,
          fontSize: PORTRAIT_TYPE.body,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.06em",
          opacity: taglineEnter,
          transform: `translateY(${(1 - taglineEnter) * 20}px)`,
          fontStyle: "italic",
        }}>
          {tagline}
        </div>

        <div style={{
          marginTop: 28,
          opacity: hashtagEnter,
          display: "inline-block",
        }}>
          <StickerBadge
            text={hashtag}
            color={theme.accent}
            textColor="#ffffff"
            rotation={-3}
            enterAt={90}
            size="sm"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
