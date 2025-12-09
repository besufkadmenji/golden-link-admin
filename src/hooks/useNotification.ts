"use client";

import { useLang } from "@/hooks/useLang";
import { NotificationReceivedService } from "@/services/notification.received.service";
import { MyNotificationsResponse } from "@/types/me.notification";
import { GetNotificationsParams } from "@/types/notification";
import { ApiResponse } from "@/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useNotifications = (
  initialParams?: GetNotificationsParams,
): UseQueryResult<MyNotificationsResponse | null, Error> => {
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
    refetchOnWindowFocus: false,
  });
};

export const useUnreadNotificationsCount = (): UseQueryResult<
  ApiResponse<{
    unreadCount: number;
  }> | null,
  Error
> => {
  const lang = useLang();

  return useQuery({
    queryKey: ["unreadNotificationsCount", lang],
    queryFn: () => NotificationReceivedService.getUnreadNotificationCount(),
  });
};
