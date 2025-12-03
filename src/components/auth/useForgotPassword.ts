import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { AuthService } from "@/services/auth.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

export const useForgotPassword = () => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const lng = useLang();
  const dict = useDict();
  const searchParams = useSearchParams();
  const [resetSeconds, setResetSeconds] = useState(60);
  const timer = useRef<string | undefined | NodeJS.Timeout>(undefined);
  const startTimer = useCallback(() => {
    timer.current = setInterval(() => {
      setResetSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);
  const forgotPassword = async (email: string) => {
    setBusy(true);
    try {
      const response = await AuthService.forgotPassword(
        {
          email: email,
        },
        lng,
      );
      if (response) {
        router.replace(
          `/verify-reset-code?email=${encodeURIComponent(email)}&sessionId=${encodeURIComponent(response.sessionId)}`,
        );
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
    setBusy(false);
  };

  const resendCode = async () => {
    const email = searchParams.get("email") || "";
    await forgotPassword(email);
    setResetSeconds(60);
    startTimer();
  };

  const verifyResetCode = async (code: string) => {
    setBusy(true);
    try {
      const email = searchParams.get("email") || "";
      const response = await AuthService.verifyResetCode(
        {
          email: email,
          verificationCode: code,
          sessionId: searchParams.get("sessionId") || "",
        },
        lng,
      );
      if (response) {
        router.replace(
          `/reset-password?email=${encodeURIComponent(email)}&sessionId=${encodeURIComponent(response.verifiedSessionId)}`,
        );
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
    setBusy(false);
  };
  const resetPassword = async (
    newPassword: string,
    confirmPassword: string,
  ) => {
    setBusy(true);
    try {
      const email = searchParams.get("email") || "";

      const response = await AuthService.resetPassword(
        {
          email: email,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
          sessionId: searchParams.get("sessionId") || "",
        },
        lng,
      );
      if (response) {
        showSuccessMessage(dict.auth.password_reset_success);
        router.replace(`/login`);
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
    setBusy(false);
  };

  return {
    forgotPassword,
    verifyResetCode,
    resetPassword,
    busy,
    resetSeconds,
    startTimer,
    resendCode,
  };
};
