import { useMe } from "@/hooks/useMe";

export type PermissionAction = "create" | "read" | "update" | "delete";

const WRITE_ACTIONS: PermissionAction[] = ["create", "update", "delete"];

const FULL_ACCESS_TYPES = new Set(["ADMINISTRATOR"]);

export const hasFullAccess = (permissionType?: string | null): boolean =>
  !!permissionType && FULL_ACCESS_TYPES.has(permissionType);

export const usePermissions = () => {
  const { me, userPermissions, userPermissionsLoading, isLoading } = useMe();
  const permissions =
    me?.permissionType === "CUSTOM"
      ? userPermissions?.permissions ?? me?.permissions ?? []
      : me?.permissions ?? [];

  const isPermissionLoading =
    isLoading ||
    !me ||
    (me.permissionType === "CUSTOM" &&
      (userPermissionsLoading || userPermissions === undefined));

  const hasPermission = (
    module: string,
    type: PermissionAction,
  ): boolean => {
    if (!me) return false;
    if (hasFullAccess(me.permissionType)) return true;

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

  return { hasPermission, hasAnyPermission, isPermissionLoading, me };
};
