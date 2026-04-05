// src/remotion/Sims4/compositions/Sims4MainMenu.tsx
// Template: "Sims 4 Main Menu" — recreates the Sims 4 home screen layout
// Refactored to use SimsComposition + CinematicFullScreen layout + CharacterSpot element

import React from 'react';
import {
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
} from '../data/simsTheme';
import {
  Plumbob,
  SimsPanel,
  PanelHeader,
} from '../components/SimsUI';
import { SimsComposition } from '../helpers/SimsComposition';
import { CinematicFullScreen } from '../templates';
import { CharacterSpot } from '../elements';

// ── Props Interface ──

export interface Sims4MainMenuProps {
  characterName?: string;
  subtitle?: string;
  menuItems?: string[];
}

// ── Static Data ──

const DEFAULT_MENU_ITEMS = [
  'Resume Game',
  'Load Game',
  'New Game',
  'Gallery',
  'Play Scenario',
];

const ACTIVE_MENU_INDEX = 0;

const PROMO_CARDS = [
  { icon: '🎮', title: 'New Expansion', description: 'Enterprise AI Pack now available' },
  { icon: '🏠', title: 'Build Challenge', description: 'Design your dream workspace' },
  { icon: '⭐', title: 'Community Pick', description: 'Top-rated automation templates' },
];

const TIMING = {
  background: 0,
  topNav: 5,
  character: 15,
  leftPanel: 20,
  promoCards: 35,
  bottomBar: 60,
};

const MENU_ITEM_STAGGER = 20;
const PROMO_CARD_STAGGER = 25;

// ── Component ──

export const Sims4MainMenu: React.FC<Sims4MainMenuProps> = ({
  characterName = 'Linda Mohamed',
  subtitle = 'Freelance Automation Consultant',
  menuItems = DEFAULT_MENU_ITEMS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SimsComposition
      layout={<CinematicFullScreen background="cinematic" />}
    >
      {/* ── GREEN PLUMBOB — upper left corner ── */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 16,
          opacity: interpolate(frame, [TIMING.topNav, TIMING.topNav + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          zIndex: 10,
        }}
      >
        <Plumbob size={36} animate={true} />
      </div>

      {/* ── PROFILE AREA — top right ── */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 16,
          opacity: interpolate(frame, [TIMING.topNav, TIMING.topNav + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          zIndex: 10,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: SIMS_SIZES.borderRadius.pill,
          padding: '4px 14px 4px 4px',
        }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: '#fff',
          }}>
            👤
          </div>
          <span style={{
            fontFamily: SIMS_FONTS.body,
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
          }}>
            {characterName}
          </span>
        </div>
      </div>

      {/* ── LEFT MENU PANEL ── */}
      {(() => {
        const panelSpring = spring({ frame: frame - TIMING.leftPanel, fps, config: SIMS_SPRING.entrance });
        return (
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 16,
              width: 260,
              transform: `translateX(${interpolate(panelSpring, [0, 1], [-280, 0])}px)`,
              zIndex: 5,
            }}
          >
            <SimsPanel variant="glass" style={{ padding: 0 }}>
              {/* Household info header */}
              <PanelHeader title={characterName} style={{ fontSize: 16, padding: '12px 18px' }} />
              <div
                style={{
                  padding: '4px 18px 10px',
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 12,
                  color: SIMS_COLORS.textMuted,
                }}
              >
                {subtitle}
              </div>

              {/* Menu items */}
              <div style={{ padding: '4px 0 8px' }}>
                {menuItems.map((item, i) => {
                  const itemSpring = spring({
                    frame: frame - (TIMING.leftPanel + i * MENU_ITEM_STAGGER),
                    fps,
                    config: SIMS_SPRING.entrance,
                  });
                  const isActive = i === ACTIVE_MENU_INDEX;
                  return (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 18px',
                        opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                        transform: `translateX(${interpolate(itemSpring, [0, 1], [-30, 0])}px)`,
                        background: isActive
                          ? `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`
                          : 'transparent',
                        borderRadius: isActive ? 8 : 0,
                        margin: isActive ? '0 8px' : '0',
                        gap: 8,
                      }}
                    >
                      {isActive && (
                        <svg
                          width={20}
                          height={28}
                          viewBox="0 0 100 140"
                          style={{ flexShrink: 0, opacity: 0.9 }}
                        >
                          <polygon
                            points="50,5 90,70 50,135 10,70"
                            fill="none"
                            stroke="rgba(255,255,255,0.7)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                          />
                          <polygon
                            points="50,5 90,70 50,70"
                            fill="none"
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="1.5"
                          />
                          <polygon
                            points="50,70 90,70 50,135"
                            fill="none"
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}
                      <span
                        style={{
                          fontFamily: SIMS_FONTS.body,
                          fontSize: 13,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#fff' : SIMS_COLORS.textMuted,
                          letterSpacing: 0.3,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SimsPanel>
          </div>
        );
      })()}

      {/* ── CENTER CHARACTER DISPLAY (CharacterSpot element) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 276,
          right: 280,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          opacity: interpolate(frame, [TIMING.character, TIMING.character + 25], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          zIndex: 4,
        }}
      >
        {/* Radial glow beneath character */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 320,
            height: 120,
            background: `radial-gradient(ellipse at center, ${SIMS_COLORS.plumbobGlow}30 0%, transparent 70%)`,
            opacity: 0.18,
            pointerEvents: 'none',
          }}
        />
        <CharacterSpot
          mode="linda"
          outfit="green-blazer"
          avatarSrc="linda_avatar.svg"
          delay={TIMING.character}
        />
      </div>

      {/* ── RIGHT-SIDE PROMOTIONAL CARDS ── */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 16,
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 5,
        }}
      >
        {PROMO_CARDS.map((card, i) => {
          const cardSpring = spring({
            frame: frame - (TIMING.promoCards + i * PROMO_CARD_STAGGER),
            fps,
            config: SIMS_SPRING.entrance,
          });
          return (
            <div
              key={card.title}
              style={{
                opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(cardSpring, [0, 1], [300, 0])}px)`,
              }}
            >
              <SimsPanel variant="glass" style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{card.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: 4,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 12,
                        color: SIMS_COLORS.textMuted,
                        lineHeight: 1.4,
                      }}
                    >
                      {card.description}
                    </div>
                  </div>
                </div>
              </SimsPanel>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM STATUS BAR ── */}
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
          opacity: interpolate(frame, [TIMING.bottomBar, TIMING.bottomBar + 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          zIndex: 10,
        }}
      >
        <span style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 12,
          color: SIMS_COLORS.textMuted,
        }}>
          Loading world...
        </span>
        <span style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 12,
          color: SIMS_COLORS.textMuted,
        }}>
          v4.0 Enterprise Ed
        </span>
      </div>
    </SimsComposition>
  );
};
