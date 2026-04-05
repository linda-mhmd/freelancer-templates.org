// src/remotion/Sims4/compositions/EventSummary.tsx
// Template composition: Event/lesson summary with medals, score breakdown, stat counters, status badge
// For closing/recap scenes

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SimsBackground } from '../components/SimsBackground';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';

// ── CountUp utility ──────────────────────────────────────────────────────────
// Exported so Property 7 (CountUp convergence) can test it directly.

/**
 * Compute the displayed counter value at a given frame.
 * Uses cubic ease-out: 1 - (1 - progress)^3
 * Returns 0 at frame <= startFrame, target at frame >= startFrame + 60.
 */
export function countUp(target: number, frame: number, startFrame: number): number {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / 60));
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(eased * target);
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = SIMS_COLORS.needsYellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M8 2h8v2H8V2z" fill={color} opacity={0.3} />
    <path d="M6 4h12v6a6 6 0 01-12 0V4z" stroke={color} strokeWidth={1.8} fill={`${color}20`} />
    <path d="M6 6H3a1 1 0 00-1 1v1a4 4 0 004 4" stroke={color} strokeWidth={1.5} />
    <path d="M18 6h3a1 1 0 011 1v1a4 4 0 01-4 4" stroke={color} strokeWidth={1.5} />
    <line x1={12} y1={16} x2={12} y2={19} stroke={color} strokeWidth={1.8} />
    <rect x={8} y={19} width={8} height={2.5} rx={1} fill={color} opacity={0.5} />
  </svg>
);

const TargetIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = SIMS_COLORS.needsOrange }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.5} />
    <circle cx={12} cy={12} r={6} stroke={color} strokeWidth={1.5} opacity={0.7} />
    <circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.5} opacity={0.5} />
    <circle cx={12} cy={12} r={1} fill={color} />
  </svg>
);

const WrenchIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = SIMS_COLORS.simsBlueLight }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={color} strokeWidth={1.8} fill={`${color}15`} />
  </svg>
);

const BookIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = SIMS_COLORS.plumbobGreen }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 4h6a2 2 0 012 2v14a1.5 1.5 0 00-1.5-1.5H4V4z" stroke={color} strokeWidth={1.8} fill={`${color}12`} />
    <path d="M20 4h-6a2 2 0 00-2 2v14a1.5 1.5 0 011.5-1.5H20V4z" stroke={color} strokeWidth={1.8} fill={`${color}12`} />
  </svg>
);

const UsersIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = SIMS_COLORS.needsPurple }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={9} cy={7} r={3.5} stroke={color} strokeWidth={1.8} fill={`${color}15`} />
    <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" stroke={color} strokeWidth={1.8} />
    <circle cx={17} cy={8} r={2.5} stroke={color} strokeWidth={1.5} opacity={0.7} />
    <path d="M18 15h2a3 3 0 013 3v2" stroke={color} strokeWidth={1.5} opacity={0.7} />
  </svg>
);

const CheckCircleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = SIMS_COLORS.plumbobGreen }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} fill={`${color}15`} />
    <path d="M7 12.5l3 3 7-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlaskIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = SIMS_COLORS.simsBlueLight }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 3h6M10 3v7.4L4.6 19.2A1.5 1.5 0 005.8 21h12.4a1.5 1.5 0 001.2-1.8L14 10.4V3" stroke={color} strokeWidth={1.8} strokeLinecap="round" fill={`${color}10`} />
    <path d="M7 15h10" stroke={color} strokeWidth={1.2} opacity={0.5} />
  </svg>
);

const ChartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = SIMS_COLORS.needsOrange }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={3} y={12} width={4} height={9} rx={1} fill={color} opacity={0.4} />
    <rect x={10} y={7} width={4} height={14} rx={1} fill={color} opacity={0.6} />
    <rect x={17} y={3} width={4} height={18} rx={1} fill={color} opacity={0.8} />
  </svg>
);

const SparkleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = SIMS_COLORS.needsYellow }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 0l1.5 5.5L16 8l-6.5 2.5L8 16l-1.5-5.5L0 8l6.5-2.5z" fill={color} />
  </svg>
);

const BadgeCheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = SIMS_COLORS.textLight }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 12.5l3 3 7-7" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

interface MedalItem {
  icon: React.ReactNode;
  label: string;
}

