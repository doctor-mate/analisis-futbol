import { getDictionary, Locale } from "@/lib/i18n";
import styles from "./page.module.css";

const reportTypes = [
  { key: "informe", icon: "\uD83D\uDCC4" },
  { key: "playing-model", icon: "\u265F\uFE0F" },
  { key: "player-profile", icon: "\uD83D\uDC64" },
  { key: "head2head", icon: "\u2694\uFE0F" },
  { key: "set-pieces", icon: "\uD83D\uDEA9" },
  { key: "post-match", icon: "\uD83D\uDCCA" },
  { key: "newsletter", icon: "\uD83D\uDCF0" },
];

const sections = [
  { n: "01", es: "Portada", en: "Cover" },
  { n: "02", es: "Resumen ejecutivo", en: "Executive summary" },
  { n: "03", es: "Ficha del equipo", en: "Team profile" },
  { n: "04", es: "Cuerpo t\u00e9cnico", en: "Coaching staff" },
  { n: "05", es: "Plantilla", en: "Squad" },
  { n: "06", es: "Rendimiento colectivo", en: "Collective performance" },
  { n: "07", es: "Dashboard estad\u00edstico", en: "Statistical dashboard" },
  { n: "08", es: "Construcci\u00f3n", en: "Build-up" },
  { n: "09", es: "Progresi\u00f3n", en: "Progression" },
  { n: "10", es: "Finalizaci\u00f3n", en: "Finishing" },
  { n: "11", es: "Pressing y defensa", en: "Pressing & defense" },
  { n: "12", es: "Transiciones", en: "Transitions" },
  { n: "13", es: "Bal\u00f3n parado", en: "Set pieces" },
  { n: "14", es: "An\u00e1lisis individual", en: "Individual analysis" },
  { n: "15", es: "Jugadores clave", en: "Key players" },
  { n: "16", es: "Fortalezas y debilidades", en: "Strengths & weaknesses" },
  { n: "17", es: "XI probable", en: "Predicted XI" },
];

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);

  const isEs = loc === "es";
  const about = dict.about;
  const rtNames = dict.reportTypes;
  const rtDescs = about.reportTypeDescs as Record<string, string>;

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{about.title}</h1>
          <p className={styles.subtitle}>{about.subtitle}</p>
        </div>
      </section>

      <hr
        className="editorial-rule"
        style={{ margin: "0 auto 40px", maxWidth: 960 }}
      />

      <section className={styles.content}>
        <div className="container">
          {/* El proyecto */}
          <p className={styles.projectIntro}>{about.introP1}</p>
          <p className={styles.projectIntro}>{about.introP2}</p>
          <p className={styles.projectIntro}>{about.introP3}</p>

          <div className="diamond-separator">
            <div className="diamond" />
          </div>

          {/* Tipos de informe */}
          <h2>{about.reportTypesTitle}</h2>
          <div className={styles.reportTypesGrid}>
            {reportTypes.map(({ key, icon }) => (
              <div key={key} className={styles.reportTypeCard}>
                <div className={styles.reportTypeIcon}>{icon}</div>
                <div className={styles.reportTypeName}>
                  {rtNames[key as keyof typeof rtNames]}
                </div>
                <div className={styles.reportTypeDesc}>{rtDescs[key]}</div>
              </div>
            ))}
          </div>

          <div className="diamond-separator">
            <div className="diamond" />
          </div>

          {/* Metodolog\u00eda: 17 secciones */}
          <h2>{about.methodologyTitle}</h2>
          <h3>{about.sectionsTitle}</h3>
          <p className={styles.intro}>{about.sectionsIntro}</p>

          <div className={styles.sectionsGrid}>
            {sections.map((s) => (
              <div key={s.n} className={styles.sectionItem}>
                <span className={styles.sectionNum}>{s.n}</span>
                <span>{isEs ? s.es : s.en}</span>
              </div>
            ))}
          </div>

          <div className="diamond-separator">
            <div className="diamond" />
          </div>

          {/* Tiers */}
          <h3>{about.tiersTitle}</h3>
          <div className={styles.tiersGrid}>
            <div className={`${styles.tierCard} ${styles.tier1}`}>
              <div className={styles.tierBadge}>{"★"} Tier 1</div>
              <div className={styles.tierPages}>
                30-40 {isEs ? "p\u00e1ginas" : "pages"}
              </div>
              <p>
                {isEs
                  ? "Informe completo con 17 secciones. An\u00e1lisis t\u00e1ctico profundo de las 5 fases del juego, dashboard estad\u00edstico, perfiles individuales y XI probable."
                  : "Full report with 17 sections. Deep tactical analysis of all 5 phases of play, statistical dashboard, individual profiles and predicted XI."}
              </p>
            </div>
            <div className={`${styles.tierCard} ${styles.tier2}`}>
              <div className={styles.tierBadge}>{"●"} Tier 2</div>
              <div className={styles.tierPages}>
                15-20 {isEs ? "p\u00e1ginas" : "pages"}
              </div>
              <p>
                {isEs
                  ? "Informe medio con 12-15 secciones. Cubre las fases principales del juego y jugadores clave, con dashboard reducido."
                  : "Medium report with 12-15 sections. Covers main phases of play and key players, with reduced dashboard."}
              </p>
            </div>
            <div className={`${styles.tierCard} ${styles.tier3}`}>
              <div className={styles.tierBadge}>{"○"} Tier 3</div>
              <div className={styles.tierPages}>
                5-8 {isEs ? "p\u00e1ginas" : "pages"}
              </div>
              <p>
                {isEs
                  ? "Ficha r\u00e1pida con 5 secciones esenciales: resumen, plantilla, forma, dashboard y fortalezas/debilidades."
                  : "Quick profile with 5 essential sections: summary, squad, form, dashboard and strengths/weaknesses."}
              </p>
            </div>
          </div>

          <div className="diamond-separator">
            <div className="diamond" />
          </div>

          {/* Fuentes de datos */}
          <h3>{about.sourcesTitle}</h3>
          <ul className={styles.sourcesList}>
            <li>
              <strong>FBref</strong> {"\u2014"}{" "}
              {isEs
                ? "Estad\u00edsticas de equipo y jugadores (posesi\u00f3n, tiros, pases, defensa)"
                : "Team and player statistics (possession, shots, passes, defense)"}
            </li>
            <li>
              <strong>Understat</strong> {"\u2014"}{" "}
              {isEs
                ? "Expected goals (xG), PPDA (solo ligas europeas top 5)"
                : "Expected goals (xG), PPDA (top 5 European leagues only)"}
            </li>
            <li>
              <strong>Transfermarkt</strong> {"\u2014"}{" "}
              {isEs
                ? "Valores de mercado, lesiones, plantilla"
                : "Market values, injuries, squad"}
            </li>
            <li>
              <strong>FIFA</strong> {"\u2014"}{" "}
              {isEs
                ? "Rankings, resultados, historial"
                : "Rankings, results, history"}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
