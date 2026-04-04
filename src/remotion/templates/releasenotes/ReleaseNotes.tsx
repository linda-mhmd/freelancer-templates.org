/**
 * Release Notes Template
 *
 * Layouts:
 *   "changelog"       → TimelineShell (vertical change timeline)
 *   "highlights"      → HeroStatShell (hero feature + supporting cards)
 *   "version-compare" → SplitPanelShell (before/after split view)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme,
  GlassCard, GradientBadge,
  TimelineShell, HeroStatShell, SplitPanelShell,
  TYPE,
} from "../_shared";

export interface ReleaseNotesSpec {
  product_name: string;
  version: string;
  release_date: string;
  changes: Array<{ title: string; description: string; category: string; contributor?: string }>;
  category_counts: { feature: number; fix: number; improvement: number; breaking: number };
  highlights: string;
  theme?: string;
  layout?: "changelog" | "highlights" | "version-compare";
}

export const ReleaseNotes: React.FC<{ spec: ReleaseNotesSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = THEMES[spec.theme ?? "dark"] ?? THEMES.dark;
  const layout = spec.layout ?? "changelog";

  if (layout === "highlights") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.product_name} ${spec.version}`}
        subtitle={spec.release_date}
        badge="New Release"
        stats={[
          { label: "Features", value: spec.category_counts.feature },
          { label: "Fixes", value: spec.category_counts.fix },
          { label: "Improvements", value: spec.category_counts.improvement },
        ]}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {spec.changes.slice(0, 4).map((c, i) => (
            <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <GradientBadge text={c.category} theme={theme} fontSize={9} />
                <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.title}</span>
              </div>
              <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.description}</div>
            </GlassCard>
          ))}
        </div>
      </HeroStatShell>
    );
  }

  if (layout === "version-compare") {
    const features = spec.changes.filter((c) => c.category === "feature" || c.category === "improvement");
    const fixes = spec.changes.filter((c) => c.category === "fix" || c.category === "breaking");
    return (
      <SplitPanelShell
        theme={theme} frame={frame} fps={fps}
        title={`${spec.product_name} ${spec.version}`}
        subtitle={spec.release_date}
        leftContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 4 }}>New & Improved</div>
            {features.map((c, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.title}</div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.description}</div>
              </GlassCard>
            ))}
          </div>
        }
        rightContent={
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.accent, fontFamily: theme.fontFamily, marginBottom: 4 }}>Fixes & Breaking</div>
            {fixes.map((c, i) => (
              <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.title}</div>
                <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.description}</div>
              </GlassCard>
            ))}
          </div>
        }
      />
    );
  }

  // Default: "changelog"
  return (
    <TimelineShell
      theme={theme} frame={frame} fps={fps}
      title={`${spec.product_name} ${spec.version} - Changelog`}
      subtitle={spec.release_date}
      badge="Release Notes"
      direction="vertical"
      nodeCount={spec.changes.length}
    >
      {spec.changes.map((c, i) => (
        <GlassCard key={i} theme={theme} style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <GradientBadge text={c.category} theme={theme} fontSize={9} />
            <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{c.title}</span>
          </div>
          <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{c.description}</div>
          {c.contributor && <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>by {c.contributor}</div>}
        </GlassCard>
      ))}
    </TimelineShell>
  );
};
