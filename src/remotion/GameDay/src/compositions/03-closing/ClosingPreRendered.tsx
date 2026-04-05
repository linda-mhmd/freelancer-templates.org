import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BackgroundLayer,
  HexGridOverlay,
  AudioBadge,
  GlassCard,
} from "../../components";
import {
  GD_DARK,
  GD_GOLD,
  GD_PURPLE,
  GD_VIOLET,
  GD_PINK,
  GD_ACCENT,
  GD_ORANGE,
  TYPOGRAPHY,
} from "../../design";
import { formatTime } from "../../utils/timing";
import { USER_GROUPS, ORGANIZERS, AWS_SUPPORTERS, DISPLAY_STATS, type UserGroup, getOrganizerRole } from "../../../config/participants";
import { EVENT_DATE, EVENT_NAME } from "../../../config/event";
import { resolveStats } from "../../utils/stats";

// Format EVENT_DATE ("2026-03-17") → "17 MARCH 2026"
const [_ey, _em, _ed] = EVENT_DATE.split("-").map(Number);
const EVENT_DATE_DISPLAY = new Date(_ey, _em - 1, _ed).toLocaleDateString("en-GB", {
  day: "numeric", month: "long", year: "numeric",
}).toUpperCase(); // "17 MARCH 2026"

// ── Logo lookup by exact USER_GROUPS name ──
// Cast to UserGroup is safe — `satisfies UserGroup[]` in participants.ts guarantees the shape.
function findLogo(name: string): string | null {
  return (USER_GROUPS.find((g) => g.name === name) as UserGroup | undefined)?.logo ?? null;
}

// ── SVG Icons ──
const ServerIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
    <line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
  </svg>
);
const UsersIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const StarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const HeartIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = GD_ORANGE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ── LogoCover: cover for landscape, contain+centered for square ──
const LogoCover: React.FC<{ logoUrl: string }> = ({ logoUrl }) => {
  const [isSquare, setIsSquare] = React.useState(false);
  return (
    <div style={{ width: "100%", flex: 1, borderRadius: "16px 16px 0 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
      <Img
        src={logoUrl}
        onLoad={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          const ratio = img.naturalWidth / img.naturalHeight;
          if (ratio > 0.85 && ratio < 1.15) setIsSquare(true);
        }}
        style={isSquare
          ? { maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }
          : { width: "100%", height: "100%", objectFit: "cover" }
        }
      />
    </div>
  );
};

// ── Part A Constants ──
const FPS = 30;
const PART_A_TOTAL_FRAMES = 4200; // ~2min20s

// ── Showcase Sub-Phase Timing ──
const HERO_INTRO_END = 1599;
const FAST_SCROLL_START = 1600;
const FAST_SCROLL_END = 1929; // extended +30 frames (1 sec) so last UG logos stay visible longer
const SHUFFLE_START = 1900;
const SHUFFLE_END = 3449;
const FINALE_START = 3270;

// ── Shuffle Constants ──
const SHUFFLE_BAR_WIDTH = 160;
const SHUFFLE_BAR_GAP = 16;
const SHUFFLE_SCORE_MIN = 3000;
const SHUFFLE_SCORE_MAX = 5000;

// ── Derived Data ──
const COUNTRIES = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));
const UNIQUE_FLAGS = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));

// ── Card Accent Colors ──
const CARD_ACCENTS = [GD_VIOLET, GD_PURPLE, GD_PINK, GD_ACCENT, "#6366f1", GD_VIOLET];

// ── Responsive people-grid layout helper ──
// Returns grid layout values for 1–9 people.
function peopleLayout(n: number): { cols: number; imgSize: number; itemW: number; colGap: number; rowGap: number; containerW: number } {
  const cols   = n <= 3 ? n : n === 4 ? 2 : n <= 6 ? 3 : n <= 8 ? 4 : 3;
  const imgSize = n <= 2 ? 150 : n <= 4 ? 135 : n <= 6 ? 125 : 115;
  // colGap reduced slightly for n>6 to give each card more text room within 1280px canvas
  const colGap  = n <= 2 ? 90  : n <= 4 ? 70  : n <= 6 ? 55  : 38;
  const rowGap  = 44;
  // itemW widened for n>6: 195px lets "AWS User Group Leader" fit on one line at 16px
  const itemW   = n <= 6 ? imgSize + 50 : imgSize + 80;
  return { cols, imgSize, itemW, colGap, rowGap, containerW: cols * itemW + (cols - 1) * colGap };
}

// ── Layout for AWS supporters — single row for n<=5, 2-row wrap grid for n>=6 ──
function supportersLayout(n: number): { imgSize: number; itemW: number; gap: number; nameSize: number; roleSize: number; wrap: boolean; containerW: number } {
  if (n >= 6) {
    // Switch to a 2-row wrapping grid so we never overflow the 1280px canvas
    const cols = n <= 6 ? 3 : 4;
    const imgSize = 95;
    const gap = n <= 6 ? 50 : 40;
    const itemW = imgSize + 70; // 165px — fits "Sr. Technical Account Manager, AWS" at 12px
    const containerW = cols * itemW + (cols - 1) * gap;
    return { imgSize, itemW, gap, nameSize: 18, roleSize: 12, wrap: true, containerW };
  }
  const imgSize  = n <= 3 ? 130 : n <= 4 ? 115 : 95;
  // gap reduced slightly for n<=4 to give each card more text room; total still fits in 1280px
  const gap      = n <= 3 ? 70  : n <= 4 ? 45  : 40;
  // itemW widened for n<=4: 205px fits "Sr. Technical Account Manager, AWS" on one line at 13px
  const itemW    = n <= 3 ? imgSize + 56 : n <= 4 ? imgSize + 90 : imgSize + 56;
  const nameSize = n <= 4 ? 22 : 18;
  const roleSize = 13;
  const containerW = n * itemW + (n - 1) * gap;
  return { imgSize, itemW, gap, nameSize, roleSize, wrap: false, containerW };
}

