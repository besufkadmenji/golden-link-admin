"use client";
import { useDict } from "@/hooks/useDict";
import { SiteLayout } from "../shared/SiteLayout";
import LogoIcon from "@/assets/icons/main.logo.svg";
import {
  FormInput,
  PasswordInput,
} from "@/components/app/shared/forms/FormInput";
import EmailIcon from "@/assets/icons/app/sms.svg";
import { useLoginForm } from "@/components/auth/useLoginForm";
import Link from "next/link";
import { PrimaryButton } from "../app/shared/button/PrimaryButton";
import { useLogIn } from "@/components/auth/useLogIn";
export const LogIn = () => {
  const dict = useDict();
  const form = useLoginForm((state) => state.form);
  const setForm = useLoginForm((state) => state.setForm);
  const { logIn, busy } = useLogIn();
  return (
    <SiteLayout>
      <div className="grid min-w-[26vw] grid-cols-1 justify-items-center gap-16 self-center justify-self-center rounded-xl bg-white px-8.5 py-8 pb-16">
        <div className="grid grid-cols-1 justify-items-center gap-5">
          <LogoIcon className="size-25" />
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="text-xl font-medium text-black">
              {dict.auth.welcome_back}
            </p>
            <p className="text-sm text-[#8B8D97]">{dict.common.system_name}</p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5">
          <FormInput
            label={dict.auth.email}
            placeholder={dict.auth.email_placeholder}
            value={form.email}
            onChange={(value: string): void => {
              setForm({ ...form, email: value });
            }}
            endContent={<EmailIcon className="size-5" />}
          />
          <div className="grid grid-cols-1 gap-3">
            <PasswordInput
              label={dict.auth.password}
              placeholder={"**************"}
              value={form.password}
              onChange={(value: string): void => {
                setForm({ ...form, password: value });
              }}
            />
            <Link
              href="/forgot-password"
              className="text-app-primary justify-self-end text-sm leading-5 font-medium tracking-tight"
            >
              {dict.auth.forgot_password}
            </Link>
          </div>
        </div>
        <PrimaryButton
          className="px-11"
          onPress={logIn}
          isLoading={busy}
          isDisabled={busy}
        >
          {dict.auth.sign_in}
        </PrimaryButton>
      </div>
    </SiteLayout>
  );
};
