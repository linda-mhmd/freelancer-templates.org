import React from "react";
import { GlassCard } from "./GlassCard";
import { GD_ACCENT, GD_ORANGE } from "../design/colors";

export const AudioBadge: React.FC<{ muted: boolean }> = ({ muted }) => {
  const color = muted ? GD_ACCENT : GD_ORANGE;
  return (
    <div style={{ position: "absolute", bottom: 16, right: 36, zIndex: 50 }}>
      <GlassCard
        style={{
          padding: "8px 16px",
          borderRadius: 12,
          border: `1px solid ${color}40`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
            color,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
          }}
        >
          {muted ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <line x1="23" y1="9" x2="17" y2="15" stroke={color} strokeWidth="2" />
              <line x1="17" y1="9" x2="23" y2="15" stroke={color} strokeWidth="2" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M14.54 7.46a5 5 0 0 1 0 9.08" fill="none" stroke={color} strokeWidth="2" />
              <path d="M18.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke={color} strokeWidth="2" />
            </svg>
          )}
          {muted ? "MUTED" : "AUDIO ON"}
        </div>
      </GlassCard>
    </div>
  );
};
