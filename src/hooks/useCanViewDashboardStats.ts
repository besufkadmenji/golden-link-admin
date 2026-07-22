import { useMe } from "@/hooks/useMe";
import { hasFullAccess, usePermissions } from "@/hooks/useHasPermissions";

const DASHBOARD_STATS_MODULES = [
  "dashboard",
] as const;

export const useCanViewDashboardStats = () => {
  const { me, isLoading: meLoading } = useMe();
  const { hasAnyPermission, isPermissionLoading } = usePermissions();

  const isReady = !meLoading && !isPermissionLoading;

  if (!isReady || !me) {
    return { canView: false, isReady };
  }

  if (hasFullAccess(me.permissionType)) {
    return { canView: true, isReady: true };
  }

  return {
    canView: hasAnyPermission([...DASHBOARD_STATS_MODULES], "read"),
    isReady: true,
  };
};
