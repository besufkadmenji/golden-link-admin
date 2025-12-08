"use client";

import { useLang } from "@/hooks/useLang";
import { NotificationReceivedService } from "@/services/notification.received.service";
import {
  GetNotificationsParams,
  NotificationsResponse,
} from "@/types/notification";
import { ApiResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useNotifications = (
  initialParams?: GetNotificationsParams,
): UseQueryResult<NotificationsResponse, Error> => {
  const [page] = useQueryState(
    "notificationPage",
    parseAsInteger.withDefault(1),
  );
  const [limit] = useQueryState(
    "notificationLimit",
    parseAsInteger.withDefault(10),
  );
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const lang = useLang();

  const params: GetNotificationsParams = {
    page,
    limit,
    ...(search && { search }),
    ...initialParams,
  };

  return useQuery({
    queryKey: ["notifications", lang, page, limit, search],
    queryFn: () => NotificationReceivedService.getMyNotifications(page, limit),
  });
};

export const useUnreadNotificationsCount = (): UseQueryResult<
  ApiResponse<{ unreadCount: number }>,
  Error
> => {
  const lang = useLang();

  return useQuery({
    queryKey: ["unreadNotificationsCount", lang],
    queryFn: () => NotificationReceivedService.getUnreadNotificationCount(),
  });
};
