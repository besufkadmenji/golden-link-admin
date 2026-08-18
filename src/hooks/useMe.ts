import { useQuery } from "@tanstack/react-query";
import { AdminAuthPayload } from "@/types/admin.auth";
import { AuthService } from "@/services/auth.service";
import { PermissionService } from "@/services/permission.service";
import { AssignedPermissionsResponse } from "@/types/permission";
import { useLang } from "./useLang";
import { clearClientAuthState } from "@/utils/auth.token";
import { showErrorMessage } from "@/utils/show.message";
export const useMe = (): {
  me: AdminAuthPayload | null | undefined;
  userPermissions: AssignedPermissionsResponse | null | undefined;
  userPermissionsLoading: boolean;
  userPermissionsError: boolean;
  isLoading: boolean;
  isError: boolean;
  logout: () => Promise<void>;
} => {
  const lang = useLang();
  const {
    isLoading,
    isError,
    data: me,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => AuthService.getAdminProfile(),
  });

  const {
    data: userPermissions,
    isLoading: userPermissionsLoading,
    isError: userPermissionsError,
  } = useQuery<AssignedPermissionsResponse | null>({
    queryKey: ["userPermissions", "me"],
    queryFn: () => PermissionService.getMyPermissions(),
    enabled: !!me?.id && me.permissionType === "CUSTOM",
  });

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      clearClientAuthState();
      window.location.replace(`/${lang}/login`);
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "Failed to logout as admin.",
      );
    }
  };

  return {
    isLoading,
    isError,
    me,
    userPermissions,
    userPermissionsLoading,
    userPermissionsError,
    logout,
  };
};
