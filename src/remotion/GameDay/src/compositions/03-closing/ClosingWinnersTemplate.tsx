/**
 * Closing Winners Template
 *
 * Update config/participants.ts with the actual winning teams before rendering.
 * The PODIUM_TEAMS array in src/utils/closing.ts drives this composition.
 *
 * Options for updating with live data:
 * 1. Manual: Edit PODIUM_TEAMS in src/utils/closing.ts directly
 * 2. Config-driven: Update config/participants.ts and reference it here
 * 3. Automated: See TEMPLATE.md for the API-based update workflow (to be contributed)
 *
 * Future idea: During the shuffle phase, bars could reflect actual leaderboard
 * scores per user group  -  creating a dramatic real-time reveal from live data.
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
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
import { USER_GROUPS, type UserGroup } from "../../../config/participants";
import { EVENT_NAME } from "../../../config/event";

// ── Part B Constants ──
const TOTAL_FRAMES = 9000;

// ── Phase Timing ──
const SHUFFLE_START = 0;
const SHUFFLE_END = 1799;
const REVEAL_6TH = 1800;
const REVEAL_5TH = 2200;
const REVEAL_4TH = 2600;
const REVEAL_3RD = 3000;
const REVEAL_2ND = 4200;
const REVEAL_1ST = 5400;
const ROLL_CALL_START = 7200;
const THANKYOU_START = 7800;

// ── Shuffle Constants ──
const SHUFFLE_BAR_WIDTH = 160;
const SHUFFLE_BAR_GAP = 16;
const SHUFFLE_SCORE_MIN = 3000;
const SHUFFLE_SCORE_MAX = 5000;

// ── Card Accent Colors ──
const CARD_ACCENTS = [GD_VIOLET, GD_PURPLE, GD_PINK, GD_ACCENT, "#6366f1", GD_VIOLET];

// ── TeamData Interface ──
export interface TeamData {
  teamName: string;       // The team name (most prominent)
  ugName: string;         // User group name (for LOGO_MAP lookup)
  flag: string;           // Country flag emoji
  location: string;       // "City, Country"
  score: number;
}

// ── Placeholder Podium Teams (update live during stream) ──
// ugName must match a key in LOGO_MAP from CommunityGamedayEuropeV4
// ⚠️  PLACEHOLDER DATA  -  MUST BE UPDATED WITH REAL WINNERS BEFORE RENDERING
// See TEMPLATE.md for instructions on how to update
export const PODIUM_TEAMS: TeamData[] = [
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 18500 },
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 15200 },
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 12800 },
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 11500 },
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 10200 },
  { teamName: "TEAM NAME", ugName: "REPLACE_WITH_UG_NAME", flag: "🏳️", location: "CITY, COUNTRY", score: 8900 },
];

// ── Reveal Schedule ──
const REVEAL_SCHEDULE = [
  { rank: 6, frame: REVEAL_6TH, duration: 400 },
  { rank: 5, frame: REVEAL_5TH, duration: 400 },
  { rank: 4, frame: REVEAL_4TH, duration: 400 },
  { rank: 3, frame: REVEAL_3RD, duration: 1200 },
  { rank: 2, frame: REVEAL_2ND, duration: 1200 },
  { rank: 1, frame: REVEAL_1ST, duration: 1800 },
];

// ── Crossfade duration for smooth phase transitions ──
const CROSSFADE = 30; // frames of overlap

// ── Utility Functions ──
export function getRevealedPlacements(frame: number): number[] {
  const placements: number[] = [];
  for (const entry of REVEAL_SCHEDULE) {
    if (frame >= entry.frame) placements.push(entry.rank);
  }
  return placements;
}

export function getCountUpValue(target: number, frame: number, revealFrame: number): number {
  const elapsed = Math.max(0, frame - revealFrame);
  const progress = Math.min(1, elapsed / 180);
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(eased * target);
}

export function getPodiumBarHeight(score: number, maxScore: number, maxHeight: number): number {
  return Math.max(0.4, score / maxScore) * maxHeight;
}

function getFadeOpacity(frame: number): number {
  const fadeStart = TOTAL_FRAMES - 90;
  if (frame < fadeStart) return 0;
  return Math.min(1, (frame - fadeStart) / 90);
}

// ── SegmentTransitionFlash ──
const FLASH_DURATION = 60;
const PHASE_BOUNDARY_FRAMES_B = [SHUFFLE_START, REVEAL_6TH, ROLL_CALL_START, THANKYOU_START];

const SegmentTransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const boundary = PHASE_BOUNDARY_FRAMES_B.find((b) => frame >= b && frame < b + FLASH_DURATION);
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

// ── ShufflePhase: Bell Curve Horizontal Scroll (same as Part A) ──
const ShufflePhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const frameInPhase = frame - SHUFFLE_START;
  const phaseDuration = SHUFFLE_END - SHUFFLE_START;

  const entrySpring = spring({ frame: frameInPhase, fps, config: { damping: 16, stiffness: 100 } });

  const scrollProgress = interpolate(frameInPhase, [15, phaseDuration - 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const easedScroll = scrollProgress < 0.5
    ? 2 * scrollProgress * scrollProgress
    : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;

  const totalWidth = USER_GROUPS.length * (SHUFFLE_BAR_WIDTH + SHUFFLE_BAR_GAP);
  const totalScrollDist = totalWidth + 1280;
  const scrollX = easedScroll * totalScrollDist - 1280 * 0.1;

  const groupsWithScores = USER_GROUPS.map((group, i) => {
    const score = SHUFFLE_SCORE_MIN + ((i * 17 + 31) % (SHUFFLE_SCORE_MAX - SHUFFLE_SCORE_MIN + 1));
    return { ...group, score };
  });

  const ascending = [...groupsWithScores].sort((a, b) => a.score - b.score);
  const bellCurveOrder: typeof ascending = [];
  for (let i = 0; i < ascending.length; i++) {
    if (i % 2 === 0) bellCurveOrder.push(ascending[i]);
    else bellCurveOrder.unshift(ascending[i]);
  }

  const screenCenter = 1280 / 2;

  // Pulsing glow on title
  const titlePulse = interpolate(frameInPhase % 60, [0, 30, 60], [0.6, 1, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: entrySpring }}>
      <div style={{
        position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", zIndex: 10,
        opacity: interpolate(frameInPhase, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.h4, fontWeight: 700, color: GD_ACCENT, fontFamily: "'Inter', sans-serif", letterSpacing: 2, textTransform: "uppercase",
          textShadow: `0 0 ${20 + titlePulse * 20}px ${GD_ACCENT}${Math.round(titlePulse * 80).toString(16).padStart(2, "0")}`,
        }}>
          Calculating Winners...
        </div>
      </div>
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 220, background: `linear-gradient(90deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 220, background: `linear-gradient(270deg, ${GD_DARK} 0%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />
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
                <div style={{ fontSize: TYPOGRAPHY.h4, marginBottom: 6, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}>{group.flag}</div>
                <div style={{
                  fontSize: TYPOGRAPHY.body, fontWeight: 700, color: "rgba(255,255,255,0.9)",
                  fontFamily: "'Inter', sans-serif", textAlign: "center",
                  marginBottom: 8, lineHeight: 1.3, width: SHUFFLE_BAR_WIDTH - 8,
                  wordWrap: "break-word", overflowWrap: "break-word",
                }}>{group.name}</div>
                <div style={{
                  width: "85%", height: barHeight, borderRadius: "10px 10px 0 0",
                  background: `linear-gradient(180deg, ${accentColor}cc, ${GD_PURPLE}90)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 24px ${accentColor}25`, border: `1px solid ${accentColor}30`, borderBottom: "none",
                  position: "relative",
                }}>
                  <div style={{
                    fontSize: TYPOGRAPHY.h5, fontWeight: 800, color: "white", fontFamily: "'Inter', sans-serif",
                    fontVariantNumeric: "tabular-nums", textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                  }}>{Math.round(group.score)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── PodiumBar: Bottom-aligned bar for each team ──
const PodiumBar: React.FC<{
  team: TeamData;
  rank: number;
  barHeight: number;
  isTop3: boolean;
  revealFrame: number;
  frame: number;
}> = ({ team, rank, barHeight, isTop3, revealFrame, frame }) => {
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - revealFrame);
  const config = rank === 1
    ? { damping: 20, stiffness: 12, mass: 3 }
    : { damping: 18, stiffness: 16, mass: 2.5 };
  const progress = spring({ frame: elapsed, fps, config });
  const animatedHeight = barHeight * progress;

  // Subtle scale bounce on entry
  const scaleSpring = spring({ frame: elapsed, fps, config: { damping: 16, stiffness: 20, mass: 2 } });
  const entryScale = interpolate(scaleSpring, [0, 1], [0.85, 1]);

  // Pulsing glow for #1 winner
  const glowIntensity = rank === 1 && elapsed > 30
    ? interpolate(elapsed % 90, [0, 45, 90], [0.2, 0.6, 0.2], { extrapolateRight: "clamp" })
    : 0;

  const barWidth = isTop3 ? 160 : 130;
  const borderColor = rank === 1 ? GD_GOLD : rank === 2 ? GD_GOLD + "80" : rank === 3 ? GD_GOLD + "80" : GD_ACCENT + "60";
  const barGradient = rank === 1
    ? `linear-gradient(180deg, ${GD_GOLD}dd, ${GD_ORANGE}90)`
    : rank <= 3
      ? `linear-gradient(180deg, ${GD_VIOLET}cc, ${GD_PURPLE}90)`
      : `linear-gradient(180deg, ${GD_ACCENT}99, ${GD_PURPLE}70)`;

  const rankLabel = rank === 1 ? "1st" : rank === 2 ? "2nd" : rank === 3 ? "3rd" : `#${rank}`;
  const opacity = isTop3 ? 1 : 0.75;

  // For top 3: staged reveal (bar grows → city fades in → name fades in)
  const cityOpacity = isTop3
    ? interpolate(elapsed, [180, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : progress;
  const nameOpacity = isTop3
    ? interpolate(elapsed, [300, 360], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : progress;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-end", height: "100%", opacity: opacity * progress,
      width: barWidth,
      transform: `scale(${entryScale})`,
      transformOrigin: "bottom center",
    }}>
      {/* Labels above the bar */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 3, marginBottom: 8, width: "100%",
      }}>
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.body : TYPOGRAPHY.bodySmall, fontWeight: 900,
          color: rank === 1 ? GD_GOLD : "rgba(255,255,255,0.95)",
          fontFamily: "'Inter', sans-serif", textAlign: "center",
          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          letterSpacing: 1,
        }}>
          {rankLabel}
        </div>
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.caption : TYPOGRAPHY.captionSmall, fontWeight: 700,
          color: "white", fontFamily: "'Inter', sans-serif", textAlign: "center",
          lineHeight: 1.2, width: "100%", opacity: nameOpacity,
          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          wordWrap: "break-word", overflowWrap: "break-word",
        }}>{team.flag} {team.teamName}</div>
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.captionSmall : TYPOGRAPHY.label, color: "rgba(255,255,255,0.7)",
          fontFamily: "'Inter', sans-serif", opacity: cityOpacity, textAlign: "center",
          textShadow: "0 1px 2px rgba(0,0,0,0.6)",
        }}>{team.location}</div>
      </div>

      {/* Bar  -  clean column, no text inside */}
      <div style={{
        width: barWidth - 20, height: animatedHeight, borderRadius: "10px 10px 0 0",
        background: barGradient,
        border: `1.5px solid ${borderColor}`, borderBottom: "none",
        boxShadow: rank === 1
          ? `0 0 ${40 + glowIntensity * 40}px ${GD_GOLD}${Math.round((0.3 + glowIntensity * 0.4) * 255).toString(16).padStart(2, "0")}`
          : `0 0 20px ${GD_PURPLE}20`,
      }} />
    </div>
  );
};

