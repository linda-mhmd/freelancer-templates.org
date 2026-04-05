// src/remotion/Sims4/compositions/AnatomyDiagram.tsx
// "Anatomy of an Agent" — full-bleed background with avatar + hexagonal badges on left,
// detailed vertical flow diagram on right with glass panels

import React from 'react';
import {
  AbsoluteFill,
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
} from '../data/simsTheme';
import { Plumbob } from '../components/SimsUI';

// ── Types ────────────────────────────────────────────────────────────────────

export interface DiagramNode {
  icon: React.ReactNode | string;
  title: string;
  description: string;
}

export interface FlowStep {
  label: string;
}

export interface AnatomyDiagramProps {
  diagramTitle?: string;
  nodes?: DiagramNode[];
  flowSteps?: FlowStep[];
  backgroundImage?: string;
  overlayOpacity?: number;
  avatarSrc?: string;
}

// ── Inline SVG Icons ─────────────────────────────────────────────────────────

const BrainIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 4.5 2.8A4 4 0 0 1 20 9a4 4 0 0 1-1.5 3.1A4.5 4.5 0 0 1 16 17H8a4.5 4.5 0 0 1-2.5-4.9A4 4 0 0 1 4 9a4 4 0 0 1 3.5-4.2A5 5 0 0 1 12 2z" />
    <path d="M12 2v20" opacity="0.5" />
    <path d="M8 8c1.5 0.5 3 0.5 4 0" opacity="0.5" />
    <path d="M12 8c1 0.5 2.5 0.5 4 0" opacity="0.5" />
  </svg>
);

const WrenchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const GearsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// Small icons for flow sub-items
const SmallBrainIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 4.5 2.8A4 4 0 0 1 20 9a4 4 0 0 1-1.5 3.1A4.5 4.5 0 0 1 16 17H8a4.5 4.5 0 0 1-2.5-4.9A4 4 0 0 1 4 9a4 4 0 0 1 3.5-4.2A5 5 0 0 1 12 2z" />
  </svg>
);

const SmallUserIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SmallGearsIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const SmallWrenchIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const SmallCodeIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_NODES: DiagramNode[] = [
  { icon: BrainIcon, title: 'Model', description: 'The reasoning engine \u2014 an LLM that generates text and makes decisions.' },
  { icon: WrenchIcon, title: 'Tools', description: 'APIs, functions, and data stores the agent can invoke.' },
  { icon: GearsIcon, title: 'Orchestration', description: 'The control loop that decides what to do next.' },
];

const DEFAULT_FLOW_STEPS: FlowStep[] = [
  { label: 'User Query' },
  { label: 'Model' },
  { label: 'Orchestration' },
  { label: 'Tools' },
  { label: 'agent_response' },
  { label: 'User Output' },
];


// ── SVG Down Arrow Component ─────────────────────────────────────────────────

const DownArrow: React.FC<{ opacity: number; color?: string }> = ({
  opacity,
  color = SIMS_COLORS.simsBlueLight,
}) => (
  <svg width="20" height="22" viewBox="0 0 20 22" style={{ opacity, flexShrink: 0 }}>
    <line x1="10" y1="0" x2="10" y2="16" stroke={color} strokeWidth="2" />
    <polygon points="4,14 10,22 16,14" fill={color} />
  </svg>
);

// ── Glass Panel Sub-item ─────────────────────────────────────────────────────

const SubItem: React.FC<{ icon: React.ReactNode; label: string; opacity: number }> = ({
  icon,
  label,
  opacity,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      opacity,
      padding: '3px 0',
    }}
  >
    {icon}
    <span
      style={{
        fontFamily: SIMS_FONTS.body,
        fontSize: 10,
        color: SIMS_COLORS.textLight,
        opacity: 0.85,
      }}
    >
      {label}
    </span>
  </div>
);

// ── Hexagonal Badge Component ────────────────────────────────────────────────

const HexBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
  slideY: number;
  accentColor: string;
}> = ({ icon, title, description, progress, slideY, accentColor }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      opacity: progress,
      transform: `translateY(${slideY}px)`,
    }}
  >
    {/* Hexagonal icon container */}
    <div
      style={{
        width: 56,
        height: 56,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: 'absolute', inset: 0 }}>
        <polygon
          points="28,2 52,15 52,41 28,54 4,41 4,15"
          fill={accentColor}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        <polygon
          points="28,6 48,17 48,39 28,50 8,39 8,17"
          fill="rgba(0,0,0,0.2)"
          stroke="none"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {typeof icon === 'string' ? (
          <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 14, fontWeight: 800, color: SIMS_COLORS.textLight }}>{icon}</span>
        ) : icon}
      </div>
    </div>

    {/* Text */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontFamily: SIMS_FONTS.display,
          fontSize: 15,
          fontWeight: 800,
          color: SIMS_COLORS.textLight,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: SIMS_FONTS.body,
          fontSize: 11,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.3,
          maxWidth: 200,
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
      >
        {description}
      </span>
    </div>
  </div>
);


