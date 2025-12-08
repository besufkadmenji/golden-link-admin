import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useNotifications } from "./useNotifications";

export const NotificationsList = () => {
  const dict = useDict();
  const { notifications, pagination, isLoading } = useNotifications();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "title",
      label: dict.notifications_page.table_headers.notification_title,
    },
    {
      key: "content",
      label: dict.notifications_page.table_headers.notification_content,
    },
    {
      key: "date",
      label: dict.system_managers_page.table_headers.created_date,
    },
    {
      key: "action",
      label: dict.system_managers_page.table_headers.actions,
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !notifications || notifications.length === 0 ? (
    <NoData type={NoDataType.Notifications} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={notifications.map((notification) => ({
          key: notification.id,
          title: notification.title,
          content: notification.content,
          date: DateTimeHelpers.formatDate(notification.sentAt),
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`${pathname}/${row.key}`);
            },
          })
        }
        pagination={{
          page: pagination?.currentPage ?? 0,
          total: pagination?.totalPages ?? 0,
          onChange: (p) => {
            setPage(p, { history: "push" });
          },
        }}
      />
    </>
  );
};
