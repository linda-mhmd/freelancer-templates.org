import React from "react";
import { OfficeDirectory, OfficeDirectorySpec } from "./OfficeDirectory";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: OfficeDirectorySpec = {
  company_name: "PinBoard Maps",
  directory_title: "Global Office Directory",
  offices: [
    { location_name: "HQ Vienna", city: "Vienna", country: "Austria", office_type: "Headquarters", team_size: 45, departments: ["Engineering", "Design", "Product"] },
    { location_name: "Berlin Studio", city: "Berlin", country: "Germany", office_type: "Studio", team_size: 18, departments: ["Engineering", "Data"] },
    { location_name: "London Office", city: "London", country: "UK", office_type: "Regional", team_size: 22, departments: ["Sales", "Marketing"] },
    { location_name: "New York Hub", city: "New York", country: "USA", office_type: "Regional", team_size: 15, departments: ["Sales", "Support"] },
  ],
  total_offices: 4,
  total_employees: 100,
};

export const OfficeDirectoryWorldViewDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "dark" }} brandKit={brandKit} />;
export const OfficeDirectoryWorldViewClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "clean" }} brandKit={brandKit} />;
export const OfficeDirectoryCardListDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "dark" }} brandKit={brandKit} />;
export const OfficeDirectoryCardListClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "clean" }} brandKit={brandKit} />;
export const OfficeDirectoryRegionGroupsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "region-groups", theme: "dark" }} brandKit={brandKit} />;
export const OfficeDirectoryRegionGroupsClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "region-groups", theme: "clean" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const OfficeDirectoryOceanWorldView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "ocean" }} brandKit={brandKit} />;
export const OfficeDirectorySunsetWorldView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "sunset" }} brandKit={brandKit} />;
export const OfficeDirectoryForestCardList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "forest" }} brandKit={brandKit} />;
export const OfficeDirectoryRoseCardList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "rose" }} brandKit={brandKit} />;
export const OfficeDirectoryGoldRegionGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "region-groups", theme: "gold" }} brandKit={brandKit} />;
export const OfficeDirectoryMidnightRegionGroups: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "region-groups", theme: "midnight" }} brandKit={brandKit} />;
export const OfficeDirectoryCrimsonWorldView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "crimson" }} brandKit={brandKit} />;
export const OfficeDirectoryLavenderWorldView: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "world-view", theme: "lavender" }} brandKit={brandKit} />;
export const OfficeDirectoryArcticCardList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "arctic" }} brandKit={brandKit} />;
export const OfficeDirectoryEspressoCardList: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <OfficeDirectory spec={{ ...BASE_SPEC, layout: "card-list", theme: "espresso" }} brandKit={brandKit} />;
