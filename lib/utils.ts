import { Locale } from "./i18n";

/**
 * Calculate days remaining until the World Cup 2026 opening match.
 * June 11, 2026 — Mexico vs South Africa
 */
export function daysUntilWorldCup(): number {
  const worldCupStart = new Date("2026-06-11T00:00:00");
  const now = new Date();
  const diff = worldCupStart.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Replace {placeholder} tokens in a string with values
 */
export function t(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (str, [key, value]) => str.replace(`{${key}}`, String(value)),
    template
  );
}

/**
 * Get the localized name from a bilingual text object
 */
export function localized(
  text: { es: string; en: string },
  locale: Locale
): string {
  return text[locale];
}
