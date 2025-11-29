import ApproveIcon from "@/assets/icons/app/approve.svg";
import RejectIcon from "@/assets/icons/app/reject.svg";
import ViewIcon from "@/assets/icons/app/view.svg";
import { ActionCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";
import { twMerge } from "tailwind-merge";
export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onApprove: () => void;
    onReject: () => void;
  },
) => {
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
  } else if (column === "name") {
    return (
      <div className="grid grid-cols-1 gap-1">
        <p className="text-title text-xs leading-4 tracking-tight dark:text-white">
          {row.name}
        </p>
        <p className="text-subTitle text-xs leading-4 tracking-tight dark:text-white/80">
          {row.description}
        </p>
      </div>
    );
  } else if (column === "sku") {
    return (
      <p className="text-app-primary dark:text-app-primary text-xs leading-8 tracking-tight">
        {row.sku}
      </p>
    );
  } else if (column === "baseline") {
    return (
      <p className="text-xs leading-8 tracking-tight text-[#1A938B] dark:text-[#1A938B]">
        {row.baseline}
      </p>
    );
  } else if (column === "type") {
    const typeMap = {
      WAREHOUSE_OWNER: dict.common.warehouseOwner,
      SUPPLIER: dict.common.supplier,
    };
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
          {typeMap[row.type as keyof typeof typeMap] ?? row.type}
        </p>
      </div>
    );
  }
  return row[column as string];
};
