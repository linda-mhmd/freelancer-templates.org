// src/remotion/Sims4/compositions/TitleScreenCinematic.tsx
// Cinematic title card with Plumbob, title, subtitle, menu pills
// Uses SimsComposition + CinematicFullScreen layout + TitleBlock element

import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SPRING,
  SIMS_TIMING,
  SIMS_SIZES,
} from '../data/simsTheme';
import { Plumbob, NotificationToast } from '../components/SimsUI';
import { SimsComposition } from '../helpers/SimsComposition';
import { CinematicFullScreen } from '../templates';
import { TitleBlock } from '../elements';

export interface TitleScreenCinematicProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  menuItems?: string[];
}

const DEFAULT_MENU_ITEMS = [
  '\u25B6 Resume Game',
  'New Game',
  'Gallery',
  'Options',
];

const TIMING = {
  plumbob: 5,
  title: 15,
  menuItems: 50,
  tagline: 80,
  bottomBar: 60,
  toast: 80,
};

const MENU_STAGGER = 20;

export const TitleScreenCinematic: React.FC<TitleScreenCinematicProps> = ({
  title = 'Enterprise AI: The Expansion Pack',
  subtitle = 'Moving from 1:1 Automation to B2B2C Ecosystems.',
  tagline = 'Reticulating Splines\u2026 I mean, aligning stakeholders.',
  menuItems = DEFAULT_MENU_ITEMS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SimsComposition layout={<CinematicFullScreen background="cinematic" />}>
      {/* Plumbob centered above title */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -220px)',
          opacity: interpolate(
            frame,
            [TIMING.plumbob, TIMING.plumbob + 20],
            [0, 1],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
          ),
          zIndex: 10,
        }}
      >
        <Plumbob size={80} animate />
      </div>

      {/* Title + Subtitle via TitleBlock element */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 700,
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        <TitleBlock
          title={title}
          subtitle={subtitle}
          delay={TIMING.title}
          titleSize={64}
          subtitleSize={22}
        />
      </div>

      {/* Menu items as stacked pills */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          zIndex: 5,
        }}
      >
        {menuItems.map((item, i) => {
          const itemSpring = spring({
            frame: frame - (TIMING.menuItems + i * MENU_STAGGER),
            fps,
            config: SIMS_SPRING.entrance,
          });
          const isFirst = i === 0;
          return (
            <div
              key={item}
              style={{
                padding: '8px 32px',
                borderRadius: SIMS_SIZES.borderRadius.pill,
                background: isFirst
                  ? `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`
                  : 'rgba(255,255,255,0.06)',
                border: isFirst ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontFamily: SIMS_FONTS.body,
                fontSize: 14,
                fontWeight: isFirst ? 700 : 500,
                color: isFirst ? '#fff' : SIMS_COLORS.textMuted,
                letterSpacing: 0.3,
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(itemSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0])}px)`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Tagline */}
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
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            opacity: interpolate(
              frame,
              [TIMING.tagline, TIMING.tagline + SIMS_TIMING.fadeInFrames],
              [0, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
            ),
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}
        >
          {tagline}
        </div>
      )}

      {/* Bottom status bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(0,0,0,0.3)',
          opacity: interpolate(
            frame,
            [TIMING.bottomBar, TIMING.bottomBar + 20],
            [0, 1],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
          ),
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: SIMS_COLORS.textMuted }}>
          Loading world...
        </span>
        <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: SIMS_COLORS.textMuted }}>
          v4.0 Enterprise Ed
        </span>
      </div>

      {/* Notification toast */}
      <Sequence from={TIMING.toast}>
        <div style={{ position: 'absolute', top: 60, right: 30, zIndex: 15 }}>
          <NotificationToast
            icon="&#x1F4A1;"
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
