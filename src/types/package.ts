/**
 * Package Features - Boolean flags for each feature
 */
export interface PackageFeatures {
  inventoryOperations: boolean;
  products: boolean;
  categories: boolean;
  purchaseOrders: boolean;
  invoices: boolean;
  priceOffers: boolean;
  customers: boolean;
  suppliers: boolean;
  reportsAndAnalytics: boolean;
  shipmentTracking: boolean;
  drivers: boolean;
  rentedSpaces: boolean;
  settings: boolean;
  rolesAndPermissions: boolean;
  packagesAndSubscriptions: boolean;
}

/**
 * Package Entity
 */
export interface Package {
  id: number;
  packageName: string;
  packageDuration: number;
  packagePrice: string;
  status: "ACTIVE" | "INACTIVE";
  description?: string | null;
  features: PackageFeatures;
  maxWarehouses?: number | null;
  maxUsers: number | null;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string | null;
  icon: string | null;
  iconPath: string | null;
  subscribersCount: number;
}

/**
 * Create Package DTO
 */
export interface CreatePackageDto {
  packageName: string;
  packageDuration: string | number;
  packagePrice: string | number;
  features: PackageFeatures ;
  status?: "ACTIVE" | "INACTIVE";
  description?: string;
  maxWarehouses?: number;
  maxUsers?: number;
  icon?: File;
}

/**
 * Update Package DTO
 */
export interface UpdatePackageDto {
  packageName?: string;
  packageDuration?: string | number;
  packagePrice?: string | number;
  features?: PackageFeatures | string;
  description?: string;
  maxWarehouses?: number;
  maxUsers?: number;
  icon?: File;
  status?: "ACTIVE" | "INACTIVE";
}

/**
 * Package Response
 */
export interface PackageResponse {
  data: Package;
}

/**
 * Packages List Response
 */
export interface PackagesListResponse {
  data: Package[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Get Packages Query Params
 */
export interface GetPackagesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
}
