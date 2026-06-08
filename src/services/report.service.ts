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
    params?: AdminReportParams
  ): Promise<AdminReportResponse | null> {
    try {
      const response = await axiosClient.get("/admin/report");
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
}
