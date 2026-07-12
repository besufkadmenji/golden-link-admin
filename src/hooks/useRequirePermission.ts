import {
  PermissionAction,
  usePermissions,
} from "@/hooks/useHasPermissions";

// Status toggles use update until backend ships a dedicated activate action.
export const canActivate = (
  hasPermission: (module: string, type: PermissionAction) => boolean,
  module: string,
): boolean => hasPermission(module, "update");

export const useRequirePermission = (
  module: string,
  action: PermissionAction,
) => {
  const { hasPermission, isPermissionLoading } = usePermissions();
  const allowed = hasPermission(module, action);

  return { allowed, isPermissionLoading };
};