// ── Transition Flash Constants ──
const FLASH_DURATION = 60;
const PHASE_BOUNDARY_FRAMES_A = [0];

// ── SegmentTransitionFlash ──
const SegmentTransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const boundary = PHASE_BOUNDARY_FRAMES_A.find((b) => frame >= b && frame < b + FLASH_DURATION);
  if (boundary === undefined) return null;
  const elapsed = frame - boundary;
  const opacity = interpolate(elapsed, [0, 10, 60], [0, 0.25, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, ${GD_ACCENT}${Math.round(opacity * 120).toString(16).padStart(2, "0")}, transparent 70%)`,
      zIndex: 200, pointerEvents: "none",
    }} />
  );
};

// ── CountUp Helper ──
const CountUp: React.FC<{ target: number; frame: number; startFrame: number; suffix?: string }> = ({
  target, frame, startFrame, suffix = "",
}) => {
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / 60));
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = Math.round(eased * target);
  return <>{value}{suffix}</>;
};

// ── HeroIntro (frames 0-1599): Multi-scene epic closing ceremony intro ──
// Scene 1 (0-179): "WHAT. A. DAY." dramatic text + GameDay logo
// Scene 2 (180-379): Big stats cascade  -  53 groups, 23+ countries, 2 hours
// Scene 3 (380-549): Flag parade  -  all unique country flags
// Scene 4 (550-1009): Organizer shoutout
// Scene 4b (1010-1399): AWS Supporters
// Scene 5 (1400-1599): "AND NOW... THE RESULTS" dramatic transition

const HeroIntro: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();

  // Global exit fade
  const exitOpacity = interpolate(frame, [1550, 1599], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Ambient glow that shifts through scenes
  const glowHue = interpolate(frame, [0, 800, 1599], [270, 320, 280]);
  const glowPulse = Math.sin(frame * 0.04) * 0.15 + 0.5;

  // ── SCENE 1: "WHAT. A. DAY." (frames 0-179) ──
  const s1Opacity = interpolate(frame, [0, 10, 150, 179], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word1Spring = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 10, stiffness: 150 } });
  const word2Spring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 10, stiffness: 150 } });
  const word3Spring = spring({ frame: Math.max(0, frame - 36), fps, config: { damping: 10, stiffness: 150 } });
  const logoFade = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dateFade = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleFade = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── SCENE 2: Stats cascade (frames 160-379)  -  overlaps with scene 1 for crossfade ──
  const s2Opacity = interpolate(frame, [160, 195, 350, 379], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const STATS = [
    ...resolveStats(DISPLAY_STATS).map((s, i) => ({
      value: s.n, label: s.l.toUpperCase(), suffix: s.suffix, delay: 190 + i * 20,
    })),
  ];

  // ── SCENE 3: Flag parade (frames 360-549)  -  overlaps with scene 2 ──
  const s3Opacity = interpolate(frame, [360, 395, 520, 549], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flagTitleSpring = spring({ frame: Math.max(0, frame - 385), fps, config: { damping: 14, stiffness: 120 } });

  // ── SCENE 4: Community Organizers (frames 520-1009) ──
  const s4Opacity = interpolate(frame, [520, 560, 950, 1009], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const orgTitleSpring = spring({ frame: Math.max(0, frame - 555), fps, config: { damping: 14, stiffness: 120 } });

  // ── SCENE 4b: AWS Supporters (frames 1010-1399) ──
  const s4bOpacity = interpolate(frame, [1010, 1060, 1350, 1399], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const awsTitleSpring = spring({ frame: Math.max(0, frame - 1020), fps, config: { damping: 14, stiffness: 120 } });

  // ── SCENE 5: "AND NOW... THE RESULTS" (frames 1400-1599) ──
  const s5Opacity = interpolate(frame, [1400, 1440, 1550, 1599], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const andNowSpring = spring({ frame: Math.max(0, frame - 1440), fps, config: { damping: 12, stiffness: 100 } });
  const resultsSpring = spring({ frame: Math.max(0, frame - 1470), fps, config: { damping: 8, stiffness: 120 } });
  const resultsPulse = frame >= 1480 ? Math.sin((frame - 1480) * 0.08) * 0.08 + 1 : 1;
  const meetBadgeSpring = spring({ frame: Math.max(0, frame - 1510), fps, config: { damping: 14, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 900, height: 900,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, hsl(${glowHue}, 70%, 30%) 0%, transparent 70%)`,
        opacity: glowPulse, borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* ── SCENE 1: "WHAT. A. DAY." ── */}
      {frame < 180 && (
        <AbsoluteFill style={{ opacity: s1Opacity }}>
          {/* Community Europe logo | divider | GameDay logo */}
          <div style={{ position: "absolute", top: 20, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, opacity: logoFade }}>
            <Img src={staticFile("assets/aws-community-logo.png")} style={{ height: 80 }} />
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.3)" }} />
            <Img src={staticFile("assets/logos/gameday-logo-white.png")} style={{ height: 80 }} />
          </div>
          {/* Big dramatic words */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -55%)", display: "flex", gap: 20, alignItems: "baseline" }}>
            {[
              { text: "WHAT", spring: word1Spring, color: "#ffffff" },
              { text: "A", spring: word2Spring, color: GD_ACCENT },
              { text: "DAY", spring: word3Spring, color: GD_PINK },
            ].map((w) => (
              <div key={w.text} style={{
                fontSize: TYPOGRAPHY.h1, fontWeight: 900, fontFamily: "'Inter', sans-serif", letterSpacing: 6,
                color: w.color, opacity: w.spring,
                transform: `translateY(${interpolate(w.spring, [0, 1], [60, 0])}px) scale(${interpolate(w.spring, [0, 1], [0.7, 1])})`,
                textShadow: `0 0 40px ${w.color}40, 0 4px 20px rgba(0,0,0,0.5)`,
              }}>{w.text}.</div>
            ))}
          </div>
          {/* Date */}
          <div style={{ position: "absolute", top: "58%", left: 0, right: 0, textAlign: "center", opacity: dateFade }}>
            <span style={{ fontSize: TYPOGRAPHY.h5, fontWeight: 600, color: GD_GOLD, fontFamily: "'Inter', sans-serif", letterSpacing: 3 }}>{EVENT_DATE_DISPLAY}</span>
          </div>
          {/* Subtitle */}
          <div style={{ position: "absolute", top: "65%", left: 0, right: 0, textAlign: "center", opacity: subtitleFade }}>
            <span style={{ fontSize: TYPOGRAPHY.body, fontWeight: 400, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", letterSpacing: 2 }}>
              THE FIRST {EVENT_NAME.toUpperCase()}
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* ── SCENE 2: Stats cascade ── */}
      {frame >= 160 && frame < 380 && (
        <AbsoluteFill style={{ opacity: s2Opacity }}>
          <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", letterSpacing: 4, textTransform: "uppercase" }}>
              TONIGHT WE MADE HISTORY
            </span>
          </div>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px 60px", maxWidth: 1100,
          }}>
            {STATS.map((stat, i) => {
              const statSpring = spring({ frame: Math.max(0, frame - stat.delay), fps, config: { damping: 12, stiffness: 120 } });
              const accentColors = [GD_ACCENT, GD_VIOLET, GD_PINK, GD_GOLD, GD_ORANGE];
              return (
                <div key={stat.label} style={{
                  textAlign: "center", opacity: statSpring,
                  transform: `translateY(${interpolate(statSpring, [0, 1], [40, 0])}px)`,
                }}>
                  <div style={{
                    fontSize: TYPOGRAPHY.stat, fontWeight: 900, fontFamily: "'Inter', sans-serif",
                    color: accentColors[i], lineHeight: 1,
                    textShadow: `0 0 30px ${accentColors[i]}50`,
                  }}>
                    <CountUp target={stat.value} frame={frame} startFrame={stat.delay} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontSize: TYPOGRAPHY.caption, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 8,
                    letterSpacing: 3, fontFamily: "'Inter', sans-serif",
                  }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* ── SCENE 3: Flag parade ── */}
      {frame >= 360 && frame < 550 && (
        <AbsoluteFill style={{ opacity: s3Opacity }}>
          <div style={{
            position: "absolute", top: 80, left: 0, right: 0, textAlign: "center",
            opacity: flagTitleSpring, transform: `translateY(${interpolate(flagTitleSpring, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ fontSize: TYPOGRAPHY.body, fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", letterSpacing: 4 }}>
              THANK YOU TO EVERY
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.h3, fontWeight: 900, fontFamily: "'Inter', sans-serif", marginTop: 8,
              background: `linear-gradient(135deg, #ffffff, ${GD_ACCENT})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>USER GROUP LEADER</div>
          </div>
          {/* Flag grid */}
          <div style={{
            position: "absolute", top: "42%", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, maxWidth: 900,
          }}>
            {UNIQUE_FLAGS.map((flag, i) => {
              const flagSpring = spring({ frame: Math.max(0, frame - 395 - i * 3), fps, config: { damping: 14, stiffness: 120 } });
              return (
                <div key={i} style={{
                  fontSize: TYPOGRAPHY.flag, opacity: flagSpring,
                  transform: `scale(${interpolate(flagSpring, [0, 1], [0.3, 1])}) translateY(${interpolate(flagSpring, [0, 1], [20, 0])}px)`,
                  filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.4))`,
                }}>{flag}</div>
              );
            })}
          </div>
          {/* Bottom text */}
          <div style={{
            position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center",
            opacity: interpolate(frame, [430, 450], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", letterSpacing: 2 }}>
              {`VOLUNTEERS • ACROSS ALL ${COUNTRIES.length}+ PARTICIPATING COUNTRIES • PURE COMMUNITY SPIRIT`}
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* ── SCENE 4: Organizer shoutout ── */}
      {frame >= 520 && frame < 1010 && (
        <AbsoluteFill style={{ opacity: s4Opacity }}>
          <div style={{
            position: "absolute", top: 40, left: 0, right: 0, textAlign: "center",
            opacity: orgTitleSpring, transform: `translateY(${interpolate(orgTitleSpring, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", letterSpacing: 5 }}>
              COMMUNITY GAMEDAY EUROPE ORGANIZERS
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.h4, fontWeight: 900, fontFamily: "'Inter', sans-serif", marginTop: 8,
              color: GD_VIOLET, letterSpacing: 1,
            }}>From the Community, for the Community</div>
          </div>
          {/* Organizer cards — responsive flex grid, 1-9 people */}
          {(() => {
            const gl = peopleLayout(ORGANIZERS.length);
            return (
              <div style={{
                position: "absolute", top: 130, bottom: 20, left: 0, right: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gl.cols}, ${gl.itemW}px)`,
                  columnGap: gl.colGap,
                  rowGap: gl.rowGap,
                  justifyItems: "center",
                }}>
                  {ORGANIZERS.map((org, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 565 - i * 18), fps, config: { damping: 18, stiffness: 80, mass: 1 } });
                    const cardScale = interpolate(cardSpring, [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return (
                      <div key={org.name} style={{
                        width: gl.itemW, display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                        opacity: cardSpring, transform: `scale(${cardScale}) translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)`,
                      }}>
                        <div style={{
                          width: gl.imgSize, height: gl.imgSize, borderRadius: "50%", overflow: "hidden",
                          boxShadow: `0 0 30px ${GD_VIOLET}70, 0 0 60px ${GD_PURPLE}40, 0 4px 16px rgba(0,0,0,0.4)`,
                        }}>
                          <Img src={staticFile(org.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ textAlign: "center", width: "100%" }}>
                          <div style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 800, color: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
                            {org.name}
                          </div>
                          <div style={{ fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", marginTop: 3, lineHeight: 1.35 }}>
                            {getOrganizerRole(org)}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 2 }}>
                            <span style={{ fontSize: 14 }}>{org.flag}</span>
                            <span style={{ fontSize: TYPOGRAPHY.captionSmall, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>{org.location?.split(", ")[0]}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ── SCENE 4b: AWS Supporters ── */}
      {frame >= 1010 && frame < 1400 && (
        <AbsoluteFill style={{ opacity: s4bOpacity }}>
          <div style={{
            position: "absolute", top: 40, left: 0, right: 0, textAlign: "center",
            opacity: awsTitleSpring, transform: `translateY(${interpolate(awsTitleSpring, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.h3, fontWeight: 900, fontFamily: "'Inter', sans-serif", marginTop: 8,
              color: GD_ORANGE, letterSpacing: 1,
            }}>Thank You, AWS</div>
          </div>
          {/* Subtitle */}
          <div style={{
            position: "absolute", top: 100, left: 0, right: 0, textAlign: "center",
            opacity: interpolate(frame, [1060, 1090], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{ fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>
              Orga Support & Gamemasters making this event possible
            </span>
          </div>
          {/* AWS supporter cards — single row up to n=5, wrapping 2-row grid for n>=6 */}
          {(() => {
            const sl = supportersLayout(AWS_SUPPORTERS.length);
            return (
              <div style={{
                position: "absolute", top: 130, bottom: 180, left: 0, right: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={sl.wrap ? {
                  // n>=6: CSS grid so partial last rows (n=7) are centered, not left-aligned
                  display: "grid",
                  gridTemplateColumns: `repeat(${AWS_SUPPORTERS.length <= 6 ? 3 : 4}, ${sl.itemW}px)`,
                  columnGap: sl.gap,
                  rowGap: sl.gap,
                  justifyItems: "center",
                } : {
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: sl.gap,
                }}>
                  {AWS_SUPPORTERS.map((person, i) => {
                    const cardSpring = spring({ frame: Math.max(0, frame - 1070 - i * 18), fps, config: { damping: 18, stiffness: 80, mass: 1 } });
                    const cardScale = interpolate(cardSpring, [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return (
                      <div key={person.name} style={{
                        width: sl.itemW, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        opacity: cardSpring, transform: `scale(${cardScale}) translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)`,
                      }}>
                        <div style={{
                          width: sl.imgSize, height: sl.imgSize, borderRadius: "50%", overflow: "hidden",
                          boxShadow: `0 0 30px ${GD_ORANGE}70, 0 0 60px ${GD_ORANGE}40, 0 4px 16px rgba(0,0,0,0.4)`,
                          border: `2px solid ${GD_ORANGE}40`,
                        }}>
                          <Img src={staticFile(person.face)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: sl.nameSize, fontWeight: 800, color: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
                            {person.name}
                          </div>
                          <div style={{ fontSize: sl.roleSize, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", marginTop: 3 }}>
                            {getOrganizerRole(person)}
                          </div>
                          {person.location && (
                            <div style={{ fontSize: sl.roleSize - 2, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>
                              {person.location.split(", ")[0]}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Thank-you sentences */}
          <div style={{
            position: "absolute", bottom: 100, left: 60, right: 60, display: "flex", flexDirection: "column", gap: 12, alignItems: "center",
            opacity: interpolate(frame, [1120, 1150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {[
              { icon: <ServerIcon size={28} color={GD_ORANGE} />, text: "The GameDay environment & infrastructure" },
              { icon: <UsersIcon size={28} color={GD_ORANGE} />, text: "Local and remote supporters across Europe" },
              { icon: <StarIcon size={28} color={GD_ORANGE} />, text: "Outstanding support during organization & preparation" },
              { icon: <HeartIcon size={28} color={GD_ORANGE} />, text: "And many more AWS colleagues who made this possible" },
            ].map((item, i) => {
              const itemSpring = spring({ frame: Math.max(0, frame - 1130 - i * 12), fps, config: { damping: 18, stiffness: 80 } });
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: itemSpring, transform: `translateY(${interpolate(itemSpring, [0, 1], [10, 0])}px)` }}>
                  {item.icon}
                  <span style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", letterSpacing: 0.5 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* ── SCENE 5: "AND NOW... THE RESULTS" ── */}
      {frame >= 1400 && (
        <AbsoluteFill style={{ opacity: s5Opacity }}>
          {/* Radial burst */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", width: 1000, height: 1000,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${GD_PURPLE}40 0%, ${GD_PINK}15 40%, transparent 70%)`,
            borderRadius: "50%", opacity: resultsSpring,
          }} />
          <div style={{
            position: "absolute", top: "32%", left: 0, right: 0, textAlign: "center",
            opacity: andNowSpring, transform: `translateY(${interpolate(andNowSpring, [0, 1], [30, 0])}px)`,
          }}>
            <span style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", letterSpacing: 6 }}>
              AND NOW...
            </span>
          </div>
          <div style={{
            position: "absolute", top: "44%", left: 0, right: 0, textAlign: "center",
            opacity: resultsSpring,
            transform: `scale(${resultsPulse * interpolate(resultsSpring, [0, 1], [0.6, 1])})`,
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.h2, fontWeight: 900, fontFamily: "'Inter', sans-serif", letterSpacing: 8,
              background: `linear-gradient(135deg, ${GD_GOLD} 0%, #ffffff 40%, ${GD_GOLD} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textShadow: "none", filter: `drop-shadow(0 0 30px ${GD_GOLD}40)`,
            }}>THE RESULTS</div>
          </div>
          {/* "Meet the communities" badge */}
          <div style={{
            position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center",
            opacity: meetBadgeSpring, transform: `scale(${interpolate(meetBadgeSpring, [0, 1], [0.8, 1])})`,
          }}>
            <div style={{
              background: `linear-gradient(135deg, #4f46e5, ${GD_PINK})`, borderRadius: 12, padding: "10px 28px",
              fontSize: TYPOGRAPHY.captionSmall, fontWeight: 700, color: "#ffffff", fontFamily: "'Inter', sans-serif", letterSpacing: 1,
              display: "flex", alignItems: "center",
            }}>
              <Img src={staticFile("assets/logos/gameday-logo-white.png")} style={{ height: 24, marginRight: 8 }} />
              But first  -  meet the participating communities
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// ── FastScroll (frames 1600-1899): Continuous vertical scroll through all groups ──
const SCROLL_COLS = 3;
const CARD_HEIGHT = 310;
const CARD_GAP = 14;
const SCROLL_ROW_HEIGHT = CARD_HEIGHT + CARD_GAP;
const TOTAL_ROWS = Math.ceil(USER_GROUPS.length / SCROLL_COLS);
const TOTAL_SCROLL_HEIGHT = TOTAL_ROWS * SCROLL_ROW_HEIGHT;
const VIEWPORT_TOP = 8;
const VIEWPORT_HEIGHT_PX = 720 - VIEWPORT_TOP - 8;

const FastScroll: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const scrollFrame = frame - FAST_SCROLL_START;
  const scrollDuration = FAST_SCROLL_END - FAST_SCROLL_START;

  const entryOpacity = interpolate(frame, [1580, 1620], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [1860, 1929], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scrollProgress = interpolate(scrollFrame, [15, scrollDuration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = scrollProgress < 0.5 ? 2 * scrollProgress * scrollProgress : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;

  const maxScroll = TOTAL_SCROLL_HEIGHT - VIEWPORT_HEIGHT_PX;
  const scrollY = eased * maxScroll;
  const glowX = interpolate(eased, [0, 1], [25, 75]);
  const glowY = interpolate(eased, [0, 0.5, 1], [30, 60, 35]);

  const firstVisibleRow = Math.max(0, Math.floor((scrollY - SCROLL_ROW_HEIGHT) / SCROLL_ROW_HEIGHT));
  const lastVisibleRow = Math.min(TOTAL_ROWS - 1, Math.ceil((scrollY + VIEWPORT_HEIGHT_PX + SCROLL_ROW_HEIGHT) / SCROLL_ROW_HEIGHT));

  return (
    <AbsoluteFill style={{ opacity: entryOpacity * exitOpacity }}>
      <div style={{
        position: "absolute", top: `${glowY}%`, left: `${glowX}%`, width: 800, height: 800,
        transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${GD_PURPLE}30 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)", zIndex: 20 }}>
        <div style={{ height: "100%", width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${GD_PURPLE}, ${GD_VIOLET}, ${GD_PINK})`, boxShadow: `0 0 12px ${GD_PINK}60` }} />
      </div>
      <div style={{ position: "absolute", top: VIEWPORT_TOP, left: 0, right: 0, height: 40, background: `linear-gradient(180deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 15, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: `linear-gradient(0deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 15, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: VIEWPORT_TOP, left: 28, right: 28, bottom: 8, overflow: "hidden" }}>
        <div style={{ transform: `translateY(${-scrollY}px)`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: CARD_GAP, width: "100%" }}>
          {USER_GROUPS.map((group, i) => {
            const row = Math.floor(i / SCROLL_COLS);
            if (row < firstVisibleRow || row > lastVisibleRow) return <div key={i} style={{ height: CARD_HEIGHT }} />;
            const cardTop = row * SCROLL_ROW_HEIGHT;
            const cardCenter = cardTop + CARD_HEIGHT / 2;
            const viewportCenter = scrollY + VIEWPORT_HEIGHT_PX / 2;
            const distFromCenter = Math.abs(cardCenter - viewportCenter);
            const cardOpacity = interpolate(distFromCenter, [0, VIEWPORT_HEIGHT_PX * 0.45, VIEWPORT_HEIGHT_PX * 0.6], [1, 0.85, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
            const entrySpring = spring({ frame: Math.max(0, scrollFrame - i), fps, config: { damping: 18, stiffness: 100 } });
            const accentColor = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const logoUrl = findLogo(group.name);

            return (
              <div key={i} style={{
                height: CARD_HEIGHT, opacity: cardOpacity * entrySpring,
                transform: `scale(${interpolate(cardOpacity, [0, 1], [0.95, 1])})`,
                background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden",
                display: "flex", flexDirection: "column",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                {logoUrl ? (
                  <LogoCover logoUrl={logoUrl} />
                ) : (
                  <div style={{ width: "100%", flex: 1, borderRadius: "16px 16px 0 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${accentColor}40, ${GD_DARK})` }}>
                    <div style={{ fontSize: TYPOGRAPHY.h2, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>{group.flag}</div>
                  </div>
                )}
                <div style={{ padding: "8px 12px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: TYPOGRAPHY.caption, lineHeight: 1 }}>{group.flag}</div>
                    <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: "#ffffff", fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>{group.name}</div>
                  </div>
                  <div style={{ fontSize: TYPOGRAPHY.captionSmall, color: "#94a3b8", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4, marginLeft: 24 }}>📍 {group.location}</div>
                </div>
                <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Finale: "Winners revealed in seconds" (frames 3270-4200) ──
// Timing synced with top-right "Results in" timer:
// - Frame 3270 (FINALE_START) = 2nd/3rd prizes appear on right immediately
// - Frame 3360 (3 sec later) = left countdown fades in slowly (after shuffle bars fade out)
// - Frame 3750 = timer shows 00:15 → 1st prize revealed, 2nd/3rd move down
// - Frame 4200 = timer shows 00:00 → composition ends
const LEFT_COUNTDOWN_START = FINALE_START + 90; // 3 seconds after finale starts (90 frames)
const PRIZE_REVEAL_FRAME = 3750; // Timer shows 15 seconds (15 * 30 = 450 frames before 4200)

const WinnersTeaser: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - FINALE_START;

  // Fade in over 120 frames for a slow, smooth crossfade with ShufflePhase
  const entryOpacity = interpolate(frame, [FINALE_START, FINALE_START + 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // No exit fade - composition ends at frame 4200

  // Left side countdown - delayed by 3 seconds to avoid overlap with shuffle bars
  const leftSideOpacity = interpolate(frame, [LEFT_COUNTDOWN_START, LEFT_COUNTDOWN_START + 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: Math.max(0, frame - LEFT_COUNTDOWN_START - 10), fps, config: { damping: 12, stiffness: 100 } });
  const countdownSpring = spring({ frame: Math.max(0, frame - LEFT_COUNTDOWN_START - 40), fps, config: { damping: 10, stiffness: 120 } });
  const pulse = frame >= LEFT_COUNTDOWN_START + 60 ? Math.sin((frame - LEFT_COUNTDOWN_START - 60) * 0.06) * 0.06 + 1 : 1;

  // Countdown synced with top-right timer (same calculation as ResultsCountdown)
  const secondsLeft = Math.max(0, Math.floor((PART_A_TOTAL_FRAMES - frame) / FPS));
  
  // Phase transitions - prizes show immediately when WinnersTeaser starts
  const showPrizes = frame >= FINALE_START;
  const isPhase2 = frame >= PRIZE_REVEAL_FRAME;
  
  // Springs for prize animations - start immediately with FINALE_START
  const prizesSpring = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, stiffness: 100 } });
  const phase2Spring = spring({ frame: Math.max(0, frame - PRIZE_REVEAL_FRAME), fps, config: { damping: 12, stiffness: 100 } });

  const prizes2nd3rd = [
    { place: "🥈 2nd Place", items: ["Exclusive AWS Community Hoodies", "$100 AWS Credits per team member"], color: "#C0C0C0" },
    { place: "🥉 3rd Place", items: ["Exclusive AWS Community Hoodies", "$50 AWS Credits per team member"], color: "#CD7F32" },
  ];

  const firstPrize = {
    place: "🥇 1st Place",
    items: [
      "$1,000 AWS Credits per team member",
      "Kiro Pro+ Credits for 3 Months",
      "AWS Certification Exam Vouchers",
      "Exclusive AWS Community Hoodies",
      "GameDay Community Champion Trophy",
    ],
    color: GD_GOLD,
  };

  return (
    <AbsoluteFill style={{ opacity: entryOpacity }}>
      {/* Radial burst */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 1000, height: 1000,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${GD_PURPLE}40 0%, ${GD_PINK}15 40%, transparent 70%)`,
        borderRadius: "50%", opacity: titleSpring * leftSideOpacity,
      }} />

      {/* Left side - Countdown (fades in 3 seconds after prizes appear) */}
      <div style={{ 
        position: "absolute", top: 0, left: 0, 
        width: "50%", 
        height: "100%", 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: leftSideOpacity,
      }}>
        <div style={{
          opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          textAlign: "center", marginBottom: 12,
        }}>
          <span style={{ fontSize: TYPOGRAPHY.h6, fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", letterSpacing: 6 }}>
            GET READY
          </span>
        </div>
        <div style={{
          opacity: countdownSpring, transform: `scale(${pulse * interpolate(countdownSpring, [0, 1], [0.6, 1])})`,
          textAlign: "center", marginBottom: 16,
        }}>
          <div style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 900, fontFamily: "'Inter', sans-serif", letterSpacing: 4,
            background: `linear-gradient(135deg, ${GD_GOLD} 0%, #ffffff 40%, ${GD_GOLD} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 30px ${GD_GOLD}40)`,
          }}>WINNERS REVEALED</div>
        </div>
        {/* Countdown number - synced with top-right timer */}
        <div style={{ opacity: countdownSpring, textAlign: "center" }}>
          <span style={{
            fontSize: 120, fontWeight: 900, fontFamily: "'Inter', sans-serif",
            color: GD_ACCENT, textShadow: `0 0 40px ${GD_ACCENT}60`,
          }}>{secondsLeft}</span>
          <div style={{
            fontSize: TYPOGRAPHY.caption, fontWeight: 600, color: "rgba(255,255,255,0.5)",
            fontFamily: "'Inter', sans-serif", letterSpacing: 3, marginTop: 4,
          }}>SECONDS</div>
        </div>
      </div>

      {/* Phase 1: 2nd/3rd prizes on right side (until frame 3750) */}
      {showPrizes && !isPhase2 && (
        <>
          {/* Divider - only show when left side is visible */}
          <div style={{
            position: "absolute", top: "20%", left: "50%", width: 1, height: "60%",
            background: `linear-gradient(180deg, transparent, ${GD_PURPLE}66, transparent)`,
            opacity: leftSideOpacity,
          }} />

          {/* Right side - 2nd/3rd Prizes */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: prizesSpring, transform: `translateX(${interpolate(prizesSpring, [0, 1], [30, 0])}px)`,
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.h5, fontWeight: 700, color: GD_ACCENT, letterSpacing: 3,
              textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 10,
              fontFamily: "'Inter', sans-serif",
            }}>
              🏆 Winner Prizes
            </div>
            
            {prizes2nd3rd.map((prize, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${prize.color}44`,
                borderLeft: `4px solid ${prize.color}`,
                borderRadius: 14,
                padding: "18px 24px",
                marginBottom: 16,
                minWidth: 400,
              }}>
                <div style={{ fontSize: TYPOGRAPHY.h5, fontWeight: 800, color: prize.color, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                  {prize.place}
                </div>
                {prize.items.map((item, j) => (
                  <div key={j} style={{
                    fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.8)", marginBottom: 5,
                    display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif",
                  }}>
                    <span style={{ color: prize.color, fontSize: 16 }}>•</span> {item}
                  </div>
                ))}
              </div>
            ))}
            
            <div style={{
              fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.5)", marginTop: 12,
              textAlign: "center", fontFamily: "'Inter', sans-serif",
            }}>
              1st place prizes revealed at 15 seconds!
            </div>
          </div>
        </>
      )}

      {/* Phase 2: 1st Prize Revealed + 2nd/3rd stacked below (frames 3750+) */}
      {isPhase2 && (
        <>
          {/* Divider stays */}
          <div style={{
            position: "absolute", top: "10%", left: "50%", width: 1, height: "80%",
            background: `linear-gradient(180deg, transparent, ${GD_PURPLE}66, transparent)`,
            opacity: 1,
          }} />

          {/* Right side - 1st Prize on top, 2nd/3rd stacked vertically below */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12,
          }}>
            {/* 1st Place - Big on top */}
            <div style={{
              opacity: phase2Spring, 
              display: "flex", flexDirection: "column", alignItems: "center",
              transform: `translateY(${interpolate(phase2Spring, [0, 1], [-20, 0])}px)`,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.h5, fontWeight: 900, color: GD_GOLD, letterSpacing: 3,
                textTransform: "uppercase", marginBottom: 10, fontFamily: "'Inter', sans-serif",
                textShadow: `0 0 30px ${GD_GOLD}60`,
              }}>
                🏆 Grand Prize 🏆
              </div>
              
              <div style={{
                background: `linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))`,
                border: `2px solid ${GD_GOLD}55`,
                borderRadius: 16,
                padding: "14px 20px",
                minWidth: 400,
              }}>
                <div style={{
                  fontSize: TYPOGRAPHY.h4, fontWeight: 900, color: GD_GOLD, marginBottom: 8,
                  fontFamily: "'Inter', sans-serif", textAlign: "center",
                  textShadow: `0 0 20px ${GD_GOLD}40`,
                }}>
                  {firstPrize.place}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {firstPrize.items.map((item, j) => (
                    <div key={j} style={{
                      fontSize: TYPOGRAPHY.body, color: "white", 
                      display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
                    }}>
                      <span style={{ color: GD_GOLD, fontSize: 14 }}>★</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2nd and 3rd Place - Stacked vertically below with bigger text */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 10,
              opacity: phase2Spring,
              transform: `translateY(${interpolate(phase2Spring, [0, 1], [20, 0])}px)`,
              width: "90%",
              maxWidth: 420,
            }}>
              {prizes2nd3rd.map((prize, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${prize.color}44`,
                  borderLeft: `4px solid ${prize.color}`,
                  borderRadius: 12,
                  padding: "12px 16px",
                }}>
                  <div style={{ fontSize: TYPOGRAPHY.body, fontWeight: 800, color: prize.color, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                    {prize.place}
                  </div>
                  {prize.items.map((item, j) => (
                    <div key={j} style={{
                      fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.75)", marginBottom: 3,
                      display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif",
                    }}>
                      <span style={{ color: prize.color }}>•</span> {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* GameDay badge - only before prizes show */}
      {!showPrizes && (
        <div style={{
          position: "absolute", bottom: 50, left: 0, right: 0, display: "flex", justifyContent: "center",
          opacity: interpolate(localFrame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <div style={{
            background: `linear-gradient(135deg, #4f46e5, ${GD_PINK})`, borderRadius: 12, padding: "10px 28px",
            fontSize: TYPOGRAPHY.captionSmall, fontWeight: 700, color: "#ffffff", fontFamily: "'Inter', sans-serif", letterSpacing: 1,
            display: "flex", alignItems: "center",
          }}>
            <Img src={staticFile("assets/logos/gameday-logo-white.png")} style={{ height: 24, marginRight: 8 }} />
            The moment you've been waiting for
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ── ShufflePhase: Bell Curve Horizontal Scroll ──
// All 53 groups scroll right-to-left as vertical bars. Bars in the center of the screen
// are tallest (bell curve peak), bars at edges are shorter.
const SHUFFLE_VISUAL_START = 1860; // bars start appearing here (crossfade with FastScroll at timer ~01:16)

const ShufflePhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const frameInPhase = frame - SHUFFLE_VISUAL_START;
  const phaseDuration = SHUFFLE_END - SHUFFLE_VISUAL_START;

  // Crossfade entry: fades in over 40 frames
  const entryOpacity = interpolate(frame, [SHUFFLE_VISUAL_START, SHUFFLE_VISUAL_START + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Crossfade exit: fades out as WinnersTeaser takes over
  const exitOpacity = interpolate(frame, [FINALE_START, SHUFFLE_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scroll starts immediately  -  bars enter from right edge, constant speed throughout
  const scrollProgress = interpolate(frameInPhase, [0, phaseDuration - 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Linear scroll  -  same speed from start to finish
  const easedScroll = scrollProgress;

  const totalWidth = USER_GROUPS.length * (SHUFFLE_BAR_WIDTH + SHUFFLE_BAR_GAP);
  const totalScrollDist = totalWidth + 1280;
  // Bars start off-screen right (paddingLeft=1280) and scroll left into view
  const scrollX = easedScroll * totalScrollDist;

  // Assign deterministic shuffled scores
  const groupsWithScores = USER_GROUPS.map((group, i) => {
    const score = SHUFFLE_SCORE_MIN + ((i * 17 + 31) % (SHUFFLE_SCORE_MAX - SHUFFLE_SCORE_MIN + 1));
    return { ...group, score };
  });

  // Bell curve ordering: highest scores in center
  const ascending = [...groupsWithScores].sort((a, b) => a.score - b.score);
  const bellCurveOrder: typeof ascending = [];
  for (let i = 0; i < ascending.length; i++) {
    if (i % 2 === 0) bellCurveOrder.push(ascending[i]);
    else bellCurveOrder.unshift(ascending[i]);
  }

  const screenCenter = 1280 / 2;

  return (
    <AbsoluteFill style={{ opacity: entryOpacity * exitOpacity }}>
      <div style={{
        position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", zIndex: 10,
        opacity: interpolate(frameInPhase, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{ fontSize: TYPOGRAPHY.bodySmall, fontWeight: 700, color: GD_ACCENT, fontFamily: "'Inter', sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
          Calculating Winners...
        </div>
      </div>
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 120, background: `linear-gradient(90deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 120, background: `linear-gradient(270deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />
        <div style={{
          display: "flex", alignItems: "flex-end", height: "100%",
          transform: `translateX(${-scrollX}px)`, gap: SHUFFLE_BAR_GAP,
          paddingLeft: 1280,
        }}>
          {bellCurveOrder.map((group, i) => {
            const barX = i * (SHUFFLE_BAR_WIDTH + SHUFFLE_BAR_GAP) - scrollX + 1280;
            const barCenter = barX + SHUFFLE_BAR_WIDTH / 2;
            const distFromScreenCenter = Math.abs(barCenter - screenCenter);
            const maxBarHeight = 420;
            const minBarHeight = 80;
            const bellFactor = Math.exp(-Math.pow(distFromScreenCenter / 400, 2));
            const barHeight = minBarHeight + (maxBarHeight - minBarHeight) * bellFactor;
            const barOpacity = interpolate(distFromScreenCenter, [0, 500, 800], [1, 0.7, 0.15], {
              extrapolateRight: "clamp", extrapolateLeft: "clamp",
            });
            const accentColor = CARD_ACCENTS[i % CARD_ACCENTS.length];

            return (
              <div key={i} style={{
                minWidth: SHUFFLE_BAR_WIDTH, maxWidth: SHUFFLE_BAR_WIDTH,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "flex-end", height: "100%", opacity: barOpacity,
              }}>
                <div style={{ fontSize: TYPOGRAPHY.h5, marginBottom: 6, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}>{group.flag}</div>
                <div style={{
                  fontSize: TYPOGRAPHY.captionSmall, fontWeight: 700, color: "rgba(255,255,255,0.9)",
                  fontFamily: "'Inter', sans-serif", textAlign: "center",
                  marginBottom: 8, lineHeight: 1.3, width: SHUFFLE_BAR_WIDTH - 8,
                  wordWrap: "break-word", overflowWrap: "break-word",
                }}>{group.name}</div>
                <div style={{
                  width: "85%", height: barHeight, borderRadius: "10px 10px 0 0",
                  background: `linear-gradient(180deg, ${accentColor}cc, ${GD_PURPLE}90)`,
                  boxShadow: `0 0 24px ${accentColor}25`, border: `1px solid ${accentColor}30`, borderBottom: "none",
                  position: "relative",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── ShowcasePhase (Hero Intro + Fast Scroll + Shuffle + Winners Teaser) ──
const ShowcasePhase: React.FC<{ frame: number }> = ({ frame }) => {
  // After shuffle fully done, only WinnersTeaser
  if (frame >= SHUFFLE_END + 1) return <WinnersTeaser frame={frame} />;
  // Crossfade overlap: ShufflePhase fading out + WinnersTeaser fading in
  if (frame >= FINALE_START) return (
    <>
      <ShufflePhase frame={frame} />
      <WinnersTeaser frame={frame} />
    </>
  );
  // After FastScroll fully gone, only shuffle
  if (frame >= FAST_SCROLL_END + 1) return <ShufflePhase frame={frame} />;
  // Crossfade overlap: both visible during 1860-1899
  if (frame >= SHUFFLE_VISUAL_START) return (
    <>
      <FastScroll frame={frame} />
      <ShufflePhase frame={frame} />
    </>
  );
  if (frame >= 1580) return (
    <>
      <HeroIntro frame={frame} />
      <FastScroll frame={frame} />
    </>
  );
  if (frame > HERO_INTRO_END) return <FastScroll frame={frame} />;
  return <HeroIntro frame={frame} />;
};

// ── ResultsCountdown ──
const ResultsCountdown: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame <= HERO_INTRO_END) return null;
  const countdown = formatTime(Math.max(0, Math.floor((PART_A_TOTAL_FRAMES - frame) / 30)));
  return (
    <div style={{ position: "absolute", top: 16, right: 16, zIndex: 20 }}>
      <GlassCard style={{ padding: "6px 14px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <div style={{ fontSize: TYPOGRAPHY.overline, fontWeight: 500, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Results in</div>
          <div style={{ fontSize: TYPOGRAPHY.caption, fontWeight: 700, color: GD_GOLD, fontFamily: "'Inter', sans-serif", fontVariantNumeric: "tabular-nums" }}>{countdown}</div>
        </div>
      </GlassCard>
    </div>
  );
};

// ── Part A: Closing Countdown Composition (3600 frames = 2 min) ──
export const ClosingPreRendered: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.65} />
      <HexGridOverlay />
      <SegmentTransitionFlash />

      <AbsoluteFill style={{ zIndex: 10 }}>
        {/* Hero Intro scenes */}
        <Sequence name="Scene 1: WHAT. A. DAY." from={0} durationInFrames={180} layout="none">
          <></>
        </Sequence>
        <Sequence name="Scene 2: Stats Cascade" from={160} durationInFrames={220} layout="none">
          <></>
        </Sequence>
        <Sequence name="Scene 3: Flag Parade" from={360} durationInFrames={190} layout="none">
          <></>
        </Sequence>
        <Sequence name="Scene 4: Organizers" from={520} durationInFrames={490} layout="none">
          <></>
        </Sequence>
        <Sequence name="Scene 4b: AWS Supporters" from={1010} durationInFrames={390} layout="none">
          <></>
        </Sequence>
        <Sequence name="Scene 5: AND NOW... THE RESULTS" from={1400} durationInFrames={200} layout="none">
          <></>
        </Sequence>

        {/* Main phases */}
        <Sequence name="Fast Scroll (UG Logos)" from={FAST_SCROLL_START} durationInFrames={260} layout="none">
          <></>
        </Sequence>
        <Sequence name="Shuffle Phase (Bar Chart)" from={1860} durationInFrames={SHUFFLE_END - 1860 + 1} layout="none">
          <></>
        </Sequence>
        <Sequence name="Finale (30s Countdown)" from={FINALE_START} durationInFrames={PART_A_TOTAL_FRAMES - FINALE_START} layout="none">
          <></>
        </Sequence>

        {/* Actual rendering */}
        <ShowcasePhase frame={frame} />
        <ResultsCountdown frame={frame} />
      </AbsoluteFill>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};

// ── Standalone Sub-Composition for Remotion Studio ──
export const ClosingShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.65} />
      <HexGridOverlay />
      <ShowcasePhase frame={frame} />
      <ResultsCountdown frame={frame} />
    </AbsoluteFill>
  );
};
