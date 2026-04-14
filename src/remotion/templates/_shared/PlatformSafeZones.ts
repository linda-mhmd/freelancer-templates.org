/**
 * Platform-aware safe zones and caption rules.
 *
 * Single source of truth for "where can text actually go on each platform"
 * so portrait templates render correctly on TikTok / Reels / Shorts /
 * LinkedIn without UI overlays clipping content.
 *
 * Specs sourced from the video-flow platform_playbook.yaml — these match
 * what TikTok Creator Portal, Meta Business Suite, and YouTube Studio
 * documented as of 2025/2026.
 */

export type PlatformId =
  | "tiktok_vertical"
  | "instagram_reels"
  | "youtube_shorts"
  | "linkedin_landscape"
  | "linkedin_square";

export type CaptionPosition =
  | "upper_third"
  | "middle_third"
  | "lower_third"
  | "center";

export type CaptionStyle =
  | "bold_sans_white_black_stroke_4px" // TikTok
  | "editorial_serif_thin_rule" // Instagram
  | "burned_in_bold_sans" // YouTube Shorts
  | "professional_sans"; // LinkedIn

export interface PlatformSpec {
  id: PlatformId;
  displayName: string;
  aspectRatio: string;
  width: number;
  height: number;
  /** Pixels reserved at top for native UI (avoid placing text here) */
  safeZoneTop: number;
  /** Pixels reserved at bottom for native UI */
  safeZoneBottom: number;
  /** Where the playbook recommends primary captions live */
  captionPosition: CaptionPosition;
  /** Visual style of the caption (matches playbook ai_generic_tells warnings) */
  captionStyle: CaptionStyle;
  /** Max characters per line for caption to stay readable on phone */
  captionMaxCharsPerLine: number;
  /** Max number of lines before caption is too dense */
  captionMaxLines: number;
  /** Hook duration in frames (at 30fps) — must land in this many frames */
  hookFrames: number;
  /** Average cut cadence in frames */
  avgCutCadenceFrames: number;
  /** Whether the last frame must visually match the first (loop) */
  loopRequired: boolean;
}

export const PLATFORM_SPECS: Record<PlatformId, PlatformSpec> = {
  tiktok_vertical: {
    id: "tiktok_vertical",
    displayName: "TikTok",
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    safeZoneTop: 220, // username overlay
    safeZoneBottom: 280, // action bar + caption
    captionPosition: "upper_third", // NEVER lower-third on TikTok
    captionStyle: "bold_sans_white_black_stroke_4px",
    captionMaxCharsPerLine: 32,
    captionMaxLines: 2,
    hookFrames: 45, // 1.5s
    avgCutCadenceFrames: 30, // 1.0s per cut
    loopRequired: false,
  },
  instagram_reels: {
    id: "instagram_reels",
    displayName: "Instagram Reels",
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    safeZoneTop: 180,
    safeZoneBottom: 220,
    captionPosition: "lower_third",
    captionStyle: "editorial_serif_thin_rule",
    captionMaxCharsPerLine: 40,
    captionMaxLines: 2,
    hookFrames: 90, // 3s — IG audience tolerates more setup
    avgCutCadenceFrames: 60, // 2s per cut
    loopRequired: false,
  },
  youtube_shorts: {
    id: "youtube_shorts",
    displayName: "YouTube Shorts",
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    safeZoneTop: 160,
    safeZoneBottom: 260, // YT auto-captions render here
    captionPosition: "middle_third",
    captionStyle: "burned_in_bold_sans",
    captionMaxCharsPerLine: 28,
    captionMaxLines: 2,
    hookFrames: 90,
    avgCutCadenceFrames: 45,
    loopRequired: true, // last 0.5s must match first 0.5s
  },
  linkedin_landscape: {
    id: "linkedin_landscape",
    displayName: "LinkedIn Landscape",
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    safeZoneTop: 80,
    safeZoneBottom: 80,
    captionPosition: "lower_third",
    captionStyle: "professional_sans",
    captionMaxCharsPerLine: 42,
    captionMaxLines: 2,
    hookFrames: 180, // 6s — LinkedIn autoplays muted
    avgCutCadenceFrames: 75, // 2.5s
    loopRequired: false,
  },
  linkedin_square: {
    id: "linkedin_square",
    displayName: "LinkedIn Square",
    aspectRatio: "1:1",
    width: 1080,
    height: 1080,
    safeZoneTop: 60,
    safeZoneBottom: 80,
    captionPosition: "lower_third",
    captionStyle: "professional_sans",
    captionMaxCharsPerLine: 38,
    captionMaxLines: 3,
    hookFrames: 150, // 5s — muted autoplay
    avgCutCadenceFrames: 60,
    loopRequired: false,
  },
};

