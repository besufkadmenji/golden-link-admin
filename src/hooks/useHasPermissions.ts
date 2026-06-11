import { useMe } from "@/hooks/useMe";

export type PermissionAction = "create" | "read" | "update" | "delete";

const WRITE_ACTIONS: PermissionAction[] = ["create", "update", "delete"];

export const usePermissions = () => {
  const { me, userPermissions, isLoading } = useMe();
  const permissions =
    me?.permissionType === "CUSTOM"
      ? userPermissions?.permissions ?? me?.permissions ?? []
      : me?.permissions ?? [];

  // Profile already includes permissions; don't block the shell on a secondary fetch.
  const isPermissionLoading = isLoading;

  const hasPermission = (
    module: string,
    type: PermissionAction,
  ): boolean => {
    if (!me) return false;
    if (me.permissionType !== "CUSTOM") return true;

    const modulePermissions = permissions.filter(
      (perm) => perm.module === module,
    );
    if (modulePermissions.length === 0) return false;

    if (modulePermissions.some((perm) => perm.action === "full_access")) {
      return true;
    }

    if (type === "read") {
      return modulePermissions.some((perm) =>
        ["read", ...WRITE_ACTIONS].includes(perm.action as PermissionAction),
      );
    }

    return modulePermissions.some((perm) => perm.action === type);
  };

  const hasAnyPermission = (
    modules: string[],
    type: PermissionAction,
  ): boolean => modules.some((module) => hasPermission(module, type));

  return { hasPermission, hasAnyPermission, isPermissionLoading };
};
