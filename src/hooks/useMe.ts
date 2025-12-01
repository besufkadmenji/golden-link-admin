import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { AdminAuthPayload } from "@/types/admin.auth";
import { AuthService } from "@/services/auth.service";
export const useMe = (): {
  me: AdminAuthPayload | null | undefined;
  isLoading: boolean;
  isError: boolean;
  logout: () => Promise<void>;
} => {
  const {
    isLoading,
    isError,
    data: me,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => AuthService.getAdminProfile(),
  });

  const logout = async (): Promise<void> => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    Cookie.remove("accessTokenExpiry");
    Cookie.remove("refreshTokenExpiry");
    window.location.reload();
  };

  return { isLoading, isError, me, logout };
};
