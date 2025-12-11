"use client";

import { useDict } from "@/hooks/useDict";
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
import { Line } from "react-chartjs-2";
import { chartOptions } from "./chartOptions";
import { createChartData } from "./chartConfig";
import { currentMonthData, previousMonthData } from "./data";
import { Select, SelectItem } from "@heroui/react";
import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";

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
  const dict = useDict();
  const { theme } = useTheme();

  const data = createChartData(
    dict.dashboard.chart.title,
    currentMonthData,
    dict.dashboard.chart.title,
    previousMonthData,
  );

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 rounded-lg bg-white p-6 shadow-[0px_4px_32px_0px_rgba(51,38,174,0.04)] dark:bg-black">
      <div className="relative grid grid-cols-1 items-start gap-4.5">
        <div className="flex items-center justify-between">
          <h3 className="text-title dark:text-dark-title text-lg leading-7 font-semibold tracking-[0.4px]">
            {dict.dashboard.chart.title}
          </h3>
          <Select
            selectedKeys={["this_month"]}
            className="max-w-32"
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

        <div className="flex items-center justify-end gap-4">
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
            30 Sept 2021
          </p>
        </div>
      </div>

      <div className="grid h-[409px] grid-cols-1">
        <Line data={data} options={chartOptions(theme ?? "light")} />
      </div>
    </div>
  );
};
