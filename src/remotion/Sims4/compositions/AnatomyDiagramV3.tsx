// src/remotion/Sims4/compositions/AnatomyDiagramV3.tsx
// "Anatomy of an Agent" V3 — Position-adjusted version of V2
// Changes from V2: title fontSize 28→32, left side +75px lower, right side +50px lower

import React from 'react';
import {
  AbsoluteFill,
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
  SIMS_TIMING,
} from '../data/simsTheme';

// ── Types ────────────────────────────────────────────────────────────────────
export interface AnatomyDiagramV3Props {
  diagramTitle?: string;
}

// ── Colors ───────────────────────────────────────────────────────────────────
const ORCH_GREEN_BG = 'rgba(46,125,50,0.92)';
const ORCH_GREEN_SUB = 'rgba(27,94,32,0.7)';
const ORCH_GREEN_BORDER = 'rgba(76,175,80,0.6)';
const ORCH_GREEN_LINE = '#4CAF50';
const TOOLS_GOLD_BG = 'rgba(160,130,60,0.92)';
const TOOLS_GOLD_ITEM = 'rgba(200,175,90,0.5)';
const TOOLS_GOLD_BORDER = 'rgba(220,190,100,0.6)';
const FLOW_CYAN = SIMS_COLORS.simsBlueLight;
const MODEL_HEX_BLUE = SIMS_COLORS.simsBlue;
const BG_BLUE_1 = '#1E88E5';
const BG_BLUE_2 = '#2196F3';
const BG_BLUE_3 = '#42A5F5';
const BG_BLUE_4 = '#1976D2';
const LEGEND_GLASS = 'rgba(80,130,200,0.35)';
const LEGEND_BORDER = 'rgba(120,170,240,0.4)';

// ── SVG Icons ────────────────────────────────────────────────────────────────
const BrainGearsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 3a6.5 6.5 0 0 1 5.8 3.6A5.2 5.2 0 0 1 26 12a5.2 5.2 0 0 1-2 4A5.8 5.8 0 0 1 21 22H11a5.8 5.8 0 0 1-3-6.4A5.2 5.2 0 0 1 6 12a5.2 5.2 0 0 1 4.2-5.4A6.5 6.5 0 0 1 16 3z" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="1.2" />
    <circle cx="22" cy="22" r="4" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
    <circle cx="22" cy="22" r="1.5" fill="rgba(255,255,255,0.7)" />
    <line x1="22" y1="17.5" x2="22" y2="18.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    <line x1="22" y1="25.5" x2="22" y2="26.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    <line x1="17.5" y1="22" x2="18.5" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    <line x1="25.5" y1="22" x2="26.5" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
  </svg>
);

const WrenchDbIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M18 8a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l4.8-4.8a7.5 7.5 0 0 1-10 10L8 24.8a2.6 2.6 0 0 1-3.8-3.8l8.2-8.2a7.5 7.5 0 0 1 10-10L18 8z" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="24" cy="22" rx="5" ry="2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
    <path d="M19 22v5c0 1.1 2.2 2 5 2s5-.9 5-2v-5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
  </svg>
);

const GearsArrowsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="14" cy="14" r="4" fill="none" stroke="#fff" strokeWidth="1.2" />
    <circle cx="14" cy="14" r="1.8" fill="rgba(255,255,255,0.5)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 14 + Math.cos(rad) * 4;
      const y1 = 14 + Math.sin(rad) * 4;
      const x2 = 14 + Math.cos(rad) * 5.5;
      const y2 = 14 + Math.sin(rad) * 5.5;
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />;
    })}
    <circle cx="22" cy="22" r="2.5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
    <circle cx="22" cy="22" r="1" fill="rgba(255,255,255,0.5)" />
    <path d="M26 10a8 8 0 0 1 0 12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
    <polygon points="26,22 28,20 24,20" fill="rgba(255,255,255,0.5)" />
    <path d="M6 22a8 8 0 0 1 0-12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
    <polygon points="6,10 4,12 8,12" fill="rgba(255,255,255,0.5)" />
  </svg>
);

const GearsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const WrenchIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const CodeIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const DatabaseIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// ── Floating Head Bot (Model = "just a brain") ──────────────────────────────
const FloatingHeadBot: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <ellipse cx="28" cy="30" rx="22" ry="18" fill={FLOW_CYAN} opacity="0.08" />
    <line x1="28" y1="4" x2="28" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="28" cy="3" r="3" fill={FLOW_CYAN} opacity="0.9" />
    <circle cx="28" cy="3" r="1.5" fill="#fff" opacity="0.6" />
    <rect x="8" y="14" width="40" height="30" rx="10" ry="10" fill="#37474F" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    <rect x="13" y="18" width="30" height="22" rx="7" ry="7" fill="#263238" />
    <circle cx="21" cy="28" r="5" fill={FLOW_CYAN} opacity="0.85" />
    <circle cx="35" cy="28" r="5" fill={FLOW_CYAN} opacity="0.85" />
    <circle cx="21" cy="28" r="2.5" fill="#fff" opacity="0.65" />
    <circle cx="35" cy="28" r="2.5" fill="#fff" opacity="0.65" />
    <rect x="23" y="37" width="10" height="2" rx="1" fill={SIMS_COLORS.textMuted} opacity="0.4" />
    <rect x="22" y="44" width="12" height="5" rx="2.5" fill="#455A64" opacity="0.7" />
    <circle cx="20" cy="52" r="1.2" fill={FLOW_CYAN} opacity="0.3" />
    <circle cx="28" cy="54" r="1" fill={FLOW_CYAN} opacity="0.2" />
    <circle cx="36" cy="52" r="1.2" fill={FLOW_CYAN} opacity="0.3" />
  </svg>
);

// ── Full-Body Agent Bot (the main agent character) ──────────────────────────
const AgentBotSVG: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 100 140" fill="none">
    {/* Glow / ground shadow */}
    <ellipse cx="50" cy="134" rx="28" ry="5" fill={FLOW_CYAN} opacity="0.12" />

    {/* Antenna */}
    <line x1="50" y1="2" x2="50" y2="14" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="2" r="3.5" fill={FLOW_CYAN} opacity="0.9" />
    <circle cx="50" cy="2" r="1.8" fill="#fff" opacity="0.7" />

    {/* Head */}
    <rect x="22" y="14" width="56" height="38" rx="14" ry="14" fill="#37474F" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
    <rect x="28" y="19" width="44" height="28" rx="10" ry="10" fill="#263238" />

    {/* Eyes */}
    <circle cx="40" cy="32" r="7" fill={FLOW_CYAN} opacity="0.9" />
    <circle cx="60" cy="32" r="7" fill={FLOW_CYAN} opacity="0.9" />
    <circle cx="40" cy="32" r="3.5" fill="#fff" opacity="0.7" />
    <circle cx="60" cy="32" r="3.5" fill="#fff" opacity="0.7" />
    {/* Eye highlights */}
    <circle cx="42" cy="30" r="1.5" fill="#fff" opacity="0.9" />
    <circle cx="62" cy="30" r="1.5" fill="#fff" opacity="0.9" />

    {/* Mouth */}
    <rect x="42" y="42" width="16" height="3" rx="1.5" fill={SIMS_COLORS.textMuted} opacity="0.5" />

    {/* Neck */}
    <rect x="44" y="52" width="12" height="6" rx="3" fill="#455A64" />

    {/* Torso */}
    <rect x="28" y="56" width="44" height="36" rx="10" ry="8" fill="#37474F" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    {/* Chest panel / core light */}
    <rect x="38" y="62" width="24" height="16" rx="5" fill="#263238" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
    <circle cx="50" cy="70" r="5" fill={FLOW_CYAN} opacity="0.35" />
    <circle cx="50" cy="70" r="3" fill={FLOW_CYAN} opacity="0.6" />
    <circle cx="50" cy="70" r="1.5" fill="#fff" opacity="0.5" />
    {/* Chest detail lines */}
    <line x1="40" y1="82" x2="60" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
    <line x1="40" y1="85" x2="60" y2="85" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

    {/* Left arm */}
    <rect x="14" y="60" width="14" height="28" rx="7" fill="#455A64" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    {/* Left hand */}
    <circle cx="21" cy="92" r="6" fill="#546E7A" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

    {/* Right arm */}
    <rect x="72" y="60" width="14" height="28" rx="7" fill="#455A64" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    {/* Right hand */}
    <circle cx="79" cy="92" r="6" fill="#546E7A" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

    {/* Left leg */}
    <rect x="33" y="90" width="13" height="30" rx="6" fill="#455A64" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    {/* Left foot */}
    <rect x="30" y="118" width="18" height="10" rx="5" fill="#546E7A" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

    {/* Right leg */}
    <rect x="54" y="90" width="13" height="30" rx="6" fill="#455A64" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    {/* Right foot */}
    <rect x="52" y="118" width="18" height="10" rx="5" fill="#546E7A" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
  </svg>
);

const PersonIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="21" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
    <circle cx="22" cy="16" r="5.5" fill="rgba(255,255,255,0.75)" />
    <path d="M10 36c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="rgba(255,255,255,0.55)" />
  </svg>
);

// ── Legend Panel (left side glass cards like reference) ──────────────────────
const LegendCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  hexColor: string;
  progress: number;
  slideY: number;
}> = ({ icon, title, description, hexColor, progress, slideY }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      opacity: progress,
      transform: `translateY(${slideY}px)`,
      background: LEGEND_GLASS,
      border: `1.5px solid ${LEGEND_BORDER}`,
      borderRadius: SIMS_SIZES.borderRadius.lg,
      padding: '12px 16px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      width: 340,
    }}
  >
    {/* Hexagonal icon */}
    <div style={{ width: 54, height: 54, position: 'relative', flexShrink: 0 }}>
      <svg width="54" height="54" viewBox="0 0 54 54" style={{ position: 'absolute', inset: 0 }}>
        <polygon points="27,2 50,14.5 50,39.5 27,52 4,39.5 4,14.5" fill={hexColor} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
        <polygon points="27,6 47,16.5 47,37.5 27,48 7,37.5 7,16.5" fill="rgba(255,255,255,0.1)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 18, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
        The {title}
      </span>
      <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.35, maxWidth: 230, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
        {description}
      </span>
    </div>
  </div>
);

// ── Down Arrow between legend cards ─────────────────────────────────────────
const LegendArrow: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="20" height="24" viewBox="0 0 20 24" style={{ opacity: progress, marginLeft: 24 }}>
    <line x1="10" y1="0" x2="10" y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <polygon points="5,16 10,24 15,16" fill="rgba(255,255,255,0.4)" />
  </svg>
);

