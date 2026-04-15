/**
 * Foodie Reel — 1080×1920 portrait
 *
 * Close-up food shot with animated steam wisps, sticker price tag badge,
 * restaurant/dish name in large kinetic type, and emoji-filled caption.
 * Sequence: establish → steam rises → name slams in → price sticker pops.
 *
 * Total: 240 frames (8s @ 30fps)
 */

import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PORTRAIT_TYPE, PORTRAIT_PADDING } from "../_shared/PortraitTypes";
import { getSafeZone, type PlatformId } from "../_shared/PlatformSafeZones";
import { getStockImage } from "../_shared/StockImages";
import {
  AnimatedSparkles,
  BlobShape,
  ConfettiBurst,
  StickerBadge,
  SteamAnimation,
  WavyText,
} from "../_shared/PlayfulElements";
import { SPRING } from "../_shared/animations";
import type { Theme } from "../_shared/themes";

// ── Constants ──────────────────────────────────────────────────

export const FR_TOTAL_FRAMES = 240;

// ── Props ──────────────────────────────────────────────────────

export interface FoodieReelProps {
  platform: PlatformId;
  theme: Theme;
  dishName?: string;
  restaurant?: string;
  price?: string;
  caption?: string;
  foodImageUrl?: string;
  style?: "warm" | "fresh";
}

// ── Main composition ───────────────────────────────────────────

export const FoodieReel: React.FC<FoodieReelProps> = ({
  platform,
  theme,
  dishName = "Truffle Ramen",
  restaurant = "@littletokyonyc",
  price = "$18",
  caption = "10/10 would slurp again 🍜🔥",
  foodImageUrl,
  style = "warm",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = getSafeZone(platform);

  const imgUrl = foodImageUrl ?? getStockImage("food", 1080, 1920, style === "warm" ? 1 : 3);

  // Image scale — gentle zoom as if reaching for the dish
  const imgScale = interpolate(frame, [0, FR_TOTAL_FRAMES], [1.0, 1.08]);

  // Text entrances — staggered for drama
  const nameEnter = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 8, stiffness: 200 } });
  const restEnter = spring({ frame: Math.max(0, frame - 65), fps, config: SPRING.snappy });
  const priceEnter = spring({ frame: Math.max(0, frame - 80), fps, config: SPRING.bouncy });
  const captionEnter = spring({ frame: Math.max(0, frame - 100), fps, config: SPRING.gentle });

  // Color scheme
  const warmBg = "linear-gradient(0deg, rgba(60,20,0,0.92) 0%, rgba(40,10,0,0.6) 40%, transparent 70%)";
  const freshBg = "linear-gradient(0deg, rgba(0,30,20,0.92) 0%, rgba(0,20,10,0.6) 40%, transparent 70%)";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Food photo with zoom */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={imgUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            filter: style === "warm"
              ? "saturate(1.4) contrast(1.1) brightness(1.05)"
              : "saturate(1.3) hue-rotate(15deg) brightness(1.1)",
          }}
        />
        <AbsoluteFill style={{ background: style === "warm" ? warmBg : freshBg }} />
      </AbsoluteFill>

      {/* Steam animation — rises from mid-frame */}
      <SteamAnimation
        count={4}
        color={style === "warm" ? "rgba(255,220,180,0.45)" : "rgba(200,255,220,0.45)"}
        startAt={15}
        x={width / 2}
        y={height * 0.55}
      />

      {/* Blob background accent behind text */}
      <div style={{ position: "absolute", bottom: safe.bottom + 40, left: -100 }}>
        <BlobShape
          color={style === "warm" ? "#f97316" : "#10b981"}
          size={400}
          opacity={0.12}
          morph={30}
          startAt={20}
        />
      </div>

      {/* Sparkles */}
      <AnimatedSparkles
        count={style === "warm" ? 10 : 8}
        color={style === "warm" ? "#fbbf24" : "#34d399"}
        startAt={25}
        seed="fr-sparks"
      />

      {/* Confetti on dish name slam */}
      <ConfettiBurst
        triggerFrame={40}
        count={20}
        colors={style === "warm"
          ? ["#f97316", "#fbbf24", "#ef4444", "#ffffff"]
          : ["#10b981", "#34d399", "#06b6d4", "#ffffff"]}
        cx={0.5} cy={0.5}
      />

      {/* Text block */}
      <div style={{
        position: "absolute",
        bottom: safe.bottom + 60,
        left: PORTRAIT_PADDING,
        right: PORTRAIT_PADDING,
      }}>
        {/* Dish name — kinetic */}
        <div style={{
          transform: `scale(${nameEnter}) translateY(${(1 - nameEnter) * 60}px)`,
          transformOrigin: "left bottom",
          marginBottom: 12,
        }}>
          <WavyText
            text={dishName}
            color="#ffffff"
            fontSize={PORTRAIT_TYPE.title}
            amplitude={8}
            speed={0.7}
          />
        </div>

        {/* Restaurant handle */}
        <div style={{
          fontFamily: theme.fontFamily,
          fontWeight: 600,
          fontSize: PORTRAIT_TYPE.body,
          color: "rgba(255,255,255,0.75)",
          opacity: restEnter,
          transform: `translateX(${(1 - restEnter) * -30}px)`,
          marginBottom: 20,
        }}>
          {restaurant}
        </div>

        {/* Price sticker */}
        <div style={{
          display: "inline-block",
          marginBottom: 20,
          transform: `scale(${priceEnter}) rotate(-5deg)`,
          transformOrigin: "left center",
        }}>
          <StickerBadge
            text={`🏷️ ${price}`}
            color={style === "warm" ? "#f97316" : "#10b981"}
            textColor="#ffffff"
            rotation={0}
            enterAt={80}
            size="md"
          />
        </div>

        {/* Caption */}
        <div style={{
          fontFamily: theme.fontFamily,
          fontWeight: 500,
          fontSize: PORTRAIT_TYPE.label,
          color: "rgba(255,255,255,0.9)",
          opacity: captionEnter,
          transform: `translateY(${(1 - captionEnter) * 20}px)`,
        }}>
          {caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};
