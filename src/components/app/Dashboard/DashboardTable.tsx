"use client";

import { useDict } from "@/hooks/useDict";
import { AppTable, ColumnType } from "../shared/tables/AppTable";
import { mockData } from "./mockData";
import { renderCell as renderCellFn } from "./renderCell";

export const DashboardTable = () => {
  const dict = useDict();

  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.dashboard.table.headers.id,
    },
    {
      key: "name",
      label: dict.dashboard.table.headers.name,
    },
    {
      key: "organizationName",
      label: dict.dashboard.table.headers.organization_name,
    },
    {
      key: "commercialRegistrationNumber",
      label: dict.dashboard.table.headers.commercial_registration_number,
    },
    {
      key: "email",
      label: dict.dashboard.table.headers.email,
    },
    {
      key: "phoneNumber",
      label: dict.dashboard.table.headers.phone_number,
    },
    {
      key: "status",
      label: dict.dashboard.table.headers.status,
      align: "center",
    },
    {
      key: "createdAt",
      label: dict.dashboard.table.headers.created_date,
      align: "center",
    },
    {
      key: "action",
      label: dict.dashboard.table.headers.actions,
      align: "center",
    },
  ];

  return (
    <AppTable
      label="Dashboard"
      columns={columns}
      rows={mockData.map((entry) => ({
        key: entry.id.toString(),
        id: entry.id.toString(),
        name: entry.name,
        organizationName: entry.organizationName,
        commercialRegistrationNumber: entry.commercialRegistrationNumber,
        email: entry.email,
        phoneNumber: entry.phoneNumber,
        status: entry.status,
        createdAt: entry.createdAt,
      }))}
      renderCell={(row, column) => renderCellFn(row, column, dict)}
    />
  );
};
