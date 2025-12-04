import { PermissionService } from "@/services/permission.service";
import {
  AssignedPermissionsResponse,
  PermissionsListResponse,
} from "@/types/permission";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "./useLang";

export const usePermissions = () => {
  const lang = useLang();

  const {
    isLoading,
    isError,
    data: permissionsData,
    error,
  } = useQuery<PermissionsListResponse | null>({
    queryKey: ["permissions"],
    queryFn: () =>
      PermissionService.getPermissions(
        {
          page: 1,
          limit: 100,
        },
        lang,
      ),
  });

  return {
    permissions: permissionsData?.permissions || [],
    pagination: permissionsData?.pagination,
    isLoading,
    isError,
    error,
  };
};
export const useUserPermission = (userId: string) => {
  const lang = useLang();

  const {
    isLoading,
    isError,
    data: permissionsData,
    error,
  } = useQuery<AssignedPermissionsResponse | null>({
    queryKey: ["userPermissions", userId],
    queryFn: () => PermissionService.getUserPermissions(userId, lang),
  });

  return {
    permissions: permissionsData?.permissions || [],
    isLoading,
    isError,
    error,
  };
};
