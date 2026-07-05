"use client";

import { useLang } from "@/hooks/useLang";
import { useSocket } from "@/realtime/useSocket";
import { NotificationReceivedService } from "@/services/notification.received.service";
import { MyNotificationsResponse } from "@/types/me.notification";
import { GetNotificationsParams } from "@/types/notification";
import { UnreadCountData } from "@/types/notifications/unread-count";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

const NOTIFICATION_POLL_INTERVAL_MS = 30_000;
const POPOVER_NOTIFICATIONS_LIMIT = 10;
const USE_POLL_FALLBACK =
  process.env.NEXT_PUBLIC_NOTIFICATION_POLL_FALLBACK === "true";

function useNotificationPollingOptions() {
  const { status } = useSocket();
  const shouldPoll =
    USE_POLL_FALLBACK || status === "disconnected" || status === "connecting";

  return shouldPoll
    ? {
        refetchInterval: NOTIFICATION_POLL_INTERVAL_MS,
        refetchIntervalInBackground: false,
      }
    : {};
}

export const usePopoverNotifications = () => {
  const lang = useLang();
  const pollingOptions = useNotificationPollingOptions();

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
    ...pollingOptions,
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
  const pollingOptions = useNotificationPollingOptions();

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
    ...pollingOptions,
  });
};

export const useUnreadNotificationsCount = (): UseQueryResult<
  UnreadCountData,
  Error
> => {
  const lang = useLang();
  const pollingOptions = useNotificationPollingOptions();

  return useQuery({
    queryKey: ["unreadNotificationsCount", lang],
    queryFn: () => NotificationReceivedService.getUnreadNotificationCount(),
    ...pollingOptions,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const lang = useLang();

  return useMutation({
    mutationFn: (id: string) =>
      NotificationReceivedService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["popoverNotifications", lang] });
      queryClient.invalidateQueries({
        queryKey: ["unreadNotificationsCount", lang],
      });
      queryClient.invalidateQueries({ queryKey: ["notifications", lang] });
    },
  });
};
