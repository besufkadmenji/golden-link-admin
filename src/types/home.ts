export type DashboardPeriod = "DAY" | "WEEK" | "MONTH" | "YEAR" | "ALL";

export interface DashboardSummaryParams {
  period: DashboardPeriod;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface Subscriptions {
  activated: number;
  changePercentage: number;
}

export interface Revenue {
  total: number;
  changePercentage: number;
}

export interface Warehouses {
  created: number;
  changePercentage: number;
}

export interface JoinRequests {
  total: number;
  changePercentage: number;
}

export interface DashboardSummaryData {
  period: DashboardPeriod;
  range: DateRange;
  subscriptions: Subscriptions;
  revenue: Revenue;
  warehouses: Warehouses;
  joinRequests: JoinRequests;
}

export interface DashboardSummaryResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: DashboardSummaryData;
}

export type SubscriptionRequestType = "WAREHOUSE_OWNER" | "SUPPLIER";

export interface PhoneInfo {
  countryCode: string;
  number: string;
  formatted: string;
}

export interface LatestJoinRequest {
  order: number;
  id: string;
  name: string;
  organizationName: string;
  phone: PhoneInfo;
  email: string;
  type: SubscriptionRequestType;
  typeLabel: SubscriptionRequestType;
  requestedAt: string;
  requestedAtISO: string;
}

export interface LatestJoinRequestsResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: LatestJoinRequest[];
}

export interface LatestJoinRequestsParams {
  limit?: number;
}

export interface SubscriptionComparisonParams {
  activeMonthIndex: number;
  activeYear: number;
  inactiveMonthIndex: number;
  inactiveYear: number;
}

export interface DaySubscriptionData {
  activeMonthNewSubscriptions: number;
  previousMonthNewSubscriptions: number;
}

export interface MonthlySubscriptionsComparisonData {
  [day: string]: DaySubscriptionData;
}

export interface MonthlySubscriptionsComparisonResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: MonthlySubscriptionsComparisonData;
}
