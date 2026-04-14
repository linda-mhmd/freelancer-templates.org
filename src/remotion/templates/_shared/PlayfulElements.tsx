/**
 * Playful SVG elements for content creator templates.
 *
 * These are "Canva-style" decorative components — sparkles, blobs,
 * stickers, confetti — all theme-aware (accept a color prop) and all
 * animated using Remotion's spring/interpolate so they integrate with
 * the rest of the composition's timing.
 *
 * Use sparingly: the playbook warns against generic "AI slop" looking
 * decorations, so each element should be *intentional* — a sparkle
 * marks a wow moment, a blob anchors a hero, confetti celebrates a
 * reveal. Don't paste them on every scene.
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ────────────────────────────────────────────────────────────────────
// AnimatedSparkles — twinkling stars in random positions
// ────────────────────────────────────────────────────────────────────

interface AnimatedSparklesProps {
  count?: number;
  color?: string;
  /** When sparkles start appearing (frame number) */
  startAt?: number;
  /** Seed for deterministic positioning across renders */
  seed?: string;
}

export const AnimatedSparkles: React.FC<AnimatedSparklesProps> = ({
  count = 12,
  color = "#ffd700",
  startAt = 0,
  seed = "sparkles",
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  if (frame < startAt) return null;
  const localFrame = frame - startAt;

  const sparkles = Array.from({ length: count }, (_, i) => {
    const x = random(`${seed}-x-${i}`) * width;
    const y = random(`${seed}-y-${i}`) * height;
    const size = 24 + random(`${seed}-s-${i}`) * 32;
    const delay = random(`${seed}-d-${i}`) * 30;
    const cycle = (localFrame - delay) % 60;
    const opacity = cycle >= 0 && cycle < 30
      ? interpolate(cycle, [0, 15, 30], [0, 1, 0])
      : 0;
    const scale = cycle >= 0 && cycle < 30
      ? interpolate(cycle, [0, 15, 30], [0.5, 1.2, 0.5])
      : 0;

    return (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: x - size / 2,
          top: y - size / 2,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <path
          d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z"
          fill={color}
        />
      </svg>
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{sparkles}</AbsoluteFill>;
};

// ────────────────────────────────────────────────────────────────────
// BlobShape — organic morphing blob, anchors a section
// ────────────────────────────────────────────────────────────────────

interface BlobShapeProps {
  color: string;
  size?: number;
  opacity?: number;
  /** "morph" amplitude in pixels — how much the blob squishes */
  morph?: number;
  /** Frame to start morphing from */
  startAt?: number;
}

export const BlobShape: React.FC<BlobShapeProps> = ({
  color,
  size = 600,
  opacity = 0.6,
  morph = 30,
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - startAt) / fps;

  // Generate 8 control points around a circle, each oscillating sinusoidally
  const r = size / 2;
  const cx = r;
  const cy = r;
  const points: string[] = [];

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const phase = i * 0.7;
    const radius = r - morph + Math.sin(t * 1.5 + phase) * morph;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${x},${y}`);
  }

  // Build a smooth closed path through the points using quadratic bezier
  let d = `M ${points[0]}`;
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length];
    const after = points[(i + 2) % points.length];
    const [nx, ny] = next.split(",").map(Number);
    const [ax, ay] = after.split(",").map(Number);
    const cx2 = (nx + ax) / 2;
    const cy2 = (ny + ay) / 2;
    d += ` Q ${nx} ${ny} ${cx2} ${cy2}`;
  }
  d += " Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ opacity }}
    >
      <path d={d} fill={color} />
    </svg>
  );
};

// ────────────────────────────────────────────────────────────────────
// StickerBadge — Canva-style rotated sticker with text
// ────────────────────────────────────────────────────────────────────

interface StickerBadgeProps {
  text: string;
  color?: string;
  textColor?: string;
  /** Rotation in degrees */
  rotation?: number;
  /** Frame to enter on */
  enterAt?: number;
  size?: "sm" | "md" | "lg";
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  text,
  color = "#ff6b9d",
  textColor = "#ffffff",
  rotation = -8,
  enterAt = 0,
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - enterAt,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const dims = {
    sm: { padding: "12px 24px", fontSize: 32, borderWidth: 4 },
    md: { padding: "20px 36px", fontSize: 48, borderWidth: 6 },
    lg: { padding: "28px 52px", fontSize: 64, borderWidth: 8 },
  }[size];

  return (
    <div
      style={{
        display: "inline-block",
        padding: dims.padding,
        backgroundColor: color,
        color: textColor,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 900,
        fontSize: dims.fontSize,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        border: `${dims.borderWidth}px solid ${textColor}`,
        borderRadius: 12,
        transform: `rotate(${rotation}deg) scale(${enter})`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────
// ConfettiBurst — particle explosion at trigger frame
// ────────────────────────────────────────────────────────────────────

interface ConfettiBurstProps {
  triggerFrame: number;
  count?: number;
  colors?: string[];
  /** Center x as fraction of width (0-1). Default 0.5 */
  cx?: number;
  /** Center y as fraction of height (0-1). Default 0.5 */
  cy?: number;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  triggerFrame,
  count = 40,
  colors = ["#ff6b9d", "#ffd700", "#7c3aed", "#06b6d4", "#10b981"],
  cx = 0.5,
  cy = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const localFrame = frame - triggerFrame;

  if (localFrame < 0 || localFrame > 90) return null;

  const t = localFrame / fps;
  const centerX = width * cx;
  const centerY = height * cy;

  const particles = Array.from({ length: count }, (_, i) => {
    const angle = random(`conf-a-${i}`) * Math.PI * 2;
    const speed = 400 + random(`conf-s-${i}`) * 600;
    const gravity = 800;
    const x = centerX + Math.cos(angle) * speed * t;
    const y = centerY + Math.sin(angle) * speed * t + 0.5 * gravity * t * t;
    const rot = random(`conf-r-${i}`) * 720 * t;
    const size = 12 + random(`conf-z-${i}`) * 16;
    const color = colors[i % colors.length];
    const opacity = interpolate(localFrame, [0, 60, 90], [1, 1, 0]);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size * 0.4,
          backgroundColor: color,
          transform: `rotate(${rot}deg)`,
          opacity,
          borderRadius: 2,
        }}
      />
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{particles}</AbsoluteFill>;
};

// ────────────────────────────────────────────────────────────────────
// WavyText — text following a sine wave
// ────────────────────────────────────────────────────────────────────

interface WavyTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  /** Wave amplitude in pixels */
  amplitude?: number;
  /** Wave speed (cycles per second) */
  speed?: number;
}

export const WavyText: React.FC<WavyTextProps> = ({
  text,
  color = "#ffffff",
  fontSize = 64,
  amplitude = 12,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * speed;

  return (
    <div
      style={{
        display: "inline-flex",
        gap: 0,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 800,
        fontSize,
        color,
      }}
    >
      {Array.from(text).map((ch, i) => {
        const phase = i * 0.3;
        const y = Math.sin(t * Math.PI * 2 + phase) * amplitude;
        return (
          <span
            key={i}
            style={{
              transform: `translateY(${y}px)`,
              display: "inline-block",
            }}
          >
            {ch === " " ? "\u00a0" : ch}
          </span>
        );
      })}
    </div>
  );
};