// ── RevealPhase: Progressive bar-chart podium ──
const RevealPhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const revealed = getRevealedPlacements(frame);
  const maxScore = PODIUM_TEAMS[0].score;
  const maxBarHeight = 380;

  const titleSpring = spring({ frame: Math.max(0, frame - REVEAL_6TH), fps, config: { damping: 14, stiffness: 100 } });

  // Current reveal highlight
  const currentReveal = REVEAL_SCHEDULE.slice().reverse().find((r) => frame >= r.frame);
  const currentRank = currentReveal?.rank ?? 6;

  return (
    <AbsoluteFill>
      {/* Title */}
      <div style={{
        position: "absolute", top: 24, left: 0, right: 0, textAlign: "center",
        opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: GD_GOLD,
          fontFamily: "'Inter', sans-serif", letterSpacing: 4, textTransform: "uppercase",
          textShadow: `0 2px 20px ${GD_GOLD}40`,
        }}>FINAL STANDINGS</div>
      </div>

      {/* Current reveal announcement with scale pop */}
      {frame < ROLL_CALL_START && (
        <div style={{
          position: "absolute", top: 80, left: 0, right: 0, textAlign: "center",
          opacity: interpolate(frame - (currentReveal?.frame ?? 0), [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{
            fontSize: TYPOGRAPHY.h5, fontWeight: 700, fontFamily: "'Inter', sans-serif",
            color: currentRank <= 3 ? GD_GOLD : "rgba(255,255,255,0.7)",
            display: "inline-block",
            transform: `scale(${interpolate(
              frame - (currentReveal?.frame ?? 0),
              [0, 8, 20],
              [0.5, 1.15, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) }
            )})`,
            textShadow: currentRank <= 3 ? `0 0 20px ${GD_GOLD}50` : "none",
          }}>
            {currentRank === 1 ? "1st Place" : currentRank === 2 ? "2nd Place" : currentRank === 3 ? "3rd Place" : `#${currentRank}`}
          </span>
        </div>
      )}

      {/* Bar chart  -  bottom aligned, extra right padding to avoid AudioBadge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "75%",
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16,
        padding: "0 180px 0 80px",
      }}>
        {/* Render bars for revealed teams: order 2-1-3 for top, 4-5-6 for bottom */}
        {revealed.includes(2) && (
          <PodiumBar team={PODIUM_TEAMS[1]} rank={2} barHeight={getPodiumBarHeight(PODIUM_TEAMS[1].score, maxScore, maxBarHeight)} isTop3={true} revealFrame={REVEAL_2ND} frame={frame} />
        )}
        {revealed.includes(1) && (
          <PodiumBar team={PODIUM_TEAMS[0]} rank={1} barHeight={getPodiumBarHeight(PODIUM_TEAMS[0].score, maxScore, maxBarHeight)} isTop3={true} revealFrame={REVEAL_1ST} frame={frame} />
        )}
        {revealed.includes(3) && (
          <PodiumBar team={PODIUM_TEAMS[2]} rank={3} barHeight={getPodiumBarHeight(PODIUM_TEAMS[2].score, maxScore, maxBarHeight)} isTop3={true} revealFrame={REVEAL_3RD} frame={frame} />
        )}
        {/* Spacer between top 3 and bottom 3 */}
        {revealed.some((r) => r >= 4) && <div style={{ width: 40 }} />}
        {revealed.includes(4) && (
          <PodiumBar team={PODIUM_TEAMS[3]} rank={4} barHeight={getPodiumBarHeight(PODIUM_TEAMS[3].score, maxScore, maxBarHeight)} isTop3={false} revealFrame={REVEAL_4TH} frame={frame} />
        )}
        {revealed.includes(5) && (
          <PodiumBar team={PODIUM_TEAMS[4]} rank={5} barHeight={getPodiumBarHeight(PODIUM_TEAMS[4].score, maxScore, maxBarHeight)} isTop3={false} revealFrame={REVEAL_5TH} frame={frame} />
        )}
        {revealed.includes(6) && (
          <PodiumBar team={PODIUM_TEAMS[5]} rank={6} barHeight={getPodiumBarHeight(PODIUM_TEAMS[5].score, maxScore, maxBarHeight)} isTop3={false} revealFrame={REVEAL_6TH} frame={frame} />
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── PodiumCard: Individual team card for the podium grid ──
const PodiumCard: React.FC<{
  team: TeamData;
  rank: number;
  isTop3: boolean;
  maxScore: number;
  minScore: number;
  entryDelay: number;
  frame: number;
}> = ({ team, rank, isTop3, maxScore, minScore, entryDelay, frame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - ROLL_CALL_START;
  const cardSpring = spring({ frame: Math.max(0, localFrame - entryDelay), fps, config: { damping: 10, stiffness: 80, mass: 0.8 } });

  const logoUrl = (USER_GROUPS.find((g) => g.name === team.ugName) as UserGroup | undefined)?.logo;
  const borderColor = rank === 1 ? GD_GOLD : rank <= 3 ? GD_ORANGE : GD_ACCENT + "60";
  const bgColor = rank === 1 ? `${GD_GOLD}18` : rank <= 3 ? `${GD_ORANGE}10` : `${GD_PURPLE}30`;
  const cardWidth = isTop3 ? 280 : 250;
  // Height strongly relative to score  -  normalize between min and max
  const scoreRange = maxScore - minScore || 1;
  const normalized = (team.score - minScore) / scoreRange; // 0..1
  const cardMinH = isTop3 ? 200 : 180;
  const cardMaxH = isTop3 ? 360 : 220;
  const cardHeight = cardMinH + (cardMaxH - cardMinH) * normalized;

  // Subtle rotation on entry for dynamism
  const entryRotation = interpolate(cardSpring, [0, 0.5, 1], [rank % 2 === 0 ? -2 : 2, rank % 2 === 0 ? 0.5 : -0.5, 0]);

  // Gold glow pulse for #1
  const goldPulse = rank === 1 && localFrame > entryDelay + 30
    ? interpolate((localFrame - entryDelay) % 120, [0, 60, 120], [0.15, 0.4, 0.15], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div style={{
      width: cardWidth,
      height: cardHeight,
      borderRadius: 14,
      border: `2px solid ${borderColor}`,
      background: bgColor,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "space-between",
      padding: isTop3 ? "14px 10px 10px" : "10px 8px 8px",
      position: "relative",
      opacity: cardSpring,
      transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])}) rotate(${entryRotation}deg)`,
      boxShadow: rank === 1
        ? `0 0 ${30 + goldPulse * 30}px ${GD_GOLD}${Math.round((0.25 + goldPulse * 0.3) * 255).toString(16).padStart(2, "0")}`
        : `0 4px 20px rgba(0,0,0,0.3)`,
    }}>
      {/* TOP section: Rank + Team Name + Score */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isTop3 ? 4 : 2 }}>
        {/* Rank */}
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.h3 : TYPOGRAPHY.h4, fontWeight: 900,
          color: rank === 1 ? GD_GOLD : rank <= 3 ? "white" : "rgba(255,255,255,0.7)",
          fontFamily: "'Inter', sans-serif", lineHeight: 1,
        }}>#{rank}</div>

        {/* Team Name  -  most prominent */}
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.h5 : TYPOGRAPHY.h6, fontWeight: 800,
          color: "white", fontFamily: "'Inter', sans-serif", textAlign: "center",
          lineHeight: 1.2, maxWidth: cardWidth - 24,
          wordWrap: "break-word", overflowWrap: "break-word",
        }}>{team.teamName}</div>

        {/* Score / Points */}
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.h4 : TYPOGRAPHY.h5, fontWeight: 900,
          color: rank <= 3 ? GD_GOLD : GD_ACCENT,
          fontFamily: "'Inter', sans-serif", fontVariantNumeric: "tabular-nums",
        }}>{team.score.toLocaleString()}</div>
      </div>

      {/* BOTTOM section: Logo + City/Country */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {/* UG Logo  -  landscape, natural aspect ratio, rounded corners */}
        {logoUrl && (
          <Img src={logoUrl} style={{
            width: isTop3 ? 160 : 100,
            height: "auto",
            borderRadius: 8,
            border: `1.5px solid ${borderColor}30`,
            flexShrink: 0,
          }} />
        )}

        {/* City + Flag */}
        <div style={{
          fontSize: isTop3 ? TYPOGRAPHY.body : TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.7)",
          fontFamily: "'Inter', sans-serif", textAlign: "center", fontWeight: 600,
        }}>{team.flag} {team.location}</div>
      </div>
    </div>
  );
};

// ── RollCallPhase → Podium Grid (replaces old list) ──
const RollCallPhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - ROLL_CALL_START;
  const titleSpring = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 100 } });
  const maxScore = PODIUM_TEAMS[0].score;
  const minScore = PODIUM_TEAMS[PODIUM_TEAMS.length - 1].score;

  return (
    <AbsoluteFill>
      {/* Title */}
      <div style={{
        position: "absolute", top: 20, left: 0, right: 0, textAlign: "center",
        opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.h3, fontWeight: 900, color: GD_GOLD,
          fontFamily: "'Inter', sans-serif", letterSpacing: 4, textTransform: "uppercase",
          textShadow: `0 2px 20px ${GD_GOLD}40`,
        }}>PODIUM</div>
      </div>

      {/* Top 3 row: 2-1-3 layout, vertically offset by score */}
      <div style={{
        position: "absolute", top: 50, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16,
        height: 400,
      }}>
        {/* 2nd place  -  offset down */}
        <div style={{ paddingTop: 50 }}>
          <PodiumCard team={PODIUM_TEAMS[1]} rank={2} isTop3={true} maxScore={maxScore} minScore={minScore} entryDelay={15} frame={frame} />
        </div>
        {/* 1st place  -  tallest, no offset */}
        <PodiumCard team={PODIUM_TEAMS[0]} rank={1} isTop3={true} maxScore={maxScore} minScore={minScore} entryDelay={30} frame={frame} />
        {/* 3rd place  -  offset down more */}
        <div style={{ paddingTop: 90 }}>
          <PodiumCard team={PODIUM_TEAMS[2]} rank={3} isTop3={true} maxScore={maxScore} minScore={minScore} entryDelay={0} frame={frame} />
        </div>
      </div>

      {/* Bottom 3 row: 4-5-6  -  centered */}
      <div style={{
        position: "absolute", bottom: 20, left: 0, right: 0, 
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16,
      }}>
        <PodiumCard team={PODIUM_TEAMS[3]} rank={4} isTop3={false} maxScore={maxScore} minScore={minScore} entryDelay={45} frame={frame} />
        <PodiumCard team={PODIUM_TEAMS[4]} rank={5} isTop3={false} maxScore={maxScore} minScore={minScore} entryDelay={55} frame={frame} />
        <PodiumCard team={PODIUM_TEAMS[5]} rank={6} isTop3={false} maxScore={maxScore} minScore={minScore} entryDelay={65} frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

// ── ThankYouPhase ──
const ThankYouPhase: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const phaseFrame = frame - THANKYOU_START;
  const subtitleSpring = spring({ frame: phaseFrame, fps, config: { damping: 18, stiffness: 80 } });
  const titleSpring = spring({ frame: Math.max(0, phaseFrame - 20), fps, config: { damping: 14, stiffness: 70 } });
  const closingSpring = spring({ frame: Math.max(0, phaseFrame - 45), fps, config: { damping: 18, stiffness: 80 } });
  const fadeOpacity = getFadeOpacity(frame);
  const glowPulse = interpolate(phaseFrame % 180, [0, 90, 180], [0.15, 0.35, 0.15], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 600, height: 600,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${GD_PURPLE}${Math.round(glowPulse * 60).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{
          fontSize: TYPOGRAPHY.h5, color: GD_ACCENT, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase",
          opacity: subtitleSpring, transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)`,
          fontFamily: "'Inter', sans-serif",
        }}>{EVENT_NAME}</div>
        <div style={{
          fontSize: TYPOGRAPHY.h1, fontWeight: 800, color: "white", textAlign: "center",
          opacity: titleSpring, transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px) scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`,
          fontFamily: "'Inter', sans-serif", textShadow: `0 0 60px ${GD_VIOLET}40`,
        }}>Thank You</div>
        <div style={{
          fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.6)", fontWeight: 400,
          opacity: closingSpring, transform: `translateY(${interpolate(closingSpring, [0, 1], [15, 0])}px)`,
          fontFamily: "'Inter', sans-serif",
        }}>See you at the next GameDay!</div>
      </div>
      {fadeOpacity > 0 && <AbsoluteFill style={{ backgroundColor: "black", opacity: fadeOpacity, zIndex: 100 }} />}
    </AbsoluteFill>
  );
};

// ── Main Composition: Part B  -  Winners Template ──
export const ClosingWinnersTemplate: React.FC = () => {
  const frame = useCurrentFrame();

  const getPhaseComponent = () => {
    if (frame < REVEAL_6TH) return <ShufflePhase frame={frame} />;
    if (frame < ROLL_CALL_START) return <RevealPhase frame={frame} />;
    if (frame < THANKYOU_START) return <RollCallPhase frame={frame} />;
    return <ThankYouPhase frame={frame} />;
  };

  // Crossfade opacities at phase boundaries
  const shuffleOut = frame >= REVEAL_6TH - CROSSFADE
    ? interpolate(frame, [REVEAL_6TH - CROSSFADE, REVEAL_6TH], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const revealIn = frame >= REVEAL_6TH - CROSSFADE
    ? interpolate(frame, [REVEAL_6TH - CROSSFADE, REVEAL_6TH], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const revealOut = frame >= ROLL_CALL_START - CROSSFADE
    ? interpolate(frame, [ROLL_CALL_START - CROSSFADE, ROLL_CALL_START], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const podiumIn = frame >= ROLL_CALL_START - CROSSFADE
    ? interpolate(frame, [ROLL_CALL_START - CROSSFADE, ROLL_CALL_START], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const podiumOut = frame >= THANKYOU_START - CROSSFADE
    ? interpolate(frame, [THANKYOU_START - CROSSFADE, THANKYOU_START], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const thankIn = frame >= THANKYOU_START - CROSSFADE
    ? interpolate(frame, [THANKYOU_START - CROSSFADE, THANKYOU_START], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.65} />
      <HexGridOverlay />
      <SegmentTransitionFlash />

      <Sequence name="Shuffle" from={SHUFFLE_START} durationInFrames={SHUFFLE_END - SHUFFLE_START + 1} layout="none">
        {frame < REVEAL_6TH && (
          <AbsoluteFill style={{ zIndex: 10, opacity: shuffleOut }}>
            <ShufflePhase frame={frame} />
          </AbsoluteFill>
        )}
      </Sequence>

      <Sequence name="Reveal (6th → 1st)" from={REVEAL_6TH - CROSSFADE} durationInFrames={ROLL_CALL_START - REVEAL_6TH + CROSSFADE} layout="none">
        {frame >= REVEAL_6TH - CROSSFADE && frame < ROLL_CALL_START && (
          <AbsoluteFill style={{ zIndex: 10, opacity: frame < REVEAL_6TH ? revealIn : revealOut }}>
            <RevealPhase frame={frame} />
          </AbsoluteFill>
        )}
      </Sequence>

      <Sequence name="Podium" from={ROLL_CALL_START - CROSSFADE} durationInFrames={THANKYOU_START - ROLL_CALL_START + CROSSFADE} layout="none">
        {frame >= ROLL_CALL_START - CROSSFADE && frame < THANKYOU_START && (
          <AbsoluteFill style={{ zIndex: 10, opacity: frame < ROLL_CALL_START ? podiumIn : podiumOut }}>
            <RollCallPhase frame={frame} />
          </AbsoluteFill>
        )}
      </Sequence>

      <Sequence name="Thank You + Fade" from={THANKYOU_START - CROSSFADE} durationInFrames={TOTAL_FRAMES - THANKYOU_START + CROSSFADE} layout="none">
        {frame >= THANKYOU_START - CROSSFADE && (
          <AbsoluteFill style={{ zIndex: 10, opacity: frame < THANKYOU_START ? thankIn : 1 }}>
            <ThankYouPhase frame={frame} />
          </AbsoluteFill>
        )}
      </Sequence>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};
