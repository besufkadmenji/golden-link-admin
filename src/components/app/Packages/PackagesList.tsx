import { ActivatePackage } from "@/components/app/Packages/manage/ActivatePackage";
import { DeactivatePackage } from "@/components/app/Packages/manage/DeactivatePackage";
import { roleMap } from "@/components/app/Packages/renderCell";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { DeleteWarning, DeleteWarningType } from "../shared/DeleteWarning";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { useManagePackage } from "./manage/useManagePackage";
import { renderCell } from "./renderCell";
import { usePackages } from "./usePackages";
import { packagesList } from "./packages_list";

export const PackagesList = () => {
  const dict = useDict();
  const { packages, pagination, isLoading } = usePackages();
  const { deletePackage, togglePackageStatus, busy } = useManagePackage();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [activatePackage, setActivatePackage] =
    useQueryState("activatePackage");
  const [deactivatePackage, setDeactivatePackage] =
    useQueryState("deactivatePackage");

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
  ) : !packages || packages.length === 0 ? (
    <NoData type={NoDataType.Packages} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={packages.map((pkg) => ({
          key: pkg.id.toString(),
          id: pkg.id.toString(),
          name: pkg.packageName,
          duration: pkg.packageDuration.toString(),
          price: pkg.packagePrice,
          users: pkg.maxUsers?.toString() ?? "-",
          status: pkg.status,
          date: DateTimeHelpers.formatDate(pkg.createdAt),
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
            onActivate: (value: boolean) => {
              if (value) {
                togglePackageStatus(row.key, "ACTIVE");
              } else {
                togglePackageStatus(row.key, "INACTIVE");
              }
            },
          })
        }
        pagination={{
          page: pagination?.page ?? 0,
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
            deletePackage(isDeleteWarningOpen);
          }
        }}
        busy={busy}
        type={DeleteWarningType.PACKAGE}
      />
      <ActivatePackage />
      <DeactivatePackage />
    </>
  );
};