// ── Component ────────────────────────────────────────────────────────────────

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  diagramTitle = 'Anatomy of an Agent',
  nodes = DEFAULT_NODES,
  flowSteps = DEFAULT_FLOW_STEPS,
  backgroundImage = 'backgrounds/cas-stage-bg.png',
  overlayOpacity = 0.7,
  avatarSrc = 'linda_avatar.svg',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Background overlay fade-in (frames 0–5) ──
  const overlayFade = interpolate(frame, [0, 5], [0, overlayOpacity], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Title entrance (frames 5–30) ──
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Avatar entrance (frames 8–35) ──
  const avatarSpring = spring({
    frame: frame - 8,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const avatarSlideY = interpolate(avatarSpring, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Plumbob fade (frames 0–25) ──
  const plumbobOpacity = interpolate(frame, [0, SIMS_TIMING.fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Left hex badges ──
  const badgeColors = [SIMS_COLORS.simsBlue, SIMS_COLORS.plumbobDark, SIMS_COLORS.simsBlueDark];
  const nodesBaseDelay = 25;

  // ── Right flow base delay ──
  const flowBaseDelay = 55;

  // ── Flow label fade ──
  const flowLabelOpacity = interpolate(frame, [flowBaseDelay - 10, flowBaseDelay], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Flow step helpers ──
  const getStepSpring = (index: number) =>
    spring({
      frame: frame - (flowBaseDelay + index * SIMS_TIMING.minStagger),
      fps,
      config: SIMS_SPRING.entrance,
    });

  const getStepSlideY = (s: number) =>
    interpolate(s, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
      extrapolateRight: 'clamp',
    });

  const getArrowOpacity = (index: number) =>
    interpolate(
      frame,
      [flowBaseDelay + index * SIMS_TIMING.minStagger + 10, flowBaseDelay + index * SIMS_TIMING.minStagger + 20],
      [0, 1],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
    );

  const s0 = getStepSpring(0);
  const s1 = getStepSpring(1);
  const s2 = getStepSpring(2);
  const s3 = getStepSpring(3);
  const s4 = getStepSpring(4);
  const s5 = getStepSpring(5);

  // Sub-items inside Orchestration panel
  const orchSubDelay = flowBaseDelay + 2 * SIMS_TIMING.minStagger + 15;
  const orchSubOpacity = interpolate(frame, [orchSubDelay, orchSubDelay + SIMS_TIMING.fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Sub-items inside Tools panel
  const toolsSubDelay = flowBaseDelay + 3 * SIMS_TIMING.minStagger + 15;
  const toolsSubOpacity = interpolate(frame, [toolsSubDelay, toolsSubDelay + SIMS_TIMING.fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Shared flow box style ──
  const flowBoxStyle = (accent: boolean = false): React.CSSProperties => ({
    padding: '8px 18px',
    borderRadius: SIMS_SIZES.borderRadius.md,
    background: accent
      ? `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`
      : SIMS_COLORS.panelGlass,
    border: `1.5px solid ${accent ? SIMS_COLORS.simsBlueLight : 'rgba(255,255,255,0.15)'}`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    fontFamily: SIMS_FONTS.display,
    fontSize: 12,
    fontWeight: 700,
    color: SIMS_COLORS.textLight,
    textAlign: 'center' as const,
    boxShadow: accent ? `0 3px 12px ${SIMS_COLORS.simsBlue}44` : '0 2px 8px rgba(0,0,0,0.25)',
  });

  // ── Glass panel style for subsections ──
  const glassPanelStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: SIMS_SIZES.borderRadius.md,
    padding: '8px 12px',
  };

  return (
    <AbsoluteFill>
      {/* Full-bleed background image */}
      <AbsoluteFill>
        <Img
          src={staticFile(backgroundImage)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayFade})`,
        }}
      />

      {/* Content layout */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '40px 50px',
        }}
      >
        {/* ── Left side (40%): Title + Avatar + Hex Badges ── */}
        <div
          style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Plumbob */}
          <div style={{ opacity: plumbobOpacity, marginBottom: 6 }}>
            <Plumbob size={36} animate />
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 32,
              color: SIMS_COLORS.textLight,
              lineHeight: 1.15,
              letterSpacing: '-0.3px',
              textAlign: 'center',
              opacity: titleSpring,
              transform: `translateY(${titleSlideY}px)`,
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              marginBottom: 12,
            }}
          >
            {diagramTitle}
          </div>

          {/* Avatar */}
          <div
            style={{
              opacity: avatarSpring,
              transform: `translateY(${avatarSlideY}px)`,
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
              marginBottom: 16,
            }}
          >
            <Img
              src={staticFile(`avatar/${avatarSrc}`)}
              style={{
                height: 260,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Hexagonal badges for Model / Tools / Orchestration */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            {nodes.map((node, i) => {
              const nodeDelay = nodesBaseDelay + i * SIMS_TIMING.minStagger;
              const nodeSpring = spring({
                frame: frame - nodeDelay,
                fps,
                config: SIMS_SPRING.entrance,
              });
              const nodeSlideY = interpolate(nodeSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
                extrapolateRight: 'clamp',
              });

              return (
                <HexBadge
                  key={`badge-${i}`}
                  icon={node.icon}
                  title={node.title}
                  description={node.description}
                  progress={nodeSpring}
                  slideY={nodeSlideY}
                  accentColor={badgeColors[i % badgeColors.length]}
                />
              );
            })}
          </div>
        </div>

        {/* ── Right side (60%): detailed vertical flow diagram ── */}
        <div
          style={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 24,
            paddingTop: 4,
          }}
        >
          {/* Flow label */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: 14,
              opacity: flowLabelOpacity,
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}
          >
            Agent Flow
          </div>

          {/* Vertical flow */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              width: '100%',
              maxWidth: 380,
            }}
          >
            {/* 1. User Query */}
            <div style={{ ...flowBoxStyle(true), opacity: s0, transform: `translateY(${getStepSlideY(s0)}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {SmallUserIcon}
                <span>User Query</span>
              </div>
            </div>
            <DownArrow opacity={getArrowOpacity(0)} />

            {/* 2. Model */}
            <div style={{ ...flowBoxStyle(false), opacity: s1, transform: `translateY(${getStepSlideY(s1)}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {SmallBrainIcon}
                <span>Model</span>
              </div>
            </div>
            <DownArrow opacity={getArrowOpacity(1)} />

            {/* 3. Orchestration — glass panel with Memory + Profile subsections */}
            <div
              style={{
                width: '100%',
                background: SIMS_COLORS.panelGlass,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1.5px solid ${SIMS_COLORS.simsBlueLight}44`,
                borderRadius: SIMS_SIZES.borderRadius.lg,
                padding: '10px 14px',
                opacity: s2,
                transform: `translateY(${getStepSlideY(s2)}px)`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 8,
                  fontFamily: SIMS_FONTS.display,
                  fontSize: 12,
                  fontWeight: 700,
                  color: SIMS_COLORS.textLight,
                }}
              >
                {SmallGearsIcon}
                <span>Orchestration</span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ ...glassPanelStyle, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.display,
                      fontSize: 10,
                      fontWeight: 700,
                      color: SIMS_COLORS.textAccent,
                      marginBottom: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Memory
                  </div>
                  <SubItem icon={SmallBrainIcon} label="Short-term" opacity={orchSubOpacity} />
                  <SubItem icon={SmallBrainIcon} label="Long-term" opacity={orchSubOpacity} />
                </div>

                <div style={{ ...glassPanelStyle, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.display,
                      fontSize: 10,
                      fontWeight: 700,
                      color: SIMS_COLORS.textAccent,
                      marginBottom: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Profile
                  </div>
                  <SubItem icon={SmallGearsIcon} label="Goals" opacity={orchSubOpacity} />
                  <SubItem icon={SmallGearsIcon} label="Instructions" opacity={orchSubOpacity} />
                </div>
              </div>
            </div>
            <DownArrow opacity={getArrowOpacity(2)} />

            {/* 4. Tools — glass panel with sub-items */}
            <div
              style={{
                width: '100%',
                background: SIMS_COLORS.panelGlass,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1.5px solid ${SIMS_COLORS.simsBlueLight}44`,
                borderRadius: SIMS_SIZES.borderRadius.lg,
                padding: '10px 14px',
                opacity: s3,
                transform: `translateY(${getStepSlideY(s3)}px)`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 8,
                  fontFamily: SIMS_FONTS.display,
                  fontSize: 12,
                  fontWeight: 700,
                  color: SIMS_COLORS.textLight,
                }}
              >
                {SmallWrenchIcon}
                <span>Tools</span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ ...glassPanelStyle, flex: 1 }}>
                  <SubItem icon={SmallWrenchIcon} label="Tools" opacity={toolsSubOpacity} />
                  <SubItem icon={SmallCodeIcon} label="APIs" opacity={toolsSubOpacity} />
                </div>
                <div style={{ ...glassPanelStyle, flex: 1 }}>
                  <SubItem icon={SmallGearsIcon} label="Processing" opacity={toolsSubOpacity} />
                  <SubItem icon={SmallCodeIcon} label="Externals" opacity={toolsSubOpacity} />
                </div>
              </div>
            </div>
            <DownArrow opacity={getArrowOpacity(3)} />

            {/* 5. agent_response */}
            <div
              style={{
                ...flowBoxStyle(false),
                opacity: s4,
                transform: `translateY(${getStepSlideY(s4)}px)`,
                fontFamily: SIMS_FONTS.mono,
                fontSize: 11,
              }}
            >
              agent_response
            </div>
            <DownArrow opacity={getArrowOpacity(4)} />

            {/* 6. User Output */}
            <div style={{ ...flowBoxStyle(true), opacity: s5, transform: `translateY(${getStepSlideY(s5)}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {SmallUserIcon}
                <span>User Output</span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
