import React from "react";
import { QBRDashboard, QBRDashboardSpec } from "./QBRDashboard";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: QBRDashboardSpec = {
  business_name: "Freelance Automation",
  quarter_label: "Q4 2025",
  key_metrics: [
    { label: "MRR Growth", value: 24, suffix: "%", trend: "Up from 18% in Q3" },
    { label: "Client Retention", value: 96, suffix: "%", trend: "Stable quarter-over-quarter" },
    { label: "NPS Score", value: 72, suffix: "", trend: "Up 8 points from Q3" },
  ],
  top_clients: [
    { name: "Linda Mohamed", revenue: 45000 },
    { name: "Linda Mohamed", revenue: 38000 },
    { name: "Mrs Lee G", revenue: 32000 },
  ],
  achievements: ["Launched video generation crew", "99.8% uptime achieved", "3 new enterprise clients"],
  next_quarter_goals: ["Mobile dashboard launch", "AI proposal writer v2", "SOC 2 certification"],
  total_revenue: 285,
  total_projects: 18,
};

export const QBRDashboardExecutiveDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "executive", theme: "dark" }} brandKit={brandKit} />;
export const QBRDashboardExecutiveClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "executive", theme: "clean" }} brandKit={brandKit} />;
export const QBRDashboardDetailedDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "detailed", theme: "dark" }} brandKit={brandKit} />;
export const QBRDashboardDetailedClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "detailed", theme: "clean" }} brandKit={brandKit} />;
export const QBRDashboardComparisonDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "comparison", theme: "dark" }} brandKit={brandKit} />;
export const QBRDashboardComparisonClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <QBRDashboard spec={{ ...BASE_SPEC, layout: "comparison", theme: "clean" }} brandKit={brandKit} />;
