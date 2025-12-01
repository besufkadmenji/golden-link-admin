import { useLoginForm } from "@/components/auth/useLoginForm";
import { useLang } from "@/hooks/useLang";
import { AuthService } from "@/services/auth.service";
import { showErrorMessage } from "@/utils/show.message";
import Cookie from "js-cookie";
import { useState } from "react";

export const useLogIn = () => {
  const [busy, setBusy] = useState(false);
  const form = useLoginForm((state) => state.form);

  const lng = useLang();
  const logIn = async () => {
    setBusy(true);
    try {
      const response = await AuthService.adminLogin(
        {
          email: form.email,
          password: form.password,
        },
        lng,
      );
      if (response) {
        Cookie.set("accessToken", response.accessToken);
        Cookie.set("refreshToken", response.refreshToken);
        Cookie.set("accessTokenExpiry", response.accessTokenExpiry);
        Cookie.set("refreshTokenExpiry", response.refreshTokenExpiry);
        window.history.replaceState(null, "", "/");
        window.location.href = "/";
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

  return { logIn, busy };
};