interface ScoreItem {
  icon: React.ReactNode;
  text: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface EventSummaryProps {
  summaryTitle?: string;
  medals?: MedalItem[];
  scoreBreakdown?: ScoreItem[];
  stats?: StatItem[];
  statusBadge?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_MEDALS: MedalItem[] = [
  { icon: <TrophyIcon size={28} />, label: 'Brain vs Body' },
  { icon: <TargetIcon size={28} />, label: 'Orchestration' },
  { icon: <WrenchIcon size={28} />, label: 'Tools' },
  { icon: <BookIcon size={28} />, label: 'RAG' },
  { icon: <UsersIcon size={28} />, label: 'Multi-Agent' },
];

const DEFAULT_SCORE_BREAKDOWN: ScoreItem[] = [
  { icon: <CheckCircleIcon />, text: '5 lessons covered' },
  { icon: <FlaskIcon />, text: '3 live demos shown' },
  { icon: <ChartIcon />, text: '12 diagrams explained' },
];

const DEFAULT_STATS: StatItem[] = [
  { value: 5, suffix: '', label: 'Lessons' },
  { value: 15, suffix: 'min', label: 'Runtime' },
  { value: 100, suffix: '%', label: 'Completion' },
];

// ── Component ────────────────────────────────────────────────────────────────

export const EventSummary: React.FC<EventSummaryProps> = ({
  summaryTitle = 'Lesson Complete',
  medals = DEFAULT_MEDALS,
  scoreBreakdown = DEFAULT_SCORE_BREAKDOWN,
  stats = DEFAULT_STATS,
  statusBadge = 'Event Complete',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animation: Medals bounce in (frames 0–30) with SIMS_SPRING.snappy ──
  const medalSprings = medals.map((_, i) =>
    spring({
      frame: frame - i * 8,
      fps,
      config: SIMS_SPRING.snappy,
    }),
  );

  // ── Animation: Title entrance (frames 20–45) ──
  const titleSpring = spring({
    frame: frame - 20,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Animation: Status badge fade-in (frame 180+) ──
  const badgeOpacity = interpolate(
    frame,
    [180, 180 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );
  const badgeSlideY = interpolate(
    frame,
    [180, 180 + SIMS_TIMING.fadeInFrames],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill>
      {/* Background */}
      <SimsBackground variant="cas-light" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 60px',
          alignItems: 'center',
        }}
      >
        {/* ── Top: Medal icons row ── */}
        {medals.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            {medals.map((medal, i) => {
              const s = medalSprings[i];
              const scale = interpolate(s, [0, 1], [0.3, 1], {
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={`medal-${i}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    opacity: s,
                    transform: `scale(${scale})`,
                  }}
                >
                  {/* Gold circle with sparkle */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${SIMS_COLORS.needsYellow}, ${SIMS_COLORS.needsOrange})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 16px ${SIMS_COLORS.needsYellow}66`,
                      position: 'relative',
                    }}
                  >
                    {medal.icon}
                    {/* Sparkle */}
                    <div
                      style={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                        opacity: interpolate(s, [0.5, 1], [0, 1], {
                          extrapolateRight: 'clamp',
                          extrapolateLeft: 'clamp',
                        }),
                      }}
                    >
                      <SparkleIcon size={14} />
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 11,
                      color: SIMS_COLORS.textPrimary,
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {medal.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Title ── */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 38,
            color: SIMS_COLORS.textPrimary,
            lineHeight: 1.2,
            textAlign: 'center',
            opacity: titleSpring,
            transform: `translateY(${titleSlideY}px)`,
            marginBottom: 28,
          }}
        >
          {summaryTitle}
        </div>

        {/* ── Two-column layout: Score breakdown (left) + Stat counters (right) ── */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            width: '100%',
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Left column: Score breakdown */}
          {scoreBreakdown.length > 0 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {scoreBreakdown.map((item, i) => {
                const delay = 40 + i * SIMS_TIMING.minStagger;
                const itemOpacity = interpolate(
                  frame,
                  [delay, delay + SIMS_TIMING.fadeInFrames],
                  [0, 1],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                );
                const itemSlideX = interpolate(
                  frame,
                  [delay, delay + SIMS_TIMING.fadeInFrames],
                  [-SIMS_TIMING.entranceOffset, 0],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                );
                return (
                  <div
                    key={`score-${i}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      background: SIMS_COLORS.panelGlass,
                      borderRadius: SIMS_SIZES.borderRadius.md,
                      padding: '10px 16px',
                      opacity: itemOpacity,
                      transform: `translateX(${itemSlideX}px)`,
                    }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 14,
                        color: SIMS_COLORS.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Right column: Stat counters */}
          {stats.length > 0 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                justifyContent: 'center',
              }}
            >
              {stats.map((stat, i) => {
                const startFrame = 60 + i * SIMS_TIMING.minStagger;
                const statOpacity = interpolate(
                  frame,
                  [startFrame, startFrame + 10],
                  [0, 1],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                );
                return (
                  <div
                    key={`stat-${i}`}
                    style={{
                      textAlign: 'center',
                      opacity: statOpacity,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontWeight: 900,
                        fontSize: 42,
                        color: SIMS_COLORS.simsBlue,
                        lineHeight: 1.1,
                      }}
                    >
                      {countUp(stat.value, frame, startFrame)}
                      {stat.suffix}
                    </div>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 13,
                        color: SIMS_COLORS.textMuted,
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Bottom: Status badge (green pill) ── */}
        {statusBadge && (
          <div
            style={{
              marginTop: 20,
              opacity: badgeOpacity,
              transform: `translateY(${badgeSlideY}px)`,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: SIMS_COLORS.plumbobGreen,
                borderRadius: SIMS_SIZES.borderRadius.pill,
                padding: '8px 24px',
                boxShadow: `0 4px 16px ${SIMS_COLORS.plumbobGreen}44`,
              }}
            >
              <BadgeCheckIcon size={16} />
              <span
                style={{
                  fontFamily: SIMS_FONTS.display,
                  fontWeight: 700,
                  fontSize: 15,
                  color: SIMS_COLORS.textLight,
                  letterSpacing: '0.3px',
                }}
              >
                {statusBadge}
              </span>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
