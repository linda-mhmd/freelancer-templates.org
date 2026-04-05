import React from "react";
import {
  AbsoluteFill, Img, interpolate, Sequence, spring,
  useCurrentFrame, useVideoConfig, staticFile,
} from "remotion";
import {
  BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge,
} from "../../components";
import {
  GD_DARK, GD_PURPLE, GD_VIOLET, GD_PINK, GD_ACCENT, GD_ORANGE, GD_GOLD,
} from "../../design/colors";
import { FONT_FAMILY } from "../../design/typography";
import { springConfig } from "../../design/animations";
import { calculateCountdown, formatTime, staggeredEntry } from "../../utils/timing";
import { type ScheduleSegment } from "../../utils/phases";
import {
  GAME_START_OFFSET_MINUTES as GAME_START,
  GAME_END_OFFSET_MINUTES as GAME_END,
} from "../../../config/event";

const F = FONT_FAMILY;
const GAMEDAY_LOGO = staticFile("assets/logos/gameday-logo-geometric.png");
const COMMUNITY_LOGO = staticFile("assets/aws-community-logo.png");
const EUROPE_MAP = staticFile("assets/europe-map.png");

// ── 30-min phases ──
export const GAMEPLAY_PHASES: ScheduleSegment[] = [
  { label: "Phase 1", startFrame: 0, endFrame: 53999 },
  { label: "Phase 2", startFrame: 54000, endFrame: 107999 },
  { label: "Phase 3", startFrame: 108000, endFrame: 161999 },
  { label: "Final Phase", startFrame: 162000, endFrame: 215999 },
];

export function isGameplayAudioCueBannerVisible(frame: number): boolean {
  return frame >= 207000;
}
export function isFinal30MinutesActive(frame: number): boolean {
  return frame >= 162000;
}
export function isUrgencyGlowActive(frame: number): boolean {
  return frame >= 207000;
}

