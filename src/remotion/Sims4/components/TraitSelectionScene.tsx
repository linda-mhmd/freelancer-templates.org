// src/remotion/Sims4/components/TraitSelectionScene.tsx
// Trait/personality selection scene: trait grid, selected traits summary, avatar

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../data/simsTheme';
import { SimsPanel } from './SimsUI';
import { AvatarImage } from './AvatarImage';
import {
  TRAITS,
  SPRING_CONFIG,
  MIN_STAGGER,
  computeStaggerFrames,
  getSelectedTraitsAtFrame,
} from './casStoryData';

interface TraitSelectionSceneProps {
  startFrame: number;
  durationFrames: number;
}

export const TraitSelectionScene: React.FC<TraitSelectionSceneProps> = ({
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  // Don't render if outside scene range
  if (relativeFrame < 0 || relativeFrame >= durationFrames) {
    return null;
  }

  // ── Trait badge stagger frames ──
  const staggerFrames = computeStaggerFrames(TRAITS.length, MIN_STAGGER);

  // ── Selected traits count (0–3) at current frame ──
  const selectedCount = getSelectedTraitsAtFrame(relativeFrame, durationFrames);

  return (
    <AbsoluteFill>
      <SimsPanel
        variant="glass"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          padding: 48,
          boxSizing: 'border-box',
          borderRadius: 0,
        }}
      >
        {/* ── Left side: Avatar ── */}
        <div
          style={{
            width: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AvatarImage height={400} />
        </div>

        {/* ── Right side: Trait grid + summary ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 40,
            gap: 32,
          }}
        >
          {/* ── Trait grid (3×2) ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              justifyItems: 'center',
            }}
          >
            {TRAITS.map((trait, i) => {
              const entranceDelay = staggerFrames[i];
              const badgeSpring =
                relativeFrame >= entranceDelay
                  ? spring({
                      frame: relativeFrame - entranceDelay,
                      fps,
                      config: SPRING_CONFIG,
                    })
                  : 0;

              const isSelected = i < selectedCount;

              return (
                <div
                  key={trait.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    opacity: badgeSpring,
                    transform: `scale(${badgeSpring})`,
                  }}
                >
                  {/* Hexagonal badge */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      clipPath:
                        'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      background: isSelected
                        ? SIMS_COLORS.plumbobGreen
                        : SIMS_COLORS.panelDark,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      boxShadow: isSelected
                        ? `0 0 16px ${SIMS_COLORS.plumbobGlow}`
                        : 'none',
                      position: 'relative',
                    }}
                  >
                    {/* Glow border for selected traits */}
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: -3,
                          clipPath:
                            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: SIMS_COLORS.plumbobGlow,
                          opacity: 0.4,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {trait.icon}
                  </div>
                  {/* Label */}
                  <span
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 13,
                      color: SIMS_COLORS.textLight,
                      textAlign: 'center',
                    }}
                  >
                    {trait.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ── Selected Traits summary bar ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: SIMS_COLORS.panelDark,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '12px 20px',
              minHeight: 56,
            }}
          >
            <span
              style={{
                fontFamily: SIMS_FONTS.display,
                fontSize: 14,
                color: SIMS_COLORS.textMuted,
                marginRight: 8,
              }}
            >
              Selected Traits:
            </span>
            {TRAITS.slice(0, 3).map((trait, i) => {
              const isVisible = i < selectedCount;
              const slideIn = isVisible
                ? interpolate(
                    relativeFrame,
                    [
                      [0.3, 0.5, 0.7][i] * durationFrames,
                      [0.3, 0.5, 0.7][i] * durationFrames + 15,
                    ],
                    [30, 0],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                  )
                : 30;
              const slideOpacity = isVisible
                ? interpolate(
                    relativeFrame,
                    [
                      [0.3, 0.5, 0.7][i] * durationFrames,
                      [0.3, 0.5, 0.7][i] * durationFrames + 15,
                    ],
                    [0, 1],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                  )
                : 0;

              return (
                <div
                  key={trait.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    opacity: slideOpacity,
                    transform: `translateX(${slideIn}px)`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{trait.icon}</span>
                  <span
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 13,
                      color: SIMS_COLORS.textLight,
                    }}
                  >
                    {trait.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SimsPanel>
    </AbsoluteFill>
  );
};
