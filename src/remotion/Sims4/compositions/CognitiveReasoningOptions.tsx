// src/remotion/Sims4/compositions/CognitiveReasoningOptions.tsx
// Sims "Cognitive Architecture" — option cards + prominent ReAct flow visualization
// Layout: SimsBackground cinematic → title → 3 strategy cards → ReAct flow diagram

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
import { SimsBackground } from '../components/SimsBackground';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ReasoningOption {
  name: string;
  description: string;
  selected: boolean;
}

export interface CognitiveReasoningOptionsProps {
  panelTitle?: string;
  tabs?: string[];
  options?: ReasoningOption[];
  actionFlow?: string[];
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_OPTIONS: ReasoningOption[] = [
  { name: 'Chain-of-Thought', description: 'Step-by-step reasoning through complex problems in a linear chain.', selected: false },
  { name: 'ReAct', description: 'Reason-then-Act loop: think, act, observe, repeat until solved.', selected: true },
  { name: 'Tree-of-Thoughts', description: 'Explore multiple reasoning branches and select the best path.', selected: false },
];

// ── SVG Icons — Strategy Cards ───────────────────────────────────────────────

const ChainOfThoughtIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = SIMS_COLORS.simsBlueLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Brain outline */}
    <path
      d="M24 8c-7.5 0-13 5.5-13 12 0 4.5 2.5 8.5 6.5 10.5V34h13v-3.5c4-2 6.5-6 6.5-10.5 0-6.5-5.5-12-13-12z"
      stroke={color}
      strokeWidth={2}
      fill={`${color}15`}
    />
    {/* Chain links inside brain */}
    <rect x={16} y={16} width={5} height={5} rx={1.5} stroke={color} strokeWidth={1.5} fill={`${color}25`} />
    <line x1={21} y1={18.5} x2={23} y2={18.5} stroke={color} strokeWidth={1.2} />
    <rect x={23} y={16} width={5} height={5} rx={1.5} stroke={color} strokeWidth={1.5} fill={`${color}25`} />
    <line x1={25.5} y1={21} x2={25.5} y2={23} stroke={color} strokeWidth={1.2} />
    <rect x={20} y={23} width={5} height={5} rx={1.5} stroke={color} strokeWidth={1.5} fill={`${color}25`} />
    {/* Arrow at bottom */}
    <line x1={24} y1={34} x2={24} y2={40} stroke={color} strokeWidth={1.5} />
    <polygon points="21,38 24,42 27,38" fill={color} />
  </svg>
);

const ReActIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = SIMS_COLORS.plumbobGreen,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Circular arrows */}
    <path
      d="M24 10a14 14 0 0 1 12.1 7"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="37,15 39,18 34,18" fill={color} />
    <path
      d="M38 24a14 14 0 0 1-7 12.1"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="33,37 30,39 30,34" fill={color} />
    <path
      d="M24 38a14 14 0 0 1-12.1-7"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="11,33 9,30 14,30" fill={color} />
    <path
      d="M10 24a14 14 0 0 1 7-12.1"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="15,11 18,9 18,14" fill={color} />
    {/* Center lightning bolt */}
    <path d="M22 18l-3 6h5l-3 6 8-8h-5l3-4z" fill={color} opacity={0.9} />
  </svg>
);

const TreeOfThoughtsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = SIMS_COLORS.needsPurple,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Root node */}
    <circle cx={24} cy={10} r={5} stroke={color} strokeWidth={2} fill={`${color}20`} />
    {/* Branches */}
    <line x1={24} y1={15} x2={12} y2={26} stroke={color} strokeWidth={1.8} />
    <line x1={24} y1={15} x2={24} y2={26} stroke={color} strokeWidth={1.8} />
    <line x1={24} y1={15} x2={36} y2={26} stroke={color} strokeWidth={1.8} />
    {/* Mid nodes */}
    <circle cx={12} cy={28} r={4} stroke={color} strokeWidth={1.8} fill={`${color}20`} />
    <circle cx={24} cy={28} r={4} stroke={color} strokeWidth={1.8} fill={`${color}20`} />
    <circle cx={36} cy={28} r={4} stroke={color} strokeWidth={1.8} fill={`${color}20`} />
    {/* Sub-branches from left */}
    <line x1={12} y1={32} x2={7} y2={39} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={12} y1={32} x2={17} y2={39} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <circle cx={7} cy={41} r={2.5} fill={color} opacity={0.3} />
    <circle cx={17} cy={41} r={2.5} fill={color} opacity={0.3} />
    {/* Sub-branches from center — highlighted as best path */}
    <line x1={24} y1={32} x2={24} y2={39} stroke={color} strokeWidth={1.8} />
    <circle cx={24} cy={41} r={3} fill={color} opacity={0.5} />
    {/* Star on best leaf */}
    <polygon
      points="24,38 25,40 27,40 25.5,41.5 26,43.5 24,42 22,43.5 22.5,41.5 21,40 23,40"
      fill={color}
      opacity={0.8}
    />
    {/* Sub-branches from right */}
    <line x1={36} y1={32} x2={31} y2={39} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={36} y1={32} x2={41} y2={39} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <circle cx={31} cy={41} r={2.5} fill={color} opacity={0.3} />
    <circle cx={41} cy={41} r={2.5} fill={color} opacity={0.3} />
  </svg>
);

