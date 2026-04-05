import type { SimsBackgroundVariant } from '../data/simsTheme';

/** Base props shared by all Master Layout components */
export interface BaseLayoutProps {
  /** Background variant for SimsBackground */
  background: SimsBackgroundVariant;
  /** Default content zone children */
  children?: React.ReactNode;
}

/** Content zone descriptor for layout introspection */
export interface ContentZone {
  name: string;
  description: string;
}

/** Layout metadata for documentation/tooling */
export interface LayoutMeta {
  name: string;
  zones: ContentZone[];
  description: string;
}
