export interface Setting {
  id: string;
  key: string;
  keyAr: string;
  value: string;
  type: string;
  description: string;
  platform: string;
  warehouseId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  updater: {
    id: string;
    fullName: string;
    email: string;
  } | null;
}

export interface SettingsResponse {
  settings: Setting[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetSettingsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface UpdateSettingDto {
  value: string;
}
