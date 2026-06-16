import { PermissionAction } from "@/hooks/useHasPermissions";

export interface RoutePermissionRule {
  pathPrefix: string;
  modules: string[];
  action?: PermissionAction;
}

export const DASHBOARD_STATS_MODULES = [
  "subscriber",
  "subscriptionRequest",
  "report",
] as const;

interface ActionRouteRule {
  pattern: RegExp;
  modules: string[];
  action: PermissionAction;
}

/** Checked before prefix rules; longer/more-specific patterns first. */
const ACTION_ROUTE_RULES: ActionRouteRule[] = [
  {
    pattern: /^\/subscribers\/add$/,
    modules: ["subscriber"],
    action: "create",
  },
  {
    pattern: /^\/subscribers\/[^/]+\/edit$/,
    modules: ["subscriber"],
    action: "update",
  },
  {
    pattern: /^\/packages\/add$/,
    modules: ["package"],
    action: "create",
  },
  {
    pattern: /^\/packages\/[^/]+\/edit$/,
    modules: ["package"],
    action: "update",
  },
  {
    pattern: /^\/clients\/add$/,
    modules: ["client"],
    action: "create",
  },
  {
    pattern: /^\/clients\/[^/]+\/edit$/,
    modules: ["client"],
    action: "update",
  },
  {
    pattern: /^\/content\/features\/add$/,
    modules: ["feature"],
    action: "create",
  },
  {
    pattern: /^\/content\/features\/[^/]+\/edit$/,
    modules: ["feature"],
    action: "update",
  },
  {
    pattern: /^\/admins\/add$/,
    modules: ["user"],
    action: "create",
  },
  {
    pattern: /^\/admins\/[^/]+\/edit$/,
    modules: ["user"],
    action: "update",
  },
  {
    pattern: /^\/notifications\/add$/,
    modules: ["notification"],
    action: "create",
  },
];

/** Longer/more-specific prefixes must appear first. */
export const ROUTE_PERMISSION_RULES: RoutePermissionRule[] = [
  {
    pathPrefix: "/dashboard",
    modules: [...DASHBOARD_STATS_MODULES],
  },
  { pathPrefix: "/subscribers/requests", modules: ["subscriptionRequest"] },
  { pathPrefix: "/subscribers", modules: ["subscriber"] },
  { pathPrefix: "/packages/subscribers", modules: ["subscriber"] },
  { pathPrefix: "/packages", modules: ["package"] },
  { pathPrefix: "/admins", modules: ["user"] },
  { pathPrefix: "/reports", modules: ["report"] },
  { pathPrefix: "/clients", modules: ["client"] },
  { pathPrefix: "/settings", modules: ["settings"] },
  { pathPrefix: "/notifications", modules: ["notification"] },
  { pathPrefix: "/content/contact-us", modules: ["contact_us"] },
  { pathPrefix: "/content/contact-management", modules: ["message"] },
  { pathPrefix: "/content/about-platform", modules: ["about"] },
  { pathPrefix: "/content/terms", modules: ["terms"] },
  { pathPrefix: "/content/privacy-policy", modules: ["privacy"] },
  { pathPrefix: "/content/features", modules: ["feature"] },
];

export const FALLBACK_ROUTES: { path: string; modules: string[] }[] = [
  { path: "/dashboard", modules: [...DASHBOARD_STATS_MODULES] },
  { path: "/admins", modules: ["user"] },
  { path: "/subscribers/requests", modules: ["subscriptionRequest"] },
  { path: "/subscribers", modules: ["subscriber"] },
  { path: "/packages", modules: ["package"] },
  { path: "/reports", modules: ["report"] },
  { path: "/clients", modules: ["client"] },
  { path: "/settings", modules: ["settings"] },
  { path: "/notifications", modules: ["notification"] },
  { path: "/content/contact-us", modules: ["contact_us"] },
  { path: "/content/contact-management", modules: ["message"] },
  { path: "/content/about-platform", modules: ["about"] },
  { path: "/content/terms", modules: ["terms"] },
  { path: "/content/privacy-policy", modules: ["privacy"] },
  { path: "/content/features", modules: ["feature"] },
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
  { href: "/content/contact-management", labelKey: "contact_admin", modules: ["message"] },
  { href: "/content/about-platform", labelKey: "about", modules: ["about"] },
  { href: "/content/terms", labelKey: "terms_and_conditions", modules: ["terms"] },
  { href: "/content/privacy-policy", labelKey: "privacy_policy", modules: ["privacy"] },
  { href: "/content/features", labelKey: "features_management", modules: ["feature"] },
  { href: "/content/contact-us", labelKey: "contact_us", modules: ["contact_us"] },
];

export function cleanPathname(pathname: string): string {
  return pathname.replace(/^\/(en|ar)/, "");
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