// ── SVG Icons ──
const LightbulbIcon = ({ color = GD_GOLD, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"/><path d="M10 22h4"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);
const TargetIcon = ({ color = GD_PINK, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const ZapIcon = ({ color = GD_ORANGE, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const UsersIcon = ({ color = GD_VIOLET, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const HelpIcon = ({ color = GD_ACCENT, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
  </svg>
);
const TrophyIcon = ({ color = GD_GOLD, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const RocketIcon = ({ color = GD_PINK, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const SparklesIcon = ({ color = GD_GOLD, size = 40 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

// ── Tips with icons ──
// Early tips: shown only in Phase 1 (first 30 min)
const EARLY_TIPS: Array<{ text: string; icon: React.ReactNode; color: string }> = [
  { text: "AWS GameDay is a collaborative learning exercise in a gamified, risk-free environment", icon: <RocketIcon />, color: GD_PINK },
  { text: "Each Quest is open-ended - figure out the best way forward. Don't be afraid to try!", icon: <LightbulbIcon />, color: GD_GOLD },
  { text: "Set your team name and language, then review the Quest information", icon: <TargetIcon />, color: GD_PINK },
  { text: "Use hints for quick tips - they are low cost!", icon: <HelpIcon />, color: GD_ACCENT },
  { text: "If you need help, signal a staff member and they will assist you", icon: <UsersIcon />, color: GD_VIOLET },
  { text: "This GameDay is designed for each team to work together on each Quest", icon: <TrophyIcon />, color: GD_GOLD },
  { text: "Don't worry about completing everything - have fun, experiment, and try new things!", icon: <SparklesIcon />, color: GD_GOLD },
  { text: "Bonus points are awarded to teams that finish Quests quickly", icon: <ZapIcon />, color: GD_ORANGE },
];
// Late tips: shown from Phase 2 onward (after first 30 min)
const LATE_TIPS: Array<{ text: string; icon: React.ReactNode; color: string }> = [
  { text: "Keep going! Every Quest you complete earns your team more points", icon: <TrophyIcon />, color: GD_GOLD },
  { text: "Bonus points are awarded to teams that finish Quests quickly", icon: <ZapIcon />, color: GD_ORANGE },
  { text: "Use hints for quick tips - they are low cost!", icon: <HelpIcon />, color: GD_ACCENT },
  { text: "Don't forget: Amazon Q Developer is set up in your environment - use it!", icon: <LightbulbIcon />, color: GD_GOLD },
  { text: "If you need help, signal a staff member and they will assist you", icon: <UsersIcon />, color: GD_VIOLET },
  { text: "Check the leaderboard - every Quest counts towards your final score", icon: <RocketIcon />, color: GD_PINK },
  { text: "Don't worry about completing everything - have fun, experiment, and try new things!", icon: <SparklesIcon />, color: GD_GOLD },
  { text: "Work together as a team - collaboration is key to climbing the leaderboard", icon: <TargetIcon />, color: GD_PINK },
];

// ── Tip Card (big, centered, with icon) ──
const TIP_DUR = 600; // 20s per tip
const TipCard: React.FC<{ frame: number }> = ({ frame }) => {
  const tips = frame < 54000 ? EARLY_TIPS : LATE_TIPS;
  const idx = Math.floor(frame / TIP_DUR) % tips.length;
  const local = frame % TIP_DUR;
  const fadeIn = interpolate(local, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(local, [TIP_DUR - 25, TIP_DUR], [1, 0], { extrapolateRight: "clamp" });
  const o = Math.min(fadeIn, fadeOut);
  const slideY = interpolate(local, [0, 25], [30, 0], { extrapolateRight: "clamp" });
  const tip = tips[idx];
  return (
    <div style={{ opacity: o, transform: `translateY(${slideY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, maxWidth: 850, textAlign: "center" }}>
      <div style={{ width: 100, height: 100, borderRadius: 24, background: `${tip.color}15`, border: `2px solid ${tip.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {React.cloneElement(tip.icon as React.ReactElement, { size: 54 })}
      </div>
      <div style={{ fontSize: 38, fontWeight: 700, color: "white", fontFamily: F, lineHeight: 1.5 }}>{tip.text}</div>
    </div>
  );
};

// ── Phase Timeline (4 x 30-min blocks) ──
const PhaseTimeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const totalSec = frame / fps;
  const totalMin = totalSec / 60;
  const phases = [
    { label: "Phase 1", start: 0, end: 30 },
    { label: "Phase 2", start: 30, end: 60 },
    { label: "Phase 3", start: 60, end: 90 },
    { label: "Final", start: 90, end: 120 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {phases.map((p) => {
        const active = totalMin >= p.start && totalMin < p.end;
        const done = totalMin >= p.end;
        const progress = active ? Math.min(1, (totalMin - p.start) / (p.end - p.start)) : done ? 1 : 0;
        const isFinal = p.label === "Final";
        const c = isFinal ? GD_ORANGE : active ? GD_VIOLET : done ? GD_ACCENT : `${GD_PURPLE}66`;
        return (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, width: 90, color: active ? "white" : done ? GD_ACCENT : "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", fontFamily: F }}>{p.label}</div>
            <div style={{ width: 240, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ width: `${progress * 100}%`, height: "100%", borderRadius: 6, background: `linear-gradient(90deg, ${c}, ${active && isFinal ? GD_PINK : c}cc)` }} />
            </div>
            <div style={{ fontSize: 16, color: active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", fontFamily: F }}>{p.start}-{p.end} min</div>
          </div>
        );
      })}
    </div>
  );
};

// ── Main Composition ──
export const Gameplay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countdown = calculateCountdown(frame, GAME_START, GAME_END, fps);
  const showFinal30 = isFinal30MinutesActive(frame);
  const showUrgency = isUrgencyGlowActive(frame);
  const showAudioCue = isGameplayAudioCueBannerVisible(frame);

  const min = String(Math.floor(countdown / 60)).padStart(2, "0");
  const sec = String(countdown % 60).padStart(2, "0");

  const urgencyPulse = showUrgency
    ? interpolate(frame % 40, [0, 20, 40], [0.5, 1, 0.5], { extrapolateRight: "clamp" })
    : 0;
  const timerColor = showUrgency ? GD_PINK : showFinal30 ? GD_ORANGE : GD_GOLD;

  const audioCueEntry = showAudioCue
    ? spring({ frame: frame - 207000, fps, config: springConfig.entry })
    : 0;

  return (
    <AbsoluteFill style={{ fontFamily: F, background: GD_DARK }}>
      <BackgroundLayer darken={0.7} />
      <HexGridOverlay />

      {/* ── Europe map background with heavy vignette fade ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1600,
          height: 1000,
          transform: "translate(-50%, -48%)",
          opacity: 0.18,
          filter: "saturate(0.4) brightness(0.6)",
        }}
      >
        <Img src={EUROPE_MAP} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: `radial-gradient(ellipse at center, transparent 10%, ${GD_DARK}99 40%, ${GD_DARK} 58%)`,
          }}
        />
      </div>

      <AudioBadge muted />

      {/* ── Logos: top-left ── */}
      <div style={{ position: "absolute", top: 28, left: 40, display: "flex", alignItems: "center", gap: 24, zIndex: 20 }}>
        <Img src={COMMUNITY_LOGO} style={{ height: 100 }} />
        <div style={{ width: 1, height: 60, background: `${GD_PURPLE}44` }} />
        <Img src={GAMEDAY_LOGO} style={{ height: 120 }} />
      </div>

      {/* ── Countdown: top-right ── */}
      <div style={{ position: "absolute", top: 28, right: 40, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, zIndex: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: timerColor, textTransform: "uppercase", letterSpacing: 4, fontFamily: F }}>
          {showUrgency ? "Almost Done!" : showFinal30 ? "Final 30 Minutes" : "Time Remaining"}
        </div>
        <div style={{
          fontSize: 88, fontWeight: 900, fontFamily: "monospace", color: timerColor, lineHeight: 1,
          textShadow: showUrgency ? `0 0 ${30 + urgencyPulse * 30}px ${GD_PINK}80` : showFinal30 ? `0 0 20px ${GD_ORANGE}40` : `0 0 20px ${GD_GOLD}30`,
        }}>
          {min}:{sec}
        </div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", fontFamily: F }}>until Closing Ceremony</div>
      </div>

      {/* ── Tip card: center ── */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TipCard frame={frame} />
      </AbsoluteFill>

      {/* ── Phase timeline: bottom-left ── */}
      <div style={{ position: "absolute", bottom: 32, left: 40, zIndex: 20 }}>
        <PhaseTimeline frame={frame} fps={fps} />
      </div>

      {/* ── Audio cue banner (last 5 min) ── */}
      {showAudioCue && (
        <div style={{
          position: "absolute", top: 66, left: 0, right: 0,
          display: "flex", justifyContent: "center", zIndex: 100, opacity: audioCueEntry,
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${GD_ORANGE}dd, ${GD_GOLD}dd)`,
            borderRadius: 16, padding: "12px 32px",
            boxShadow: `0 8px 32px ${GD_ORANGE}40`,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke={GD_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M14.54 7.46a5 5 0 0 1 0 9.08"/>
              <path d="M18.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
            <div style={{ fontSize: 18, fontWeight: 700, color: GD_DARK, fontFamily: F }}>
              Audio needed for Closing Ceremony
            </div>
          </div>
        </div>
      )}

      {/* Timeline markers for Remotion Studio */}
      {GAMEPLAY_PHASES.map((seg) => (
        <Sequence key={seg.label} from={seg.startFrame} durationInFrames={seg.endFrame - seg.startFrame + 1} name={seg.label} layout="none">
          <></>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
