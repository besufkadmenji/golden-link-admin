import { VerifyCode } from "@/components/auth/VerifyCode";
import { getHeaderLogoPathServerSide } from "@/services/setting.service.server";

const VerifyCodePage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const headerLogoPath = await getHeaderLogoPathServerSide(lang);

  return <VerifyCode headerLogoPath={headerLogoPath} />;
};

export default VerifyCodePage;
