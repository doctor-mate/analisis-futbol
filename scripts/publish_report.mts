/**
 * Publish a report to Supabase and copy files to /public/reports/
 *
 * Usage:
 *   npx tsx scripts/publish_report.mts \
 *     --team argentina \
 *     --type informe \
 *     --label-es "Informe de Oposición Completo" \
 *     --label-en "Full Opposition Report" \
 *     --html ./reports/argentina_mundial_2026_report.html \
 *     [--pdf ./reports/informe_argentina_mundial2026.pdf] \
 *     [--docx ./reports/newsletter.docx] \
 *     [--sections 17] \
 *     [--pages "35+"] \
 *     [--description-es "Análisis táctico..."] \
 *     [--description-en "Tactical analysis..."] \
 *     [--player-slug messi] \
 *     [--competition mundial-2026] \
 *     [--mark-available] \
 *     [--quick-stats '{"formation":"4-3-3","goals":"39","winRate":"72%"}']
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
    team: { type: "string" },
    type: { type: "string" },
    "label-es": { type: "string" },
    "label-en": { type: "string" },
    "description-es": { type: "string" },
    "description-en": { type: "string" },
    html: { type: "string" },
    pdf: { type: "string" },
    docx: { type: "string" },
    sections: { type: "string" },
    pages: { type: "string" },
    competition: { type: "string" },
    "player-slug": { type: "string" },
    "mark-available": { type: "boolean", default: false },
    "quick-stats": { type: "string" },
  },
  strict: true,
});

const teamSlug = values.team;
const reportType = values.type;
const labelEs = values["label-es"];
const labelEn = values["label-en"];

if (!teamSlug || !reportType || !labelEs || !labelEn) {
  console.error("Required: --team, --type, --label-es, --label-en");
  process.exit(1);
}

const validTypes = [
  "informe", "newsletter", "player-profile", "head2head",
  "set-pieces", "post-match", "playing-model",
];
if (!validTypes.includes(reportType)) {
  console.error(`Invalid --type. Must be one of: ${validTypes.join(", ")}`);
  process.exit(1);
}

// ---- Determine target directory ----
async function getCompetitionSlug(): Promise<string> {
  if (values.competition) return values.competition;

  // Look up team to get its competition
  const { data: team } = await supabase
    .from("teams")
    .select("competition_slug")
    .eq("slug", teamSlug)
    .single();

  return team?.competition_slug || "mundial-2026";
}

async function publish() {
  console.log(`\nPublishing ${reportType} for ${teamSlug}...\n`);

  const competitionSlug = await getCompetitionSlug();
  const targetDir = resolve(
    new URL("../public/reports", import.meta.url).pathname,
    `${teamSlug}-${competitionSlug}`
  );

  // Create target directory
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`  Created: ${targetDir}`);
  }

  // ---- Copy files ----
  const fileMap: Record<string, string> = {};
  const fileSuffix = reportType === "informe" ? "" : `-${reportType}`;

  for (const [flag, ext] of [
    ["html", "html"],
    ["pdf", "pdf"],
    ["docx", "docx"],
  ] as const) {
    const srcPath = values[flag];
    if (!srcPath) continue;

    const src = resolve(srcPath);
    if (!existsSync(src)) {
      console.error(`  File not found: ${src}`);
      process.exit(1);
    }

    const destName = reportType === "informe"
      ? `informe.${ext}`
      : `${reportType}.${ext}`;
    const dest = resolve(targetDir, destName);
    copyFileSync(src, dest);

    const publicPath = `/reports/${teamSlug}-${competitionSlug}/${destName}`;
    fileMap[`file_${ext}`] = publicPath;
    console.log(`  Copied: ${basename(src)} → ${publicPath}`);
  }

  // ---- Insert report into Supabase ----
  const reportRow: Record<string, unknown> = {
    team_slug: teamSlug,
    competition_slug: competitionSlug,
    type: reportType,
    label_es: labelEs,
    label_en: labelEn,
    published_date: new Date().toISOString().slice(0, 10),
    status: "published",
    ...fileMap,
  };

  if (values["description-es"]) reportRow.description_es = values["description-es"];
  if (values["description-en"]) reportRow.description_en = values["description-en"];
  if (values.sections) reportRow.sections = parseInt(values.sections, 10);
  if (values.pages) reportRow.pages = values.pages;
  if (values["player-slug"]) reportRow.player_slug = values["player-slug"];

  const { error: reportError } = await supabase.from("reports").insert(reportRow);
  if (reportError) {
    console.error(`  Error inserting report: ${reportError.message}`);
    process.exit(1);
  }
  console.log(`  ✓ Report inserted into Supabase`);

  // ---- Optionally update team status ----
  if (values["mark-available"]) {
    const updateData: Record<string, unknown> = { status: "available" };

    if (values["quick-stats"]) {
      try {
        updateData.quick_stats = JSON.parse(values["quick-stats"]);
      } catch {
        console.error("  Invalid JSON for --quick-stats");
        process.exit(1);
      }
    }

    const { error: teamError } = await supabase
      .from("teams")
      .update(updateData)
      .eq("slug", teamSlug);

    if (teamError) {
      console.error(`  Error updating team: ${teamError.message}`);
    } else {
      console.log(`  ✓ Team "${teamSlug}" marked as available`);
    }
  }

  // ---- Verify ----
  const { count } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("team_slug", teamSlug);

  console.log(`\n  Total reports for ${teamSlug}: ${count}`);
  console.log("\nDone! Deploy with: git add public/reports && git push\n");
}

publish().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
