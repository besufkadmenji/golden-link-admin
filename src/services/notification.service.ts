import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetNotificationsParams,
  NotificationsData,
  NotificationsResponse,
  NotificationDetail,
  NotificationDetailResponse,
  CreateNotificationDto,
} from "@/types/notification";

export class NotificationService {
  /**
   * Get admin notifications list
   * GET /notifications/admin
   * @param params - Query parameters (search, startDate, endDate, page, limit)
   * @param lang - Language preference
   * @returns Notifications list with pagination info
   */
  static async getAdminNotifications(
    params?: GetNotificationsParams,
    lang?: string,
  ): Promise<NotificationsData | null> {
    try {
      const response = await axiosClient.get<NotificationsResponse>(
        "/notifications/admin",
        {
          params,
          headers: lang ? { "Accept-Language": lang } : {},
        },
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
   * Get admin notification by ID
   * GET /notifications/admin/:id
   * @param id - Notification ID
   * @param lang - Language preference
   * @returns Notification details with recipients information
   */
  static async getAdminNotificationById(
    id: string,
    lang?: string,
  ): Promise<NotificationDetail | null> {
    try {
      const response = await axiosClient.get<NotificationDetailResponse>(
        `/notifications/admin/${id}`,
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
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
   * Create and send notification to admin recipients
   * POST /notifications/admin
   * @param dto - Notification data with title, content, and recipient IDs
   * @param lang - Language preference
   * @returns Created notification with recipients information
   */
  static async createAdminNotification(
    dto: CreateNotificationDto,
    lang?: string,
  ): Promise<NotificationDetail | null> {
    try {
      const response = await axiosClient.post<NotificationDetailResponse>(
        "/notifications/admin",
        dto,
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
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
}
