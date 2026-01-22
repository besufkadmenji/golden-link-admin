import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { typeMap } from "@/components/app/Subscribers/renderCell";
import Dictionary from "@/config/i18n/types";
import { Key, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RowType } from "../shared/tables/AppTable";

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onDelete: () => void;
  },
): ReactNode => {
  if (column === "action") {
    return <ActionsCell onView={action.onView} onDelete={action.onDelete} />;
  } else if (column === "type") {
    return (
      <div className="grid justify-items-center">
        <p
          className={twMerge(
            "grid h-6 items-center rounded-full px-3",
            row.type === "WAREHOUSE_OWNER" &&
              "text-green-main dark:text-green-main bg-[#E7F4EE] dark:bg-[#E7F4EE]",
            row.type === "SUPPLIER" &&
              "bg-[#FDF1E8] text-[#E46A11] dark:bg-[#FDF1E8] dark:text-[#E46A11]",
          )}
        >
          {typeMap(dict)[row.type as keyof typeof typeMap] ?? row.type}
        </p>
      </div>
    );
  } else if (column === "status") {
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
