/**
 * Screencast Slideshow Template Configuration
 *
 * Defines the template configuration for the ScreencastSlideshow template,
 * including all 17 preset layouts, dimensions, and sample data.
 *
 * The ScreencastSlideshow template displays animated tutorials with:
 * - Smooth crossfade transitions between screenshots
 * - Animated cursor with click indicators
 * - Zoom effects on important UI elements
 * - Step annotations with callouts
 *
 * @module templates/screencastslideshow/config
 * @see Requirements: 4.1, 4.2, 4.4, 5.3
 */

import React from "react";
import type {
  TemplateConfig,
  TemplateProps,
  ValidFps,
} from "../../themes/types";
import {
  ScreencastSlideshow,
  type ScreencastSlideshowProps,
} from "../../tutorials/ScreencastSlideshow";

/**
 * Adapter component that bridges ScreencastSlideshow to TemplateProps interface.
 *
 * The ScreencastSlideshow component uses its own props interface (ScreencastSlideshowProps),
 * so this adapter converts the standard TemplateProps to the expected format.
 *
 * @see Requirements: 4.1
 */
const ScreencastSlideshowAdapter: React.ComponentType<TemplateProps> = (
  props
) => {
  const { spec, layout } = props;

  return (
    <ScreencastSlideshow
      preset={layout || (spec?.preset as string)}
      slides={spec?.slides as ScreencastSlideshowProps["slides"]}
      frameDuration={spec?.frameDuration as number}
      transitionDuration={spec?.transitionDuration as number}
      title={spec?.title as string}
    />
  );
};

/**
 * Sample specification for preview.
 * Uses the studio-basics preset as the default demonstration.
 */
const SAMPLE_SPEC = {
  preset: "studio-basics",
  frameDuration: 90,
  transitionDuration: 15,
};

/**
 * All 17 preset layouts available for the ScreencastSlideshow template.
 *
 * Categories:
 * - Tutorial presets (8): Core Remotion Studio tutorials
 * - Showcase presets (4): Use case inspiration galleries
 * - Project presets (4): Professional workflow case studies
 * - Special presets (1): Video design principles
 *
 * @see Requirements: 4.2
 */
const ALL_LAYOUTS = [
  // Tutorial presets (8 existing)
  "studio-basics",
  "editing-props",
  "cli-rendering",
  "composition-structure",
  "custom-themes",
  "brand-integration",
  "layout-modifications",
  "lambda-deployment",
  // Showcase presets (4 new)
  "showcase-testimonials",
  "showcase-product-launches",
  "showcase-social-content",
  "showcase-educational",
  // Project presets (4 new)
  "project-agency-workflow",
  "project-content-creator",
  "project-freelancer-portfolio",
  "project-saas-marketing",
  // Special presets (1 new)
  "video-design-tips",
] as const;

/**
 * ScreencastSlideshow template configuration.
 *
 * Defines all metadata required for the TemplateRegistry:
 * - Identity: id, name, description
 * - Component: React component reference (adapter)
 * - Variants: all 17 preset layouts
 * - Dimensions: 1280x720 at 30fps (standard HD tutorial format)
 * - Theme compatibility: not theme-dependent (uses own styling)
 * - Sample data: default props and sample specs
 * - Metadata: icon, color, category, implementation status
 *
 * @see Requirements: 4.1, 4.2, 4.4, 5.3
 */
export const SCREENCAST_SLIDESHOW_CONFIG: TemplateConfig = {
  // ── Identity ──────────────────────────────────────────────────────
  id: "screencastslideshow",
  name: "Screencast Slideshow",
  description:
    "Animated tutorial slideshow with screenshots, cursor animations, click indicators, zoom effects, and step annotations. Perfect for software tutorials and product demos.",

  // ── Component Reference ───────────────────────────────────────────
  component: ScreencastSlideshowAdapter,

  // ── Variants (presets act as layouts) ─────────────────────────────
  layouts: [...ALL_LAYOUTS],
  defaultLayout: "studio-basics",

  // ── Dimensions ────────────────────────────────────────────────────
  // Standard HD tutorial format: 1280x720 at 30fps
  // @see Requirements: 5.3
  width: 1280,
  height: 720,
  fps: 30 as ValidFps,
  durationInFrames: 450, // 15 seconds at 30fps (5 slides × 90 frames)

  // ── Theme Compatibility ───────────────────────────────────────────
  // ScreencastSlideshow is not theme-dependent - it uses its own styling
  // for cursor animations, click indicators, and annotations
  compatibleThemes: undefined,
  excludedThemes: undefined,

  // ── Sample Data ───────────────────────────────────────────────────
  defaultProps: {
    spec: SAMPLE_SPEC,
    layout: "studio-basics",
  },
  sampleSpecs: [
    SAMPLE_SPEC as unknown as Record<string, unknown>,
    {
      preset: "showcase-testimonials",
      frameDuration: 90,
      transitionDuration: 15,
    } as unknown as Record<string, unknown>,
    {
      preset: "project-agency-workflow",
      frameDuration: 90,
      transitionDuration: 15,
    } as unknown as Record<string, unknown>,
    {
      preset: "video-design-tips",
      frameDuration: 90,
      transitionDuration: 15,
    } as unknown as Record<string, unknown>,
  ],

  // ── Metadata ──────────────────────────────────────────────────────
  icon: "🎬",
  color: "#3b82f6", // Blue - matches the cursor/click indicator color
  category: "tutorial",
  hasImplementation: true,
};
