/**
 * Shared UI Components for Freelancer Video Templates
 * 
 * These are small, reusable building blocks used across multiple templates.
 * Each component is theme-aware - pass a Theme object for consistent styling.
 * 
 * Components:
 *   CountUp        - Animated number counter (0 → target)
 *   GradientBadge  - Pill-shaped badge with gradient background
 *   GlassCard      - Card with glassmorphism effect
 *   StarRating     - Animated star rating display (1–5)
 *   QuoteMarks     - Large decorative quotation marks
 *   BackgroundGrid - Subtle SVG grid overlay
 */

import React from "react";
import { interpolate, spring } from "remotion";
import type { Theme } from "./themes";
import type { VideoFormat } from "./formats";
import { springEntrance, slideIn, SPRING } from "./animations";

// ── CountUp ─────────────────────────────────────────────────────
// Animates a number from 0 to `target` over 60 frames with cubic ease-out.
// Usage: <CountUp target={95} frame={frame} startFrame={50} suffix="%" />
export const CountUp: React.FC<{
  target: number;
  frame: number;
  startFrame: number;
  suffix?: string;
  duration?: number; // frames, default 60
}> = ({ target, frame, startFrame, suffix = "", duration = 60 }) => {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = Math.round(eased * target);
  const formatted = value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;
  return <>{formatted}{suffix}</>;
};

// ── GradientBadge ───────────────────────────────────────────────
// Pill-shaped badge with gradient background. Good for CTAs, status labels.
// Usage: <GradientBadge text="Get Started" theme={theme} />
export const GradientBadge: React.FC<{
  text: string;
  theme: Theme;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ text, theme, fontSize = 13, style }) => (
  <div style={{
    background: theme.accentGradient,
    borderRadius: 999,
    padding: "8px 24px",
    fontSize,
    fontWeight: 600,
    fontFamily: theme.fontFamily,
    color: "#ffffff",
    display: "inline-block",
    ...style,
  }}>
    {text}
  </div>
);

// ── GlassCard ───────────────────────────────────────────────────
// Card with glassmorphism effect. Adapts to theme colors.
// Usage: <GlassCard theme={theme}><YourContent /></GlassCard>
export const GlassCard: React.FC<{
  theme: Theme;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ theme, children, style }) => (
  <div style={{
    background: theme.bgGlass,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: 12,
    padding: "20px 24px",
    backdropFilter: "blur(12px)",
    boxShadow: theme.cardShadow,
    ...style,
  }}>
    {children}
  </div>
);

// ── StarRating ──────────────────────────────────────────────────
// Displays 1–5 stars with staggered fade-in animation.
// Usage: <StarRating rating={5} frame={frame} startFrame={60} />
export const StarRating: React.FC<{
  rating: number;
  frame: number;
  startFrame: number;
  fps: number;
  size?: number;
  color?: string;
}> = ({ rating, frame, startFrame, fps, size = 24, color = "#fbbf24" }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {Array.from({ length: 5 }, (_, i) => {
      const s = springEntrance(frame, fps, startFrame + i * 6, SPRING.snappy);
      const filled = i < rating;
      return (
        <div key={i} style={{
          fontSize: size,
          opacity: s,
          transform: `scale(${interpolate(s, [0, 1], [0.3, 1])})`,
          color: filled ? color : "rgba(255,255,255,0.15)",
        }}>
          x
        </div>
      );
    })}
  </div>
);

// ── QuoteMarks ──────────────────────────────────────────────────
// Large decorative quotation marks for testimonial templates.
// Usage: <QuoteMarks theme={theme} frame={frame} fps={fps} startFrame={10} />
export const QuoteMarks: React.FC<{
  theme: Theme;
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ theme, frame, fps, startFrame }) => {
  const s = springEntrance(frame, fps, startFrame, SPRING.gentle);
  return (
    <div style={{
      fontSize: 120,
      fontFamily: "Georgia, serif",
      color: theme.accent,
      opacity: interpolate(s, [0, 1], [0, 0.3]),
      lineHeight: 0.8,
      transform: `translateY(${slideIn(s, "up", 20)}px)`,
      userSelect: "none",
    }}>
      &ldquo;
    </div>
  );
};

