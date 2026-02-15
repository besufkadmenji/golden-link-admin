import { useDict } from "@/hooks/useDict";
import { AdminReportResponse } from "@/types/report";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../../shared/tables/AppTable";
import { renderCell } from "./renderCell";

export const PackagesList = ({ report }: { report: AdminReportResponse }) => {
  const dict = useDict();

  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.reports.table_headers.number,
    },

    {
      key: "number",
      label: dict.reports.table_headers.package_number,
    },
    {
      key: "name",
      label: dict.reports.table_headers.package_name,
    },
    {
      key: "purchases",
      label: dict.reports.table_headers.number_of_purchases,
      align: "center",
    },
    {
      key: "sales",
      label: dict.reports.table_headers.total_sales,
      align: "center",
    },

    {
      key: "profit",
      label: dict.reports.table_headers.total_platform_profit,
      align: "center",
    },
    {
      key: "vat",
      label: dict.reports.table_headers.total_added_tax,
      align: "center",
    },
  ];

  return (
    <AppTable
      label="Requests"
      columns={columns}
      rows={report.packages.map((pkg) => ({
        key: pkg.packageId?.toString() || "",
        id: pkg.packageId?.toString() ?? "-",
        number: pkg.pacakgeNumber.toString(),
        name: pkg.packageName ?? "-",
        purchases: pkg.packagePurchasesCount.toString(),
        sales: pkg.packageTotalRevenue.toString(),
        profit: pkg.packageTotalMargin.toString(),
        vat: pkg.packageTotalVAT.toString(),
      }))}
      renderCell={(row: RowType, column: Key): ReactNode =>
        renderCell(row, column)
      }
    />
  );
};
