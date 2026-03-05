import { supabase } from "./supabase";
import type {
  TeamRow,
  ReportRow,
  PlayerRow,
  MatchRow,
  ReportType,
  TeamMode,
  MatchStatus,
} from "@/types/database";
import type { Locale } from "./i18n";

// ---- Teams ----

export async function getTeams(mode?: TeamMode): Promise<TeamRow[]> {
  let query = supabase.from("teams").select("*").order("fifa_ranking", { ascending: true });
  if (mode) query = query.eq("mode", mode);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getTeamBySlug(slug: string): Promise<TeamRow | null> {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getTeamsByGroup(group: string): Promise<TeamRow[]> {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("wc_group", group)
    .order("fifa_ranking", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getNationalTeams(): Promise<TeamRow[]> {
  return getTeams("national");
}

export async function getClubTeams(): Promise<TeamRow[]> {
  return getTeams("club");
}

// ---- Reports ----

export async function getReportsForTeam(slug: string): Promise<ReportRow[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("team_slug", slug)
    .eq("status", "published")
    .order("published_date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getReportsForPlayer(playerSlug: string): Promise<ReportRow[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("player_slug", playerSlug)
    .eq("status", "published")
    .order("published_date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedReports(type?: ReportType): Promise<ReportRow[]> {
  let query = supabase
    .from("reports")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false });
  if (type) query = query.eq("type", type);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ---- Players ----

export async function getPlayerBySlug(slug: string): Promise<PlayerRow | null> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getPlayersByTeam(teamSlug: string): Promise<PlayerRow[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("current_team_slug", teamSlug)
    .order("position");
  if (error) throw error;
  return data ?? [];
}

// ---- Matches ----

export async function getMatchBySlug(slug: string): Promise<MatchRow | null> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getMatchesByDate(date?: string): Promise<MatchRow[]> {
  try {
    let query = supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true })
      .order("match_time", { ascending: true });
    if (date) query = query.eq("match_date", date);
    const { data, error } = await query;
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getMatchesByTeam(teamSlug: string): Promise<MatchRow[]> {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .or(`home_team_slug.eq.${teamSlug},away_team_slug.eq.${teamSlug}`)
      .order("match_date", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getMatchesByStage(stage: string): Promise<MatchRow[]> {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("stage", stage)
      .order("match_date", { ascending: true })
      .order("match_time", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getUpcomingMatches(limit = 6): Promise<MatchRow[]> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .gte("match_date", today)
      .order("match_date", { ascending: true })
      .order("match_time", { ascending: true })
      .limit(limit);
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getRecentMatches(limit = 6): Promise<MatchRow[]> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .lt("match_date", today)
      .order("match_date", { ascending: false })
      .limit(limit);
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getReportsForMatch(matchSlug: string): Promise<ReportRow[]> {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("match_slug", matchSlug)
      .eq("status", "published")
      .order("published_date", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch { return []; }
}

export async function getRecentReports(limit = 5): Promise<ReportRow[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

// ---- Adapters (TeamRow → Team, ReportRow → Report for components) ----

import type { Team, Report, Match } from "@/data/types";

export function toTeam(row: TeamRow): Team {
  return {
    slug: row.slug,
    name: { es: row.name_es, en: row.name_en },
    flag: row.flag,
    group: row.wc_group ?? "",
    confederation: row.confederation as Team["confederation"],
    fifaRanking: row.fifa_ranking,
    tier: row.tier,
    mode: row.mode,
    competition: row.competition_slug ?? "",
    status: row.status,
    quickStats: row.quick_stats as Team["quickStats"],
  };
}

export function toReport(row: ReportRow): Report {
  return {
    teamSlug: row.team_slug,
    competition: row.competition_slug ?? "",
    type: row.type,
    label: { es: row.label_es, en: row.label_en },
    description: row.description_es
      ? { es: row.description_es, en: row.description_en ?? "" }
      : undefined,
    sections: row.sections ?? undefined,
    pages: row.pages ?? undefined,
    date: row.published_date,
    formats: {
      html: row.file_html ?? undefined,
      pdf: row.file_pdf ?? undefined,
      docx: row.file_docx ?? undefined,
    },
    playerSlug: row.player_slug ?? undefined,
    comparisonSlugs: row.comparison_slugs ?? undefined,
    matchDate: row.match_date ?? undefined,
    matchOpponent: row.match_opponent ?? undefined,
  };
}

export function toMatch(row: MatchRow): Match {
  return {
    slug: row.slug,
    competition: row.competition_slug ?? "",
    stage: row.stage,
    groupLetter: row.group_letter ?? undefined,
    matchNumber: row.match_number ?? undefined,
    date: row.match_date,
    time: row.match_time ?? undefined,
    venue: row.venue ?? undefined,
    city: row.city ?? undefined,
    homeTeamSlug: row.home_team_slug ?? undefined,
    awayTeamSlug: row.away_team_slug ?? undefined,
    homeScore: row.home_score ?? undefined,
    awayScore: row.away_score ?? undefined,
    status: row.status,
  };
}

// ---- Helpers ----

/** Get localized name from a TeamRow */
export function teamName(team: TeamRow, locale: Locale): string {
  return locale === "es" ? team.name_es : team.name_en;
}

/** Get localized label from a ReportRow */
export function reportLabel(report: ReportRow, locale: Locale): string {
  return locale === "es" ? report.label_es : report.label_en;
}

/** Get localized description from a ReportRow */
export function reportDescription(report: ReportRow, locale: Locale): string | null {
  return locale === "es" ? report.description_es : report.description_en;
}

/** World Cup group letters */
export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
