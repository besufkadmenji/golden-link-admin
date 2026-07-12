"use client";

import { AppLoading } from "@/components/app/shared/AppLoading";
import { PermissionDenied } from "@/components/app/shared/PermissionDenied";
import {
  PermissionAction,
} from "@/hooks/useHasPermissions";
import { useRequirePermission } from "@/hooks/useRequirePermission";
import { ReactNode } from "react";

/** Renders children only when the user has the required permission. */
export const RequirePermission = ({
  module,
  action,
  children,
}: {
  module: string;
  action: PermissionAction;
  children: ReactNode;
}) => {
  const { allowed, isPermissionLoading } = useRequirePermission(module, action);

  if (isPermissionLoading) {
    return <AppLoading className="h-[50vh]" />;
  }

  if (!allowed) {
    return <PermissionDenied />;
  }

  return children;
};
