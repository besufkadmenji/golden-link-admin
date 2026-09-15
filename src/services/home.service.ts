import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage } from "@/utils/http";
import {
  DashboardSummaryParams,
  DashboardSummaryData,
  DashboardSummaryResponse,
  SubscriptionComparisonParams,
  MonthlySubscriptionsComparisonData,
  MonthlySubscriptionsComparisonResponse,
} from "@/types/home";

export class HomeService {
  /**
   * Get dashboard summary
   * GET /admin/dashboard/summary?period={period}
   * @param params - Dashboard summary parameters
   * @returns Dashboard summary data
   */
  static async getDashboardSummary(
    params: DashboardSummaryParams
  ): Promise<DashboardSummaryData | null> {
    try {
      const response = await axiosClient.get<DashboardSummaryResponse>(
        "/admin/dashboard/summary",
        {
          params,
        },
      );

      return response.data.data;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to fetch dashboard summary."),
      );
    }
  }

  /**
   * Get monthly subscriptions comparison
   * GET /admin/dashboard/monthly-subscriptions-comparison
   * @param params - Subscription comparison parameters
   * @returns Monthly subscriptions comparison data by day
   */
  static async getMonthlySubscriptionsComparison(
    params: SubscriptionComparisonParams
  ): Promise<MonthlySubscriptionsComparisonData> {
    try {
      const response =
        await axiosClient.get<MonthlySubscriptionsComparisonResponse>(
          "/admin/dashboard/monthly-subscriptions-comparison",
          {
            params,
          },
        );

      return response.data.data;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Failed to fetch monthly subscriptions comparison.",
        ),
      );
    }
  }
}
