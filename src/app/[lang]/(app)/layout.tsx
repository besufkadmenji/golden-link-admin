import { AppLayoutWrapper } from "@/components/app/shared/AppLayout";
import { getPublicSettingServerSide } from "@/services/setting.service.server";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const headerLogoSetting = await getPublicSettingServerSide<string>(
    "header_logo",
    lang,
  );
  const headerLogoPath =
    typeof headerLogoSetting?.value === "string"
      ? headerLogoSetting.value
      : null;

  return (
    <AppLayoutWrapper headerLogoPath={headerLogoPath}>
      {children}
    </AppLayoutWrapper>
  );
}
