import { redirect } from "next/navigation";

export default async function MetodologiaRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/sobre`);
}
