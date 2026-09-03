import { AppLayoutWrapper } from "@/components/app/shared/AppLayout";
import { getHeaderLogoPathServerSide } from "@/services/setting.service.server";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const headerLogoPath = await getHeaderLogoPathServerSide(lang);

  return (
    <AppLayoutWrapper headerLogoPath={headerLogoPath}>
      {children}
    </AppLayoutWrapper>
  );
}
