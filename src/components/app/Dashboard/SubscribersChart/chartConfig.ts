import type { ChartData } from "chart.js";

export const createChartData = (
  currentMonthLabel: string,
  currentMonthData: number[],
  previousMonthLabel: string,
  previousMonthData: number[]
): ChartData<"line"> => {
  const dataLength = Math.max(currentMonthData.length, previousMonthData.length);
  const labels = Array.from({ length: dataLength }, (_, i) => `${i + 1}`);

  return {
    labels,
    datasets: [
      {
        label: currentMonthLabel,
        data: currentMonthData,
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.05)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#2563EB",
        pointHoverBorderWidth: 3,
      },
      {
        label: previousMonthLabel,
        data: previousMonthData,
        borderColor: "#DFE0EB",
        backgroundColor: "rgba(209, 213, 219, 0.05)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#DFE0EB",
        pointHoverBorderWidth: 3,
      },
    ],
  };
};
