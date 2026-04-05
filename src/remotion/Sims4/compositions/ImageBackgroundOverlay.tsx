// src/remotion/Sims4/compositions/ImageBackgroundOverlay.tsx
// Reusable template: Full-bleed screenshot background with dark overlay + animated content cards
// Used for AI Timeline, Meet Otto, Otto's Supporting Agents, Taking Over Tasks scenes

import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
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

// ── Types ────────────────────────────────────────────────────────────────────

export interface ContentCard {
  icon: React.ReactNode | string;
  title: string;
  description: string;
}

export interface ImageBackgroundOverlayProps {
  backgroundImage?: string;
  overlayOpacity?: number;
  title?: string;
  subtitle?: string;
  cards?: ContentCard[];
}

// ── Component ────────────────────────────────────────────────────────────────

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CARDS: ContentCard[] = [
  { icon: '🤖', title: 'Foundation Models', description: 'Large language models that understand and generate text.' },
  { icon: '🧠', title: 'Reasoning Engines', description: 'Chain-of-thought and multi-step problem solving.' },
  { icon: '🔧', title: 'Tool Integration', description: 'Connecting models to APIs, databases, and services.' },
  { icon: '🚀', title: 'Autonomous Agents', description: 'Self-directed systems that plan, act, and learn.' },
];

export const ImageBackgroundOverlay: React.FC<ImageBackgroundOverlayProps> = ({
  backgroundImage = 'backgrounds/cas-stage-bg.png',
  overlayOpacity = 0.6,
  title = 'The AI Timeline',
  subtitle = 'How we got here — and where we\'re going',
  cards = DEFAULT_CARDS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Overlay fade-in (frames 0–5) ──
  const overlayFade = interpolate(frame, [0, 5], [0, overlayOpacity], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Title spring entrance (frames 5–30) ──
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: SIMS_SPRING.entrance,
  });

  // ── Subtitle fade-in (frames 15–40) ──
  const subtitleOpacity = interpolate(
    frame,
    [15, 15 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Card stagger helper ──
  const cardStagger = (index: number) =>
    spring({
      frame: frame - (40 + index * SIMS_TIMING.minStagger),
      fps,
      config: SIMS_SPRING.entrance,
    });

  return (
    <AbsoluteFill>
      {/* Full-bleed background image */}
      <AbsoluteFill>
        <Img
          src={staticFile(backgroundImage)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayFade})`,
        }}
      />

      {/* Content zone */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 1120,
          margin: '0 auto',
          padding: '48px 80px',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 44,
            color: SIMS_COLORS.textLight,
            lineHeight: 1.1,
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            letterSpacing: '-0.5px',
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], { extrapolateRight: 'clamp' })}px)`,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 18,
              color: SIMS_COLORS.textAccent,
              fontWeight: 600,
              marginTop: 8,
              opacity: subtitleOpacity,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Cards grid (2-column) */}
        {cards.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginTop: 32,
            }}
          >
            {cards.map((card, i) => {
              const cardProgress = cardStagger(i);
              const slideY = interpolate(
                cardProgress,
                [0, 1],
                [SIMS_TIMING.entranceOffset, 0],
                { extrapolateRight: 'clamp' },
              );

              return (
                <div
                  key={card.title}
                  style={{
                    width: 'calc(50% - 8px)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    background: SIMS_COLORS.panelGlass,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: SIMS_SIZES.borderRadius.md,
                    padding: '16px 18px',
                    opacity: cardProgress,
                    transform: `translateY(${slideY}px)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: SIMS_SIZES.borderRadius.sm,
                      background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                  {typeof card.icon === 'string' ? (
                    <span style={{ fontSize: 18, color: '#fff' }}>{card.icon}</span>
                  ) : card.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontWeight: 800,
                        fontSize: 15,
                        color: SIMS_COLORS.textLight,
                        lineHeight: 1.2,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.4,
                        marginTop: 3,
                      }}
                    >
                      {card.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