// ── Main Composition ─────────────────────────────────────────────────────────
export const AnatomyDiagramV3: React.FC<AnatomyDiagramV3Props> = ({
  diagramTitle = 'Anatomy of an Agent',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animation helpers ──────────────────────────────────────────────────────
  const sp = (delay: number) =>
    spring({ frame: frame - delay, fps, config: SIMS_SPRING.entrance });
  const spSnappy = (delay: number) =>
    spring({ frame: frame - delay, fps, config: SIMS_SPRING.snappy });
  const fade = (start: number, dur: number = SIMS_TIMING.fadeInFrames) =>
    interpolate(frame, [start, start + dur], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const slideY = (delay: number, offset: number = SIMS_TIMING.entranceOffset) =>
    interpolate(sp(delay), [0, 1], [offset, 0], { extrapolateRight: 'clamp' });

  // ── Timing ─────────────────────────────────────────────────────────────────
  const T_BG = 0;
  const T_TITLE = 3;
  const T_BOT = 5;
  const T_LEGEND1 = 8;
  const T_LEGEND2 = T_LEGEND1 + SIMS_TIMING.minStagger;
  const T_LEGEND3 = T_LEGEND2 + SIMS_TIMING.minStagger;
  const T_USER_QUERY = 30;
  const T_MODEL = 40;
  const T_LINES = 50;
  const T_ORCH = 70;
  const T_TOOLS = 70 + SIMS_TIMING.minStagger;
  const T_RESPONSE = 110;
  const T_OUTPUT = 110 + SIMS_TIMING.minStagger;

  const lineProgress = interpolate(frame, [T_LINES, T_LINES + 60], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const toolItems = ['Tools', 'APIs', 'Processings', 'APIs', 'Externals'];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BG_BLUE_1} 0%, ${BG_BLUE_2} 35%, ${BG_BLUE_3} 65%, ${BG_BLUE_4} 100%)`,
        fontFamily: SIMS_FONTS.display,
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle grid overlay ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: fade(T_BG, 15) * 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Thin border frame ───────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 10,
          border: '1.5px solid rgba(255,255,255,0.12)',
          borderRadius: SIMS_SIZES.borderRadius.lg,
          pointerEvents: 'none',
          opacity: fade(T_BG, 20),
        }}
      />

      {/* ── Title (top-left, above the bot) ── */}
      <div
        style={{
          position: 'absolute',
          top: 67,
          left: 30,
          width: 370,
          textAlign: 'center',
          opacity: fade(T_TITLE),
          transform: `translateY(${slideY(T_TITLE)}px)`,
          zIndex: 15,
        }}
      >
        <span
          style={{
            fontFamily: SIMS_FONTS.display,
            fontSize: 32,
            fontWeight: 900,
            color: SIMS_COLORS.textLight,
            letterSpacing: '-0.3px',
            textShadow: '0 3px 16px rgba(0,0,0,0.4)',
          }}
        >
          {diagramTitle}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LEFT SIDE — Full-body Agent Bot + Legend cards
          ══════════════════════════════════════════════════════════════════ */}
      {/* Full-body Agent Bot — positioned independently above legend cards */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 110,
          width: 370,
          display: 'flex',
          justifyContent: 'center',
          opacity: fade(T_BOT),
          transform: `scale(${interpolate(spSnappy(T_BOT), [0, 1], [0.6, 1], { extrapolateRight: 'clamp' })})`,
          zIndex: 10,
        }}
      >
        <AgentBotSVG size={100} />
      </div>

      {/* Legend cards column */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 260,
          width: 370,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          zIndex: 10,
        }}
      >
        <LegendCard
          icon={<BrainGearsIcon size={24} />}
          title="Model"
          description="The centralized decision maker (LLM). Can be general purpose or fine-tuned."
          hexColor={MODEL_HEX_BLUE}
          progress={fade(T_LEGEND1)}
          slideY={slideY(T_LEGEND1)}
        />
        <LegendArrow progress={fade(T_LEGEND1 + 10)} />
        <LegendCard
          icon={<WrenchDbIcon size={24} />}
          title="Tools"
          description="The keys to the outside world (APIs, Extensions, Data Stores)."
          hexColor="#8D6E3C"
          progress={fade(T_LEGEND2)}
          slideY={slideY(T_LEGEND2)}
        />
        <LegendArrow progress={fade(T_LEGEND2 + 10)} />
        <LegendCard
          icon={<GearsArrowsIcon size={24} />}
          title="Orchestration"
          description="The cyclical process of reasoning, planning, memory, and execution."
          hexColor={SIMS_COLORS.lindaGreenBlazer}
          progress={fade(T_LEGEND3)}
          slideY={slideY(T_LEGEND3)}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT SIDE — Flow Diagram — V3: all Y coordinates +50px
          ══════════════════════════════════════════════════════════════════ */}

      {/* ── Connecting Lines SVG (full canvas overlay) ──────────────────── */}
      <svg
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
      >
        {/* Cyan line: User Query → Model */}
        <path
          d="M 620 120 C 670 120, 730 100, 790 100"
          fill="none"
          stroke={FLOW_CYAN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${800 * lineProgress} 800`}
          style={{ filter: `drop-shadow(0 0 4px ${FLOW_CYAN})` }}
        />
        <polygon points="790,95 802,100 790,105" fill={FLOW_CYAN} opacity={lineProgress} />

        {/* Cyan line: Model → Orchestration (exit bottom-left of hex edge, wide curve avoiding text) */}
        <path
          d="M 795 163 C 760 200, 690 240, 682 268"
          fill="none"
          stroke={FLOW_CYAN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${800 * lineProgress} 800`}
          style={{ filter: `drop-shadow(0 0 4px ${FLOW_CYAN})` }}
        />
        <polygon points="677,265 682,278 687,265" fill={FLOW_CYAN} opacity={lineProgress} />

        {/* Cyan line: Model → Tools (exit bottom-right of hex edge, wide curve avoiding text) */}
        <path
          d="M 882 163 C 920 200, 1040 240, 1077 268"
          fill="none"
          stroke={FLOW_CYAN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${800 * lineProgress} 800`}
          style={{ filter: `drop-shadow(0 0 4px ${FLOW_CYAN})` }}
        />
        <polygon points="1072,265 1077,278 1082,265" fill={FLOW_CYAN} opacity={lineProgress} />

        {/* Dashed line: Orchestration ↔ Tools (horizontal connection between panels) */}
        <path
          d="M 896 400 L 968 400"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          opacity={lineProgress}
          style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.2))' }}
        />
        <polygon points="963,396 973,400 963,404" fill="rgba(255,255,255,0.5)" opacity={lineProgress} />
        <polygon points="901,396 891,400 901,404" fill="rgba(255,255,255,0.5)" opacity={lineProgress} />

        {/* Green line: Orchestration bottom center → agent_response */}
        <path
          d="M 682 565 L 682 578"
          fill="none"
          stroke={ORCH_GREEN_LINE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${800 * lineProgress} 800`}
          style={{ filter: `drop-shadow(0 0 4px ${ORCH_GREEN_LINE})` }}
        />
        <polygon points="677,574 682,584 687,574" fill={ORCH_GREEN_LINE} opacity={lineProgress} />

        {/* Cyan line: agent_response → User Output (horizontal connection) */}
        <path
          d="M 750 590 C 830 590, 960 590, 1020 590"
          fill="none"
          stroke={FLOW_CYAN}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${800 * lineProgress} 800`}
          style={{ filter: `drop-shadow(0 0 4px ${FLOW_CYAN})` }}
        />
        <polygon points="1015,585 1025,590 1015,595" fill={FLOW_CYAN} opacity={lineProgress} />
      </svg>

      {/* ── User Query ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 85,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: fade(T_USER_QUERY),
          transform: `translateY(${slideY(T_USER_QUERY)}px)`,
          zIndex: 10,
        }}
      >
        <PersonIcon size={50} />
        <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 17, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          User Query
        </span>
      </div>

      {/* ── Model Hexagon ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 53,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: fade(T_MODEL),
          transform: `scale(${interpolate(spSnappy(T_MODEL), [0, 1], [0.7, 1], { extrapolateRight: 'clamp' })})`,
          zIndex: 10,
        }}
      >
        <div style={{ position: 'relative', width: 116, height: 116 }}>
          <svg width="116" height="116" viewBox="0 0 116 116" style={{ position: 'absolute', inset: 0 }}>
            <polygon
              points="58,4 108,30 108,86 58,112 8,86 8,30"
              fill={MODEL_HEX_BLUE}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
            />
            <polygon
              points="58,10 103,33 103,83 58,106 13,83 13,33"
              fill="rgba(255,255,255,0.08)"
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FloatingHeadBot size={62} />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <div style={{ fontFamily: SIMS_FONTS.display, fontSize: 19, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Model
          </div>
          <div style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: 'rgba(255,255,255,0.7)', maxWidth: 170, lineHeight: 1.3, marginTop: 2 }}>
            The centralized decision maker (LLM). Can be general purpose or fine-tuned.
          </div>
        </div>
      </div>

      {/* ── Orchestration Panel ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 470,
          top: 270,
          width: 425,
          opacity: fade(T_ORCH),
          transform: `translateY(${slideY(T_ORCH, 20)}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: ORCH_GREEN_BG,
            borderRadius: SIMS_SIZES.borderRadius.lg,
            border: `1.5px solid ${ORCH_GREEN_BORDER}`,
            padding: '16px 20px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <GearsArrowsIcon size={24} />
            <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 21, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              Orchestration
            </span>
          </div>
          <div style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 14, lineHeight: 1.35 }}>
            The cyclical process of reasoning, planning, memory, and execution.
          </div>

          {/* Two sub-panels side by side */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            {/* Profile, goals & instructions */}
            <div
              style={{
                flex: 1,
                background: ORCH_GREEN_SUB,
                borderRadius: SIMS_SIZES.borderRadius.sm,
                border: `1px solid ${ORCH_GREEN_BORDER}`,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontFamily: SIMS_FONTS.display, fontSize: 14, fontWeight: 700, color: SIMS_COLORS.textLight, marginBottom: 2 }}>
                Profile, goals,
              </div>
              <div style={{ fontFamily: SIMS_FONTS.display, fontSize: 14, fontWeight: 700, color: SIMS_COLORS.textLight }}>
                &amp; instructions
              </div>
            </div>

            {/* Memory */}
            <div
              style={{
                flex: 1,
                background: ORCH_GREEN_SUB,
                borderRadius: SIMS_SIZES.borderRadius.sm,
                border: `1px solid ${ORCH_GREEN_BORDER}`,
                padding: '10px 12px',
              }}
            >
              <div style={{ fontFamily: SIMS_FONTS.display, fontSize: 14, fontWeight: 700, color: SIMS_COLORS.textLight, marginBottom: 8 }}>
                Memory
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <div
                  style={{
                    flex: 1,
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontFamily: SIMS_FONTS.display,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    textAlign: 'center',
                  }}
                >
                  short-term
                </div>
                <div
                  style={{
                    flex: 1,
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontFamily: SIMS_FONTS.display,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    textAlign: 'center',
                  }}
                >
                  long-term
                </div>
              </div>
            </div>
          </div>

          {/* Model-based Reasoning/Planning bar */}
          <div
            style={{
              background: ORCH_GREEN_SUB,
              borderRadius: SIMS_SIZES.borderRadius.sm,
              border: `1px solid ${ORCH_GREEN_BORDER}`,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 16, fontWeight: 700, color: SIMS_COLORS.textLight }}>
              Model based Reasoning/Planning
            </span>
          </div>
        </div>
      </div>

      {/* ── Tools Panel ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 970,
          top: 270,
          width: 215,
          opacity: fade(T_TOOLS),
          transform: `translateY(${slideY(T_TOOLS, 20)}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: TOOLS_GOLD_BG,
            borderRadius: SIMS_SIZES.borderRadius.lg,
            border: `1.5px solid ${TOOLS_GOLD_BORDER}`,
            padding: '16px 16px 14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <WrenchDbIcon size={22} />
            <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 19, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
              Tools
            </span>
          </div>
          <div style={{ fontFamily: SIMS_FONTS.body, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 12, lineHeight: 1.35 }}>
            The keys to the outside world (APIs, Extensions, Data Stores).
          </div>

          {/* Stacked tool items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {toolItems.map((item, i) => {
              const itemDelay = T_TOOLS + 5 + i * 8;
              const itemOpacity = fade(itemDelay, 15);
              return (
                <div
                  key={`${item}-${i}`}
                  style={{
                    background: TOOLS_GOLD_ITEM,
                    borderRadius: 8,
                    border: `1px solid ${TOOLS_GOLD_BORDER}`,
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    opacity: itemOpacity,
                  }}
                >
                  {i === 0 && <WrenchIcon size={12} />}
                  {i === 1 && <CodeIcon size={12} />}
                  {i === 2 && <GearsIcon size={12} />}
                  {i === 3 && <CodeIcon size={12} />}
                  {i === 4 && <DatabaseIcon size={12} />}
                  <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 14, fontWeight: 600, color: SIMS_COLORS.textLight }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── agent_response ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 470,
          top: 580,
          width: 425,
          textAlign: 'center',
          opacity: fade(T_RESPONSE),
          transform: `translateY(${interpolate(sp(T_RESPONSE), [0, 1], [10, 0], { extrapolateRight: 'clamp' })}px)`,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: SIMS_FONTS.mono, fontSize: 16, fontWeight: 700, color: SIMS_COLORS.textLight, textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
          agent_response
        </span>
      </div>

      {/* ── User Output ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 970,
          top: 580,
          width: 215,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          opacity: fade(T_OUTPUT),
          transform: `translateY(${interpolate(sp(T_OUTPUT), [0, 1], [10, 0], { extrapolateRight: 'clamp' })}px)`,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: SIMS_FONTS.display, fontSize: 16, fontWeight: 800, color: SIMS_COLORS.textLight, textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
          User Output
        </span>
        <PersonIcon size={46} />
      </div>

      {/* ── Source citation (bottom center) ──────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: fade(T_OUTPUT + 10) * 0.5,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: SIMS_FONTS.body, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          Source: 22365_19_Agents_v8.pdf, p. 5-6
        </span>
      </div>
    </AbsoluteFill>
  );
};
