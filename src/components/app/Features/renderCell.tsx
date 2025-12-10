import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";
import { AppSwitch } from "../shared/AppSwitch";

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
  if (column === "id") {
    return (
      <p className="text-sm leading-8 font-medium tracking-tight text-[#FF7272] dark:text-[#FF7272]">
        {row.id}
      </p>
    );
  } else if (column === "action") {
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
        isSelected={row.status === "true"}
        onValueChange={(checked) => {
          action.onActivate(checked);
        }}
      />
    );
  }
  return row[column as string];
};
