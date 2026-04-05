import React from "react";
import { ComponentInventory, ComponentInventorySpec } from "./ComponentInventory";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: ComponentInventorySpec = {
  system_name: "Sisy",
  components: [
    { name: "Auth Module", type: "Service", status: "on-track", description: "SSO, OIDC, session management", version: "v2.1.0", dependency_count: 4 },
    { name: "Dashboard UI", type: "Frontend", status: "on-track", description: "Widget system and layout engine", version: "v3.0.0", dependency_count: 8 },
    { name: "API Gateway", type: "Service", status: "on-track", description: "Rate limiting, routing, auth proxy", version: "v1.8.2", dependency_count: 3 },
    { name: "Notification Service", type: "Service", status: "needs-attention", description: "Email, push, in-app notifications", version: "v1.2.0", dependency_count: 5 },
    { name: "Database Layer", type: "Infrastructure", status: "on-track", description: "PostgreSQL with read replicas", version: "v1.0.0", dependency_count: 2 },
    { name: "Task Engine", type: "Service", status: "in-progress", description: "Background job processing", version: "v2.0.0-beta", dependency_count: 6 },
  ],
  total_components: 6,
  architecture_summary: "Microservices architecture with event-driven communication",
};

export const ComponentInventoryArchitectureGridDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "dark" }} brandKit={brandKit} />;
export const ComponentInventoryArchitectureGridClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "clean" }} brandKit={brandKit} />;
export const ComponentInventoryDependencyMapDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "dark" }} brandKit={brandKit} />;
export const ComponentInventoryDependencyMapClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "clean" }} brandKit={brandKit} />;
export const ComponentInventoryInventoryListDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "inventory-list", theme: "dark" }} brandKit={brandKit} />;
export const ComponentInventoryInventoryListClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "inventory-list", theme: "clean" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const ComponentInventoryOceanArchitectureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "ocean" }} brandKit={brandKit} />;
export const ComponentInventorySunsetArchitectureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "sunset" }} brandKit={brandKit} />;
export const ComponentInventoryForestDependencyMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "forest" }} brandKit={brandKit} />;
export const ComponentInventoryRoseDependencyMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "rose" }} brandKit={brandKit} />;
export const ComponentInventoryGoldInventoryList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "inventory-list", theme: "gold" }} brandKit={brandKit} />;
export const ComponentInventoryMidnightInventoryList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "inventory-list", theme: "midnight" }} brandKit={brandKit} />;
export const ComponentInventoryCrimsonArchitectureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "crimson" }} brandKit={brandKit} />;
export const ComponentInventoryLavenderArchitectureGrid: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "architecture-grid", theme: "lavender" }} brandKit={brandKit} />;
export const ComponentInventoryArcticDependencyMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "arctic" }} brandKit={brandKit} />;
export const ComponentInventoryEspressoDependencyMap: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ComponentInventory spec={{ ...BASE_SPEC, layout: "dependency-map", theme: "espresso" }} brandKit={brandKit} />;
