/**
 * CloseRace - Two teams are neck and neck
 *
 * The "it's anyone's game" commentary moment.
 * Use mid-game when top teams are separated by a small margin.
 * Creates urgency and drives both teams and audience engagement.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface CloseRaceProps {
  teamA?: string;
  teamB?: string;
  pointDiff?: number;
}

const DEFAULT_PROPS: CloseRaceProps = {
  teamA: "Team Name Alpha",
  teamB: "Team Name Beta",
  pointDiff: 50,
};

const TITLE = "IT'S A CLOSE RACE";
const ACCENT_COLOR = GD_ACCENT;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

export const CloseRace: React.FC<CloseRaceProps> = ({
  teamA = DEFAULT_PROPS.teamA,
  teamB = DEFAULT_PROPS.teamB,
  pointDiff = DEFAULT_PROPS.pointDiff,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const card1Spring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 80 } });
  const card2Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 80 } });
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.8, 1, 0.8], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: "'Inter', sans-serif", background: GD_DARK }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: 60, opacity: exitOpacity,
      }}>
        {/* Flame / zap icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 40,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
          <span style={{
            fontSize: TYPOGRAPHY.h3, fontWeight: 700, color: ACCENT_COLOR,
            letterSpacing: 3, textTransform: "uppercase",
          }}>{TITLE}</span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Two teams facing off */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, maxWidth: 900 }}>
          {/* Team A */}
          <div style={{
            width: 380, flexShrink: 0,
            opacity: card1Spring,
            transform: `translateX(${interpolate(card1Spring, [0, 1], [-40, 0])}px)`,
          }}>
            <GlassCard style={{
              padding: "32px 28px",
              border: `2px solid ${ACCENT_COLOR}40`,
              textAlign: "center",
              width: "100%", boxSizing: "border-box" as const,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.caption, fontWeight: 600,
                color: "rgba(255,255,255,0.35)", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 12,
              }}>
                Leading
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.h4, fontWeight: 800,
                color: ACCENT_COLOR, lineHeight: 1.2,
              }}>
                {teamA}
              </div>
            </GlassCard>
          </div>

          {/* VS divider */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, flexShrink: 0,
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{
              fontSize: TYPOGRAPHY.h3, fontWeight: 900,
              color: "rgba(255,255,255,0.3)",
            }}>vs</span>
            <div style={{
              fontSize: TYPOGRAPHY.caption, fontWeight: 700,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 1, textAlign: "center",
              lineHeight: 1.4,
            }}>
              {pointDiff} pts{"\n"}apart
            </div>
          </div>

          {/* Team B */}
          <div style={{
            width: 380, flexShrink: 0,
            opacity: card2Spring,
            transform: `translateX(${interpolate(card2Spring, [0, 1], [40, 0])}px)`,
          }}>
            <GlassCard style={{
              padding: "32px 28px",
              border: `2px solid ${ACCENT_COLOR}40`,
              textAlign: "center",
              width: "100%", boxSizing: "border-box" as const,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.caption, fontWeight: 600,
                color: "rgba(255,255,255,0.35)", letterSpacing: 2,
                textTransform: "uppercase", marginBottom: 12,
              }}>
                Chasing
              </div>
              <div style={{
                fontSize: TYPOGRAPHY.h4, fontWeight: 800,
                color: "rgba(255,255,255,0.85)", lineHeight: 1.2,
              }}>
                {teamB}
              </div>
            </GlassCard>
          </div>
        </div>

        <div style={{
          marginTop: 32,
          opacity: interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{
            fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
          }}>
            Everything can change in the next quest
          </span>
        </div>

        <div style={{
          marginTop: 20,
          opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.35)", letterSpacing: 2 }}>
            {EVENT_NAME}
          </span>
        </div>
      </AbsoluteFill>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};
