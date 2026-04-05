// src/remotion/Sims4/components/CASInitialScene.tsx
// Opening CAS scene: silhouette, story dialog, aspiration icons, confirm/cancel buttons

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../data/simsTheme';
import { SimsCursor } from './SimsUI';
import {
  ASPIRATIONS,
  SPRING_CONFIG,
  MIN_STAGGER,
  computeStaggerFrames,
} from './casStoryData';

interface CASInitialSceneProps {
  startFrame: number;
  durationFrames: number;
}

export const CASInitialScene: React.FC<CASInitialSceneProps> = ({
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

  // ── Silhouette spring (relative frame 10) ──
  const silhouetteSpring =
    relativeFrame >= 10
      ? spring({
          frame: relativeFrame - 10,
          fps,
          config: SPRING_CONFIG,
        })
      : 0;

  // ── Speech bubble (relative frame 30) ──
  const bubbleProgress = relativeFrame >= 30 ? relativeFrame - 30 : -1;
  const bubbleTranslateY =
    bubbleProgress >= 0
      ? interpolate(bubbleProgress, [0, 20], [40, 0], {
          extrapolateRight: 'clamp',
        })
      : 40;
  const bubbleOpacity =
    bubbleProgress >= 0
      ? interpolate(bubbleProgress, [0, 20], [0, 1], {
          extrapolateRight: 'clamp',
        })
      : 0;

  // ── Aspiration icon stagger frames ──
  const staggerFrames = computeStaggerFrames(ASPIRATIONS.length, MIN_STAGGER);

  // ── Buttons fade-in (relative frame 60) ──
  const buttonsOpacity =
    relativeFrame >= 60
      ? interpolate(relativeFrame - 60, [0, 20], [0, 1], {
          extrapolateRight: 'clamp',
        })
      : 0;

  // ── Cursor animation (relative frame 60, moves over 30 frames) ──
  const cursorStartX = 640;
  const cursorStartY = 400;
  const cursorEndX = 1050;
  const cursorEndY = 620;
  const cursorX =
    relativeFrame >= 60
      ? interpolate(relativeFrame - 60, [0, 30], [cursorStartX, cursorEndX], {
          extrapolateRight: 'clamp',
        })
      : cursorStartX;
  const cursorY =
    relativeFrame >= 60
      ? interpolate(relativeFrame - 60, [0, 30], [cursorStartY, cursorEndY], {
          extrapolateRight: 'clamp',
        })
      : cursorStartY;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0a2a3f 0%, #1a6b5a 100%)',
      }}
    >
      {/* ── Hexagonal aspiration icons (top-left) ── */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          width: 300,
        }}
      >
        {ASPIRATIONS.map((asp, i) => {
          const iconEntrance = staggerFrames[i];
          const iconSpring =
            relativeFrame >= iconEntrance
              ? spring({
                  frame: relativeFrame - iconEntrance,
                  fps,
                  config: SPRING_CONFIG,
                })
              : 0;

          return (
            <div
              key={asp.label}
              style={{
                width: 50,
                height: 50,
                background: SIMS_COLORS.panelGlass,
                clipPath:
                  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: iconSpring,
                transform: `scale(${iconSpring})`,
                color: '#FFFFFF',
                fontSize: 20,
              }}
            >
              {asp.icon}
            </div>
          );
        })}
      </div>

      {/* ── Centered silhouette figure ── */}
      {relativeFrame >= 10 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -55%)',
            opacity: silhouetteSpring,
          }}
        >
          <div
            style={{
              width: 200,
              height: 400,
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: SIMS_SIZES.borderRadius.xl,
            }}
          />
        </div>
      )}

      {/* ── Speech bubble ── */}
      {relativeFrame >= 30 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, 120px) translateY(${bubbleTranslateY}px)`,
            opacity: bubbleOpacity,
            background: '#FFFFFF',
            color: SIMS_COLORS.textPrimary,
            fontFamily: SIMS_FONTS.simsLike,
            borderRadius: SIMS_SIZES.borderRadius.lg,
            padding: '16px 24px',
            fontSize: 18,
            whiteSpace: 'nowrap',
          }}
        >
          Would you like to create my story?
        </div>
      )}

      {/* ── Confirm / Cancel buttons (bottom-right) ── */}
      {relativeFrame >= 60 && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            display: 'flex',
            gap: 16,
            opacity: buttonsOpacity,
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontFamily: SIMS_FONTS.body,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '12px 24px',
              fontSize: 16,
            }}
          >
            ✗ Cancel
          </div>
          <div
            style={{
              background: SIMS_COLORS.plumbobGreen,
              color: '#FFFFFF',
              fontFamily: SIMS_FONTS.body,
              borderRadius: SIMS_SIZES.borderRadius.md,
              padding: '12px 24px',
              fontSize: 16,
            }}
          >
            ✓ Create Story
          </div>
        </div>
      )}

      {/* ── SimsCursor ── */}
      {relativeFrame >= 60 && <SimsCursor x={cursorX} y={cursorY} />}
    </AbsoluteFill>
  );
};
