import React from "react";
import { StoreLocator, StoreLocatorSpec } from "./StoreLocator";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: StoreLocatorSpec = {
  brand_name: "PinBoard Maps",
  locator_title: "Café Locations",
  stores: [
    { store_name: "Roast & Co. Neubau", address: "Neubaugasse 12, 1070 Wien", city: "Vienna", hours: "7am–6pm", phone: "+43 1 234 5678", store_type: "Flagship" },
    { store_name: "Roast & Co. Mitte", address: "Friedrichstr. 45, 10117 Berlin", city: "Berlin", hours: "8am–7pm", phone: "+49 30 123 456", store_type: "Standard" },
    { store_name: "Roast & Co. Soho", address: "Dean St 22, London W1D", city: "London", hours: "7am–5pm", phone: "+44 20 7946 0958", store_type: "Standard" },
    { store_name: "Roast & Co. Mariahilf", address: "Mariahilfer Str. 88, 1060 Wien", city: "Vienna", hours: "8am–8pm", phone: "+43 1 876 5432", store_type: "Flagship" },
    { store_name: "Roast & Co. Prenzlauer", address: "Kastanienallee 7, 10435 Berlin", city: "Berlin", hours: "9am–6pm", phone: "+49 30 789 012", store_type: "Pop-up" },
  ],
  total_stores: 12,
  regions_served: 3,
};

export const StoreLocatorFinderClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "clean" }} brandKit={brandKit} />;
export const StoreLocatorFinderMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "minimal" }} brandKit={brandKit} />;
export const StoreLocatorMapPinsClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "map-pins", theme: "clean" }} brandKit={brandKit} />;
export const StoreLocatorMapPinsMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "map-pins", theme: "minimal" }} brandKit={brandKit} />;
export const StoreLocatorDirectoryClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "directory", theme: "clean" }} brandKit={brandKit} />;
export const StoreLocatorDirectoryMinimal: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "directory", theme: "minimal" }} brandKit={brandKit} />;

// ── Extended Themes ──────────────────────────────────────────────
export const StoreLocatorOceanFinder: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "ocean" }} brandKit={brandKit} />;
export const StoreLocatorSunsetMapPins: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "map-pins", theme: "sunset" }} brandKit={brandKit} />;
export const StoreLocatorForestDirectory: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "directory", theme: "forest" }} brandKit={brandKit} />;
export const StoreLocatorRoseFinder: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "rose" }} brandKit={brandKit} />;
export const StoreLocatorGoldMapPins: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "map-pins", theme: "gold" }} brandKit={brandKit} />;
export const StoreLocatorMidnightDirectory: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "directory", theme: "midnight" }} brandKit={brandKit} />;
export const StoreLocatorCrimsonFinder: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "crimson" }} brandKit={brandKit} />;
export const StoreLocatorLavenderMapPins: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "map-pins", theme: "lavender" }} brandKit={brandKit} />;
export const StoreLocatorArcticDirectory: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "directory", theme: "arctic" }} brandKit={brandKit} />;
export const StoreLocatorEspressoFinder: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <StoreLocator spec={{ ...BASE_SPEC, layout: "finder", theme: "espresso" }} brandKit={brandKit} />;
