"use client";
import EmailIcon from "@/assets/icons/app/sms.svg";
import { PlatformLogo } from "@/components/app/shared/PlatformLogo";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useForgotPassword } from "@/components/auth/useForgotPassword";
import { useDict } from "@/hooks/useDict";
import { useState } from "react";
import { PrimaryButton } from "../app/shared/button/PrimaryButton";
import { SiteLayout } from "../shared/SiteLayout";
export const ForgotPassword = ({
  headerLogoPath,
}: {
  headerLogoPath: string | null;
}) => {
  const dict = useDict();
  const [email, setEmail] = useState("");
  const { forgotPassword, busy } = useForgotPassword();
  return (
    <SiteLayout headerLogoPath={headerLogoPath}>
      <div className="dark:bg-dark-app-background mx-6 grid min-w-[26vw] grid-cols-1 justify-items-center gap-16 self-center rounded-xl bg-white px-8.5 py-8 pb-16 lg:justify-self-center">
        <div className="grid grid-cols-1 justify-items-center gap-5">
          <span className="relative block h-25 w-52 max-w-full">
            <PlatformLogo
              initialLogoPath={headerLogoPath}
              fallback="main"
              refreshFromAuthenticatedSetting={false}
            />
          </span>
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="text-xl font-medium text-black dark:text-white">
              {dict.admin_forgot_password_form.title}
            </p>
            <p className="text-sm text-[#8B8D97] dark:text-white/70">
              {dict.common.system_name}
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5">
          <FormInput
            label={dict.auth.email}
            placeholder={dict.auth.email_placeholder}
            value={email}
            onChange={(value: string): void => {
              setEmail(value);
            }}
            endContent={<EmailIcon className="size-5" />}
          />
        </div>
        <PrimaryButton
          className="px-11"
          onPress={() => forgotPassword(email)}
          isLoading={busy}
          isDisabled={busy}
        >
          {dict.admin_forgot_password_form.buttons.send_verification_code}
        </PrimaryButton>
      </div>
    </SiteLayout>
  );
};
