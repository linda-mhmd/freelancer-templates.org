/**
 * 04v4  -  InfoLoop (Muted)
 *
 * 30-minute cinematic pre-show loop - V4 improvements over V3:
 *   • SVG icon library (no emojis in UI chrome)
 *   • UG logos from Notion LOGO_MAP (full-size in spotlight)
 *   • Arnaud & Loïc introduced as GameDay Instructors
 *   • Linda's correct title: AWS Community Hero
 *   • StreamHostCard-style Linda slide (photo + UG Vienna logo)
 *   • OrganizerSection-style Anda & Jerome slide (GlassCard, UG logos)
 *   • 4 new community education slides:
 *        -  What is an AWS User Group Leader?
 *        -  What is an AWS Community Builder?
 *        -  What is an AWS Community Hero?
 *        -  What are AWS Cloud Clubs?
 */
import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  BackgroundLayer,
  HexGridOverlay,
  AudioBadge,
  GlassCard,
} from "../../components";
import {
  GD_DARK,
  GD_PURPLE,
  GD_VIOLET,
  GD_PINK,
  GD_ACCENT,
  GD_ORANGE,
  GD_GOLD,
  TYPOGRAPHY,
  FONT_FAMILY,
  springConfig,
} from "../../design";
import { calculateCountdown, formatTime } from "../../utils/timing";
import {
  STREAM_START_OFFSET_MINUTES as STREAM_START,
  GAME_START_OFFSET_MINUTES as GAME_START,
  EVENT_DATE,
  EVENT_NAME,
  HOST_TIMEZONE,
  STREAM_START_TIME,
  STREAM_START as STREAM_START_LABEL,
  GAME_START as GAME_START_LABEL,
  GAME_END as GAME_END_LABEL,
  AUDIO_CHECK,
  GM_INTRO_TIME,
  GM_INSTRUCTIONS_TIME,
  CODES_TIME,
  EDITION_LABEL,

} from "../../../config/event";
import { USER_GROUPS, ORGANIZERS, AWS_SUPPORTERS, DISPLAY_STATS, EVENT_REGION, type UserGroup, getOrganizerRole, getOrganizerUserGroup } from "../../../config/participants";
import { resolveStats } from "../../utils/stats";

// Colours assigned left-to-right to whatever stats are in DISPLAY_STATS
const STAT_COLORS_PRESHOW = [GD_GOLD, GD_PINK, GD_VIOLET, GD_ORANGE, GD_ACCENT];

const ALL_PEOPLE    = [...ORGANIZERS, ...AWS_SUPPORTERS];
const HOST          = ALL_PEOPLE.find((p) => p.streamRole === "host")!;
const CO_ORGANIZERS = ALL_PEOPLE.filter((p) => p.streamRole === "co-organizer");
const CO_ORG_LABEL  = CO_ORGANIZERS.map((p) => p.name).join(" & ");
const GAMEMASTERS   = ALL_PEOPLE.filter((p) => p.streamRole === "gamemaster");
const GM_LABEL      = GAMEMASTERS.map((p) => p.name).join(" & ");

// ─── Derived event display strings ────────────────────────────────────────────
const [_ey, _em, _ed] = EVENT_DATE.split("-").map(Number);
const _eventDate = new Date(_ey, _em - 1, _ed);
const EVENT_DAY_NAME   = _eventDate.toLocaleDateString("en-US", { weekday: "long" });
const EVENT_DATE_SHORT = _eventDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const EVENT_HERO_DATE  = `${EVENT_DAY_NAME}, ${EVENT_DATE_SHORT} · Starting ${STREAM_START_TIME} ${HOST_TIMEZONE}`;

// ─── Asset paths ──────────────────────────────────────────────────────────────
const COMMUNITY_LOGO = staticFile(
  "assets/aws-community-logo.png"
);
const GAMEDAY_LOGO = staticFile(
  "assets/logos/gameday-logo-geometric.png"
);
const EUROPE_MAP = staticFile("assets/europe-map.png");

// ─── Timing constants ─────────────────────────────────────────────────────────
const F = FONT_FAMILY;
const S = 900;  // 30 s - content slides
const U = 330;  // 11 s - UG spotlight
const T = 20;   // transition overlap frames

// ─── Global frame context (TransitionSeries resets useCurrentFrame per sequence) ─
const GlobalFrameCtx = createContext(0);

// ─── Deterministic UG shuffle ─────────────────────────────────────────────────
const SHUFFLED = [...USER_GROUPS].sort((a, b) => {
  const h = (s: string) => s.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return h(a.name) - h(b.name);
});

// ─── Logo lookup by exact USER_GROUPS name ────────────────────────────────────
// Cast to UserGroup is safe — `satisfies UserGroup[]` in participants.ts guarantees the shape.
function findLogo(name: string): string | null {
  return (USER_GROUPS.find((g) => g.name === name) as UserGroup | undefined)?.logo ?? null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SVG ICON LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════
type IconProps = { size?: number; color?: string; style?: React.CSSProperties };

const Icon: React.FC<{ size: number; color: string; children: React.ReactNode }> = ({ size, color, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const MicIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill={color} stroke="none" opacity={0.8} />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </Icon>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

export const StarIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke="none" />
  </Icon>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color} stroke="none" opacity={0.85} />
  </Icon>
);

export const CloudIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill={color} stroke="none" opacity={0.8} />
  </Icon>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const GamepadIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth={3} />
    <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth={3} />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z" />
  </Icon>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);

export const VolumeIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} stroke="none" opacity={0.8} />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </Icon>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill={color} fillOpacity={0.2} />
  </Icon>
);

export const AwardIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </Icon>
);

export const RocketIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill={color} stroke="none" opacity={0.7} />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" fill={color} stroke="none" opacity={0.5} />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill={color} stroke="none" opacity={0.5} />
  </Icon>
);

export const BookOpenIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Icon>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={color} stroke="none" />
  </Icon>
);

export const CodeIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
);

export const GraduationIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </Icon>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 12, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill={color} stroke="none" opacity={0.7} />
    <circle cx="12" cy="10" r="3" fill="white" stroke="none" />
  </Icon>
);

export const BroadcastIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </Icon>
);

export const VolumeMuteIcon: React.FC<IconProps> = ({ size = 20, color = "currentColor" }) => (
  <Icon size={size} color={color}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} stroke="none" opacity={0.8} />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </Icon>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function useEntry(startFrame = 0, cfg = springConfig.entry) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - startFrame, fps, config: cfg });
}

function useStagger(i: number, gap = 8) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - i * gap, fps, config: springConfig.entry });
}

function usePulse(period = 60) {
  const frame = useCurrentFrame();
  return interpolate(frame % period, [0, period / 2, period], [0.96, 1, 0.96], { extrapolateRight: "clamp" });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PERSISTENT TOP BAR
// ═══════════════════════════════════════════════════════════════════════════════
const TopBar: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const sc = calculateCountdown(frame, 0, STREAM_START, fps);
  const gc = calculateCountdown(frame, 0, GAME_START, fps);
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, zIndex: 10, background: `linear-gradient(180deg, ${GD_DARK}f2, ${GD_DARK}bb)`, borderBottom: `1px solid ${GD_PURPLE}44`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", fontFamily: F }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Img src={COMMUNITY_LOGO} style={{ height: 38 }} />
        <div style={{ width: 1, height: 32, background: `${GD_PURPLE}55` }} />
        <Img src={GAMEDAY_LOGO} style={{ height: 46 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: TYPOGRAPHY.labelSmall, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 3, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}55`, borderRadius: 8, padding: "5px 14px" }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#f87171" }} />
        Pre-Show Loop
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: TYPOGRAPHY.overline, color: GD_PINK, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
            <BroadcastIcon size={11} color={GD_PINK} /> Stream In
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: GD_PINK, fontFamily: "monospace" }}>{formatTime(sc)}</div>
        </div>
        <div style={{ width: 1, height: 36, background: `${GD_PURPLE}44` }} />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: TYPOGRAPHY.overline, color: GD_GOLD, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
            <GamepadIcon size={11} color={GD_GOLD} /> Game In
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: GD_GOLD, fontFamily: "monospace" }}>{formatTime(gc)}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Slide wrapper ─────────────────────────────────────────────────────────────
const Wrap: React.FC<{ children: React.ReactNode; muted?: boolean }> = ({ children, muted = true }) => (
  <AbsoluteFill style={{ fontFamily: F, background: GD_DARK }}>
    <BackgroundLayer darken={0.72} />
    <HexGridOverlay />
    <AudioBadge muted={muted} />
    <TopBar />
    <div style={{ position: "absolute", top: 72, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
      {children}
    </div>
  </AbsoluteFill>
);

// ─── Section label ─────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ icon: React.ReactNode; text: string; color?: string }> = ({ icon, text, color = GD_ACCENT }) => {
  const o = useEntry(0);
  return (
    <div style={{ opacity: o, transform: `translateY(${interpolate(o, [0, 1], [14, 0])}px)`, fontSize: TYPOGRAPHY.body, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 3, marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
      {icon}{text}
    </div>
  );
};

// ─── Info card ─────────────────────────────────────────────────────────────────
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; body: string; accent: string; delay?: number }> = ({ icon, title, body, accent, delay = 0 }) => {
  const o = useStagger(delay);
  return (
    <div style={{ opacity: o, transform: `translateY(${interpolate(o, [0, 1], [18, 0])}px)`, background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}28`, borderLeft: `3px solid ${accent}`, borderRadius: 16, padding: "22px 22px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>{icon}<div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 700, color: "white" }}>{title}</div></div>
      <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{body}</div>
    </div>
  );
};

