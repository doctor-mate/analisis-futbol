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

function isNew(dateStr: string): boolean {
  const published = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
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
  const showNew = isNew(report.date);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{localized(report.label, locale)}</h3>
            {showNew && <span className={styles.newBadge}>New</span>}
          </div>
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
