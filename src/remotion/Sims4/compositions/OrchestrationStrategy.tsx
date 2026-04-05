// src/remotion/Sims4/compositions/OrchestrationStrategy.tsx
// Diagram composition: Sequential vs Hierarchical orchestration patterns side by side
// Left panel: Sequential chain (Agent A → B → C) with gear/document SVG icons
// Right panel: Hierarchical tree (Manager → Subordinates) with delegation/results arrows
// Plumbob decoration at top, glass panel backgrounds

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
import { Plumbob } from '../components/SimsUI';

// ── SVG Icon Components ──────────────────────────────────────────────────────

const UserSilhouetteIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = SIMS_COLORS.textLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color} opacity={0.9} />
    <path
      d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6"
      fill={color}
      opacity={0.7}
    />
  </svg>
);

const GearIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = SIMS_COLORS.textLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="2" fill="none" />
    <path
      d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const DocumentIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = SIMS_COLORS.textLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <line x1="9" y1="8" x2="15" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ManagerIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = SIMS_COLORS.textLight,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="3.5" fill={color} opacity={0.9} />
    <path d="M5 20c0-3 2.5-5.5 5.5-5.5h3c3 0 5.5 2.5 5.5 5.5" fill={color} opacity={0.7} />
    <circle cx="12" cy="3" r="1.5" fill={color} opacity={0.5} />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

export interface AgentNode {
  label: string;
  icon?: React.ReactNode;
}

