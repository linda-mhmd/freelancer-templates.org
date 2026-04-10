/**
 * SvgElements.tsx — Reusable SVG decorative components
 *
 * All components accept theme colors as props so they integrate cleanly
 * with any Theme object from themes.ts. Designed for use inside Remotion
 * compositions: pure declarative React/SVG, no DOM side effects.
 *
 * Usage:
 *   import { DiagonalLines, CircularProgress, GeometricGrid, WavePattern, ArrowMotif } from './_shared/SvgElements';
 *   <DiagonalLines color={theme.accent} opacity={0.15} />
 */

import React from 'react';

// ── Shared prop types ──────────────────────────────────────────────

interface BaseProps {
  color?: string;
  opacity?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ── DiagonalLines ──────────────────────────────────────────────────
// Inspired by the gable-cross motif common in Alpine/Central European
// heraldic design. Repeated diagonal stripes form a subtle field texture.
//
// Props:
//   color     — stroke color (default: currentColor)
//   opacity   — overall opacity (default: 0.15)
//   spacing   — gap between lines in SVG units (default: 20)
//   thickness — stroke width (default: 1)

interface DiagonalLinesProps extends BaseProps {
  spacing?: number;
  thickness?: number;
  angle?: number; // degrees, default 45
}

export const DiagonalLines: React.FC<DiagonalLinesProps> = ({
  color = 'currentColor',
  opacity = 0.15,
  width = '100%',
  height = '100%',
  spacing = 20,
  thickness = 1,
  angle = 45,
  className,
  style,
}) => {
  const patternId = `diag-${spacing}-${angle}`;
  const rad = (angle * Math.PI) / 180;
  const dx = spacing * Math.cos(rad);
  const dy = spacing * Math.sin(rad);

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={spacing}
          height={spacing}
          patternTransform={`rotate(${angle})`}
        >
          <line
            x1="0" y1="0"
            x2="0" y2={spacing}
            stroke={color}
            strokeWidth={thickness}
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        opacity={opacity}
      />
    </svg>
  );
};

// ── CircularProgress ───────────────────────────────────────────────
// Animated ring/arc progress indicator. Pass `progress` 0–1 to control
// the filled arc. Pairs well with metric cards in corporate templates.
//
// Props:
//   progress  — 0 to 1 (default: 0.72)
//   size      — diameter in px (default: 120)
//   thickness — ring stroke width (default: 8)
//   color     — arc fill color
//   trackColor — background ring color (default: semi-transparent color)

interface CircularProgressProps extends BaseProps {
  progress?: number;
  size?: number;
  thickness?: number;
  trackColor?: string;
  showLabel?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress = 0.72,
  size = 120,
  thickness = 8,
  color = '#c8a94e',
  trackColor,
  showLabel = true,
  opacity = 1,
  className,
  style,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const cx = size / 2;
  const cy = size / 2;
  const track = trackColor ?? `${color}26`; // 15% alpha fallback

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {/* Track ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={track}
        strokeWidth={thickness}
      />
      {/* Progress arc — starts at 12 o'clock (-90°) */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {showLabel && (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize={size * 0.18}
          fontWeight="600"
          fontFamily="inherit"
        >
          {Math.round(progress * 100)}%
        </text>
      )}
    </svg>
  );
};

// ── GeometricGrid ──────────────────────────────────────────────────
// Flat geometric background pattern — a repeating grid of small squares
// or diamonds. Evokes the Viennese Secession grid motif and modern
// industrial design systems. Low-opacity background texture.
//
// Props:
//   cellSize  — size of each grid cell (default: 32)
//   dotSize   — size of the dot/diamond at intersections (default: 2)
//   shape     — "dot" | "cross" | "diamond" (default: "dot")

interface GeometricGridProps extends BaseProps {
  cellSize?: number;
  dotSize?: number;
  shape?: 'dot' | 'cross' | 'diamond';
}

