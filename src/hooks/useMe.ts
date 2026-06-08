import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { AdminAuthPayload } from "@/types/admin.auth";
import { AuthService } from "@/services/auth.service";
import { PermissionService } from "@/services/permission.service";
import { AssignedPermissionsResponse } from "@/types/permission";
import { useLang } from "./useLang";
export const useMe = (): {
  me: AdminAuthPayload | null | undefined;
  userPermissions: AssignedPermissionsResponse | null | undefined;
  userPermissionsLoading: boolean;
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

  const { data: userPermissions, isLoading: userPermissionsLoading } =
    useQuery<AssignedPermissionsResponse | null>({
      queryKey: ["userPermissions", me?.id],
      queryFn: () => PermissionService.getUserPermissions(me?.id || ""),
      enabled: !!me,
    });

  const logout = async (): Promise<void> => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    Cookie.remove("accessTokenExpiry");
    Cookie.remove("refreshTokenExpiry");
    window.location.reload();
  };

  return {
    isLoading,
    isError,
    me,
    userPermissions,
    userPermissionsLoading,
    logout,
  };
};
