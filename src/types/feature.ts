export interface Feature {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  featurePhotoPath: string;
  isActive: boolean;
  createdAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FeaturesData {
  features: Feature[];
  pagination: Pagination;
}

export interface GetFeaturesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateFeatureDto {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
  featurePhoto?: File;
}

export interface UpdateFeatureDto {
  name?: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isActive?: boolean;
  featurePhoto?: File;
}
