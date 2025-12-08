"use client";
import { useLang } from "@/hooks/useLang";
import { NotificationService } from "@/services/notification.service";
import { GetNotificationsParams } from "@/types/notification";
import { getDateRangeByOption, TimeFilterOption } from "@/utils/getDateRange";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useNotifications = (initialParams?: GetNotificationsParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [option] = useQueryState("option");
  const dateRange = getDateRangeByOption(option as TimeFilterOption);
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
    queryFn: () => NotificationService.getAdminNotifications(params, lang),
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
    queryFn: () => NotificationService.getAdminNotificationById(id!, lang),
    enabled: !!id,
  });

  return {
    notification,
    isLoading,
    isError,
    error,
  };
};
