"use client";

import { Summary } from "@/components/app/Dashboard/Summary";
import { useDict } from "@/hooks/useDict";
import { TimeFilter } from "../shared/TimeFilter";
import { DashboardTable } from "./DashboardTable";
import { SubscribersChart } from "./SubscribersChart/SubscribersChart";

export const Dashboard = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-2 lg:flex items-center justify-between">
        <h1 className="text-dashboard-title dark:text-white text-2xl font-bold">
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
