"use client";
import { useLang } from "@/hooks/useLang";
import { HomeService } from "@/services/home.service";
import {
  DashboardPeriod,
  DashboardSummaryParams,
  LatestJoinRequestsParams,
  SubscriptionComparisonParams,
} from "@/types/home";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const useDashboard = () => {
  const lang = useLang();
  const [period] = useQueryState("option", {
    defaultValue: "ALL",
  });
  const params: DashboardSummaryParams = {
    period: period as DashboardPeriod,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => HomeService.getDashboardSummary(params, lang),
  });

  return {
    dashboard: data,
    isLoading,
    isError,
    error,
  };
};

export const useLatestJoinRequests = () => {
  const lang = useLang();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latestJoinRequests"],
    queryFn: () => HomeService.getLatestJoinRequests(undefined, lang),
  });

  return {
    joinRequests: data,
    isLoading,
    isError,
    error,
  };
};

export const useMonthlySubscriptionsComparison = (
  interval: string = "this_month",
) => {
  const lang = useLang();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let inactiveMonth = currentMonth;
  let inactiveYear = currentYear;

  // Calculate previous period based on interval
  if (interval === "this_month") {
    // Current month vs previous month
    inactiveMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    inactiveYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  } else if (interval === "last_6_months") {
    // Current month vs 6 months ago
    inactiveMonth = currentMonth >= 6 ? currentMonth - 6 : currentMonth + 6;
    inactiveYear = currentMonth >= 6 ? currentYear : currentYear - 1;
  } else if (interval === "this_year") {
    // Current month vs same month last year
    inactiveMonth = currentMonth;
    inactiveYear = currentYear - 1;
  }

  const params: SubscriptionComparisonParams = {
    activeMonthIndex: currentMonth,
    activeYear: currentYear,
    inactiveMonthIndex: inactiveMonth,
    inactiveYear: inactiveYear,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["monthlySubscriptionsComparison", interval],
    queryFn: () => HomeService.getMonthlySubscriptionsComparison(params, lang),
  });

  // Format the inactive period label
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const previousPeriodLabel = `${monthNames[inactiveMonth]} ${inactiveYear}`;

  return {
    subscriptionsComparison: data,
    isLoading,
    isError,
    error,
    previousPeriodLabel,
  };
};
