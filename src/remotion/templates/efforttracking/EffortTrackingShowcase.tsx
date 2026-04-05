import React from "react";
import { EffortTracking, EffortTrackingSpec } from "./EffortTracking";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: EffortTrackingSpec = {
  project_name: "Sisy",
  time_period: "Sprint 14 · Feb 10–21, 2026",
  story_points_planned: 42,
  story_points_completed: 37,
  hours_logged: 156,
  team_members: [
    { name: "Linda Mohamed", hours_logged: 52, story_points_completed: 14, allocation_percent: 85 },
    { name: "Linda Mohamed", hours_logged: 48, story_points_completed: 12, allocation_percent: 78 },
    { name: "Mrs Lee G", hours_logged: 56, story_points_completed: 11, allocation_percent: 92 },
  ],
  capacity_utilization: 88,
};

export const EffortTrackingTeamAllocationDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "team-allocation", theme: "dark" }} brandKit={brandKit} />;
export const EffortTrackingTeamAllocationWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "team-allocation", theme: "warm" }} brandKit={brandKit} />;
export const EffortTrackingCapacityDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "capacity", theme: "dark" }} brandKit={brandKit} />;
export const EffortTrackingCapacityWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "capacity", theme: "warm" }} brandKit={brandKit} />;
export const EffortTrackingBreakdownDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "breakdown", theme: "dark" }} brandKit={brandKit} />;
export const EffortTrackingBreakdownWarm: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <EffortTracking spec={{ ...BASE_SPEC, layout: "breakdown", theme: "warm" }} brandKit={brandKit} />;
