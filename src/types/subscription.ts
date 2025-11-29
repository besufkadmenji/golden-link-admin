/**
 * Subscription Request Types
 */

export type SubscriptionType = "SUPPLIER" | "WAREHOUSE_OWNER";

export interface SubscriptionRequest {
  id: string;
  fullName: string;
  organizationName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  type: SubscriptionType;
  createdAt: string;
}

export interface SubscriptionRequestDetail extends SubscriptionRequest {
  commercialRegistrationImagePath?: string;
  taxRegistrationImagePath?: string;
}

export interface ApprovedSubscriptionData {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
}

export interface RejectSubscriptionDto {
  reason: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SubscriptionRequestsData {
  subscriptionRequests: SubscriptionRequest[];
  pagination: PaginationInfo;
}

export interface SubscriptionRequestDetailResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: SubscriptionRequestDetail;
}

export interface SubscriptionApproveResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: ApprovedSubscriptionData;
}

export interface SubscriptionRejectResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: null;
}

export interface SubscriptionRequestsResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: SubscriptionRequestsData;
}

export interface GetSubscriptionsParams {
  search?: string;
  type?: SubscriptionType;
  page?: number;
  limit?: number;
}
