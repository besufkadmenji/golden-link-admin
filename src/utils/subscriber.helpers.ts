import Dictionary from "@/config/i18n/types";

export const normalizeSubscriberRole = (roleName?: string | null): string => {
  if (!roleName) return "";
  return roleName.trim().toUpperCase().replace(/[\s-]+/g, "_");
};

export const normalizeSubscriberStatus = (status?: string | null): string => {
  if (!status) return "";
  return status.trim().toUpperCase();
};

export const typeMap = (dict: Dictionary) => ({
  WAREHOUSE_OWNER: dict.common.warehouseOwner,
  SUPPLIER: dict.common.supplier,
});

export const getSubscriberRoleLabel = (
  dict: Dictionary,
  roleName?: string | null,
): string => {
  const normalized = normalizeSubscriberRole(roleName);
  const labels = typeMap(dict);
  return labels[normalized as keyof typeof labels] ?? roleName ?? "";
};

export const isWarehouseOwnerRole = (roleName?: string | null) =>
  normalizeSubscriberRole(roleName) === "WAREHOUSE_OWNER";

export const isSupplierRole = (roleName?: string | null) =>
  normalizeSubscriberRole(roleName) === "SUPPLIER";

export const isDeletedStatus = (status?: string | null) =>
  normalizeSubscriberStatus(status) === "DELETED";

export const isActiveStatus = (status?: string | null) =>
  normalizeSubscriberStatus(status) === "ACTIVE";
