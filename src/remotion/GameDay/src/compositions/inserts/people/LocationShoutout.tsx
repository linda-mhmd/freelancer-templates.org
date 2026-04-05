import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundLayer, HexGridOverlay, GlassCard, AudioBadge } from "../../../components";
import { GD_DARK, GD_ACCENT } from "../../../design/colors";
import { TYPOGRAPHY } from "../../../design/typography";
import { EVENT_NAME } from "../../../../config/event";
import { ORGANIZERS } from "../../../../config/participants";

export interface LocationShoutoutProps {
  city?: string;
  country?: string;
  flag?: string;
}

const _host = ORGANIZERS.find((p) => p.streamRole === "host");
const [_hostCity, _hostCountry] = (_host?.location ?? "Vienna, Austria").split(", ");
const DEFAULT_PROPS: LocationShoutoutProps = {
  city: _hostCity,
  country: _hostCountry,
  flag: _host?.flag ?? "🇦🇹",
};

const TITLE = "HELLO FROM...";
const ACCENT_COLOR = GD_ACCENT;

const TOTAL_FRAMES = 900;
const FADE_OUT_START = 840;

const StatusBadge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center",
    padding: "4px 14px",
    borderRadius: 20,
    background: `${color}22`,
    border: `1.5px solid ${color}70`,
    fontSize: TYPOGRAPHY.label,
    fontWeight: 800,
    color: color,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    marginBottom: 12,
  }}>{label}</div>
);

export const LocationShoutout: React.FC<LocationShoutoutProps> = ({
  city = DEFAULT_PROPS.city,
  country = DEFAULT_PROPS.country,
  flag = DEFAULT_PROPS.flag,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const MESSAGE = `A warm hello to all participants at ${city}, ${country}! You are part of something special today.`;

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
        {/* Large map pin icon */}
        <div style={{
          width: 72, height: 72, color: ACCENT_COLOR, marginBottom: 24,
          opacity: entrySpring,
          transform: `translateY(${interpolate(entrySpring, [0, 1], [-20, 0])}px)`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
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
          display: "flex", justifyContent: "center",
        }}>
          <GlassCard style={{
            padding: 48, border: `2px solid ${ACCENT_COLOR}40`, maxWidth: 700, textAlign: "center",
          }}>
            <StatusBadge label="SHOUTOUT" color={ACCENT_COLOR} />
            <div style={{
              fontSize: TYPOGRAPHY.h4, fontWeight: 800, color: ACCENT_COLOR,
              marginBottom: 16, letterSpacing: 1,
            }}>
              {city}, {country} [{flag}]
            </div>
            <p style={{
              fontSize: TYPOGRAPHY.h5, color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6, margin: 0, fontWeight: 500,
            }}>{MESSAGE}</p>
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
