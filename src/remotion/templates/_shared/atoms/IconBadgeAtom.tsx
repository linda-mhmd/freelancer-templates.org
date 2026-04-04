import React from "react";
import type { AtomProps, AtomMeta } from "./registry-core";
import { registerAtom } from "./registry-core";

export interface IconBadgeAtomProps extends AtomProps {
  icon: string;
  size?: number;
  bgColor?: string;
}

export const IconBadgeAtom: React.FC<IconBadgeAtomProps> = ({
  theme,
  icon,
  size = 36,
  bgColor,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 4,
      background: bgColor || `${theme.accent}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.5,
      flexShrink: 0,
    }}
  >
    {icon}
  </div>
);

export const IconBadgeAtomMeta: AtomMeta = registerAtom({
  name: "IconBadge",
  category: "decoration",
  compatibleShells: [
    "HeroStatShell",
    "CardGridShell",
    "TimelineShell",
    "PipelineShell",
    "CategoryGroupShell",
    "StatusBoardShell",
    "ListDetailShell",
    "ContributorShell",
  ],
  requiredProps: ["icon"],
  defaultProps: { icon: "zap", size: 36 },
});
