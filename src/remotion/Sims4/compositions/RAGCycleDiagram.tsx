// src/remotion/Sims4/compositions/RAGCycleDiagram.tsx
// Diagram composition: RAG pipeline as an animated cycle
// Left side (30%): bookshelf/library visual element
// Right side (70%): title + circular flow diagram with numbered step nodes + SVG curved arrows

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
  SIMS_SPRING,
  SIMS_TIMING,
} from '../data/simsTheme';
import { SimsBackground } from '../components/SimsBackground';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CycleStep {
  number: number;
  icon: React.ReactNode | string;
  label: string;
}

export interface RAGCycleDiagramProps {
  diagramTitle?: string;
  subtitle?: string;
  steps?: CycleStep[];
  leftVisualLabel?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

// ── Inline SVG Icons ─────────────────────────────────────────────────────────

const SpeechBubbleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="10" r="1" fill={SIMS_COLORS.textLight} stroke="none" />
  </svg>
);

const EmbeddingsGridIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const DatabaseCylinderIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 5v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);

const DocumentStackIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

const AgentGearIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="8" r="4" />
    <path d="M10 12c-4 0-7 2-7 5v1h10" />
    <circle cx="19" cy="16" r="3" />
    <path d="M19 13v-0.5" /><path d="M19 19.5V19" />
    <path d="M16.05 14.5l0.4-0.2" /><path d="M21.55 17.7l0.4-0.2" />
    <path d="M16.05 17.5l0.4 0.2" /><path d="M21.55 14.3l0.4 0.2" />
  </svg>
);

const ChatBubbleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.textLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const DEFAULT_STEPS: CycleStep[] = [
  { number: 1, icon: SpeechBubbleIcon, label: 'User Query' },
  { number: 2, icon: EmbeddingsGridIcon, label: 'Embeddings' },
  { number: 3, icon: DatabaseCylinderIcon, label: 'Vector Database' },
  { number: 4, icon: DocumentStackIcon, label: 'Retrieved Content' },
  { number: 5, icon: AgentGearIcon, label: 'Agent' },
  { number: 6, icon: ChatBubbleIcon, label: 'Response' },
];

// ── Constants ────────────────────────────────────────────────────────────────

const NODE_RADIUS = 34;
const OVAL_RX = 180;
const OVAL_RY = 160;
const OVAL_CX = 310;
const OVAL_CY = 310;

// ── Bookshelf Visual ─────────────────────────────────────────────────────────

