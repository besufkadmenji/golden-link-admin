import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage } from "@/utils/http";
import {
  DashboardSummaryParams,
  DashboardSummaryData,
  DashboardSummaryResponse,
  LatestJoinRequest,
  LatestJoinRequestsResponse,
  LatestJoinRequestsParams,
  SubscriptionComparisonParams,
  MonthlySubscriptionsComparisonData,
  MonthlySubscriptionsComparisonResponse,
} from "@/types/home";

export class HomeService {
  /**
   * Get dashboard summary
   * GET /admin/dashboard/summary?period={period}
   * @param params - Dashboard summary parameters
   * @param lang - Language preference (default: "en")
   * @returns Dashboard summary data
   */
  static async getDashboardSummary(
    params: DashboardSummaryParams,
    lang: string = "en",
  ): Promise<DashboardSummaryData | null> {
    try {
      const response = await axiosClient.get<DashboardSummaryResponse>(
        "/admin/dashboard/summary",
        {
          headers: {
            "Accept-Language": lang,
          },
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
   * Get latest join requests
   * GET /admin/dashboard/latest-join-requests?limit={limit}
   * @param params - Latest join requests parameters
   * @param lang - Language preference (default: "en")
   * @returns Array of latest join requests
   */
  static async getLatestJoinRequests(
    params?: LatestJoinRequestsParams,
    lang: string = "en",
  ): Promise<LatestJoinRequest[]> {
    try {
      const response = await axiosClient.get<LatestJoinRequestsResponse>(
        "/admin/dashboard/latest-join-requests",
        {
          headers: {
            "Accept-Language": lang,
          },
          params: params || { limit: 5 },
        },
      );

      return response.data.data;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Failed to fetch latest join requests.",
        ),
      );
    }
  }

  /**
   * Get monthly subscriptions comparison
   * GET /admin/dashboard/monthly-subscriptions-comparison
   * @param params - Subscription comparison parameters
   * @param lang - Language preference (default: "en")
   * @returns Monthly subscriptions comparison data by day
   */
  static async getMonthlySubscriptionsComparison(
    params: SubscriptionComparisonParams,
    lang: string = "en",
  ): Promise<MonthlySubscriptionsComparisonData> {
    try {
      const response =
        await axiosClient.get<MonthlySubscriptionsComparisonResponse>(
          "/admin/dashboard/monthly-subscriptions-comparison",
          {
            headers: {
              "Accept-Language": lang,
            },
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
