import type { ChartOptions } from "chart.js";

export const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#333843",
      bodyColor: "#667085",
      borderColor: "#E0E2E7",
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = context.parsed || 0;
          return `${label}: ${value} EA`;
        },
      },
    },
  },
  cutout: "35%",
};
