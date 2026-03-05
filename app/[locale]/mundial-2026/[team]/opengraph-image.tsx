import { ImageResponse } from "next/og";
import { getTeamBySlug } from "@/lib/queries";

export const alt = "Soy Analista — Opposition Analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; team: string }>;
}) {
  const { locale, team: teamSlug } = await params;
  const teamRow = await getTeamBySlug(teamSlug);

  const name = teamRow
    ? locale === "es" ? teamRow.name_es : teamRow.name_en
    : teamSlug;
  const flag = teamRow?.flag ?? "";
  const group = teamRow?.wc_group ?? "";
  const confederation = teamRow?.confederation ?? "";
  const tier = teamRow?.tier ?? 3;
  const ranking = teamRow?.fifa_ranking ?? 0;

  const tierLabel = tier === 1 ? "Full Report" : tier === 2 ? "Medium Report" : "Quick Profile";
  const subtitle = locale === "es"
    ? "Análisis de oposición profesional"
    : "Professional opposition analysis";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #1a1a18 0%, #2a2520 100%)",
          color: "#f5f0e8",
          fontFamily: "serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "24px",
              letterSpacing: "0.02em",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "2px solid #c4a265",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              A
            </div>
            Soy Analista
          </div>
          <div style={{ fontSize: "20px", color: "#c4a265" }}>
            Mundial 2026
          </div>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div style={{ fontSize: "120px", lineHeight: 1 }}>{flag}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                fontSize: "22px",
                color: "#b0a48a",
              }}
            >
              {group && <span>Group {group}</span>}
              {ranking > 0 && <span>FIFA #{ranking}</span>}
              <span>{confederation}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "20px", color: "#b0a48a", fontStyle: "italic" }}>
            {subtitle}
          </div>
          <div
            style={{
              fontSize: "18px",
              padding: "8px 20px",
              border: "1.5px solid #c4a265",
              borderRadius: "4px",
              color: "#c4a265",
            }}
          >
            {tierLabel}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
