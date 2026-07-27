"use client";
import { useCanViewDashboardStats } from "@/hooks/useCanViewDashboardStats";
import { HomeService } from "@/services/home.service";
import {
  DashboardPeriod,
  DashboardSummaryParams,
  SubscriptionComparisonParams,
} from "@/types/home";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const useDashboard = () => {
  const { canView, isReady } = useCanViewDashboardStats();
  const [period] = useQueryState("option", {
    defaultValue: "ALL",
  });
  const params: DashboardSummaryParams = {
    period: period as DashboardPeriod,
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => HomeService.getDashboardSummary(params),
    enabled: isReady && canView,
  });

  return {
    dashboard: data,
    isLoading: canView && isFetching,
    isError,
    canView,
    isReady,
  };
};

export const useLatestJoinRequests = () => {
  const { canView, isReady } = useCanViewDashboardStats();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["latestJoinRequests"],
    queryFn: () => HomeService.getLatestJoinRequests(undefined),
    enabled: isReady && canView,
  });

  return {
    joinRequests: data,
    isLoading: canView && isFetching,
    isError,
  };
};

export const useMonthlySubscriptionsComparison = (
  params: SubscriptionComparisonParams,
) => {
  const { canView, isReady } = useCanViewDashboardStats();

  const { data, isFetching, isError } = useQuery({
    queryKey: [
      "monthlySubscriptionsComparison",
      params.activeMonthIndex,
      params.activeYear,
      params.inactiveMonthIndex,
      params.inactiveYear,
    ],
    queryFn: () => HomeService.getMonthlySubscriptionsComparison(params),
    enabled: isReady && canView,
  });

  return {
    subscriptionsComparison: data,
    isLoading: canView && isFetching,
    isError,
  };
};