// ── BackgroundGrid ──────────────────────────────────────────────
// Subtle SVG grid overlay. Use as the first child inside AbsoluteFill.
// Usage: <BackgroundGrid opacity={0.04} />
// 
// VARIANT OPTIONS:
//   pattern="grid"  - square grid (default)
//   pattern="dots"  - dot matrix
//   pattern="hex"   - hexagonal pattern
export const BackgroundGrid: React.FC<{
  opacity?: number;
  pattern?: "grid" | "dots" | "hex";
  color?: string;
}> = ({ opacity = 0.04, pattern = "grid", color = "#fff" }) => {
  const patternId = `bg-${pattern}-tmpl`;
  
  let patternSvg: React.ReactNode;
  if (pattern === "dots") {
    patternSvg = (
      <pattern id={patternId} width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1" fill={color} />
      </pattern>
    );
  } else if (pattern === "hex") {
    patternSvg = (
      <pattern id={patternId} width="56" height="100" patternUnits="userSpaceOnUse">
        <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke={color} strokeWidth="0.5" />
        <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    );
  } else {
    patternSvg = (
      <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <svg width="100%" height="100%">
        <defs>{patternSvg}</defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};


// ── ProgressBar ─────────────────────────────────────────────────
// Animated horizontal progress bar. Fills from 0% to `progress`%.
// Usage: <ProgressBar progress={75} frame={frame} startFrame={60} theme={theme} />
export const ProgressBar: React.FC<{
  progress: number;       // 0–100
  frame: number;
  startFrame: number;
  theme: Theme;
  height?: number;
  duration?: number;      // frames to fill, default 40
  label?: string;
  showPercent?: boolean;
}> = ({ progress, frame, startFrame, theme, height = 8, duration = 40, label, showPercent = true }) => {
  const fill = interpolate(frame, [startFrame, startFrame + duration], [0, progress], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <div>
      {(label || showPercent) && (
        <div style={{
          display: "flex", justifyContent: "space-between", marginBottom: 6,
          fontSize: 12, fontFamily: theme.fontFamily,
        }}>
          {label && <span style={{ color: theme.textSecondary }}>{label}</span>}
          {showPercent && <span style={{ color: theme.textMuted }}>{Math.round(fill)}%</span>}
        </div>
      )}
      <div style={{
        width: "100%", height, borderRadius: height / 2,
        background: theme.bgSecondary, overflow: "hidden",
      }}>
        <div style={{
          width: `${fill}%`, height: "100%", borderRadius: height / 2,
          background: theme.accentGradient,
          transition: "none",
        }} />
      </div>
    </div>
  );
};

// ── StatusBadge ─────────────────────────────────────────────────
// Small colored badge for status indicators (completed, in-progress, etc.)
// Usage: <StatusBadge status="completed" theme={theme} />
//
// CUSTOMIZE: Add more status types by extending the statusColors map.
export const StatusBadge: React.FC<{
  status: "completed" | "in-progress" | "upcoming" | "on-track" | "ahead" | "needs-attention";
  theme: Theme;
  style?: React.CSSProperties;
}> = ({ status, theme, style }) => {
  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    "completed": { bg: "rgba(34,197,94,0.15)", text: "#22c55e", label: "Completed" },
    "in-progress": { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", label: "In Progress" },
    "upcoming": { bg: "rgba(148,163,184,0.15)", text: "#94a3b8", label: "Upcoming" },
    "on-track": { bg: "rgba(34,197,94,0.15)", text: "#22c55e", label: "On Track" },
    "ahead": { bg: "rgba(99,102,241,0.15)", text: "#6366f1", label: "Ahead" },
    "needs-attention": { bg: "rgba(239,68,68,0.15)", text: "#ef4444", label: "Needs Attention" },
  };
  const s = statusColors[status] || statusColors["upcoming"];
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: theme.fontFamily,
      background: s.bg,
      color: s.text,
      letterSpacing: 0.5,
      ...style,
    }}>
      {s.label}
    </span>
  );
};

