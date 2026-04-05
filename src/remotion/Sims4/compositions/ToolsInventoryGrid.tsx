// src/remotion/Sims4/compositions/ToolsInventoryGrid.tsx
// Sims inventory grid: CSS grid of rounded slots with tool icons + glass-panel description
// Layout: SimsBackground cas-light → left side: title + grid. Right side: glass-panel description.

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
import { SimsPanel } from '../components/SimsUI';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ToolSlot {
  icon: React.ReactNode | string;
  label: string;
  row: number;
  col: number;
}

export interface ToolsInventoryGridProps {
  gridTitle?: string;
  tools?: ToolSlot[];
  rows?: number;
  cols?: number;
  descriptionText?: string;
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

const PlugIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 4v4M17 4v4M7 8h10a2 2 0 012 2v2a6 6 0 01-6 6h0a6 6 0 01-6-6v-2a2 2 0 012-2z" stroke={SIMS_COLORS.simsBlueLight} strokeWidth={1.8} strokeLinecap="round" />
    <line x1={12} y1={18} x2={12} y2={22} stroke={SIMS_COLORS.simsBlueLight} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

const ZapIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke={SIMS_COLORS.needsYellow} strokeWidth={1.8} fill={`${SIMS_COLORS.needsYellow}20`} strokeLinejoin="round" />
  </svg>
);

const DatabaseIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx={12} cy={6} rx={8} ry={3} stroke={SIMS_COLORS.plumbobGreen} strokeWidth={1.8} fill={`${SIMS_COLORS.plumbobGreen}15`} />
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke={SIMS_COLORS.plumbobGreen} strokeWidth={1.8} />
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke={SIMS_COLORS.plumbobGreen} strokeWidth={1.8} />
  </svg>
);

const SearchIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={11} cy={11} r={7} stroke={SIMS_COLORS.needsPurple} strokeWidth={1.8} fill={`${SIMS_COLORS.needsPurple}12`} />
    <line x1={16.5} y1={16.5} x2={21} y2={21} stroke={SIMS_COLORS.needsPurple} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

const CodeIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="16,18 22,12 16,6" stroke={SIMS_COLORS.simsBlue} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8,6 2,12 8,18" stroke={SIMS_COLORS.simsBlue} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GlobeIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={9} stroke={SIMS_COLORS.needsOrange} strokeWidth={1.8} fill={`${SIMS_COLORS.needsOrange}12`} />
    <ellipse cx={12} cy={12} rx={4} ry={9} stroke={SIMS_COLORS.needsOrange} strokeWidth={1.2} />
    <line x1={3} y1={12} x2={21} y2={12} stroke={SIMS_COLORS.needsOrange} strokeWidth={1.2} />
  </svg>
);

const ClipboardIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={6} y={4} width={12} height={17} rx={2} stroke={SIMS_COLORS.textPrimary} strokeWidth={1.8} />
    <path d="M9 2h6a1 1 0 011 1v1H8V3a1 1 0 011-1z" stroke={SIMS_COLORS.textPrimary} strokeWidth={1.5} fill={`${SIMS_COLORS.textPrimary}15`} />
    <line x1={10} y1={10} x2={14} y2={10} stroke={SIMS_COLORS.textPrimary} strokeWidth={1.2} />
    <line x1={10} y1={14} x2={14} y2={14} stroke={SIMS_COLORS.textPrimary} strokeWidth={1.2} />
  </svg>
);

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_TOOLS: ToolSlot[] = [
  { icon: <PlugIcon />, label: 'Extensions / APIs', row: 0, col: 0 },
  { icon: <ZapIcon />, label: 'Functions', row: 0, col: 1 },
  { icon: <DatabaseIcon />, label: 'Data Stores / RAG', row: 0, col: 2 },
  { icon: <SearchIcon />, label: 'Web Search', row: 1, col: 0 },
  { icon: <CodeIcon />, label: 'Code Execution', row: 1, col: 1 },
  { icon: <GlobeIcon />, label: 'External Services', row: 1, col: 2 },
];

// ── Exported helper for testability (Property 5) ─────────────────────────────

/**
 * Computes the grid slot layout: which slots are filled and which are empty.
 * Returns an array of { row, col, filled, toolIndex? } for every cell.
 * Invariant: result.length === rows * cols
 */
