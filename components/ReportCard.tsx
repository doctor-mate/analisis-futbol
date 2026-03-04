import { Report } from "@/data/types";
import { Locale } from "@/lib/i18n";
import { localized } from "@/lib/utils";
import styles from "./ReportCard.module.css";

interface ReportCardProps {
  report: Report;
  locale: Locale;
  labels: {
    viewHtml: string;
    downloadPdf: string;
    downloadDocx: string;
    sections: string;
    pages: string;
  };
}

export default function ReportCard({ report, locale, labels }: ReportCardProps) {
  const iconMap: Record<string, string> = {
    "informe": "📄",
    "newsletter": "📰",
    "player-profile": "👤",
    "head2head": "⚔️",
    "set-pieces": "🚩",
    "post-match": "📊",
    "playing-model": "♟️",
  };
  const icon = iconMap[report.type] || "📄";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <h3 className={styles.title}>{localized(report.label, locale)}</h3>
          {report.description && (
            <p className={styles.description}>
              {localized(report.description, locale)}
            </p>
          )}
          {(report.sections || report.pages) && (
            <div className={styles.meta}>
              {report.sections && (
                <span>{labels.sections.replace("{n}", String(report.sections))}</span>
              )}
              {report.pages && (
                <span>{labels.pages.replace("{n}", report.pages)}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {report.formats.html && (
          <a href={report.formats.html} target="_blank" rel="noopener" className={styles.btnPrimary}>
            {labels.viewHtml} →
          </a>
        )}
        {report.formats.pdf && (
          <a href={report.formats.pdf} download className={styles.btnSecondary}>
            {labels.downloadPdf} ↓
          </a>
        )}
        {report.formats.docx && (
          <a href={report.formats.docx} download className={styles.btnSecondary}>
            {labels.downloadDocx} ↓
          </a>
        )}
      </div>
    </div>
  );
}
