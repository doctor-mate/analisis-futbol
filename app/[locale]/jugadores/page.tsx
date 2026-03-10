import { getDictionary, Locale } from "@/lib/i18n";
import { reports } from "@/data/reports";
import Link from "next/link";
import styles from "./page.module.css";

export const revalidate = 3600;

// Player data derived from reports + profile JSON
const players = [
  {
    slug: "tobio-burgos",
    name: "Joaquín Tobio Burgos",
    position: { es: "Extremo Izquierdo", en: "Left Winger" },
    team: "Estudiantes de La Plata",
    league: "Liga Profesional Argentina",
    age: 21,
    flag: "🇦🇷",
    photo: "https://img.a.transfermarkt.technology/portrait/big/1298369-1739827596.jpg?lm=1",
    archetype: { es: "Extremo Creativo", en: "Creative Winger" },
    rating: "C",
    potential: "B",
  },
];

export default async function JugadoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const playerReports = reports.filter((r) => r.type === "player-profile");

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{dict.jugadores.title}</h1>
          <p className={styles.subtitle}>{dict.jugadores.subtitle}</p>
        </div>
      </section>

      <hr className="editorial-rule" style={{ margin: "0 auto 40px", maxWidth: 960 }} />

      <section className={styles.players}>
        <div className="container">
          <div className={styles.grid}>
            {players.map((player) => {
              const report = playerReports.find((r) => r.playerSlug === player.slug);
              return (
                <div key={player.slug} className={styles.card}>
                  <div className={styles.photoCol}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={player.photo}
                      alt={player.name}
                      className={styles.photo}
                    />
                  </div>
                  <div className={styles.infoCol}>
                    <div className={styles.nameRow}>
                      <span className={styles.flag}>{player.flag}</span>
                      <h2 className={styles.name}>{player.name}</h2>
                    </div>
                    <p className={styles.position}>{player.position[loc]}</p>
                    <div className={styles.meta}>
                      <span>{player.team}</span>
                      <span className={styles.sep}>·</span>
                      <span>{player.age} {dict.jugadores.years}</span>
                    </div>
                    <div className={styles.tags}>
                      <span className={styles.archetype}>{player.archetype[loc]}</span>
                      <span className={styles.ratingBadge}>
                        {loc === "es" ? "Actual" : "Current"}: {player.rating}
                      </span>
                      <span className={styles.potentialBadge}>
                        {loc === "es" ? "Potencial" : "Potential"}: {player.potential}
                      </span>
                    </div>
                    {report?.formats.html && (
                      <div className={styles.actions}>
                        <Link href={report.formats.html} className={styles.viewBtn}>
                          {dict.jugadores.viewProfile}
                        </Link>
                        {report.formats.pdf && (
                          <a
                            href={report.formats.pdf}
                            className={styles.pdfBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
