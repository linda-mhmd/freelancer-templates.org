import React from "react";
import type { Theme } from "../themes";
import type { MoleculeMeta } from "./registry-core";
import { registerMolecule } from "./registry-core";
import { QuoteMarksAtom } from "../atoms/QuoteMarksAtom";
import { LabelAtom } from "../atoms/LabelAtom";
import { DividerAtom } from "../atoms/DividerAtom";
import { springEntrance, slideIn, SPRING } from "../animations";
import { interpolate } from "remotion";

export interface QuoteBlockMoleculeProps {
  theme: Theme;
  frame: number;
  fps: number;
  delay?: number;
  quote: string;
  attribution?: string;
}

export const QuoteBlockMolecule: React.FC<QuoteBlockMoleculeProps> = ({
  theme,
  frame,
  fps,
  delay = 0,
  quote,
  attribution,
}) => {
  const s = springEntrance(frame, fps, delay, SPRING.gentle);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        borderLeft: `3px solid ${theme.accent}`,
        paddingLeft: 20,
        opacity,
        transform: `translateX(${slideIn(s, "left", 20)}px)`,
      }}
    >
      <QuoteMarksAtom theme={theme} frame={frame} fps={fps} delay={delay} />
      <p style={{ fontSize: 16, color: theme.textPrimary, fontFamily: theme.fontFamily, fontWeight: theme.bodyWeight, fontStyle: "italic", margin: "8px 0" }}>
        {quote}
      </p>
      {attribution && (
        <>
          <DividerAtom theme={theme} frame={frame} fps={fps} delay={delay} />
          <div style={{ marginTop: 8 }}>
            <LabelAtom theme={theme} frame={frame} fps={fps} text={`- ${attribution}`} fontSize={12} color="muted" />
          </div>
        </>
      )}
    </div>
  );
};

export const QuoteBlockMoleculeMeta: MoleculeMeta = registerMolecule({
  name: "QuoteBlock",
  atoms: ["QuoteMarks", "Label", "Divider"],
  category: "social",
  compatibleShells: ["CardGridShell", "SplitPanelShell", "ListDetailShell", "ContributorShell"],
});
