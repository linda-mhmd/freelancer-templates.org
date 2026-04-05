import React from "react";
import { VelocityChart, VelocityChartSpec } from "./VelocityChart";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: VelocityChartSpec = {
  team_name: "Sisy Core Team",
  sprints: [
    { sprint_label: "S9", planned_points: 34, completed_points: 30, carry_over_points: 4 },
    { sprint_label: "S10", planned_points: 38, completed_points: 35, carry_over_points: 3 },
    { sprint_label: "S11", planned_points: 40, completed_points: 38, carry_over_points: 2 },
    { sprint_label: "S12", planned_points: 42, completed_points: 36, carry_over_points: 6 },
    { sprint_label: "S13", planned_points: 40, completed_points: 40, carry_over_points: 0 },
    { sprint_label: "S14", planned_points: 42, completed_points: 37, carry_over_points: 5 },
  ],
  average_velocity: 36,
  velocity_trend: "Trending up +8% over 6 sprints",
  team_capacity: 42,
};

export const VelocityChartBarChartDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "bar-chart", theme: "dark" }} brandKit={brandKit} />;
export const VelocityChartBarChartClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "bar-chart", theme: "clean" }} brandKit={brandKit} />;
export const VelocityChartTrendLineDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "trend-line", theme: "dark" }} brandKit={brandKit} />;
export const VelocityChartTrendLineClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "trend-line", theme: "clean" }} brandKit={brandKit} />;
export const VelocityChartSummaryDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "summary", theme: "dark" }} brandKit={brandKit} />;
export const VelocityChartSummaryClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <VelocityChart spec={{ ...BASE_SPEC, layout: "summary", theme: "clean" }} brandKit={brandKit} />;
