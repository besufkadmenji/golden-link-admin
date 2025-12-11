import { Key, ReactNode } from "react";
import { RowType } from "../shared/tables/AppTable";
import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { twMerge } from "tailwind-merge";
import Dictionary from "@/config/i18n/types";

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
): ReactNode => {
  if (column === "action") {
    return <ActionsCell onView={() => {}} onDelete={() => {}} />;
  }

  if (column === "status") {
    const statusMap: Record<string, { label: string; color: string }> = {
      pending: {
        label: dict.dashboard.status.pending,
        color: "bg-[#FDF1E8] text-[#E46A11]",
      },
      confirmed: {
        label: dict.dashboard.status.confirmed,
        color: "bg-[#E7F4EE] text-[#1EB564]",
      },
    };
    const statusEntry = statusMap[row.status] || statusMap.pending;
    return (
      <div className="grid justify-items-center">
        <p
          className={twMerge(
            "grid h-6 items-center rounded-full px-3 text-xs font-medium",
            statusEntry.color,
          )}
        >
          {statusEntry.label}
        </p>
      </div>
    );
  }

  if (column === "id") {
    return (
      <p className="dark:text-[#FF7272]text-xs leading-8 tracking-tight text-[#FF7272]">
        {row.id}
      </p>
    );
  }

  return row[column as string];
};
