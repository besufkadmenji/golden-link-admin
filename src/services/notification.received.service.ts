import { NotificationsResponse } from "@/types/notification";
import { ApiResponse } from "@/types/response";
import axiosClient from "@/utils/axios.client";

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
  ): Promise<NotificationsResponse> {
    try {
      const response = await axiosClient.get<NotificationsResponse>(
        `/notifications/me?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get unread notification count for the current user
   * @returns Promise with unread count
   */
  static async getUnreadNotificationCount(): Promise<
    ApiResponse<{ unreadCount: number }>
  > {
    try {
      const response = await axiosClient.get<
        ApiResponse<{ unreadCount: number }>
      >("/notifications/me/unread-count");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