export const GeometricGrid: React.FC<GeometricGridProps> = ({
  color = 'currentColor',
  opacity = 0.08,
  width = '100%',
  height = '100%',
  cellSize = 32,
  dotSize = 2,
  shape = 'dot',
  className,
  style,
}) => {
  const patternId = `grid-${shape}-${cellSize}`;
  const c = cellSize;
  const d = dotSize;
  const h = d / 2;

  const shapeEl = (() => {
    switch (shape) {
      case 'cross':
        return (
          <>
            <line x1={c / 2 - d} y1={c / 2} x2={c / 2 + d} y2={c / 2} stroke={color} strokeWidth={0.8} />
            <line x1={c / 2} y1={c / 2 - d} x2={c / 2} y2={c / 2 + d} stroke={color} strokeWidth={0.8} />
          </>
        );
      case 'diamond':
        return (
          <polygon
            points={`${c / 2},${c / 2 - h * 1.5} ${c / 2 + h * 1.5},${c / 2} ${c / 2},${c / 2 + h * 1.5} ${c / 2 - h * 1.5},${c / 2}`}
            fill={color}
          />
        );
      default: // dot
        return <circle cx={c / 2} cy={c / 2} r={h} fill={color} />;
    }
  })();

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={c}
          height={c}
        >
          {shapeEl}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity={opacity} />
    </svg>
  );
};

// ── WavePattern ────────────────────────────────────────────────────
// Smooth sinusoidal wave accent line. Useful as a section divider or
// footer accent. Amplitude and frequency are configurable.
//
// Props:
//   amplitude — wave height in px (default: 12)
//   frequency — number of full wave cycles across the width (default: 2)
//   filled    — fill below the wave (default: false)

interface WavePatternProps extends BaseProps {
  amplitude?: number;
  frequency?: number;
  filled?: boolean;
  strokeWidth?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

export const WavePattern: React.FC<WavePatternProps> = ({
  color = 'currentColor',
  opacity = 0.4,
  width = '100%',
  height = 48,
  amplitude = 12,
  frequency = 2,
  filled = false,
  strokeWidth = 2,
  viewBoxWidth = 400,
  viewBoxHeight = 48,
  className,
  style,
}) => {
  const midY = viewBoxHeight / 2;
  const points: string[] = [];
  const steps = 200;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * viewBoxWidth;
    const y = midY + amplitude * Math.sin((i / steps) * frequency * 2 * Math.PI);
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
  }

  const linePath = points.join(' ');
  const fillPath = filled
    ? `${linePath} L${viewBoxWidth},${viewBoxHeight} L0,${viewBoxHeight} Z`
    : linePath;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <path
        d={fillPath}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.12 : undefined}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ── ArrowMotif ─────────────────────────────────────────────────────
// Directional arrow decoration. Can render as a single chevron, double
// chevron, or a row of arrows pointing in one direction. Useful for
// progress indicators, CTAs, and timeline connectors.
//
// Props:
//   direction — "right" | "left" | "up" | "down" (default: "right")
//   count     — number of chevrons (default: 1)
//   gap       — spacing between chevrons (default: 8)
//   size      — chevron bounding box size in px (default: 24)

interface ArrowMotifProps extends BaseProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  count?: number;
  gap?: number;
  size?: number;
  strokeWidth?: number;
}

export const ArrowMotif: React.FC<ArrowMotifProps> = ({
  color = 'currentColor',
  opacity = 0.6,
  direction = 'right',
  count = 1,
  gap = 8,
  size = 24,
  strokeWidth = 2,
  className,
  style,
}) => {
  const isHorizontal = direction === 'right' || direction === 'left';
  const totalW = isHorizontal ? count * size + (count - 1) * gap : size;
  const totalH = isHorizontal ? size : count * size + (count - 1) * gap;

  // Chevron points for a right-facing arrow, then rotated
  const rotations: Record<string, number> = { right: 0, down: 90, left: 180, up: 270 };
  const rotate = rotations[direction];
  const cx = totalW / 2;
  const cy = totalH / 2;

  const chevrons = Array.from({ length: count }, (_, i) => {
    const offset = i * (size + gap);
    const ox = isHorizontal ? offset : 0;
    const oy = isHorizontal ? 0 : offset;
    const s = size;
    // Chevron: zig-zag right-pointing within [ox, oy, ox+s, oy+s]
    const points = `M${ox + s * 0.25},${oy + s * 0.2} L${ox + s * 0.7},${oy + s * 0.5} L${ox + s * 0.25},${oy + s * 0.8}`;
    return (
      <path
        key={i}
        d={points}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={1 - i * (0.18 / Math.max(count, 1))} // subtle fade for multi-chevron
      />
    );
  });

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <g transform={`rotate(${rotate} ${cx} ${cy})`}>
        {chevrons}
      </g>
    </svg>
  );
};
