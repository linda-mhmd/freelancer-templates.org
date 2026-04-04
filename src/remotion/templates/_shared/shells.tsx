/**
 * Composable Layout Shells
 *
 * Reusable layout containers that handle background, header animation,
 * and content arrangement. Templates become thin data adapters that map
 * their Spec fields to shell slot props.
 *
 * To change the visual design of any composition, swap the shell - no data changes needed.
 *
 * Shells:
 *   HeroStatShell       - Title + stats row + children section
 *   CardGridShell       - Header + CSS grid (2 or 3 columns)
 *   TimelineShell       - Header + vertical/horizontal timeline
 *   PipelineShell       - Header + horizontal pipeline stages
 *   SplitPanelShell     - Header + two-panel side-by-side
 *   CategoryGroupShell  - Header + grouped sections
 *   StatusBoardShell    - Header + central metric + details
 *   ListDetailShell     - Header + vertical staggered list
 *   ComparisonShell     - Header + two-column comparison
 *   ContributorShell    - Header + contributor sections
 */

import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Theme } from "./themes";
import { springEntrance, fadeIn, slideIn, staggerDelay, SPRING } from "./animations";
import { BackgroundGrid, CountUp, GradientBadge } from "./components";
import { PADDING, TOP_SAFE, TYPE } from "./layouts";

// ── Base Props ──────────────────────────────────────────────────

export interface ShellProps {
  theme: Theme;
  frame: number;
  fps: number;
  children?: React.ReactNode;
}

// ── Shared Header ───────────────────────────────────────────────

const ShellHeader: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  theme: Theme;
  frame: number;
  fps: number;
  titleDelay?: number;
}> = ({ title, subtitle, badge, theme, frame, fps, titleDelay = 5 }) => {
  const s = springEntrance(frame, fps, titleDelay, SPRING.default);
  const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const tx = slideIn(s, "up", 30);
  return (
    <div style={{ opacity, transform: `translateY(${tx}px)`, marginBottom: 24 }}>
      {badge && (
        <div style={{ marginBottom: 12 }}>
          <GradientBadge text={badge} theme={theme} fontSize={11} />
        </div>
      )}
      <div style={{
        fontSize: TYPE.title,
        fontWeight: theme.headingWeight,
        fontFamily: theme.fontFamily,
        color: theme.textPrimary,
        lineHeight: 1.2,
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{
          fontSize: TYPE.subtitle,
          fontWeight: theme.bodyWeight,
          fontFamily: theme.fontFamily,
          color: theme.textSecondary,
          marginTop: 8,
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};


// ── Shell Wrapper ───────────────────────────────────────────────
// Common wrapper: AbsoluteFill + theme bg + BackgroundGrid + padding

const ShellWrapper: React.FC<{
  theme: Theme;
  children: React.ReactNode;
}> = ({ theme, children }) => (
  <AbsoluteFill style={{
    background: theme.bg,
    fontFamily: theme.fontFamily,
    padding: `${TOP_SAFE}px ${PADDING}px`,
    overflow: "hidden",
  }}>
    <BackgroundGrid opacity={0.04} />
    <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
      {children}
    </div>
  </AbsoluteFill>
);

// ═══════════════════════════════════════════════════════════════
// 1. HeroStatShell
// ═══════════════════════════════════════════════════════════════

export interface HeroStatShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  stats: Array<{ label: string; value: number; suffix?: string }>;
  titleDelay?: number;
  statsDelay?: number;
  childrenDelay?: number;
}

export const HeroStatShell: React.FC<HeroStatShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, badge, stats,
  titleDelay = 5, statsDelay = 50, childrenDelay = 120,
}) => {
  const statsOpacity = fadeIn(frame, statsDelay, 20);
  const childrenOpacity = fadeIn(frame, childrenDelay, 20);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} badge={badge} theme={theme} frame={frame} fps={fps} titleDelay={titleDelay} />

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 40, marginBottom: 32, opacity: statsOpacity }}>
        {stats.map((stat, i) => {
          const delay = staggerDelay(i, statsDelay, 20);
          const s = springEntrance(frame, fps, delay, SPRING.snappy);
          return (
            <div key={i} style={{ opacity: interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" }) }}>
              <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary, fontFamily: theme.fontFamily }}>
                <CountUp target={stat.value} frame={frame} startFrame={delay} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily, marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Children Section */}
      {children && (
        <div style={{ opacity: childrenOpacity, flex: 1 }}>
          {children}
        </div>
      )}
    </ShellWrapper>
  );
};


// ═══════════════════════════════════════════════════════════════
// 2. CardGridShell
// ═══════════════════════════════════════════════════════════════

export interface CardGridShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  columns: 2 | 3;
  cardDelay?: number;
  staggerGap?: number;
  footer?: React.ReactNode;
}