// ─── Person card (photo + name + role + points) ─────────────────────────────
const PersonCard: React.FC<{ face: string; name: string; role: string; sub: string; flag: string; accent: string; ugLogo?: string | null; delay?: number }> = ({ face, name, role, sub, flag, accent, ugLogo, delay = 0 }) => {
  const o = useStagger(delay);
  return (
    <div style={{ flex: 1, opacity: o, transform: `translateY(${interpolate(o, [0, 1], [22, 0])}px)`, background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}28`, borderRadius: 20, padding: "26px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: 148, height: 148, borderRadius: "50%", overflow: "hidden", border: `3px solid ${accent}55`, boxShadow: `0 0 32px ${accent}28`, marginBottom: 14 }}>
        <Img src={staticFile(face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white" }}>{name}</div>
      <div style={{ fontSize: TYPOGRAPHY.caption, color: accent, marginTop: 4, fontWeight: 600 }}>{role}</div>
      <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: "rgba(255,255,255,0.45)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
        <LocationIcon size={12} color={GD_ACCENT} /> {flag} {sub}
      </div>
      {ugLogo && (
        <div style={{ marginTop: 16, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 12px", width: "100%" }}>
          <Img src={ugLogo} style={{ maxWidth: 130, maxHeight: 52, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 - Hero V3
// ═══════════════════════════════════════════════════════════════════════════════
const SlideHero: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const gc = calculateCountdown(frame, 0, GAME_START, fps);
  const m = String(Math.floor(gc / 60)).padStart(2, "0");
  const s = String(gc % 60).padStart(2, "0");
  const pulse = usePulse(60);
  const logoE = useStagger(0, 1);
  const titleE = useStagger(4, 8);
  const timerE = useStagger(8, 8);
  const statsE = useStagger(12, 8);

  const stats = resolveStats(DISPLAY_STATS).map((s, i) => ({ v: s.v, l: s.l, c: STAT_COLORS_PRESHOW[i % STAT_COLORS_PRESHOW.length] }));

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: logoE, transform: `scale(${interpolate(logoE, [0, 1], [0.88, 1])})`, display: "flex", alignItems: "center", gap: 28, marginBottom: 24 }}>
        <Img src={COMMUNITY_LOGO} style={{ height: 86 }} />
        <div style={{ width: 1, height: 56, background: `linear-gradient(180deg, transparent, ${GD_VIOLET}, transparent)` }} />
        <Img src={GAMEDAY_LOGO} style={{ height: 118 }} />
      </div>
      <div style={{ opacity: titleE, transform: `translateY(${interpolate(titleE, [0, 1], [24, 0])}px)`, textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: TYPOGRAPHY.captionSmall, fontWeight: 700, color: GD_ACCENT, letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>The {EDITION_LABEL}</div>
        <div style={{ fontSize: TYPOGRAPHY.h2, fontWeight: 900, letterSpacing: -1, lineHeight: 1.05, background: `linear-gradient(135deg, #fff 0%, ${GD_ACCENT} 45%, ${GD_PINK} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{EVENT_NAME}</div>
        <div style={{ fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.45)", marginTop: 8, letterSpacing: 2 }}>{EVENT_HERO_DATE}</div>
      </div>
      <div style={{ opacity: timerE, transform: `scale(${interpolate(timerE, [0, 1], [0.9, 1])})`, textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, fontWeight: 700, color: GD_GOLD, textTransform: "uppercase", letterSpacing: 4, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <GamepadIcon size={14} color={GD_GOLD} /> Game Starts In
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", justifyContent: "center" }}>
          {[{ v: m, u: "MIN" }, { v: s, u: "SEC" }].map(({ v, u }, idx) => (
            <React.Fragment key={u}>
              {idx > 0 && <div style={{ fontSize: 52, color: GD_GOLD, opacity: 0.5, paddingBottom: 14, fontWeight: 300 }}>:</div>}
              <div style={{ background: `linear-gradient(180deg, ${GD_PURPLE}44, ${GD_DARK}cc)`, border: `1px solid ${GD_VIOLET}33`, borderRadius: 16, padding: "14px 28px", textAlign: "center", minWidth: 110, transform: `scale(${pulse})` }}>
                <div style={{ fontSize: TYPOGRAPHY.timer, fontWeight: 800, color: GD_GOLD, lineHeight: 1, fontFamily: "monospace", textShadow: `0 0 20px ${GD_ORANGE}55` }}>{v}</div>
                <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: GD_ACCENT, marginTop: 4, letterSpacing: 2 }}>{u}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ opacity: statsE, transform: `translateY(${interpolate(statsE, [0, 1], [20, 0])}px)`, display: "flex", gap: 18 }}>
        {stats.map((st) => (
          <div key={st.l} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${st.c}22`, borderRadius: 14, padding: "14px 22px", textAlign: "center" }}>
            <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: st.c, lineHeight: 1 }}>{st.v}</div>
            <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: GD_ACCENT, marginTop: 6, textTransform: "uppercase", letterSpacing: 2 }}>{st.l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 - What's Happening
// ═══════════════════════════════════════════════════════════════════════════════
const SlideWhatsHappening: React.FC = () => {
  const cards = [
    { icon: <BroadcastIcon size={28} color={GD_VIOLET} />, title: `One Stream, ${USER_GROUPS.length} Cities`, body: `Right now, AWS User Groups across ${EVENT_REGION} are watching this exact stream at their local venue. You are part of the first-ever ${EVENT_NAME}.`, c: GD_VIOLET },
    { icon: <VolumeMuteIcon size={28} color={GD_PINK} />, title: "Why Is It Muted Right Now?", body: `This is the pre-show loop before the live stream at ${STREAM_START_LABEL}. At ${AUDIO_CHECK} the stream host will do a ~30 second audio test - make sure you can hear it!`, c: GD_PINK },
    { icon: <GamepadIcon size={28} color={GD_GOLD} />, title: "The Competition", body: `At ${GAME_START_LABEL} all ${USER_GROUPS.length} groups start a 2-hour AWS challenge simultaneously. Your local UG leader gives your team access codes at ${CODES_TIME}.`, c: GD_GOLD },
    { icon: <TrophyIcon size={28} color={GD_ORANGE} />, title: "Stay for the Closing!", body: `At ${GAME_END_LABEL} the stream returns live. Winners are revealed globally, together. Don't leave - celebrate with ${USER_GROUPS.length} cities all at once.`, c: GD_ORANGE },
  ];
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<BroadcastIcon size={20} color={GD_ACCENT} />} text="What's Happening Right Now" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, width: "100%", maxWidth: 1060 }}>
        {cards.map((card, i) => (
          <InfoCard key={card.title} icon={card.icon} title={card.title} body={card.body} accent={card.c} delay={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 - Meet the Stream Host (StreamHostCard-inspired)
// ═══════════════════════════════════════════════════════════════════════════════
const SlideMeetHost: React.FC = () => {
  const hostUG = getOrganizerUserGroup(HOST);
  const ugLogo = hostUG ? findLogo(hostUG) : null;
  const cardE = useEntry(0);
  const textE = useStagger(3, 8);
  const noteE = useStagger(10, 8);
  const bioPoints = HOST.bio ?? [];
  const staggerEntries = [useStagger(5, 8), useStagger(6, 8), useStagger(7, 8), useStagger(8, 8)];
  const points = bioPoints.map((text, i) => ({ entry: staggerEntries[i] ?? staggerEntries[staggerEntries.length - 1], text }));

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 48, width: "100%", maxWidth: 1060 }}>
        {/* Photo + UG logo column */}
        <div style={{ opacity: cardE, transform: `scale(${interpolate(cardE, [0, 1], [0.88, 1])})`, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: "hidden", border: `3px solid ${GD_VIOLET}66`, boxShadow: `0 0 48px ${GD_VIOLET}33` }}>
            <Img src={staticFile(HOST.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {ugLogo && (
            <div style={{ width: 230, borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
              <Img src={ugLogo} style={{ width: "100%", aspectRatio: "600/337", objectFit: "cover", display: "block", borderRadius: "14px 14px 0 0" }} />
              <div style={{ padding: "6px 10px 8px", textAlign: "center", fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: GD_ACCENT, letterSpacing: 2, textTransform: "uppercase" as const }}>{getOrganizerRole(HOST)}</div>
            </div>
          )}
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>
            {HOST.flag} {HOST.location}
          </div>
        </div>

        {/* Text column */}
        <div style={{ flex: 1 }}>
          <SectionLabel icon={<MicIcon size={20} color={GD_ACCENT} />} text="Your Stream Host" />
          <div style={{ opacity: textE, transform: `translateX(${interpolate(textE, [0, 1], [22, 0])}px)`, marginBottom: 14 }}>
            <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white", lineHeight: 1 }}>{HOST.fullName ?? HOST.name}</div>
            <div style={{ fontSize: TYPOGRAPHY.h6, color: GD_ACCENT, marginTop: 8, fontWeight: 600 }}>Stream Host{HOST.title ? ` · ${HOST.title}` : ""}</div>
          </div>
          <GlassCard style={{ padding: "14px 22px", borderLeft: `4px solid ${GD_VIOLET}` }}>
            {points.map(({ entry, text }, i) => (
              <div key={i} style={{ opacity: entry, transform: `translateX(${interpolate(entry, [0, 1], [16, 0])}px)`, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < points.length - 1 ? 8 : 0, fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                <CheckCircleIcon size={16} color={GD_VIOLET} />
                <span>{text}</span>
              </div>
            ))}
          </GlassCard>
          <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [10, 0])}px)`, marginTop: 10, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}44`, borderRadius: 12, padding: "10px 16px", fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
            <strong style={{ color: GD_ACCENT }}>Not sure who this is?</strong> Just like the organizers of all local GameDay events, {HOST.fullName ?? HOST.name} is a volunteer who organizes community events in their free time. Not an AWS employee.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 - Meet Anda & Jerome (OrganizerSection-inspired)
// ═══════════════════════════════════════════════════════════════════════════════
const CO_ORG_COLORS = [GD_PINK, GD_VIOLET, GD_ORANGE, GD_GOLD];

const SlideMeetCoOrganizers: React.FC = () => {
  const headingE = useEntry(0);
  const cardE = useStagger(2, 8);
  const noteE = useStagger(8, 8);

  const people = CO_ORGANIZERS.map((person, i) => ({
    person,
    c: CO_ORG_COLORS[i % CO_ORG_COLORS.length],
    logo: (() => { const ug = getOrganizerUserGroup(person); return ug ? findLogo(ug) : null; })(),
    desc: person.bio?.[0] ?? "",
  }));

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: headingE, transform: `translateY(${interpolate(headingE, [0, 1], [16, 0])}px)`, textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 4, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <UsersIcon size={14} color={GD_ACCENT} /> The People Behind This Event
        </div>
        <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white" }}>Meet {CO_ORG_LABEL}</div>
      </div>

      <div style={{ display: "flex", gap: 24, width: "100%", maxWidth: 1060, marginBottom: 16 }}>
        {people.map(({ person, c, logo, desc }) => (
          <div key={person.name} style={{ flex: 1, opacity: cardE, transform: `translateY(${interpolate(cardE, [0, 1], [22, 0])}px)` }}>
            <GlassCard style={{ padding: "22px 24px", borderLeft: `4px solid ${c}`, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                <Img src={staticFile(person.face)} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0, boxShadow: `0 0 20px ${c}44` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: TYPOGRAPHY.h5, fontWeight: 900, color: "white" }}>{person.flag} {person.name}</div>
                  <div style={{ fontSize: TYPOGRAPHY.caption, color: c, marginTop: 3, fontWeight: 600 }}>{getOrganizerRole(person)}</div>
                  <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: "rgba(255,255,255,0.4)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                    <LocationIcon size={11} color={GD_ACCENT} /> {person.location}
                  </div>
                </div>
                {logo && (
                  <div style={{ width: 130, height: 75, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.05)" }}>
                    <Img src={logo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
              <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{desc}</div>
            </GlassCard>
          </div>
        ))}
      </div>

      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}44`, borderRadius: 14, padding: "12px 24px", fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.6 }}>
        <HeartIcon size={14} color={GD_ACCENT} style={{ display: "inline", marginRight: 6 }} />
        <strong style={{ color: GD_ACCENT }}>None of this is their job.</strong> {CO_ORG_LABEL} are AWS User Group Leaders who organize events and build things for the AWS community in their free time, just like so many others. They will share the story behind this GameDay live on stream.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 - Meet the GameDay Instructors (Arnaud & Loïc)
// ═══════════════════════════════════════════════════════════════════════════════
const GM_COLORS = [GD_ORANGE, GD_GOLD, GD_VIOLET, GD_PINK];

const SlideMeetGamemasters: React.FC = () => {
  const headingE = useEntry(0);
  const cardE = useStagger(2, 8);
  const noteE = useStagger(8, 8);

  const people = GAMEMASTERS.map((person, i) => ({
    person,
    c: GM_COLORS[i % GM_COLORS.length],
    desc: person.bio?.[0] ?? "",
  }));

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: headingE, transform: `translateY(${interpolate(headingE, [0, 1], [16, 0])}px)`, textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 4, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <GamepadIcon size={14} color={GD_ACCENT} /> GameDay Instructors
        </div>
        <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white" }}>Meet {GM_LABEL}</div>
        <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>AWS Gamemasters - delivering instructions live at {GM_INSTRUCTIONS_TIME}</div>
      </div>

      <div style={{ display: "flex", gap: 24, width: "100%", maxWidth: 1060, marginBottom: 20 }}>
        {people.map(({ person, c, desc }) => (
          <div key={person.name} style={{ flex: 1, opacity: cardE, transform: `translateY(${interpolate(cardE, [0, 1], [22, 0])}px)` }}>
            <GlassCard style={{ padding: "24px 26px", borderLeft: `4px solid ${c}`, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <Img src={staticFile(person.face)} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0, boxShadow: `0 0 20px ${c}44` }} />
                <div>
                  <div style={{ fontSize: TYPOGRAPHY.h5, fontWeight: 900, color: "white" }}>{person.flag} {person.name}</div>
                  <div style={{ fontSize: TYPOGRAPHY.caption, color: c, marginTop: 3, fontWeight: 600 }}>{getOrganizerRole(person)}</div>
                  <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 5, background: `${GD_ORANGE}22`, border: `1px solid ${GD_ORANGE}44`, borderRadius: 6, padding: "3px 10px" }}>
                    <GamepadIcon size={11} color={GD_ORANGE} />
                    <span style={{ fontSize: TYPOGRAPHY.overline, color: GD_ORANGE, fontWeight: 700, letterSpacing: 1 }}>AWS GAMEMASTER</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{desc}</div>
            </GlassCard>
          </div>
        ))}
      </div>

      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060 }}>
        <GlassCard style={{ padding: "14px 24px" }}>
          <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
            {[
              { time: GM_INTRO_TIME, label: `${HOST.fullName ?? HOST.name} introduces the gamemasters`, icon: <MicIcon size={14} color={GD_ACCENT} /> },
              { time: GM_INSTRUCTIONS_TIME, label: `${GM_LABEL} deliver GameDay instructions`, icon: <GamepadIcon size={14} color={GD_GOLD} /> },
              { time: CODES_TIME, label: "Team codes distributed at your venue", icon: <CheckCircleIcon size={14} color="#4ade80" /> },
            ].map((item) => (
              <div key={item.time} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.7)" }}>
                {item.icon}
                <strong style={{ color: "white", fontFamily: "monospace" }}>{item.time}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 - What is the AWS Community?
// ═══════════════════════════════════════════════════════════════════════════════
const SlideAWSCommunity: React.FC = () => {
  const cards = [
    { icon: <HeartIcon size={32} color={GD_VIOLET} />, title: "Volunteers, not employees", body: "The AWS Community is made up of developers, architects, and cloud enthusiasts who are NOT employed by Amazon. They organize events and share knowledge purely out of passion." },
    { icon: <UsersIcon size={32} color={GD_PINK} />, title: "Local User Groups", body: "AWS User Groups are local communities in cities around the world. They hold regular meetups, workshops, and technical talks - driven entirely by volunteer leaders." },
    { icon: <GlobeIcon size={32} color={GD_GOLD} />, title: `${USER_GROUPS.length} Groups Here Today`, body: "Every group competing today is run by a volunteer leader. This event is the first time all these groups have ever competed together in a single event at the same time." },
  ];
  const quoteE = useStagger(4, 8);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<CloudIcon size={20} color={GD_ACCENT} />} text="About the AWS Community" />
      <div style={{ display: "flex", gap: 18, width: "100%", maxWidth: 1060, marginBottom: 18 }}>
        {cards.map((c, i) => <InfoCard key={c.title} icon={c.icon} title={c.title} body={c.body} accent={[GD_VIOLET, GD_PINK, GD_GOLD][i]} delay={i} />)}
      </div>
      <div style={{ opacity: quoteE, transform: `translateY(${interpolate(quoteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060, background: `linear-gradient(90deg, ${GD_PURPLE}28, ${GD_VIOLET}18)`, border: `1px solid ${GD_VIOLET}33`, borderLeft: `4px solid ${GD_GOLD}`, borderRadius: 14, padding: "16px 24px", fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
        <StarIcon size={14} color={GD_GOLD} /> <strong style={{ color: GD_GOLD }}> A big thank-you</strong> to every User Group leader who organized a local venue and invited people today. This event exists because of community volunteers like you.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 - What is an AWS User Group Leader?
// ═══════════════════════════════════════════════════════════════════════════════
const SlideUGLeader: React.FC = () => {
  const points = [
    { icon: <CalendarIcon size={22} color={GD_VIOLET} />, title: "They organize", body: "UG leaders plan and run local meetups - finding venues, speakers, and sponsors. Everything is done voluntarily in their personal time." },
    { icon: <BookOpenIcon size={22} color={GD_PINK} />, title: "They educate", body: "Leaders share knowledge about AWS services, cloud architecture, DevOps, AI/ML and more with their local tech community." },
    { icon: <UsersIcon size={22} color={GD_GOLD} />, title: "They connect", body: "They build local networks of cloud professionals, creating opportunities for mentorship, careers, and collaboration." },
    { icon: <HeartIcon size={22} color={GD_ORANGE} />, title: "They volunteer", body: "No salary, no budget from AWS. UG leaders do this entirely out of passion for the community and love of cloud technology." },
  ];
  const badgeE = useEntry(0);
  const noteE = useStagger(5, 8);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12, marginTop: -8 }}>
        <div style={{ opacity: badgeE, transform: `scale(${interpolate(badgeE, [0, 1], [0.85, 1])})` }}>
          <Img src={staticFile("assets/programs/aws-usergroups-badge.png")} style={{ width: 112, height: "auto", objectFit: "contain" }} />
        </div>
        <div style={{ fontSize: TYPOGRAPHY.body, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase" as const, letterSpacing: 3, display: "flex", alignItems: "center", gap: 10 }}>
          <UsersIcon size={20} color={GD_ACCENT} />What is an AWS User Group Leader?
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, width: "100%", maxWidth: 1060, marginBottom: 18 }}>
        {points.map((p, i) => <InfoCard key={p.title} icon={p.icon} title={p.title} body={p.body} accent={[GD_VIOLET, GD_PINK, GD_GOLD, GD_ORANGE][i]} delay={i} />)}
      </div>
      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}44`, borderRadius: 14, padding: "14px 24px", fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, textAlign: "center" }}>
        <strong style={{ color: GD_ACCENT }}>The person who organized today's event in your city</strong> is an AWS User Group leader - a volunteer who did all of this in their free time, just to bring the community together.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 - What is an AWS Community Builder?
// ═══════════════════════════════════════════════════════════════════════════════
const SlideCommunityBuilder: React.FC = () => {
  const badgeE = useEntry(0);
  const noteE = useStagger(5, 8);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 8, marginTop: -8 }}>
        <div style={{ opacity: badgeE, transform: `scale(${interpolate(badgeE, [0, 1], [0.85, 1])})` }}>
          <Img src={staticFile("assets/programs/aws-builders-logo.png")} style={{ width: 140, height: "auto", objectFit: "contain" }} />
        </div>
        <SectionLabel icon={<RocketIcon size={20} color={GD_ACCENT} />} text="What is an AWS Community Builder?" />
      </div>
      <div style={{ display: "flex", gap: 18, width: "100%", maxWidth: 1060, marginBottom: 18 }}>
        <InfoCard icon={<RocketIcon size={32} color={GD_VIOLET} />} title="A recognition program" body="AWS Community Builders is an official AWS program that recognizes passionate community members who actively share knowledge, create technical content, and support others in the AWS ecosystem." accent={GD_VIOLET} delay={0} />
        <InfoCard icon={<BookOpenIcon size={32} color={GD_PINK} />} title="Content creators & educators" body="Builders write blog posts, record videos, give conference talks, create open-source tools, and answer community questions. They help others learn AWS through genuine, community-driven content." accent={GD_PINK} delay={1} />
        <InfoCard icon={<UsersIcon size={32} color={GD_GOLD} />} title="Selected by AWS" body="Builders are selected by AWS based on their community contributions. They receive AWS credits, service previews, and direct access to product teams - but are NOT AWS employees." accent={GD_GOLD} delay={2} />
      </div>
      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060 }}>
        <GlassCard style={{ padding: "16px 24px", borderLeft: `4px solid ${GD_VIOLET}` }}>
          <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
            <strong style={{ color: GD_ACCENT }}>Example:</strong> Several of today's organizers are AWS Community Builders. They applied to the program, were selected by AWS, and now contribute knowledge back to the global AWS community - all in their spare time.
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 - What is an AWS Community Hero?
// ═══════════════════════════════════════════════════════════════════════════════
const SlideCommunityHero: React.FC = () => {
  const heroE = useStagger(0, 1);
  const textE = useStagger(3, 8);
  const p1 = useStagger(5, 8);
  const p2 = useStagger(6, 8);
  const p3 = useStagger(7, 8);
  const noteE = useStagger(9, 8);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 48, width: "100%", maxWidth: 1060 }}>
        {/* Hero program logo - middle aligned with content */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: heroE, transform: `scale(${interpolate(heroE, [0, 1], [0.85, 1])})` }}>
            <Img src={staticFile("assets/programs/aws-heroes-logo.png")} style={{ width: 200, height: "auto", objectFit: "contain" }} />
          </div>
        </div>

        {/* Explanation */}
        <div style={{ flex: 1 }}>
          <SectionLabel icon={<ShieldIcon size={20} color={GD_ACCENT} />} text="What is an AWS Hero?" />
          <div style={{ opacity: textE, transform: `translateX(${interpolate(textE, [0, 1], [22, 0])}px)`, marginBottom: 20 }}>
            <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white", lineHeight: 1 }}>AWS Heroes</div>
            <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>A worldwide recognition program for passionate AWS advocates and technical leaders</div>
          </div>
          <GlassCard style={{ padding: "20px 24px", borderLeft: `4px solid ${GD_VIOLET}` }}>
            {[
              { entry: p1, icon: <StarIcon size={16} color={GD_VIOLET} />, text: "AWS Heroes are recognized for their real-world expertise, knowledge sharing, and impact on the broader AWS community" },
              { entry: p2, icon: <UsersIcon size={16} color={GD_VIOLET} />, text: "They educate, inspire, and support others through talks, blog posts, open-source projects, and community leadership" },
              { entry: p3, icon: <ShieldIcon size={16} color={GD_VIOLET} />, text: "Hero categories include Community, Data, Machine Learning, Serverless, DevTools, Container, Security, and more" },
            ].map(({ entry, icon, text }, i) => (
              <div key={i} style={{ opacity: entry, transform: `translateX(${interpolate(entry, [0, 1], [14, 0])}px)`, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 2 ? 12 : 0, fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                {icon}<span>{text}</span>
              </div>
            ))}
          </GlassCard>
          <div style={{ opacity: noteE, marginTop: 14, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}44`, borderRadius: 12, padding: "12px 18px", fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            AWS Heroes are <strong style={{ color: GD_ACCENT }}>NOT AWS employees</strong>. They are independent community members selected by AWS for their outstanding contributions.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 - What are AWS Cloud Clubs?
// ═══════════════════════════════════════════════════════════════════════════════
const SlideCloudClubs: React.FC = () => {
  const badgeE = useEntry(0);
  const cards = [
    { icon: <GraduationIcon size={32} color={GD_VIOLET} />, title: "Student-focused groups", body: "AWS Cloud Clubs are communities for students and young professionals at universities and colleges. They focus on learning cloud technology early in people's careers." },
    { icon: <BookOpenIcon size={32} color={GD_PINK} />, title: "Hands-on learning", body: "Cloud Clubs run workshops, study sessions, and certification prep. Members get hands-on access to AWS and learn by building real projects together." },
    { icon: <RocketIcon size={32} color={GD_GOLD} />, title: "The next generation", body: "Cloud Clubs are growing rapidly across Europe. They represent the future of the AWS Community - today's students become tomorrow's User Group leaders and Heroes." },
  ];
  const noteE = useStagger(4, 8);
  const overviewE = useStagger(5, 8);
  
  const programs = [
    { logo: staticFile("assets/programs/aws-usergroups-badge.png"), label: "User Groups", sub: "For professionals" },
    { logo: staticFile("assets/programs/aws-cloud-clubs-logo.png"), label: "Cloud Clubs", sub: "For students" },
    { logo: staticFile("assets/programs/aws-builders-logo.png"), label: "Builders", sub: "For content creators" },
    { logo: staticFile("assets/programs/aws-heroes-logo.png"), label: "Heroes", sub: "For top contributors" },
  ];
  
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 8, marginTop: -8 }}>
        <div style={{ opacity: badgeE, transform: `scale(${interpolate(badgeE, [0, 1], [0.85, 1])})` }}>
          <Img src={staticFile("assets/programs/aws-cloud-clubs-logo.png")} style={{ width: 140, height: "auto", objectFit: "contain" }} />
        </div>
        <SectionLabel icon={<GraduationIcon size={20} color={GD_ACCENT} />} text="What are AWS Cloud Clubs?" />
      </div>
      <div style={{ display: "flex", gap: 18, width: "100%", maxWidth: 1060, marginBottom: 14 }}>
        {cards.map((c, i) => <InfoCard key={c.title} icon={c.icon} title={c.title} body={c.body} accent={[GD_VIOLET, GD_PINK, GD_GOLD][i]} delay={i} />)}
      </div>
      <div style={{ opacity: overviewE, transform: `translateY(${interpolate(overviewE, [0, 1], [8, 0])}px)`, width: "100%", maxWidth: 1060, marginBottom: 10, marginTop: 10 }}>
        <div style={{ fontSize: TYPOGRAPHY.body, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 3, textAlign: "center" }}>
          All AWS Community Programs
        </div>
      </div>
      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [12, 0])}px)`, width: "100%", maxWidth: 1060 }}>
        <GlassCard style={{ padding: "22px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {programs.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Img src={item.logo} style={{ height: 64, width: "auto", objectFit: "contain" }} />
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: TYPOGRAPHY.h6 }}>{item.label}</div>
                  <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 - Schedule V3
// ═══════════════════════════════════════════════════════════════════════════════
const SlideSchedule: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const sc = calculateCountdown(frame, 0, STREAM_START, fps);
  const gc = calculateCountdown(frame, 0, GAME_START, fps);
  // Audio test is 5 min before stream (17:55 CET)
  const audioTestCountdown = sc - 5 * 60;

  // Helper to format countdown as "in X min"
  const formatMinutes = (seconds: number) => {
    if (seconds <= 0) return "now";
    const mins = Math.ceil(seconds / 60);
    return `in ${mins} min`;
  };

  const phases = [
    { time: "17:30", label: "Pre-Show Loop", desc: "This muted loop plays until the live stream begins", c: GD_ACCENT, audio: false, countdown: null },
    { time: AUDIO_CHECK.split(" ")[0], label: "Audio Test", desc: "Test your audio setup - 5 minutes before the live stream starts", c: GD_VIOLET, audio: true, countdown: audioTestCountdown > 0 ? audioTestCountdown : null },
    { time: STREAM_START_LABEL.split(" ")[0], label: "Live Stream Begins", desc: `${HOST.fullName ?? HOST.name} · ${ORGANIZERS[1].name} & ${ORGANIZERS[0].name} · Special guest · ${GM_LABEL} - GameDay instructions`, c: GD_PINK, audio: true, countdown: sc },
    { time: GAME_START_LABEL.split(" ")[0], label: "GameDay Starts!", desc: "2 hours of competitive AWS challenges - stream muted", c: GD_GOLD, audio: false, countdown: gc, hl: true },
    { time: GAME_END_LABEL.split(" ")[0], label: "Closing Ceremony", desc: "Winners revealed globally - audio returns!", c: GD_ORANGE, audio: true, countdown: null },
  ];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<CalendarIcon size={20} color={GD_ACCENT} />} text="Today's Schedule (CET)" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 900 }}>
        {phases.map((ph, i) => {
          const o = useStagger(i, 7);
          return (
            <div key={ph.label} style={{ opacity: o, transform: `translateX(${interpolate(o, [0, 1], [26, 0])}px)`, display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 16, background: ph.hl ? `${GD_GOLD}0a` : "rgba(255,255,255,0.04)", border: `1px solid ${ph.c}${ph.hl ? "33" : "22"}`, borderLeft: `4px solid ${ph.c}` }}>
              <div style={{ flexShrink: 0, textAlign: "center", width: 90 }}>
                <div style={{ fontSize: TYPOGRAPHY.h5, fontWeight: 800, color: ph.c, fontFamily: "monospace", lineHeight: 1 }}>{ph.time}</div>
                <div style={{ fontSize: TYPOGRAPHY.overline, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>CET</div>
                <div style={{ fontSize: TYPOGRAPHY.overline, color: ph.audio ? "#4ade80" : "#f87171", marginTop: 2, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                  {ph.audio ? <VolumeIcon size={10} color="#4ade80" /> : <VolumeMuteIcon size={10} color="#f87171" />}
                  {ph.audio ? "Audio" : "Muted"}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 700, color: "white" }}>{ph.label}</div>
                <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{ph.desc}</div>
              </div>
              {ph.countdown != null && ph.countdown > 0 && (
                <div style={{ flexShrink: 0, fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: ph.c, minWidth: 80, textAlign: "right" }}>
                  {formatMinutes(ph.countdown)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {(() => { const o = useStagger(6, 7); return <div style={{ opacity: o, marginTop: 12, fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>Broadcast simultaneously to all {USER_GROUPS.length} User Groups across {EVENT_REGION}</div>; })()}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 - How It Works
// ═══════════════════════════════════════════════════════════════════════════════
const SlideHowItWorks: React.FC = () => {
  const steps = [
    { n: "1", icon: <UsersIcon size={24} color={GD_VIOLET} />, title: "Form your team", body: "Gather your team at your local venue before the stream. Your organizer will tell you the team size." },
    { n: "2", icon: <VolumeIcon size={24} color={GD_PINK} />, title: "Watch the instructions", body: `At ${STREAM_START_LABEL} the live stream explains all rules. ${GM_LABEL} cover everything at ${GM_INSTRUCTIONS_TIME}.` },
    { n: "3", icon: <CheckCircleIcon size={24} color={GD_GOLD} />, title: "Get your team code", body: `At ${CODES_TIME} your local UG leader gives your team an AWS access code - 5 minutes before the game starts.` },
    { n: "4", icon: <CodeIcon size={24} color={GD_ORANGE} />, title: "Compete for 2 hours", body: `Complete AWS challenges, earn points, and try to be the best team across all ${USER_GROUPS.length} cities.` },
    { n: "5", icon: <TrophyIcon size={24} color={GD_ACCENT} />, title: "Watch the closing", body: `At ${GAME_END_LABEL} the stream returns live. Global winners revealed. Stay and celebrate with everyone!` },
  ];
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<GamepadIcon size={20} color={GD_ACCENT} />} text={`How the ${EVENT_NAME} Works`} />
      <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 1060 }}>
        {steps.map((step, i) => {
          const o = useStagger(i, 7);
          return (
            <div key={step.n} style={{ flex: 1, opacity: o, transform: `translateY(${interpolate(o, [0, 1], [20, 0])}px)`, background: "rgba(255,255,255,0.04)", border: `1px solid ${GD_VIOLET}28`, borderRadius: 16, padding: "20px 14px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${GD_PURPLE}, ${GD_VIOLET})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: TYPOGRAPHY.captionSmall, fontWeight: 800, color: "white", marginBottom: 10 }}>{step.n}</div>
              <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "white", marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, marginBottom: 12 }}>{step.body}</div>
              <div style={{ marginTop: "auto" }}>{step.icon}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 13 - All Organizers
// ═══════════════════════════════════════════════════════════════════════════════
const SlideAllOrganizers: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -25 }}>
    <SectionLabel icon={<UsersIcon size={20} color={GD_ACCENT} />} text="The Team Behind This Event" />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 1140, marginBottom: 24 }}>
      {ORGANIZERS.map((p, i) => {
        const o = useStagger(i, 5);
        const pUG = getOrganizerUserGroup(p);
        const logo = pUG ? findLogo(pUG) : null;
        return (
          <div key={p.name} style={{ opacity: o, transform: `translateY(${interpolate(o, [0, 1], [14, 0])}px)`, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.05)", border: `1px solid ${GD_PURPLE}33`, borderRadius: 14, padding: "14px 18px", width: 350 }}>
            <Img src={staticFile(p.face)} style={{ width: 56, height: 56, borderRadius: 28, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "white" }}>{p.flag} {p.name}</div>
              <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: GD_ACCENT, marginTop: 2 }}>{getOrganizerRole(p)}</div>
              <div style={{ fontSize: TYPOGRAPHY.overline, color: "rgba(255,255,255,0.4)" }}>{p.location}</div>
            </div>
            {logo && (
              <div style={{ width: 130, height: 75, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.05)" }}>
                <Img src={logo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
    {(() => {
      const o = useStagger(ORGANIZERS.length, 5);
      return <div style={{ opacity: o, fontSize: TYPOGRAPHY.body, fontWeight: 700, color: GD_ORANGE, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}><GamepadIcon size={20} color={GD_ORANGE} /> AWS Support &amp; Gamemasters</div>;
    })()}
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 1140 }}>
      {AWS_SUPPORTERS.map((p, i) => {
        const o = useStagger(ORGANIZERS.length + 1 + i, 5);
        return (
          <div key={p.name} style={{ opacity: o, transform: `translateY(${interpolate(o, [0, 1], [12, 0])}px)`, display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.05)", border: `1px solid ${GD_ORANGE}28`, borderRadius: 14, padding: "14px 18px", width: 290 }}>
            <Img src={staticFile(p.face)} style={{ width: 56, height: 56, borderRadius: 28, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "white" }}>{p.flag} {p.name}</div>
              <div style={{ fontSize: TYPOGRAPHY.labelSmall, color: GD_ORANGE, marginTop: 2, lineHeight: 1.4 }}>{getOrganizerRole(p)}</div>
              <div style={{ fontSize: TYPOGRAPHY.overline, color: "rgba(255,255,255,0.4)" }}>{p.location}</div>
            </div>
          </div>
        );
      })}
    </div>
  </AbsoluteFill>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 14 - Get Ready
// ═══════════════════════════════════════════════════════════════════════════════
const SlideGetReady: React.FC = () => {
  const items = [
    { icon: <UsersIcon size={20} color={GD_VIOLET} />, text: "Form your team locally before the stream starts" },
    { icon: <CalendarIcon size={20} color={GD_PINK} />, text: `Be seated with audio ready 5 minutes before ${STREAM_START_LABEL}`, subtext: `Audio test at ${AUDIO_CHECK} (~30 sec) - make sure you can hear the stream host` },
    { icon: <BroadcastIcon size={20} color={GD_ACCENT} />, text: `Watch the live stream carefully - the rules are explained live by ${GM_LABEL}` },
    { icon: <CheckCircleIcon size={20} color={GD_ORANGE} />, text: `Your UG leader will distribute team codes at ${CODES_TIME} (5 min before game)` },
    { icon: <GamepadIcon size={20} color={GD_ACCENT} />, text: "Gameplay runs for 2 hours - stream is muted during this time" },
    { icon: <TrophyIcon size={20} color={GD_GOLD} />, text: `Stay in the stream - audio returns at ${GAME_END_LABEL} for the global winners reveal` },
    { icon: <HeartIcon size={20} color={GD_PINK} />, text: "After the ceremony your local UG continues with their own local schedule" },
  ];
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<CheckCircleIcon size={20} color={GD_ACCENT} />} text="Get Ready - Your Checklist" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800, width: "100%" }}>
        {items.map((item, i) => {
          const o = useStagger(i, 6);
          return (
            <div key={i} style={{ opacity: o, transform: `translateX(${interpolate(o, [0, 1], [20, 0])}px)`, display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.88)" }}>
              {item.icon}
              <div style={{ display: "flex", flexDirection: "column", gap: item.subtext ? 6 : 0 }}>
                <span style={{ lineHeight: 1.4 }}>{item.text}</span>
                {item.subtext && (
                  <>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "100%" }} />
                    <span style={{ lineHeight: 1.4, fontSize: TYPOGRAPHY.bodySmall, color: GD_GOLD, display: "flex", alignItems: "center", gap: 8 }}>
                      <VolumeIcon size={16} color={GD_GOLD} />{item.subtext}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 15 - Audio Check Countdown (shows time until live audio check)
// ═══════════════════════════════════════════════════════════════════════════════
// Audio check happens at 17:55 CET (5 minutes before stream at 18:00)
// That's 25 minutes into the preshow (which starts at 17:30)
const AUDIO_CHECK_TIME = 25; // minutes from event start

const SlideAudioCheckCountdown: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  // Calculate countdown to audio check (25 min from event start = 17:55 CET)
  const audioCheckCountdown = calculateCountdown(frame, 0, AUDIO_CHECK_TIME, fps);
  const pulse = usePulse(48);
  const o = useEntry(0);
  const itemsE = useStagger(3, 7);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ opacity: o, transform: `scale(${interpolate(o, [0, 1], [0.88, 1])})`, textAlign: "center" }}>
        <div style={{ transform: `scale(${pulse})`, display: "flex", justifyContent: "center" }}>
          <VolumeIcon size={80} color={GD_GOLD} />
        </div>
        <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: GD_GOLD, letterSpacing: -1, marginTop: 12, textShadow: `0 0 40px ${GD_ORANGE}66` }}>AUDIO CHECK COMING UP</div>
        <div style={{ fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 8 }}>{HOST.fullName ?? HOST.name} will speak live at {AUDIO_CHECK} to test your audio</div>
      </div>

      {/* Countdown to audio check */}
      <div style={{ opacity: o, display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, color: GD_PINK, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>
          Audio check in
        </div>
        <div style={{
          fontFamily: "monospace",
          fontSize: TYPOGRAPHY.h3,
          fontWeight: 800,
          color: GD_PINK,
          background: `${GD_PURPLE}33`,
          border: `1px solid ${GD_PINK}44`,
          borderRadius: 12,
          padding: "8px 20px",
          transform: `scale(${pulse})`,
        }}>
          {formatTime(audioCheckCountdown)}
        </div>
      </div>

      {/* Instructions */}
      <div style={{ opacity: itemsE, transform: `translateY(${interpolate(itemsE, [0, 1], [12, 0])}px)`, display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 680, marginTop: 8 }}>
        {[
          { icon: <CheckCircleIcon size={18} color="#4ade80" />, text: "Make sure your venue audio is connected to this stream", c: "#4ade80" },
          { icon: <VolumeIcon size={18} color="#4ade80" />, text: `When the audio check starts, you should hear ${HOST.fullName ?? HOST.name} speaking`, c: "#4ade80" },
          { icon: <BookOpenIcon size={18} color={GD_GOLD} />, text: "If audio fails, use the backup video that the GameDay organizers shared", c: GD_GOLD },
          { icon: <VolumeMuteIcon size={18} color={GD_ACCENT} />, text: `Stream is muted again during gameplay (${GAME_START_LABEL} - ${GAME_END_LABEL})`, c: GD_ACCENT },
        ].map((item, i) => {
          const io = useStagger(4 + i, 6);
          return (
            <div key={i} style={{ opacity: io, transform: `translateX(${interpolate(io, [0, 1], [14, 0])}px)`, display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12 }}>
              {item.icon}<span style={{ fontSize: TYPOGRAPHY.bodySmall, color: item.c, fontWeight: 500, lineHeight: 1.4 }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE - Live Audio Check (5 minutes before stream, Linda speaking)
// ═══════════════════════════════════════════════════════════════════════════════
const SlideLiveAudioCheck: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const sc = calculateCountdown(frame, 0, STREAM_START, fps);
  const pulse = usePulse(36);
  const o = useEntry(0);
  const textE = useStagger(3, 8);
  const itemsE = useStagger(6, 8);
  const noteE = useStagger(10, 8);

  // Speaking animation - pulsing ring around Linda's photo
  const speakPulse = interpolate(frame % 30, [0, 15, 30], [1, 1.08, 1]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      {/* Linda speaking indicator */}
      <div style={{ opacity: o, display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ position: "relative" }}>
          {/* Pulsing ring to indicate speaking */}
          <div style={{
            position: "absolute",
            top: -8,
            left: -8,
            right: -8,
            bottom: -8,
            borderRadius: "50%",
            border: `3px solid ${GD_ORANGE}`,
            transform: `scale(${speakPulse})`,
            opacity: 0.6,
          }} />
          <div style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            overflow: "hidden",
            border: `4px solid ${GD_ORANGE}`,
            boxShadow: `0 0 40px ${GD_ORANGE}55`,
          }}>
            <Img src={staticFile(HOST.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {/* Speaking icon */}
          <div style={{
            position: "absolute",
            bottom: -4,
            right: -4,
            background: GD_ORANGE,
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulse})`,
          }}>
            <VolumeIcon size={18} color="white" />
          </div>
        </div>
        <div>
          <div style={{ fontSize: TYPOGRAPHY.label, color: GD_ORANGE, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <BroadcastIcon size={14} color={GD_ORANGE} /> Live Audio
          </div>
          <div style={{ fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: "white" }}>{HOST.fullName ?? HOST.name}</div>
          <div style={{ fontSize: TYPOGRAPHY.bodySmall, color: GD_ACCENT, marginTop: 2 }}>Stream Host</div>
        </div>
      </div>

      {/* Main message */}
      <div style={{ opacity: textE, transform: `translateY(${interpolate(textE, [0, 1], [16, 0])}px)`, textAlign: "center", marginTop: 4 }}>
        <div style={{ fontSize: TYPOGRAPHY.h2, fontWeight: 900, color: GD_GOLD, letterSpacing: -1, textShadow: `0 0 40px ${GD_ORANGE}55` }}>
          Find a Seat
        </div>
        <div style={{ fontSize: TYPOGRAPHY.h5, color: "white", fontWeight: 500, marginTop: 8 }}>
          The live stream begins shortly
        </div>
      </div>

      {/* Countdown */}
      <div style={{ opacity: textE, display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, color: GD_PINK, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>
          Stream starts in
        </div>
        <div style={{
          fontFamily: "monospace",
          fontSize: TYPOGRAPHY.h3,
          fontWeight: 800,
          color: GD_PINK,
          background: `${GD_PURPLE}33`,
          border: `1px solid ${GD_PINK}44`,
          borderRadius: 12,
          padding: "8px 20px",
          transform: `scale(${pulse})`,
        }}>
          {formatTime(sc)}
        </div>
      </div>

      {/* Instructions */}
      <div style={{ opacity: itemsE, transform: `translateY(${interpolate(itemsE, [0, 1], [12, 0])}px)`, display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 720, marginTop: 8 }}>
        {[
          { icon: <VolumeIcon size={18} color="#4ade80" />, text: `Audio is ON - can you hear ${HOST.fullName ?? HOST.name}?`, c: "#4ade80" },
          { icon: <UsersIcon size={18} color={GD_GOLD} />, text: "Gather your team and get comfortable", c: GD_GOLD },
          { icon: <BroadcastIcon size={18} color={GD_ACCENT} />, text: "Keep the stream on - all important info will be displayed on screen", c: GD_ACCENT },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 18px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${item.c}33`,
            borderRadius: 12,
          }}>
            {item.icon}
            <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: item.c, fontWeight: 500 }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Backup video note */}
      <div style={{ opacity: noteE, transform: `translateY(${interpolate(noteE, [0, 1], [10, 0])}px)`, width: "100%", maxWidth: 720, marginTop: 6, background: `${GD_PURPLE}22`, border: `1px solid ${GD_PURPLE}44`, borderRadius: 12, padding: "10px 18px", fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, textAlign: "center" }}>
        <strong style={{ color: GD_ACCENT }}>Audio issues?</strong> Use the backup video that the GameDay organizers shared. A backup video for the instructions will also be sent.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE - Last Checklist (20-15 seconds before stream - teams formed, ready to go)
// ═══════════════════════════════════════════════════════════════════════════════
const SlideLastChecklist: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const sc = calculateCountdown(frame, 0, STREAM_START, fps);
  const o = useEntry(0);
  const itemsE = useStagger(2, 6);

  const items = [
    { icon: <CheckCircleIcon size={20} color="#4ade80" />, text: `Audio test complete - you heard ${HOST.fullName ?? HOST.name} at 17:55`, done: true },
    { icon: <UsersIcon size={20} color="#4ade80" />, text: "Team formed and sitting together", done: true },
    { icon: <VolumeIcon size={20} color="#4ade80" />, text: "Stream audio is ON", done: true },
    { icon: <BroadcastIcon size={20} color={GD_GOLD} />, text: "Stream starts in seconds - stay tuned!", done: false },
  ];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: o, textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, fontWeight: 700, color: GD_ACCENT, letterSpacing: 4, textTransform: "uppercase" as const, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <CheckCircleIcon size={16} color={GD_ACCENT} /> Ready to Go
        </div>
        <div style={{ fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: "white" }}>You're All Set!</div>
      </div>

      {/* Countdown */}
      <div style={{ opacity: o, display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ fontSize: TYPOGRAPHY.label, color: GD_PINK, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>
          Stream in
        </div>
        <div style={{
          fontFamily: "monospace",
          fontSize: TYPOGRAPHY.h3,
          fontWeight: 800,
          color: GD_PINK,
          background: `${GD_PURPLE}33`,
          border: `1px solid ${GD_PINK}44`,
          borderRadius: 12,
          padding: "8px 20px",
        }}>
          {formatTime(sc)}
        </div>
      </div>

      {/* Checklist items */}
      <div style={{ opacity: itemsE, transform: `translateY(${interpolate(itemsE, [0, 1], [12, 0])}px)`, display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 580 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            background: item.done ? "rgba(74, 222, 128, 0.08)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${item.done ? "rgba(74, 222, 128, 0.25)" : `${GD_GOLD}33`}`,
            borderRadius: 12,
          }}>
            {item.icon}
            <span style={{ fontSize: TYPOGRAPHY.body, color: item.done ? "#4ade80" : GD_GOLD, fontWeight: 600 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE - Final Countdown (last 15 seconds before stream starts at 18:00)
// ═══════════════════════════════════════════════════════════════════════════════
const SlideFinalCountdown: React.FC = () => {
  const frame = useContext(GlobalFrameCtx);
  const { fps } = useVideoConfig();
  const sc = calculateCountdown(frame, 0, STREAM_START, fps);
  const o = useEntry(0);
  
  // Gentle pulse - not aggressive
  const gentlePulse = interpolate(frame % 45, [0, 22, 45], [1, 1.03, 1]);

  return (
    <AbsoluteFill style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
    }}>
      {/* Header */}
      <div style={{ 
        opacity: o, 
        fontSize: TYPOGRAPHY.label, 
        fontWeight: 700, 
        color: GD_ACCENT, 
        letterSpacing: 4, 
        textTransform: "uppercase" as const,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <BroadcastIcon size={16} color={GD_ACCENT} />
        Stream Starting
      </div>

      {/* Countdown number - large but calm */}
      <div style={{ 
        opacity: o,
        transform: `scale(${gentlePulse})`,
        fontFamily: "monospace",
        fontSize: 180,
        fontWeight: 900,
        color: GD_GOLD,
        lineHeight: 1,
        textShadow: `0 0 40px ${GD_GOLD}44`,
        marginBottom: 20,
      }}>
        {sc}
      </div>

      {/* Audio reminder - subtle */}
      <div style={{ 
        opacity: o,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: `${GD_PURPLE}22`,
        border: `1px solid ${GD_GOLD}33`,
        borderRadius: 16,
        padding: "14px 28px",
      }}>
        <VolumeIcon size={24} color={GD_GOLD} />
        <div style={{ 
          fontSize: TYPOGRAPHY.h5, 
          fontWeight: 600, 
          color: "white",
        }}>
          Audio should be ON
        </div>
      </div>

      {/* Subtext */}
      <div style={{ 
        opacity: o,
        fontSize: TYPOGRAPHY.bodySmall, 
        color: "rgba(255,255,255,0.5)", 
        marginTop: 16,
      }}>
        The live stream begins shortly
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 16 - Stats V3
// ═══════════════════════════════════════════════════════════════════════════════
const SlideStats: React.FC = () => {
  const stats = resolveStats(DISPLAY_STATS).map((s, i) => ({ v: s.v, l: s.l, sub: s.sub, c: STAT_COLORS_PRESHOW[i % STAT_COLORS_PRESHOW.length] }));
  const mapE = useStagger(5, 8);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SectionLabel icon={<TrophyIcon size={20} color={GD_ACCENT} />} text={`${EVENT_NAME} - By the Numbers`} />
      <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
        {stats.map((s, i) => {
          const o = useStagger(i, 8);
          return (
            <div key={s.l} style={{ opacity: o, transform: `scale(${interpolate(o, [0, 1], [0.82, 1])})`, background: "rgba(255,255,255,0.04)", border: `1px solid ${s.c}28`, borderRadius: 20, padding: "28px 36px", textAlign: "center", minWidth: 190 }}>
              <div style={{ fontSize: TYPOGRAPHY.stat, fontWeight: 900, color: s.c, lineHeight: 1, textShadow: `0 0 30px ${s.c}44` }}>{s.v}</div>
              <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 700, color: "white", marginTop: 8 }}>{s.l}</div>
              <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.sub}</div>
            </div>
          );
        })}
      </div>
      <div style={{ opacity: mapE, transform: `translateY(${interpolate(mapE, [0, 1], [18, 0])}px)`, maxWidth: 720, overflow: "hidden", borderRadius: 16 }}>
        <Img src={EUROPE_MAP} style={{ width: "100%", transform: "scale(1.3)", transformOrigin: "center center", opacity: 0.85, borderRadius: 12 }} />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 17 - UG Spotlight V3 (with logo)
// ═══════════════════════════════════════════════════════════════════════════════
const SlideUGSpotlight: React.FC<{ index: number }> = ({ index }) => {
  const g = SHUFFLED[index % SHUFFLED.length];
  const logo = findLogo(g.name);
  const flagE = useEntry(0, springConfig.emphasis);
  const nameE = useStagger(4, 8);
  const detailsE = useStagger(6, 8);
  const pulse = usePulse(90);
  const displayNum = (index % USER_GROUPS.length) + 1;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: flagE, fontSize: TYPOGRAPHY.labelSmall, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 5, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <StarIcon size={12} color={GD_ACCENT} /> Competing Today
      </div>

      {/* Logo (bigger) or flag (only if no logo) */}
      <div style={{ opacity: flagE, transform: `scale(${interpolate(flagE, [0, 1], [0.7, 1]) * pulse})`, marginBottom: 20 }}>
        {logo ? (
          <Img src={logo} style={{ maxWidth: 420, maxHeight: 180, objectFit: "contain", borderRadius: 16 }} />
        ) : (
          <div style={{ fontSize: 130, lineHeight: 1, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))" }}>{g.flag}</div>
        )}
      </div>

      {/* Name */}
      <div style={{ opacity: nameE, transform: `translateY(${interpolate(nameE, [0, 1], [22, 0])}px)`, textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: TYPOGRAPHY.h2, fontWeight: 900, color: "white", lineHeight: 1.05, maxWidth: 900, background: `linear-gradient(135deg, #fff, ${GD_ACCENT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{g.name}</div>
        <div style={{ fontSize: TYPOGRAPHY.h5, color: GD_ACCENT, marginTop: 8, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <LocationIcon size={14} color={GD_ACCENT} /> {g.location}
        </div>
      </div>

      {/* Stats - bigger */}
      <div style={{ opacity: detailsE, transform: `translateY(${interpolate(detailsE, [0, 1], [14, 0])}px)`, display: "flex", gap: 18, marginTop: 14 }}>
        {[
          { label: "Group", value: `${displayNum} of ${USER_GROUPS.length}`, c: GD_VIOLET },
          { label: "Country", value: `${g.flag} ${g.location.split(", ")[1]?.trim()}`, c: GD_GOLD },
          { label: "City", value: g.location.split(",")[0]?.trim(), c: "#4ade80" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${stat.c}33`, borderRadius: 14, padding: "12px 24px", textAlign: "center" }}>
            <div style={{ fontSize: TYPOGRAPHY.label, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{stat.label}</div>
            <div style={{ fontSize: TYPOGRAPHY.body, fontWeight: 700, color: stat.c }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD THE SECTION SEQUENCE
// ═══════════════════════════════════════════════════════════════════════════════
type Section = { key: string; name: string; dur: number; el: React.ReactNode };

// ─── Content slide definitions (single source of truth) ──────────────────────
const CONTENT_SLIDES: { key: string; name: string; el: React.ReactNode }[] = [
  { key: "hero", name: "Hero + Countdown", el: <SlideHero /> },
  { key: "whats-happening", name: "What's Happening?", el: <SlideWhatsHappening /> },
  { key: "meet-linda", name: `Meet ${HOST.fullName ?? HOST.name}`, el: <SlideMeetHost /> },
  { key: "meet-co-organizers", name: `Meet ${CO_ORG_LABEL}`, el: <SlideMeetCoOrganizers /> },
  { key: "meet-gamemasters", name: `Meet ${GM_LABEL}`, el: <SlideMeetGamemasters /> },
  { key: "aws-community", name: "What is the AWS Community?", el: <SlideAWSCommunity /> },
  { key: "ug-leader", name: "What is a UG Leader?", el: <SlideUGLeader /> },
  { key: "community-builder", name: "What is a Community Builder?", el: <SlideCommunityBuilder /> },
  { key: "community-hero", name: "What is a Community Hero?", el: <SlideCommunityHero /> },
  { key: "cloud-clubs", name: "What are Cloud Clubs?", el: <SlideCloudClubs /> },
  { key: "schedule", name: "Today's Schedule", el: <SlideSchedule /> },
  { key: "how-it-works", name: "How GameDay Works", el: <SlideHowItWorks /> },
  { key: "all-organizers", name: "The Full Team", el: <SlideAllOrganizers /> },
  { key: "stats", name: "By the Numbers", el: <SlideStats /> },
  { key: "get-ready", name: "Get Ready", el: <SlideGetReady /> },
  { key: "audio-check-countdown", name: "Audio Check Countdown", el: <SlideAudioCheckCountdown /> },
];

const NUM_CYCLES = 2;

function buildSections(): Section[] {
  const out: Section[] = [];
  let ugIdx = 0;

  const nextUGs = (count: number) => {
    for (let i = 0; i < count; i++) {
      const idx = ugIdx % SHUFFLED.length;
      out.push({ key: `ug-${ugIdx}`, name: `UG: ${SHUFFLED[idx].name}`, dur: U, el: <Wrap><SlideUGSpotlight index={ugIdx} /></Wrap> });
      ugIdx++;
    }
  };

  for (let cycle = 1; cycle <= NUM_CYCLES; cycle++) {
    for (let i = 0; i < CONTENT_SLIDES.length; i++) {
      const s = CONTENT_SLIDES[i];
      out.push({ key: `${s.key}-${cycle}`, name: s.name, dur: S, el: <Wrap>{s.el}</Wrap> });
      // Insert 3 UG spotlights after each content slide (except the last in each cycle)
      if (i < CONTENT_SLIDES.length - 1) nextUGs(3);
    }
  }

  // Final hero bookend
  out.push({ key: "hero-end", name: "Hero (Final)", dur: S, el: <Wrap><SlideHero /></Wrap> });

  return out;
}

// ─── Transitions ──────────────────────────────────────────────────────────────
const TRANSITIONS = [
  () => fade(),
  () => slide({ direction: "from-left" }),
  () => fade(),
  () => slide({ direction: "from-bottom" }),
  () => fade(),
  () => slide({ direction: "from-right" }),
];

// ─── Live Audio Check timing ──────────────────────────────────────────────────
// 5 minutes before stream starts = 25 minutes into preshow
// At 30fps: 25 * 60 * 30 = 45000 frames
// Duration: 30 seconds = 900 frames
const LIVE_AUDIO_CHECK_START = 45000;
const LIVE_AUDIO_CHECK_DURATION = 900;

// ─── Final sequence timing ────────────────────────────────────────────────────
// Stream starts at 30 minutes = 30 * 60 * 30 = 54000 frames
// Last checklist: 00:20 to 00:15 before stream (frames 53400 to 53550)
// Final countdown: 00:15 to 00:00 before stream (frames 53550 to 54000)
const STREAM_START_FRAME = 54000;
const LAST_CHECKLIST_START = 53400;  // 20 seconds before stream
const FINAL_COUNTDOWN_START = 53550; // 15 seconds before stream

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export const InfoLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const sections = buildSections();

  // Check if we're in the live audio check window (17:55 CET, 30 seconds)
  const isLiveAudioCheck = frame >= LIVE_AUDIO_CHECK_START && frame < LIVE_AUDIO_CHECK_START + LIVE_AUDIO_CHECK_DURATION;
  
  // Check if we're in the last checklist window (20-15 seconds before stream)
  const isLastChecklist = frame >= LAST_CHECKLIST_START && frame < FINAL_COUNTDOWN_START;
  
  // Check if we're in the final countdown window (last 15 seconds before 18:00)
  const isFinalCountdown = frame >= FINAL_COUNTDOWN_START && frame < STREAM_START_FRAME;

  return (
    <GlobalFrameCtx.Provider value={frame}>
      {isFinalCountdown ? (
        // Final 15-second countdown
        <Wrap muted={false}>
          <SlideFinalCountdown />
        </Wrap>
      ) : isLastChecklist ? (
        // Last checklist (20-15 seconds before stream)
        <Wrap muted={false}>
          <SlideLastChecklist />
        </Wrap>
      ) : isLiveAudioCheck ? (
        // Show the live audio check slide with audio ON
        <Wrap muted={false}>
          <SlideLiveAudioCheck />
        </Wrap>
      ) : (
        // Normal preshow loop
        <TransitionSeries>
          {sections.map((s, i) => {
            const items: React.ReactNode[] = [];
            if (i > 0) {
              items.push(
                <TransitionSeries.Transition key={`t-${s.key}`} presentation={TRANSITIONS[i % TRANSITIONS.length]()} timing={linearTiming({ durationInFrames: T })} />
              );
            }
            items.push(
              <TransitionSeries.Sequence key={s.key} durationInFrames={s.dur} name={s.name}>{s.el}</TransitionSeries.Sequence>
            );
            return items;
          })}
        </TransitionSeries>
      )}
    </GlobalFrameCtx.Provider>
  );
};
