import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, DM_Mono } from "next/font/google";
import { getDictionary, Locale, locales } from "@/lib/i18n";
import { getTeams, teamName } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const allTeams = await getTeams();
  const searchTeams = allTeams
    .filter((t) => t.status !== "playoff_pending")
    .map((t) => ({
      slug: t.slug,
      name: teamName(t, loc),
      flag: t.flag,
      mode: t.mode,
      href: `/${locale}/${t.mode === "national" ? "mundial-2026" : "clubes"}/${t.slug}`,
    }));

  return (
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${sourceSerif.variable} ${dmMono.variable}`}
      >
        <Navbar locale={locale} dict={dict} searchTeams={searchTeams} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
