/**
 * Invoice Showcase - Pre-configured compositions for each theme × layout combo.
 *
 * REGISTERED COMPOSITIONS:
 *   InvoiceDarkProfessional    - Dark theme, professional layout
 *   InvoiceCleanProfessional   - Clean theme, professional layout
 *   InvoiceBoldUrgent          - Bold theme, urgent layout
 *   InvoiceWarmFriendly        - Warm theme, friendly layout
 *   InvoiceMinimalProfessional - Minimal theme, professional layout
 *   InvoiceNeonUrgent          - Neon theme, urgent layout
 */

import React from "react";
import { Invoice } from "./Invoice";
import type { InvoiceSpec } from "./Invoice";
import {
  THEME_DARK,
  THEME_CLEAN,
  THEME_BOLD,
  THEME_WARM,
  THEME_MINIMAL,
  THEME_NEON,
} from "../_shared/themes";

// ── Sample Data: Web Design Project (Due) ───────────────────────

const SAMPLE_DUE_SPEC: InvoiceSpec = {
  client_name: "Mrs Lee G",
  freelancer_name: "Linda Mohamed",
  invoice_number: "INV-2026-042",
  amount: 4500,
  currency: "USD",
  due_date: "March 15, 2026",
  status: "due",
  items: [
    { description: "UI/UX Design - Homepage & Product Pages", amount: 2000 },
    { description: "Frontend Development - React + Next.js", amount: 1800 },
    { description: "Responsive QA & Browser Testing", amount: 450 },
    { description: "Deployment & Launch Support", amount: 250 },
  ],
  payment_link: "https://pay.example.com/inv-042",
  note: "Thank you for a great project! Payment is due within 14 days.",
};

// ── Sample Data: AI Consulting (Overdue) ────────────────────────

const SAMPLE_OVERDUE_SPEC: InvoiceSpec = {
  client_name: "Linda Mohamed",
  freelancer_name: "Linda Mohamed",
  invoice_number: "INV-2026-038",
  amount: 7200,
  currency: "USD",
  due_date: "February 20, 2026",
  status: "overdue",
  items: [
    { description: "AI Workflow Audit - 2 Day On-Site", amount: 3000 },
    { description: "Custom Agent Development (3 agents)", amount: 2800 },
    { description: "Integration & API Setup", amount: 900 },
    { description: "Team Training Workshop (4 hours)", amount: 500 },
  ],
  payment_link: "https://pay.example.com/inv-038",
  note: "This invoice is 7 days overdue. Please process payment at your earliest convenience.",
};

// ── Composition: Dark + Professional ────────────────────────────
export const InvoiceDarkProfessional: React.FC = () => (
  <Invoice spec={SAMPLE_DUE_SPEC} theme={THEME_DARK} layout="professional" bgPattern="grid" />
);

// ── Composition: Clean + Professional ───────────────────────────
export const InvoiceCleanProfessional: React.FC = () => (
  <Invoice spec={SAMPLE_DUE_SPEC} theme={THEME_CLEAN} layout="professional" bgPattern="dots" />
);

// ── Composition: Bold + Urgent ──────────────────────────────────
export const InvoiceBoldUrgent: React.FC = () => (
  <Invoice spec={SAMPLE_OVERDUE_SPEC} theme={THEME_BOLD} layout="urgent" bgPattern="none" />
);

// ── Composition: Warm + Friendly ────────────────────────────────
export const InvoiceWarmFriendly: React.FC = () => (
  <Invoice spec={SAMPLE_DUE_SPEC} theme={THEME_WARM} layout="friendly" bgPattern="hex" />
);

// ── Composition: Minimal + Professional ─────────────────────────
export const InvoiceMinimalProfessional: React.FC = () => (
  <Invoice spec={SAMPLE_DUE_SPEC} theme={THEME_MINIMAL} layout="professional" bgPattern="none" />
);

// ── Composition: Neon + Urgent ──────────────────────────────────
export const InvoiceNeonUrgent: React.FC = () => (
  <Invoice spec={SAMPLE_OVERDUE_SPEC} theme={THEME_NEON} layout="urgent" bgPattern="hex" />
);
