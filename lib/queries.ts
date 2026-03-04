import { supabase } from "./supabase";
import type {
  TeamRow,
  ReportRow,
  PlayerRow,
  ReportType,
  TeamMode,
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

// ---- Adapters (TeamRow → Team, ReportRow → Report for components) ----

import type { Team, Report } from "@/data/types";

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
