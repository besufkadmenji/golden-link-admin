import { useMe } from "@/hooks/useMe";

export type PermissionAction =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "manage"
  | "activate"
  | "deactivate";

const WRITE_ACTIONS: PermissionAction[] = ["create", "update", "delete"];

const FULL_ACCESS_TYPES = new Set(["ADMINISTRATOR"]);

// Keep legacy admin-site module names compatible with the canonical modules
// returned by the current ADMIN permission catalog.
const PERMISSION_MODULE_ALIASES: Record<string, string> = {
  about: "settings",
  client: "clients",
  clients: "clients",
  feature: "features",
  features: "features",
  message: "settings",
  notification: "notifications",
  notifications: "notifications",
  package: "packages",
  packages: "packages",
  privacy: "settings",
  report: "reports",
  reports: "reports",
  subscriber: "subscribers",
  subscribers: "subscribers",
  subscription: "subscriptions",
  subscription_request: "subscriptions",
  subscriptionrequest: "subscriptions",
  subscriptions: "subscriptions",
  terms: "settings",
  user: "users",
  users: "users",
};

export const normalizePermissionModule = (module: string): string => {
  const normalizedModule = module.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return PERMISSION_MODULE_ALIASES[normalizedModule] ?? normalizedModule;
};

export const hasFullAccess = (permissionType?: string | null): boolean =>
  !!permissionType && FULL_ACCESS_TYPES.has(permissionType);

export const usePermissions = () => {
  const { me, userPermissions, userPermissionsLoading, userPermissionsError, isLoading } =
    useMe();
  const permissions =
    me?.permissionType === "CUSTOM"
      ? userPermissions?.permissions ?? me?.permissions ?? []
      : me?.permissions ?? [];

  const isPermissionLoading =
    isLoading ||
    !me ||
    (me.permissionType === "CUSTOM" &&
      !userPermissionsError &&
      (userPermissionsLoading || userPermissions === undefined));

  const hasPermission = (
    module: string,
    type: PermissionAction,
  ): boolean => {
    if (!me) return false;
    if (hasFullAccess(me.permissionType)) return true;

    const normalizedModule = normalizePermissionModule(module);
    const modulePermissions = permissions.filter(
      (permission) =>
        normalizePermissionModule(permission.module) === normalizedModule,
    );
    if (modulePermissions.length === 0) return false;

    if (
      modulePermissions.some((perm) =>
        ["full_access", "manage"].includes(perm.action),
      )
    ) {
      return true;
    }

    if (type === "read") {
      return modulePermissions.some((perm) =>
        ["read", ...WRITE_ACTIONS].includes(perm.action as PermissionAction),
      );
    }

    return modulePermissions.some((perm) => perm.action === type);
  };

  const hasAnyPermission = (
    modules: string[],
    type: PermissionAction,
  ): boolean => modules.some((module) => hasPermission(module, type));

  return { hasPermission, hasAnyPermission, isPermissionLoading, me };
};
