import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { getHeaderLogoPathServerSide } from "@/services/setting.service.server";

const ForgotPasswordPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const headerLogoPath = await getHeaderLogoPathServerSide(lang);

  return <ForgotPassword headerLogoPath={headerLogoPath} />;
};

export default ForgotPasswordPage;
