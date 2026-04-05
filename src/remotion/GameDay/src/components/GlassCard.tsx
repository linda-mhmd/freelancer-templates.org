import React from "react";

export const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: 28,
      boxShadow:
        "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);
