import { inter } from "@/assets/fonts/inter";
import { sar } from "@/assets/fonts/sar";
import { useDict } from "@/hooks/useDict";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode } from "react";
export type ColumnType = {
  key: string;
  label: string;
  align?: "start" | "end" | "center";
};

export type RowType = {
  key: string;

  data: {
    [key: string]: {
      value: string;
      align?: "center" | "left" | "right" | "justify" | "char" | undefined;
    };
  };
};

export const InvoiceTable = ({
  columns,
  rows,
  label,
  renderCell,
  total,
}: {
  columns: ColumnType[];
  rows: RowType[];
  label?: string;
  renderCell: (
    row: RowType,
    column: Key,
  ) => {
    value: ReactNode;
    align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  };
  total: number;
}) => {
  const dict = useDict();
  return (
    <div className="dark:border-dark-border grid grid-cols-1 overflow-hidden rounded-xl border border-[#D7DAE0] p-0">
      <Table
        aria-label={label ?? "Invoice Table"}
        classNames={{
          wrapper: "shadow-none p-0 rounded-xl overflow-hidden border-none",
          th: `rounded-none! bg-[#F9FAFC] dark:bg-title border-b text-title text-sm font-semibold leading-5 tracking-tight border-b-dark-white dark:text-white dark:border-b-dark-border ${inter.className} ps-8!`,
          tr: "border-b-[.5px] border-[#D7DAE0] dark:border-dark-border text-[#5E6470] text-sm font-normal dark:text-dark-white leading-5 tracking-tight h-8.5 last:border-none",
          td: "ps-8!",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align={column.align}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => {
                const cellData = renderCell(item, columnKey);
                return (
                  <TableCell align={cellData.align}>{cellData.value}</TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex h-8.5 items-center justify-between border-t-[0.5px] border-t-[#D7DAE0] bg-[#F9FAFC] dark:bg-title ps-8 pe-[5%] dark:border-t-dark-border">
        <h3 className="text-xs leading-4 font-bold text-[#4358D1] dark:text-[#8394f3]">
          {dict.common.fields.total}
        </h3>
        <h3
          className={`text-xs leading-4 flex items-center gap-1.5 font-bold text-[#8394f3] ${inter.className}`}
        >
          {total.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
          <span className={`${sar.className}`}>A</span>
        </h3>
      </div>
    </div>
  );
};
