"use client";

import { getFirstAllowedRoute } from "@/config/routePermissions";
import {
  PermissionAction,
  usePermissions,
} from "@/hooks/useHasPermissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Status toggles use update until backend ships a dedicated activate action.
export const canActivate = (
  hasPermission: (module: string, type: PermissionAction) => boolean,
  module: string,
): boolean => hasPermission(module, "update");

export const useRequirePermission = (
  module: string,
  action: PermissionAction,
  redirectTo?: string,
) => {
  const router = useRouter();
  const { hasPermission, hasAnyPermission, isPermissionLoading } =
    usePermissions();

  const allowed = hasPermission(module, action);

  useEffect(() => {
    if (isPermissionLoading) return;
    if (allowed) return;

    const fallback = redirectTo ?? getFirstAllowedRoute(hasAnyPermission);
    router.replace(fallback ?? "/404");
  }, [action, allowed, hasAnyPermission, isPermissionLoading, module, redirectTo, router]);

  return { allowed, isPermissionLoading };
};
