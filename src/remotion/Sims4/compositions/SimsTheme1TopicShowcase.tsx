// src/remotion/Sims4/compositions/SimsTheme1TopicShowcase.tsx
// Reusable template: Avatar left + topic content right, cinematic background
// Designed for daily topic explainers — swap props to cover any subject

import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { SimsComposition } from '../helpers/SimsComposition';
import { CinematicFullScreen } from '../templates/CinematicFullScreen';
import {
  SIMS_COLORS,
  SIMS_FONTS,
  SIMS_SIZES,
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';
import { Plumbob, NotificationToast } from '../components/SimsUI';
import { AvatarImage } from '../components/AvatarImage';
import { Bot, Workflow, BrainCircuit, Plug, BookOpen } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TopicPoint {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SpeakerInfo {
  name: string;
  role: string;
  credentials: string[];
}

export interface SimsTheme1TopicShowcaseProps {
  /** Daily topic notification */
  topicLabel?: string;
  topicNotification?: string;
  /** Main content */
  title?: string;
  subtitle?: string;
  points?: TopicPoint[];
  /** Speaker */
  speaker?: SpeakerInfo;
  avatarSrc?: string;
  /** Bottom bar */
  footerLeft?: string;
  footerRight?: string;
}

// ── Default data: AI Multi-Agent Systems with CrewAI ─────────────────────────

const DEFAULT_POINTS: TopicPoint[] = [
  {
    icon: <Bot size={20} color="white" />,
    title: 'Agents with Roles',
    description: 'Each agent has a specific role, goal, and backstory — like a team member.',
  },
  {
    icon: <Workflow size={20} color="white" />,
    title: 'Task Orchestration',
    description: 'Tasks are assigned to agents and executed sequentially or in parallel.',
  },
  {
    icon: <BrainCircuit size={20} color="white" />,
    title: 'Shared Memory',
    description: 'Agents share context through crew memory for coherent multi-step reasoning.',
  },
  {
    icon: <Plug size={20} color="white" />,
    title: 'Tool Integration',
    description: 'Agents can use tools — search, code execution, APIs — to complete tasks.',
  },
];

const DEFAULT_SPEAKER: SpeakerInfo = {
  name: 'Linda Mohamed',
  role: 'AI & Cloud Consultant',
  credentials: ['AWS Hero', 'Community Leader', 'CrewAI Builder'],
};

// ── Component ────────────────────────────────────────────────────────────────

export const SimsTheme1TopicShowcase: React.FC<SimsTheme1TopicShowcaseProps> = ({
  topicLabel = "Today's Topic",
  topicNotification = 'AI Multi-Agent Systems',
  title = 'Multi-Agent Systems',
  subtitle = 'Building AI teams with CrewAI',
  points = DEFAULT_POINTS,
  speaker = DEFAULT_SPEAKER,
  avatarSrc = 'linda_avatar.svg',
  footerLeft = 'CrewAI — Multi-Agent Framework',
  footerRight = 'v4.0 — Enterprise Edition',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animation helpers ──
  const stagger = (baseDelay: number, index: number) =>
    spring({
      frame: frame - (baseDelay + index * SIMS_TIMING.minStagger),
      fps,
      config: SIMS_SPRING.entrance,
    });

  // Avatar entrance (slide from left)
  const avatarSpring = spring({
    frame: frame - 5,
    fps,
    config: SIMS_SPRING.gentle,
  });

  // Speaker card
  const speakerSpring = spring({
    frame: frame - 25,
    fps,
    config: SIMS_SPRING.entrance,
  });

  // Title entrance
  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: SIMS_SPRING.entrance,
  });

  // Subtitle
  const subtitleOpacity = interpolate(
    frame,
    [35, 35 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp' },
  );

  // Divider
  const dividerSpring = spring({
    frame: frame - 40,
    fps,
    config: SIMS_SPRING.entrance,
  });

  // Bottom bar
  const barOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const layout = <CinematicFullScreen background="cinematic" />;

  return (
    <SimsComposition layout={layout}>
      {/* ── Left: Avatar + Speaker Card ── */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 0,
          bottom: 36,
          width: 340,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: avatarSpring,
          transform: `translateX(${interpolate(avatarSpring, [0, 1], [-60, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        {/* Plumbob */}
        <div style={{ marginBottom: 12 }}>
          <Plumbob size={44} animate />
        </div>

        {/* Avatar */}
        <AvatarImage src={avatarSrc} height={320} />

        {/* Speaker info card */}
        <div
          style={{
            marginTop: 16,
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: SIMS_SIZES.borderRadius.lg,
            padding: '14px 22px',
            textAlign: 'center' as const,
            opacity: speakerSpring,
            transform: `translateY(${interpolate(speakerSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], { extrapolateRight: 'clamp' })}px)`,
            width: '100%',
            maxWidth: 280,
          }}
        >
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 20,
              color: SIMS_COLORS.textLight,
              lineHeight: 1.2,
            }}
          >
            {speaker.name}
          </div>
          <div
            style={{
              fontFamily: SIMS_FONTS.body,
              fontSize: 13,
              color: SIMS_COLORS.plumbobGreen,
              fontWeight: 700,
              marginTop: 3,
            }}
          >
            {speaker.role}
          </div>
          {/* Credential pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              justifyContent: 'center',
              marginTop: 8,
            }}
          >
            {speaker.credentials.map((cred, i) => {
              const credProgress = stagger(35, i);
              return (
                <div
                  key={cred}
                  style={{
                    padding: '3px 10px',
                    borderRadius: SIMS_SIZES.borderRadius.pill,
                    background: SIMS_COLORS.panelGlass,
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: SIMS_FONTS.body,
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    opacity: credProgress,
                    transform: `scale(${interpolate(credProgress, [0, 1], [0.8, 1], { extrapolateRight: 'clamp' })})`,
                  }}
                >
                  {cred}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right: Topic Content ── */}
      <div
        style={{
          position: 'absolute',
          left: 440,
          right: 60,
          top: 48,
          bottom: 56,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontWeight: 900,
            fontSize: 44,
            color: SIMS_COLORS.textLight,
            lineHeight: 1.1,
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            letterSpacing: '-0.5px',
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], { extrapolateRight: 'clamp' })}px)`,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: SIMS_FONTS.body,
            fontSize: 18,
            color: SIMS_COLORS.textAccent,
            fontWeight: 600,
            marginTop: 8,
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </div>

        {/* Divider */}
        <div
          style={{
            width: interpolate(dividerSpring, [0, 1], [0, 200]),
            height: 2,
            background: `linear-gradient(90deg, ${SIMS_COLORS.plumbobGlow}, transparent)`,
            marginTop: 16,
            marginBottom: 20,
          }}
        />

        {/* Topic point cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {points.map((point, i) => {
            const cardProgress = stagger(50, i);
            const slideY = interpolate(
              cardProgress,
              [0, 1],
              [SIMS_TIMING.entranceOffset, 0],
              { extrapolateRight: 'clamp' },
            );

            return (
              <div
                key={point.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: SIMS_SIZES.borderRadius.md,
                  padding: '14px 18px',
                  opacity: cardProgress,
                  transform: `translateY(${slideY}px)`,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: SIMS_SIZES.borderRadius.sm,
                    background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {point.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.display,
                      fontWeight: 800,
                      fontSize: 15,
                      color: SIMS_COLORS.textLight,
                      lineHeight: 1.2,
                    }}
                  >
                    {point.title}
                  </div>
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.4,
                      marginTop: 3,
                    }}
                  >
                    {point.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontFamily: SIMS_FONTS.body,
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          opacity: barOpacity,
        }}
      >
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>

      {/* ── Topic notification toast ── */}
      <Sequence from={10}>
        <div style={{ position: 'absolute', top: 16, right: 20 }}>
          <NotificationToast
            icon={<BookOpen size={20} color="white" />}
            title={topicLabel}
            subtitle={topicNotification}
            variant="info"
            startFrame={0}
          />
        </div>
      </Sequence>
    </SimsComposition>
  );
};