// ── SVG Icons — ReAct Flow Steps ─────────────────────────────────────────────

const ThinkIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = SIMS_COLORS.needsYellow,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Lightbulb */}
    <path
      d="M14 4a7.5 7.5 0 00-4.5 13.5V20a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5v-2.5A7.5 7.5 0 0014 4z"
      stroke={color}
      strokeWidth={1.8}
      fill={`${color}25`}
    />
    <line x1={11.5} y1={23} x2={16.5} y2={23} stroke={color} strokeWidth={1.3} />
    {/* Rays */}
    <line x1={14} y1={0.5} x2={14} y2={2.5} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={5} y1={5} x2={6.5} y2={6.5} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={23} y1={5} x2={21.5} y2={6.5} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={2} y1={14} x2={4} y2={14} stroke={color} strokeWidth={1.2} opacity={0.7} />
    <line x1={24} y1={14} x2={26} y2={14} stroke={color} strokeWidth={1.2} opacity={0.7} />
  </svg>
);

const ActIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = SIMS_COLORS.plumbobGreen,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Gear */}
    <circle cx={14} cy={14} r={5} stroke={color} strokeWidth={1.8} fill={`${color}20`} />
    <circle cx={14} cy={14} r={2} fill={color} opacity={0.6} />
    {/* Gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 14 + Math.cos(rad) * 7;
      const y1 = 14 + Math.sin(rad) * 7;
      const x2 = 14 + Math.cos(rad) * 9.5;
      const y2 = 14 + Math.sin(rad) * 9.5;
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const ObserveIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = SIMS_COLORS.simsBlueLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Eye shape */}
    <path
      d="M2.5 14s4.5-8 11.5-8 11.5 8 11.5 8-4.5 8-11.5 8S2.5 14 2.5 14z"
      stroke={color}
      strokeWidth={1.8}
      fill={`${color}12`}
    />
    <circle cx={14} cy={14} r={4} stroke={color} strokeWidth={1.8} fill={`${color}25`} />
    <circle cx={14} cy={14} r={1.8} fill={color} />
  </svg>
);

const RepeatIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = SIMS_COLORS.needsOrange,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    {/* Circular repeat arrow */}
    <path
      d="M14 5a9 9 0 0 1 8 4.8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="22,8 24,11 20,11" fill={color} />
    <path
      d="M23 14a9 9 0 0 1-4.8 8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="20,22 17,24 17,20" fill={color} />
    <path
      d="M14 23a9 9 0 0 1-8-4.8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="6,20 4,17 8,17" fill={color} />
    <path
      d="M5 14a9 9 0 0 1 4.8-8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
    />
    <polygon points="8,6 11,4 11,8" fill={color} />
    {/* Center dot */}
    <circle cx={14} cy={14} r={2.5} fill={color} opacity={0.5} />
  </svg>
);

// ── Constants ────────────────────────────────────────────────────────────────

const CARD_WIDTH = 350;
const CARD_GAP = 28;
const TITLE_DELAY = 5;
const CARDS_BASE_DELAY = 30;
const FLOW_BASE_DELAY = 110;

const CARD_ACCENTS = [
  SIMS_COLORS.simsBlueLight,   // Chain-of-Thought
  SIMS_COLORS.plumbobGreen,    // ReAct — selected/highlighted
  SIMS_COLORS.needsPurple,     // Tree-of-Thoughts
];

const CARD_ICONS = [ChainOfThoughtIcon, ReActIcon, TreeOfThoughtsIcon];

