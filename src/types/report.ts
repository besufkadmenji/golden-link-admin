/**
 * Report Summary
 */
export interface ReportSummary {
  totalRevenue: number;
  growthRate: number | null;
}

/**
 * Package Report Item
 */
export interface PackageReportItem {
  packageId: number | null;
  pacakgeNumber: number; // Note: API has typo in field name
  packageName: string;
  packagePurchasesCount: number;
  packageTotalRevenue: number;
  packageTotalVAT: number;
  packageTotalMargin: number;
}

/**
 * Admin Report Response
 */
export interface AdminReportResponse {
  summary: ReportSummary;
  packages: PackageReportItem[];
}
