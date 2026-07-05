import { MyNotificationsResponse } from "@/types/me.notification";
import {
  UnreadCountData,
  UnreadCountResponse,
} from "@/types/notifications/unread-count";
import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";

export class NotificationReceivedService {
  /**
   * Get notifications for the current user
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   * @returns Promise with notifications and pagination data
   */
  static async getMyNotifications(
    page: number = 1,
    limit: number = 10,
  ): Promise<MyNotificationsResponse | null> {
    try {
      const response = await axiosClient.get<MyNotificationsResponse>(
        `/notifications/me?page=${page}&limit=${limit}`,
      );
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
   * Get unread notification count for the current user
   * @returns Promise with unread count
   */
  static async getUnreadNotificationCount(): Promise<UnreadCountData> {
    try {
      const response = await axiosClient.get<UnreadCountResponse>(
        "/notifications/me/unread-count",
      );

      return (
        unwrapAxiosResponse<UnreadCountData>(response.data) ?? { unreadCount: 0 }
      );
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }

  static async markNotificationAsRead(id: string): Promise<void> {
    try {
      await axiosClient.patch(`/notifications/me/read/${id}`);
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
