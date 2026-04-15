/**
 * TypeScript interfaces and types for Screencast Slideshow Presets
 *
 * This file defines all the type definitions used by the preset system including:
 * - ClickTarget: Cursor click position configuration
 * - ZoomRegion: Zoom effect configuration
 * - SlideConfig: Individual slide configuration
 * - PresetDefinition: Complete preset definition with metadata
 *
 * Requirements: 1.5, 2.5, 8.3, 8.4, 8.5
 */

/**
 * Represents a click target position for cursor animation
 * Coordinates are percentages (0-100) from the top-left corner
 */
export interface ClickTarget {
  /** X coordinate as percentage from left (0-100) */
  x: number;
  /** Y coordinate as percentage from top (0-100) */
  y: number;
  /** Optional label text to display near the click target */
  label?: string;
}

/**
 * Represents a zoom region configuration for zoom effects
 * Coordinates are percentages (0-100) representing the center point
 */
export interface ZoomRegion {
  /** Center X coordinate as percentage (0-100) */
  x: number;
  /** Center Y coordinate as percentage (0-100) */
  y: number;
  /** Zoom magnification level (1.0-4.0) */
  scale: number;
}

/**
 * Configuration for a single slide in a screencast slideshow
 * Each slide displays a screenshot with optional interactive elements
 */
export interface SlideConfig {
  /** Path to screenshot image relative to static/ directory */
  screenshot: string;
  /** Optional click target for cursor animation */
  clickTarget?: ClickTarget;
  /** Optional zoom region for zoom effect */
  zoomRegion?: ZoomRegion;
  /** Optional step annotation text displayed on the slide */
  annotation?: string;
}

/**
 * Complete preset definition with metadata and slide configurations
 * Used to define reusable screencast slideshow presets
 */
export interface PresetDefinition {
  /** Unique identifier in kebab-case format (e.g., 'studio-basics') */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Category for organizing presets */
  category: 'tutorial' | 'showcase' | 'project' | 'special';
  /** Array of slide configurations for this preset */
  slides: SlideConfig[];
  /** Duration per slide in frames (default: 90 = 3s at 30fps) */
  frameDuration?: number;
  /** Transition duration between slides in frames (default: 15 = 0.5s) */
  transitionDuration?: number;
}
