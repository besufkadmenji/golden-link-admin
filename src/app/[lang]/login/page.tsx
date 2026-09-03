import { LogIn } from "@/components/auth/LogIn";
import { getHeaderLogoPathServerSide } from "@/services/setting.service.server";

const LogInPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const headerLogoPath = await getHeaderLogoPathServerSide(lang);

  return <LogIn headerLogoPath={headerLogoPath} />;
};

export default LogInPage;
