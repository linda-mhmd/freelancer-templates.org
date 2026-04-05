import React from 'react';
import {
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { Plumbob } from './SimsUI';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../data/simsTheme';

export type AvatarMood = 'happy' | 'neutral' | 'stressed' | 'angry';

export const MOOD_COLORS: Record<AvatarMood, string> = {
  happy: SIMS_COLORS.needsGreen,
  neutral: SIMS_COLORS.needsYellow,
  stressed: SIMS_COLORS.needsOrange,
  angry: SIMS_COLORS.needsRed,
};
export const CAS_CATEGORIES = [
  { icon: '💇', label: 'Hair' },
  { icon: '😊', label: 'Face' },
  { icon: '👤', label: 'Body' },
  { icon: '👕', label: 'Clothing' },
  { icon: '💍', label: 'Accessories' },
];

export type AvatarMode = 'raw' | 'themed' | 'cas';

export interface AvatarDisplayProps {
  /** Display mode */
  mode: AvatarMode;
  /** Filename inside public/avatar/ */
  src?: string;
  /** Rendered height in px (width scales proportionally) */
  height?: number;
  /** Character name (used in themed/cas modes) */
  name?: string;
  /** Mood for themed mode indicator */
  mood?: AvatarMood;
  /** Frame to begin entrance animation */
  enterFrame?: number;
  /** Frame to begin exit animation (optional) */
  exitFrame?: number;
  /** Pass-through styles */
  style?: React.CSSProperties;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  mode,
  src = 'linda_avatar.svg',
  height = 500,
  name,
  mood = 'happy',
  enterFrame = 0,
  exitFrame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Animation logic ---
  const isBefore = frame < enterFrame;

  const scaleSpring = isBefore
    ? 0
    : spring({
        frame: frame - enterFrame,
        fps,
        config: { damping: 16, stiffness: 100 },
      });

  let opacity = isBefore ? 0 : 1;

  if (exitFrame !== undefined && frame >= exitFrame) {
    opacity = interpolate(frame, [exitFrame, exitFrame + 15], [1, 0], {
      extrapolateRight: 'clamp',
    });
  }

  if (isBefore) {
    opacity = 0;
  }

  const animationStyle: React.CSSProperties = {
    transform: `scale(${scaleSpring})`,
    opacity,
  };

  // --- Mode rendering ---
  if (mode === 'raw') {
    return (
      <div style={{ ...animationStyle, ...style }}>
        <Img
          src={staticFile(`avatar/${src}`)}
          style={{
            height,
            width: 'auto',
            objectFit: 'contain' as const,
          }}
        />
      </div>
    );
  }

  if (mode === 'themed') {
    const moodColor = MOOD_COLORS[mood];

    return (
      <div style={{ ...animationStyle, ...style, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Plumbob above avatar */}
        <div data-testid="plumbob" style={{ marginBottom: -10 }}>
          <Plumbob size={40} animate={true} />
        </div>

        {/* Avatar image */}
        <Img
          src={staticFile(`avatar/${src}`)}
          style={{
            height,
            width: 'auto',
            objectFit: 'contain' as const,
          }}
        />

        {/* Name plate + mood indicator (only when name is provided) */}
        {name && (
          <div
            data-testid="name-plate"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 8,
              padding: '6px 16px',
              background: SIMS_COLORS.panelBlue,
              borderRadius: 12,
              fontFamily: SIMS_FONTS.simsLike,
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {name}
            <div
              data-testid="mood-indicator"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: moodColor,
                flexShrink: 0,
              }}
            />
          </div>
        )}

        {/* Mood indicator without name plate (when no name but still show mood) */}
        {!name && (
          <div
            data-testid="mood-indicator"
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: moodColor,
              marginTop: 8,
            }}
          />
        )}
      </div>
    );
  }

  if (mode === 'cas') {
    return (
      <div style={{ ...animationStyle, ...style }}>
        {/* CAS Panel */}
        <div
          data-testid="cas-panel"
          style={{
            display: 'flex',
            flexDirection: 'row',
            background: SIMS_COLORS.simsBluePanel,
            borderRadius: SIMS_SIZES.borderRadius.lg,
            padding: 24,
            gap: 16,
          }}
        >
          {/* Category tabs on the left */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            {CAS_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                data-testid="cas-category-tab"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 10px',
                  borderRadius: SIMS_SIZES.borderRadius.sm,
                  background: 'rgba(255,255,255,0.08)',
                  fontFamily: SIMS_FONTS.simsLike,
                  color: '#FFFFFF',
                  fontSize: 11,
                  cursor: 'default',
                  minWidth: 56,
                }}
              >
                <span style={{ fontSize: 20, marginBottom: 2 }}>{cat.icon}</span>
                {cat.label}
              </div>
            ))}
          </div>

          {/* Avatar image centered */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Img
              src={staticFile(`avatar/${src}`)}
              style={{
                height,
                width: 'auto',
                objectFit: 'contain' as const,
              }}
            />
          </div>
        </div>

        {/* Turntable arc indicator below panel */}
        <div
          data-testid="turntable-arc"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <svg width="120" height="24" viewBox="0 0 120 24">
            <path
              d="M 10 20 Q 60 0 110 20"
              fill="none"
              stroke={SIMS_COLORS.simsBlueLight}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <circle cx="60" cy="10" r="4" fill={SIMS_COLORS.simsBlueLight} />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};
