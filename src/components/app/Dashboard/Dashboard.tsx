"use client";

import { Summary } from "@/components/app/Dashboard/Summary";
import { useDict } from "@/hooks/useDict";
import { TimeFilter } from "../shared/TimeFilter";
import { DashboardTable } from "./DashboardTable";
import { SubscribersChart } from "./SubscribersChart/SubscribersChart";
import { useDashboard } from "@/components/app/Dashboard/useDashboard";
import { AppLoading } from "../shared/AppLoading";

export const Dashboard = () => {
  const dict = useDict();
  const { dashboard } = useDashboard();
  return !dashboard ? (
    <AppLoading className="h-[90vh]" />
  ) : (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 items-center justify-between gap-2 lg:flex">
        <h1 className="text-dashboard-title text-2xl font-bold dark:text-white">
          {dict.dashboard.title}
        </h1>
        <TimeFilter />
      </div>
      <Summary />
      <DashboardTable />
      <SubscribersChart />
    </div>
  );
};
