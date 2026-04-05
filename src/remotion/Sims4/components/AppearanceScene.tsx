// src/remotion/Sims4/components/AppearanceScene.tsx
// Appearance customization scene: CAS category tabs, avatar viewport, outfit detail panel

import React from 'react';
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
} from 'remotion';
import { SIMS_COLORS, SIMS_FONTS, SIMS_SIZES } from '../data/simsTheme';
import { CAS_CATEGORIES } from './AvatarDisplay';
import { SPRING_CONFIG, getActiveCategoryAtFrame } from './casStoryData';

interface AppearanceSceneProps {
  startFrame: number;
  durationFrames: number;
}

// Outfit detail items per category index
const CATEGORY_ITEMS: Record<number, string[]> = {
  0: ['Wavy Bob', 'Color: Dark Brown', 'Highlights: None'],
  1: ['Eye Shape: Almond', 'Brows: Arched', 'Lips: Full'],
  2: ['Build: Athletic', 'Height: Average', 'Skin: Warm'],
  3: ['Blazer', 'Shirt', 'Pants', 'Boots'],
  4: ['Necklace', 'Watch', 'Earrings'],
};

export const AppearanceScene: React.FC<AppearanceSceneProps> = ({
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame >= durationFrames) {
    return null;
  }

  const activeCategory = getActiveCategoryAtFrame(relativeFrame, durationFrames);
  const outfitItems = CATEGORY_ITEMS[activeCategory] ?? [];

  // Name plate fade-in
  const namePlateOpacity = interpolate(
    relativeFrame,
    [28, 44],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily: SIMS_FONTS.simsLike,
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #e6f3ff 0%, #cae3f8 60%, #b7d6f1 100%)',
        }}
      />

      {/* Left sidebar — CAS category tabs */}
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: 80,
          bottom: 98,
          width: 100,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.76)',
          border: '1px solid rgba(21,101,192,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          paddingTop: 10,
        }}
      >
        {CAS_CATEGORIES.map((cat, i) => {
          const tabSpring =
            relativeFrame >= i * 8
              ? spring({
                  frame: relativeFrame - i * 8,
                  fps,
                  config: SPRING_CONFIG,
                })
              : 0;

          const isActive = i === activeCategory;

          return (
            <div
              key={cat.label}
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: isActive
                  ? SIMS_COLORS.simsBlue
                  : 'rgba(255,255,255,0.92)',
                color: isActive ? '#fff' : SIMS_COLORS.simsBlueDark,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                gap: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                opacity: tabSpring,
                transform: `scale(${tabSpring})`,
              }}
            >
              <span>{cat.icon}</span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: SIMS_FONTS.body,
                  fontWeight: 700,
                }}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center viewport — Avatar with dashed circle backdrop */}
      <div
        style={{
          position: 'absolute',
          left: 132,
          right: 292,
          top: 80,
          bottom: 98,
          borderRadius: SIMS_SIZES.borderRadius.lg,
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(21,101,192,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Dashed circle backdrop */}
        <div
          style={{
            position: 'absolute',
            width: 470,
            height: 470,
            borderRadius: '50%',
            border: '2px dashed rgba(21,101,192,0.25)',
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 68%, transparent 100%)',
          }}
        />
        <Img
          src={staticFile('avatar/linda_avatar.svg')}
          style={{
            height: 520,
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.24))',
          }}
        />
      </div>

      {/* Right panel — Outfit details */}
      <div
        style={{
          position: 'absolute',
          right: 18,
          top: 80,
          bottom: 98,
          width: 258,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(21,101,192,0.2)',
          padding: 12,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: SIMS_COLORS.simsBlueDark,
            marginBottom: 12,
          }}
        >
          {CAS_CATEGORIES[activeCategory]?.label ?? 'Details'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {outfitItems.map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 10,
                background: 'rgba(21,101,192,0.08)',
                padding: '10px 12px',
                color: SIMS_COLORS.simsBlueDark,
                fontFamily: SIMS_FONTS.body,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Name plate at bottom center */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 26,
          transform: 'translateX(-50%)',
          background: SIMS_COLORS.panelBlue,
          color: SIMS_COLORS.textLight,
          borderRadius: SIMS_SIZES.borderRadius.pill,
          padding: '12px 28px',
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 0.2,
          opacity: namePlateOpacity,
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 8px 20px rgba(13,71,161,0.2)',
        }}
      >
        Linda Mohamed
      </div>
    </AbsoluteFill>
  );
};
