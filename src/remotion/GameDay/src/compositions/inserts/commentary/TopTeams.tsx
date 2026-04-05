/**
 * TopTeams - Current mid-game standings snapshot
 *
 * Show this during gameplay to reveal where teams currently stand.
 * Not the final result - a live standings update to drive competition.
 * Duration: ~30 seconds (900 frames at 30fps)
 */

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_VIOLET, GD_GOLD, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";

export interface TopTeamEntry {
  rank: number;
  name: string;
  group: string;
  score: number;
}

export interface TopTeamsProps {
  label?: string;
  topTeams?: TopTeamEntry[];
}

const DEFAULT_PROPS: TopTeamsProps = {
  label: "Current Standings",
  topTeams: [
    { rank: 1, name: "Team Name Alpha", group: "AWS UG City", score: 4200 },
    { rank: 2, name: "Team Name Beta",  group: "AWS UG City", score: 3850 },
    { rank: 3, name: "Team Name Gamma", group: "AWS UG City", score: 3600 },
  ],
};

const RANK_COLORS = [GD_GOLD, "rgba(255,255,255,0.6)", GD_ACCENT];

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;
const ACCENT_COLOR = GD_VIOLET;

export const TopTeams: React.FC<TopTeamsProps> = ({
  label = DEFAULT_PROPS.label,
  topTeams = DEFAULT_PROPS.topTeams,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const resolvedTopTeams: TopTeamEntry[] = topTeams ?? [
    { rank: 1, name: "Team Name Alpha", group: "AWS UG City", score: 4200 },
    { rank: 2, name: "Team Name Beta",  group: "AWS UG City", score: 3850 },
    { rank: 3, name: "Team Name Gamma", group: "AWS UG City", score: 3600 },
  ];

  const entrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
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
        {/* Chart / ranking icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
            <line x1="2" y1="20" x2="22" y2="20"/>
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
            {label}
          </span>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: ACCENT_COLOR,
            boxShadow: `0 0 ${20 * pulse}px ${ACCENT_COLOR}`, transform: `scale(${pulse})`,
          }} />
        </div>

        {/* Team rows */}
        <GlassCard style={{
          padding: "32px 48px",
          border: `2px solid ${ACCENT_COLOR}40`,
          minWidth: 680, maxWidth: 820,
        }}>
          {resolvedTopTeams.map((team, i) => {
            const rowSpring = spring({
              frame: Math.max(0, frame - (i * 12)),
              fps,
              config: { damping: 12, stiffness: 80 },
            });
            const rankColor = RANK_COLORS[i] ?? "rgba(255,255,255,0.4)";

            return (
              <div key={team.rank} style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                paddingTop: i === 0 ? 0 : 20,
                paddingBottom: i === resolvedTopTeams.length - 1 ? 0 : 20,
                borderBottom: i < resolvedTopTeams.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                opacity: rowSpring,
                transform: `translateX(${interpolate(rowSpring, [0, 1], [-24, 0])}px)`,
              }}>
                {/* Rank */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: `${rankColor}20`,
                  border: `2px solid ${rankColor}60`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: TYPOGRAPHY.label, fontWeight: 800, color: rankColor,
                  }}>
                    {team.rank}
                  </span>
                </div>

                {/* Team info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: TYPOGRAPHY.h5, fontWeight: 700,
                    color: "rgba(255,255,255,0.95)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {team.name}
                  </div>
                  <div style={{
                    fontSize: TYPOGRAPHY.caption, color: "rgba(255,255,255,0.4)",
                    marginTop: 2,
                  }}>
                    {team.group}
                  </div>
                </div>

                {/* Score */}
                <div style={{
                  fontSize: TYPOGRAPHY.h4, fontWeight: 800,
                  color: rankColor,
                  flexShrink: 0,
                }}>
                  {team.score.toLocaleString()}
                </div>
              </div>
            );
          })}
        </GlassCard>

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
