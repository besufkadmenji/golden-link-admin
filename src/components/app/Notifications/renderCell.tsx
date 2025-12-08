import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
  },
) => {
  if (column === "action") {
    return <ActionsCell onView={action.onView} />;
  }
  return row[column as string];
};
