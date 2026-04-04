import React from "react";
import type { Theme } from "../themes";
import type { MoleculeMeta } from "./registry-core";
import { registerMolecule } from "./registry-core";
import { IconBadgeAtom } from "../atoms/IconBadgeAtom";
import { HeadingAtom } from "../atoms/HeadingAtom";
import { LabelAtom } from "../atoms/LabelAtom";
import { springEntrance, slideIn, SPRING } from "../animations";
import { interpolate } from "remotion";

export interface FeatureCardMoleculeProps {
  theme: Theme;
  frame: number;
  fps: number;
  delay?: number;
  icon?: string;
  title: string;
  description: string;
}

export const FeatureCardMolecule: React.FC<FeatureCardMoleculeProps> = ({
  theme,
  frame,
  fps,
  delay = 0,
  icon = "+",
  title,
  description,
}) => {
  const s = springEntrance(frame, fps, delay, SPRING.default);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: theme.bgGlass,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 12,
        padding: 20,
        opacity,
        transform: `translateY(${slideIn(s, "up", 25)}px)`,
      }}
    >
      <IconBadgeAtom theme={theme} frame={frame} fps={fps} delay={delay} icon={icon} size={28} />
      <div style={{ marginTop: 12 }}>
        <HeadingAtom theme={theme} frame={frame} fps={fps} delay={delay} text={title} fontSize={16} />
      </div>
      <div style={{ marginTop: 6 }}>
        <LabelAtom theme={theme} frame={frame} fps={fps} text={description} fontSize={13} color="secondary" />
      </div>
    </div>
  );
};

export const FeatureCardMoleculeMeta: MoleculeMeta = registerMolecule({
  name: "FeatureCard",
  atoms: ["IconBadge", "Heading", "Label"],
  category: "content",
  compatibleShells: ["CardGridShell", "CategoryGroupShell", "SplitPanelShell", "HeroStatShell"],
});
