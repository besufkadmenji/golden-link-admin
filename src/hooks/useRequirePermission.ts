import {
  PermissionAction,
  usePermissions,
} from "@/hooks/useHasPermissions";

export const canActivate = (
  hasPermission: (module: string, type: PermissionAction) => boolean,
  module: string,
): boolean => hasPermission(module, "activate");

export const canDeactivate = (
  hasPermission: (module: string, type: PermissionAction) => boolean,
  module: string,
): boolean => hasPermission(module, "deactivate");

export const useRequirePermission = (
  module: string,
  action: PermissionAction,
) => {
  const { hasPermission, isPermissionLoading } = usePermissions();
  const allowed = hasPermission(module, action);

  return { allowed, isPermissionLoading };
};
