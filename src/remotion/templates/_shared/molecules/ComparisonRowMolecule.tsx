import React from "react";
import type { Theme } from "../themes";
import type { MoleculeMeta } from "./registry-core";
import { registerMolecule } from "./registry-core";
import { LabelAtom } from "../atoms/LabelAtom";
import { CheckmarkAtom } from "../atoms/CheckmarkAtom";
import { springEntrance, slideIn, SPRING } from "../animations";
import { interpolate } from "remotion";

export interface ComparisonRowMoleculeProps {
  theme: Theme;
  frame: number;
  fps: number;
  delay?: number;
  feature: string;
  values: Array<boolean | string>;
}

export const ComparisonRowMolecule: React.FC<ComparisonRowMoleculeProps> = ({
  theme,
  frame,
  fps,
  delay = 0,
  feature,
  values,
}) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: `1px solid ${theme.cardBorder}`,
        opacity,
        transform: `translateX(${slideIn(s, "left", 15)}px)`,
      }}
    >
      <div style={{ flex: 1 }}>
        <LabelAtom theme={theme} frame={frame} fps={fps} text={feature} fontSize={13} color="primary" />
      </div>
      {values.map((val, i) => (
        <div key={i} style={{ width: 100, textAlign: "center" }}>
          {typeof val === "boolean" ? (
            val ? (
              <CheckmarkAtom theme={theme} frame={frame} fps={fps} delay={delay + i * 5} size={16} />
            ) : (
              <span style={{ color: theme.textMuted, fontSize: 16 }}>-</span>
            )
          ) : (
            <LabelAtom theme={theme} frame={frame} fps={fps} text={val} fontSize={13} color="secondary" />
          )}
        </div>
      ))}
    </div>
  );
};

export const ComparisonRowMoleculeMeta: MoleculeMeta = registerMolecule({
  name: "ComparisonRow",
  atoms: ["Label", "Checkmark"],
  category: "pricing",
  compatibleShells: ["ComparisonShell", "CardGridShell", "ListDetailShell"],
});
