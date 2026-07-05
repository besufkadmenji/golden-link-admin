import type { NotificationEntityType } from "@/types/me.notification";
import type { UnreadCountData } from "@/types/notifications/unread-count";
import type { ApiResponse } from "@/types/response";

const ADMIN_NOTIFICATION_ROUTES: Partial<
  Record<NotificationEntityType, (entityId: string) => string>
> = {
  contact_message: (entityId) => `/content/contact-us/${entityId}`,
  subscription_request: (entityId) => `/subscribers/requests/${entityId}`,
};

export function resolveNotificationRoute(
  type: NotificationEntityType | null,
  entityId: string | null,
): string | null {
  if (!type || !entityId?.trim()) {
    return null;
  }

  const buildRoute = ADMIN_NOTIFICATION_ROUTES[type];
  return buildRoute ? buildRoute(entityId) : null;
}

export function resolveUnreadCount(data: unknown): number {
  if (!data || typeof data !== "object") {
    return 0;
  }

  if (
    "unreadCount" in data &&
    typeof (data as UnreadCountData).unreadCount === "number"
  ) {
    return (data as UnreadCountData).unreadCount;
  }

  if ("data" in data) {
    const nested = (data as ApiResponse<UnreadCountData>).data;
    if (typeof nested?.unreadCount === "number") {
      return nested.unreadCount;
    }
  }

  return 0;
}