export function getSafeZone(platform: PlatformId): {
  top: number;
  bottom: number;
  width: number;
  height: number;
  /** Available content height after deducting safe zones */
  contentHeight: number;
} {
  const spec = PLATFORM_SPECS[platform];
  return {
    top: spec.safeZoneTop,
    bottom: spec.safeZoneBottom,
    width: spec.width,
    height: spec.height,
    contentHeight: spec.height - spec.safeZoneTop - spec.safeZoneBottom,
  };
}

/**
 * Resolve a vertical "anchor" (where on the canvas to place a block) to a
 * concrete top/height in pixels, respecting the platform's safe zones.
 */
export function getCaptionAnchor(
  platform: PlatformId,
  position?: CaptionPosition
): { top: number; height: number } {
  const spec = PLATFORM_SPECS[platform];
  const anchor = position ?? spec.captionPosition;
  const safeTop = spec.safeZoneTop;
  const safeBottom = spec.safeZoneBottom;
  const contentH = spec.height - safeTop - safeBottom;

  switch (anchor) {
    case "upper_third":
      return { top: safeTop + contentH * 0.05, height: contentH * 0.3 };
    case "middle_third":
      return { top: safeTop + contentH * 0.35, height: contentH * 0.3 };
    case "lower_third":
      return { top: safeTop + contentH * 0.7, height: contentH * 0.25 };
    case "center":
      return { top: safeTop + contentH * 0.4, height: contentH * 0.2 };
  }
}

/**
 * Returns CSS style fragments for the platform's recommended caption style.
 * Tested against the "ai_generic_tells" warnings in the playbook to avoid
 * captions that read as generic/AI-generated.
 */
export function getCaptionStyle(platform: PlatformId): {
  fontFamily: string;
  fontWeight: number;
  color: string;
  textShadow?: string;
  WebkitTextStroke?: string;
  borderTop?: string;
  borderBottom?: string;
  textTransform?: "uppercase" | "none";
  letterSpacing?: string;
} {
  const style = PLATFORM_SPECS[platform].captionStyle;
  switch (style) {
    case "bold_sans_white_black_stroke_4px":
      // TikTok native caption — chunky white with black stroke
      return {
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 900,
        color: "#ffffff",
        WebkitTextStroke: "4px #000000",
        textShadow: "0 4px 16px rgba(0,0,0,0.6)",
      };
    case "editorial_serif_thin_rule":
      // Instagram editorial — serif with thin rule above
      return {
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontWeight: 400,
        color: "#ffffff",
        textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        borderTop: "1px solid rgba(255,255,255,0.6)",
      };
    case "burned_in_bold_sans":
      // YouTube Shorts — burned in, bold, no fade
      return {
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 800,
        color: "#ffffff",
        textShadow: "0 4px 14px rgba(0,0,0,0.7)",
      };
    case "professional_sans":
      // LinkedIn — formal, restrained
      return {
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 600,
        color: "#ffffff",
        letterSpacing: "0.01em",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
      };
  }
}

/**
 * Wraps a string of text into lines respecting the platform's max chars/line.
 * Cuts at word boundaries; truncates to maxLines with an ellipsis if needed.
 */
export function fitCaption(
  platform: PlatformId,
  text: string
): { lines: string[]; truncated: boolean } {
  const { captionMaxCharsPerLine: max, captionMaxLines } =
    PLATFORM_SPECS[platform];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if ((current + " " + word).length <= max) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === captionMaxLines) break;
    }
  }
  if (current && lines.length < captionMaxLines) lines.push(current);

  const truncated =
    lines.length === captionMaxLines &&
    lines.join(" ").length < text.length;
  if (truncated) {
    const last = lines[captionMaxLines - 1];
    lines[captionMaxLines - 1] =
      last.length > max - 1 ? last.slice(0, max - 1) + "…" : last + "…";
  }
  return { lines, truncated };
}
