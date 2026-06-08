"use client";
import { useLang } from "@/hooks/useLang";
import { NotificationService } from "@/services/notification.service";
import { GetNotificationsParams } from "@/types/notification";
import { getDateRangeByOption } from "@/utils/getDateRange";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useNotifications = (initialParams?: GetNotificationsParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [option] = useQueryState("option");
  const dateRange = getDateRangeByOption(option);
  const params: GetNotificationsParams = {
    page,
    limit,
    ...(search && { search }),
    ...(dateRange?.startDate && { startDate: dateRange.startDate }),
    ...(dateRange?.endDate && { endDate: dateRange.endDate }),
    ...initialParams,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notifications", params, page, limit, search, option],
    queryFn: () => NotificationService.getAdminNotifications(params),
  });

  return {
    notifications: data?.notifications,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};

export const useNotificationById = (id: string | null) => {
  const lang = useLang();

  const {
    data: notification,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notification", id],
    queryFn: () => NotificationService.getAdminNotificationById(id!),
    enabled: !!id,
  });

  return {
    notification,
    isLoading,
    isError,
    error,
  };
};
