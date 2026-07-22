import type { PermissionAction } from "@/utils/permissions";

export interface RoutePermissionRule {
  pathPrefix: string;
  modules: string[];
  action?: PermissionAction;
}

export const DASHBOARD_STATS_MODULES = ["dashboard"] as const;

interface ActionRouteRule {
  pattern: RegExp;
  modules: string[];
  action: PermissionAction;
}

/** Checked before prefix rules; longer/more-specific patterns first. */
const ACTION_ROUTE_RULES: ActionRouteRule[] = [
  {
    pattern: /^\/subscribers\/add$/,
    modules: ["subscribers"],
    action: "create",
  },
  {
    pattern: /^\/subscribers\/[^/]+\/edit$/,
    modules: ["subscribers"],
    action: "update",
  },
  {
    pattern: /^\/packages\/add$/,
    modules: ["packages"],
    action: "create",
  },
  {
    pattern: /^\/packages\/[^/]+\/edit$/,
    modules: ["packages"],
    action: "update",
  },
  {
    pattern: /^\/clients\/add$/,
    modules: ["clients"],
    action: "create",
  },
  {
    pattern: /^\/clients\/[^/]+\/edit$/,
    modules: ["clients"],
    action: "update",
  },
  {
    pattern: /^\/content\/features\/add$/,
    modules: ["features"],
    action: "create",
  },
  {
    pattern: /^\/content\/features\/[^/]+\/edit$/,
    modules: ["features"],
    action: "update",
  },
  {
    pattern: /^\/admins\/add$/,
    modules: ["users"],
    action: "create",
  },
  {
    pattern: /^\/admins\/[^/]+\/edit$/,
    modules: ["users"],
    action: "update",
  },
  {
    pattern: /^\/notifications\/add$/,
    modules: ["notifications"],
    action: "create",
  },
];

/** Longer/more-specific prefixes must appear first. */
export const ROUTE_PERMISSION_RULES: RoutePermissionRule[] = [
  {
    pathPrefix: "/dashboard",
    modules: [...DASHBOARD_STATS_MODULES],
  },
  { pathPrefix: "/subscribers/requests", modules: ["subscriptions"] },
  { pathPrefix: "/subscribers", modules: ["subscribers"] },
  { pathPrefix: "/packages/subscribers", modules: ["subscribers"] },
  { pathPrefix: "/packages", modules: ["packages"] },
  { pathPrefix: "/admins", modules: ["users"] },
  { pathPrefix: "/reports", modules: ["reports"] },
  { pathPrefix: "/clients", modules: ["clients"] },
  { pathPrefix: "/settings", modules: ["settings"] },
  { pathPrefix: "/notifications", modules: ["notifications"] },
  { pathPrefix: "/content/contact-us", modules: ["contact_us"] },
  { pathPrefix: "/content/contact-management", modules: ["settings"] },
  { pathPrefix: "/content/about-platform", modules: ["settings"] },
  { pathPrefix: "/content/terms", modules: ["settings"] },
  { pathPrefix: "/content/privacy-policy", modules: ["settings"] },
  { pathPrefix: "/content/features", modules: ["features"] },
];

export const FALLBACK_ROUTES: { path: string; modules: string[] }[] = [
  { path: "/dashboard", modules: [...DASHBOARD_STATS_MODULES] },
  { path: "/admins", modules: ["users"] },
  { path: "/subscribers/requests", modules: ["subscriptions"] },
  { path: "/subscribers", modules: ["subscribers"] },
  { path: "/packages", modules: ["packages"] },
  { path: "/reports", modules: ["reports"] },
  { path: "/clients", modules: ["clients"] },
  { path: "/settings", modules: ["settings"] },
  { path: "/content/contact-management", modules: ["settings"] },
  { path: "/content/about-platform", modules: ["settings"] },
  { path: "/content/terms", modules: ["settings"] },
  { path: "/content/privacy-policy", modules: ["settings"] },
  { path: "/content/features", modules: ["features"] },
  { path: "/content/contact-us", modules: ["contact_us"] },
  { path: "/notifications", modules: ["notifications"] },
];

export const CMS_SIDEBAR_ITEMS: {
  href: string;
  labelKey:
    | "contact_admin"
    | "about"
    | "terms_and_conditions"
    | "privacy_policy"
    | "features_management"
    | "contact_us";
  modules: string[];
}[] = [
  {
    href: "/content/contact-management",
    labelKey: "contact_admin",
    modules: ["settings"],
  },
  { href: "/content/about-platform", labelKey: "about", modules: ["settings"] },
  {
    href: "/content/terms",
    labelKey: "terms_and_conditions",
    modules: ["settings"],
  },
  {
    href: "/content/privacy-policy",
    labelKey: "privacy_policy",
    modules: ["settings"],
  },
  {
    href: "/content/features",
    labelKey: "features_management",
    modules: ["features"],
  },
  {
    href: "/content/contact-us",
    labelKey: "contact_us",
    modules: ["contact_us"],
  },
];

export function cleanPathname(pathname: string): string {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
}

function getActionRoutePermission(
  cleanPath: string,
): RoutePermissionRule | null {
  const match = ACTION_ROUTE_RULES.find((rule) => rule.pattern.test(cleanPath));
  if (!match) return null;
  return {
    pathPrefix: cleanPath,
    modules: match.modules,
    action: match.action,
  };
}

export function getRoutePermission(
  pathname: string,
): RoutePermissionRule | null {
  const cleanPath = cleanPathname(pathname);
  const actionRule = getActionRoutePermission(cleanPath);
  if (actionRule) return actionRule;

  return (
    ROUTE_PERMISSION_RULES.find((rule) =>
      cleanPath.startsWith(rule.pathPrefix),
    ) ?? null
  );
}

export function isRouteAllowed(
  pathname: string,
  hasAnyPermission: (modules: string[], type: PermissionAction) => boolean,
): boolean {
  const rule = getRoutePermission(pathname);
  if (!rule) return true;
  if (rule.modules.length === 0) return false;
  return hasAnyPermission(rule.modules, rule.action ?? "read");
}

export function getFirstAllowedRoute(
  hasAnyPermission: (modules: string[], type: PermissionAction) => boolean,
): string | null {
  const match = FALLBACK_ROUTES.find((route) =>
    hasAnyPermission(route.modules, "read"),
  );
  return match?.path ?? null;
}
