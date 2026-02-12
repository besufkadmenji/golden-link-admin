"use client";

import { sar } from "@/assets/fonts/sar";
import { useDict } from "@/hooks/useDict";
import randomColor from "randomcolor";
import { Doughnut } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";
import { createChartData } from "./chartConfig";
import { chartOptions } from "./chartOptions";
import { inventoryData } from "./data";

export const RevenueClassification = () => {
  const dict = useDict();
  const chartData = inventoryData.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: randomColor({
      seed: `${index}${item.name}`,
      luminosity: "bright",
      format: "rgba",
      alpha: 0.9,
    }),
  }));
  const data = createChartData(chartData);
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 rounded-2xl bg-white px-8 py-3 shadow-[0px_4px_4px_0px_rgba(170,170,170,0.25)] dark:bg-black dark:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between">
        <p className="text-title dark:text-dark-title text-lg leading-normal font-semibold tracking-wide">
          {dict.reports.chart.revenue_by_packages}
        </p>
        <div className="grid grid-cols-1">
          <p className="text-subTitle leading-6 font-medium">
            {dict.reports.chart.total}
          </p>
          <p className="text-2xl leading-8 font-bold text-[#1C2A53]">
            25,047 <span className={sar.className}>A</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-66.5 w-66.5">
          <Doughnut data={data} options={chartOptions} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {chartData
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div
              key={index}
              className="border-dashboard-border dark:bg-dark-app-background dark:border-dark-border flex h-10 items-center justify-between rounded-lg border bg-[#F9F9FC] px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <p className="text-title dark:text-dark-title text-sm leading-5 tracking-tight">
                  {item.name}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <p className="text-sm leading-5 font-bold tracking-tight text-[#1EB564]">
                  {item.value}
                </p>
                <span className={twMerge("text-sm", sar.className)}>A</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
