import type { ChartData } from "chart.js";
import type { InventoryCategory } from "./data";

export const createChartData = (
  data: InventoryCategory[]
): ChartData<"doughnut"> => {
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };
};
