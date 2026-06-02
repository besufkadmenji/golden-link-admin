import { useMe } from "@/hooks/useMe";

export const usePermissions = () => {
  const { me, userPermissions, isLoading, userPermissionsLoading } = useMe();
  const permissions =
    me?.permissionType === "CUSTOM"
      ? userPermissions?.permissions || []
      : me?.permissions || [];

  const isPermissionLoading =
    isLoading || (me?.permissionType === "CUSTOM" && userPermissionsLoading);

  const hasPermission = (
    module: string,
    type: "create" | "read" | "update" | "delete",
  ): boolean => {
    if (!me) return false;
    if (me.permissionType !== "CUSTOM") return true;

    const permission = permissions.find((perm) => perm.module === module);
    if (!permission) return false;
    if (permission.action === "full_access") return true;

    const actualPermission = permissions.find(
      (perm) => perm.module === module && perm.action === type,
    );
    if (actualPermission) return true;
    return false;
  };

  return { hasPermission, isPermissionLoading };
};
