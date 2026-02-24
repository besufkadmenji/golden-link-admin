import { useMe } from "@/hooks/useMe";

export const usePermissions = () => {
  const { me } = useMe();
  const permissions = me?.permissions || [];
  const hasPermission = (
    module: string,
    type: "create" | "read" | "update" | "delete",
  ): boolean => {
    if (!me) return true;
    const permission = permissions.find((perm) => perm.module === module);
    if (!permission) return false;
    if (permission.action === "full_access") return true;

    const actualPermission = permissions.find(
      (perm) => perm.module === module && perm.action === type,
    );
    if (actualPermission) return true;
    return false;
  };

  return { hasPermission };
};