// ReAct flow steps
const FLOW_STEPS = [
  { label: 'Think', Icon: ThinkIcon, color: SIMS_COLORS.needsYellow },
  { label: 'Act', Icon: ActIcon, color: SIMS_COLORS.plumbobGreen },
  { label: 'Observe', Icon: ObserveIcon, color: SIMS_COLORS.simsBlueLight },
  { label: 'Repeat', Icon: RepeatIcon, color: SIMS_COLORS.needsOrange },
];

// ── SVG Arrow between flow steps ─────────────────────────────────────────────

const FlowArrow: React.FC<{ progress: number; color: string; loopBack?: boolean }> = ({
  progress,
  color,
  loopBack = false,
}) => (
  <svg width={90} height={loopBack ? 70 : 30} viewBox={`0 0 90 ${loopBack ? 70 : 30}`} style={{ opacity: progress }}>
    {/* Forward arrow line */}
    <line
      x1={4}
      y1={15}
      x2={72}
      y2={15}
      stroke={color}
      strokeWidth={2.5}
      strokeDasharray={68}
      strokeDashoffset={interpolate(progress, [0, 1], [68, 0], { extrapolateRight: 'clamp' })}
    />
    {/* Arrowhead */}
    <polygon points="70,9 82,15 70,21" fill={color} opacity={progress} />
    {/* Loop-back dashed arc */}
    {loopBack && (
      <>
        <path
          d="M45 22 C45 55, -80 55, -80 22"
          stroke={SIMS_COLORS.plumbobGreen}
          strokeWidth={1.5}
          fill="none"
          strokeDasharray="5,4"
          opacity={progress * 0.6}
        />
        <text
          x={45}
          y={48}
          fill={SIMS_COLORS.plumbobGreen}
          fontSize={10}
          fontFamily={SIMS_FONTS.body}
          textAnchor="middle"
          opacity={progress * 0.8}
          fontWeight={600}
        >
          loop
        </text>
      </>
    )}
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────

export const CognitiveReasoningOptions: React.FC<CognitiveReasoningOptionsProps> = ({
  panelTitle = 'Cognitive Architecture',
  tabs = ['Reasoning', 'Planning', 'Memory'],
  options = DEFAULT_OPTIONS,
  actionFlow = ['Think', 'Act', 'Observe', 'Answer'],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Title entrance ──
  const titleSpring = spring({
    frame: frame - TITLE_DELAY,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleY = interpolate(titleSpring, [0, 1], [-SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Subtitle entrance ──
  const subtitleOpacity = interpolate(
    frame,
    [TITLE_DELAY + 10, TITLE_DELAY + 10 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Flow section label ──
  const flowLabelOpacity = interpolate(
    frame,
    [FLOW_BASE_DELAY - 15, FLOW_BASE_DELAY],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  return (
    <AbsoluteFill>
      <SimsBackground variant="cinematic" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 56px 24px',
        }}
      >
        {/* ── Title ── */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontSize: 40,
              fontWeight: 800,
              color: SIMS_COLORS.textLight,
              letterSpacing: '-0.5px',
            }}
          >
            {panelTitle}
          </div>
        </div>

        {/* ── Subtitle ── */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontFamily: SIMS_FONTS.body,
            fontSize: 15,
            color: SIMS_COLORS.textMuted,
            textAlign: 'center',
            marginBottom: 22,
          }}
        >
          Select a reasoning strategy for the agent
        </div>

        {/* ── Option Cards Row ── */}
        <div
          style={{
            display: 'flex',
            gap: CARD_GAP,
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          {options.map((option, i) => {
            const cardDelay = CARDS_BASE_DELAY + i * SIMS_TIMING.minStagger;
            const cardSpring = spring({
              frame: frame - cardDelay,
              fps,
              config: SIMS_SPRING.entrance,
            });
            const cardY = interpolate(cardSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
              extrapolateRight: 'clamp',
            });
            const accent = CARD_ACCENTS[i] || SIMS_COLORS.simsBlueLight;
            const CardIcon = CARD_ICONS[i] || ReActIcon;
            const isSelected = option.selected;

            return (
              <div
                key={`card-${i}`}
                style={{
                  width: CARD_WIDTH,
                  opacity: cardSpring,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <div
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${SIMS_COLORS.plumbobGreen}18 0%, ${SIMS_COLORS.plumbobGreen}08 100%)`
                      : SIMS_COLORS.panelGlass,
                    border: isSelected
                      ? `2.5px solid ${SIMS_COLORS.plumbobGreen}88`
                      : `1px solid rgba(255,255,255,0.10)`,
                    borderRadius: SIMS_SIZES.borderRadius.lg,
                    padding: '26px 22px 22px',
                    backdropFilter: 'blur(14px)',
                    boxShadow: isSelected
                      ? `0 0 28px ${SIMS_COLORS.plumbobGreen}25, 0 10px 36px rgba(0,0,0,0.35)`
                      : '0 8px 32px rgba(0,0,0,0.28)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Selected badge */}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <svg width={22} height={22} viewBox="0 0 22 22">
                        <circle cx={11} cy={11} r={10} fill={SIMS_COLORS.plumbobGreen} />
                        <path
                          d="M6 11 L9.5 14.5 L16 8"
                          stroke={SIMS_COLORS.textLight}
                          strokeWidth={2.2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Accent top bar */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: isSelected
                        ? `linear-gradient(90deg, ${accent}, ${SIMS_COLORS.plumbobGlow})`
                        : `linear-gradient(90deg, ${accent}66, ${accent}22)`,
                      borderRadius: `${SIMS_SIZES.borderRadius.lg}px ${SIMS_SIZES.borderRadius.lg}px 0 0`,
                    }}
                  />

                  {/* Icon container */}
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: SIMS_SIZES.borderRadius.pill,
                      background: `${accent}14`,
                      border: `2px solid ${accent}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 14,
                      boxShadow: isSelected ? `0 0 20px ${accent}20` : 'none',
                    }}
                  >
                    <CardIcon size={40} color={accent} />
                  </div>

                  {/* Name */}
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.display,
                      fontSize: 18,
                      fontWeight: 800,
                      color: isSelected ? SIMS_COLORS.plumbobGreen : SIMS_COLORS.textLight,
                      marginBottom: 8,
                    }}
                  >
                    {option.name}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontFamily: SIMS_FONTS.body,
                      fontSize: 12.5,
                      color: SIMS_COLORS.textMuted,
                      lineHeight: 1.55,
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ReAct Flow Section ── */}
        <div style={{ width: '100%', maxWidth: 1120 }}>
          {/* Flow section label */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontSize: 14,
              fontWeight: 700,
              color: SIMS_COLORS.plumbobGreen,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: 12,
              textAlign: 'center',
              opacity: flowLabelOpacity,
            }}
          >
            ReAct Execution Flow
          </div>

          {/* Flow glass panel */}
          <div
            style={{
              background: SIMS_COLORS.panelGlass,
              border: `1px solid ${SIMS_COLORS.plumbobGreen}30`,
              borderRadius: SIMS_SIZES.borderRadius.lg,
              backdropFilter: 'blur(14px)',
              boxShadow: `0 0 20px ${SIMS_COLORS.plumbobGreen}10, 0 10px 36px rgba(0,0,0,0.3)`,
              padding: '28px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {FLOW_STEPS.map((step, i) => {
              const stepDelay = FLOW_BASE_DELAY + i * SIMS_TIMING.minStagger;
              const stepSpring = spring({
                frame: frame - stepDelay,
                fps,
                config: SIMS_SPRING.snappy,
              });
              const stepScale = interpolate(stepSpring, [0, 1], [0.75, 1], {
                extrapolateRight: 'clamp',
              });

              // Arrow animation
              const arrowDelay = stepDelay + 10;
              const arrowProgress = interpolate(
                frame,
                [arrowDelay, arrowDelay + 15],
                [0, 1],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
              );

              const isLast = i === FLOW_STEPS.length - 1;
              const showLoop = i === 2; // After Observe, show loop-back

              return (
                <React.Fragment key={`flow-${i}`}>
                  {/* Step node */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                      opacity: stepSpring,
                      transform: `scale(${stepScale})`,
                      minWidth: 140,
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: SIMS_SIZES.borderRadius.pill,
                        background: `${step.color}18`,
                        border: `2.5px solid ${step.color}66`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      <step.Icon size={30} color={step.color} />
                    </div>

                    {/* Label */}
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontSize: 14,
                        fontWeight: 700,
                        color: SIMS_COLORS.textLight,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step.label}
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {!isLast && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        minWidth: 90,
                      }}
                    >
                      <FlowArrow
                        progress={arrowProgress}
                        color={SIMS_COLORS.simsBlueLight}
                        loopBack={showLoop}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
