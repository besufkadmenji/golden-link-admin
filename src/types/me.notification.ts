export interface MyNotification {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  sentAt: string;
  readAt: string | null;
  deliveryStatus: "DELIVERED" | "PENDING" | "FAILED";
}

export interface MyNotificationsData {
  notifications: MyNotification[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MyNotificationsResponse {
  notifications: MyNotification[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
