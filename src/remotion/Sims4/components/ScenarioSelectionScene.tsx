// src/remotion/Sims4/components/ScenarioSelectionScene.tsx
// Scenario selection modal scene: scenario cards, cursor animation, click effect

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
import { SCENARIOS, SPRING_CONFIG, computeStaggerFrames } from './casStoryData';

interface ScenarioSelectionSceneProps {
  startFrame: number;
  durationFrames: number;
}

const SELECTED_CARD_INDEX = 1; // "Finding Love"

export const ScenarioSelectionScene: React.FC<ScenarioSelectionSceneProps> = ({
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

  // ── Card stagger entrances (25+ frames apart) ──
  const staggerFrames = computeStaggerFrames(SCENARIOS.length, 25);

  // ── Selection frame: 60% of durationFrames ──
  const selectionFrame = Math.floor(durationFrames * 0.6);

  // ── Cursor animation: starts at selection frame, moves over 30 frames ──
  const cursorStartX = 640;
  const cursorStartY = 360;
  // Target: center of selected card's "Play Now" button (card index 1 = middle column)
  const cursorEndX = 640;
  const cursorEndY = 480;

  const cursorActive = relativeFrame >= selectionFrame;
  const cursorProgress = cursorActive ? relativeFrame - selectionFrame : 0;
  const cursorX = cursorActive
    ? interpolate(cursorProgress, [0, 30], [cursorStartX, cursorEndX], {
        extrapolateRight: 'clamp',
      })
    : cursorStartX;
  const cursorY = cursorActive
    ? interpolate(cursorProgress, [0, 30], [cursorStartY, cursorEndY], {
        extrapolateRight: 'clamp',
      })
    : cursorStartY;

  // ── Click effect: scale pulse on button after cursor arrives (30 frames after selection) ──
  const clickFrame = selectionFrame + 30;
  const clickScale =
    relativeFrame >= clickFrame
      ? interpolate(relativeFrame - clickFrame, [0, 5, 10], [1, 1.1, 1], {
          extrapolateRight: 'clamp',
        })
      : 1;

  return (
    <AbsoluteFill style={{ background: 'rgba(0,0,0,0.6)' }}>
      {/* ── Centered modal ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 500,
          background: SIMS_COLORS.panelDark,
          borderRadius: SIMS_SIZES.borderRadius.xl,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontSize: 32,
            fontWeight: 'bold',
            color: SIMS_COLORS.textLight,
            marginBottom: 4,
          }}
        >
          SCENARIOS
        </div>
        <div
          style={{
            fontFamily: SIMS_FONTS.body,
            fontSize: 16,
            color: SIMS_COLORS.textMuted,
            marginBottom: 24,
          }}
        >
          Choose your starting scenario
        </div>

        {/* ── 3-column grid of scenario cards ── */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flex: 1,
          }}
        >
          {SCENARIOS.map((scenario, i) => {
            const entranceDelay = staggerFrames[i];
            const cardSpring =
              relativeFrame >= entranceDelay
                ? spring({
                    frame: relativeFrame - entranceDelay,
                    fps,
                    config: SPRING_CONFIG,
                  })
                : 0;

            const isSelected =
              i === SELECTED_CARD_INDEX && relativeFrame >= selectionFrame;

            return (
              <div
                key={scenario.title}
                style={{
                  flex: 1,
                  background: SIMS_COLORS.panelGlass,
                  borderRadius: SIMS_SIZES.borderRadius.md,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: cardSpring,
                  transform: `translateY(${interpolate(cardSpring, [0, 1], [20, 0], { extrapolateRight: 'clamp' })}px)`,
                  ...(isSelected
                    ? {
                        border: `2px solid ${SIMS_COLORS.simsBlueLight}`,
                        boxShadow: `0 0 20px ${SIMS_COLORS.simsBlueLight}`,
                      }
                    : {
                        border: '2px solid transparent',
                      }),
                }}
              >
                {/* ── Illustration placeholder ── */}
                <div
                  style={{
                    width: '100%',
                    height: 80,
                    borderRadius: SIMS_SIZES.borderRadius.md,
                    background: `${scenario.color}4D`, // 30% opacity hex
                    position: 'relative',
                    marginBottom: 8,
                  }}
                >
                  {/* ── Reward badge (top-right) ── */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      background: scenario.color,
                      color: '#FFFFFF',
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 10,
                      fontWeight: 'bold',
                      borderRadius: SIMS_SIZES.borderRadius.pill,
                      padding: '2px 8px',
                    }}
                  >
                    {scenario.reward}
                  </div>
                </div>

                {/* ── Difficulty label ── */}
                <div
                  style={{
                    fontFamily: SIMS_FONTS.body,
                    fontSize: 11,
                    color: SIMS_COLORS.textMuted,
                    marginBottom: 4,
                  }}
                >
                  {scenario.difficulty}
                </div>

                {/* ── Title ── */}
                <div
                  style={{
                    fontFamily: SIMS_FONTS.simsLike,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: 4,
                  }}
                >
                  {scenario.title}
                </div>

                {/* ── Description ── */}
                <div
                  style={{
                    fontFamily: SIMS_FONTS.body,
                    fontSize: 12,
                    color: SIMS_COLORS.textMuted,
                    flex: 1,
                    marginBottom: 8,
                  }}
                >
                  {scenario.description}
                </div>

                {/* ── "Play Now" button ── */}
                <div
                  style={{
                    background: scenario.color,
                    color: '#FFFFFF',
                    fontFamily: SIMS_FONTS.body,
                    fontSize: 13,
                    fontWeight: 'bold',
                    borderRadius: SIMS_SIZES.borderRadius.sm,
                    padding: '8px 16px',
                    textAlign: 'center',
                    transform:
                      i === SELECTED_CARD_INDEX
                        ? `scale(${clickScale})`
                        : undefined,
                  }}
                >
                  Play Now
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SimsCursor ── */}
      {cursorActive && <SimsCursor x={cursorX} y={cursorY} />}
    </AbsoluteFill>
  );
};
