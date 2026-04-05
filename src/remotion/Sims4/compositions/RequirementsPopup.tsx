// src/remotion/Sims4/compositions/RequirementsPopup.tsx
// Sims-style popup/dialog composition displaying requirements in a glass panel
// Uses CinematicFullScreen background + centered SimsPanel variant="glass"

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
  SIMS_SPRING,
  SIMS_TIMING,
  SIMS_SIZES,
} from '../data/simsTheme';
import { SimsPanel } from '../components/SimsUI';
import { CinematicFullScreen } from '../templates/CinematicFullScreen';

// ── Types ────────────────────────────────────────────────────────────────────

export interface RequirementItem {
  icon: React.ReactNode | string;
  label: string;
}

export interface RequirementsPopupProps {
  popupTitle?: string;
  requirements?: RequirementItem[];
  ctaLabel?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_REQUIREMENTS: RequirementItem[] = [
  { icon: '📍', label: 'Find a venue with AV equipment' },
  { icon: '🎤', label: 'Book a speaker on AI agents' },
  { icon: '🍕', label: 'Order food for 50 attendees' },
  { icon: '📧', label: 'Send invitations via email' },
  { icon: '📋', label: 'Prepare agenda and slides' },
];

// ── Component ────────────────────────────────────────────────────────────────

export const RequirementsPopup: React.FC<RequirementsPopupProps> = ({
  popupTitle = 'Meetup Requirements',
  requirements = DEFAULT_REQUIREMENTS,
  ctaLabel = 'Start Planning',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Panel scale-up + fade-in (frames 0–20) ──
  const panelSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const panelScale = interpolate(panelSpring, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ── CTA button fade-in: after all items + 10 frames ──
  const ctaStartFrame = 20 + requirements.length * SIMS_TIMING.minStagger + 10;
  const ctaOpacity = interpolate(
    frame,
    [ctaStartFrame, ctaStartFrame + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <CinematicFullScreen background="cinematic">
      <div
        style={{
          transform: `scale(${panelScale})`,
          opacity: panelOpacity,
          width: '100%',
          maxWidth: 680,
        }}
      >
        <SimsPanel variant="glass" style={{ width: '100%' }}>
          {/* Popup title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 32,
              color: SIMS_COLORS.textLight,
              textAlign: 'center',
              marginBottom: 28,
              letterSpacing: '-0.3px',
            }}
          >
            {popupTitle}
          </div>

          {/* Requirement items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {requirements.map((req, i) => {
              const itemDelay = 20 + i * SIMS_TIMING.minStagger;
              const itemSpring = spring({
                frame: frame - itemDelay,
                fps,
                config: SIMS_SPRING.entrance,
              });
              const itemOpacity = interpolate(itemSpring, [0, 1], [0, 1], {
                extrapolateRight: 'clamp',
              });
              const itemSlideY = interpolate(
                itemSpring,
                [0, 1],
                [SIMS_TIMING.entranceOffset, 0],
                { extrapolateRight: 'clamp' },
              );

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    opacity: itemOpacity,
                    transform: `translateY(${itemSlideY}px)`,
                    padding: '10px 16px',
                    borderRadius: SIMS_SIZES.borderRadius.md,
                    background: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                    }}
                  >
                    {typeof req.icon === 'string' ? req.icon : req.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 17,
                      color: SIMS_COLORS.textLight,
                      fontWeight: 500,
                    }}
                  >
                    {req.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA button */}
          {ctaLabel && (
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                justifyContent: 'center',
                opacity: ctaOpacity,
              }}
            >
              <div
                style={{
                  background: SIMS_COLORS.simsBlue,
                  color: SIMS_COLORS.textLight,
                  fontFamily: SIMS_FONTS.display,
                  fontWeight: 800,
                  fontSize: 18,
                  padding: '12px 40px',
                  borderRadius: SIMS_SIZES.borderRadius.pill,
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(21,101,192,0.4)',
                  letterSpacing: '0.3px',
                }}
              >
                {ctaLabel}
              </div>
            </div>
          )}
        </SimsPanel>
      </div>
    </CinematicFullScreen>
  );
};