export function computeGridSlots(
  tools: Pick<ToolSlot, 'row' | 'col'>[],
  rows: number,
  cols: number,
): { row: number; col: number; filled: boolean; toolIndex?: number }[] {
  // Build a lookup of occupied positions
  const occupied = new Map<string, number>();
  tools.forEach((t, idx) => {
    const key = `${t.row}-${t.col}`;
    if (!occupied.has(key)) {
      occupied.set(key, idx);
    }
  });

  const slots: { row: number; col: number; filled: boolean; toolIndex?: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}-${c}`;
      if (occupied.has(key)) {
        slots.push({ row: r, col: c, filled: true, toolIndex: occupied.get(key) });
      } else {
        slots.push({ row: r, col: c, filled: false });
      }
    }
  }
  return slots;
}

// ── Constants ────────────────────────────────────────────────────────────────

const TITLE_DELAY = 0;
const GRID_BASE_DELAY = 20;
const DESCRIPTION_DELAY = 60;
const SLOT_SIZE = 90;
const SLOT_GAP = 12;

// ── Component ────────────────────────────────────────────────────────────────

export const ToolsInventoryGrid: React.FC<ToolsInventoryGridProps> = ({
  gridTitle = 'Agent Tools Inventory',
  tools = DEFAULT_TOOLS,
  rows = 4,
  cols = 3,
  descriptionText = 'Tools are the hands of an agent — they let it interact with the outside world by calling APIs, running functions, and querying data stores.',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Title entrance (frames 0–20) ──
  const titleSpring = spring({
    frame: frame - TITLE_DELAY,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const titleSlideY = interpolate(
    titleSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Compute all grid slots ──
  const gridSlots = computeGridSlots(tools, rows, cols);

  // Track which filled slot index we're on for stagger ordering
  let filledIndex = 0;
  const slotsWithStagger = gridSlots.map((slot) => {
    if (slot.filled) {
      const staggerIdx = filledIndex;
      filledIndex++;
      return { ...slot, staggerIdx };
    }
    return { ...slot, staggerIdx: -1 };
  });

  // ── Description panel fade-in (frame 60+) ──
  const descOpacity = interpolate(
    frame,
    [DESCRIPTION_DELAY, DESCRIPTION_DELAY + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );
  const descSlideY = interpolate(
    frame,
    [DESCRIPTION_DELAY, DESCRIPTION_DELAY + SIMS_TIMING.fadeInFrames],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  const gridWidth = cols * SLOT_SIZE + (cols - 1) * SLOT_GAP;

  return (
    <AbsoluteFill>
      {/* Background */}
      <SimsBackground variant="cas-light" />

      {/* Main layout: left grid + right description */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '48px 60px',
          gap: 40,
          alignItems: 'flex-start',
        }}
      >
        {/* ── Left side: title + grid ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontSize: 28,
              fontWeight: 800,
              color: SIMS_COLORS.textPrimary,
              opacity: titleSpring,
              transform: `translateY(${titleSlideY}px)`,
              letterSpacing: '-0.3px',
            }}
          >
            {gridTitle}
          </div>

          {/* Inventory grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, ${SLOT_SIZE}px)`,
              gridTemplateRows: `repeat(${rows}, ${SLOT_SIZE}px)`,
              gap: SLOT_GAP,
              width: gridWidth,
            }}
          >
            {slotsWithStagger.map((slot, i) => {
              if (slot.filled && slot.toolIndex !== undefined) {
                // Filled slot: spring pop-in
                const tool = tools[slot.toolIndex];
                const slotDelay =
                  GRID_BASE_DELAY + slot.staggerIdx * SIMS_TIMING.minStagger;
                const slotSpring = spring({
                  frame: frame - slotDelay,
                  fps,
                  config: SIMS_SPRING.entrance,
                });
                const slotScale = interpolate(
                  slotSpring,
                  [0, 1],
                  [0.5, 1],
                  { extrapolateRight: 'clamp' },
                );

                return (
                  <div
                    key={`slot-${i}`}
                    style={{
                      width: SLOT_SIZE,
                      height: SLOT_SIZE,
                      borderRadius: SIMS_SIZES.borderRadius.md,
                      background: SIMS_COLORS.panelGlass,
                      border: `2px solid ${SIMS_COLORS.simsBlueLight}66`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      opacity: slotSpring,
                      transform: `scale(${slotScale})`,
                      backdropFilter: 'blur(8px)',
                      boxShadow: `0 4px 16px ${SIMS_COLORS.simsBlue}22`,
                    }}
                  >
                    <div style={{ fontSize: 28, lineHeight: 1 }}>
                      {typeof tool.icon === 'string' ? (
                        <span>{tool.icon}</span>
                      ) : tool.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: SIMS_FONTS.body,
                        fontSize: 10,
                        fontWeight: 600,
                        color: SIMS_COLORS.textPrimary,
                        textAlign: 'center',
                        lineHeight: 1.2,
                        padding: '0 4px',
                      }}
                    >
                      {tool.label}
                    </div>
                  </div>
                );
              }

              // Empty slot: subtle outline
              return (
                <div
                  key={`slot-${i}`}
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                    borderRadius: SIMS_SIZES.borderRadius.md,
                    border: `2px dashed ${SIMS_COLORS.textMuted}44`,
                    background: 'rgba(255,255,255,0.03)',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Right side: description panel ── */}
        {descriptionText && (
          <div
            style={{
              width: 340,
              flexShrink: 0,
              marginTop: 60,
              opacity: descOpacity,
              transform: `translateY(${descSlideY}px)`,
            }}
          >
            <SimsPanel variant="glass">
              <div
                style={{
                  fontFamily: SIMS_FONTS.display,
                  fontSize: 16,
                  fontWeight: 700,
                  color: SIMS_COLORS.textPrimary,
                  marginBottom: 12,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <ClipboardIcon size={16} /> Description
                </span>
              </div>
              <div
                style={{
                  fontFamily: SIMS_FONTS.body,
                  fontSize: 13,
                  color: SIMS_COLORS.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {descriptionText}
              </div>
            </SimsPanel>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
