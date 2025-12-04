import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetSubscribersParams,
  SubscribersListResponse,
  SubscribersData,
  SubscriberDetail,
  SubscriberDetailResponse,
} from "@/types/subscriber";

export class SubscriberService {
  /**
   * Get subscribers list
   * GET /admin/subscribers
   * @param params - Query parameters (search, type, status, page, limit)
   * @param lang - Language preference
   * @returns Subscribers list with pagination info
   */
  static async getSubscribers(
    params?: GetSubscribersParams,
    lang?: string,
  ): Promise<SubscribersData | null> {
    try {
      const response = await axiosClient.get("/admin/subscribers", {
        params,
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching subscribers:",
        extractAxiosErrorMessage(error, "Failed to fetch subscribers"),
      );
      return null;
    }
  }

  /**
   * Get subscriber details by ID
   * GET /admin/subscribers/:id
   * @param id - Subscriber ID
   * @param lang - Language preference
   * @returns Subscriber details with document paths
   */
  static async getSubscriberById(
    id: string,
    lang?: string,
  ): Promise<SubscriberDetail | null> {
    try {
      const response = await axiosClient.get<SubscriberDetailResponse>(
        `/admin/subscribers/${id}`,
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching subscriber:",
        extractAxiosErrorMessage(error, "Failed to fetch subscriber"),
      );
      return null;
    }
  }

  /**
   * Create new subscriber
   * POST /admin/subscribers
   * @param formData - FormData with subscriber information and document files
   * @param lang - Language preference
   * @returns Created subscriber data
   */
  static async createSubscriber(
    formData: FormData,
    lang?: string,
  ): Promise<SubscriberDetail | null> {
    try {
      const response = await axiosClient.post<SubscriberDetailResponse>(
        "/admin/subscribers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(lang && { "Accept-Language": lang }),
          },
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error creating subscriber:",
        extractAxiosErrorMessage(error, "Failed to create subscriber"),
      );
      return null;
    }
  }

  /**
   * Update subscriber
   * PUT /admin/subscribers/:id
   * @param id - Subscriber ID
   * @param formData - FormData with subscriber information and document files
   * @param lang - Language preference
   * @returns Updated subscriber data
   */
  static async updateSubscriber(
    id: string,
    formData: FormData,
    lang?: string,
  ): Promise<SubscriberDetail | null> {
    try {
      const response = await axiosClient.put<SubscriberDetailResponse>(
        `/admin/subscribers/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(lang && { "Accept-Language": lang }),
          },
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error updating subscriber:",
        extractAxiosErrorMessage(error, "Failed to update subscriber"),
      );
      return null;
    }
  }

  /**
   * Activate subscriber
   * POST /admin/subscribers/:id/activate
   * @param id - Subscriber ID
   * @param lang - Language preference
   * @returns null on success
   */
  static async activateSubscriber(id: string, lang?: string): Promise<boolean> {
    try {
      await axiosClient.post(
        `/admin/subscribers/${id}/activate`,
        {},
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return true;
    } catch (error) {
      console.error(
        "Error activating subscriber:",
        extractAxiosErrorMessage(error, "Failed to activate subscriber"),
      );
      return false;
    }
  }

  /**
   * Deactivate subscriber
   * POST /admin/subscribers/:id/deactivate
   * @param id - Subscriber ID
   * @param lang - Language preference
   * @returns boolean - true on success, false on error
   */
  static async deactivateSubscriber(
    id: string,
    lang?: string,
  ): Promise<boolean> {
    try {
      await axiosClient.post(
        `/admin/subscribers/${id}/deactivate`,
        {},
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return true;
    } catch (error) {
      console.error(
        "Error deactivating subscriber:",
        extractAxiosErrorMessage(error, "Failed to deactivate subscriber"),
      );
      return false;
    }
  }

  /**
   * Delete subscriber
   * DELETE /admin/subscribers/:id
   * @param id - Subscriber ID
   * @param lang - Language preference
   * @returns boolean - true on success, false on error
   */
  static async deleteSubscriber(id: string, lang?: string): Promise<boolean> {
    try {
      await axiosClient.delete(`/admin/subscribers/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return true;
    } catch (error) {
      console.error(
        "Error deleting subscriber:",
        extractAxiosErrorMessage(error, "Failed to delete subscriber"),
      );
      return false;
    }
  }
}