export const CardGridShell: React.FC<CardGridShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, badge, columns,
  cardDelay = 60, staggerGap = 20, footer,
}) => {
  const gap = Math.max(20, staggerGap);
  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} badge={badge} theme={theme} frame={frame} fps={fps} />

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
        flex: 1,
      }}>
        {React.Children.map(children, (child, i) => {
          const delay = staggerDelay(i, cardDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const ty = slideIn(s, "up", 30);
          return (
            <div style={{ opacity, transform: `translateY(${ty}px)` }}>
              {child}
            </div>
          );
        })}
      </div>

      {footer && (
        <div style={{ marginTop: 16, opacity: fadeIn(frame, cardDelay + (React.Children.count(children) * gap), 20) }}>
          {footer}
        </div>
      )}
    </ShellWrapper>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. TimelineShell
// ═══════════════════════════════════════════════════════════════

export interface TimelineShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  direction: "vertical" | "horizontal";
  nodeCount: number;
  nodeDelay?: number;
  staggerGap?: number;
}

export const TimelineShell: React.FC<TimelineShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, badge, direction, nodeCount,
  nodeDelay = 40, staggerGap = 25,
}) => {
  const gap = Math.max(20, staggerGap);
  const isVertical = direction === "vertical";

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} badge={badge} theme={theme} frame={frame} fps={fps} />

      <div style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        gap: isVertical ? 0 : 16,
        flex: 1,
        position: "relative",
        alignItems: isVertical ? "stretch" : "flex-start",
      }}>
        {/* Timeline line */}
        {isVertical ? (
          <div style={{
            position: "absolute",
            left: 16,
            top: 0,
            bottom: 0,
            width: 2,
            background: theme.cardBorder,
            opacity: 0.4,
          }} />
        ) : (
          <div style={{
            position: "absolute",
            top: 16,
            left: 0,
            right: 0,
            height: 2,
            background: theme.cardBorder,
            opacity: 0.4,
          }} />
        )}

        {React.Children.map(children, (child, i) => {
          const delay = staggerDelay(i, nodeDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const translate = isVertical
            ? `translateX(${slideIn(s, "right", 30)}px)`
            : `translateY(${slideIn(s, "down", 20)}px)`;
          return (
            <div style={{
              opacity,
              transform: translate,
              paddingLeft: isVertical ? 40 : 0,
              paddingTop: isVertical ? 0 : 32,
              flex: isVertical ? undefined : 1,
              marginBottom: isVertical ? 12 : 0,
              position: "relative",
            }}>
              {/* Node dot */}
              <div style={{
                position: "absolute",
                [isVertical ? "left" : "top"]: isVertical ? 10 : 10,
                [isVertical ? "top" : "left"]: isVertical ? 6 : "50%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.accent,
                border: `2px solid ${theme.accent}`,
                transform: isVertical ? undefined : "translateX(-50%)",
              }} />
              {child}
            </div>
          );
        })}
      </div>
    </ShellWrapper>
  );
};


// ═══════════════════════════════════════════════════════════════
// 4. PipelineShell
// ═══════════════════════════════════════════════════════════════

export interface PipelineShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  stageCount: number;
  stageDelay?: number;
  staggerGap?: number;
}

