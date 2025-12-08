export interface Notification {
  id: string;
  title: string;
  content: string;
  sentAt: string;
  createdBy: string;
  recipientsCount: number;
}

export interface NotificationRecipient {
  userId: string;
  fullName: string;
  deliveryStatus: "DELIVERED" | "PENDING" | "FAILED";
  deliveredAt?: string;
  readAt?: string;
}

export interface NotificationDetail extends Notification {
  recipients: NotificationRecipient[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface NotificationsData {
  notifications: Notification[];
  pagination: Pagination;
}

export interface NotificationDetailResponse {
  status: string;
  statusCode: number;
  message: string;
  data: NotificationDetail;
}

export interface NotificationsResponse {
  status: string;
  statusCode: number;
  message: string;
  data: NotificationsData;
}

export interface GetNotificationsParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateNotificationDto {
  title: string;
  content: string;
  recipientIds: string[];
}
