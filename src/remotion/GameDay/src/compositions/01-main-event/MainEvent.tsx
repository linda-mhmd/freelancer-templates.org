/**
 * MainEvent  - AWS Community GameDay Europe
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TRUE CINEMATIC REVEAL  - one scene, one focus, nothing stacked.     ║
 * ║  Each phase is a full "beat"  - content enters, breathes, exits.     ║
 * ║  Typography is large and clear at every point.                      ║
 * ║                                                                      ║
 * ║  SCENE TIMELINE (30 fps):                                           ║
 * ║   0   -  270   WELCOME          Full-screen hero title                ║
 * ║  60   -   ∞    COUNTDOWN        Top-right corner (small, always)      ║
 * ║ 150   -  1800  MAP              europe-map.png, dimmed backdrop        ║
 * ║ 270   -  420   STAT 1           "53+" User Groups  - centered, BIG     ║
 * ║ 420   -  570   STAT 2           "20+" Countries                       ║
 * ║ 570   -  720   STAT 3           "4+" Timezones                        ║
 * ║ 720   -  870   STAT 4           "1st" Edition ever                    ║
 * ║ 870   -  1080  VIENNA           Vienna spotlight  - centered           ║
 * ║ 1080  -  1320  LINDA INTRO      Full-screen host presentation card    ║
 * ║ 1320  -  1800  LINDA SPEAKING   Compact host strip + sidebar + cards  ║
 * ║ 1320  -  1500  SPEECH BUBBLE    Greeting bubble above compact strip   ║
 * ║ 1500  -  1620  INFO: AUDIO      One info card at a time, left side    ║
 * ║ 1620  -  1740  INFO: MUTE       One info card at a time               ║
 * ║ 1740  -  1800  INFO: THANKS     One info card at a time               ║
 * ║ 1800  -  9300  JEROME & ANDA    Organizer intro card  - NO text cards  ║
 * ║ 1800  -   ∞    SPEAKER          Speaker indicator bottom-right        ║
 * ║10800  - 13379  SUPPORT VIDEO    Mihaly Balassy full-screen + subtitles ║
 * ║13380  - 15179  LINDA BACK       Transition + AWS Special Guest teaser ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  Video,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BackgroundLayer,
  HexGridOverlay,
  GlassCard,
  AudioBadge,
} from "../../components";
import {
  GD_DARK,
  GD_VIOLET,
  GD_PINK,
  GD_ACCENT,
  GD_ORANGE,
  GD_GOLD,
  TYPOGRAPHY,
  FONT_FAMILY,
  springConfig,
} from "../../design";
import {
  calculateCountdown,
  formatTime,
  staggeredEntry,
} from "../../utils/timing";
import {
  getCardState,
  getPhaseInfo,
  type ScheduleSegment,
} from "../../utils/phases";
import {
  STREAM_START_OFFSET_MINUTES as STREAM_START,
  GAME_START_OFFSET_MINUTES as GAME_START,
  EVENT_DATE,
  EVENT_NAME,
  EVENT_EDITION,
  SUPPORT_VIDEO_AVAILABLE,
  CODES_TIME,
  GAME_START as GAME_START_LABEL,
  EDITION_LABEL,
  TIMEZONE_COUNT,
} from "../../../config/event";
import { AWS_SUPPORTERS as CONFIG_AWS, ORGANIZERS, USER_GROUPS, COUNTRIES, DISPLAY_STATS, COMMUNITY_PROGRAM_LABELS, EVENT_REGION, type UserGroup, getOrganizerRole, getOrganizerUserGroup } from "../../../config/participants";
import { resolveStats } from "../../utils/stats";

// ── Derived from config ──────────────────────────────────────────────────────
const ALL_PEOPLE    = [...ORGANIZERS, ...CONFIG_AWS];
const GAMEMASTERS   = ALL_PEOPLE.filter((p) => p.streamRole === "gamemaster");
const GM_LABEL      = GAMEMASTERS.map((p) => p.name).join(" & ");
const CO_ORGANIZERS = ALL_PEOPLE.filter((p) => p.streamRole === "co-organizer");
const CO_ORG_LABEL  = CO_ORGANIZERS.map((p) => p.name).join(" & ");

const HOST      = ALL_PEOPLE.find((p) => p.streamRole === "host")!;
const PRESENTER = ALL_PEOPLE.find((p) => p.streamRole === "support-presenter");

// Format EVENT_DATE ("2026-03-17") → "March 17, 2026"
const [_ey, _em, _ed] = EVENT_DATE.split("-").map(Number);
const EVENT_DATE_LONG = new Date(_ey, _em - 1, _ed).toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric",
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENE CONSTANTS  - single source of truth for every frame gate
// Each scene is EXCLUSIVE  - no two heavy elements share the same frame range.
// ─────────────────────────────────────────────────────────────────────────────
const S = {
  // Scene 1  - Welcome hero (fullscreen, only countdown allowed alongside)
  WELCOME_IN:   0,
  WELCOME_OUT:  270,

  // Countdown: top-right, appears at 60, always visible
  COUNTDOWN_IN: 60,

  // Map backdrop: very subtle, entire first act
  MAP_IN:       150,
  MAP_ZOOM_AT:  780,   // starts zooming toward Vienna
  MAP_OUT:      1800,

  // Scene 2a - 2d  - Stats, one at a time, centered
  STAT1_IN:     270,  STAT1_OUT:  420,   // 53+ User Groups
  STAT2_IN:     420,  STAT2_OUT:  570,   // 20+ Countries
  STAT3_IN:     570,  STAT3_OUT:  720,   // 4+ Timezones
  STAT4_IN:     720,  STAT4_OUT:  870,   // 1st Edition

  // Scene 3  - Vienna spotlight (centered)
  VIENNA_IN:    870,  VIENNA_OUT: 1080,

  // Scene 4  - Linda full intro card (large centered)
  LINDA_IN:    1080,  LINDA_OUT:  1320,

  // Scene 5  - Linda compact strip (bottom) + sidebar
  COMPACT_IN:  1320,  COMPACT_OUT: 1800,
  SIDEBAR_IN:  1320,

  // Scene 5a  - Greeting bubble (above compact strip)
  BUBBLE_IN:   1320,  BUBBLE_OUT: 1500,

  // Scene 5b-5d  - Info cards (left side, ONE at a time, large text)
  CARD_A_IN:   1500,  CARD_A_OUT: 1620,  // Audio check
  CARD_B_IN:   1620,  CARD_B_OUT: 1740,  // Mute warning
  CARD_C_IN:   1740,  CARD_C_OUT: 1800,  // Thank you

  // Scene 6  - Jerome & Anda organizer card (NO text cards)
  ORG_IN:      1800,  ORG_OUT:    9300,

  // Speaker indicator (from organizer section onward)
  SPEAKER_IN:  1800,

  // Scene 6b - Mihaly "Coming Up" intro card (Linda's transition to support process)
  MIHALY_IN:   9300, MIHALY_OUT: 10850,  // extends slightly past VIDEO_IN for exit animation

  // Scene 7  - Mihaly support video (full-screen, 86s × 30fps = 2580 frames)
  VIDEO_IN:   10800, VIDEO_OUT:  13379,

  // Scene 8  - Linda back on screen for glue talk; boxes overlay while she speaks (~73 s)
  LINDA_BACK_IN:  13380, LINDA_BACK_OUT: 15600,  // 2220 frames = 74 s

  // Scene 9  - Special Guest (AWS)
  // Collab sequence starts immediately when Linda appears (Phase A = 5s empty)
  //   Phase A (150 fr =  5 s): empty - just Linda, no boxes, no backdrop
  //   Phase B (600 fr = 20 s): community GlassCard centred, staggered face reveals
  //   Phase C (150 fr =  5 s): hold all faces visible
  //   Phase D (600 fr = 20 s): community slides left, AWS GlassCard enters right
  //   Phase E (150 fr =  5 s): hold both boxes
  //   Phase F (300 fr = 10 s): guest card (orange), sidebar backdrop fades, Linda intro
  GUEST_IN:   13380,
  COLLAB_IN:  13380,   // starts immediately when Linda appears
  COLLAB_OUT: 15330,   // 13380 + 1950 = 65 s total collab sequence

  // Scene 10  - Arnaud & Loïc Gamemasters intro (23400 - 44999)
  // Appears at ~16:59 countdown; disappears 5 min before game start so codes can be distributed
  GAMEMASTER_IN:  23400, GAMEMASTER_OUT: 44999,
} as const;

// Frame at which Arnaud & Loïc take over from Linda's Gamemasters intro
const GAMEMASTER_SPEAKING = 25200;

// ── Magic-move transition window: SupportPresenterIntroCard → SupportVideoBody lower-third
// Starts 55 frames before the video, completes 28 frames into the video.
const MAGIC_MOVE_START = S.VIDEO_IN - 55;   // 10745
const MAGIC_MOVE_END   = S.VIDEO_IN + 28;   // 10828  (≤ MIHALY_OUT=10850 ✓)

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT ZONES
// ─────────────────────────────────────────────────────────────────────────────
const L = {
  MARGIN:       40,
  PROGRESS_H:   68,
  SIDEBAR_W:    340,   // px
  COUNTDOWN_R:  40,
  COUNTDOWN_T:  28,
  LEFT_W:       220,   // progress bar left-panel width  -  wide enough for "AWS Gamemasters Intro"
} as const;

const FF = FONT_FAMILY;

// ─────────────────────────────────────────────────────────────────────────────
// SVG ICONS (no emojis)
// ─────────────────────────────────────────────────────────────────────────────
const MicIcon    = ({ s = 14, c = "white" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const GlobeIcon  = ({ s = 16, c = "white" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const UsersIcon  = ({ s = 16, c = "white" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ClockIcon  = ({ s = 14, c = GD_ACCENT }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const PinIcon    = ({ s = 14, c = GD_PINK }) => <svg width={s} height={s + 2} viewBox="0 0 12 16" fill={c}><path d="M6 0C2.7 0 0 2.7 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S4.6 3.5 6 3.5 8.5 4.6 8.5 6 7.4 8.5 6 8.5z"/></svg>;
const StarIcon   = ({ s = 16, c = GD_GOLD }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ChatIcon   = ({ s = 14, c = GD_ACCENT }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const GameIcon   = ({ s = 14, c = GD_ACCENT }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>;
const InfoIcon   = ({ s = 14, c = GD_ACCENT }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const CheckIcon  = ({ s = 12, c = "#334155" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const HeartIcon  = ({ s = 16, c = GD_PINK }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const VolumeIcon    = ({ s = 14, c = GD_ORANGE }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const VolumeOffIcon = ({ s = 14, c = "rgba(255,255,255,0.3)" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;
const ZapIcon       = ({ s = 12, c = GD_GOLD }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const CrownIcon     = ({ s = 14, c = GD_ORANGE }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><path d="M5 16L3 7l5.5 4.5L12 4l3.5 7.5L21 7l-2 9H5zm0 2h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"/></svg>;

// ─────────────────────────────────────────────────────────────────────────────
// STATIC ASSETS
// ─────────────────────────────────────────────────────────────────────────────
const GD_MAP       = staticFile("assets/europe-map.png");
const GAMEDAY_LOGO = staticFile("assets/logos/gameday-logo-white.png");
const SUPPORT_VID  = staticFile("assets/support-process-h264.mp4");
// UG logos derived from USER_GROUPS — add logo URLs to participants.ts, not here
// Cast to UserGroup is safe — `satisfies UserGroup[]` in participants.ts guarantees the shape.
function ugLogo(name: string | undefined): string | undefined {
  if (!name) return undefined;
  return (USER_GROUPS.find((g) => g.name === name) as UserGroup | undefined)?.logo;
}
const UG_VIE_LOGO     = ugLogo(getOrganizerUserGroup(HOST));
const UG_CO_ORG_LOGOS = CO_ORGANIZERS.map((p) => ugLogo(getOrganizerUserGroup(p))).filter(Boolean);
const UG_BUD_LOGO     = PRESENTER ? ugLogo(getOrganizerUserGroup(PRESENTER)) : undefined;

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE DATA
// ─────────────────────────────────────────────────────────────────────────────
const SEGMENTS: ScheduleSegment[] = [
  { label: "Community Intro",       startFrame: 0,     endFrame: 10799 },
  { label: "Support Process",       startFrame: 10800, endFrame: 13379 },
  { label: "Special Guest",         startFrame: 13380, endFrame: 23399 },
  { label: "AWS Gamemasters Intro", startFrame: 23400, endFrame: 25199 },
  { label: "GameDay Instructions",  startFrame: 25200, endFrame: 44999 },
  { label: "Distribute Codes",      startFrame: 45000, endFrame: 53999 },
];

const CHAPTERS: ScheduleSegment[] = [
  { label: `${HOST.fullName ?? HOST.name}  - Welcome`,           startFrame: 0,     endFrame: 1799,  speakers: HOST.fullName ?? HOST.name },
  { label: CO_ORG_LABEL,                        startFrame: 1800,  endFrame: 9299,  speakers: CO_ORG_LABEL },
  { label: `${HOST.fullName ?? HOST.name}  - Transition`,        startFrame: 9300,  endFrame: 10799, speakers: HOST.fullName ?? HOST.name },
  ...(PRESENTER ? [{ label: `${PRESENTER.fullName ?? PRESENTER.name}  - Support Process`, startFrame: 10800, endFrame: 13379, speakers: PRESENTER.fullName ?? PRESENTER.name } as ScheduleSegment] : []),
  { label: `${HOST.fullName ?? HOST.name}  - Intro Guest`,       startFrame: 13380, endFrame: 15179, speakers: HOST.fullName ?? HOST.name },
  { label: "Special Guest",                    startFrame: 15180, endFrame: 23399 },
  { label: `${HOST.fullName ?? HOST.name}  - Intro Gamemasters`, startFrame: 23400, endFrame: 25199, speakers: HOST.fullName ?? HOST.name },
  { label: "GameDay Rules & Scoring",   startFrame: 25200, endFrame: 32399, speakers: GM_LABEL },
  { label: "Challenge Walkthrough",     startFrame: 32400, endFrame: 39599, speakers: GM_LABEL },
  { label: "Tips & Final Prep",         startFrame: 39600, endFrame: 44999, speakers: GM_LABEL },
  { label: "Distribute Team Codes",     startFrame: 45000, endFrame: 49499 },
  { label: "Final Prep & Game Start!",  startFrame: 49500, endFrame: 53999 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MIHALY SUBTITLES
// ─────────────────────────────────────────────────────────────────────────────
// Timestamps from whisper transcription (exact).
// Note: the full video is 86s; composition window VIDEO_IN→VIDEO_OUT is 60s at 30fps.
// Extend VIDEO_OUT to 13380 (86s × 30fps + 10800) if you want the full video to play.
const SUBTITLES: Array<{ s: number; e: number; t: string }> = [
  { s:  0, e:  9, t: "Hi everyone, I'm Mihaly Balassy, AWS User Group leader from Budapest and part of the organizing team." },
  { s:  9, e: 16, t: "While we're getting everything ready to roll, let me quickly walk you through how to get help today." },
  { s: 16, e: 22, t: "Because knowing this will save you a lot of time once the game is live." },
  { s: 22, e: 28, t: "First, have your builder ID ready and your browser updated." },
  { s: 28, e: 33, t: "Sounds small, but it keeps you in the game if anything goes wrong." },
  { s: 33, e: 41, t: "No builder ID yet? No rush. You have plenty of time, it's free and quick to set up." },
  { s: 41, e: 50, t: "Once you're playing, feel free to use the hints. Some are free, no points lost and they can completely unblock you." },
  { s: 50, e: 59, t: "Amazon Q developer is already set up in your environment. Use it like a teammate, not a last resort." },
  { s: 59, e: 65, t: "And if you're still stuck, just raise your hand right there in the room." },
  { s: 65, e: 72, t: "Your AWS user group leaders and AWS team members on site are right there to help you." },
  { s: 72, e: 77, t: "Don't wait, don't struggle quietly. Ask early." },
  { s: 77, e: 84, t: "Okay, that's all you need. Now get ready because things are about to get exciting." },
  { s: 84, e: 86, t: "Back to you, Linda." },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────
function fadeWindow(frame: number, inAt: number, outAt: number, fadeLen = 20): number {
  return interpolate(frame, [inAt, inAt + fadeLen, outAt - fadeLen, outAt], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 1  - WELCOME HERO (0 - 270, full-screen)
// ─────────────────────────────────────────────────────────────────────────────
const WelcomeHero: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame >= S.WELCOME_OUT) return null;

  const op  = fadeWindow(frame, 0, S.WELCOME_OUT, 25);
  const sp  = spring({ frame, fps, config: springConfig.entry });
  const scl = interpolate(sp, [0, 1], [0.90, 1]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: op, zIndex: 60,
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 1100, height: 600,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse, ${GD_VIOLET}30 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      <div style={{ textAlign: "center", transform: `scale(${scl})` }}>
        <div style={{
          fontSize: 32, fontWeight: 700, color: GD_ACCENT,
          letterSpacing: 8, textTransform: "uppercase" as const, fontFamily: FF,
          marginBottom: 24,
          opacity: interpolate(sp, [0, 1], [0, 1]),
        }}>
          Welcome to
        </div>

        <div style={{
          fontSize: 96, fontWeight: 900, color: "white", fontFamily: FF,
          letterSpacing: -3, lineHeight: 1.0,
          textShadow: `0 0 80px ${GD_VIOLET}55`,
        }}>
          AWS Community
        </div>
        <div style={{
          fontSize: 96, fontWeight: 900, fontFamily: FF,
          letterSpacing: -3, lineHeight: 1.05,
          background: `linear-gradient(135deg, ${GD_VIOLET} 0%, ${GD_PINK} 60%, ${GD_ACCENT} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          GameDay Europe
        </div>

        <div style={{
          marginTop: 32,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
          opacity: interpolate(Math.max(0, frame - 30), [0, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${GD_ACCENT}66)` }} />
          <div style={{
            fontSize: TYPOGRAPHY.h6, fontWeight: 500,
            color: "rgba(255,255,255,0.7)", fontFamily: FF, letterSpacing: 2,
          }}>
            The {EDITION_LABEL}  - {EVENT_DATE_LONG}
          </div>
          <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, ${GD_ACCENT}66, transparent)` }} />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COUNTDOWN TIMER (top-right, always visible from frame 60)
// ─────────────────────────────────────────────────────────────────────────────
const CountdownTimer: React.FC<{ frame: number; fps: number; seconds: number; isDistribute: boolean }> = ({
  frame, fps, seconds, isDistribute,
}) => {
  if (frame < S.COUNTDOWN_IN) return null;
  const entry = spring({ frame: frame - S.COUNTDOWN_IN, fps, config: springConfig.entry });
  const glowPulse = isDistribute
    ? interpolate(frame % 60, [0, 30, 60], [0.5, 1, 0.5], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div style={{
      position: "absolute",
      top: L.COUNTDOWN_T, right: L.COUNTDOWN_R,
      opacity: entry,
      transform: `translateY(${interpolate(entry, [0, 1], [-8, 0])}px)`,
      zIndex: 70,
    }}>
      <GlassCard style={{
        padding: isDistribute ? "16px 32px" : "10px 22px",
        borderTop: `2px solid ${isDistribute ? GD_ORANGE : GD_VIOLET}80`,
        boxShadow: isDistribute
          ? `0 0 ${20 + glowPulse * 24}px ${GD_ORANGE}${Math.round(glowPulse * 50).toString(16).padStart(2, "0")}`
          : "none",
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.overline, fontWeight: 700,
          color: isDistribute ? GD_ORANGE : GD_ACCENT,
          letterSpacing: 3, textTransform: "uppercase" as const,
          fontFamily: FF, marginBottom: 3,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <ClockIcon s={10} c={isDistribute ? GD_ORANGE : GD_ACCENT} />
          {isDistribute ? "GAME STARTS IN" : "GAME START IN"}
        </div>
        <div style={{
          fontSize: isDistribute ? TYPOGRAPHY.timerSmall : 52,
          fontWeight: 900,
          color: isDistribute ? GD_ORANGE : "white",
          fontFamily: FF, letterSpacing: 3,
          textShadow: `0 0 28px ${isDistribute ? GD_ORANGE : GD_VIOLET}66`,
        }}>
          {formatTime(seconds)}
        </div>
      </GlassCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAP BACKDROP (150 - 1800, very subtle  - a sense of geography)
// ─────────────────────────────────────────────────────────────────────────────
const MapBackdrop: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.MAP_IN || frame > S.MAP_OUT) return null;

  const op = interpolate(
    frame, [S.MAP_IN, S.MAP_IN + 60, S.MAP_OUT - 60, S.MAP_OUT],
    [0, 0.40, 0.40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const zoomSp = spring({
    frame: frame - S.MAP_ZOOM_AT,
    fps,
    config: { damping: 100, stiffness: 8, mass: 3, overshootClamping: true },
  });
  const scale = interpolate(zoomSp, [0, 1], [1.0, 1.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panX  = interpolate(zoomSp, [0, 1], [0, -55],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panY  = interpolate(zoomSp, [0, 1], [0,  45],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1, opacity: op }}>
      <div style={{
        position: "absolute", inset: 0,
        transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
        transformOrigin: "50% 55%",
        filter: "saturate(0.5) brightness(0.55)",
      }}>
        <Img src={GD_MAP} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, transparent 25%, ${GD_DARK}99 60%, ${GD_DARK} 82%)`,
      }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 2  - BIG STAT (one at a time, centered, cinematic)
// ─────────────────────────────────────────────────────────────────────────────
interface StatDef {
  value: string;
  label: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  inFrame: number;
  outFrame: number;
}

const BigStat: React.FC<{ frame: number; fps: number; def: StatDef }> = ({ frame, fps, def }) => {
  if (frame < def.inFrame || frame > def.outFrame) return null;

  const rel  = frame - def.inFrame;
  const op   = fadeWindow(frame, def.inFrame, def.outFrame, 22);
  const sp   = spring({ frame: rel, fps, config: { damping: 14, stiffness: 90 } });
  const scl  = interpolate(sp, [0, 1], [0.72, 1]);
  const rise = interpolate(sp, [0, 1], [40, 0]);

  const lineW = interpolate(rel, [0, 30], [0, 200], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 20,
      opacity: op,
    }}>
      <div style={{
        textAlign: "center",
        transform: `scale(${scl}) translateY(${rise}px)`,
      }}>
        {/* Icon + category label */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 10, marginBottom: 16,
        }}>
          {def.icon}
          <div style={{
            fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: def.color,
            letterSpacing: 6, textTransform: "uppercase" as const, fontFamily: FF,
          }}>
            {def.label}
          </div>
        </div>

        {/* Big number */}
        <div style={{
          fontSize: 160, fontWeight: 900, lineHeight: 0.9,
          color: "white", fontFamily: FF,
          letterSpacing: -6,
          textShadow: `0 0 60px ${def.color}55, 0 0 120px ${def.color}22`,
        }}>
          {def.value}
        </div>

        {/* Accent line */}
        <div style={{
          margin: "24px auto 20px",
          width: lineW, height: 3,
          background: `linear-gradient(90deg, transparent, ${def.color}, transparent)`,
          borderRadius: 2,
        }} />

        {/* Sub-label */}
        <div style={{
          fontSize: TYPOGRAPHY.h5, fontWeight: 500, color: "rgba(255,255,255,0.75)",
          fontFamily: FF, letterSpacing: 1,
        }}>
          {def.sub}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 3  - VIENNA SPOTLIGHT (centered, 870 - 1080)
