import { useManageSubscriber } from "@/components/app/Subscribers/Detail/useManageSubscriber";
import { useSubscribers } from "@/components/app/Subscribers/useSubscriber";
import {
  DeleteWarning,
  DeleteWarningType,
} from "@/components/app/shared/DeleteWarning";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { usePermissions } from "@/hooks/useHasPermissions";
import { useDict } from "@/hooks/useDict";
import { isDeletedStatus } from "@/utils/subscriber.helpers";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../../shared/tables/AppTable";
import { AppTableSkeleton } from "../../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";

const formatAmount = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") return "-";
  const amount = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(amount)) return "-";

  return amount.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

export const PackageSubscribersList = () => {
  const dict = useDict();
  const router = useRouter();
  const { data, isLoading, isFetching } = useSubscribers();
  const { deleteSubscriber, busy } = useManageSubscriber();
  const { hasPermission } = usePermissions();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );

  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.packages.subscribers.table_headers.number,
    },
    {
      key: "username",
      label: dict.packages.subscribers.table_headers.username,
    },
    {
      key: "phone",
      label: dict.packages.subscribers.table_headers.phone_number,
    },
    {
      key: "price",
      label: dict.packages.subscribers.table_headers.package_price_at_purchase,
    },
    {
      key: "vat",
      label: dict.packages.subscribers.table_headers.added_tax,
      align: "center",
    },
    {
      key: "from",
      label: dict.packages.subscribers.table_headers.subscription_period_from,
    },
    {
      key: "to",
      label: dict.packages.subscribers.table_headers.subscription_period_to,
    },
    {
      key: "action",
      label: dict.packages.table_headers.actions,
    },
  ];

  const subscribers = data?.subscribers ?? [];
  const pagination = data?.pagination;
  const showSkeleton = isLoading || (isFetching && subscribers.length === 0);

  return showSkeleton ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : subscribers.length === 0 ? (
    <NoData type={NoDataType.Subscribers} />
  ) : (
    <>
      <AppTable
        label="PackageSubscribers"
        columns={columns}
        rows={subscribers.map((subscriber, index) => ({
          key: subscriber.id,
          id: String(
            (pagination?.itemsPerPage ?? 20) *
              ((pagination?.currentPage ?? 1) - 1) +
              index +
              1,
          ),
          username: subscriber.fullName,
          phone: subscriber.phoneNumber,
          price: formatAmount(subscriber.subscription?.subscriptionPrice),
          vat: formatAmount(subscriber.subscription?.vatAmount),
          from: subscriber.subscription?.startDate
            ? DateTimeHelpers.formatDate(subscriber.subscription.startDate)
            : "-",
          to: subscriber.subscription?.endDate
            ? DateTimeHelpers.formatDate(subscriber.subscription.endDate)
            : "-",
          status: subscriber.status,
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`/subscribers/${row.key}`);
            },
            onDelete:
              hasPermission("subscriber", "delete") &&
              !isDeletedStatus(row.status)
                ? () => {
                    setIsDeleteWarningOpen(row.key as string, {
                      history: "push",
                    });
                  }
                : undefined,
          })
        }
        pagination={{
          page: pagination?.currentPage ?? 1,
          total: pagination?.totalPages ?? 0,
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
            deleteSubscriber(
              isDeleteWarningOpen,
              undefined,
              "/packages/subscribers",
            );
          }
        }}
        busy={busy}
        type={DeleteWarningType.SUBSCRIBER}
      />
    </>
  );
};
