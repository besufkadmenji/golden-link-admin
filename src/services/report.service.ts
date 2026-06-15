import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import { AdminReportParams, AdminReportResponse } from "@/types/report";

export class ReportService {
  /**
   * Get admin report with summary and package statistics
   * GET /admin/report
   * @returns Admin report with summary and packages data
   */
  static async getAdminReport(
    params?: AdminReportParams,
  ): Promise<AdminReportResponse | null> {
    try {
      const response = await axiosClient.get("/admin/report", { params });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }

  /**
   * Export admin report as Excel
   * GET /admin/report/export
   */
  static async exportAdminReport(params?: AdminReportParams): Promise<void> {
    try {
      const response = await axiosClient.get("/admin/report/export", {
        params,
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const timestamp = new Date().toISOString().split("T")[0];
      link.download = `report-export-${timestamp}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Failed to export report to Excel.",
        ),
      );
    }
  }
}
