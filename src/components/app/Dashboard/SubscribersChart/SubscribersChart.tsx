"use client";

import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";
import { useMonthlySubscriptionsComparison } from "@/components/app/Dashboard/useDashboard";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { useDict } from "@/hooks/useDict";
import { Select, SelectItem } from "@heroui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { Line } from "react-chartjs-2";
import { createChartData } from "./chartConfig";
import { chartOptions } from "./chartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const SubscribersChart = () => {
  const [interval, setInterval] = useQueryState("interval", {
    defaultValue: "this_month",
  });
  const { subscriptionsComparison, previousPeriodLabel } =
    useMonthlySubscriptionsComparison(interval);
  const dict = useDict();
  const { theme } = useTheme();
  console.log(
    "subscriptionsComparison:",
    subscriptionsComparison,
    Object.values(subscriptionsComparison || {}),
  );
  const current = Object.values(subscriptionsComparison || {}).map(
    (item) => item.activeMonthNewSubscriptions,
  );
  const previous = Object.values(subscriptionsComparison || {}).map(
    (item) => item.previousMonthNewSubscriptions,
  );
  const data = createChartData(
    dict.dashboard.chart.title,
    current,
    dict.dashboard.chart.title,
    previous,
  );

  return !subscriptionsComparison ? (
    <AppLoading className="h-[90vh]" />
  ) : (
    subscriptionsComparison && (
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 rounded-lg bg-white p-4 shadow-[0px_4px_32px_0px_rgba(51,38,174,0.04)] lg:p-6 dark:bg-black">
        <div className="relative grid grid-cols-1 items-start gap-4.5">
          <div className="flex items-center justify-between">
            <h3 className="text-title dark:text-dark-title text-lg leading-7 font-semibold tracking-[0.4px]">
              {dict.dashboard.chart.title}
            </h3>
            <Select
              selectedKeys={[interval]}
              onSelectionChange={(k) => {
                setInterval(Array.from(k)[0] as string);
              }}
              className="max-w-40"
              classNames={{
                trigger:
                  "bg-white border border-[#EEEEEE] dark:bg-dark-black dark:border-dark-border shadow-none data-[hover=true]:border-app-primary data-[open=true]:border-app-primary data-[focus=true]:border-app-primary",
                value: "text-sm text-[#A2A2A2]!",
                selectorIcon: "size-6",
                popoverContent: "w-max",
              }}
              variant="bordered"
              selectorIcon={<ChevronDownBoldIcon className="dark:text-white" />}
            >
              <SelectItem key="this_month">
                {dict.dashboard.chart.filters.this_month}
              </SelectItem>
              <SelectItem key="last_6_months">
                {dict.dashboard.chart.filters.last_6_months}
              </SelectItem>
              <SelectItem key="this_year">
                {dict.dashboard.chart.filters.this_year}
              </SelectItem>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-0.5 w-8 rounded-full bg-[#2563EB]" />
              <p className="text-xs leading-4 font-semibold tracking-[0.1px] text-[#9FA2B4]">
                {dict.dashboard.chart.legend.current_month}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-0.5 w-4.5 rounded-full bg-[#9FA2B4]" />
              <p className="text-xs leading-4 font-semibold tracking-[0.1px] text-[#9FA2B4]">
                {dict.dashboard.chart.legend.previous_month}
              </p>
            </div>
            <p className="text-xs leading-4 tracking-tight text-[#9FA2B4]">
              {previousPeriodLabel}
            </p>
          </div>
        </div>

        <div className="grid h-40 grid-cols-1 md:h-60 lg:h-102.25">
          <Line data={data} options={chartOptions(theme ?? "light")} />
        </div>
      </div>
    )
  );
};
