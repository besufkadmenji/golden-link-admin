import { ResetPassword } from "@/components/auth/ResetPassword";
import { getHeaderLogoPathServerSide } from "@/services/setting.service.server";

const ResetPasswordPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const headerLogoPath = await getHeaderLogoPathServerSide(lang);

  return <ResetPassword headerLogoPath={headerLogoPath} />;
};

export default ResetPasswordPage;
