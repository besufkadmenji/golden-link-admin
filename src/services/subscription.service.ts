import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetSubscriptionsParams,
  SubscriptionRequestsResponse,
  SubscriptionRequestsData,
  SubscriptionRequestDetailResponse,
  SubscriptionRequestDetail,
  SubscriptionApproveResponse,
  ApprovedSubscriptionData,
  SubscriptionRejectResponse,
  RejectSubscriptionDto,
} from "@/types/subscription";

export class SubscriptionService {
  /**
   * Get subscription requests list
   * GET /admin/subscriptions
   * @param params - Query parameters (search, type, period, page, limit)
   * @returns Subscription requests with pagination info
   */
  static async getSubscriptionRequests(
    params?: GetSubscriptionsParams
  ): Promise<SubscriptionRequestsData | null> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.type) {
        queryParams.append("type", params.type);
      }
      if (params?.period) {
        queryParams.append("period", params.period);
      }
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }

      const queryString = queryParams.toString();
      const url = `/admin/subscriptions${queryString ? `?${queryString}` : ""}`;

      const response = await axiosClient.get<SubscriptionRequestsResponse>(
        url,
      );

      if (response.status === 204) {
        return null;
      }

      const result =
        unwrapAxiosResponse<SubscriptionRequestsResponse>(response);
      return result?.data || null;
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
   * Get subscription request details by ID
   * GET /admin/subscriptions/:id
   * @param id - Subscription request ID
   * @returns Subscription request details with document images
   */
  static async getSubscriptionRequestDetail(
    id: string
  ): Promise<SubscriptionRequestDetail | null> {
    try {
      const response = await axiosClient.get<SubscriptionRequestDetailResponse>(
        `/admin/subscriptions/${id}`,
      );

      if (response.status === 204) {
        return null;
      }

      const result =
        unwrapAxiosResponse<SubscriptionRequestDetailResponse>(response);
      return result?.data || null;
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
   * Approve subscription request
   * POST /admin/subscriptions/:id/approve
   * @param id - Subscription request ID to approve
   * @returns Approved subscription data
   */
  static async approveSubscriptionRequest(
    id: string
  ): Promise<ApprovedSubscriptionData | null> {
    try {
      const response = await axiosClient.post<SubscriptionApproveResponse>(
        `/admin/subscriptions/${id}/approve`,
        {},
      );

      if (response.status === 204) {
        return null;
      }

      const result = unwrapAxiosResponse<SubscriptionApproveResponse>(response);
      return result?.data || null;
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
   * Reject subscription request
   * POST /admin/subscriptions/:id/reject
   * @param id - Subscription request ID to reject
   * @param reason - Reason for rejection
   * @returns null on successful rejection
   */
  static async rejectSubscriptionRequest(
    id: string,
    reason: string
  ): Promise<boolean> {
    try {
      const response = await axiosClient.post<SubscriptionRejectResponse>(
        `/admin/subscriptions/${id}/reject`,
        { reason } as RejectSubscriptionDto,
      );

      if (response.status === 204) {
        return false;
      }

      unwrapAxiosResponse<SubscriptionRejectResponse>(response);
      return true;
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