// ─────────────────────────────────────────────────────────────────────────────
const HostLocationScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.VIENNA_IN || frame > S.VIENNA_OUT) return null;

  const op  = fadeWindow(frame, S.VIENNA_IN, S.VIENNA_OUT, 25);
  const sp  = spring({ frame: frame - S.VIENNA_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [24, 0]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 25, opacity: op,
    }}>
      <div style={{ transform: `translateY(${off}px)`, width: 520 }}>
        <GlassCard style={{
          padding: "32px 44px",
          borderTop: `4px solid ${GD_PINK}`,
          textAlign: "center",
        }}>
          {/* Pin + city */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginBottom: 12,
          }}>
            <PinIcon s={18} c={GD_PINK} />
            <div style={{
              fontSize: TYPOGRAPHY.h6, fontWeight: 700, color: GD_PINK,
              fontFamily: FF, letterSpacing: 2,
            }}>
              {HOST.location?.split(", ")[0]}
            </div>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: TYPOGRAPHY.h4, fontWeight: 800, color: "white",
            fontFamily: FF, lineHeight: 1.25, marginBottom: 16,
          }}>
            Hello and welcome<br />
            from {HOST.location?.split(",")[0]}!
          </div>

          {/* Detail */}
          <div style={{
            fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.72)",
            fontFamily: FF, lineHeight: 1.6,
          }}>
            {getOrganizerRole(HOST)} is participating today too - my co-organizers are hosting it in the room right next door!
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 4  - HOST FULL INTRO CARD (1080 - 1320, large centered presentation)
// ─────────────────────────────────────────────────────────────────────────────
const HostIntroCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Exit fly starts 45 frames before LINDA_OUT so the card arrives at the corner
  const EXIT_START = S.LINDA_OUT - 45; // frame 1275

  // Keep rendering a bit past LINDA_OUT so the animation fully completes
  if (frame < S.LINDA_IN || frame > S.LINDA_OUT + 20) return null;

  // Entry spring
  const sp  = spring({ frame: frame - S.LINDA_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [30, 0]);

  const photoSp  = spring({ frame: frame - S.LINDA_IN,      fps, config: springConfig.entry });
  const textSp   = spring({ frame: frame - S.LINDA_IN - 12, fps, config: springConfig.entry });
  const quoteSp  = spring({ frame: frame - S.LINDA_IN - 24, fps, config: springConfig.entry });

  const isExiting = frame >= EXIT_START;

  // Exit: linear progress 0→1 over 45 frames, smoothstepped for easing
  const rawExit = interpolate(frame, [EXIT_START, S.LINDA_OUT], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // smoothstep easing: slow start, fast middle, slow end
  const exitT = rawExit * rawExit * (3 - 2 * rawExit);

  // Translate full-card center (640, 360) → compact strip center (1086, 602)
  const exitTx    = exitT * 446;
  const exitTy    = exitT * 242;
  const exitScale = 1 - exitT * (1 - 0.315);

  // Opacity: fade in on entry, fade out only in the last half of the exit
  const entryOp = Math.min(1, interpolate(frame,
    [S.LINDA_IN, S.LINDA_IN + 20], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  ));
  const exitOp = isExiting
    ? interpolate(rawExit, [0.55, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const op = entryOp * exitOp;

  const transform = isExiting
    ? `translate(${exitTx}px, ${exitTy}px) scale(${exitScale})`
    : `translateY(${off}px)`;

  return (
    <div style={{
      position: "absolute",
      top: 80, left: L.MARGIN, right: L.MARGIN,
      bottom: L.PROGRESS_H + 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: op, zIndex: 30,
    }}>
      <div style={{ transform, width: "100%", maxWidth: 1080, transformOrigin: "center center" }}>
        <GlassCard style={{
          padding: "40px 52px",
          borderLeft: `5px solid ${GD_VIOLET}`,
          borderTop: `1px solid ${GD_VIOLET}40`,
        }}>
          <div style={{ display: "flex", gap: 52, alignItems: "center" }}>
            {/* Left: photo + UG logo */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
              flexShrink: 0,
              opacity: photoSp,
              transform: `translateX(${interpolate(photoSp, [0, 1], [-20, 0])}px)`,
            }}>
              <Img
                src={staticFile(HOST.face)}
                style={{
                  width: 140, height: 140, borderRadius: "50%", objectFit: "cover",
                  boxShadow: `0 0 0 4px ${GD_VIOLET}66, 0 0 40px ${GD_VIOLET}44`,
                }}
              />
              <div style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 14, overflow: "hidden",
                width: 180,
              }}>
                {UG_VIE_LOGO && <Img src={UG_VIE_LOGO} style={{ width: "100%", aspectRatio: "600/337", objectFit: "cover", display: "block", borderRadius: "14px 14px 0 0" }} />}
                <div style={{
                  padding: "6px 8px 8px", textAlign: "center",
                  fontSize: TYPOGRAPHY.label, fontWeight: 600, color: GD_ACCENT,
                  letterSpacing: 0.5, fontFamily: FF,
                }}>{COMMUNITY_PROGRAM_LABELS["ug-leader"]}</div>
              </div>
            </div>

            {/* Right: name + info + quote */}
            <div style={{ flex: 1 }}>
              <div style={{
                opacity: textSp,
                transform: `translateY(${interpolate(textSp, [0, 1], [16, 0])}px)`,
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.overline + 1, fontWeight: 700, color: GD_ACCENT,
                  letterSpacing: 5, textTransform: "uppercase" as const, fontFamily: FF,
                  marginBottom: 10, display: "flex", alignItems: "center", gap: 7,
                }}>
                  <MicIcon s={12} c={GD_ACCENT} />
                  Your Stream Host
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white", fontFamily: FF,
                  lineHeight: 1.1, marginBottom: 12,
                }}>
                  {HOST.fullName ?? HOST.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                  {HOST.title && <div style={{
                    fontSize: TYPOGRAPHY.h6, fontWeight: 700,
                    background: `linear-gradient(90deg, ${GD_VIOLET}, ${GD_PINK})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    fontFamily: FF,
                  }}>
                    {HOST.title}
                  </div>}
                  {HOST.subtitle && <div style={{
                    fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.6)",
                    fontFamily: FF,
                  }}>
                    {HOST.subtitle}
                  </div>}
                  <div style={{
                    fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.45)",
                    fontFamily: FF, display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <PinIcon s={11} c={GD_ACCENT} /> {HOST.location?.split(", ")[0]}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                opacity: quoteSp,
                transform: `translateY(${interpolate(quoteSp, [0, 1], [12, 0])}px)`,
              }}>
                <div style={{
                  borderLeft: `3px solid ${GD_ACCENT}55`,
                  paddingLeft: 20,
                }}>
                  <div style={{
                    fontSize: TYPOGRAPHY.h6, fontWeight: 600, color: "rgba(255,255,255,0.88)",
                    fontFamily: FF, lineHeight: 1.6, fontStyle: "italic",
                  }}>
                    {`"Welcome to the first ${EVENT_NAME}! Make sure your audio is on for the next 30 minutes."`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LINDA HOST CARD  -  single shared component, always same position & style
// Shown whenever Linda is actively on stream. One source of truth.
//   1320 - 1800  : after her intro (compact strip after flying card)
//   9300 - 10799 : Mihaly transition ("Coming Up Next")
//  13380 - 15179 : after Mihaly video (guest intro)
//  23400 - 25199 : Linda intro of Gamemasters
// ─────────────────────────────────────────────────────────────────────────────
const LINDA_ON_STREAM: Array<{ in: number; out: number }> = [
  { in: S.COMPACT_IN,    out: S.COMPACT_OUT        },  // 1320 - 1800
  { in: S.MIHALY_IN,     out: S.VIDEO_IN - 1       },  // 9300 - 10799
  { in: S.LINDA_BACK_IN, out: S.LINDA_BACK_OUT     },  // 13380 - 15179
  { in: S.GAMEMASTER_IN, out: GAMEMASTER_SPEAKING - 1 }, // 23400 - 25199
];

const HostCard: React.FC<{ frame: number }> = ({ frame }) => {
  const win = LINDA_ON_STREAM.find(w => frame >= w.in && frame <= w.out);
  if (!win) return null;

  const op = fadeWindow(frame, win.in, win.out, 12);

  return (
    <div style={{
      position: "absolute",
      bottom: L.PROGRESS_H + 10, right: L.MARGIN,
      width: L.SIDEBAR_W,
      opacity: op,
      zIndex: 30,
    }}>
      <GlassCard style={{
        padding: "14px 20px",
        borderLeft: `4px solid ${GD_VIOLET}`,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        {/* Photo with pulsing rings to signal Linda is live/talking */}
        <div style={{ position: "relative", flexShrink: 0, width: 52, height: 52 }}>
          {/* Outer pulsing ring */}
          {[0, 1].map(ring => {
            const ph   = frame * 0.07 + ring * 1.57;
            const pulse = 0.5 + Math.sin(ph) * 0.5;
            const size  = 52 + 8 + ring * 10 + pulse * 5;
            return (
              <div key={ring} style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: size, height: size,
                borderRadius: "50%",
                border: `1.5px solid ${GD_VIOLET}`,
                opacity: (0.45 - ring * 0.15) * pulse,
                pointerEvents: "none",
              }} />
            );
          })}
          <Img
            src={staticFile(HOST.face)}
            style={{
              position: "relative",
              width: 52, height: 52, borderRadius: "50%", objectFit: "cover",
              boxShadow: `0 0 14px ${GD_VIOLET}aa`,
            }}
          />
        </div>
        <div>
          <div style={{
            fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: GD_ACCENT,
            letterSpacing: 3, textTransform: "uppercase" as const, fontFamily: FF,
            marginBottom: 2, display: "flex", alignItems: "center", gap: 5,
          }}>
            <MicIcon s={10} c={GD_ACCENT} /> Stream Host
          </div>
          <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "white", fontFamily: FF }}>
            {HOST.fullName ?? HOST.name}
          </div>
          <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)", fontFamily: FF }}>
            {getOrganizerRole(HOST)}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SPEECH BUBBLE (1320 - 1500, above compact strip)
// ─────────────────────────────────────────────────────────────────────────────
const SpeechBubble: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.BUBBLE_IN || frame >= S.BUBBLE_OUT) return null;

  const op  = fadeWindow(frame, S.BUBBLE_IN, S.BUBBLE_OUT, 20);
  const sp  = spring({ frame: frame - S.BUBBLE_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [14, 0]);

  return (
    <div style={{
      position: "absolute",
      bottom: L.PROGRESS_H + 110,   // sits above Linda compact strip
      left: L.MARGIN,
      width: 680,
      opacity: op * sp,
      transform: `translateY(${off}px)`,
      zIndex: 32,
    }}>
      <GlassCard style={{
        padding: "22px 30px",
        border: `1px solid ${GD_VIOLET}50`,
        borderRadius: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <ChatIcon s={13} c={GD_ACCENT} />
          <div style={{
            fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ACCENT,
            letterSpacing: 3, textTransform: "uppercase" as const, fontFamily: FF,
          }}>
            {HOST.fullName ?? HOST.name}  - Stream Host
          </div>
        </div>
        <div style={{
          fontSize: TYPOGRAPHY.body, fontWeight: 500, color: "white",
          fontFamily: FF, lineHeight: 1.65,
        }}>
          {`"Today we will have `}<strong style={{ color: GD_ACCENT }}>{USER_GROUPS.length} AWS User Groups</strong>{` across ${EVENT_REGION} competing
          against each other across `}<strong style={{ color: GD_VIOLET }}>{COUNTRIES.length} countries</strong>{`
          and ${TIMEZONE_COUNT} timezones - the ${EDITION_LABEL} of ${EVENT_NAME}."`}
        </div>
      </GlassCard>
      {/* Tail */}
      <div style={{
        marginLeft: 52, width: 0, height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderTop: "12px solid rgba(255,255,255,0.05)",
      }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INFO CARD (single card, big text, one at a time  - 1500 - 1800)
// ─────────────────────────────────────────────────────────────────────────────
interface InfoCardDef {
  inFrame: number; outFrame: number;
  color: string; label: string;
  text: string; highlight: string;
  icon: React.ReactNode;
}

const LINDA_INFO: InfoCardDef[] = [
  {
    inFrame: S.CARD_A_IN, outFrame: S.CARD_A_OUT,
    color: GD_ORANGE, label: "AUDIO CHECK",
    icon: <VolumeIcon s={18} c={GD_ORANGE} />,
    text: "Connect your audio NOW  - the GameDay instructions coming up are critical. Don't miss them!",
    highlight: "Connect your audio NOW",
  },
  {
    inFrame: S.CARD_B_IN, outFrame: S.CARD_B_OUT,
    color: GD_PINK, label: "IMPORTANT",
    icon: <InfoIcon s={18} c={GD_PINK} />,
    text: "This stream will be MUTED once the game starts. Come back when the second countdown ends to celebrate with us!",
    highlight: "MUTED",
  },
  {
    inFrame: S.CARD_C_IN, outFrame: S.CARD_C_OUT,
    color: GD_GOLD, label: "THANK YOU",
    icon: <HeartIcon s={18} c={GD_GOLD} />,
    text: `Thank you to every one of the ${USER_GROUPS.length}+ UG Leaders across ${COUNTRIES.length}+ countries who made this happen as volunteers!`,
    highlight: `${USER_GROUPS.length}+ UG Leaders`,
  },
];

const InfoCard: React.FC<{ frame: number; fps: number; def: InfoCardDef }> = ({ frame, fps, def }) => {
  if (frame < def.inFrame || frame > def.outFrame) return null;

  const op  = fadeWindow(frame, def.inFrame, def.outFrame, 18);
  const sp  = spring({ frame: frame - def.inFrame, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [18, 0]);

  const parts = def.text.split(def.highlight);

  return (
    <div style={{
      position: "absolute",
      bottom: L.PROGRESS_H + 110,
      left: L.MARGIN,
      width: 680,
      opacity: op * sp,
      transform: `translateY(${off}px)`,
      zIndex: 32,
    }}>
      <GlassCard style={{
        padding: "24px 32px",
        borderLeft: `5px solid ${def.color}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {def.icon}
          <div style={{
            fontSize: TYPOGRAPHY.caption + 1, fontWeight: 700, color: def.color,
            letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
          }}>
            {def.label}
          </div>
        </div>
        <div style={{
          fontSize: TYPOGRAPHY.h6, fontWeight: 500, color: "white",
          fontFamily: FF, lineHeight: 1.6,
        }}>
          {parts[0]}
          <span style={{ color: def.color, fontWeight: 800 }}>{def.highlight}</span>
          {parts[1]}
        </div>
      </GlassCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 6  - JEROME & ANDA (1800 - 9300, organizer intro only  - no text cards)
// ─────────────────────────────────────────────────────────────────────────────
const CoOrganizersCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.ORG_IN || frame > S.ORG_OUT) return null;

  const op  = fadeWindow(frame, S.ORG_IN, S.ORG_OUT, 30);
  const sp  = spring({ frame: frame - S.ORG_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [24, 0]);

  const CARD_COLORS = [GD_VIOLET, GD_PINK, GD_ACCENT, GD_ORANGE];
  const people = CO_ORGANIZERS.map((p, i) => ({
    name: p.name,
    face: p.face,
    title: "AWS User Group Leader",
    ug: getOrganizerUserGroup(p) ?? "",
    ugLogo: ugLogo(getOrganizerUserGroup(p)),
    location: p.location ?? "",
    color: CARD_COLORS[i] ?? GD_ACCENT,
  }));

  return (
    <div style={{
      position: "absolute",
      top: 30, left: L.MARGIN,
      right: L.SIDEBAR_W + L.MARGIN + 12,
      bottom: L.PROGRESS_H + 12,
      display: "flex", alignItems: "center",
      opacity: op, zIndex: 28,
      transform: `translateY(${off}px)`,
    }}>
      <div style={{ width: "100%" }}>
        <GlassCard style={{
          padding: "32px 40px",
          borderLeft: `5px solid ${GD_VIOLET}`,
        }}>
          {/* Header */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
            }}>
              <ChatIcon s={14} c={GD_ACCENT} />
              <div style={{
                fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ACCENT,
                letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
              }}>
                Currently Speaking
              </div>
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.h6, fontWeight: 600,
              color: "rgba(255,255,255,0.65)", fontFamily: FF,
            }}>
              About {EVENT_NAME}
            </div>
          </div>

          {/* Two person cards */}
          <div style={{ display: "flex", gap: 28 }}>
            {people.map((p, i) => {
              const pSp = spring({ frame: frame - S.ORG_IN - i * 15, fps, config: springConfig.entry });
              return (
                <div key={p.name} style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.color}22`,
                  borderTop: `3px solid ${p.color}`,
                  borderRadius: 16,
                  padding: "22px 24px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                  opacity: pSp,
                  transform: `translateY(${interpolate(pSp, [0, 1], [20, 0])}px)`,
                }}>
                  {/* Face */}
                  <Img
                    src={staticFile(p.face)}
                    style={{
                      width: 110, height: 110,
                      borderRadius: "50%", objectFit: "cover",
                      boxShadow: `0 0 16px ${p.color}66, 0 0 0 3px ${p.color}44`,
                    }}
                  />
                  {/* Name */}
                  <div style={{
                    fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "white",
                    fontFamily: FF, textAlign: "center",
                  }}>
                    {p.name}
                  </div>
                  {/* Title */}
                  <div style={{
                    fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700,
                    color: p.color, fontFamily: FF, textAlign: "center",
                  }}>
                    {p.title}
                  </div>
                  {/* UG Logo  -  fixed aspect container so both match */}
                  <div style={{
                    width: 200, height: 112, overflow: "hidden", borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {p.ugLogo && <Img src={p.ugLogo} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />}
                  </div>
                  {/* UG name + city */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.65)",
                      fontFamily: FF, marginBottom: 5,
                    }}>
                      {p.ug}
                    </div>
                    <div style={{
                      fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.45)",
                      fontFamily: FF, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                    }}>
                      <PinIcon s={10} c={p.color} />{p.location.split(", ")[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 10  - ARNAUD & LOÏC GAMEMASTERS (23400 - 44999)
// ─────────────────────────────────────────────────────────────────────────────
const GamemastersCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.GAMEMASTER_IN || frame > S.GAMEMASTER_OUT) return null;

  const op  = fadeWindow(frame, S.GAMEMASTER_IN, S.GAMEMASTER_OUT, 30);
  const sp  = spring({ frame: frame - S.GAMEMASTER_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [24, 0]);

  // "Next Up" → "Currently Speaking" transition
  const isNextUp   = frame < GAMEMASTER_SPEAKING;
  const isSpeaking = frame >= GAMEMASTER_SPEAKING;
  const transitionSp = spring({
    frame: Math.max(0, frame - GAMEMASTER_SPEAKING),
    fps,
    config: springConfig.entry,
  });

  // Pulsing live dot (only when speaking)
  const pulse    = 0.55 + Math.sin(frame * 0.13) * 0.45;
  const glowSize = 6 + Math.sin(frame * 0.09) * 4;

  const people = GAMEMASTERS.map((p) => ({
    name: p.name,
    face: p.face,
    title: getOrganizerRole(p),
    company: "Amazon Web Services",
  }));

  return (
    <div style={{
      position: "absolute",
      top: 30, left: L.MARGIN,
      right: L.SIDEBAR_W + L.MARGIN + 12,
      bottom: L.PROGRESS_H + 12,
      display: "flex", alignItems: "center",
      opacity: op, zIndex: 28,
      transform: `translateY(${off}px)`,
    }}>
      <div style={{ width: "100%" }}>
        <GlassCard style={{
          padding: "32px 40px",
          borderLeft: `5px solid ${GD_ORANGE}`,
          borderTop: `1px solid ${GD_ORANGE}33`,
        }}>

          {/* ── Header ── */}
          <div style={{
            marginBottom: 22,
            display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          }}>
            <div>
              {/* Status label with live dot */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                {isSpeaking ? (
                  /* glowing live dot */
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: GD_ORANGE,
                    opacity: pulse,
                    boxShadow: `0 0 ${glowSize}px ${GD_ORANGE}, 0 0 ${glowSize * 2}px ${GD_ORANGE}66`,
                  }} />
                ) : (
                  /* muted dot for "Next Up" */
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: `${GD_ORANGE}55`,
                    border: `1px solid ${GD_ORANGE}88`,
                  }} />
                )}
                <div style={{
                  fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ORANGE,
                  letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
                }}>
                  {isNextUp ? "Next Up" : "Currently Speaking"}
                </div>
              </div>
              {/* Subtitle */}
              <div style={{
                fontSize: TYPOGRAPHY.h6, fontWeight: 600,
                color: "rgba(255,255,255,0.65)", fontFamily: FF,
              }}>
                GameDay Rules, Challenges & Instructions
              </div>
            </div>

            {/* AWS badge top-right */}
            <div style={{
              background: `${GD_ORANGE}14`,
              border: `1px solid ${GD_ORANGE}44`,
              borderRadius: 100, padding: "6px 16px", flexShrink: 0, marginTop: 2,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ORANGE,
                letterSpacing: 2, textTransform: "uppercase" as const, fontFamily: FF,
              }}>
                AWS
              </div>
            </div>
          </div>

          {/* ── Two person cards ── */}
          <div style={{
            display: "flex", gap: 28,
            // Slide up slightly when transitioning to "currently speaking"
            transform: `translateY(${interpolate(transitionSp, [0, 1], [0, -4])}px)`,
          }}>
            {people.map((p, i) => {
              const pSp = spring({
                frame: frame - S.GAMEMASTER_IN - i * 15,
                fps, config: springConfig.entry,
              });
              // Extra glow pulse when speaking
              const photoGlow = isSpeaking ? 12 + glowSize : 12;
              return (
                <div key={p.name} style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${GD_ORANGE}22`,
                  borderTop: `3px solid ${GD_ORANGE}`,
                  borderRadius: 16, padding: "20px 20px 22px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  opacity: pSp,
                  transform: `translateY(${interpolate(pSp, [0, 1], [20, 0])}px)`,
                }}>
                  {/* Photo */}
                  <Img
                    src={staticFile(p.face)}
                    style={{
                      width: 100, height: 100,
                      borderRadius: "50%", objectFit: "cover",
                      boxShadow: `0 0 ${photoGlow}px ${GD_ORANGE}66, 0 0 0 3px ${GD_ORANGE}44`,
                    }}
                  />
                  {/* Name */}
                  <div style={{
                    fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "white",
                    fontFamily: FF, textAlign: "center",
                  }}>
                    {p.name}
                  </div>
                  {/* Job title */}
                  <div style={{
                    fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600,
                    color: GD_ORANGE, fontFamily: FF,
                    textAlign: "center", lineHeight: 1.3,
                  }}>
                    {p.title}
                  </div>
                  {/* AWS GameMaster badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: `${GD_ORANGE}18`,
                    border: `1px solid ${GD_ORANGE}55`,
                    borderRadius: 100, padding: "4px 14px",
                  }}>
                    <CrownIcon s={10} c={GD_ORANGE} />
                    <div style={{
                      fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: GD_ORANGE,
                      letterSpacing: 2, textTransform: "uppercase" as const, fontFamily: FF,
                    }}>
                      AWS GameMaster
                    </div>
                  </div>
                  {/* Company */}
                  <div style={{
                    fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)",
                    fontFamily: FF, textAlign: "center",
                  }}>
                    {p.company}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Info section (slides in when they start speaking) ── */}
          {isSpeaking && (
            <div style={{
              marginTop: 20,
              opacity: transitionSp,
              transform: `translateY(${interpolate(transitionSp, [0, 1], [16, 0])}px)`,
              borderTop: `1px solid ${GD_ORANGE}22`,
              paddingTop: 18,
            }}>
              {/* TODO: GameDay info items will go here */}
            </div>
          )}

        </GlassCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 11  - CODE DISTRIBUTION (45000  -  53999)
// Exactly 5 minutes before game start. Local UG leaders and volunteers
// are now distributing access codes. Agreed timing: codes shared from 18:25 CET
// so all teams are ready at game start (18:30 CET).
// This scene plays through the full 5-minute distribution window.
// ─────────────────────────────────────────────────────────────────────────────
const DIST_IN  = 45000;
const DIST_OUT = 53999;

const CodeDistributionScene: React.FC<{
  frame: number; fps: number; gameCountdownSeconds: number;
}> = ({ frame, fps, gameCountdownSeconds }) => {
  if (frame < DIST_IN || frame > DIST_OUT) return null;

  const rel = frame - DIST_IN;
  const op  = fadeWindow(frame, DIST_IN, DIST_OUT, 30);

  // Entry springs  -  staggered
  const titleSp   = spring({ frame: rel,                    fps, config: springConfig.entry });
  const cardSp    = spring({ frame: Math.max(0, rel - 12),  fps, config: springConfig.entry });
  const detailSp  = spring({ frame: Math.max(0, rel - 24),  fps, config: springConfig.entry });
  const logosSp   = spring({ frame: Math.max(0, rel - 36),  fps, config: springConfig.entry });
  const footerSp  = spring({ frame: Math.max(0, rel - 46),  fps, config: springConfig.entry });

  // Formatted countdown mm:ss
  const secs = Math.max(0, gameCountdownSeconds);
  const mm   = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss   = String(Math.floor(secs % 60)).padStart(2, "0");

  // Urgency: violet → orange → gold as the clock runs down
  const urgencyT = interpolate(secs, [0, 60, 120, 300], [1, 0.75, 0.35, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const accentC = secs < 60 ? GD_GOLD : GD_ORANGE; // orange throughout, shifts to gold under 1 min

  // Badge pulse
  const badgePulse = Math.sin(frame * 0.12) * 0.15 + 0.85;

  // Concentric rings (3 phases)
  const rings = [0, 1, 2].map(i => Math.sin(frame * 0.055 + i * 2.09) * 0.5 + 0.5);

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: L.PROGRESS_H,
      display: "flex", flexDirection: "column" as const,
      alignItems: "center", justifyContent: "center",
      gap: 18,
      opacity: op,
      zIndex: 34,
      padding: "0 40px",
      boxSizing: "border-box" as const,
    }}>

      {/* ── Status badge ── */}
      <div style={{
        opacity: titleSp * badgePulse,
        transform: `translateY(${interpolate(titleSp, [0, 1], [-18, 0])}px)`,
        display: "inline-flex", alignItems: "center", gap: 10,
        background: `${accentC}14`,
        border: `1px solid ${accentC}44`,
        borderRadius: 100, padding: "8px 26px",
      }}>
        <ZapIcon s={12} c={accentC} />
        <div style={{
          fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: accentC,
          letterSpacing: 5, textTransform: "uppercase" as const, fontFamily: FF,
        }}>
          Code Distribution In Progress
        </div>
        <ZapIcon s={12} c={accentC} />
      </div>

      {/* ── Headline ── */}
      <div style={{
        textAlign: "center",
        opacity: titleSp,
        transform: `translateY(${interpolate(titleSp, [0, 1], [14, 0])}px)`,
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white",
          fontFamily: FF, lineHeight: 1.1, marginBottom: 8,
        }}>
          Local UG Leaders &amp; Volunteers
        </div>
        <div style={{
          fontSize: TYPOGRAPHY.h6, fontWeight: 500, color: "rgba(255,255,255,0.6)",
          fontFamily: FF,
        }}>
          are now distributing GameDay access codes to all teams
        </div>
      </div>

      {/* ── Big countdown card with pulsing rings ── */}
      <div style={{
        position: "relative",
        opacity: cardSp,
        transform: `scale(${interpolate(cardSp, [0, 1], [0.92, 1])})`,
      }}>
        {/* Rings */}
        {rings.map((pulse, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width:  230 + i * 34 + pulse * 18,
            height: 230 + i * 34 + pulse * 18,
            borderRadius: "50%",
            border: `1.5px solid ${accentC}`,
            opacity: (0.28 - i * 0.08) * pulse,
            pointerEvents: "none",
          }} />
        ))}
        <GlassCard style={{
          padding: "22px 64px",
          borderTop: `3px solid ${accentC}`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: TYPOGRAPHY.overline, fontWeight: 700,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
            marginBottom: 4,
          }}>
            Game Starts In
          </div>
          <div style={{
            fontSize: 88,
            fontWeight: 900,
            color: accentC,
            fontFamily: FF,
            lineHeight: 1,
            letterSpacing: -2,
            textShadow: `0 0 40px ${accentC}66`,
            fontVariantNumeric: "tabular-nums" as const,
          }}>
            {mm}:{ss}
          </div>
        </GlassCard>
      </div>

      {/* ── Instructions row ── */}
      <div style={{
        textAlign: "center",
        opacity: detailSp,
        transform: `translateY(${interpolate(detailSp, [0, 1], [10, 0])}px)`,
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.body, fontWeight: 500,
          color: "rgba(255,255,255,0.55)", fontFamily: FF, lineHeight: 1.6,
        }}>
          Find your local organizer · Receive your team code · Form your team &amp; get ready!
        </div>
        <div style={{
          fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.28)",
          fontFamily: FF, marginTop: 6,
        }}>
          {`All codes distributed by ${CODES_TIME} · Game starts at ${GAME_START_LABEL} sharp`}
        </div>
      </div>

      {/* ── UG logos row ── */}
      <div style={{
        display: "flex", gap: 10, alignItems: "center",
        opacity: logosSp,
        transform: `translateY(${interpolate(logosSp, [0, 1], [8, 0])}px)`,
      }}>
        {[UG_VIE_LOGO, ...UG_CO_ORG_LOGOS, UG_BUD_LOGO].filter(Boolean).map((logo, i) => (
          <div key={i} style={{
            width: 56, height: 56, borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid rgba(255,255,255,0.07)`,
            padding: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Img src={logo as string} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
        ))}
        <div style={{
          fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.28)",
          fontFamily: FF, marginLeft: 6,
        }}>
          {`+ ${Math.max(0, USER_GROUPS.length - [UG_VIE_LOGO, ...UG_CO_ORG_LOGOS, UG_BUD_LOGO].filter(Boolean).length)} more user groups`}
        </div>
      </div>

      {/* ── Footer: GameDay logo ── */}
      <div style={{
        opacity: footerSp,
        transform: `translateY(${interpolate(footerSp, [0, 1], [6, 0])}px)`,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Img
          src={staticFile("assets/gameday-unicorn.png")}
          style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.4 }}
        />
        <div style={{
          fontSize: TYPOGRAPHY.label, fontWeight: 700,
          color: "rgba(255,255,255,0.25)", fontFamily: FF, letterSpacing: 3,
          textTransform: "uppercase" as const,
        }}>
          {EVENT_NAME} {EVENT_EDITION}
        </div>
        <Img
          src={staticFile("assets/gameday-unicorn.png")}
          style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.4 }}
        />
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE SIDEBAR (from frame 1320, right side)
// ─────────────────────────────────────────────────────────────────────────────
const ScheduleSidebar: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.SIDEBAR_IN) return null;

  const entry = spring({ frame: frame - S.SIDEBAR_IN, fps, config: springConfig.entry });

  return (
    <div style={{
      position: "absolute",
      top: 0, right: 0, bottom: 0,
      width: L.SIDEBAR_W,
      background: `linear-gradient(270deg, ${GD_DARK}f2 0%, ${GD_DARK}cc 80%, transparent 100%)`,
      transform: `translateX(${interpolate(entry, [0, 1], [100, 0])}%)`,
      padding: `148px 24px ${L.PROGRESS_H + 20}px 28px`,
      display: "flex", flexDirection: "column",
      zIndex: 22,
    }}>
      <div style={{
        fontSize: TYPOGRAPHY.overline + 1, fontWeight: 700, color: GD_ACCENT,
        letterSpacing: 3, textTransform: "uppercase" as const,
        marginBottom: 20, fontFamily: FF,
        display: "flex", alignItems: "center", gap: 7,
      }}>
        <GameIcon s={12} c={GD_ACCENT} /> Schedule
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {SEGMENTS.map((seg, i) => {
          const state = getCardState(frame, seg);
          const eSp = spring({
            frame: frame - staggeredEntry(S.SIDEBAR_IN, i, 20),
            fps, config: springConfig.entry,
          });
          const borderC = state === "active" ? GD_VIOLET : state === "completed" ? "#334155" : "#1e293b";
          const textC   = state === "active" ? "white"   : state === "completed" ? "#64748b" : "#94a3b8";
          return (
            <div key={seg.label} style={{
              opacity: eSp,
              transform: `translateX(${(1 - eSp) * 30}px)`,
              marginBottom: 10,
            }}>
              <div style={{
                background: `rgba(255,255,255,${state === "active" ? 0.09 : 0.03})`,
                borderLeft: `4px solid ${borderC}`,
                borderRadius: 10, padding: "11px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.caption + 1, fontWeight: 700,
                  color: textC, fontFamily: FF,
                }}>
                  {seg.label}
                </div>
                {state === "active"    && <div style={{ fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: GD_VIOLET, letterSpacing: 2, textTransform: "uppercase" as const }}>LIVE</div>}
                {state === "completed" && <CheckIcon s={11} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKER INDICATOR (from 1800, bottom-right)
// ─────────────────────────────────────────────────────────────────────────────
const SpeakerIndicator: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.SPEAKER_IN) return null;

  const chapter = CHAPTERS.find((c) => frame >= c.startFrame && frame <= c.endFrame);
  const speaker = chapter?.speakers;
  if (!speaker) return null;
  // HostCard already handles Linda with face + pulsing rings  -  skip duplicate
  if (speaker === (HOST.fullName ?? HOST.name)) return null;

  const entry = spring({ frame: frame - S.SPEAKER_IN, fps, config: springConfig.entry });
  const pulse = interpolate(frame % 50, [0, 12, 25, 37, 50], [0.4, 1, 0.4, 0.9, 0.4], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      bottom: L.PROGRESS_H + 10, right: L.MARGIN,
      opacity: entry,
      transform: `translateY(${interpolate(entry, [0, 1], [8, 0])}px)`,
      zIndex: 40,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
        border: `1px solid ${GD_VIOLET}44`, borderRadius: 12,
        padding: "8px 18px",
      }}>
        <div style={{
          width: 9, height: 9, borderRadius: "50%",
          background: GD_ORANGE,
          opacity: 0.5 + pulse * 0.5,
          boxShadow: `0 0 ${5 + pulse * 5}px ${GD_ORANGE}`,
        }} />
        <MicIcon s={12} c={GD_ACCENT} />
        <div style={{
          fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "white", fontFamily: FF,
        }}>
          {speaker}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 6b  - MIHALY "COMING UP" INTRO CARD (9300 - 10850)
// Linda speaks while this card shows Mihaly as next up.
// On exit, Mihaly's face tracks precisely to the support video lower-third position
// and fades out exactly at VIDEO_IN  -  creating a seamless face-to-lower-third handoff.
// ─────────────────────────────────────────────────────────────────────────────
const SupportPresenterIntroCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (!PRESENTER) return null;
  if (frame < S.MIHALY_IN || frame > S.MIHALY_OUT) return null;

  // Entry spring
  const sp  = spring({ frame: frame - S.MIHALY_IN, fps, config: springConfig.entry });
  const off = interpolate(sp, [0, 1], [28, 0]);

  const photoSp = spring({ frame: frame - S.MIHALY_IN,      fps, config: springConfig.entry });
  const textSp  = spring({ frame: frame - S.MIHALY_IN - 12, fps, config: springConfig.entry });
  const logoSp  = spring({ frame: frame - S.MIHALY_IN - 22, fps, config: springConfig.entry });

  // Exit: when magic-move overlay takes over, the card (border + background)
  // fades out quickly. The SupportPresenterMagicMoveOverlay then carries the face/name/UG.
  const entryOp = Math.min(1, interpolate(frame,
    [S.MIHALY_IN, S.MIHALY_IN + 20], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  ));
  const exitOp = interpolate(frame,
    [MAGIC_MOVE_START, MAGIC_MOVE_START + 15], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const op = entryOp * exitOp;

  const cardTransform = `translateY(${off}px)`;

  return (
    <div style={{
      position: "absolute",
      top: 30, left: L.MARGIN,
      right: L.SIDEBAR_W + L.MARGIN + 12,
      bottom: L.PROGRESS_H + 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: op, zIndex: 28,
    }}>
      <div style={{
        transform: cardTransform,
        transformOrigin: "center center",
        width: "100%", maxWidth: 620,
      }}>
        <GlassCard style={{
          padding: "36px 44px",
          borderLeft: `5px solid ${GD_VIOLET}`,
          borderTop: `1px solid ${GD_VIOLET}33`,
        }}>

          {/* Coming Up label */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
            opacity: textSp,
            transform: `translateY(${interpolate(textSp, [0, 1], [10, 0])}px)`,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: `${GD_VIOLET}88`,
              border: `1px solid ${GD_VIOLET}cc`,
            }} />
            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_VIOLET,
              letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
            }}>
              Coming Up Next
            </div>
          </div>

          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>

            {/* Photo */}
            <div style={{
              flexShrink: 0,
              opacity: photoSp,
              transform: `translateX(${interpolate(photoSp, [0, 1], [-20, 0])}px)`,
            }}>
              <Img
                src={staticFile(PRESENTER!.face)}
                style={{
                  width: 130, height: 130, borderRadius: "50%", objectFit: "cover",
                  boxShadow: `0 0 0 4px ${GD_VIOLET}55, 0 0 32px ${GD_VIOLET}33`,
                }}
              />
            </div>

            {/* Name + role + UG logo */}
            <div style={{ flex: 1 }}>
              <div style={{
                opacity: textSp,
                transform: `translateY(${interpolate(textSp, [0, 1], [12, 0])}px)`,
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.h5, fontWeight: 900, color: "white",
                  fontFamily: FF, lineHeight: 1.1, marginBottom: 8,
                }}>
                  {PRESENTER.fullName ?? PRESENTER.name}
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.h6, fontWeight: 600,
                  background: `linear-gradient(90deg, ${GD_VIOLET}, ${GD_PINK})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontFamily: FF, marginBottom: 6,
                }}>
                  {getOrganizerRole(PRESENTER)}
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.45)",
                  fontFamily: FF, display: "flex", alignItems: "center", gap: 5,
                }}>
                  <PinIcon s={11} c={GD_ACCENT} /> {PRESENTER.location?.split(", ")[0]}
                </div>
              </div>

              {/* UG Budapest logo */}
              <div style={{
                marginTop: 18,
                opacity: logoSp,
                transform: `translateY(${interpolate(logoSp, [0, 1], [10, 0])}px)`,
              }}>
                {UG_BUD_LOGO && <Img src={UG_BUD_LOGO} style={{ width: 180, borderRadius: 12, objectFit: "contain", display: "block" }} />}
              </div>
            </div>

          </div>

          {/* "Support Process" topic tag */}
          <div style={{
            marginTop: 24,
            opacity: logoSp,
            transform: `translateY(${interpolate(logoSp, [0, 1], [8, 0])}px)`,
            display: "flex", alignItems: "center", gap: 10,
            borderTop: `1px solid ${GD_VIOLET}22`, paddingTop: 18,
          }}>
            <InfoIcon s={14} c={GD_ACCENT} />
            <div style={{
              fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.55)", fontFamily: FF,
            }}>
              Will explain the <span style={{ color: "white", fontWeight: 700 }}>Support Process</span> - how to get help during GameDay
            </div>
          </div>

        </GlassCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAGIC MOVE OVERLAY  - floats Mihaly's face, name and UG name from the intro
// card position to the support-video lower-third position.
// Only visible during MAGIC_MOVE_START → MAGIC_MOVE_END.
// zIndex 62: above SupportVideoBody (z=55) so the elements visually fly on top
// of the video background as they drift toward their destination.
//
// Source layout (SupportPresenterIntroCard steady-state, card maxWidth=620 centred in
// left area left=40..888, card padding=36/44):
//   card_left = 40 + (848-620)/2 = 154 px
//   flex-row top  ≈ 258 px (card_top 183 + padding 36 + label+gap 39)
//   face top-left ≈ (198, 258), size 130
//   name left=364 top=284  (h5=28)
//   UG   left=364 top=320  (h6 gradient ~20px)
//
// Target layout (lower-third inside video, video center=(640,316) at -44px):
//   video left=190, bottom=569
//   lower-third h=86, content-row center y≈524
//   face top-left ≈ (238, 502), size 44
//   name left=298  top=510  (h6=24)
//   UG   left=298  top=537  (caption=16)
// ─────────────────────────────────────────────────────────────────────────────
const SupportPresenterMagicMoveOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  if (!PRESENTER) return null;
  if (frame < MAGIC_MOVE_START || frame > MAGIC_MOVE_END) return null;

  const rawT = interpolate(frame, [MAGIC_MOVE_START, MAGIC_MOVE_END], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Cubic ease-in-out: slow escape, smooth cruise, gentle landing
  const t = rawT < 0.5
    ? 4 * rawT * rawT * rawT
    : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

  // Fade: pop in immediately, stay fully visible, dissolve as lower-third fades in
  const op = interpolate(rawT, [0, 0.05, 0.85, 1.0], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const lerp = (a: number, b: number) => a + (b - a) * t;

  // ── source (card) ──────────────────────────────────────────────────────────
  const SF_X = 198, SF_Y = 258, SF_SZ = 130;   // face top-left, size
  const SN_L = 364, SN_T  = 284;               // name left, top
  const SU_L = 364, SU_T  = 320;               // ug left, top

  // ── target (lower-third, video at translateY(-44px)) ──────────────────────
  const TF_X = 238, TF_Y = 502, TF_SZ = 44;
  const TN_L = 298, TN_T  = 510;
  const TU_L = 298, TU_T  = 537;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 62, pointerEvents: "none", opacity: op }}>

      {/* ── Flying face photo ── */}
      <Img
        src={staticFile(PRESENTER!.face)}
        style={{
          position: "absolute",
          left: lerp(SF_X, TF_X),
          top:  lerp(SF_Y, TF_Y),
          width:  lerp(SF_SZ, TF_SZ),
          height: lerp(SF_SZ, TF_SZ),
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: `0 0 0 ${lerp(4, 2)}px ${GD_VIOLET}55, 0 0 ${lerp(32, 14)}px ${GD_VIOLET}44`,
        }}
      />

      {/* ── Flying name ── */}
      <div style={{
        position: "absolute",
        left: lerp(SN_L, TN_L),
        top:  lerp(SN_T, TN_T),
        fontSize: lerp(TYPOGRAPHY.h5, TYPOGRAPHY.h6),
        fontWeight: 800,
        color: "white",
        fontFamily: FF,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}>
        {PRESENTER.fullName ?? PRESENTER.name}
      </div>

      {/* ── Flying UG name ── */}
      <div style={{
        position: "absolute",
        left: lerp(SU_L, TU_L),
        top:  lerp(SU_T, TU_T),
        fontSize: lerp(TYPOGRAPHY.h6, TYPOGRAPHY.caption),
        fontWeight: 600,
        color: `rgba(255,255,255,${lerp(0.7, 0.5)})`,
        fontFamily: FF,
        whiteSpace: "nowrap",
      }}>
        {getOrganizerRole(PRESENTER)}
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 7  - MIHALY SUPPORT VIDEO
// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: This component must be rendered inside a <Sequence from={S.VIDEO_IN}>.
// The Video component calls useCurrentFrame() internally  - without a Sequence
// wrapper it would read the absolute frame (e.g. 10800) and try to seek the
// video to second 360, which doesn't exist. Inside the Sequence, useCurrentFrame()
// resets to 0 when the Sequence starts, so the video plays from the beginning.
// ─────────────────────────────────────────────────────────────────────────────
const SupportVideoBody: React.FC = () => {
  const frame  = useCurrentFrame();   // relative: 0 when absoluteFrame = S.VIDEO_IN
  const { fps } = useVideoConfig();
  if (!PRESENTER) return null;
  const DURATION = S.VIDEO_OUT - S.VIDEO_IN; // 1799 frames

  const fadeIn  = spring({ frame, fps, config: springConfig.entry });
  const fadeOut = interpolate(frame, [DURATION - 30, DURATION], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const op = fadeIn * fadeOut;

  // Lower-third: no slide animation  -  the SupportPresenterMagicMoveOverlay carries the
  // face/name/UG to this position. Lower-third fades in as the overlay arrives.
  const lowerThirdOff = 0;
  const lowerThirdOp  = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: op, zIndex: 55 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,4,20,0.90)" }} />

      {/* Video  - shifted up to leave room for subtitles below */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%) translateY(-44px)",
        width: 900, height: 506,
        borderRadius: 20, overflow: "hidden",
        boxShadow: `0 0 80px ${GD_VIOLET}44, 0 30px 80px rgba(0,0,0,0.7)`,
        border: `1px solid ${GD_VIOLET}44`,
        zIndex: 56,
      }}>
        {SUPPORT_VIDEO_AVAILABLE ? (
          <Video
            src={SUPPORT_VID}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #0c0820 0%, #1a0f3a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, fontFamily: "'Inter', sans-serif", textAlign: "center" }}>
              Add public/assets/support-process-h264.mp4<br />and set SUPPORT_VIDEO_AVAILABLE = true in config/event.ts
            </div>
          </div>
        )}

        {/* Lower-third bar  -  no slide, fades in as SupportPresenterIntroCard magic-moves here */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          transform: `translateY(${lowerThirdOff}px)`,
          opacity: lowerThirdOp,
          zIndex: 58,
          overflow: "hidden",
        }}>
          {/* Gradient backdrop */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(0deg, rgba(8,4,20,0.95) 0%, rgba(8,4,20,0.75) 70%, transparent 100%)",
          }} />
          {/* Content */}
          <div style={{
            position: "relative",
            padding: "18px 28px 20px 28px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            {/* Accent bar */}
            <div style={{
              width: 4, height: 48, borderRadius: 3,
              background: `linear-gradient(180deg, ${GD_ACCENT} 0%, ${GD_VIOLET} 100%)`,
              flexShrink: 0,
            }} />
            <Img
              src={staticFile(PRESENTER!.face)}
              style={{
                width: 44, height: 44, borderRadius: "50%", objectFit: "cover",
                boxShadow: `0 0 14px ${GD_VIOLET}aa, 0 0 0 2px ${GD_ACCENT}55`,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{
                fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: GD_ACCENT,
                letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
                marginBottom: 3,
              }}>
                Support Process
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "white",
                fontFamily: FF, lineHeight: 1.1,
              }}>
                {PRESENTER.fullName ?? PRESENTER.name}
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)",
                fontFamily: FF, marginTop: 2,
              }}>
                {getOrganizerRole(PRESENTER)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitles are rendered at root level (main composition z=80) so they
          appear above the dim overlay that covers the progress bar area.      */}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 8  - LINDA TRANSITION BACK (13380 - 15179)
// Linda reappears after Mihaly's video and introduces the AWS special guest.
// ─────────────────────────────────────────────────────────────────────────────
const HostGuestIntro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.LINDA_BACK_IN || frame > S.LINDA_BACK_OUT) return null;
  if (frame >= S.COLLAB_IN) return null;  // collab scene takes over at COLLAB_IN

  const rel = frame - S.LINDA_BACK_IN;
  const op  = fadeWindow(frame, S.LINDA_BACK_IN, S.LINDA_BACK_OUT, 25);

  const cardSp  = spring({ frame: Math.max(0, rel - 18), fps, config: springConfig.entry });
  const badgeSp = spring({ frame: Math.max(0, rel - 36), fps, config: springConfig.entry });

  return (
    <>
      {/* AWS Special Guest teaser card  - positioned high on screen */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translateX(-50%) translateY(calc(-50% - ${L.PROGRESS_H / 2}px + ${interpolate(cardSp, [0, 1], [24, 0])}px))`,
        width: 780,
        opacity: op * cardSp,
        zIndex: 32,
      }}>
        <GlassCard style={{
          padding: "36px 52px",
          borderTop: `4px solid ${GD_ORANGE}`,
          textAlign: "center",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: `${GD_ORANGE}14`,
            border: `1px solid ${GD_ORANGE}40`,
            borderRadius: 100, padding: "6px 20px",
            marginBottom: 24,
            opacity: badgeSp,
            transform: `scale(${interpolate(badgeSp, [0, 1], [0.88, 1])})`,
          }}>
            <StarIcon s={12} c={GD_ORANGE} />
            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ORANGE,
              letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
            }}>
              AWS Special Guest · Joining Live
            </div>
          </div>

          {/* Title */}
          <div style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white",
            fontFamily: FF, lineHeight: 1.1, marginBottom: 10,
          }}>
            Special Guest
          </div>

          <div style={{
            fontSize: TYPOGRAPHY.h6, fontWeight: 600,
            background: `linear-gradient(90deg, ${GD_ORANGE}, ${GD_GOLD})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: FF, marginBottom: 20,
          }}>
            from Amazon Web Services
          </div>

          <div style={{
            width: 48, height: 2, margin: "0 auto 20px",
            background: `linear-gradient(90deg, transparent, ${GD_ORANGE}, transparent)`,
          }} />

          {/* Description */}
          <div style={{
            fontSize: TYPOGRAPHY.body, fontWeight: 400,
            color: "rgba(255,255,255,0.72)", fontFamily: FF, lineHeight: 1.65,
            marginBottom: 18,
          }}>
            A familiar face to many of you - someone who has traveled to community events,
            meetups and community days across Europe, year after year.
          </div>

          <div style={{
            fontSize: TYPOGRAPHY.caption, fontWeight: 500,
            color: "rgba(255,255,255,0.35)", fontFamily: FF,
          }}>
            AWS provides the infrastructure and environments that make GameDay possible
            for 80+ user groups across Europe.
          </div>
        </GlassCard>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE 9a  - COLLAB INTRO (15330 - 17100)  3-phase reveal:
//   Phase 1 (rel 0-300):   Community GlassCard alone, centred (~10 s)
//   Phase 2 (rel 300-900): Community slides left, AWS card enters right,
//                          headline "joint event" appears (~20 s)
//   Phase 3 (rel 900+):    Both cards fade, special guest card + sidebar visible
// No schedule sidebar in phases 1+2 (backdrop covers it - filler content).
// ─────────────────────────────────────────────────────────────────────────────
// Community organizer face paths — used directly from the face field in config
const COMMUNITY_FACES = ORGANIZERS.map((p) => p.face);

// AWS supporter data (shown in the AWS GlassCard) — derived from config/participants
const AWS_SUPPORTERS = CONFIG_AWS.map((p) => ({
  key: p.name, // stable React key
  face: p.face,
  name: p.name,
  title: getOrganizerRole(p),
  sub: p.location ?? "",
}));

// Phase breakpoints (frames relative to COLLAB_IN)  -  each value = end of that phase
const COLLAB_PA = 150;   //  5 s - Phase A ends: just Linda, no boxes, no backdrop
const COLLAB_PB = 750;   // 20 s - Phase B ends: community box fully revealed
const COLLAB_PC = 900;   //  5 s - Phase C ends: hold all faces
const COLLAB_PD = 1500;  // 20 s - Phase D ends: both boxes + headline
const COLLAB_PE = 1650;  //  5 s - Phase E ends: hold both boxes
const COLLAB_PF = 1950;  // 10 s - Phase F ends: guest card + schedule (= COLLAB_OUT - COLLAB_IN)

// Card geometry (px, absolute positioning)
const COLLAB_W   = 560;
const COLLAB_CTR = Math.round((1280 - COLLAB_W) / 2); // 360 - centred x
const COLLAB_LX  = L.MARGIN;                           //  40 - left slot
const COLLAB_RX  = 1280 - L.MARGIN - COLLAB_W;        // 680 - right slot

const CollabIntroScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < S.COLLAB_IN || frame > S.COLLAB_OUT) return null;

  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const rel   = frame - S.COLLAB_IN;

  // Community card: fades in at Phase B, fades out at Phase F
  const commOp = interpolate(rel, [COLLAB_PA, COLLAB_PA + 20, COLLAB_PE, COLLAB_PE + 40], [0, 1, 1, 0], clamp);

  // Phase C→D: community card slides from centre to left slot (cubic ease)
  const rawMoveT  = interpolate(rel, [COLLAB_PC, COLLAB_PC + 90], [0, 1], clamp);
  const moveEased = rawMoveT < 0.5
    ? 4 * rawMoveT * rawMoveT * rawMoveT
    : 1 - Math.pow(-2 * rawMoveT + 2, 3) / 2;
  const communityX = COLLAB_CTR - (COLLAB_CTR - COLLAB_LX) * moveEased;

  // Community card entry spring
  const commEntrySp = spring({ frame: Math.max(0, rel - COLLAB_PA), fps, config: springConfig.entry });

  // Headline: appears at Phase D, fades out at Phase F
  const headlineSp = spring({ frame: Math.max(0, rel - COLLAB_PC), fps, config: springConfig.entry });
  const headlineOp = interpolate(rel, [COLLAB_PC, COLLAB_PC + 30, COLLAB_PE, COLLAB_PE + 40], [0, 1, 1, 0], clamp);

  // AWS card: enters from right at Phase D, fades at Phase F
  const awsEntrySp = spring({ frame: Math.max(0, rel - COLLAB_PC + 8), fps, config: springConfig.entry });
  const awsX       = interpolate(awsEntrySp, [0, 1], [1320, COLLAB_RX]);
  const awsOp      = interpolate(rel, [COLLAB_PC, COLLAB_PC + 30, COLLAB_PE, COLLAB_PE + 40], [0, 1, 1, 0], clamp);

  // Phase F: Guest card
  const guestOp    = interpolate(rel, [COLLAB_PE, COLLAB_PE + 60], [0, 1], clamp);
  const guestSlide = interpolate(rel, [COLLAB_PE, COLLAB_PE + 60], [18, 0], clamp);

  // Shift both boxes down in D+E to clear the headline above
  const boxYShift = interpolate(headlineOp, [0, 1], [0, 44], clamp);

  // Shared card style
  const cardStyle = (accent: string) => ({
    padding: "28px 32px 32px" as const,
    borderLeft: `4px solid ${accent}`,
    boxSizing: "border-box" as const,
    minHeight: 390,
    display: "flex", flexDirection: "column" as const,
    alignItems: "center" as const,
    textAlign: "center" as const,
  });

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: L.PROGRESS_H,
      zIndex: 34, overflow: "hidden",
      // No backdrop  -  normal stream background shows through; all overlays suppressed via isCollabBoxes
    }}>

      {/* ── Headline (phases D+E only) ── */}
      <div style={{
        position: "absolute", top: 36, left: 0, right: 0,
        textAlign: "center",
        opacity: headlineOp,
        transform: `translateY(${interpolate(headlineSp, [0, 1], [14, 0])}px)`,
        pointerEvents: "none",
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ACCENT,
          letterSpacing: 5, textTransform: "uppercase" as const, fontFamily: FF, marginBottom: 10,
        }}>
          A Collaborative Event
        </div>
        <div style={{
          fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white",
          fontFamily: FF, lineHeight: 1.1,
        }}>
          AWS Community&nbsp;&nbsp;&times;&nbsp;&nbsp;Amazon Web Services
        </div>
      </div>

      {/* ── Community GlassCard (centered B+C, slides left D+E, fades F) ── */}
      {rel >= COLLAB_PA - 10 && rel < COLLAB_PE + 50 && (
        <div style={{
          position: "absolute", top: "50%", left: communityX, width: COLLAB_W,
          transform: `translateY(calc(-50% + ${boxYShift + interpolate(commEntrySp, [0, 1], [22, 0])}px))`,
          opacity: commEntrySp * commOp,
        }}>
          <GlassCard style={cardStyle(GD_VIOLET)}>

            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_VIOLET,
              letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF, marginBottom: 4,
            }}>
              AWS Community
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.45)",
              fontFamily: FF, marginBottom: 18,
            }}>
              {ORGANIZERS.filter((p) => p.type === "community").length} organizers from AWS User Groups
            </div>

            {/* Program logos */}
            <div style={{ display: "flex", gap: 20, marginBottom: 18, alignItems: "center", justifyContent: "center" }}>
              {(["programs/aws-heroes-logo.png", "programs/aws-usergroups-badge.png", "programs/aws-builders-logo.png"] as const).map((src, i) => {
                const lSp = spring({ frame: Math.max(0, rel - COLLAB_PA - 8 - i * 8), fps, config: springConfig.entry });
                return (
                  <div key={src} style={{ opacity: lSp, transform: `scale(${interpolate(lSp, [0, 1], [0.5, 1])})` }}>
                    <Img src={staticFile(`assets/${src}`)} style={{ width: 56, height: 56, objectFit: "contain" }} />
                  </div>
                );
              })}
            </div>

            <div style={{ width: "100%", height: 1, background: `${GD_VIOLET}22`, marginBottom: 20 }} />

            {/* Faces  -  staggered, all 64px, centred wrap */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center", flex: 1 }}>
              {COMMUNITY_FACES.map((face, i) => {
                const fSp = spring({ frame: Math.max(0, rel - COLLAB_PA - 30 - i * 65), fps, config: springConfig.entry });
                return (
                  <div key={face} style={{ opacity: fSp, transform: `scale(${interpolate(fSp, [0, 1], [0.45, 1])})` }}>
                    <Img
                      src={staticFile(face)}
                      style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
                        boxShadow: `0 0 0 2px ${GD_VIOLET}99, 0 0 12px ${GD_VIOLET}44` }}
                    />
                  </div>
                );
              })}
            </div>

          </GlassCard>
        </div>
      )}

      {/* ── AWS GlassCard (phases D+E) ── */}
      {rel >= COLLAB_PC - 8 && rel < COLLAB_PE + 50 && (
        <div style={{
          position: "absolute", top: "50%", left: awsX, width: COLLAB_W,
          transform: `translateY(calc(-50% + ${boxYShift}px))`,
          opacity: awsOp,
        }}>
          <GlassCard style={cardStyle(GD_ORANGE)}>

            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ORANGE,
              letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF, marginBottom: 4,
            }}>
              Amazon Web Services
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.45)",
              fontFamily: FF, marginBottom: 18,
            }}>
              Orga Support &amp; Gamemasters making this event possible
            </div>

            <div style={{ width: "100%", height: 1, background: `${GD_ORANGE}22`, marginBottom: 20 }} />

            {/* Faces  -  all 64px, centred */}
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 24 }}>
              {AWS_SUPPORTERS.map((person, i) => {
                const pSp = spring({ frame: Math.max(0, rel - COLLAB_PC - 20 - i * 8), fps, config: springConfig.entry });
                return (
                  <div key={person.key} style={{ opacity: pSp, transform: `scale(${interpolate(pSp, [0, 1], [0.5, 1])})` }}>
                    <Img
                      src={staticFile(person.face)}
                      style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
                        boxShadow: `0 0 0 2px ${GD_ORANGE}aa, 0 0 14px ${GD_ORANGE}55` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* 4 bullet points with SVG icons  -  exact marketing text */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, width: "100%", alignItems: "flex-start" }}>
              {([
                { Icon: GameIcon,  text: "The GameDay environment & infrastructure" },
                { Icon: UsersIcon, text: "Local and remote supporters across Europe" },
                { Icon: StarIcon,  text: "Outstanding support during organization & preparation" },
                { Icon: HeartIcon, text: "And many more AWS colleagues who made this possible" },
              ] as const).map(({ Icon, text }, i) => {
                const bSp = spring({ frame: Math.max(0, rel - COLLAB_PC - 40 - i * 14), fps, config: springConfig.entry });
                return (
                  <div key={i} style={{
                    opacity: bSp,
                    transform: `translateX(${interpolate(bSp, [0, 1], [14, 0])}px)`,
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <Icon s={16} c={GD_ORANGE} />
                    <div style={{
                      fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.82)",
                      fontFamily: FF, lineHeight: 1.4, textAlign: "left" as const,
                    }}>
                      {text}
                    </div>
                  </div>
                );
              })}
            </div>

          </GlassCard>
        </div>
      )}

      {/* ── Phase F: Special guest card (sidebar visible behind, overlays return) ── */}
      {rel >= COLLAB_PE - 30 && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: L.SIDEBAR_W, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: guestOp,
          transform: `translateY(${guestSlide}px)`,
        }}>
          <div style={{ width: 600 }}>
            <GlassCard style={{ padding: "36px 52px", borderTop: `4px solid ${GD_ORANGE}`, textAlign: "center" as const }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: `${GD_ORANGE}14`, border: `1px solid ${GD_ORANGE}40`,
                borderRadius: 100, padding: "6px 20px", marginBottom: 24,
              }}>
                <StarIcon s={12} c={GD_ORANGE} />
                <div style={{
                  fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_ORANGE,
                  letterSpacing: 4, textTransform: "uppercase" as const, fontFamily: FF,
                }}>
                  AWS Special Guest - Joining Live
                </div>
              </div>
              <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white", fontFamily: FF, lineHeight: 1.1, marginBottom: 10 }}>
                Special Guest
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.h6, fontWeight: 600,
                background: `linear-gradient(90deg, ${GD_ORANGE}, ${GD_GOLD})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontFamily: FF, marginBottom: 20,
              }}>
                from Amazon Web Services
              </div>
              <div style={{ width: 48, height: 2, margin: "0 auto 20px", background: `linear-gradient(90deg, transparent, ${GD_ORANGE}, transparent)` }} />
              <div style={{ fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.72)", fontFamily: FF, lineHeight: 1.65, marginBottom: 18 }}>
                A familiar face to many of you - someone who has traveled to community events,
                meetups and community days across Europe, year after year.
              </div>
              <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.35)", fontFamily: FF }}>
                AWS provides the infrastructure and environments that make GameDay possible
                for 80+ user groups across Europe.
              </div>
            </GlassCard>
          </div>
        </div>
      )}

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// Layout: [Current Phase] [━━━━ track ━━━━] [Game Start countdown]
// Track has two phases:
//   0 → GAME_START_FRAME : 🔊 Audio ON  (violet→pink fill)
//   GAME_START_FRAME → end: 🔇 Muted   (gray, game live)
// Milestones: Stream Start (pos 0) · Game Start (pos ~0.833)
// ─────────────────────────────────────────────────────────────────────────────
// Event timeline constants (minutes from 17:30)
const EV_TOTAL   = 210; // 17:30 - 21:00
const EV_PRESHOW =  30; // 17:30 - 18:00
const EV_STREAM  =  60; // 18:00 - 18:30
const EV_GAMEDAY = 180; // 18:30 - 20:30
const EV_MYSTERY = 120; // 19:30 - mystery moment mid-GameDay

