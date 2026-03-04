import { getDictionary, Locale } from "@/lib/i18n";
import styles from "./page.module.css";

export default async function MetodologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  const isEs = loc === "es";

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <div className="accent-line" style={{ marginBottom: 24 }} />
          <h1>{isEs ? "Metodología" : "Methodology"}</h1>
          <p className={styles.subtitle}>
            {isEs
              ? "Cómo producimos nuestros informes de análisis de oposición"
              : "How we produce our opposition analysis reports"}
          </p>
        </div>
      </section>

      <hr className="editorial-rule" style={{ margin: "0 auto 40px", maxWidth: 960 }} />

      <section className={styles.content}>
        <div className="container">
          {/* 17 Sections */}
          <h2>{isEs ? "17 secciones de análisis" : "17 analysis sections"}</h2>
          <p className={styles.intro}>
            {isEs
              ? "Cada informe Tier 1 incluye 17 secciones que cubren desde el perfil institucional hasta el XI probable, pasando por análisis táctico de las 5 fases del juego."
              : "Each Tier 1 report includes 17 sections covering everything from the institutional profile to the predicted XI, including tactical analysis of all 5 phases of play."}
          </p>

          <div className={styles.sectionsGrid}>
            {[
              { n: "01", es: "Portada", en: "Cover" },
              { n: "02", es: "Resumen ejecutivo", en: "Executive summary" },
              { n: "03", es: "Ficha del equipo", en: "Team profile" },
              { n: "04", es: "Cuerpo técnico", en: "Coaching staff" },
              { n: "05", es: "Plantilla", en: "Squad" },
              { n: "06", es: "Rendimiento colectivo", en: "Collective performance" },
              { n: "07", es: "Dashboard estadístico", en: "Statistical dashboard" },
              { n: "08", es: "Construcción", en: "Build-up" },
              { n: "09", es: "Progresión", en: "Progression" },
              { n: "10", es: "Finalización", en: "Finishing" },
              { n: "11", es: "Pressing y defensa", en: "Pressing & defense" },
              { n: "12", es: "Transiciones", en: "Transitions" },
              { n: "13", es: "Balón parado", en: "Set pieces" },
              { n: "14", es: "Análisis individual", en: "Individual analysis" },
              { n: "15", es: "Jugadores clave", en: "Key players" },
              { n: "16", es: "Fortalezas y debilidades", en: "Strengths & weaknesses" },
              { n: "17", es: "XI probable", en: "Predicted XI" },
            ].map((s) => (
              <div key={s.n} className={styles.sectionItem}>
                <span className={styles.sectionNum}>{s.n}</span>
                <span>{isEs ? s.es : s.en}</span>
              </div>
            ))}
          </div>

          <div className="diamond-separator"><div className="diamond" /></div>

          {/* Tiers */}
          <h2>{isEs ? "Sistema de tiers" : "Tier system"}</h2>
          <div className={styles.tiersGrid}>
            <div className={`${styles.tierCard} ${styles.tier1}`}>
              <div className={styles.tierBadge}>★ Tier 1</div>
              <div className={styles.tierPages}>30-40 {isEs ? "páginas" : "pages"}</div>
              <p>{isEs ? "Informe completo con 17 secciones. Análisis táctico profundo de las 5 fases del juego, dashboard estadístico, perfiles individuales y XI probable." : "Full report with 17 sections. Deep tactical analysis of all 5 phases of play, statistical dashboard, individual profiles and predicted XI."}</p>
            </div>
            <div className={`${styles.tierCard} ${styles.tier2}`}>
              <div className={styles.tierBadge}>● Tier 2</div>
              <div className={styles.tierPages}>15-20 {isEs ? "páginas" : "pages"}</div>
              <p>{isEs ? "Informe medio con 12-15 secciones. Cubre las fases principales del juego y jugadores clave, con dashboard reducido." : "Medium report with 12-15 sections. Covers main phases of play and key players, with reduced dashboard."}</p>
            </div>
            <div className={`${styles.tierCard} ${styles.tier3}`}>
              <div className={styles.tierBadge}>○ Tier 3</div>
              <div className={styles.tierPages}>5-8 {isEs ? "páginas" : "pages"}</div>
              <p>{isEs ? "Ficha rápida con 5 secciones esenciales: resumen, plantilla, forma, dashboard y fortalezas/debilidades." : "Quick profile with 5 essential sections: summary, squad, form, dashboard and strengths/weaknesses."}</p>
            </div>
          </div>

          <div className="diamond-separator"><div className="diamond" /></div>

          {/* Data Sources */}
          <h2>{isEs ? "Fuentes de datos" : "Data sources"}</h2>
          <ul className={styles.sourcesList}>
            <li><strong>FBref</strong> — {isEs ? "Estadísticas de equipo y jugadores (posesión, tiros, pases, defensa)" : "Team and player statistics (possession, shots, passes, defense)"}</li>
            <li><strong>Understat</strong> — {isEs ? "Expected goals (xG), PPDA (solo ligas europeas top 5)" : "Expected goals (xG), PPDA (top 5 European leagues only)"}</li>
            <li><strong>Transfermarkt</strong> — {isEs ? "Valores de mercado, lesiones, plantilla" : "Market values, injuries, squad"}</li>
            <li><strong>FIFA</strong> — {isEs ? "Rankings, resultados, historial" : "Rankings, results, history"}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
