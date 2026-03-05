/**
 * Publish a post-match report and update match result.
 *
 * Usage:
 *   npx tsx scripts/publish_postmatch.mts \
 *     --match argentina-vs-austria-group-j \
 *     --team argentina \
 *     --label-es "Argentina vs Austria — Post-Partido" \
 *     --label-en "Argentina vs Austria — Post-Match" \
 *     --home-score 2 \
 *     --away-score 0 \
 *     --html ./reports/argentina-vs-austria-postmatch.html \
 *     [--pdf ./reports/argentina-vs-austria-postmatch.pdf] \
 *     [--sections 6] \
 *     [--pages "10"]
 *
 * What it does:
 *   1. Copies report files to /public/reports/{match-slug}/
 *   2. Inserts report row (type: post-match, match_slug linked)
 *   3. Updates match: score + status "postmatch_ready"
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { basename, resolve } from "path";
import { parseArgs } from "util";

// ---- Load .env.local ----
const envPath = new URL("../.env.local", import.meta.url);
const envFile = readFileSync(envPath, "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---- Parse CLI args ----
const { values } = parseArgs({
  options: {
    match: { type: "string" },
    team: { type: "string" },
    "label-es": { type: "string" },
    "label-en": { type: "string" },
    "description-es": { type: "string" },
    "description-en": { type: "string" },
    "home-score": { type: "string" },
    "away-score": { type: "string" },
    html: { type: "string" },
    pdf: { type: "string" },
    docx: { type: "string" },
    sections: { type: "string" },
    pages: { type: "string" },
  },
  strict: true,
});

const matchSlug = values.match;
const teamSlug = values.team;
const labelEs = values["label-es"];
const labelEn = values["label-en"];
const homeScore = values["home-score"];
const awayScore = values["away-score"];

if (!matchSlug || !teamSlug || !labelEs || !labelEn) {
  console.error("Required: --match, --team, --label-es, --label-en");
  process.exit(1);
}

async function publish() {
  console.log(`\nPublishing post-match report for ${matchSlug}...\n`);

  // Verify match exists
  const { data: matchRow } = await supabase
    .from("matches")
    .select("*")
    .eq("slug", matchSlug)
    .single();

  if (!matchRow) {
    console.error(`  Match not found: ${matchSlug}`);
    process.exit(1);
  }

  // Target directory
  const targetDir = resolve(
    new URL("../public/reports", import.meta.url).pathname,
    matchSlug
  );

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`  Created: ${targetDir}`);
  }

  // Copy files
  const fileMap: Record<string, string> = {};

  for (const [flag, ext] of [["html", "html"], ["pdf", "pdf"], ["docx", "docx"]] as const) {
    const srcPath = values[flag];
    if (!srcPath) continue;

    const src = resolve(srcPath);
    if (!existsSync(src)) {
      console.error(`  File not found: ${src}`);
      process.exit(1);
    }

    const destName = `postmatch.${ext}`;
    const dest = resolve(targetDir, destName);
    copyFileSync(src, dest);

    const publicPath = `/reports/${matchSlug}/${destName}`;
    fileMap[`file_${ext}`] = publicPath;
    console.log(`  Copied: ${basename(src)} → ${publicPath}`);
  }

  // Insert report
  const reportRow: Record<string, unknown> = {
    team_slug: teamSlug,
    competition_slug: "mundial-2026",
    type: "post-match",
    label_es: labelEs,
    label_en: labelEn,
    published_date: new Date().toISOString().slice(0, 10),
    status: "published",
    match_slug: matchSlug,
    match_date: matchRow.match_date,
    match_opponent: matchRow.home_team_slug === teamSlug
      ? matchRow.away_team_slug
      : matchRow.home_team_slug,
    ...fileMap,
  };

  if (values["description-es"]) reportRow.description_es = values["description-es"];
  if (values["description-en"]) reportRow.description_en = values["description-en"];
  if (values.sections) reportRow.sections = parseInt(values.sections, 10);
  if (values.pages) reportRow.pages = values.pages;

  const { error: reportError } = await supabase.from("reports").insert(reportRow);
  if (reportError) {
    console.error(`  Error inserting report: ${reportError.message}`);
    process.exit(1);
  }
  console.log(`  ✓ Report inserted into Supabase`);

  // Update match with score and status
  const updateData: Record<string, unknown> = { status: "postmatch_ready" };

  if (homeScore !== undefined) updateData.home_score = parseInt(homeScore, 10);
  if (awayScore !== undefined) updateData.away_score = parseInt(awayScore, 10);

  const { error: matchError } = await supabase
    .from("matches")
    .update(updateData)
    .eq("slug", matchSlug);

  if (matchError) {
    console.error(`  Error updating match: ${matchError.message}`);
  } else {
    const scoreStr = homeScore && awayScore ? ` (${homeScore}-${awayScore})` : "";
    console.log(`  ✓ Match "${matchSlug}" status → postmatch_ready${scoreStr}`);
  }

  console.log("\nDone! Deploy with: git add public/reports && git push\n");
}

publish().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
