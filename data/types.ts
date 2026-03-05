export type Confederation = "CONMEBOL" | "UEFA" | "CAF" | "AFC" | "CONCACAF" | "OFC";
export type Tier = 1 | 2 | 3;
export type TeamStatus = "available" | "coming_soon" | "playoff_pending";
export type TeamMode = "national" | "club";
export type ReportType =
  | "informe"
  | "newsletter"
  | "player-profile"
  | "head2head"
  | "set-pieces"
  | "post-match"
  | "playing-model";

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
  playerSlug?: string;
  comparisonSlugs?: string[];
  matchDate?: string;
  matchOpponent?: string;
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

export type MatchStage = "group" | "round-of-32" | "round-of-16" | "quarter-final" | "semi-final" | "third-place" | "final";
export type MatchStatus = "scheduled" | "prematch_ready" | "live" | "completed" | "postmatch_ready";

export interface Match {
  slug: string;
  competition: string;
  stage: MatchStage;
  groupLetter?: string;
  matchNumber?: number;
  date: string;
  time?: string;
  venue?: string;
  city?: string;
  homeTeamSlug?: string;
  awayTeamSlug?: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
}
