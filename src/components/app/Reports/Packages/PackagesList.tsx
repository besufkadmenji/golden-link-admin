import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../../shared/tables/AppTable";
import { packagesList } from "./packages_list";
import { renderCell } from "./renderCell";

export const PackagesList = () => {
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
      rows={packagesList.map((pkg) => ({
        key: pkg.id,
        id: pkg.id,
        number: pkg.packageNumber,
        name: pkg.packageName,
        purchases: pkg.numberOfPurchases.toString(),
        sales: pkg.totalRevenue.toString(),
        profit: pkg.totalPlatformProfit.toString(),
        vat: pkg.totalAddedTax.toString(),
      }))}
      renderCell={(row: RowType, column: Key): ReactNode =>
        renderCell(row, column)
      }
    />
  );
};
