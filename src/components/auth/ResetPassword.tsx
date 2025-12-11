"use client";
import LogoIcon from "@/assets/icons/main.logo.svg";
import { PasswordInput } from "@/components/app/shared/forms/FormInput";
import { useForgotPassword } from "@/components/auth/useForgotPassword";
import { useDict } from "@/hooks/useDict";
import { useState } from "react";
import { PrimaryButton } from "../app/shared/button/PrimaryButton";
import { SiteLayout } from "../shared/SiteLayout";
export const ResetPassword = () => {
  const dict = useDict();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, busy } = useForgotPassword();
  return (
    <SiteLayout>
      <div className="dark:bg-dark-app-background grid min-w-[26vw] grid-cols-1 justify-items-center gap-16 self-center justify-self-center rounded-xl bg-white px-8.5 py-8 pb-16">
        <div className="grid grid-cols-1 justify-items-center gap-5">
          <LogoIcon className="size-25" />
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="text-xl font-medium text-black dark:text-white">
              {dict.admin_forgot_password_form.title}
            </p>
            <p className="text-sm text-[#8B8D97] dark:text-white/70">{dict.common.system_name}</p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5">
          <PasswordInput
            label={dict.admin_reset_password_form.labels.password}
            placeholder={"**************"}
            value={newPassword}
            onChange={(value: string): void => {
              setNewPassword(value);
            }}
          />
          <PasswordInput
            label={dict.admin_reset_password_form.labels.confirm_password}
            placeholder={"**************"}
            value={confirmPassword}
            onChange={(value: string): void => {
              setConfirmPassword(value);
            }}
          />
        </div>
        <PrimaryButton
          className="px-11"
          onPress={() => resetPassword(newPassword, confirmPassword)}
          isLoading={busy}
          isDisabled={busy}
        >
          {dict.admin_reset_password_form.buttons.sign_in}
        </PrimaryButton>
      </div>
    </SiteLayout>
  );
};
