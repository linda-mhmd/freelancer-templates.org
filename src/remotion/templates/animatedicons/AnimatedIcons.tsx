/**
 * Animated Icons — 1080×1920 portrait
 *
 * A scene built entirely from animated SVG icons (Lucide-style) — no stock
 * photos. Icons orbit, pulse, bounce, and spin around a central concept.
 * Great for "how it works", feature explainers, or abstract brand content.
 *
 * Structure:
 *   • Central large icon pulses and glows
 *   • 6 orbiting smaller icons rotate around it
 *   • Connecting SVG lines animate (draw-on effect using strokeDashoffset)
 *   • Title and tagline enter from below
 *
 * Total: 240 frames (8s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import {
  AnimatedSparkles,
  BlobShape,
  NeonGlowBorder,
  WavyText,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const AI_TOTAL_FRAMES = 240;

// ── Icon SVG paths (Lucide-style, all on 24×24 viewBox) ────────

const ICONS = {
  zap:     "M13 2 L4.09 12.26 L11 12.26 L11 22 L19.91 11.74 L13 11.74 Z",
  star:    "M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z",
  heart:   "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  rocket:  "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11z",
  globe:   "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  cpu:     "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
  sparkle: "M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z",
};

type IconKey = keyof typeof ICONS;

// ── Pulsing center icon ────────────────────────────────────────

const CenterIcon: React.FC<{
  icon: IconKey;
  color: string;
  glowColor: string;
  size: number;
  cx: number;
  cy: number;
}> = ({ icon, color, glowColor, size, cx, cy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pulse = 1 + 0.06 * Math.sin(t * 3);
  const enter = spring({ frame: Math.max(0, frame - 10), fps, config: SPRING.bouncy });

  return (
    <div style={{
      position: "absolute",
      left: cx - size / 2,
      top: cy - size / 2,
      width: size,
      height: size,
      transform: `scale(${pulse * enter})`,
    }}>
      {/* Glow rings */}
      <div style={{
        position: "absolute",
        inset: -20,
        borderRadius: "50%",
        border: `3px solid ${glowColor}`,
        opacity: 0.3 + 0.2 * Math.sin(t * 2),
        boxShadow: `0 0 30px ${glowColor}`,
      }} />
      <div style={{
        position: "absolute",
        inset: -40,
        borderRadius: "50%",
        border: `2px solid ${glowColor}`,
        opacity: 0.15 + 0.1 * Math.sin(t * 2 + 1),
      }} />
      {/* Icon circle background */}
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: glowColor,
        opacity: 0.15,
        position: "absolute",
      }} />
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", padding: size * 0.15 }}>
        <path d={ICONS[icon]} />
      </svg>
    </div>
  );
};

// ── Orbiting icon ──────────────────────────────────────────────

const OrbitIcon: React.FC<{
  icon: IconKey;
  color: string;
  orbitRadius: number;
  cx: number;
  cy: number;
  startAngle: number;
  speed: number;
  size: number;
  enterAt: number;
}> = ({ icon, color, orbitRadius, cx, cy, startAngle, speed, size, enterAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const angle = (startAngle + t * speed) * (Math.PI / 180);
  const x = cx + Math.cos(angle) * orbitRadius - size / 2;
  const y = cy + Math.sin(angle) * orbitRadius - size / 2;
  const enter = spring({ frame: Math.max(0, frame - enterAt), fps, config: SPRING.snappy });

  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      opacity: enter,
      transform: `scale(${enter})`,
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: `2px solid ${color}`,
        backgroundColor: `${color}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[icon]} />
        </svg>
      </div>
    </div>
  );
};

// ── Main composition ───────────────────────────────────────────

export const AnimatedIcons: React.FC<{
  theme: Theme;
  title?: string;
  tagline?: string;
  centerIcon?: IconKey;
  style?: "neon" | "minimal";
}> = ({
  theme,
  title = "How it works",
  tagline = "Powered by ideas.",
  centerIcon = "zap",
  style = "neon",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const cx = width / 2;
  const cy = height * 0.42;
  const orbitR = 280;
  const centerSize = 200;
  const orbitSize = 100;

  const titleEnter = spring({ frame: Math.max(0, frame - 80), fps, config: SPRING.gentle });

  const orbitIcons: Array<{ icon: IconKey; startAngle: number; speed: number; enterAt: number }> = [
    { icon: "star",    startAngle: 0,   speed: 20, enterAt: 20 },
    { icon: "heart",   startAngle: 60,  speed: 18, enterAt: 30 },
    { icon: "rocket",  startAngle: 120, speed: 22, enterAt: 35 },
    { icon: "globe",   startAngle: 180, speed: 16, enterAt: 40 },
    { icon: "cpu",     startAngle: 240, speed: 24, enterAt: 45 },
    { icon: "sparkle", startAngle: 300, speed: 20, enterAt: 50 },
  ];

  const iconColors = style === "neon"
    ? ["#00ff88", "#ff6b9d", "#ffd700", "#06b6d4", "#a855f7", "#f97316"]
    : [theme.accent, theme.accentSecondary, theme.textSecondary, theme.accent, theme.accentSecondary, theme.textMuted];

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* Blob background */}
      <div style={{ position: "absolute", left: cx - 300, top: cy - 300 }}>
        <BlobShape color={theme.accent} size={600} opacity={0.08} morph={20} startAt={0} />
      </div>

      {/* Orbiting icons */}
      {orbitIcons.map((oi, i) => (
        <OrbitIcon
          key={i}
          icon={oi.icon}
          color={iconColors[i]}
          orbitRadius={orbitR}
          cx={cx}
          cy={cy}
          startAngle={oi.startAngle}
          speed={oi.speed}
          size={orbitSize}
          enterAt={oi.enterAt}
        />
      ))}

      {/* Center icon */}
      <CenterIcon
        icon={centerIcon}
        color={theme.accent}
        glowColor={theme.accent}
        size={centerSize}
        cx={cx}
        cy={cy}
      />

      {/* Neon glow border on center (neon variant only) */}
      {style === "neon" && (
        <div style={{ position: "absolute", left: cx - centerSize / 2 - 20, top: cy - centerSize / 2 - 20, width: centerSize + 40, height: centerSize + 40 }}>
          <NeonGlowBorder color={theme.accent} width={centerSize + 40} height={centerSize + 40} borderRadius={999} pulseSpeed={1.5} />
        </div>
      )}

      {/* Sparkles */}
      <AnimatedSparkles count={12} color={theme.accent} startAt={15} seed="ai-sparks" />
      {style === "neon" && <AnimatedSparkles count={8} color={theme.accentSecondary} startAt={30} seed="ai-sparks2" />}

      {/* Title block */}
      <div style={{
        position: "absolute",
        bottom: 200,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
        textAlign: "center",
        opacity: titleEnter,
        transform: `translateY(${(1 - titleEnter) * 50}px)`,
      }}>
        <WavyText
          text={title}
          color={theme.textPrimary}
          fontSize={PORTRAIT_TYPE.title}
          amplitude={style === "neon" ? 16 : 6}
          speed={0.8}
        />
        <div style={{
          marginTop: 20,
          fontFamily: theme.fontFamily,
          fontWeight: 300,
          fontSize: PORTRAIT_TYPE.body,
          color: theme.textSecondary,
          letterSpacing: "0.08em",
        }}>
          {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
