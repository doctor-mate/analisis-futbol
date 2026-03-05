import { MetadataRoute } from "next";
import { getNationalTeams, getClubTeams, groups } from "@/lib/queries";

const BASE_URL = "https://soyanalista.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nationalTeams = await getNationalTeams();
  const clubTeams = await getClubTeams();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages (both locales)
  for (const locale of ["es", "en"]) {
    entries.push(
      { url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
      { url: `${BASE_URL}/${locale}/mundial-2026`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/${locale}/clubes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${BASE_URL}/${locale}/mundial-2026/calendario`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
      { url: `${BASE_URL}/${locale}/metodologia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    );

    // Group pages
    for (const letter of groups) {
      entries.push({
        url: `${BASE_URL}/${locale}/mundial-2026/grupo/${letter.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    // National team pages
    for (const team of nationalTeams) {
      if (team.status === "playoff_pending") continue;
      entries.push({
        url: `${BASE_URL}/${locale}/mundial-2026/${team.slug}`,
        lastModified: new Date(team.updated_at),
        changeFrequency: "weekly",
        priority: team.status === "available" ? 0.8 : 0.6,
      });
    }

    // Club team pages
    for (const team of clubTeams) {
      entries.push({
        url: `${BASE_URL}/${locale}/clubes/${team.slug}`,
        lastModified: new Date(team.updated_at),
        changeFrequency: "weekly",
        priority: team.status === "available" ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}
