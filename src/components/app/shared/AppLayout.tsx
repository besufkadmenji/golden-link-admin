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

export const AppLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { hasPermission, isPermissionLoading } = usePermissions();

  const isAllowed = useMemo(() => {
    const cleanPath = pathname.replace(/^\/(en|ar)/, "");
    if (cleanPath.startsWith("/dashboard")) return hasPermission("dashboard", "read");
    if (cleanPath.startsWith("/admins")) return hasPermission("admin", "read");
    if (cleanPath.startsWith("/subscribers/requests")) return hasPermission("subscriber", "read");
    if (cleanPath.startsWith("/subscribers")) return hasPermission("subscriber", "read");
    if (cleanPath.startsWith("/packages")) return hasPermission("subscription", "read");
    if (cleanPath.startsWith("/reports")) return hasPermission("report", "read");
    if (cleanPath.startsWith("/settings")) return hasPermission("settings", "read");
    if (cleanPath.startsWith("/notifications")) return hasPermission("notification", "read");
    if (cleanPath.startsWith("/content/contact-us")) return hasPermission("message", "read");
    if (cleanPath.startsWith("/content")) return true;
    if (cleanPath.startsWith("/clients")) return true;
    return true;
  }, [hasPermission, pathname]);

  const fallbackRoute = useMemo(() => {
    const routeChecks: Array<{ path: string; allowed: boolean }> = [
      { path: "/dashboard", allowed: hasPermission("dashboard", "read") },
      { path: "/admins", allowed: hasPermission("admin", "read") },
      { path: "/subscribers/requests", allowed: hasPermission("subscriber", "read") },
      { path: "/subscribers", allowed: hasPermission("subscriber", "read") },
      { path: "/packages", allowed: hasPermission("subscription", "read") },
      { path: "/reports", allowed: hasPermission("report", "read") },
      { path: "/settings", allowed: hasPermission("settings", "read") },
      { path: "/notifications", allowed: hasPermission("notification", "read") },
      { path: "/content/contact-us", allowed: hasPermission("message", "read") },
      { path: "/content/contact-management", allowed: true },
      { path: "/clients", allowed: true },
    ];
    return routeChecks.find((route) => route.allowed)?.path || null;
  }, [hasPermission]);

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
