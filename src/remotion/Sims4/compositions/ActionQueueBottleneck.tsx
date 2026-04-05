// src/remotion/Sims4/compositions/ActionQueueBottleneck.tsx
// Diagram composition: Character overwhelmed by action queue + moodlet toast
// Illustrates the "Human Bottleneck" concept — split layout with queue on left, title on right

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';
import { SimsBackground } from '../components/SimsBackground';
import { Moodlet } from '../components/SimsUI';

// ── SVG Icons ────────────────────────────────────────────────────────────────

const EnvelopeIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13 2 4" />
  </svg>
);

const MonitorIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>
);

const BarChartIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

const CalendarIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const StressedIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.needsRed} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <circle cx="12" cy="16" r="0.5" fill={SIMS_COLORS.needsRed} />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

export interface ActionQueueItem {
  icon: React.ReactNode | string;
  label: string;
}

export interface ActionQueueMoodlet {
  emoji: React.ReactNode;
  title: string;
  description: string;
}

export interface ActionQueueBottleneckProps {
  characterDescription?: string;
  actionQueue?: ActionQueueItem[];
  moodlet?: ActionQueueMoodlet;
  title?: string;
  definition?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_ACTION_QUEUE: ActionQueueItem[] = [
  { icon: EnvelopeIcon, label: 'Email' },
  { icon: MonitorIcon, label: 'Code' },
  { icon: BarChartIcon, label: 'Reports' },
  { icon: CalendarIcon, label: 'Meeting' },
];

const DEFAULT_MOODLET: ActionQueueMoodlet = {
  emoji: StressedIcon,
  title: 'Burned Out',
  description: 'Too many tasks, not enough time.',
};

// ── Priority colors for queue items ──────────────────────────────────────────
const PRIORITY_COLORS = [
  SIMS_COLORS.needsRed,
  SIMS_COLORS.needsOrange,
  SIMS_COLORS.needsYellow,
  SIMS_COLORS.simsBlueLight,
];

// ── Component ────────────────────────────────────────────────────────────────

export const ActionQueueBottleneck: React.FC<ActionQueueBottleneckProps> = ({
  characterDescription = 'Overwhelmed Freelancer',
  actionQueue = DEFAULT_ACTION_QUEUE,
  moodlet = DEFAULT_MOODLET,
  title = 'The Human Bottleneck',
  definition = 'When one person is the single point of failure for every task — email, code, reports, meetings — productivity collapses under the weight of context switching.',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animation: Character area entrance ──
  const charSpring = spring({
    frame: frame - 5,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const charScale = interpolate(charSpring, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  // ── Action queue items staggered from frame 20 ──
  const queueBaseDelay = 20;

  // ── Moodlet slides in after queue completes ──
  const moodletDelay = queueBaseDelay + actionQueue.length * SIMS_TIMING.minStagger + 15;
  const moodletSpring = spring({
    frame: frame - moodletDelay,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const moodletSlideY = interpolate(moodletSpring, [0, 1], [40, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Right-side title spring entrance (frames 10–35) ──
  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Definition text fade-in (frames 35–60) ──
  const definitionOpacity = interpolate(
    frame,
    [35, 35 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill>
      {/* Background */}
      <SimsBackground variant="cas-dark" />

      {/* Split layout */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '48px 60px',
        }}
      >
        {/* ── Left side (45%): character + queue + moodlet ── */}
        <div
          style={{
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Character silhouette area with task overflow visual */}
          <div
            style={{
              width: '100%',
              height: 180,
              borderRadius: SIMS_SIZES.borderRadius.lg,
              background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlueDark}, ${SIMS_COLORS.simsBlue})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${SIMS_COLORS.simsBlueLight}44`,
              position: 'relative',
              overflow: 'hidden',
              opacity: charSpring,
              transform: `scale(${charScale})`,
            }}
          >
            {/* Subtle grid pattern overlay */}
            <svg
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0, opacity: 0.06 }}
            >
              <defs>
                <pattern id="aqb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#aqb-grid)" />
            </svg>

            {/* Person silhouette SVG */}
            <svg width="60" height="90" viewBox="0 0 60 90" fill="none" style={{ position: 'relative', zIndex: 1 }}>
              {/* Head */}
              <circle cx="30" cy="18" r="14" fill={SIMS_COLORS.simsBlueLight} opacity="0.5" />
              {/* Body */}
              <path
                d="M15 38 Q15 32 30 32 Q45 32 45 38 L48 70 Q48 76 42 76 L18 76 Q12 76 12 70 Z"
                fill={SIMS_COLORS.simsBlueLight}
                opacity="0.4"
              />
            </svg>

            {/* Floating task indicators around silhouette */}
            {actionQueue.slice(0, 3).map((_, i) => {
              const floatDelay = 10 + i * SIMS_TIMING.minStagger;
              const floatSpring = spring({
                frame: frame - floatDelay,
                fps,
                config: SIMS_SPRING.snappy,
              });
              const xPos = i === 0 ? -50 : i === 1 ? 50 : -30;
              const yPos = i === 0 ? -20 : i === 1 ? -10 : 30;
              return (
                <div
                  key={`float-${i}`}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${xPos}px)`,
                    top: `calc(50% + ${yPos}px)`,
                    width: 24,
                    height: 24,
                    borderRadius: SIMS_SIZES.borderRadius.sm,
                    background: `${PRIORITY_COLORS[i]}33`,
                    border: `1px solid ${PRIORITY_COLORS[i]}66`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: floatSpring,
                    transform: `scale(${interpolate(floatSpring, [0, 1], [0.5, 1], { extrapolateRight: 'clamp' })})`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="1" y="1" width="8" height="8" rx="1" stroke={PRIORITY_COLORS[i]} strokeWidth="1.5" />
                  </svg>
                </div>
              );
            })}

            {/* Character label */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: SIMS_FONTS.display,
                  fontSize: 13,
                  fontWeight: 700,
                  color: SIMS_COLORS.textLight,
                  opacity: 0.7,
                  background: `${SIMS_COLORS.simsBlueDark}88`,
                  padding: '3px 12px',
                  borderRadius: SIMS_SIZES.borderRadius.pill,
                }}
              >
                {characterDescription}
              </span>
            </div>
          </div>

          {/* Vertical action queue panel */}
          <div
            style={{
              background: SIMS_COLORS.panelDark,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
          >
            {/* Queue header */}
            <div
              style={{
                fontFamily: SIMS_FONTS.display,
                fontSize: 12,
                fontWeight: 800,
                color: SIMS_COLORS.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Action Queue</span>
              <span style={{ fontSize: 10, color: SIMS_COLORS.needsOrange }}>
                {actionQueue.length} pending
              </span>
            </div>

            {/* Queue items */}
            {actionQueue.map((item, i) => {
              const itemDelay = queueBaseDelay + i * SIMS_TIMING.minStagger;
              const itemSpring = spring({
                frame: frame - itemDelay,
                fps,
                config: SIMS_SPRING.entrance,
              });
              const itemSlideX = interpolate(itemSpring, [0, 1], [-30, 0], {
                extrapolateRight: 'clamp',
              });
              const priorityColor = PRIORITY_COLORS[i % PRIORITY_COLORS.length];

              return (
                <div
                  key={`queue-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: SIMS_COLORS.panelGlass,
                    borderRadius: SIMS_SIZES.borderRadius.sm,
                    padding: '10px 14px',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderLeft: `3px solid ${priorityColor}`,
                    opacity: itemSpring,
                    transform: `translateX(${itemSlideX}px)`,
                  }}
                >
                  {/* Icon container */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: SIMS_SIZES.borderRadius.sm,
                      background: `${priorityColor}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {typeof item.icon === 'string' ? (
                      <span>{item.icon}</span>
                    ) : item.icon}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 14,
                      fontWeight: 600,
                      color: SIMS_COLORS.textLight,
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Priority dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: priorityColor,
                      flexShrink: 0,
                      opacity: 0.8,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Moodlet toast — slides in from bottom after queue completes */}
          <div
            style={{
              opacity: moodletSpring,
              transform: `translateY(${moodletSlideY}px)`,
            }}
          >
            <Moodlet
              icon={moodlet.emoji}
              label={moodlet.title}
              color={SIMS_COLORS.needsRed}
              style={{
                fontSize: 14,
                padding: '8px 18px',
              }}
            />
            {moodlet.description && (
              <div
                style={{
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 12,
                  color: SIMS_COLORS.textMuted,
                  marginTop: 6,
                  marginLeft: 4,
                  opacity: interpolate(moodletSpring, [0.5, 1], [0, 1], {
                    extrapolateRight: 'clamp',
                    extrapolateLeft: 'clamp',
                  }),
                }}
              >
                {moodlet.description}
              </div>
            )}
          </div>
        </div>

        {/* ── Right side (55%): title + definition ── */}
        <div
          style={{
            width: '55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 48,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 42,
              color: SIMS_COLORS.textLight,
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              opacity: titleSpring,
              transform: `translateY(${titleSlideY}px)`,
            }}
          >
            {title}
          </div>

          {/* Definition */}
          <div
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 18,
              color: SIMS_COLORS.textMuted,
              lineHeight: 1.6,
              marginTop: 20,
              opacity: definitionOpacity,
              maxWidth: 520,
            }}
          >
            {definition}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
