// src/remotion/Sims4/compositions/SkillsPanelShowcase.tsx
// Sims-style skills panel with horizontal progress bars and SVG icons
// Uses SimsBackground cinematic + dark glass panel with SkillBar horizontal bars

import React from 'react';
import {
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
import { SimsPanel, PanelHeader, SkillBar } from '../components/SimsUI';
import { SimsBackground } from '../components/SimsBackground';

// ── SVG Icons ────────────────────────────────────────────────────────────────

const CalendarIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MicIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const UsersIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MonitorIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const WalletIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ZapIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SIMS_COLORS.plumbobGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

export interface SkillItem {
  label: string;
  level: number;       // 1–10
  maxLevel?: number;   // default 10
  icon: React.ReactNode;
}

export interface SkillsPanelShowcaseProps {
  panelTitle?: string;
  skills?: SkillItem[];
  subtitle?: string;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_SKILLS: SkillItem[] = [
  { label: 'Event Planning', level: 8, maxLevel: 10, icon: CalendarIcon },
  { label: 'Public Speaking', level: 6, maxLevel: 10, icon: MicIcon },
  { label: 'Networking', level: 9, maxLevel: 10, icon: UsersIcon },
  { label: 'Technical Knowledge', level: 7, maxLevel: 10, icon: MonitorIcon },
  { label: 'Budget Management', level: 5, maxLevel: 10, icon: WalletIcon },
];

// ── Component ────────────────────────────────────────────────────────────────

export const SkillsPanelShowcase: React.FC<SkillsPanelShowcaseProps> = ({
  panelTitle = 'Meetup Organizer Skills',
  skills = DEFAULT_SKILLS,
  subtitle = 'Skills needed to organize an AI community meetup',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Panel fade + slide entrance (frames 0–25) ──
  const panelSpring = spring({
    frame,
    fps,
    config: SIMS_SPRING.entrance,
  });
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const panelSlideY = interpolate(
    panelSpring,
    [0, 1],
    [SIMS_TIMING.entranceOffset, 0],
    { extrapolateRight: 'clamp' },
  );

  // ── Subtitle fade-in (after panel entrance) ──
  const subtitleOpacity = subtitle
    ? interpolate(
        frame,
        [25, 25 + SIMS_TIMING.fadeInFrames],
        [0, 1],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' },
      )
    : 0;

  return (
    <SimsBackground variant="cinematic">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            opacity: panelOpacity,
            transform: `translateY(${panelSlideY}px)`,
            width: '100%',
            maxWidth: 680,
          }}
        >
          <SimsPanel variant="dark" style={{ width: '100%', padding: 0 }}>
            {/* Panel header bar */}
            <PanelHeader title={panelTitle} icon={ZapIcon} />

            {/* Skill bars list */}
            <div style={{ padding: '24px 32px 28px' }}>
              {skills.map((skill, i) => (
                <SkillBar
                  key={i}
                  label={skill.label}
                  level={skill.level}
                  maxLevel={skill.maxLevel ?? 10}
                  icon={skill.icon}
                  delayFrames={25 + i * SIMS_TIMING.minStagger}
                  dark
                />
              ))}
            </div>
          </SimsPanel>

          {/* Optional subtitle below the panel */}
          {subtitle && (
            <div
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontFamily: SIMS_FONTS.body,
                fontSize: 16,
                color: SIMS_COLORS.textLight,
                opacity: subtitleOpacity,
                letterSpacing: '0.2px',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </SimsBackground>
  );
};
