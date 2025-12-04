export interface Permission {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  module: string;
  action: "create" | "read" | "update" | "delete";
  resource: string;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionsListResponse {
  permissions: Permission[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetPermissionsParams {
  page?: number;
  limit?: number;
  search?: string;
  module?: string;
  action?: "create" | "read" | "update" | "delete";
}

export interface AssignPermissionsRequest {
  userId: string;
  permissionIds: number[];
}

export interface AssignedPermissionsResponse {
  userId: string;
  permissions: Permission[];
  permissionType: string;
}
