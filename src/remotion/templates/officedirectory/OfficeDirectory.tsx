/**
 * Office Directory Template
 *
 * Layouts:
 *   "world-view"    → StatusBoardShell (total employees central, office markers)
 *   "card-list"     → ListDetailShell (vertical office cards)
 *   "region-groups" → CategoryGroupShell (offices grouped by region)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, GradientBadge,
  StatusBoardShell, ListDetailShell, CategoryGroupShell,
  TYPE,
} from "../_shared";

export interface OfficeDirectorySpec {
  company_name: string;
  directory_title: string;
  offices: Array<{ location_name: string; city: string; country: string; office_type: string; team_size: number; departments: string[] }>;
  total_offices: number;
  total_employees: number;
  theme?: string;
  layout?: "world-view" | "card-list" | "region-groups";
}

export const OfficeDirectory: React.FC<{ spec: OfficeDirectorySpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "world-view";

  if (layout === "card-list") {
    return (
      <ListDetailShell
        theme={theme} frame={frame} fps={fps}
        title={spec.directory_title}
        subtitle={`${spec.company_name} · ${spec.total_offices} offices`}
        itemCount={spec.offices.length}
      >
        {spec.offices.slice(0, 5).map((o, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{o.location_name}</span>
              <GradientBadge text={o.office_type} theme={theme} fontSize={9} />
            </div>
            <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{o.city}, {o.country} · {o.team_size} people</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, marginTop: 4 }}>{o.departments.join(", ")}</div>
          </GlassCard>
        ))}
      </ListDetailShell>
    );
  }

  if (layout === "region-groups") {
    const regions = Array.from(new Set(spec.offices.map((o) => o.country)));
    return (
      <CategoryGroupShell
        theme={theme} frame={frame} fps={fps}
        title={spec.directory_title}
        subtitle={`${spec.company_name} · ${spec.total_employees} employees`}
        groups={regions.map((r) => ({ label: r }))}
      >
        {spec.offices.slice(0, 6).map((o, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{o.location_name}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{o.city} · {o.team_size} people</div>
          </GlassCard>
        ))}
      </CategoryGroupShell>
    );
  }

  // Default: "world-view"
  return (
    <StatusBoardShell
      theme={theme} frame={frame} fps={fps}
      title={spec.directory_title}
      subtitle={spec.company_name}
      centralMetric={{ label: "Total Employees", value: spec.total_employees }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {spec.offices.slice(0, 4).map((o, i) => (
          <GlassCard key={i} theme={theme} style={{ padding: "10px 12px" }}>
            <div style={{ fontSize: TYPE.label, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{o.location_name}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textSecondary, fontFamily: theme.fontFamily }}>{o.city}, {o.country}</div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily }}>{o.team_size} people</div>
          </GlassCard>
        ))}
      </div>
    </StatusBoardShell>
  );
};
