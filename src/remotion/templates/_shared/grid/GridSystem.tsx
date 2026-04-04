/**
 * 12-Column Grid System for Remotion Compositions
 *
 * Provides a Bootstrap-style grid that positions child elements within
 * the 1280×720 composition frame. Supports:
 *   - Column spanning (1–12)
 *   - Explicit column/row placement
 *   - Nesting (GridSystem inside GridCell)
 *   - Themed card styling via `styled` prop
 *   - Overflow clipping with console warnings
 *
 * Usage:
 *   <GridSystem theme={theme}>
 *     <GridCell colSpan={6} styled>…left half…</GridCell>
 *     <GridCell colSpan={6}>…right half…</GridCell>
 *   </GridSystem>
 */

import React, { createContext, useContext } from "react";
import type { Theme } from "../themes";
import {
  calcCellWidth,
  calcCellX,
  clampColSpan,
  clampValues,
} from "./gridUtils";

// ── Interfaces ──────────────────────────────────────────────────

export interface GridConfig {
  columns: 12;
  frameWidth: 1280;
  frameHeight: 720;
  gutterWidth: number;
  rowHeight: number;
  padding: number;
}

export interface GridCellProps {
  colSpan: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
  styled?: boolean;
  theme?: Theme;
  children: React.ReactNode;
}

export interface GridSystemProps {
  config?: Partial<GridConfig>;
  theme?: Theme;
  children: React.ReactNode;
}

// ── Defaults ────────────────────────────────────────────────────

const DEFAULT_CONFIG: GridConfig = {
  columns: 12,
  frameWidth: 1280,
  frameHeight: 720,
  gutterWidth: 16,
  rowHeight: 0, // 0 = auto
  padding: 40,
};

// ── Context (for nesting support) ───────────────────────────────

interface GridContextValue {
  frameWidth: number;
  padding: number;
  gutterWidth: number;
  theme?: Theme;
}

const GridContext = createContext<GridContextValue | null>(null);

// ── GridCell ────────────────────────────────────────────────────

export const GridCell: React.FC<GridCellProps> = ({
  colSpan: rawColSpan,
  rowSpan: _rowSpan = 1,
  colStart,
  rowStart: _rowStart,
  styled = false,
  theme: cellTheme,
  children,
}) => {
  const ctx = useContext(GridContext);
  const frameWidth = ctx?.frameWidth ?? DEFAULT_CONFIG.frameWidth;
  const padding = ctx?.padding ?? DEFAULT_CONFIG.padding;
  const gutterWidth = ctx?.gutterWidth ?? DEFAULT_CONFIG.gutterWidth;
  const theme = cellTheme ?? ctx?.theme;

  // Clamp values
  const colSpan = clampColSpan(rawColSpan, colStart);

  const width = calcCellWidth(colSpan, frameWidth, padding, gutterWidth);
  const left =
    colStart !== undefined
      ? calcCellX(colStart, frameWidth, padding, gutterWidth)
      : undefined;

  // Overflow: CSS `overflow: hidden` clips content that exceeds cell bounds.
  // A render-time warning is logged so developers know clipping is active.
  // (No useEffect - Remotion renders server-side.)
  if (width <= 0) {
    console.warn(
      `[GridSystem] Cell has non-positive width (${width}px) - content will be clipped` +
        ` (colSpan=${colSpan}${colStart !== undefined ? `, colStart=${colStart}` : ""})`,
    );
  }

  // Themed card styles
  const styledProps: React.CSSProperties =
    styled && theme
      ? {
          background: theme.bgGlass,
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: theme.cardShadow,
          borderRadius: 12,
        }
      : {};

  const positionStyle: React.CSSProperties = {
    width,
    overflow: "hidden",
    boxSizing: "border-box" as const,
    ...(left !== undefined ? { position: "absolute" as const, left } : {}),
    ...styledProps,
  };

  return (
    <div style={positionStyle}>
      {children}
    </div>
  );
};

GridCell.displayName = "GridCell";

// ── GridSystem ──────────────────────────────────────────────────

export const GridSystem: React.FC<GridSystemProps> = ({
  config: partialConfig,
  theme,
  children,
}) => {
  const parentCtx = useContext(GridContext);

  // Merge user config with defaults
  const rawGutter = partialConfig?.gutterWidth ?? DEFAULT_CONFIG.gutterWidth;
  const rawPadding = partialConfig?.padding ?? DEFAULT_CONFIG.padding;
  const { gutterWidth, padding } = clampValues(rawGutter, rawPadding);

  // When nested inside a GridCell, use the parent cell's width as frameWidth
  const frameWidth =
    partialConfig?.frameWidth ?? parentCtx?.frameWidth ?? DEFAULT_CONFIG.frameWidth;

  const ctxValue: GridContextValue = {
    frameWidth,
    padding,
    gutterWidth,
    theme,
  };

  return (
    <GridContext.Provider value={ctxValue}>
      <div
        style={{
          position: "relative",
          width: frameWidth,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
};

GridSystem.displayName = "GridSystem";
