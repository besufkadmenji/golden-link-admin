import { useLoginForm } from "@/components/auth/useLoginForm";
import { useLang } from "@/hooks/useLang";
import { useDict } from "@/hooks/useDict";
import { AuthService } from "@/services/auth.service";
import { getFirstAllowedRoute } from "@/config/routePermissions";
import { createPermissionEvaluator } from "@/utils/permissions";
import { showErrorMessage } from "@/utils/show.message";
import Cookie from "js-cookie";
import { useState } from "react";

export const useLogIn = () => {
  const [busy, setBusy] = useState(false);
  const form = useLoginForm((state) => state.form);

  const lng = useLang();
  const dict = useDict();
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const logIn = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email) {
      showErrorMessage(dict.auth.validation.emailRequired);
      return;
    }

    if (!isValidEmail(email)) {
      showErrorMessage(dict.auth.validation.emailInvalid);
      return;
    }

    if (!password) {
      showErrorMessage(dict.auth.validation.passwordRequired);
      return;
    }

    setBusy(true);
    try {
      const response = await AuthService.adminLogin({
        email,
        password,
      });
      if (response) {
        Cookie.set("accessToken", response.accessToken);
        Cookie.set("refreshToken", response.refreshToken);
        Cookie.set("accessTokenExpiry", response.accessTokenExpiry);
        Cookie.set("refreshTokenExpiry", response.refreshTokenExpiry);
        const { hasAnyPermission } = createPermissionEvaluator({
          permissionType: response.user.permissionType,
          permissions: response.user.permissions,
        });
        const firstAllowedRoute =
          getFirstAllowedRoute(hasAnyPermission) ?? "/dashboard";
        window.location.replace(`/${lng}${firstAllowedRoute}`);
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
