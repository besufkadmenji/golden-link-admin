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
  interval: string = "this_month",
) => {
  const { canView, isReady } = useCanViewDashboardStats();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let inactiveMonth = currentMonth;
  let inactiveYear = currentYear;

  if (interval === "this_month") {
    inactiveMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    inactiveYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  } else if (interval === "last_6_months") {
    inactiveMonth = currentMonth >= 6 ? currentMonth - 6 : currentMonth + 6;
    inactiveYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  } else if (interval === "this_year") {
    inactiveMonth = currentMonth;
    inactiveYear = currentYear - 1;
  }

  const params: SubscriptionComparisonParams = {
    activeMonthIndex: currentMonth,
    activeYear: currentYear,
    inactiveMonthIndex: inactiveMonth,
    inactiveYear: inactiveYear,
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ["monthlySubscriptionsComparison", interval],
    queryFn: () => HomeService.getMonthlySubscriptionsComparison(params),
    enabled: isReady && canView,
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const previousPeriodLabel = `${monthNames[inactiveMonth]} ${inactiveYear}`;

  return {
    subscriptionsComparison: data,
    isLoading: canView && isFetching,
    isError,
    previousPeriodLabel,
  };
};
