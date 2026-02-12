import { sar } from "@/assets/fonts/sar";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { Key } from "react";
import { twMerge } from "tailwind-merge";
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
export const renderCell = (row: RowType, column: Key) => {
  if (column === "id") {
    return <p className="text-[#FF7272]">{row[column as string]}</p>;
  } else if (column === "users" || column === "purchases") {
    return <p className="text-center">{row[column as string]}</p>;
  } else if (column === "sales" || column === "profit" || column === "vat") {
    return (
      <p className="text-sm font-medium text-[#2563EB]">
        {row[column as string]}{" "}
        <span className={twMerge("text-xs", sar.className)}>A</span>
      </p>
    );
  }
  return <p className="w-max">{row[column as string]}</p>;
};