const POS_PRESHOW_END = EV_PRESHOW / EV_TOTAL; // 0.143
const POS_STREAM_END  = EV_STREAM  / EV_TOTAL; // 0.286
const POS_GAMEDAY_END = EV_GAMEDAY / EV_TOTAL; // 0.857
const POS_MYSTERY     = EV_MYSTERY / EV_TOTAL; // 0.571

const EVENT_BLOCKS = [
  { label: "Pre-Show",    start: 0,               end: POS_PRESHOW_END, audio: false },
  { label: "Live Stream", start: POS_PRESHOW_END, end: POS_STREAM_END,  audio: true  },
  { label: "GameDay",     start: POS_STREAM_END,  end: POS_GAMEDAY_END, audio: false },
  { label: "Ceremony",    start: POS_GAMEDAY_END, end: 1,               audio: true  },
] as const;

const ProgressBar: React.FC<{
  frame: number;
  totalFrames: number;
  gameCountdownSeconds: number;
}> = ({ frame, totalFrames, gameCountdownSeconds }) => {
  const { name: phaseName } = getPhaseInfo(frame, SEGMENTS);

  // cursor = real position within the 4-block timeline
  const elapsedMin = EV_STREAM - gameCountdownSeconds / 60; // 30→60 across this composition
  const cursorPos  = Math.min(POS_STREAM_END, Math.max(POS_PRESHOW_END, elapsedMin / EV_TOTAL));

  // index of the block the cursor is currently in
  const currentBlockIdx = EVENT_BLOCKS.findIndex((b, i) =>
    cursorPos >= b.start && (cursorPos < b.end || i === EVENT_BLOCKS.length - 1)
  );

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: L.PROGRESS_H, zIndex: 75, overflow: "visible",
    }}>
      <GlassCard style={{
        position: "absolute", inset: 0, borderRadius: 0,
        display: "flex", alignItems: "center", padding: "0 24px", gap: 18,
        overflow: "visible",
      }}>

        {/* ── Left: current phase ── */}
        <div style={{ width: L.LEFT_W, flexShrink: 0 }}>
          <div style={{
            fontSize: TYPOGRAPHY.overline, fontWeight: 700, color: GD_ACCENT,
            letterSpacing: 2, textTransform: "uppercase" as const, fontFamily: FF, marginBottom: 2,
          }}>
            Current Phase
          </div>
          <div style={{
            fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "white",
            fontFamily: FF, whiteSpace: "nowrap",
          }}>
            {phaseName}
          </div>
        </div>

        {/* ── Centre: 4-block timeline ── */}
        {/* overflow:visible lets the logo cursor float above the bar */}
        <div style={{ flex: 1, position: "relative", height: 56, overflow: "visible" }}>

          {/* Background rail */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 28,
            height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2,
          }} />

          {/* Block fills */}
          {EVENT_BLOCKS.map((blk, i) => {
            const isPast    = i < currentBlockIdx;
            const isCurrent = i === currentBlockIdx;
            const left  = blk.start * 100;
            const width = (blk.end - blk.start) * 100;
            return (
              <div key={blk.label} style={{
                position: "absolute",
                left: `${left}%`, width: `${width}%`,
                top: 28, height: 4, borderRadius: 2,
                background: isCurrent
                  ? `linear-gradient(90deg, ${GD_VIOLET}, ${GD_PINK})`
                  : isPast
                    ? "rgba(255,255,255,0.28)"
                    : blk.audio ? `${GD_VIOLET}28` : "rgba(255,255,255,0.04)",
              }} />
            );
          })}

          {/* Block dividers + labels + audio indicators */}
          {EVENT_BLOCKS.map((blk, i) => {
            const isPast    = i < currentBlockIdx;
            const isCurrent = i === currentBlockIdx;
            const isFirst   = i === 0;
            const xPct      = blk.start * 100;
            const midPct    = (blk.start + (blk.end - blk.start) / 2) * 100;

            return (
              <React.Fragment key={blk.label}>
                {/* Divider tick */}
                {!isFirst && (
                  <div style={{
                    position: "absolute", left: `${xPct}%`, top: 22,
                    transform: "translateX(-50%)",
                    width: 1, height: 12,
                    background: "rgba(255,255,255,0.18)",
                  }} />
                )}

                {/* Block name above rail  -  hidden for current block (unicorn marks it) */}
                {!isCurrent && (
                  <div style={{
                    position: "absolute",
                    left: `${midPct}%`, top: 6,
                    transform: "translateX(-50%)",
                    fontSize: 9, fontWeight: 700, letterSpacing: 1,
                    textTransform: "uppercase" as const, fontFamily: FF,
                    whiteSpace: "nowrap",
                    color: isPast ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.38)",
                  }}>
                    {blk.label}
                  </div>
                )}

                {/* Audio icon + label below rail */}
                <div style={{
                  position: "absolute",
                  left: `${midPct}%`, top: 40,
                  transform: "translateX(-50%)",
                  display: "flex", alignItems: "center", gap: 3,
                  whiteSpace: "nowrap",
                }}>
                  {blk.audio
                    ? <VolumeIcon  s={8} c={isCurrent ? GD_ORANGE : `${GD_ORANGE}44`} />
                    : <VolumeOffIcon s={8} />
                  }
                  <span style={{
                    fontSize: 8, fontWeight: 600, letterSpacing: 1,
                    textTransform: "uppercase" as const, fontFamily: FF,
                    color: isCurrent
                      ? (blk.audio ? `${GD_ORANGE}cc` : "rgba(255,255,255,0.40)")
                      : "rgba(255,255,255,0.18)",
                  }}>
                    {blk.audio ? "Audio" : "Muted"}
                  </span>
                  {/* Countdown inline on the current Live Stream block */}
                  {isCurrent && (
                    <span style={{
                      fontSize: 8, fontWeight: 700,
                      color: GD_ORANGE, fontFamily: FF, marginLeft: 3,
                    }}>
                      · {formatTime(gameCountdownSeconds)} left
                    </span>
                  )}
                </div>
              </React.Fragment>
            );
          })}

          {/* Mystery ZapIcon  -  centered on rail */}
          <div style={{
            position: "absolute",
            left: `${POS_MYSTERY * 100}%`, top: 30,
            transform: "translate(-50%, -50%)",
          }}>
            <ZapIcon s={16} c={GD_GOLD} />
          </div>

          {/* Cursor stem (purple line from unicorn bottom to rail) */}
          <div style={{
            position: "absolute",
            left: `${cursorPos * 100}%`, top: 26,
            transform: "translateX(-50%)",
            width: 1, height: 4,
            background: "rgba(139,92,246,0.6)",
          }} />

          {/* GameDay logo cursor  -  large, overflows above the bar */}
          <div style={{
            position: "absolute",
            left: `${cursorPos * 100}%`, top: -36,
            transform: "translateX(-50%)",
            width: 62, height: 62,
            filter: "drop-shadow(0 0 12px rgba(139,92,246,1)) drop-shadow(0 0 24px rgba(139,92,246,0.6))",
            zIndex: 60,
          }}>
            <Img
              src={GAMEDAY_LOGO}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

        </div>

      </GlassCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────────────────────────────────────────
