// src/remotion/Sims4/compositions/CodeShowcase.tsx
// Template composition: Code snippet with syntax highlighting + title/subtitle + optional moodlet
// For showing CrewAI implementation examples

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
import { Moodlet } from '../components/SimsUI';

// ── Syntax Tokenizer ─────────────────────────────────────────────────────────

export interface SyntaxToken {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'plain';
}

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif',
  'for', 'while', 'in', 'not', 'and', 'or', 'is', 'None', 'True',
  'False', 'with', 'as', 'try', 'except', 'finally', 'raise', 'pass',
  'break', 'continue', 'yield', 'lambda', 'global', 'nonlocal', 'del',
  'assert', 'async', 'await', 'self',
]);

/**
 * Tokenizes a code string into syntax tokens for coloring.
 * CRITICAL: tokens.map(t => t.text).join('') === originalCode (round-trip invariant)
 */
export function tokenizeCode(code: string): SyntaxToken[] {
  const tokens: SyntaxToken[] = [];
  let i = 0;

  while (i < code.length) {
    // Comment: # to end of line
    if (code[i] === '#') {
      const start = i;
      while (i < code.length && code[i] !== '\n') {
        i++;
      }
      tokens.push({ text: code.slice(start, i), type: 'comment' });
      continue;
    }

    // Strings: single or double quoted (including triple-quoted)
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      const start = i;
      // Check for triple quote
      if (code[i + 1] === quote && code[i + 2] === quote) {
        i += 3;
        while (i < code.length) {
          if (code[i] === '\\') {
            i += 2; // skip escaped character
            continue;
          }
          if (code[i] === quote && code[i + 1] === quote && code[i + 2] === quote) {
            i += 3;
            break;
          }
          i++;
        }
      } else {
        i++; // skip opening quote
        while (i < code.length && code[i] !== quote && code[i] !== '\n') {
          if (code[i] === '\\') {
            i += 2; // skip escaped character
            continue;
          }
          i++;
        }
        if (i < code.length && code[i] === quote) {
          i++; // skip closing quote
        }
      }
      tokens.push({ text: code.slice(start, i), type: 'string' });
      continue;
    }

    // Word boundary: check if we're at a word character
    if (/[a-zA-Z_]/.test(code[i])) {
      const start = i;
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        i++;
      }
      const word = code.slice(start, i);
      tokens.push({
        text: word,
        type: PYTHON_KEYWORDS.has(word) ? 'keyword' : 'plain',
      });
      continue;
    }

    // Any other character: plain text (collect consecutive non-special chars)
    const start = i;
    i++;
    while (
      i < code.length &&
      code[i] !== '#' &&
      code[i] !== '"' &&
      code[i] !== "'" &&
      !/[a-zA-Z_]/.test(code[i])
    ) {
      i++;
    }
    tokens.push({ text: code.slice(start, i), type: 'plain' });
  }

  return tokens;
}

// ── Token color mapping ──────────────────────────────────────────────────────

