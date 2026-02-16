import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import { AdminReportParams, AdminReportResponse } from "@/types/report";

export class ReportService {
  /**
   * Get admin report with summary and package statistics
   * GET /admin/report
   * @param lang - Language preference
   * @returns Admin report with summary and packages data
   */
  static async getAdminReport(
    params?: AdminReportParams,
    lang?: string,
  ): Promise<AdminReportResponse | null> {
    try {
      const response = await axiosClient.get("/admin/report", {
        headers: lang ? { "Accept-Language": lang } : {},
      });
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
