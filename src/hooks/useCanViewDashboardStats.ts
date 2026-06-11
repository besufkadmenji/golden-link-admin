import { useMe } from "@/hooks/useMe";
import { usePermissions } from "@/hooks/useHasPermissions";

const DASHBOARD_STATS_MODULES = [
  "subscriber",
  "subscriptionRequest",
  "report",
] as const;

export const useCanViewDashboardStats = () => {
  const { me, isLoading: meLoading } = useMe();
  const { hasAnyPermission, isPermissionLoading } = usePermissions();

  const isReady = !meLoading && !isPermissionLoading;

  if (!isReady || !me) {
    return { canView: false, isReady };
  }

  if (me.permissionType !== "CUSTOM") {
    return { canView: true, isReady: true };
  }

  return {
    canView: hasAnyPermission([...DASHBOARD_STATS_MODULES], "read"),
    isReady: true,
  };
};
