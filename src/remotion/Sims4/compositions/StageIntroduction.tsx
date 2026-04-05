// src/remotion/Sims4/compositions/StageIntroduction.tsx
// Template: "Stage Introduction" — configurable speaker intro slide
// Layout: center avatar, left name plate + facts, right credentials + descriptions
// Refactored to use SimsComposition + SpeakerIntro layout
// Supports toggling sections on/off for different combinations

import React from 'react';
import {
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
  type SimsBackgroundVariant,
} from '../data/simsTheme';
import { Plumbob } from '../components/SimsUI';
import { SimsComposition } from '../helpers/SimsComposition';
import { SpeakerIntro } from '../templates';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CredentialItem {
  icon: string;
  label: string;
}

export interface DescriptionItem {
  icon: string;
  text: string;
}

export interface StageIntroductionProps {
  // Name plate
  characterName?: string;
  title?: string;
  subtitle?: string;

  // Left: facts section
  facts?: string[];
  factsLabel?: string;

  // Right: credentials (hexagon badges)
  credentials?: CredentialItem[];
  credentialsLabel?: string;

  // Right: descriptions (icon + text rows)
  descriptions?: DescriptionItem[];

  // Character
  avatarSrc?: string;
  characterSize?: number;

  // Visibility toggles
  showPlumbob?: boolean;
  showFacts?: boolean;
  showCredentials?: boolean;
  showDescriptions?: boolean;
  showNamePlate?: boolean;

  // Background
  variant?: SimsBackgroundVariant;
  /** Path relative to public/ for a custom background image (e.g. 'backgrounds/cas-stage-bg.png') */
  backgroundImage?: string;
}

// ── Sub-components ───────────────────────────────────────────────────────────

