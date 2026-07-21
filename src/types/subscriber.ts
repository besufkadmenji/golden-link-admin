export interface SubscriberPackage {
  id: number;
  packageName: string;
  packageDuration: number;
  packagePrice: string;
  status: string;
}

export interface SubscriberSubscription {
  id: string;
  subscriptionPrice: string;
  vatAmount: string;
  startDate: string;
  endDate: string;
  status: string;
  package?: SubscriberPackage;
}

export interface Subscriber {
  id: string;
  fullName: string;
  organizationName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  roleName: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_APPROVAL"|"DELETED";
  createdAt: string;
  subscription?: SubscriberSubscription | null;
  package?: SubscriberPackage | null;
}

export interface SubscriberDetail extends Subscriber {
  commercialRegistrationNumber: string;
  commercialRegistrationImagePath: string;
  taxRegistrationNumber: string;
  taxRegistrationImagePath: string;
  warehouseId?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SubscribersData {
  subscribers: Subscriber[];
  pagination: Pagination;
}

export interface SubscribersListResponse {
  status: string;
  statusCode: number;
  message: string;
  data: SubscribersData;
}

export interface SubscriberDetailResponse {
  status: string;
  statusCode: number;
  message: string;
  data: SubscriberDetail;
}

export type SubscriberType =
  "SUPPLIER" | "WAREHOUSE_OWNER" | "CUSTOMER" | "SELLER";

export interface GetSubscribersParams {
  search?: string;
  type?: SubscriberType;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_APPROVAL";
  duration?: string;
  period?: "DAY" | "WEEK" | "MONTH" | "YEAR" | "ALL";
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateSubscriberDto {
  fullName: string;
  organizationName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  commercialRegistrationNumber: string;
  taxRegistrationNumber: string;
  type: SubscriberType;
  commercialRegistrationImagePath?: File;
  taxRegistrationImagePath?: File;
}

export interface UpdateSubscriberDto {
  fullName: string;
  organizationName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  commercialRegistrationNumber: string;
  taxRegistrationNumber: string;
  type: SubscriberType;
  password?: string;
  confirmPassword?: string;
  commercialRegistrationImagePath?: File;
  taxRegistrationImagePath?: File;
}
