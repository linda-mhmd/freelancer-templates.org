/**
 * Client Pipeline Template
 *
 * Layouts:
 *   "funnel"         → PipelineShell (tapered funnel stages)
 *   "pipeline-board" → PipelineShell (horizontal columns with deal cards)
 *   "metrics"        → HeroStatShell (revenue hero + stage breakdown)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  THEMES, Theme, BrandKit, applyBrandKit,
  GlassCard, ProgressBar, CountUp,
  PipelineShell, HeroStatShell,
  TYPE,
} from "../_shared";

export interface ClientPipelineSpec {
  dashboard_title: string;
  stages: Array<{ stage_name: string; count: number; value: number }>;
  total_revenue: number;
  conversion_rate: number;
  recent_deals: Array<{ client_name: string; value: number; status: string }>;
  time_period: string;
  theme?: string;
  layout?: "funnel" | "pipeline-board" | "metrics";
}

export const ClientPipeline: React.FC<{ spec: ClientPipelineSpec; brandKit?: BrandKit }> = ({ spec, brandKit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme: Theme = applyBrandKit(THEMES[spec.theme ?? "dark"] ?? THEMES.dark, brandKit);
  const layout = spec.layout ?? "funnel";

  if (layout === "metrics") {
    return (
      <HeroStatShell
        theme={theme} frame={frame} fps={fps}
        title={spec.dashboard_title}
        subtitle={spec.time_period}
        stats={[
          { label: "Total Revenue", value: spec.total_revenue, suffix: "k" },
          { label: "Conversion", value: spec.conversion_rate, suffix: "%" },
          { label: "Active Deals", value: spec.recent_deals.length },
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {spec.stages.map((s, i) => (
            <ProgressBar
              key={i}
              progress={Math.round((s.value / Math.max(1, spec.total_revenue)) * 100)}
              frame={frame} startFrame={130 + i * 20} theme={theme}
              label={`${s.stage_name} (${s.count})`} height={6}
            />
          ))}
        </div>
      </HeroStatShell>
    );
  }

  if (layout === "pipeline-board") {
    return (
      <PipelineShell
        theme={theme} frame={frame} fps={fps}
        title={spec.dashboard_title}
        subtitle={spec.time_period}
        stageCount={spec.stages.length}
      >
        {spec.stages.map((stage, si) => (
          <div key={si} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: TYPE.cardTitle, fontWeight: 600, color: theme.textPrimary, fontFamily: theme.fontFamily, textAlign: "center", marginBottom: 4 }}>
              {stage.stage_name}
            </div>
            <div style={{ fontSize: TYPE.caption, color: theme.textMuted, fontFamily: theme.fontFamily, textAlign: "center" }}>{stage.count} deals</div>
            {spec.recent_deals
              .filter((d) => d.status === stage.stage_name.toLowerCase().replace(/\s/g, "-"))
              .slice(0, 2)
              .map((d, di) => (
                <GlassCard key={di} theme={theme} style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: TYPE.label, color: theme.textPrimary, fontFamily: theme.fontFamily }}>{d.client_name}</div>
                  <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily }}>${d.value}k</div>
                </GlassCard>
              ))}
          </div>
        ))}
      </PipelineShell>
    );
  }

  // Default: "funnel"
  return (
    <PipelineShell
      theme={theme} frame={frame} fps={fps}
      title={spec.dashboard_title}
      subtitle={`${spec.time_period} · $${spec.total_revenue}k revenue`}
      stageCount={spec.stages.length}
    >
      {spec.stages.map((stage, i) => {
        const maxCount = Math.max(...spec.stages.map((s) => s.count));
        const heightPct = Math.max(40, (stage.count / Math.max(1, maxCount)) * 100);
        return (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
            <GlassCard theme={theme} style={{
              padding: "14px 12px",
              height: `${heightPct}%`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}>
              <div style={{ fontSize: TYPE.stat, fontWeight: theme.headingWeight, color: theme.textPrimary, fontFamily: theme.fontFamily }}>
                <CountUp target={stage.count} frame={frame} startFrame={60 + i * 20} />
              </div>
              <div style={{ fontSize: TYPE.label, color: theme.textSecondary, fontFamily: theme.fontFamily, marginTop: 4, textAlign: "center" }}>{stage.stage_name}</div>
              <div style={{ fontSize: TYPE.caption, color: theme.accent, fontFamily: theme.fontFamily }}>${stage.value}k</div>
            </GlassCard>
          </div>
        );
      })}
    </PipelineShell>
  );
};