export const MainEvent: React.FC = () => {
  const frame      = useCurrentFrame();
  const { fps }    = useVideoConfig();

  const gameCountdown  = calculateCountdown(frame, STREAM_START, GAME_START, fps);
  const isDistribute   = frame >= 45000;
  // Collab boxes active: Phase B through E (community card + both cards visible, no overlays wanted)
  const isCollabBoxes  = frame >= S.COLLAB_IN + COLLAB_PA && frame < S.COLLAB_IN + COLLAB_PE;
  // Suppress sidebar/speakers during video, Linda's thank-you, and the dark hold up to collab start
  const isVideoScene   = frame >= S.VIDEO_IN && frame < S.COLLAB_IN + COLLAB_PA; // hide sidebar during Phase A too

  // Map DISPLAY_STATS entries to the 4 fixed timing slots.
  // Slots without a matching stat entry are simply skipped (BigStat returns null out of range).
  const STAT_SLOTS = [
    { inFrame: S.STAT1_IN, outFrame: S.STAT1_OUT },
    { inFrame: S.STAT2_IN, outFrame: S.STAT2_OUT },
    { inFrame: S.STAT3_IN, outFrame: S.STAT3_OUT },
    { inFrame: S.STAT4_IN, outFrame: S.STAT4_OUT },
  ];
  const STAT_ICON_MAP: Record<string, { icon: React.ReactNode; color: string }> = {
    "user-groups":    { icon: <UsersIcon s={32} c={GD_ACCENT}  />, color: GD_ACCENT  },
    "countries":      { icon: <GlobeIcon s={32} c={GD_VIOLET}  />, color: GD_VIOLET  },
    "timezones":      { icon: <ClockIcon s={32} c={GD_PINK}    />, color: GD_PINK    },
    "edition":        { icon: <StarIcon  s={32} c={GD_GOLD}    />, color: GD_GOLD    },
    "gameplay-hours": { icon: <ClockIcon s={32} c={GD_ORANGE}  />, color: GD_ORANGE  },
  };
  const STATS: StatDef[] = resolveStats(DISPLAY_STATS).slice(0, 4).map((s, i) => {
    const cfg      = DISPLAY_STATS[i];
    const statType = typeof cfg === "string" ? cfg : cfg.type;
    const iconMeta = STAT_ICON_MAP[statType] ?? { icon: <StarIcon s={32} c={GD_GOLD} />, color: GD_GOLD };
    return {
      value: s.v, label: s.l, sub: s.sub,
      color: iconMeta.color, icon: iconMeta.icon,
      inFrame: STAT_SLOTS[i].inFrame, outFrame: STAT_SLOTS[i].outFrame,
    };
  });

  return (
    <AbsoluteFill style={{ fontFamily: FF, background: GD_DARK }}>

      {/* ── Base layers ── */}
      <BackgroundLayer darken={0.74} />
      <HexGridOverlay />

      {/* ── Map backdrop (150 - 1800) ── */}
      <MapBackdrop frame={frame} fps={fps} />

      {/* ── Scene 1: Welcome hero (0 - 270) ── */}
      <WelcomeHero frame={frame} fps={fps} />

      {/* ── Countdown: top-right (hidden during code distribution and collab boxes) ── */}
      {!isDistribute && !isCollabBoxes && <CountdownTimer frame={frame} fps={fps} seconds={gameCountdown} isDistribute={isDistribute} />}

      {/* ── Scene 2: Stats, one at a time (270 - 870) ── */}
      {!isVideoScene && STATS.map((def) => (
        <BigStat key={def.label} frame={frame} fps={fps} def={def} />
      ))}

      {/* ── Scene 3: Vienna spotlight (870 - 1080) ── */}
      {!isVideoScene && <HostLocationScene frame={frame} fps={fps} />}

      {/* ── Scene 4: Linda full intro card (1080 - 1320) ── */}
      {!isVideoScene && <HostIntroCard frame={frame} fps={fps} />}

      {/* ── Linda host card (hidden during collab boxes so it doesn't bleed through) ── */}
      {!isCollabBoxes && <HostCard frame={frame} />}

      {/* ── Scene 5a: Speech bubble (1320 - 1500) ── */}
      {!isVideoScene && <SpeechBubble frame={frame} fps={fps} />}

      {/* ── Scene 5b - 5d: Info cards  - one at a time (1500 - 1800) ── */}
      {!isVideoScene && LINDA_INFO.map((def) => (
        <InfoCard key={def.label} frame={frame} fps={fps} def={def} />
      ))}

      {/* ── Scene 6: Jerome & Anda (1800 - 9300, no text cards) ── */}
      {!isVideoScene && <CoOrganizersCard frame={frame} fps={fps} />}

      {/* ── Scene 6b: Mihaly "Coming Up" (9300 - 10850)  -  Linda's transition to support process ── */}
      <SupportPresenterIntroCard frame={frame} fps={fps} />

      {/* ── Magic-move overlay: face+name+UG fly from intro card to lower-third ── */}
      <SupportPresenterMagicMoveOverlay frame={frame} />

      {/* ── Scene 10: Arnaud & Loïc Gamemasters (23400 - 44999) ── */}
      <GamemastersCard frame={frame} fps={fps} />

      {/* ── Scene 11: Code distribution (45000 - 53999, 5 min before game start) ── */}
      <CodeDistributionScene frame={frame} fps={fps} gameCountdownSeconds={gameCountdown} />

      {/* ── Schedule sidebar (hidden during video, collab boxes, and code distribution) ── */}
      {!isVideoScene && !isCollabBoxes && !isDistribute && <ScheduleSidebar frame={frame} fps={fps} />}

      {/* ── Speaker indicator (hidden during video, collab boxes, and code distribution) ── */}
      {!isVideoScene && !isCollabBoxes && !isDistribute && <SpeakerIndicator frame={frame} fps={fps} />}

      {/* ── Audio badge ── */}
      <AudioBadge muted={false} />

      {/* ── Scene 7: Mihaly support video (10800 - 13379, full 86s) ── */}
      {/* Sequence resets useCurrentFrame() to 0 so Video seeks correctly */}
      <Sequence from={S.VIDEO_IN} durationInFrames={S.VIDEO_OUT - S.VIDEO_IN + 1} layout="none">
        <SupportVideoBody />
      </Sequence>

      {/* ── Scene 8: Linda transition back → AWS special guest intro (13380 - 15179) ── */}
      <HostGuestIntro frame={frame} fps={fps} />

      {/* ── Scene 9a: Collab intro  -  5 s hold then community × AWS cards (15330 - 15660) ── */}
      <CollabIntroScene frame={frame} fps={fps} />

      {/* ── Progress bar (always) ── */}
      <ProgressBar frame={frame} totalFrames={54000} gameCountdownSeconds={gameCountdown} />

      {/* ── Progress bar dim  -  support video only so subtitles are readable ── */}
      {/* Sits above the bar (z76) but does NOT affect any other scene.         */}
      {/* Height extends to L.PROGRESS_H+48 to fully cover the unicorn cursor   */}
      {/* that overflows 36px above the bar (62px icon, top:-36 within bar).    */}
      {frame >= S.VIDEO_IN && frame <= S.VIDEO_OUT && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: L.PROGRESS_H + 48,
          background: "rgba(8,4,20,0.82)",
          zIndex: 76,
          pointerEvents: "none",
          opacity: interpolate(
            frame,
            [S.VIDEO_IN, S.VIDEO_IN + 25, S.VIDEO_OUT - 25, S.VIDEO_OUT],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }} />
      )}

      {/* ── Support video subtitles  -  rendered at root (z=80) so they sit ABOVE   ── */}
      {/* ── the dim overlay (z=76) that darkens the progress bar area.           ── */}
      {/* ── Positioned below the video bottom, inside the dark overlay band.     ── */}
      {frame >= S.VIDEO_IN && frame <= S.VIDEO_OUT && (() => {
        const relSec   = (frame - S.VIDEO_IN) / fps;
        const relFrame = frame - S.VIDEO_IN;
        const activeSub = SUBTITLES.find((s) => relSec >= s.s && relSec < s.e);
        if (!activeSub) return null;
        const subFade = spring({
          frame: relFrame - Math.round(activeSub.s * fps),
          fps,
          config: springConfig.entry,
        });
        return (
          <div style={{
            position: "absolute",
            // Fixed 72px zone between video bottom and progress bar.
            // Flex centering so 1-line and 2-line subtitles both sit in the middle.
            bottom: L.PROGRESS_H + 6,
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 860, width: 860,
            height: 72,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: subFade,
            zIndex: 80,
            textAlign: "center",
            pointerEvents: "none",
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.h6, fontWeight: 600, color: "white",
              fontFamily: FF, lineHeight: 1.4,
              textShadow: "0 1px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.8)",
            }}>
              {activeSub.t}
            </div>
          </div>
        );
      })()}

      {/* ── Remotion Studio chapter markers ── */}
      {CHAPTERS.map((seg) => (
        <Sequence
          key={seg.label}
          from={seg.startFrame}
          durationInFrames={seg.endFrame - seg.startFrame + 1}
          name={seg.speakers ? `${seg.label} (${seg.speakers})` : seg.label}
          layout="none"
        >
          <></>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
