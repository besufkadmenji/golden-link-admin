import { PackageFeatures } from "@/types/package";

export const PACKAGE_FEATURE_GRID_ROWS: (keyof PackageFeatures)[][] = [
  ["inventoryOperations", "products", "categories"],
  ["purchaseOrders", "invoices", "priceOffers"],
  ["customers", "suppliers", "reportsAndAnalytics"],
  ["shipmentTracking", "drivers", "rentedSpaces"],
  ["settings", "rolesAndPermissions", "packagesAndSubscriptions"],
];

export const ALL_PACKAGE_FEATURES_ENABLED = PACKAGE_FEATURE_GRID_ROWS.flat().reduce(
  (acc, key) => {
    acc[key] = true;
    return acc;
  },
  {} as PackageFeatures,
);
