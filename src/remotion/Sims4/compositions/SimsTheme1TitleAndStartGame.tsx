// src/remotion/Sims4/compositions/SimsTheme1TitleAndStartGame.tsx
// Composition: Title screen with plumbob, menu buttons, tagline, and notification toast
// Based on the Sims 4 main menu design — cinematic sky background

import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { SimsComposition } from '../helpers/SimsComposition';
import { CinematicFullScreen } from '../templates/CinematicFullScreen';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SPRING, SIMS_TIMING } from '../data/simsTheme';
import { Plumbob, NotificationToast } from '../components/SimsUI';
import { Lightbulb } from 'lucide-react';

export interface SimsTheme1TitleAndStartGameProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  loadingTip?: string;
}

export const SimsTheme1TitleAndStartGame: React.FC<SimsTheme1TitleAndStartGameProps> = ({
  title = 'Enterprise AI: The Expansion Pack',
  subtitle = 'Moving from 1:1 Automation to B2B2C Ecosystems.',
  tagline = 'Reticulating Splines… I mean, aligning stakeholders.',
  loadingTip = 'Reticulating Splines... I mean, aligning stakeholders.',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const menuItems = ['New Game', 'Load Game', 'Gallery', 'Options'];

  // ── Logo entrance ──
  const logoScale = spring({
    frame: frame - 8,
    fps,
    config: SIMS_SPRING.gentle,
    from: 0.85,
    to: 1,
    durationInFrames: 30,
  });
  const logoOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ── Subtitle + tagline fade-ins ──
  const subtitleOpacity = interpolate(
    frame,
    [30, 30 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );
  const taglineOpacity = interpolate(
    frame,
    [55, 55 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  // ── Bottom bar fade-in ──
  const barOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ── Divider line ──
  const dividerSpring = spring({
    frame: frame - 28,
    fps,
    config: SIMS_SPRING.entrance,
  });

  const layout = <CinematicFullScreen background="cinematic" />;

  return (
    <SimsComposition layout={layout}>
      {/* ── Center logo area ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -55%) scale(${logoScale})`,
          opacity: logoOpacity,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Plumbob */}
        <div style={{ marginBottom: 40 }}>
          <Plumbob size={70} animate />
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 56,
            color: SIMS_COLORS.textLight,
            lineHeight: 1.1,
            textShadow: `0 4px 30px rgba(0,0,0,0.6), 0 0 80px rgba(21,101,192,0.3)`,
            letterSpacing: '-0.5px',
            maxWidth: 600,
          }}
        >
          {title}
        </h1>

        {/* Divider */}
        <div
          style={{
            width: interpolate(dividerSpring, [0, 1], [0, 120]),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${SIMS_COLORS.plumbobGlow}, transparent)`,
            margin: '16px 0',
            opacity: subtitleOpacity,
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            fontFamily: SIMS_FONTS.body,
            fontSize: 20,
            color: 'rgba(255,255,255,0.7)',
            opacity: subtitleOpacity,
            lineHeight: 1.5,
            maxWidth: 500,
          }}
        >
          {subtitle}
        </p>

        {/* Menu buttons */}
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {menuItems.map((item, i) => {
            const btnDelay = 45 + i * SIMS_TIMING.minStagger;
            const btnSpring = spring({
              frame: frame - btnDelay,
              fps,
              config: SIMS_SPRING.snappy,
            });
            const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1], {
              extrapolateRight: 'clamp',
            });
            const btnSlide = interpolate(btnSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
              extrapolateRight: 'clamp',
            });
            const isFirst = i === 0;
            return (
              <div
                key={item}
                style={{
                  width: 240,
                  padding: '10px 0',
                  borderRadius: 24,
                  background: isFirst
                    ? `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`
                    : SIMS_COLORS.panelGlass,
                  border: isFirst ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  textAlign: 'center' as const,
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 15,
                  fontWeight: isFirst ? 700 : 500,
                  color: isFirst ? SIMS_COLORS.textLight : 'rgba(255,255,255,0.6)',
                  letterSpacing: 0.5,
                  opacity: btnOpacity,
                  transform: `translateY(${btnSlide}px)`,
                  boxShadow: isFirst
                    ? `0 4px 20px rgba(21,101,192,0.4)`
                    : 'none',
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tagline ── */}
      {tagline && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: SIMS_FONTS.body,
            fontSize: 15,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.35)',
            textAlign: 'center' as const,
            opacity: taglineOpacity,
            maxWidth: 700,
          }}
        >
          {tagline}
        </div>
      )}

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontFamily: SIMS_FONTS.body,
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          opacity: barOpacity,
        }}
      >
        <span>{loadingTip}</span>
        <span>v4.0 — Enterprise Edition</span>
      </div>

      {/* ── Notification toast ── */}
      <Sequence from={80}>
        <div style={{ position: 'absolute', top: 20, right: 24 }}>
          <NotificationToast
            icon={<Lightbulb size={20} color="white" />}
            title="New Expansion Available!"
            subtitle="Enterprise mode unlocked"
            variant="success"
            startFrame={0}
          />
        </div>
      </Sequence>
    </SimsComposition>
  );
};
