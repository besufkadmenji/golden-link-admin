import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useUsers } from "./useAdmins";
import { statusMap } from "@/components/app/Admins/renderCell";
import { DeleteWarning, DeleteWarningType } from "../shared/DeleteWarning";
import { useManageAdmin } from "./manage/useManageAdmin";

export const AdminsList = () => {
  const dict = useDict();
  const { users, pagination, isLoading } = useUsers();
  const { deleteAdmin, busy } = useManageAdmin();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "name",
      label: dict.system_managers_page.table_headers.name,
    },
    {
      key: "phone",
      label: dict.system_managers_page.table_headers.phone_number,
    },
    {
      key: "email",
      label: dict.system_managers_page.table_headers.email,
    },
    {
      key: "role",
      label: dict.system_managers_page.table_headers.role,
    },
    {
      key: "status",
      label: dict.system_managers_page.table_headers.status,
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
  ) : !users || users.length === 0 ? (
    <NoData type={NoDataType.Admins} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={users.map((user) => ({
          key: user.id,
          name: user.fullName,
          phone: user.phoneNumber,
          email: user.email,
          role: user.permissionType ?? "-",
          status: statusMap(dict)[user.status],
          date: DateTimeHelpers.formatDate(user.createdAt),
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`${pathname}/${row.key}`);
            },
            onEdit: () => {
              router.push(`${pathname}/${row.key}/edit`);
            },
            onDelete: () => {
              setIsDeleteWarningOpen(row.key, { history: "push" });
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
      <DeleteWarning
        isOpen={!!isDeleteWarningOpen}
        onClose={() => setIsDeleteWarningOpen(null)}
        onConfirm={() => {
          if (isDeleteWarningOpen) {
            deleteAdmin(isDeleteWarningOpen);
          }
        }}
        busy={busy}
        type={DeleteWarningType.ADMIN}
      />
    </>
  );
};
