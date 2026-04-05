import { AbsoluteFill } from "remotion";
import React from "react";
import { GD_PURPLE } from "../design/colors";

export const HexGridOverlay: React.FC = () => (
  <AbsoluteFill style={{ opacity: 0.04 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="hexGrid"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z"
            fill="none"
            stroke={GD_PURPLE}
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexGrid)" />
    </svg>
  </AbsoluteFill>
);
