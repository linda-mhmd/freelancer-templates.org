import React from "react";
import type { AtomProps, AtomMeta } from "./registry-core";
import { registerAtom } from "./registry-core";
import { springEntrance, SPRING } from "../animations";
import { interpolate } from "remotion";

export interface CheckmarkAtomProps extends AtomProps {
  checked?: boolean;
  size?: number;
}

export const CheckmarkAtom: React.FC<CheckmarkAtomProps> = ({
  theme,
  frame,
  fps,
  delay = 0,
  checked = true,
  size = 20,
}) => {
  const s = springEntrance(frame, fps, delay, SPRING.snappy);
  const scale = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        background: checked ? theme.accent : "transparent",
        border: `2px solid ${checked ? theme.accent : theme.textMuted}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      )}
    </div>
  );
};

export const CheckmarkAtomMeta: AtomMeta = registerAtom({
  name: "Checkmark",
  category: "data-display",
  compatibleShells: [
    "CardGridShell",
    "TimelineShell",
    "PipelineShell",
    "StatusBoardShell",
    "ListDetailShell",
    "ComparisonShell",
  ],
  requiredProps: [],
  defaultProps: { checked: true, size: 20 },
});
