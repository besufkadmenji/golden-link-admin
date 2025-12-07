import { NoData, NoDataType } from "@/components/app/shared/NoData";

import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useSubscribers } from "./useSubscriber";
import { useManageSubscriber } from "@/components/app/Subscribers/Detail/useManageSubscriber";
import {
  DeleteWarning,
  DeleteWarningType,
} from "@/components/app/shared/DeleteWarning";
import { ActivateSubscriber } from "./ActivateSubscriber";
import { DeactivateSubscriber } from "./DeactivateSubscriber";

export const SubscribersList = () => {
  const dict = useDict();
  const { data, isLoading } = useSubscribers();
  const { deleteSubscriber, busy } = useManageSubscriber();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [activateSubscriber, setActivateSubscriber] =
    useQueryState("activateSubscriber");
  const [deactivateSubscriber, setDeactivateSubscriber] = useQueryState(
    "deactivateSubscriber",
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  // const { approveRequest, rejectRequest, busy } = useManageRequest();
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  const request = data?.subscribers.find((req) => req.id === showRejectModal);
  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "name",
      label: dict.subscribers_page.table_headers.name,
    },
    {
      key: "organizationName",
      label: dict.subscribers_page.table_headers.organization_name,
    },
    {
      key: "phone",
      label: dict.subscribers_page.table_headers.phone_number,
    },
    {
      key: "email",
      label: dict.subscribers_page.table_headers.email,
    },
    {
      key: "type",
      label: dict.subscribers_page.table_headers.type,
      align: "center",
    },
    {
      key: "date",
      label: dict.subscribers_page.table_headers.registration_date,
      align: "center",
    },
    {
      key: "status",
      label: dict.subscribers_page.table_headers.status,
      align: "center",
    },
    {
      key: "action",
      label: dict.subscribers_page.table_headers.actions,
      align: "center",
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !data || data.subscribers.length === 0 ? (
    <NoData type={NoDataType.Subscribers} />
  ) : (
    <>
      <AppTable
        label="Subscribers"
        columns={columns}
        rows={data.subscribers.map((subscriber) => ({
          key: subscriber.id,
          name: subscriber.fullName,
          organizationName: subscriber.organizationName,
          phone: subscriber.phoneNumber,
          email: subscriber.email,
          type: subscriber.roleName,
          date: DateTimeHelpers.formatDate(subscriber.createdAt),
          status: subscriber.status,
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`${pathname}/${row.key}`);
            },
            onDelete: () => {
              setIsDeleteWarningOpen(row.key as string, { history: "push" });
            },
            onActivate: (value: boolean) => {
              if (value) {
                setActivateSubscriber(row.key as string, { history: "push" });
              } else {
                setDeactivateSubscriber(row.key as string, { history: "push" });
              }
            },
          })
        }
        pagination={{
          page: data.pagination.currentPage,
          total: data.pagination.totalPages,
          onChange: (p) => {
            setPage(p, { history: "push" });
          },
        }}
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
      <ActivateSubscriber />
      <DeactivateSubscriber />
    </>
  );
};