/** Rounded pill name plate (left side) */
const NamePlate: React.FC<{
  name: string;
  title: string;
  subtitle: string;
  progress: number;
}> = ({ name, title, subtitle, progress }) => {
  const slideX = interpolate(progress, [0, 1], [-60, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: SIMS_SIZES.borderRadius.pill,
        padding: '18px 30px',
        transform: `translateX(${slideX}px)`,
        opacity: progress,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        maxWidth: 380,
      }}
    >
      <div
        style={{
          fontFamily: SIMS_FONTS.display,
          fontWeight: 900,
          fontSize: 28,
          color: SIMS_COLORS.textLight,
          lineHeight: 1.2,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 16,
          color: SIMS_COLORS.plumbobGlow,
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: SIMS_FONTS.body,
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 2,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

/** Section label badge (orange/amber style like the reference) */
const SectionBadge: React.FC<{
  label: string;
  progress: number;
}> = ({ label, progress }) => (
  <div
    style={{
      display: 'inline-block',
      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
      borderRadius: SIMS_SIZES.borderRadius.pill,
      padding: '6px 16px',
      fontFamily: SIMS_FONTS.display,
      fontWeight: 800,
      fontSize: 13,
      color: SIMS_COLORS.textLight,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
      opacity: progress,
      boxShadow: '0 2px 8px rgba(217,119,6,0.3)',
    }}
  >
    {label}
  </div>
);

/** Numbered fact item */
const FactItem: React.FC<{
  index: number;
  text: string;
  progress: number;
}> = ({ index, text, progress }) => {
  const slideY = interpolate(progress, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        opacity: progress,
        transform: `translateY(${slideY}px)`,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: SIMS_COLORS.simsBlue,
          color: SIMS_COLORS.textLight,
          fontFamily: SIMS_FONTS.display,
          fontWeight: 800,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {index}
      </div>
      <span
        style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 15,
          color: SIMS_COLORS.textLight,
          lineHeight: 1.4,
          fontWeight: 600,
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** Hexagonal credential badge */
const CredentialHex: React.FC<{
  icon: string;
  label: string;
  progress: number;
}> = ({ icon, label, progress }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      opacity: progress,
      transform: `scale(${progress})`,
    }}
  >
    <div
      style={{
        width: 62,
        height: 62,
        background: SIMS_COLORS.panelGlass,
        clipPath:
          'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        border: `1px solid rgba(255,255,255,0.15)`,
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontFamily: SIMS_FONTS.body,
        fontSize: 11,
        color: SIMS_COLORS.textLight,
        fontWeight: 700,
        textAlign: 'center' as const,
        maxWidth: 72,
        lineHeight: 1.2,
      }}
    >
      {label}
    </span>
  </div>
);

/** Description row (icon + text) */
const DescriptionRow: React.FC<{
  icon: string;
  text: string;
  progress: number;
}> = ({ icon, text, progress }) => {
  const slideX = interpolate(progress, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: progress,
        transform: `translateX(${slideX}px)`,
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 14,
          color: SIMS_COLORS.textLight,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};


// ── Main Composition ─────────────────────────────────────────────────────────

export const StageIntroduction: React.FC<StageIntroductionProps> = ({
  characterName = 'Linda Mohamed',
  title = 'AI & Cloud Consultant',
  subtitle = 'AWS Hero',
  facts = [
    'Prototype developer',
    'Learns fast by asking',
    'Passionate about efficient processes',
  ],
  factsLabel = 'facts about me',
  credentials = [
    { icon: '🌐', label: 'Internet Stiftung' },
    { icon: '🇩🇪', label: 'AWS Community DACH' },
    { icon: '👥', label: 'User Group Leader' },
    { icon: '🏆', label: 'AWS Hero' },
  ],
  credentialsLabel = 'things I do',
  descriptions = [
    { icon: '☁️', text: 'AWS Community Hero / Cloud & AI Consultant' },
    { icon: '💻', text: 'Background in Software Development' },
    { icon: '🤖', text: 'Specialized in Cloud Technologies & AI/ML' },
  ],
  avatarSrc = 'linda_avatar.svg',
  characterSize = 380,
  showPlumbob = true,
  showFacts = true,
  showCredentials = true,
  showDescriptions = true,
  showNamePlate = true,
  variant = 'cas-light',
  backgroundImage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animation timeline ──
  // Character entrance: frame 5
  const charSpring = spring({
    frame: frame - 5,
    fps,
    config: SIMS_SPRING.gentle,
  });

  // Plumbob: frame 0
  const plumbobOpacity = interpolate(frame, [0, SIMS_TIMING.fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Name plate: frame 15
  const namePlateProgress = spring({
    frame: frame - 15,
    fps,
    config: SIMS_SPRING.entrance,
  });

  // Facts badge: frame 35
  const factsBadgeProgress = interpolate(
    frame,
    [35, 35 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  // Credentials badge: frame 30
  const credBadgeProgress = interpolate(
    frame,
    [30, 30 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  // Stagger helper
  const staggerProgress = (baseFrame: number, index: number) =>
    spring({
      frame: frame - (baseFrame + index * SIMS_TIMING.minStagger),
      fps,
      config: SIMS_SPRING.entrance,
    });

  // ── Zone content ──

  const leftContent = (
    <>
      {/* Offset top when plumbob is shown (original used top:130 vs top:60) */}
      {showPlumbob && <div style={{ height: 70 }} />}

      {showNamePlate && (
        <NamePlate
          name={characterName}
          title={title}
          subtitle={subtitle}
          progress={namePlateProgress}
        />
      )}

      {showFacts && facts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SectionBadge label={factsLabel} progress={factsBadgeProgress} />
          <div
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: SIMS_SIZES.borderRadius.lg,
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              opacity: factsBadgeProgress,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            {facts.map((fact, i) => (
              <FactItem
                key={i}
                index={i + 1}
                text={fact}
                progress={staggerProgress(45, i)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );

  const centerContent = (
    <div
      style={{
        transform: `translateY(${interpolate(charSpring, [0, 1], [40, 0])}px)`,
        opacity: charSpring,
      }}
    >
      <Img
        src={staticFile(`avatar/${avatarSrc}`)}
        style={{
          width: characterSize * 0.86,
          height: characterSize * 1.92,
          objectFit: 'contain',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );

  const rightContent = (
    <>
      {showCredentials && credentials.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SectionBadge label={credentialsLabel} progress={credBadgeProgress} />
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'flex-end',
            }}
          >
            {credentials.map((cred, i) => (
              <CredentialHex
                key={i}
                icon={cred.icon}
                label={cred.label}
                progress={staggerProgress(40, i)}
              />
            ))}
          </div>
        </div>
      )}

      {showDescriptions && descriptions.length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: SIMS_SIZES.borderRadius.lg,
            padding: '18px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          {descriptions.map((desc, i) => (
            <DescriptionRow
              key={i}
              icon={desc.icon}
              text={desc.text}
              progress={staggerProgress(60, i)}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <SimsComposition
      layout={
        <SpeakerIntro
          background={variant}
          left={leftContent}
          center={centerContent}
          right={rightContent}
        />
      }
    >
      {/* Overlay: custom background image (covers SimsBackground when provided) */}
      {backgroundImage && (
        <Img
          src={staticFile(backgroundImage)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      )}

      {/* Overlay: Plumbob (top-left, outside any zone) */}
      {showPlumbob && (
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 40,
            opacity: plumbobOpacity,
            zIndex: 10,
          }}
        >
          <Plumbob size={48} animate />
        </div>
      )}
    </SimsComposition>
  );
};
