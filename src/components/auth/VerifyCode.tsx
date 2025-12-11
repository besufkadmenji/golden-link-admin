"use client";
import LogoIcon from "@/assets/icons/main.logo.svg";
import { useForgotPassword } from "@/components/auth/useForgotPassword";
import { useDict } from "@/hooks/useDict";
import { Button, InputOtp } from "@heroui/react";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../app/shared/button/PrimaryButton";
import { SiteLayout } from "../shared/SiteLayout";
export const VerifyCode = () => {
  const dict = useDict();
  const [code, setCode] = useState("");
  const { verifyResetCode, busy, resendCode, startTimer, resetSeconds } =
    useForgotPassword();
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <SiteLayout>
      <div className="dark:bg-dark-app-background mx-6 grid min-w-[26vw] grid-cols-1 justify-items-center gap-12 self-center rounded-xl bg-white px-8.5 py-8 pb-16 lg:justify-self-center">
        <div className="grid grid-cols-1 justify-items-center gap-5">
          <LogoIcon className="size-25" />
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="text-xl font-medium text-black dark:text-white">
              {dict.admin_verify_code_form.title}
            </p>
            <p className="text-sm text-[#8B8D97] dark:text-white/70">
              {dict.common.system_name}
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 justify-items-center gap-6">
          <div className="grid w-full grid-cols-1 justify-items-center gap-5">
            <p>{dict.admin_verify_code_form.description}</p>
            <div dir="ltr">
              <InputOtp
                length={4}
                value={code}
                onValueChange={setCode}
                size="lg"
                classNames={{
                  segmentWrapper: "h-12 py-0 gap-5 ",
                  segment:
                    "bg-[#F9F9FC] dark:bg-dark-black size-12 border before:content-['-'] data-[focus-visible=true]:before:content-[''] data-[active=true]:before:content-[''] data-[has-value=true]:before:content-[''] rounded-lg border-dashboard-border dark:border-dark-border",
                }}
                placeholder="-"
              />
            </div>
          </div>
          <div className="grid justify-items-center gap-6">
            <p className="leading-5 font-semibold tracking-tight text-[#D4AF37]">
              00:{resetSeconds < 10 ? `0${resetSeconds}` : resetSeconds}
            </p>
            <Button
              variant="flat"
              className="text-app-primary dark:bg-dark-black h-5 min-h-0 bg-white py-0"
              isDisabled={resetSeconds !== 0}
              onPress={() => {
                resendCode();
              }}
            >
              {dict.admin_verify_code_form.resend_code}
            </Button>
          </div>
        </div>
        <PrimaryButton
          className="px-11"
          onPress={() => verifyResetCode(code)}
          isLoading={busy}
          isDisabled={busy}
        >
          {dict.admin_verify_code_form.buttons.confirm}
        </PrimaryButton>
      </div>
    </SiteLayout>
  );
};