export interface OrchestrationStrategyProps {
  diagramTitle?: string;
  sequentialAgents?: AgentNode[];
  managerAgent?: AgentNode;
  subordinateAgents?: AgentNode[];
  calloutText?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_SEQUENTIAL: AgentNode[] = [
  { label: 'Agent A', icon: <GearIcon size={18} /> },
  { label: 'Agent B', icon: <DocumentIcon size={18} /> },
  { label: 'Agent C', icon: <GearIcon size={18} /> },
];

const DEFAULT_MANAGER: AgentNode = { label: 'Manager Agent', icon: <ManagerIcon size={32} /> };

const DEFAULT_SUBORDINATES: AgentNode[] = [
  { label: 'Subordinate 1', icon: <GearIcon size={18} /> },
  { label: 'Subordinate 2', icon: <DocumentIcon size={18} /> },
  { label: 'Subordinate 3', icon: <GearIcon size={18} /> },
];

// ── Layout Constants ─────────────────────────────────────────────────────────

const NODE_W = 200;
const NODE_H = 56;
const PANEL_W = 560;
const PANEL_INNER_PAD = 28;

// ── Component ────────────────────────────────────────────────────────────────

export const OrchestrationStrategy: React.FC<OrchestrationStrategyProps> = ({
  diagramTitle = 'Orchestration Strategies',
  sequentialAgents = DEFAULT_SEQUENTIAL,
  managerAgent = DEFAULT_MANAGER,
  subordinateAgents = DEFAULT_SUBORDINATES,
  calloutText = 'The orchestration layer decides whether agents work in sequence or in parallel under a manager.',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Title entrance (frames 0–20) ──
  const titleSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(titleSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Panel entrance timing ──
  const leftPanelDelay = 15;
  const leftPanelSpring = spring({
    frame: frame - leftPanelDelay,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const leftPanelSlideX = interpolate(leftPanelSpring, [0, 1], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  const rightPanelDelay = leftPanelDelay + SIMS_TIMING.minStagger;
  const rightPanelSpring = spring({
    frame: frame - rightPanelDelay,
    fps,
    config: SIMS_SPRING.gentle,
  });
  const rightPanelSlideX = interpolate(rightPanelSpring, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Sequential chain timing ──
  const seqBaseDelay = leftPanelDelay + SIMS_TIMING.minStagger + 10;

  // ── Hierarchical tree timing ──
  const hierarchicalStart = rightPanelDelay + SIMS_TIMING.minStagger + 10;

  // ── Callout timing ──
  const calloutDelay = 200;
  const calloutOpacity = interpolate(frame, [calloutDelay, calloutDelay + SIMS_TIMING.fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // ── Sequential node positions ──
  const seqNodeGapY = 90;
  const seqStartY = 50;

  // ── Hierarchical positions ──
  const hierManagerY = 50;
  const hierSubY = hierManagerY + 140;
  const hierSubGapX = 175;

  return (
    <AbsoluteFill>
      <SimsBackground variant="cas-light" />

      <AbsoluteFill style={{ padding: '28px 40px', display: 'flex', flexDirection: 'column' }}>
        {/* ── Plumbob + Title ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: titleSpring,
            transform: `translateY(${titleSlideY}px)`,
            marginBottom: 12,
          }}
        >
          <Plumbob size={36} />
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 36,
              color: SIMS_COLORS.textPrimary,
              textAlign: 'center',
              letterSpacing: '-0.3px',
              marginTop: 4,
            }}
          >
            {diagramTitle}
          </div>
        </div>

        {/* ── Two side-by-side glass panels ── */}
        <div style={{ display: 'flex', flex: 1, gap: 24, justifyContent: 'center' }}>
          {/* ── Left Panel: Sequential Process ── */}
          <div
            style={{
              width: PANEL_W,
              opacity: leftPanelSpring,
              transform: `translateX(${leftPanelSlideX}px)`,
              background: SIMS_COLORS.panelGlass,
              borderRadius: SIMS_SIZES.borderRadius.lg,
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              padding: PANEL_INNER_PAD,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Panel label */}
            <div
              style={{
                fontFamily: SIMS_FONTS.display,
                fontSize: 16,
                fontWeight: 800,
                color: SIMS_COLORS.simsBlue,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: 16,
                opacity: interpolate(frame, [seqBaseDelay - 8, seqBaseDelay], [0, 1], {
                  extrapolateRight: 'clamp',
                  extrapolateLeft: 'clamp',
                }),
              }}
            >
              Sequential Process
            </div>

            {/* Sequential chain area */}
            <div style={{ position: 'relative', width: '100%', flex: 1 }}>
              {/* SVG arrows between sequential agents */}
              <svg
                width="100%"
                height="100%"
                style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
              >
                {sequentialAgents.map((_, i) => {
                  if (i >= sequentialAgents.length - 1) return null;

                  const arrowDelay = seqBaseDelay + (i + 1) * SIMS_TIMING.minStagger - 5;
                  const arrowProgress = interpolate(
                    frame,
                    [arrowDelay, arrowDelay + 18],
                    [0, 1],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                  );

                  const midX = (PANEL_W - PANEL_INNER_PAD * 2) / 2;
                  const y1 = seqStartY + i * seqNodeGapY + NODE_H;
                  const y2 = seqStartY + (i + 1) * seqNodeGapY;
                  const arrowLen = y2 - y1;

                  return (
                    <g key={`seq-arrow-${i}`} opacity={arrowProgress}>
                      {/* Arrow line */}
                      <line
                        x1={midX}
                        y1={y1 + 4}
                        x2={midX}
                        y2={y2 - 8}
                        stroke={SIMS_COLORS.simsBlue}
                        strokeWidth={2.5}
                        strokeDasharray={arrowLen}
                        strokeDashoffset={interpolate(arrowProgress, [0, 1], [arrowLen, 0], {
                          extrapolateRight: 'clamp',
                        })}
                      />
                      {/* Arrowhead */}
                      <polygon
                        points={`${midX - 6},${y2 - 10} ${midX},${y2 - 2} ${midX + 6},${y2 - 10}`}
                        fill={SIMS_COLORS.simsBlue}
                        opacity={arrowProgress}
                      />
                      {/* Arrow label */}
                      <text
                        x={midX + 18}
                        y={(y1 + y2) / 2 + 4}
                        fill={SIMS_COLORS.textMuted}
                        fontSize={11}
                        fontFamily={SIMS_FONTS.body}
                        opacity={arrowProgress}
                      >
                        step {i + 2}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Sequential agent nodes */}
              {sequentialAgents.map((agent, i) => {
                const nodeDelay = seqBaseDelay + i * SIMS_TIMING.minStagger;
                const nodeSpring = spring({
                  frame: frame - nodeDelay,
                  fps,
                  config: SIMS_SPRING.entrance,
                });
                const nodeSlideY = interpolate(nodeSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
                  extrapolateRight: 'clamp',
                });

                const midX = (PANEL_W - PANEL_INNER_PAD * 2) / 2;

                return (
                  <div
                    key={`seq-node-${i}`}
                    style={{
                      position: 'absolute',
                      top: seqStartY + i * seqNodeGapY,
                      left: midX - NODE_W / 2,
                      width: NODE_W,
                      height: NODE_H,
                      borderRadius: SIMS_SIZES.borderRadius.md,
                      background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      opacity: nodeSpring,
                      transform: `translateY(${nodeSlideY}px)`,
                      boxShadow: `0 6px 20px ${SIMS_COLORS.simsBlue}40`,
                      border: `2px solid ${SIMS_COLORS.simsBlueLight}55`,
                    }}
                  >
                    {/* Circular icon background */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {agent.icon || <UserSilhouetteIcon size={22} />}
                    </div>
                    <span
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontSize: 15,
                        fontWeight: 800,
                        color: SIMS_COLORS.textLight,
                      }}
                    >
                      {agent.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Panel: Hierarchical Process ── */}
          <div
            style={{
              width: PANEL_W,
              opacity: rightPanelSpring,
              transform: `translateX(${rightPanelSlideX}px)`,
              background: SIMS_COLORS.panelGlass,
              borderRadius: SIMS_SIZES.borderRadius.lg,
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              padding: PANEL_INNER_PAD,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Panel label */}
            <div
              style={{
                fontFamily: SIMS_FONTS.display,
                fontSize: 16,
                fontWeight: 800,
                color: SIMS_COLORS.simsBlue,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: 16,
                opacity: interpolate(frame, [hierarchicalStart - 8, hierarchicalStart], [0, 1], {
                  extrapolateRight: 'clamp',
                  extrapolateLeft: 'clamp',
                }),
              }}
            >
              Hierarchical Process
            </div>

            {/* Hierarchical tree area */}
            <div style={{ position: 'relative', width: '100%', flex: 1 }}>
              {/* SVG arrows: delegation down + results up */}
              <svg
                width="100%"
                height="100%"
                style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
              >
                {subordinateAgents.map((_, i) => {
                  const subDelay = hierarchicalStart + SIMS_TIMING.minStagger + i * SIMS_TIMING.minStagger;
                  const arrowDelay = subDelay - 5;
                  const arrowProgress = interpolate(
                    frame,
                    [arrowDelay, arrowDelay + 18],
                    [0, 1],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                  );

                  const panelMidX = (PANEL_W - PANEL_INNER_PAD * 2) / 2;
                  const managerBottomY = hierManagerY + NODE_H + 8;

                  // Fan-out X positions
                  const totalWidth = (subordinateAgents.length - 1) * hierSubGapX;
                  const startX = panelMidX - totalWidth / 2;
                  const subCX = subordinateAgents.length === 1 ? panelMidX : startX + i * hierSubGapX;
                  const subTopY = hierSubY - 4;

                  // Delegation arrow (down) — left side of pair
                  const delegX = subCX - 12;
                  // Results arrow (up) — right side of pair
                  const resultX = subCX + 12;

                  return (
                    <g key={`hier-arrow-${i}`} opacity={arrowProgress}>
                      {/* Delegation arrow (down) */}
                      <line
                        x1={panelMidX - 8}
                        y1={managerBottomY}
                        x2={delegX}
                        y2={subTopY - 6}
                        stroke={SIMS_COLORS.simsBlue}
                        strokeWidth={2}
                        strokeDasharray={200}
                        strokeDashoffset={interpolate(arrowProgress, [0, 1], [200, 0], {
                          extrapolateRight: 'clamp',
                        })}
                      />
                      <polygon
                        points={`${delegX - 5},${subTopY - 8} ${delegX},${subTopY} ${delegX + 5},${subTopY - 8}`}
                        fill={SIMS_COLORS.simsBlue}
                        opacity={arrowProgress}
                      />

                      {/* Results arrow (up) */}
                      <line
                        x1={resultX}
                        y1={subTopY - 6}
                        x2={panelMidX + 8}
                        y2={managerBottomY}
                        stroke={SIMS_COLORS.plumbobGreen}
                        strokeWidth={2}
                        strokeDasharray="6,4"
                        opacity={arrowProgress * 0.7}
                      />
                      <polygon
                        points={`${panelMidX + 8 - 5},${managerBottomY + 2} ${panelMidX + 8},${managerBottomY - 6} ${panelMidX + 8 + 5},${managerBottomY + 2}`}
                        fill={SIMS_COLORS.plumbobGreen}
                        opacity={arrowProgress * 0.7}
                      />

                      {/* Arrow labels */}
                      {i === 0 && (
                        <>
                          <text
                            x={panelMidX - totalWidth / 2 - 52}
                            y={(managerBottomY + subTopY) / 2 - 4}
                            fill={SIMS_COLORS.simsBlue}
                            fontSize={10}
                            fontFamily={SIMS_FONTS.body}
                            fontWeight={600}
                            opacity={arrowProgress}
                          >
                            delegation
                          </text>
                          <text
                            x={panelMidX + totalWidth / 2 + 14}
                            y={(managerBottomY + subTopY) / 2 - 4}
                            fill={SIMS_COLORS.plumbobGreen}
                            fontSize={10}
                            fontFamily={SIMS_FONTS.body}
                            fontWeight={600}
                            opacity={arrowProgress * 0.8}
                          >
                            results
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Manager node */}
              {(() => {
                const managerSpring = spring({
                  frame: frame - hierarchicalStart,
                  fps,
                  config: SIMS_SPRING.entrance,
                });
                const managerSlideY = interpolate(managerSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
                  extrapolateRight: 'clamp',
                });

                const panelMidX = (PANEL_W - PANEL_INNER_PAD * 2) / 2;
                const managerW = NODE_W + 20;

                return (
                  <div
                    style={{
                      position: 'absolute',
                      top: hierManagerY,
                      left: panelMidX - managerW / 2,
                      width: managerW,
                      height: NODE_H + 8,
                      borderRadius: SIMS_SIZES.borderRadius.md,
                      background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlueDark}, ${SIMS_COLORS.simsBlue})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      opacity: managerSpring,
                      transform: `translateY(${managerSlideY}px)`,
                      boxShadow: `0 8px 28px ${SIMS_COLORS.simsBlueDark}55`,
                      border: `2px solid ${SIMS_COLORS.simsBlueLight}55`,
                    }}
                  >
                    {/* Circular icon background */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {managerAgent.icon || <UserSilhouetteIcon size={28} />}
                    </div>
                    <span
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontSize: 16,
                        fontWeight: 800,
                        color: SIMS_COLORS.textLight,
                      }}
                    >
                      {managerAgent.label}
                    </span>
                  </div>
                );
              })()}

              {/* Subordinate nodes */}
              {subordinateAgents.map((agent, i) => {
                const subDelay = hierarchicalStart + SIMS_TIMING.minStagger + i * SIMS_TIMING.minStagger;
                const subSpring = spring({
                  frame: frame - subDelay,
                  fps,
                  config: SIMS_SPRING.entrance,
                });
                const subSlideY = interpolate(subSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
                  extrapolateRight: 'clamp',
                });

                const panelMidX = (PANEL_W - PANEL_INNER_PAD * 2) / 2;
                const totalWidth = (subordinateAgents.length - 1) * hierSubGapX;
                const startX = panelMidX - totalWidth / 2;
                const subCX = subordinateAgents.length === 1 ? panelMidX : startX + i * hierSubGapX;

                return (
                  <div
                    key={`hier-sub-${i}`}
                    style={{
                      position: 'absolute',
                      top: hierSubY,
                      left: subCX - NODE_W / 2,
                      width: NODE_W,
                      height: NODE_H,
                      borderRadius: SIMS_SIZES.borderRadius.md,
                      background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      opacity: subSpring,
                      transform: `translateY(${subSlideY}px)`,
                      boxShadow: `0 6px 20px ${SIMS_COLORS.simsBlue}40`,
                      border: `2px solid ${SIMS_COLORS.simsBlueLight}44`,
                    }}
                  >
                    {/* Circular icon background */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {agent.icon || <UserSilhouetteIcon size={22} />}
                    </div>
                    <span
                      style={{
                        fontFamily: SIMS_FONTS.display,
                        fontSize: 14,
                        fontWeight: 800,
                        color: SIMS_COLORS.textLight,
                      }}
                    >
                      {agent.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom callout bar ── */}
        {calloutText && (
          <div style={{ opacity: calloutOpacity, marginTop: 10 }}>
            <div
              style={{
                background: SIMS_COLORS.panelGlass,
                borderRadius: SIMS_SIZES.borderRadius.lg,
                padding: '14px 28px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              <span
                style={{
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 14,
                  color: SIMS_COLORS.textPrimary,
                  lineHeight: 1.5,
                }}
              >
                {calloutText}
              </span>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
