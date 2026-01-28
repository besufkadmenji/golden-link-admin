import {
  ActionsCell,
  ActionCell,
} from "@/components/app/shared/tables/ActionsCell";
import { typeMap } from "@/components/app/Subscribers/renderCell";
import Dictionary from "@/config/i18n/types";
import { Key, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RowType } from "../shared/tables/AppTable";
import ApproveIcon from "@/assets/icons/app/approve.svg";
import RejectIcon from "@/assets/icons/app/reject.svg";
import ViewIcon from "@/assets/icons/app/view.svg";

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onApprove: () => void;
    onReject: () => void;
  },
): ReactNode => {
  if (column === "action") {
    return (
      <div className="flex items-center justify-center gap-2">
        <ActionCell
          icon={<ApproveIcon className="size-5 text-[#1EB564]" />}
          onClick={action.onApprove}
        />
        <ActionCell
          icon={<RejectIcon className="size-5 text-[#EA5455]" />}
          onClick={action.onReject}
        />
        <ActionCell
          icon={
            <ViewIcon className="text-subTitle dark:text-dark-dashboard-title size-5" />
          }
          onClick={action.onView}
        />
      </div>
    );
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
