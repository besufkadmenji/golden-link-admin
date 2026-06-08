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
  return <p className="max-w-[300px] break-all line-clamp-4 text-ellipsis">{row[column as string]}</p>;
};
