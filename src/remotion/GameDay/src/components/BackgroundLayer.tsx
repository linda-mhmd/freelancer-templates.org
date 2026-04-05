import { Img, staticFile } from "remotion";
import React from "react";
import { GD_DARK } from "../design/colors";

const BG_IMAGE = staticFile("assets/background-landscape.png");

export const BackgroundLayer: React.FC<{ darken?: number }> = ({
  darken = 0.65,
}) => (
  <>
    <Img
      src={BG_IMAGE}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `rgba(12,8,32,${darken})`,
      }}
    />
  </>
);
