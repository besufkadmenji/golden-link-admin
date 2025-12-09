import { useGetMessages } from "@/components/app/ContactUs/useMessage";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";

export const MessagesList = () => {
  const dict = useDict();
  const { data, isLoading } = useGetMessages();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "name",
      label: dict.contact_messages_page.table_headers.customer_name,
    },
    {
      key: "phone",
      label: dict.contact_messages_page.table_headers.phone_number,
    },
    {
      key: "email",
      label: dict.contact_messages_page.table_headers.email,
    },
    {
      key: "type",
      label: dict.contact_messages_page.table_headers.message_type,
    },
    {
      key: "status",
      label: dict.contact_messages_page.table_headers.status,
    },
    {
      key: "date",
      label: dict.contact_messages_page.table_headers.message_date,
    },
    {
      key: "action",
      label: dict.contact_messages_page.table_headers.action,
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !data || data.messages.length === 0 ? (
    <NoData type={NoDataType.Messages} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={data.messages.map((message) => ({
          key: message.id,
          name: message.customerName,
          phone: message.mobileNumber,
          email: message.email,
          date: DateTimeHelpers.formatDate(message.createdAt),
          type: message.messageType,
          status: message.status,
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`${pathname}/${row.key}`);
            },
          })
        }
        pagination={{
          page: data.pagination?.currentPage ?? 0,
          total: data.pagination?.totalPages ?? 0,
          onChange: (p) => {
            setPage(p, { history: "push" });
          },
        }}
      />
    </>
  );
};
