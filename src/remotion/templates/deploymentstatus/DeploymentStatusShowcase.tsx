import React from "react";
import { DeploymentStatus, DeploymentStatusSpec } from "./DeploymentStatus";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: DeploymentStatusSpec = {
  project_name: "Freelance Automation",
  environments: [
    { env_name: "Production", version: "v3.2.1", status: "on-track", last_deploy: "Feb 25, 2026 14:30", deployer: "Linda Mohamed" },
    { env_name: "Staging", version: "v3.3.0-rc1", status: "in-progress", last_deploy: "Feb 26, 2026 09:15", deployer: "Linda Mohamed" },
    { env_name: "Development", version: "v3.3.0-dev", status: "in-progress", last_deploy: "Feb 27, 2026 08:00", deployer: "Mrs Lee G" },
  ],
  total_deployments: 142,
  uptime_percent: 99,
};

export const DeploymentStatusEnvironmentCardsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "environment-cards", theme: "dark" }} brandKit={brandKit} />;
export const DeploymentStatusEnvironmentCardsNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "environment-cards", theme: "neon" }} brandKit={brandKit} />;
export const DeploymentStatusPipelineViewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "pipeline-view", theme: "dark" }} brandKit={brandKit} />;
export const DeploymentStatusPipelineViewNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "pipeline-view", theme: "neon" }} brandKit={brandKit} />;
export const DeploymentStatusHealthDashboardDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "health-dashboard", theme: "dark" }} brandKit={brandKit} />;
export const DeploymentStatusHealthDashboardNeon: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <DeploymentStatus spec={{ ...BASE_SPEC, layout: "health-dashboard", theme: "neon" }} brandKit={brandKit} />;
