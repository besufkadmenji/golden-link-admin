"use client";

import { useLang } from "@/hooks/useLang";
import { NotificationReceivedService } from "@/services/notification.received.service";
import { MyNotificationsResponse } from "@/types/me.notification";
import { GetNotificationsParams } from "@/types/notification";
import { ApiResponse } from "@/types/response";
import { useInfiniteQuery, useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

const NOTIFICATION_POLL_INTERVAL_MS = 30_000;
const POPOVER_NOTIFICATIONS_LIMIT = 10;

export const usePopoverNotifications = () => {
  const lang = useLang();

  return useInfiniteQuery({
    queryKey: ["popoverNotifications", lang],
    queryFn: ({ pageParam }) =>
      NotificationReceivedService.getMyNotifications(
        pageParam,
        POPOVER_NOTIFICATIONS_LIMIT,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.pagination.hasNext
        ? lastPage.pagination.currentPage + 1
        : undefined,
    refetchOnWindowFocus: false,
    refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  });
};

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
    refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
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
    refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
    refetchIntervalInBackground: false,
  });
};
