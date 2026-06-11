"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/app/shared/Sidebar";
import { Header } from "./Header";
import { cairo } from "@/assets/fonts/cairo";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/useHasPermissions";
import { useEffect, useMemo } from "react";
import { AppLoading } from "./AppLoading";
import {
  getFirstAllowedRoute,
  isRouteAllowed,
} from "@/config/routePermissions";

export const AppLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { hasAnyPermission, isPermissionLoading } = usePermissions();

  const isAllowed = useMemo(
    () => isRouteAllowed(pathname, hasAnyPermission),
    [hasAnyPermission, pathname],
  );

  const fallbackRoute = useMemo(
    () => getFirstAllowedRoute(hasAnyPermission),
    [hasAnyPermission],
  );

  useEffect(() => {
    if (!isPermissionLoading && !isAllowed) {
      if (fallbackRoute) {
        router.replace(fallbackRoute);
      } else {
        router.replace("/404");
      }
    }
  }, [fallbackRoute, isAllowed, isPermissionLoading, router]);

  if (isPermissionLoading) {
    return <AppLoading className="h-screen" />;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div
      className={twMerge(
        `${cairo.className} bg-app-background dark:bg-dark-app-background grid h-screen w-screen grid-cols-1 lg:grid-cols-[minmax(19vw,auto)_1fr]`,
      )}
    >
      <Sidebar />
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_1fr] overflow-y-auto">
        <Header />
        <div className="grid h-full auto-rows-max grid-cols-1 items-start overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
