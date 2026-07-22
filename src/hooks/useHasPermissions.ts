import { useMe } from "@/hooks/useMe";
import { createPermissionEvaluator } from "@/utils/permissions";

export type { PermissionAction } from "@/utils/permissions";
export { hasFullAccess, normalizePermissionModule } from "@/utils/permissions";

export const usePermissions = () => {
  const {
    me,
    userPermissions,
    userPermissionsLoading,
    userPermissionsError,
    isLoading,
  } = useMe();
  const permissions =
    me?.permissionType === "CUSTOM"
      ? (userPermissions?.permissions ?? me?.permissions ?? [])
      : (me?.permissions ?? []);

  const isPermissionLoading =
    isLoading ||
    !me ||
    (me.permissionType === "CUSTOM" &&
      !userPermissionsError &&
      (userPermissionsLoading || userPermissions === undefined));

  const { hasPermission, hasAnyPermission } = createPermissionEvaluator({
    permissionType: me?.permissionType,
    permissions: me ? permissions : [],
  });

  return { hasPermission, hasAnyPermission, isPermissionLoading, me };
};
