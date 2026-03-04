// Types matching Supabase schema

export type ReportType =
  | "informe"
  | "newsletter"
  | "player-profile"
  | "head2head"
  | "set-pieces"
  | "post-match"
  | "playing-model";

export type TeamMode = "national" | "club";
export type TeamStatus = "available" | "coming_soon" | "playoff_pending";
export type ReportStatus = "draft" | "published" | "archived";
export type Confederation = "CONMEBOL" | "UEFA" | "CAF" | "AFC" | "CONCACAF" | "OFC";
export type Tier = 1 | 2 | 3;
export type CompetitionType = "league" | "tournament" | "world-cup";
export type DataSource = "fbref" | "understat" | "transfermarkt";

// ---- Row types ----

export interface CompetitionRow {
  id: string;
  slug: string;
  name_es: string;
  name_en: string;
  type: CompetitionType;
  season: string | null;
  country: string | null;
  confederation: string | null;
  active: boolean;
  created_at: string;
}

export interface TeamRow {
  id: string;
  slug: string;
  name_es: string;
  name_en: string;
  flag: string;
  mode: TeamMode;
  confederation: string;
  fifa_ranking: number;
  tier: Tier;
  status: TeamStatus;
  competition_slug: string | null;
  wc_group: string | null;
  quick_stats: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerRow {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  nationality: string;
  nationality_flag: string | null;
  date_of_birth: string | null;
  position: string;
  current_team_slug: string | null;
  national_team_slug: string | null;
  market_value: string | null;
  contract_until: string | null;
  fbref_id: string | null;
  transfermarkt_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReportRow {
  id: string;
  team_slug: string;
  competition_slug: string | null;
  type: ReportType;
  label_es: string;
  label_en: string;
  description_es: string | null;
  description_en: string | null;
  sections: number | null;
  pages: string | null;
  published_date: string;
  status: ReportStatus;
  player_slug: string | null;
  comparison_slugs: string[] | null;
  match_date: string | null;
  match_opponent: string | null;
  file_html: string | null;
  file_pdf: string | null;
  file_docx: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScrapedDataRow {
  id: string;
  team_slug: string;
  source: DataSource;
  mode: TeamMode;
  season: string | null;
  data: Record<string, unknown>;
  scraped_at: string;
  expires_at: string | null;
}

export interface ProcessedDataRow {
  id: string;
  team_slug: string;
  season: string | null;
  ici_data: Record<string, unknown> | null;
  percentiles: Record<string, unknown> | null;
  role_profiles: Record<string, unknown> | null;
  tactical_indices: Record<string, unknown> | null;
  processed_at: string;
}

export interface PlayerStatsRow {
  id: string;
  player_slug: string;
  team_slug: string;
  season: string;
  source: string;
  stats: Record<string, unknown>;
  radar_data: Record<string, unknown> | null;
  percentiles: Record<string, unknown> | null;
  ici_score: number | null;
  ici_breakdown: Record<string, unknown> | null;
  role_profile: Record<string, unknown> | null;
  minutes_played: number | null;
  matches_played: number | null;
  processed_at: string;
}
