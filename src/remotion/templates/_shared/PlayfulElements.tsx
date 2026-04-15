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

// ────────────────────────────────────────────────────────────────────
// SpeechBubble — comic-style speech bubble with tail
// ────────────────────────────────────────────────────────────────────

interface SpeechBubbleProps {
  text: string;
  color?: string;
  textColor?: string;
  /** Tail direction: "bl" bottom-left, "br" bottom-right, "tl" top-left */
  tail?: "bl" | "br" | "tl";
  enterAt?: number;
  fontSize?: number;
  maxWidth?: number;
  borderColor?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  color = "#ffffff",
  textColor = "#000000",
  tail = "bl",
  enterAt = 0,
  fontSize = 40,
  maxWidth = 400,
  borderColor = "#000000",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: Math.max(0, frame - enterAt), fps, config: { damping: 8, stiffness: 150 } });
  const borderW = 5;

  const tailPaths: Record<string, string> = {
    bl: `M 0 ${fontSize * 2} L -40 ${fontSize * 3 + 20} L 50 ${fontSize * 2}`,
    br: `M ${maxWidth} ${fontSize * 2} L ${maxWidth + 40} ${fontSize * 3 + 20} L ${maxWidth - 50} ${fontSize * 2}`,
    tl: `M 0 0 L -40 -50 L 50 0`,
  };

  return (
    <div style={{ transform: `scale(${enter})`, transformOrigin: tail === "tl" ? "top left" : "bottom left", position: "relative", display: "inline-block" }}>
      <div style={{
        backgroundColor: color,
        border: `${borderW}px solid ${borderColor}`,
        borderRadius: 20,
        padding: `${fontSize * 0.4}px ${fontSize * 0.6}px`,
        maxWidth,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 900,
        fontSize,
        color: textColor,
        lineHeight: 1.2,
        position: "relative",
        boxShadow: `4px 4px 0px ${borderColor}`,
      }}>
        {text}
      </div>
      {/* SVG tail */}
      <svg style={{ position: "absolute", bottom: -40, left: 20, overflow: "visible" }} width={maxWidth} height={60}>
        <path d={tailPaths[tail]} fill={color} stroke={borderColor} strokeWidth={borderW} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────
// HalftoneBackground — comic halftone dot grid
// ────────────────────────────────────────────────────────────────────

interface HalftoneBackgroundProps {
  color?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

export const HalftoneBackground: React.FC<HalftoneBackgroundProps> = ({
  color = "#000000",
  dotSize = 6,
  spacing = 24,
  opacity = 0.15,
}) => {
  const { width, height } = useVideoConfig();
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ox = r % 2 === 0 ? 0 : spacing / 2;
      dots.push(
        <circle key={`${r}-${c}`} cx={c * spacing + ox} cy={r * spacing} r={dotSize / 2} fill={color} />
      );
    }
  }
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {dots}
      </svg>
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────────────
// AnimatedLeaves — floating leaf SVGs for nature scenes
// ────────────────────────────────────────────────────────────────────

interface AnimatedLeavesProps {
  count?: number;
  color?: string;
  seed?: string;
  startAt?: number;
}

export const AnimatedLeaves: React.FC<AnimatedLeavesProps> = ({
  count = 10,
  color = "#22c55e",
  seed = "leaves",
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  if (frame < startAt) return null;
  const t = (frame - startAt) / fps;

  const leaves = Array.from({ length: count }, (_, i) => {
    const startX = random(`${seed}-sx-${i}`) * width;
    const startY = random(`${seed}-sy-${i}`) * height * 0.4; // start upper 40%
    const speed = 60 + random(`${seed}-spd-${i}`) * 80;
    const drift = (random(`${seed}-dr-${i}`) - 0.5) * 120;
    const phase = random(`${seed}-ph-${i}`) * Math.PI * 2;
    const size = 20 + random(`${seed}-sz-${i}`) * 30;
    const x = startX + drift * Math.sin(t * 0.8 + phase);
    const y = startY + speed * t;
    const rot = t * 120 * (random(`${seed}-rt-${i}`) > 0.5 ? 1 : -1) + phase * 30;
    const opacity = y > height ? 0 : 0.7 + random(`${seed}-op-${i}`) * 0.3;

    return (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ position: "absolute", left: x, top: y % height, transform: `rotate(${rot}deg)`, opacity, pointerEvents: "none" }}
      >
        {/* Simple leaf shape */}
        <path d="M12 2 C18 2 22 8 22 14 C22 18 18 22 12 22 C6 22 2 18 2 14 C2 8 6 2 12 2 Z" fill={color} opacity={0.8} />
        <path d="M12 22 C12 22 12 12 12 6" stroke={color} strokeWidth="1.5" fill="none" opacity={0.5} />
      </svg>
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{leaves}</AbsoluteFill>;
};

// ────────────────────────────────────────────────────────────────────
// AnimatedStars — twinkling star field for night scenes
// ────────────────────────────────────────────────────────────────────

interface AnimatedStarsProps {
  count?: number;
  color?: string;
  seed?: string;
  startAt?: number;
}

export const AnimatedStars: React.FC<AnimatedStarsProps> = ({
  count = 30,
  color = "#ffffff",
  seed = "stars",
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  if (frame < startAt) return null;
  const t = (frame - startAt) / fps;

  const stars = Array.from({ length: count }, (_, i) => {
    const x = random(`${seed}-x-${i}`) * width;
    const y = random(`${seed}-y-${i}`) * height;
    const size = 2 + random(`${seed}-s-${i}`) * 6;
    const phase = random(`${seed}-p-${i}`) * Math.PI * 2;
    const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 3 + phase));
    const isPoly = random(`${seed}-sp-${i}`) > 0.6;

    return (
      <svg key={i} width={size * 4} height={size * 4} viewBox="-2 -2 4 4"
        style={{ position: "absolute", left: x - size * 2, top: y - size * 2, opacity: twinkle, pointerEvents: "none" }}>
        {isPoly ? (
          // 4-pointed star
          <path d="M0 -1.5 L0.4 -0.4 L1.5 0 L0.4 0.4 L0 1.5 L-0.4 0.4 L-1.5 0 L-0.4 -0.4 Z" fill={color} />
        ) : (
          <circle cx={0} cy={0} r={1} fill={color} />
        )}
      </svg>
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{stars}</AbsoluteFill>;
};

// ────────────────────────────────────────────────────────────────────
// AnimatedFireflies — glowing dots floating upward for night scenes
// ────────────────────────────────────────────────────────────────────

interface AnimatedFirefliesProps {
  count?: number;
  color?: string;
  seed?: string;
  startAt?: number;
}

export const AnimatedFireflies: React.FC<AnimatedFirefliesProps> = ({
  count = 15,
  color = "#fbbf24",
  seed = "ff",
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  if (frame < startAt) return null;
  const t = (frame - startAt) / fps;

  const flies = Array.from({ length: count }, (_, i) => {
    const startX = random(`${seed}-sx-${i}`) * width;
    const startYFrac = 0.3 + random(`${seed}-sy-${i}`) * 0.7;
    const riseSpeed = 30 + random(`${seed}-rs-${i}`) * 60;
    const driftAmp = 20 + random(`${seed}-da-${i}`) * 40;
    const phase = random(`${seed}-ph-${i}`) * Math.PI * 2;
    const glowPhase = random(`${seed}-gp-${i}`) * Math.PI * 2;
    const x = startX + driftAmp * Math.sin(t * 1.2 + phase);
    const y = startYFrac * height - riseSpeed * t;
    const glow = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * 4 + glowPhase));
    const size = 6 + random(`${seed}-sz-${i}`) * 8;
    const actualY = ((y % height) + height) % height;

    return (
      <div key={i} style={{
        position: "absolute",
        left: x - size / 2,
        top: actualY - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: glow,
        boxShadow: `0 0 ${size * 2}px ${size}px ${color}`,
        pointerEvents: "none",
      }} />
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{flies}</AbsoluteFill>;
};

// ────────────────────────────────────────────────────────────────────
// NeonGlowBorder — animated neon border around a rect
// ────────────────────────────────────────────────────────────────────

interface NeonGlowBorderProps {
  color?: string;
  width: number;
  height: number;
  borderRadius?: number;
  pulseSpeed?: number;
  startAt?: number;
}

export const NeonGlowBorder: React.FC<NeonGlowBorderProps> = ({
  color = "#00ff88",
  width,
  height,
  borderRadius = 16,
  pulseSpeed = 1,
  startAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startAt) return null;
  const t = (frame - startAt) / fps;
  const pulse = 0.5 + 0.5 * Math.sin(t * pulseSpeed * Math.PI * 2);
  const blur = 8 + pulse * 16;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      borderRadius,
      border: `3px solid ${color}`,
      boxShadow: `0 0 ${blur}px ${color}, inset 0 0 ${blur / 2}px ${color}`,
      pointerEvents: "none",
    }} />
  );
};

// ────────────────────────────────────────────────────────────────────
// SteamAnimation — wavy steam lines rising upward (for food shots)
// ────────────────────────────────────────────────────────────────────

interface SteamAnimationProps {
  count?: number;
  color?: string;
  startAt?: number;
  x?: number;  // base x position (px from left)
  y?: number;  // base y position (px from top)
}

export const SteamAnimation: React.FC<SteamAnimationProps> = ({
  count = 3,
  color = "rgba(255,255,255,0.5)",
  startAt = 0,
  x = 200,
  y = 800,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startAt) return null;
  const t = (frame - startAt) / fps;

  const streams = Array.from({ length: count }, (_, i) => {
    const offsetX = (i - Math.floor(count / 2)) * 30;
    const phase = i * 0.8;
    const height = 120 + i * 20;
    const wiggle = 15 * Math.sin(t * 2 + phase);
    const opacity = 0.6 * (0.5 + 0.5 * Math.sin(t * 1.5 + phase));

    // SVG wavy path going upward
    const pathD = `M ${x + offsetX + wiggle} ${y} Q ${x + offsetX + wiggle + 20} ${y - height / 3} ${x + offsetX - wiggle} ${y - height * 0.6} Q ${x + offsetX + wiggle} ${y - height * 0.8} ${x + offsetX} ${y - height}`;

    return (
      <path key={i} d={pathD} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" opacity={opacity} />
    );
  });

  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {streams}
    </svg>
  );
};

// ────────────────────────────────────────────────────────────────────
// AnimatedCloud — floating SVG cloud shape
// ────────────────────────────────────────────────────────────────────

interface AnimatedCloudProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  opacity?: number;
  driftSpeed?: number;
  seed?: string;
}

export const AnimatedCloud: React.FC<AnimatedCloudProps> = ({
  x,
  y,
  size = 200,
  color = "#ffffff",
  opacity = 0.6,
  driftSpeed = 0.3,
  seed = "cloud",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const driftX = Math.sin(t * driftSpeed + random(`${seed}-ph`) * Math.PI * 2) * 30;
  const driftY = Math.cos(t * driftSpeed * 0.7) * 10;

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      style={{ position: "absolute", left: x + driftX, top: y + driftY, opacity, pointerEvents: "none" }}
    >
      <ellipse cx="100" cy="80" rx="90" ry="40" fill={color} />
      <ellipse cx="70" cy="65" rx="50" ry="40" fill={color} />
      <ellipse cx="130" cy="60" rx="45" ry="38" fill={color} />
      <ellipse cx="100" cy="55" rx="40" ry="35" fill={color} />
    </svg>
  );
};
