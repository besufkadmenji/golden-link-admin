import type { ChartOptions, TooltipItem } from "chart.js";

export const chartOptions = (theme: string): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: theme !== "dark" ? "#ffffff" : "#1a1a1a",
      titleColor: theme !== "dark" ? "#333843" : "#e5e5e5",
      bodyColor: theme !== "dark" ? "#667085" : "#fff",
      borderColor: theme !== "dark" ? "#DFE0EB" : "#3a3a3a",
      borderWidth: 1,
      padding: 8,
      boxPadding: 6,
      usePointStyle: false,
      displayColors: false,
      callbacks: {
        title: () => "",
        label: function (context: TooltipItem<"line">) {
          return context.parsed.y !== null ? context.parsed.y.toString() : "";
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      min: 0,
      // max: 60,
      ticks: {
        display: false,
        stepSize: 1,
        color: theme !== "dark" ? "#9FA2B4" : "#fff",
        font: {
          size: 12,
          family: "Inter",
        },
        callback: function (value: number | string) {
          if (typeof value === "number") {
            return value === 0 ? "0" : value.toString();
          }
          return value;
        },
      },
      grid: {
        color: theme !== "dark" ? "#DFE0EB" : "#3a3a3a",
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
  },
});
