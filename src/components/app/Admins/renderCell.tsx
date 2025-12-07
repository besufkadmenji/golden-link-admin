import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";
import { twMerge } from "tailwind-merge";
import { AppSwitch } from "../shared/AppSwitch";
export const statusMap = (
  dict: Dictionary,
): {
  [key: string]: string;
} => ({
  ACTIVE: dict.common.statuses.ACTIVE,
  INACTIVE: dict.common.statuses.INACTIVE,
  SUSPENDED: dict.common.statuses.SUSPENDED,
  PENDING_APPROVAL: dict.common.statuses.PENDING_APPROVAL,
});

export const roleMap = (
  dict: Dictionary,
): {
  [key: string]: string;
} => ({
  ADMINISTRATOR: dict.common.roles.ADMINISTRATOR,
  SUPER_ADMIN: dict.common.roles.SUPER_ADMIN,
  CUSTOM: dict.common.roles.CUSTOM,
});
export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onActivate: (value: boolean) => void;
  },
) => {
  if (column === "action") {
    return (
      <ActionsCell
        onView={action.onView}
        onEdit={action.onEdit}
        onDelete={action.onDelete}
      />
    );
  } else if (column === "status") {
    console.log("row status:", row.status);
    return (
      <AppSwitch
        isSelected={row.status === "ACTIVE"}
        onValueChange={(checked) => {
          action.onActivate(checked);
        }}
      />
    );
  }
  return row[column as string];
};
