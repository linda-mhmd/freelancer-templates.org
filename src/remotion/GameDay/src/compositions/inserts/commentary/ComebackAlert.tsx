/**
 * ComebackAlert - The underdog story
 *
 * A team has dramatically climbed the rankings mid-game.
 * Every great broadcast needs a comeback narrative. This is the moment
 * you point the camera at the underdog and say "watch this team."
 * Creates a rooting interest for the audience and puts pressure on the leaders.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface ComebackAlertProps {
  teamName?: string;
  userGroup?: string;
  fromRank?: number;
  toRank?: number;
}

const DEFAULT_PROPS: ComebackAlertProps = {
  teamName: "Team Name",
  userGroup: "AWS User Group City",
  fromRank: 18,
  toRank: 4,
};

const TITLE = "COMEBACK ALERT";
const ACCENT_COLOR = GD_ACCENT;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px", borderRadius: 20,
    background: `${color}22`, border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label, fontWeight: 800, color,
    letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16,
  }}>{label}</div>
);

export const ComebackAlert: React.FC<ComebackAlertProps> = ({
  teamName = DEFAULT_PROPS.teamName,
  userGroup = DEFAULT_PROPS.userGroup,
  fromRank = DEFAULT_PROPS.fromRank,
  toRank = DEFAULT_PROPS.toRank,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
  const arrowSpring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 8, stiffness: 180 } });
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
        {/* Trending-up arrow icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
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

        <div style={{
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        }}>
          <GlassCard style={{
            padding: "40px 56px", border: `2px solid ${ACCENT_COLOR}40`,
            textAlign: "center", maxWidth: 680,
          }}>
            <StatusBadge label="Moving Up" color={ACCENT_COLOR} />

            <div style={{
              fontSize: TYPOGRAPHY.h2, fontWeight: 800, color: ACCENT_COLOR,
              marginBottom: 8, lineHeight: 1.1,
            }}>
              {teamName}
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.45)", marginBottom: 32,
            }}>
              {userGroup}
            </div>

            {/* Rank jump graphic */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 20,
              opacity: arrowSpring,
              transform: `scale(${interpolate(arrowSpring, [0, 1], [0.8, 1])})`,
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.35)",
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 6,
                }}>Was</div>
                <div style={{
                  fontSize: 52, fontWeight: 900,
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1,
                }}>
                  #{fromRank}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ color: ACCENT_COLOR }}>
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="0" y1="12" x2="32" y2="12"/>
                  <polyline points="24 4 32 12 24 20"/>
                </svg>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.35)",
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 6,
                }}>Now</div>
                <div style={{
                  fontSize: 52, fontWeight: 900,
                  color: ACCENT_COLOR,
                  lineHeight: 1,
                  textShadow: `0 0 30px ${ACCENT_COLOR}80`,
                }}>
                  #{toRank}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div style={{
          marginTop: 40,
          opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <span style={{ fontSize: TYPOGRAPHY.bodySmall, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
            {EVENT_NAME}
          </span>
        </div>
      </AbsoluteFill>

      <AudioBadge muted={false} />
    </AbsoluteFill>
  );
};
