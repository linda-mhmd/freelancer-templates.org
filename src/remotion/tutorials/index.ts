/**
 * Video Tutorial Screencasts - Main exports
 *
 * This module exports all components and utilities for the tutorial system.
 */

// Main composition
export { TutorialComposition, GIF_OPTIMIZED, getOptimizedSettings } from './TutorialComposition';

// Simple slideshow composition
export { ScreencastSlideshow } from './ScreencastSlideshow';

// Overlay components
export { CursorOverlay } from './overlays/CursorOverlay';
export { ZoomEffect } from './overlays/ZoomEffect';
export { HighlightBox } from './overlays/HighlightBox';
export { AnnotationOverlay } from './overlays/AnnotationOverlay';

// Utilities
export * from './utils/easing';
export * from './utils/frameLoader';

// Types
export type {
  TutorialCompositionProps,
  CaptureMetadata,
  FrameData,
  ClickEvent,
  CursorOverlayProps,
  ZoomEffectProps,
  ZoomConfig,
  HighlightBoxProps,
  HighlightConfig,
  HighlightStyle,
  AnnotationOverlayProps,
  AnnotationConfig,
  AnnotationStyle,
  ArrowConfig,
  OverlayConfig,
  OverlayItem,
  CursorConfig,
  EasingFunction,
  EasingType,
  Position,
  Region,
} from './types';

export type { ScreencastSlideshowProps } from './ScreencastSlideshow';