const BookshelfVisual: React.FC<{ label?: string; opacity: number }> = ({
  label,
  opacity,
}) => {
  // Book-spine rectangles arranged on shelves
  const shelves = [
    { y: 120, books: [
      { x: 30, w: 22, h: 80, color: SIMS_COLORS.simsBlue },
      { x: 56, w: 18, h: 72, color: SIMS_COLORS.simsBlueLight },
      { x: 78, w: 24, h: 85, color: SIMS_COLORS.plumbobGreen },
      { x: 106, w: 20, h: 68, color: SIMS_COLORS.simsBlueDark },
      { x: 130, w: 22, h: 78, color: SIMS_COLORS.needsPurple },
      { x: 156, w: 18, h: 74, color: SIMS_COLORS.simsBlue },
    ]},
    { y: 280, books: [
      { x: 28, w: 20, h: 76, color: SIMS_COLORS.needsOrange },
      { x: 52, w: 24, h: 82, color: SIMS_COLORS.simsBlueLight },
      { x: 80, w: 18, h: 70, color: SIMS_COLORS.plumbobGreen },
      { x: 102, w: 22, h: 80, color: SIMS_COLORS.simsBlueDark },
      { x: 128, w: 20, h: 74, color: SIMS_COLORS.simsBlue },
      { x: 152, w: 24, h: 84, color: SIMS_COLORS.needsPurple },
    ]},
    { y: 440, books: [
      { x: 32, w: 22, h: 78, color: SIMS_COLORS.simsBlue },
      { x: 58, w: 20, h: 72, color: SIMS_COLORS.plumbobGreen },
      { x: 82, w: 24, h: 80, color: SIMS_COLORS.simsBlueLight },
      { x: 110, w: 18, h: 68, color: SIMS_COLORS.needsOrange },
      { x: 132, w: 22, h: 76, color: SIMS_COLORS.simsBlueDark },
    ]},
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        position: 'relative',
      }}
    >
      {/* Label */}
      {label && (
        <div
          style={{
            fontFamily: SIMS_FONTS.display,
            fontSize: 15,
            fontWeight: 700,
            color: SIMS_COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          {label}
        </div>
      )}

      {/* Bookshelf SVG */}
      <svg width="200" height="580" viewBox="0 0 200 580" style={{ overflow: 'visible' }}>
        {/* Shelf frame */}
        <rect
          x="10"
          y="30"
          width="180"
          height="530"
          rx="8"
          fill="none"
          stroke={SIMS_COLORS.simsBlue}
          strokeWidth="2"
          opacity={0.25}
        />

        {/* Shelves and books */}
        {shelves.map((shelf, si) => (
          <g key={`shelf-${si}`}>
            {/* Shelf line */}
            <line
              x1="10"
              y1={shelf.y + 90}
              x2="190"
              y2={shelf.y + 90}
              stroke={SIMS_COLORS.simsBlue}
              strokeWidth="2"
              opacity={0.3}
            />
            {/* Books */}
            {shelf.books.map((book, bi) => (
              <rect
                key={`book-${si}-${bi}`}
                x={book.x}
                y={shelf.y + 90 - book.h}
                width={book.w}
                height={book.h}
                rx="3"
                fill={book.color}
                opacity={0.7}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};


// ── Helper: compute node position on oval ────────────────────────────────────

function getOvalPosition(index: number, total: number): { x: number; y: number } {
  // Distribute nodes evenly around an oval, starting from top
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: OVAL_CX + OVAL_RX * Math.cos(angle),
    y: OVAL_CY + OVAL_RY * Math.sin(angle),
  };
}

// ── Helper: compute SVG arc path between two oval positions ──────────────────

function getArcPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  // Quadratic bezier curving outward from the oval center
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  // Push control point slightly outward from center
  const dx = midX - OVAL_CX;
  const dy = midY - OVAL_CY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const pushFactor = 0.25;
  const cx = midX + (dx / dist) * 40 * pushFactor;
  const cy = midY + (dy / dist) * 40 * pushFactor;

  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

// ── Main Component ───────────────────────────────────────────────────────────

export const RAGCycleDiagram: React.FC<RAGCycleDiagramProps> = ({
  diagramTitle = 'RAG Pipeline',
  subtitle = 'Retrieval-Augmented Generation cycle',
  steps = DEFAULT_STEPS,
  leftVisualLabel = 'Knowledge Library',
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

  // ── Subtitle entrance (frames 10–35) ──
  const subtitleOpacity = interpolate(
    frame,
    [10, 10 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Left visual fade-in (frames 10–30) ──
  const leftVisualOpacity = interpolate(
    frame,
    [10, 30],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Cycle steps base delay ──
  const stepsBaseDelay = 30;

  return (
    <AbsoluteFill>
      {/* Background */}
      <SimsBackground variant="cas-light" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '40px 48px',
        }}
      >
        {/* ── Left side (30%): bookshelf/library visual ── */}
        <div
          style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BookshelfVisual label={leftVisualLabel} opacity={leftVisualOpacity} />
        </div>

        {/* ── Right side (70%): title + circular flow diagram ── */}
        <div
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 32,
              color: SIMS_COLORS.textPrimary,
              textAlign: 'center',
              opacity: titleSpring,
              transform: `translateY(${titleSlideY}px)`,
              letterSpacing: '-0.3px',
              lineHeight: 1.15,
            }}
          >
            {diagramTitle}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontFamily: SIMS_FONTS.body,
                fontSize: 15,
                color: SIMS_COLORS.textMuted,
                textAlign: 'center',
                marginTop: 6,
                opacity: subtitleOpacity,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Circular flow diagram */}
          <div
            style={{
              position: 'relative',
              width: OVAL_CX * 2,
              height: OVAL_CY * 2,
              marginTop: 8,
              flexShrink: 0,
            }}
          >
            {/* SVG curved arrows between steps */}
            <svg
              width={OVAL_CX * 2}
              height={OVAL_CY * 2}
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              {steps.map((_, i) => {
                const nextIdx = (i + 1) % steps.length;
                const from = getOvalPosition(i, steps.length);
                const to = getOvalPosition(nextIdx, steps.length);

                // Offset from/to by NODE_RADIUS toward the next/prev node
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const offsetFrom = {
                  x: from.x + (dx / dist) * NODE_RADIUS,
                  y: from.y + (dy / dist) * NODE_RADIUS,
                };
                const offsetTo = {
                  x: to.x - (dx / dist) * (NODE_RADIUS + 6),
                  y: to.y - (dy / dist) * (NODE_RADIUS + 6),
                };

                const arrowDelay = stepsBaseDelay + i * SIMS_TIMING.minStagger + 10;
                const arrowProgress = interpolate(
                  frame,
                  [arrowDelay, arrowDelay + 20],
                  [0, 1],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                );

                const pathD = getArcPath(offsetFrom, offsetTo);
                // Approximate path length for dashoffset
                const pathLen = dist * 1.1;

                // Arrowhead angle
                const arrowAngle = Math.atan2(
                  offsetTo.y - offsetFrom.y,
                  offsetTo.x - offsetFrom.x,
                );
                const arrowSize = 7;
                const ax = offsetTo.x;
                const ay = offsetTo.y;
                const p1x = ax - arrowSize * Math.cos(arrowAngle - 0.4);
                const p1y = ay - arrowSize * Math.sin(arrowAngle - 0.4);
                const p2x = ax - arrowSize * Math.cos(arrowAngle + 0.4);
                const p2y = ay - arrowSize * Math.sin(arrowAngle + 0.4);

                return (
                  <g key={`arrow-${i}`} opacity={arrowProgress}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={SIMS_COLORS.simsBlue}
                      strokeWidth={2}
                      strokeDasharray={pathLen}
                      strokeDashoffset={interpolate(
                        arrowProgress,
                        [0, 1],
                        [pathLen, 0],
                        { extrapolateRight: 'clamp' },
                      )}
                      opacity={0.6}
                    />
                    <polygon
                      points={`${ax},${ay} ${p1x},${p1y} ${p2x},${p2y}`}
                      fill={SIMS_COLORS.simsBlue}
                      opacity={arrowProgress}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Step nodes */}
            {steps.map((step, i) => {
              const pos = getOvalPosition(i, steps.length);
              const nodeDelay = stepsBaseDelay + i * SIMS_TIMING.minStagger;
              const nodeSpring = spring({
                frame: frame - nodeDelay,
                fps,
                config: SIMS_SPRING.entrance,
              });
              const nodeScale = interpolate(nodeSpring, [0, 1], [0.6, 1], {
                extrapolateRight: 'clamp',
              });

              return (
                <div
                  key={`step-${i}`}
                  style={{
                    position: 'absolute',
                    left: pos.x - NODE_RADIUS,
                    top: pos.y - NODE_RADIUS,
                    width: NODE_RADIUS * 2,
                    height: NODE_RADIUS * 2,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${SIMS_COLORS.simsBlue}, ${SIMS_COLORS.simsBlueLight})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: nodeSpring,
                    transform: `scale(${nodeScale})`,
                    boxShadow: `0 4px 16px ${SIMS_COLORS.simsBlue}33`,
                    border: `2px solid ${SIMS_COLORS.simsBlueLight}55`,
                  }}
                >
                  {/* Step number badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: SIMS_COLORS.plumbobGreen,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: SIMS_FONTS.display,
                      fontSize: 11,
                      fontWeight: 900,
                      color: SIMS_COLORS.textLight,
                      boxShadow: `0 2px 6px ${SIMS_COLORS.plumbobGreen}44`,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {step.icon}
                  </div>
                </div>
              );
            })}

            {/* Step labels outside nodes */}
            {steps.map((step, i) => {
              const pos = getOvalPosition(i, steps.length);
              const nodeDelay = stepsBaseDelay + i * SIMS_TIMING.minStagger;
              const labelOpacity = interpolate(
                frame,
                [nodeDelay + 5, nodeDelay + 5 + SIMS_TIMING.fadeInFrames],
                [0, 1],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
              );

              // Position label outside the oval
              const angle = (2 * Math.PI * i) / steps.length - Math.PI / 2;
              const labelOffset = NODE_RADIUS + 22;
              const labelX = pos.x + labelOffset * Math.cos(angle) * 0.5;
              const labelY = pos.y + labelOffset * Math.sin(angle) * 0.5 + NODE_RADIUS + 8;

              return (
                <div
                  key={`label-${i}`}
                  style={{
                    position: 'absolute',
                    left: labelX - 50,
                    top: labelY,
                    width: 100,
                    textAlign: 'center',
                    fontFamily: SIMS_FONTS.display,
                    fontSize: 11,
                    fontWeight: 700,
                    color: SIMS_COLORS.textPrimary,
                    opacity: labelOpacity,
                    lineHeight: 1.2,
                  }}
                >
                  {step.label}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
