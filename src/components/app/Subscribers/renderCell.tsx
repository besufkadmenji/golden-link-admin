import { AppSwitch } from "@/components/app/shared/AppSwitch";
import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import {
  getSubscriberRoleLabel,
  isActiveStatus,
  isDeletedStatus,
  isSupplierRole,
  isWarehouseOwnerRole,
  typeMap,
} from "@/utils/subscriber.helpers";
import { Key } from "react";
import { twMerge } from "tailwind-merge";

export { typeMap };

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onActivate: (value: boolean) => void;
  },
) => {
  if (column === "action") {
    return (
      <ActionsCell
        onView={action.onView}
        onEdit={action.onEdit}
        onDelete={isDeletedStatus(row.status) ? undefined : action.onDelete}
      />
    );
  } else if (column === "name") {
    return (
      <div className="grid w-max grid-cols-1 gap-1">
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
    return (
      <div className="grid justify-items-center">
        <p
          className={twMerge(
            "grid h-6 w-max items-center rounded-full px-3",
            isWarehouseOwnerRole(row.type) &&
              "text-green-main dark:text-green-main bg-[#E7F4EE] dark:bg-[#E7F4EE]",
            isSupplierRole(row.type) &&
              "bg-[#FDF1E8] text-[#E46A11] dark:bg-[#FDF1E8] dark:text-[#E46A11]",
          )}
        >
          {getSubscriberRoleLabel(dict, row.type)}
        </p>
      </div>
    );
  } else if (column === "status") {
    return (
      <AppSwitch
        isSelected={isActiveStatus(row.status)}
        onValueChange={(checked) => {
          action.onActivate(checked);
        }}
        isDisabled={isDeletedStatus(row.status)}
      />
    );
  }
  return <p className="break-all max-w-[200px]">{row[column as string]}</p>;
};