export const PipelineShell: React.FC<PipelineShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, stageCount,
  stageDelay = 30, staggerGap = 25,
}) => {
  const gap = Math.max(20, staggerGap);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        flex: 1,
      }}>
        {React.Children.map(children, (child, i) => {
          const delay = staggerDelay(i, stageDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const tx = slideIn(s, "right", 40);
          const isLast = i === stageCount - 1;
          return (
            <React.Fragment key={i}>
              <div style={{ flex: 1, opacity, transform: `translateX(${tx}px)` }}>
                {child}
              </div>
              {!isLast && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: fadeIn(frame, delay + 10, 15),
                  color: theme.accent,
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </ShellWrapper>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. SplitPanelShell
// ═══════════════════════════════════════════════════════════════

export interface SplitPanelShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  splitRatio?: number;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftDelay?: number;
  rightDelay?: number;
}

export const SplitPanelShell: React.FC<SplitPanelShellProps> = ({
  theme, frame, fps,
  title, subtitle, splitRatio = 0.5,
  leftContent, rightContent,
  leftDelay = 20, rightDelay = 60,
}) => {
  const leftS = springEntrance(frame, fps, leftDelay, SPRING.default);
  const rightS = springEntrance(frame, fps, rightDelay, SPRING.default);
  const leftOpacity = interpolate(leftS, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const rightOpacity = interpolate(rightS, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const dividerOpacity = fadeIn(frame, Math.min(leftDelay, rightDelay) + 10, 20);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      <div style={{ display: "flex", flex: 1, gap: 0 }}>
        <div style={{
          flex: `0 0 ${splitRatio * 100}%`,
          opacity: leftOpacity,
          transform: `translateX(${slideIn(leftS, "left", 30)}px)`,
          paddingRight: 16,
          overflow: "hidden",
        }}>
          {leftContent}
        </div>

        <div style={{
          width: 2,
          background: theme.cardBorder,
          opacity: dividerOpacity * 0.4,
          flexShrink: 0,
          alignSelf: "stretch",
        }} />

        <div style={{
          flex: 1,
          opacity: rightOpacity,
          transform: `translateX(${slideIn(rightS, "right", 30)}px)`,
          paddingLeft: 16,
          overflow: "hidden",
        }}>
          {rightContent}
        </div>
      </div>
    </ShellWrapper>
  );
};


// ═══════════════════════════════════════════════════════════════
// 6. CategoryGroupShell
// ═══════════════════════════════════════════════════════════════

export interface CategoryGroupShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  groups: Array<{ label: string; badge?: string }>;
  groupDelay?: number;
  staggerGap?: number;
}

export const CategoryGroupShell: React.FC<CategoryGroupShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, groups,
  groupDelay = 30, staggerGap = 30,
}) => {
  const gap = Math.max(20, staggerGap);
  const childArray = React.Children.toArray(children);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, overflow: "hidden" }}>
        {groups.map((group, i) => {
          const delay = staggerDelay(i, groupDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const tx = slideIn(s, "right", 30);
          return (
            <div key={i} style={{ opacity, transform: `translateX(${tx}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  fontSize: TYPE.cardTitle,
                  fontWeight: theme.headingWeight,
                  fontFamily: theme.fontFamily,
                  color: theme.textPrimary,
                }}>
                  {group.label}
                </div>
                {group.badge && (
                  <GradientBadge text={group.badge} theme={theme} fontSize={10} />
                )}
              </div>
              {childArray[i] ?? null}
            </div>
          );
        })}
      </div>
    </ShellWrapper>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. StatusBoardShell
// ═══════════════════════════════════════════════════════════════

export interface StatusBoardShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  centralMetric: { label: string; value: number; suffix?: string };
  centralDelay?: number;
  detailsDelay?: number;
}

export const StatusBoardShell: React.FC<StatusBoardShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, centralMetric,
  centralDelay = 10, detailsDelay = 80,
}) => {
  const metricS = springEntrance(frame, fps, centralDelay, SPRING.snappy);
  const metricOpacity = interpolate(metricS, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const childrenOpacity = fadeIn(frame, detailsDelay, 20);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      {/* Central Metric */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 32,
        opacity: metricOpacity,
        transform: `scale(${interpolate(metricS, [0, 1], [0.8, 1], { extrapolateRight: "clamp" })})`,
      }}>
        <div style={{
          fontSize: 64,
          fontWeight: theme.headingWeight,
          fontFamily: theme.fontFamily,
          color: theme.textPrimary,
          lineHeight: 1,
        }}>
          <CountUp target={centralMetric.value} frame={frame} startFrame={centralDelay} suffix={centralMetric.suffix} />
        </div>
        <div style={{
          fontSize: TYPE.subtitle,
          fontFamily: theme.fontFamily,
          color: theme.textSecondary,
          marginTop: 8,
        }}>
          {centralMetric.label}
        </div>
      </div>

      {/* Details Section */}
      {children && (
        <div style={{ opacity: childrenOpacity, flex: 1 }}>
          {children}
        </div>
      )}
    </ShellWrapper>
  );
};


// ═══════════════════════════════════════════════════════════════
// 8. ListDetailShell
// ═══════════════════════════════════════════════════════════════

export interface ListDetailShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  itemCount: number;
  itemDelay?: number;
  staggerGap?: number;
}

export const ListDetailShell: React.FC<ListDetailShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, badge, itemCount,
  itemDelay = 40, staggerGap = 20,
}) => {
  const gap = Math.max(20, staggerGap);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} badge={badge} theme={theme} frame={frame} fps={fps} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, overflow: "hidden" }}>
        {React.Children.map(children, (child, i) => {
          const delay = staggerDelay(i, itemDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const tx = slideIn(s, "right", 30);
          return (
            <div style={{ opacity, transform: `translateX(${tx}px)` }}>
              {child}
            </div>
          );
        })}
      </div>
    </ShellWrapper>
  );
};

// ═══════════════════════════════════════════════════════════════
// 9. ComparisonShell
// ═══════════════════════════════════════════════════════════════

export interface ComparisonShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  leftLabel: string;
  rightLabel: string;
  leftDelay?: number;
  rightDelay?: number;
}

export const ComparisonShell: React.FC<ComparisonShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, leftLabel, rightLabel,
  leftDelay = 20, rightDelay = 60,
}) => {
  const leftS = springEntrance(frame, fps, leftDelay, SPRING.default);
  const rightS = springEntrance(frame, fps, rightDelay, SPRING.default);
  const leftOpacity = interpolate(leftS, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const rightOpacity = interpolate(rightS, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  const childArray = React.Children.toArray(children);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {/* Left Column */}
        <div style={{ flex: 1, opacity: leftOpacity, transform: `translateX(${slideIn(leftS, "left", 30)}px)` }}>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: theme.headingWeight,
            fontFamily: theme.fontFamily,
            color: theme.accent,
            marginBottom: 16,
            textAlign: "center",
          }}>
            {leftLabel}
          </div>
          {childArray[0] ?? null}
        </div>

        {/* Divider */}
        <div style={{
          width: 2,
          background: theme.cardBorder,
          opacity: 0.3,
          alignSelf: "stretch",
          flexShrink: 0,
        }} />

        {/* Right Column */}
        <div style={{ flex: 1, opacity: rightOpacity, transform: `translateX(${slideIn(rightS, "right", 30)}px)` }}>
          <div style={{
            fontSize: TYPE.cardTitle,
            fontWeight: theme.headingWeight,
            fontFamily: theme.fontFamily,
            color: theme.accent,
            marginBottom: 16,
            textAlign: "center",
          }}>
            {rightLabel}
          </div>
          {childArray[1] ?? null}
        </div>
      </div>
    </ShellWrapper>
  );
};

// ═══════════════════════════════════════════════════════════════
// 10. ContributorShell
// ═══════════════════════════════════════════════════════════════

export interface ContributorShellProps extends ShellProps {
  title: string;
  subtitle?: string;
  contributorCount: number;
  contributorDelay?: number;
  staggerGap?: number;
}

export const ContributorShell: React.FC<ContributorShellProps> = ({
  theme, frame, fps, children,
  title, subtitle, contributorCount,
  contributorDelay = 30, staggerGap = 25,
}) => {
  const gap = Math.max(20, staggerGap);

  return (
    <ShellWrapper theme={theme}>
      <ShellHeader title={title} subtitle={subtitle} theme={theme} frame={frame} fps={fps} />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, overflow: "hidden" }}>
        {React.Children.map(children, (child, i) => {
          const delay = staggerDelay(i, contributorDelay, gap);
          const s = springEntrance(frame, fps, delay, SPRING.default);
          const opacity = interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" });
          const tx = slideIn(s, "up", 25);
          return (
            <div style={{ opacity, transform: `translateY(${tx}px)` }}>
              {child}
            </div>
          );
        })}
      </div>
    </ShellWrapper>
  );
};
