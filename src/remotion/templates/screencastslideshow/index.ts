/**
 * Screencast Slideshow Template - Barrel exports
 *
 * This file serves as the central export point for the ScreencastSlideshow template.
 * It re-exports the component, types, presets, and configuration from the tutorials module.
 *
 * Requirements: 4.1, 4.2, 4.4, 5.3
 */

// Re-export the main component
export { ScreencastSlideshow } from '../../tutorials/ScreencastSlideshow';

// Re-export types
export type {
  ScreencastSlideshowProps,
  SlideConfig,
  ClickTarget,
  ZoomRegion,
} from '../../tutorials/ScreencastSlideshow';

// Re-export presets and preset utilities
export {
  SLIDE_PRESETS,
  PRESET_METADATA,
  getAllPresetIds,
  getPresetsByCategory,
  getPresetById,
  isValidPresetId,
  getPresetSlideCount,
  getPresetDurationInFrames,
} from '../../tutorials/presets';

// Re-export preset types
export type { PresetDefinition } from '../../tutorials/presets';

// Re-export template configuration
export { SCREENCAST_SLIDESHOW_CONFIG } from './config';
