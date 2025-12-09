import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";
import { twMerge } from "tailwind-merge";
export const statusMap = (
  dict: Dictionary,
): {
  [key: string]: string;
} => ({
  NOT_REPLIED: dict.common.statuses.NOT_REPLIED,
  REPLIED: dict.common.statuses.REPLIED,
});

export const typeMap = (
  dict: Dictionary,
): {
  [key: string]: string;
} => ({
  REQUEST: dict.common.message_types.REQUEST,
  SUGGESTION: dict.common.message_types.SUGGESTION,
  INQUIRY: dict.common.message_types.INQUIRY,
  COMPLAINT: dict.common.message_types.COMPLAINT,
  OTHER: dict.common.message_types.OTHER,
});
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
  } else if (column === "type") {
    return (
      <p
        className={twMerge(
          "grid h-6 items-center justify-items-center justify-self-start rounded-lg px-3",
          ["SUGGESTION"].includes(row.type) &&
            "bg-[#FDF1E8] text-[#E46A11] dark:bg-[#FDF1E8] dark:text-[#E46A11]",
          ["REQUEST"].includes(row.type) &&
            "bg-[#1EB56414] text-[#1EB564] dark:bg-[#1EB56414] dark:text-[#1EB564]",
          ["INQUIRY"].includes(row.type) &&
            "bg-[#2563EB14] text-[#2563EB] dark:bg-[#2563EB14] dark:text-[#2563EB]",
          ["INQUIRY"].includes(row.type) &&
            "bg-[#FEEDEC] text-[#F04438] dark:bg-[#FEEDEC] dark:text-[#F04438]",
          ["OTHER"].includes(row.type) &&
            "text-title dark:text-title bg-[#F8F7FC] dark:bg-[#F8F7FC]",
        )}
      >
        {typeMap(dict)[row.type as keyof typeof typeMap]}
      </p>
    );
  } else if (column === "status") {
    return (
      <p
        className={twMerge(
          "grid h-6 items-center justify-items-center justify-self-start rounded-lg px-3",
          ["NOT_REPLIED"].includes(row.status) &&
            "bg-[#FDF1E8] text-[#E46A11] dark:bg-[#FDF1E8] dark:text-[#E46A11]",
          ["REPLIED"].includes(row.status) &&
            "bg-[#1EB56414] text-[#1EB564] dark:bg-[#1EB56414] dark:text-[#1EB564]",
        )}
      >
        {statusMap(dict)[row.status as keyof typeof statusMap]}
      </p>
    );
  }
  return row[column as string];
};
