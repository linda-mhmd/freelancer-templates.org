import React from "react";
import { ReleaseNotes, ReleaseNotesSpec } from "./ReleaseNotes";
import { BrandKit } from "../_shared/themes";

const BASE_SPEC: ReleaseNotesSpec = {
  product_name: "Sisy",
  version: "v2.1.0",
  release_date: "Feb 20, 2026",
  changes: [
    { title: "SSO Authentication", description: "SAML + OIDC provider support", category: "feature", contributor: "Linda Mohamed" },
    { title: "Dashboard Widget System", description: "Composable drag-and-drop widgets", category: "feature", contributor: "Linda Mohamed" },
    { title: "API Rate Limiting", description: "Per-tenant throttling with Redis", category: "improvement", contributor: "Mrs Lee G" },
    { title: "Auth Token Expiry Fix", description: "Resolved premature session timeout", category: "fix", contributor: "Linda Mohamed" },
    { title: "Deprecated v1 Endpoints", description: "Removed legacy REST endpoints", category: "breaking" },
    { title: "Search Performance", description: "3x faster full-text search", category: "improvement", contributor: "Linda Mohamed" },
  ],
  category_counts: { feature: 2, fix: 1, improvement: 2, breaking: 1 },
  highlights: "SSO support and composable dashboard widgets",
};

export const ReleaseNotesChangelogDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "changelog", theme: "dark" }} brandKit={brandKit} />;
export const ReleaseNotesChangelogClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "changelog", theme: "clean" }} brandKit={brandKit} />;
export const ReleaseNotesHighlightsDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "highlights", theme: "dark" }} brandKit={brandKit} />;
export const ReleaseNotesHighlightsClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "highlights", theme: "clean" }} brandKit={brandKit} />;
export const ReleaseNotesVersionCompareDark: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "version-compare", theme: "dark" }} brandKit={brandKit} />;
export const ReleaseNotesVersionCompareClean: React.FC<{ brandKit?: BrandKit }> = ({ brandKit }) => <ReleaseNotes spec={{ ...BASE_SPEC, layout: "version-compare", theme: "clean" }} brandKit={brandKit} />;
