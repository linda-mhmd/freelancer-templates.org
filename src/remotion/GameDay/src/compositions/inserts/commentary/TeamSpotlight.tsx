/**
 * TeamSpotlight - Human interest moment, mid-game
 *
 * Use during gameplay lulls to shine a light on a specific team.
 * This is the broadcast equivalent of "let's check in with Team X" -
 * it keeps the stream personal and gives the audience someone to root for.
 * Use 2-3 times per event, rotating through different teams and regions.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_VIOLET } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface TeamSpotlightProps {
  teamName?: string;
  userGroup?: string;
  country?: string;
  countryFlag?: string;
  fact?: string;
}

const DEFAULT_PROPS: TeamSpotlightProps = {
  teamName: "Team Name",
  userGroup: "AWS User Group City",
  country: "Country",
  countryFlag: "🇦🇹",
  fact: "Competing together for the first time!",
};

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;
const ACCENT_COLOR = GD_VIOLET;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px", borderRadius: 20,
    background: `${color}22`, border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label, fontWeight: 800, color,
    letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 20,
  }}>{label}</div>
);

export const TeamSpotlight: React.FC<TeamSpotlightProps> = ({
  teamName = DEFAULT_PROPS.teamName,
  userGroup = DEFAULT_PROPS.userGroup,
  country = DEFAULT_PROPS.country,
  countryFlag = DEFAULT_PROPS.countryFlag,
  fact = DEFAULT_PROPS.fact,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 80 } });
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
        {/* Spotlight / user-group icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
          }}>
            Team Spotlight
          </span>
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
            <StatusBadge label="Competing Now" color={ACCENT_COLOR} />

            {/* Team name */}
            <div style={{
              fontSize: TYPOGRAPHY.h2, fontWeight: 800,
              color: ACCENT_COLOR, marginBottom: 12, lineHeight: 1.1,
            }}>
              {teamName}
            </div>

            {/* Location line */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginBottom: 28,
            }}>
              <span style={{ fontSize: 24 }}>{countryFlag}</span>
              <span style={{
                fontSize: TYPOGRAPHY.body, color: "rgba(255,255,255,0.55)", fontWeight: 500,
              }}>
                {userGroup} - {country}
              </span>
            </div>

            <div style={{
              width: 48, height: 1, background: `${ACCENT_COLOR}40`, margin: "0 auto 24px",
            }} />

            {/* Human-interest fact */}
            <p style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6, margin: 0, fontWeight: 400, fontStyle: "italic",
            }}>
              "{fact}"
            </p>
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
