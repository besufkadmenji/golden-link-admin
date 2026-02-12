import { ActivateAdmin } from "@/components/app/Admins/manage/ActivateAdmin";
import { DeactivateAdmin } from "@/components/app/Admins/manage/DeactivateAdmin";
import { roleMap } from "@/components/app/Admins/renderCell";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { DeleteWarning, DeleteWarningType } from "../shared/DeleteWarning";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { useManageAdmin } from "./manage/useManageAdmin";
import { renderCell } from "./renderCell";
import { useUsers } from "./useAdmins";
import { packagesList } from "./packages_list";

export const PackagesList = () => {
  const dict = useDict();
  const { users, pagination, isLoading } = useUsers();
  const { deleteAdmin, busy } = useManageAdmin();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [activateAdmin, setActivateAdmin] = useQueryState("activateAdmin");
  const [deactivateAdmin, setDeactivateAdmin] =
    useQueryState("deactivateAdmin");

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.packages.table_headers.number,
    },
    {
      key: "name",
      label: dict.packages.table_headers.package_name,
    },
    {
      key: "duration",
      label: dict.packages.table_headers.package_duration,
    },
    {
      key: "price",
      label: dict.packages.table_headers.package_price,
    },
    {
      key: "users",
      label: dict.packages.table_headers.number_of_users,
      align: "center",
    },

    {
      key: "date",
      label: dict.packages.table_headers.creation_date,
    },
    {
      key: "status",
      label: dict.packages.table_headers.status,
    },
    {
      key: "action",
      label: dict.packages.table_headers.actions,
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !users || users.length === 0 ? (
    <NoData type={NoDataType.Packages} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={packagesList.map((pkg) => ({
          key: pkg.id,
          id: pkg.id,
          name: pkg.name,
          duration: pkg.duration,
          price: pkg.price.toLocaleString("en-US", {
           maximumFractionDigits: 2,
          }),
          users: pkg.numberOfUsers.toString(),
          status: pkg.status,
          date: DateTimeHelpers.formatDate(pkg.createdAt),
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              // router.push(`${pathname}/${row.key}`);
            },
            onEdit: () => {
              // router.push(`${pathname}/${row.key}/edit`);
            },
            onDelete: () => {
              // setIsDeleteWarningOpen(row.key, { history: "push" });
            },
            onActivate: (value: boolean) => {
              // if (value) {
              //   setActivateAdmin(row.key, { history: "push" });
              // } else {
              //   setDeactivateAdmin(row.key, { history: "push" });
              // }
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
      <ActivateAdmin />
      <DeactivateAdmin />
    </>
  );
};