function getTokenColor(type: SyntaxToken['type']): string {
  switch (type) {
    case 'keyword':
      return SIMS_COLORS.simsBlueLight;
    case 'string':
      return SIMS_COLORS.plumbobGreen;
    case 'comment':
      return SIMS_COLORS.textMuted;
    case 'plain':
    default:
      return SIMS_COLORS.textLight;
  }
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

const CodeTerminalIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = SIMS_COLORS.plumbobGreen,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={2} y={3} width={20} height={18} rx={3} stroke={color} strokeWidth={1.8} fill={`${color}12`} />
    <polyline points="7,10 10,13 7,16" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <line x1={13} y1={16} x2={17} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

export interface CodeShowcaseProps {
  code?: string;
  languageLabel?: string;
  title?: string;
  subtitle?: string;
  moodlet?: { icon: React.ReactNode; label: string };
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CODE = `from crewai import Agent, Task, Crew

agent = Agent(
    role="Researcher",
    goal="Find latest AI trends",
    backstory="Expert analyst",
)

task = Task(
    description="Research AI agents",
    agent=agent,
)

crew = Crew(agents=[agent], tasks=[task])
result = crew.kickoff()`;

// ── Component ────────────────────────────────────────────────────────────────

export const CodeShowcase: React.FC<CodeShowcaseProps> = ({
  code = DEFAULT_CODE,
  languageLabel = 'Python',
  title = 'CrewAI in 10 Lines',
  subtitle = 'A minimal multi-agent crew that researches AI trends.',
  moodlet = { icon: <CodeTerminalIcon />, label: 'Pythonic' },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeLines = code.split('\n');
  const tokens = tokenizeCode(code);

  // ── Animation: Code block panel entrance (frames 0–20) ──
  const panelSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const panelSlideY = interpolate(panelSpring, [0, 1], [SIMS_TIMING.entranceOffset, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Animation: Title fade-in (frames 60–85) ──
  const titleOpacity = interpolate(
    frame,
    [60, 60 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );
  const titleSlideY = interpolate(
    frame,
    [60, 60 + SIMS_TIMING.fadeInFrames],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Animation: Subtitle fade-in (frames 80–100) ──
  const subtitleOpacity = interpolate(
    frame,
    [80, 80 + SIMS_TIMING.fadeInFrames],
    [0, 1],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
  );

  // ── Animation: Moodlet slide-in (frame 90+) ──
  const moodletSpring = spring({
    frame: frame - 90,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const moodletSlideX = interpolate(moodletSpring, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Build line-indexed token map for line-by-line reveal ──
  // We need to know which tokens belong to which line
  const lineTokens: SyntaxToken[][] = [];
  let currentLine = 0;
  lineTokens[0] = [];

  for (const token of tokens) {
    // A token may span multiple lines (e.g. multi-line strings)
    const parts = token.text.split('\n');
    for (let p = 0; p < parts.length; p++) {
      if (p > 0) {
        currentLine++;
        if (!lineTokens[currentLine]) {
          lineTokens[currentLine] = [];
        }
      }
      if (parts[p].length > 0) {
        lineTokens[currentLine].push({ text: parts[p], type: token.type });
      }
    }
  }

  return (
    <AbsoluteFill>
      {/* Background */}
      <SimsBackground variant="cas-light" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 60px',
        }}
      >
        {/* ── Top section (60%): Code block ── */}
        <div
          style={{
            flex: '0 0 60%',
            opacity: panelSpring,
            transform: `translateY(${panelSlideY}px)`,
          }}
        >
          <div
            style={{
              background: SIMS_COLORS.panelDark,
              borderRadius: SIMS_SIZES.borderRadius.lg,
              padding: '20px 24px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Language label badge */}
            {languageLabel && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    background: `${SIMS_COLORS.simsBlue}44`,
                    borderRadius: SIMS_SIZES.borderRadius.pill,
                    padding: '4px 14px',
                    fontFamily: SIMS_FONTS.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    color: SIMS_COLORS.simsBlueLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {languageLabel}
                </div>
                {/* Window dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map((c, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: c,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Code lines with line-by-line reveal */}
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                fontFamily: SIMS_FONTS.mono,
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              {codeLines.map((_, lineIdx) => {
                // ~3 frames per line reveal, starting at frame 5
                const lineRevealFrame = 5 + lineIdx * 3;
                const lineOpacity = interpolate(
                  frame,
                  [lineRevealFrame, lineRevealFrame + 4],
                  [0, 1],
                  { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
                );

                const tokensForLine = lineTokens[lineIdx] || [];

                return (
                  <div
                    key={`line-${lineIdx}`}
                    style={{
                      opacity: lineOpacity,
                      display: 'flex',
                      alignItems: 'baseline',
                      whiteSpace: 'pre',
                    }}
                  >
                    {/* Line number */}
                    <span
                      style={{
                        width: 32,
                        textAlign: 'right',
                        marginRight: 16,
                        color: SIMS_COLORS.textMuted,
                        fontSize: 11,
                        opacity: 0.5,
                        flexShrink: 0,
                        userSelect: 'none',
                      }}
                    >
                      {lineIdx + 1}
                    </span>
                    {/* Syntax-colored tokens */}
                    <span>
                      {tokensForLine.length > 0
                        ? tokensForLine.map((tok, tIdx) => (
                            <span
                              key={`tok-${lineIdx}-${tIdx}`}
                              style={{ color: getTokenColor(tok.type) }}
                            >
                              {tok.text}
                            </span>
                          ))
                        : ' '}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom section (40%): Title + subtitle + moodlet ── */}
        <div
          style={{
            flex: '0 0 40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 20,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontFamily: SIMS_FONTS.display,
              fontWeight: 900,
              fontSize: 36,
              color: SIMS_COLORS.textPrimary,
              lineHeight: 1.2,
              opacity: titleOpacity,
              transform: `translateY(${titleSlideY}px)`,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontFamily: SIMS_FONTS.body,
                fontSize: 18,
                color: SIMS_COLORS.textMuted,
                lineHeight: 1.5,
                marginTop: 10,
                opacity: subtitleOpacity,
                maxWidth: 700,
              }}
            >
              {subtitle}
            </div>
          )}

          {/* Moodlet */}
          {moodlet && (
            <div
              style={{
                marginTop: 16,
                opacity: moodletSpring,
                transform: `translateX(${moodletSlideX}px)`,
              }}
            >
              <Moodlet
                icon={moodlet.icon}
                label={moodlet.label}
                color={SIMS_COLORS.plumbobGreen}
              />
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
