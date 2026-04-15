/**
 * City Lights — 1080×1920 portrait
 *
 * Night city scene with animated SVG skyline silhouette, twinkling stars,
 * drifting fireflies, and neon sticker text. The skyline is a pure SVG
 * path (no image needed for the silhouette, though a stock photo fills
 * the sky behind it). Window lights in the skyline pulse randomly.
 *
 * Variants: NeonPurple (cyberpunk) · GoldenHour (warm city at dusk)
 *
 * Total: 270 frames (9s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import { getStockImage } from "../_shared/StockImages";
import {
  AnimatedStars,
  AnimatedFireflies,
  AnimatedSparkles,
  WavyText,
  StickerBadge,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const CL_TOTAL_FRAMES = 270;

// ── Props ──────────────────────────────────────────────────────

export interface CityLightsProps {
  theme: Theme;
  headline?: string;
  subtext?: string;
  sticker?: string;
  style?: "neon" | "golden";
}

// ── SVG skyline silhouette (simplified city profile) ───────────

const CitySkyline: React.FC<{ color: string; glowColor: string; width: number; height: number; startY: number }> = ({
  color, glowColor, width, height, startY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: Math.max(0, frame - 0), fps, config: SPRING.gentle });
  const t = frame / fps;

  // Procedurally generate building profiles
  // Each building: x, w, h
  const buildings = [
    { x: 0,    w: 90,  h: 320 },
    { x: 95,   w: 60,  h: 200 },
    { x: 160,  w: 120, h: 500 },
    { x: 285,  w: 80,  h: 280 },
    { x: 370,  w: 100, h: 420 },
    { x: 475,  w: 70,  h: 260 },
    { x: 550,  w: 140, h: 580 },
    { x: 695,  w: 80,  h: 340 },
    { x: 780,  w: 90,  h: 200 },
    { x: 875,  w: 110, h: 460 },
    { x: 990,  w: 90,  h: 310 },
  ];

  // Windows that pulse
  const windows: React.ReactNode[] = [];
  buildings.forEach((b, bi) => {
    const floors = Math.floor(b.h / 36);
    const cols = Math.floor(b.w / 22);
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const seed = `win-${bi}-${f}-${c}`;
        const on = random(seed) > 0.35;
        if (!on) continue;
        const pulsePhase = random(`${seed}-ph`) * Math.PI * 2;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.5 + pulsePhase);
        windows.push(
          <rect
            key={seed}
            x={b.x + 6 + c * 22}
            y={startY - b.h + 12 + f * 36}
            width={12}
            height={18}
            fill={glowColor}
            opacity={0.4 + 0.5 * pulse}
            rx={1}
          />
        );
      }
    }
  });

  const silhouettePath = buildings.map((b, i) => {
    const bx = b.x;
    const by = startY - b.h * enter;
    const bw = b.w - 2;
    const bh = b.h * enter;
    return `M ${bx} ${startY} L ${bx} ${by} L ${bx + bw} ${by} L ${bx + bw} ${startY}`;
  }).join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", bottom: 0, left: 0 }}
    >
      {/* Glow behind buildings */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Windows first (behind silhouette cutout effect) */}
      {windows}

      {/* Solid skyline */}
      <path d={silhouettePath} fill={color} />

      {/* Ground line */}
      <rect x={0} y={startY} width={width} height={height - startY} fill={color} />

      {/* Glow on rooftops */}
      <path d={silhouettePath} fill="none" stroke={glowColor} strokeWidth={2} opacity={0.4} filter="url(#glow)" />
    </svg>
  );
};

// ── Main composition ───────────────────────────────────────────

export const CityLights: React.FC<CityLightsProps> = ({
  theme,
  headline = "The city never sleeps",
  subtext = "Urban creator.",
  sticker = "🌃 NYC",
  style = "neon",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const skyUrl = getStockImage("city", 1080, 1920, style === "neon" ? 1 : 3);

  // Subtle sky pan
  const panY = interpolate(frame, [0, CL_TOTAL_FRAMES], [0, -height * 0.03]);

  const skylineColor = style === "neon" ? "#0d0015" : "#1a0f00";
  const glowColor = style === "neon" ? theme.accent : "#f59e0b";

  const headlineEnter = spring({ frame: Math.max(0, frame - 40), fps, config: SPRING.gentle });
  const stickerEnter = spring({ frame: Math.max(0, frame - 70), fps, config: SPRING.bouncy });

  const skylineBaseY = height * 0.68;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Sky background */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={skyUrl}
          style={{
            width: "100%",
            height: "110%",
            objectFit: "cover",
            transform: `translateY(${panY}px)`,
            filter: style === "neon"
              ? "saturate(0.4) brightness(0.5) hue-rotate(220deg)"
              : "saturate(1.2) brightness(0.7)",
          }}
        />
        {/* Night gradient */}
        <AbsoluteFill style={{
          background: style === "neon"
            ? "linear-gradient(180deg, #060010 0%, rgba(0,0,20,0.6) 50%, transparent 70%)"
            : "linear-gradient(180deg, #0f0800 0%, rgba(20,10,0,0.5) 50%, transparent 70%)",
        }} />
      </AbsoluteFill>

      {/* Stars */}
      <AnimatedStars count={40} color={style === "neon" ? "#c4b5fd" : "#fde68a"} seed="cl-stars" startAt={5} />

      {/* Fireflies */}
      <AnimatedFireflies count={12} color={glowColor} seed="cl-ff" startAt={15} />

      {/* Sparkles */}
      <AnimatedSparkles count={8} color={glowColor} startAt={20} seed="cl-sparks" />

      {/* SVG city skyline */}
      <CitySkyline
        color={skylineColor}
        glowColor={glowColor}
        width={width}
        height={height}
        startY={skylineBaseY}
      />

      {/* Text on sky area */}
      <div style={{
        position: "absolute",
        top: 200,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
        opacity: headlineEnter,
        transform: `translateY(${(1 - headlineEnter) * -40}px)`,
      }}>
        <WavyText
          text={headline}
          color={style === "neon" ? glowColor : "#fde68a"}
          fontSize={PORTRAIT_TYPE.subtitle}
          amplitude={style === "neon" ? 12 : 6}
          speed={0.6}
        />
        <div style={{
          marginTop: 20,
          fontFamily: theme.fontFamily,
          fontWeight: 300,
          fontSize: PORTRAIT_TYPE.body,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          {subtext}
        </div>
      </div>

      {/* Location sticker */}
      <div style={{
        position: "absolute",
        top: height * 0.55,
        right: PORTRAIT_PADDING,
        transform: `scale(${stickerEnter}) rotate(4deg)`,
        transformOrigin: "top right",
      }}>
        <StickerBadge
          text={sticker}
          color={glowColor}
          textColor={style === "neon" ? "#000" : "#000"}
          rotation={0}
          enterAt={70}
          size="md"
        />
      </div>
    </AbsoluteFill>
  );
};
