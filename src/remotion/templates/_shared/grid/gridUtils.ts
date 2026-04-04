/**
 * Grid System - Pure Calculation Functions
 *
 * All layout math for the 12-column grid lives here.
 * No React, no side-effects - just numbers in, numbers out.
 *
 * Frame constants: 1280×720, 12 columns.
 * Default gutter: 16px, default padding: 40px.
 */

const FRAME_WIDTH = 1280;
const COLUMNS = 12;

// ── Clamping / Sanitisation ─────────────────────────────────────

/**
 * Clamp gutter and padding to non-negative values.
 * Logs a warning when negative values are corrected.
 */
export function clampValues(
  gutterWidth: number,
  padding: number,
): { gutterWidth: number; padding: number } {
  let g = gutterWidth;
  let p = padding;

  if (g < 0) {
    console.warn(`[GridSystem] Negative gutterWidth (${g}) clamped to 0`);
    g = 0;
  }
  if (p < 0) {
    console.warn(`[GridSystem] Negative padding (${p}) clamped to 0`);
    p = 0;
  }

  return { gutterWidth: g, padding: p };
}

/**
 * Clamp colSpan to [1, 12]. If colStart is provided, ensure
 * colStart + colSpan − 1 ≤ 12 (i.e. the cell fits in the grid).
 */
export function clampColSpan(colSpan: number, colStart?: number): number {
  let span = colSpan;

  if (span < 1) {
    console.warn(`[GridSystem] colSpan (${span}) clamped to 1`);
    span = 1;
  } else if (span > COLUMNS) {
    console.warn(`[GridSystem] colSpan (${span}) clamped to ${COLUMNS}`);
    span = COLUMNS;
  }

  if (colStart !== undefined) {
    const maxSpan = COLUMNS - colStart + 1;
    if (span > maxSpan) {
      console.warn(
        `[GridSystem] colStart(${colStart}) + colSpan(${span}) exceeds 12 - colSpan clamped to ${maxSpan}`,
      );
      span = Math.max(1, maxSpan);
    }
  }

  return span;
}

// ── Width / Position Calculations ───────────────────────────────

/**
 * Total content width available after subtracting outer padding and
 * all 11 inter-column gutters.
 *
 *   availableWidth = frameWidth − 2×padding − 11×gutterWidth
 */
export function calcAvailableWidth(
  frameWidth: number,
  padding: number,
  gutterWidth: number,
): number {
  return frameWidth - 2 * padding - (COLUMNS - 1) * gutterWidth;
}

/**
 * Width of a single grid cell spanning `colSpan` columns.
 *
 *   cellWidth = (colSpan / 12) × availableWidth
 *
 * This is the *content* width - gutters between spanned columns are
 * NOT included because the design treats each cell as a content box
 * and gutters sit between cells.
 *
 * Verification: 12 × calcCellWidth(1, …) + 11 × gutterWidth + 2 × padding = frameWidth
 */
export function calcCellWidth(
  colSpan: number,
  frameWidth: number,
  padding: number,
  gutterWidth: number,
): number {
  const available = calcAvailableWidth(frameWidth, padding, gutterWidth);
  return (colSpan / COLUMNS) * available;
}

/**
 * Horizontal offset (left position) for a cell starting at column `colStart` (1-based).
 *
 *   cellX = padding + (colStart − 1) × (singleColWidth + gutterWidth)
 *
 * where singleColWidth = availableWidth / 12.
 */
export function calcCellX(
  colStart: number,
  frameWidth: number,
  padding: number,
  gutterWidth: number,
): number {
  const available = calcAvailableWidth(frameWidth, padding, gutterWidth);
  const singleColWidth = available / COLUMNS;
  return padding + (colStart - 1) * (singleColWidth + gutterWidth);
}