// ── TimelineDot ─────────────────────────────────────────────────
// A single dot on a vertical timeline with connecting line.
// Usage: <TimelineDot completed={true} theme={theme} isLast={false} />
export const TimelineDot: React.FC<{
  completed: boolean;
  theme: Theme;
  isLast?: boolean;
}> = ({ completed, theme, isLast = false }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{
      width: 12, height: 12, borderRadius: "50%",
      background: completed ? theme.accent : theme.bgSecondary,
      border: `2px solid ${completed ? theme.accent : theme.cardBorder}`,
      flexShrink: 0,
    }} />
    {!isLast && (
      <div style={{
        width: 2, flex: 1, minHeight: 20,
        background: completed ? theme.accent : theme.cardBorder,
        opacity: 0.4,
      }} />
    )}
  </div>
);


// ── WaveformBars ────────────────────────────────────────────────
// Animated vertical bars simulating an audio waveform.
// Each bar uses spring-based height oscillation, staggered by 2 frames.
// Usage: <WaveformBars barCount={16} frame={frame} startFrame={30} fps={30} theme={theme} />
export const WaveformBars: React.FC<{
  barCount: number;
  frame: number;
  startFrame: number;
  fps: number;
  theme: Theme;
  height?: number;
}> = ({ barCount, frame, startFrame, fps, theme, height = 80 }) => {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {Array.from({ length: barCount }, (_, i) => {
        const delay = startFrame + i * 2;
        const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
        const barHeight = interpolate(s, [0, 1], [0, height * (0.3 + 0.7 * Math.abs(Math.sin((i + 1) * 0.8)))], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              width: Math.max(2, Math.floor(100 / barCount)),
              height: "100%",
              background: theme.bgSecondary,
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: barHeight,
                background: theme.accent,
                borderRadius: 2,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// ── CountdownTimer ──────────────────────────────────────────────
// Animated countdown digits using CountUp pattern in reverse (targetValue → 0).
// Usage: <CountdownTimer targetValue={30} frame={frame} startFrame={10} theme={theme} />
export const CountdownTimer: React.FC<{
  targetValue: number;
  frame: number;
  startFrame: number;
  theme: Theme;
  duration?: number;
}> = ({ targetValue, frame, startFrame, theme, duration = 60 }) => {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = Math.round(targetValue * (1 - eased));
  return (
    <span
      style={{
        fontFamily: theme.fontFamily,
        fontVariantNumeric: "tabular-nums",
        color: theme.textPrimary,
        fontWeight: 700,
      }}
    >
      {value}
    </span>
  );
};

// ── SplitScreen ─────────────────────────────────────────────────
// Two panels side-by-side with an animated divider line.
// Divider slides in from top using spring entrance.
// Usage: <SplitScreen leftContent={<Left />} rightContent={<Right />} frame={frame} startFrame={20} fps={30} theme={theme} />
export const SplitScreen: React.FC<{
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  splitRatio?: number;
  frame: number;
  startFrame: number;
  fps: number;
  theme: Theme;
  dividerAnimated?: boolean;
}> = ({ leftContent, rightContent, splitRatio = 0.5, frame, startFrame, fps, theme, dividerAnimated = true }) => {
  const s = springEntrance(frame, fps, startFrame, SPRING.default);
  const dividerHeight = dividerAnimated
    ? interpolate(s, [0, 1], [0, 100], { extrapolateRight: "clamp" })
    : 100;
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
      <div style={{ flex: `0 0 ${splitRatio * 100}%`, overflow: "hidden" }}>
        {leftContent}
      </div>
      <div
        style={{
          width: 2,
          background: theme.cardBorder,
          alignSelf: "center",
          height: `${dividerHeight}%`,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {rightContent}
      </div>
    </div>
  );
};

// ── StepIndicator ───────────────────────────────────────────────
// Numbered circle with status-dependent styling.
// Usage: <StepIndicator stepNumber={1} status="active" label="Setup" theme={theme} />
export const StepIndicator: React.FC<{
  stepNumber: number;
  status: "pending" | "active" | "completed";
  label: string;
  theme: Theme;
}> = ({ stepNumber, status, label, theme }) => {
  const isActive = status === "active" || status === "completed";
  const circleColor = isActive ? theme.accent : theme.textMuted;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: isActive ? circleColor : "transparent",
          border: `2px solid ${circleColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: theme.fontFamily,
          color: isActive ? "#ffffff" : circleColor,
          flexShrink: 0,
        }}
      >
        {status === "completed" ? "+" : stepNumber}
      </div>
      <span
        style={{
          fontSize: 14,
          fontFamily: theme.fontFamily,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? theme.textPrimary : theme.textMuted,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ── ComparisonTable ─────────────────────────────────────────────
// Two-column comparison layout with animated row entrances staggered by 20 frames.
// Usage: <ComparisonTable rows={[...]} leftHeader="Before" rightHeader="After" frame={frame} startFrame={30} fps={30} theme={theme} />
export const ComparisonTable: React.FC<{
  rows: Array<{ label: string; left: string; right: string }>;
  leftHeader: string;
  rightHeader: string;
  frame: number;
  startFrame: number;
  fps: number;
  theme: Theme;
}> = ({ rows, leftHeader, rightHeader, frame, startFrame, fps, theme }) => {
  return (
    <div style={{ width: "100%" }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div style={{ flex: 1, fontSize: 11, fontWeight: 700, fontFamily: theme.fontFamily, color: theme.textMuted }}>
          &nbsp;
        </div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700, fontFamily: theme.fontFamily, color: theme.accent, textAlign: "center" }}>
          {leftHeader}
        </div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700, fontFamily: theme.fontFamily, color: theme.accent, textAlign: "center" }}>
          {rightHeader}
        </div>
      </div>
      {/* Data rows */}
      {rows.map((row, i) => {
        const delay = startFrame + i * 20;
        const s = springEntrance(frame, fps, delay, SPRING.default);
        const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
        const tx = slideIn(s, "right", 30);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 8,
              opacity,
              transform: `translateX(${tx}px)`,
            }}
          >
            <div
              style={{
                flex: 1,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                boxShadow: theme.cardShadow,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                {row.label}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                boxShadow: theme.cardShadow,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 13, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
                {row.left}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: theme.bgGlass,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                padding: "10px 14px",
                backdropFilter: "blur(12px)",
                boxShadow: theme.cardShadow,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 13, fontFamily: theme.fontFamily, color: theme.textPrimary }}>
                {row.right}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Brand Logo ──────────────────────────────────────────────────
// Renders a brand logo image when logoUrl is provided.
// Position: "header" (top-left) or "footer" (bottom-center).
export const BrandLogo: React.FC<{
  logoUrl?: string;
  position?: "header" | "footer";
  theme: Theme;
}> = ({ logoUrl, position = "header", theme }) => {
  if (!logoUrl) return null;
  const isHeader = position === "header";
  return (
    <div style={{
      position: "absolute",
      ...(isHeader
        ? { top: 16, left: 24 }
        : { bottom: 16, left: "50%", transform: "translateX(-50%)" }),
      zIndex: 10,
    }}>
      <img
        src={logoUrl}
        alt="Brand logo"
        style={{
          height: isHeader ? 28 : 24,
          objectFit: "contain",
          opacity: 0.9,
        }}
      />
    </div>
  );
};

// ── CaptionOverlay ──────────────────────────────────────────────
// Renders active captions as a text overlay at the bottom of the video.
// Fades in at startFrame, fades out at endFrame. Adapts position for format.
export interface CaptionItem {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const CaptionOverlay: React.FC<{
  captions: CaptionItem[];
  frame: number;
  theme: Theme;
  format?: VideoFormat;
}> = ({ captions, frame, theme, format }) => {
  const active = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );
  if (!active) return null;

  const fadeIn = interpolate(frame, [active.startFrame, active.startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [active.endFrame - 8, active.endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const isVertical = format === "vertical";
  const bottomOffset = isVertical ? 120 : 48;
  const fontSize = isVertical ? 28 : 24;
  const paddingH = isVertical ? 24 : 32;

  return (
    <div
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.65)",
          borderRadius: 8,
          padding: `10px ${paddingH}px`,
          maxWidth: "80%",
        }}
      >
        <span
          style={{
            color: theme.textPrimary,
            fontFamily: theme.fontFamily,
            fontWeight: theme.bodyWeight,
            fontSize,
            lineHeight: 1.4,
            textAlign: "center",
            display: "block",
          }}
        >
          {active.text}
        </span>
      </div>
    </div>
  );
};

