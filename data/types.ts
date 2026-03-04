export type Confederation = "CONMEBOL" | "UEFA" | "CAF" | "AFC" | "CONCACAF" | "OFC";
export type Tier = 1 | 2 | 3;
export type TeamStatus = "available" | "coming_soon" | "playoff_pending";
export type TeamMode = "national" | "club";
export type ReportType = "informe" | "newsletter";

export interface BilingualText {
  es: string;
  en: string;
}

export interface ReportFormat {
  html?: string;
  pdf?: string;
  docx?: string;
}

export interface Report {
  teamSlug: string;
  competition: string;
  type: ReportType;
  label: BilingualText;
  description?: BilingualText;
  sections?: number;
  pages?: string;
  date: string;
  formats: ReportFormat;
}

export interface Team {
  slug: string;
  name: BilingualText;
  flag: string;
  group: string;
  confederation: Confederation;
  fifaRanking: number;
  tier: Tier;
  mode: TeamMode;
  competition: string;
  status: TeamStatus;
  quickStats?: {
    formation?: string;
    qualifyingPosition?: string;
    goals?: string;
    winRate?: string;
  };
}

export interface Group {
  letter: string;
  teams: string[]; // slugs
}
