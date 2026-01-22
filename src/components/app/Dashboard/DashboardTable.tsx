"use client";

import { useLatestJoinRequests } from "@/components/app/Dashboard/useDashboard";
import {
  DeleteWarning,
  DeleteWarningType,
} from "@/components/app/shared/DeleteWarning";
import { useDict } from "@/hooks/useDict";
import moment from "moment";
import { AppTable, ColumnType } from "../shared/tables/AppTable";
import { renderCell as renderCellFn } from "./renderCell";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useManageSubscriber } from "@/components/app/Subscribers/Detail/useManageSubscriber";
import { AppLoading } from "@/components/app/shared/AppLoading";

export const DashboardTable = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { joinRequests } = useLatestJoinRequests();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const { deleteSubscriber, busy } = useManageSubscriber();

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
      key: "email",
      label: dict.dashboard.table.headers.email,
    },
    {
      key: "phoneNumber",
      label: dict.dashboard.table.headers.phone_number,
    },
    {
      key: "type",
      label: dict.dashboard.table.headers.type,
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

  return !joinRequests ? (
    <AppLoading className="h-[90vh]" />
  ) : (
    <>
      <AppTable
        label="Dashboard"
        columns={columns}
        rows={joinRequests.map((entry) => ({
          key: entry.id.toString(),
          id: entry.order.toString(),
          name: entry.name,
          organizationName: entry.organizationName,
          email: entry.email,
          phoneNumber: entry.phone.number,
          type: entry.type,
          createdAt: moment(entry.requestedAt).format("MMM D, YYYY"),
        }))}
        renderCell={(row, column) =>
          renderCellFn(row, column, dict, {
            onView: () => {
              router.push(`/subscribers/${row.key}`);
            },
            onDelete: () => {
              setIsDeleteWarningOpen(row.key as string, { history: "push" });
            },
          })
        }
      />
      <DeleteWarning
        isOpen={!!isDeleteWarningOpen}
        onClose={() => setIsDeleteWarningOpen(null)}
        onConfirm={() => {
          if (isDeleteWarningOpen) {
            deleteSubscriber(isDeleteWarningOpen);
          }
        }}
        busy={busy}
        type={DeleteWarningType.SUBSCRIBER}
      />
    </>
  );
};
