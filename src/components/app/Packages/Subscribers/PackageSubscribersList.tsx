import { ActivateAdmin } from "@/components/app/Admins/manage/ActivateAdmin";
import { DeactivateAdmin } from "@/components/app/Admins/manage/DeactivateAdmin";
import { roleMap } from "@/components/app/Admins/renderCell";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { DeleteWarning, DeleteWarningType } from "../../shared/DeleteWarning";
import { AppTable, ColumnType, RowType } from "../../shared/tables/AppTable";
import { AppTableSkeleton } from "../../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useUsers } from "./useAdmins";
import { packageSubscribersList } from "./package_subscribers_list";

export const PackageSubscribersList = () => {
  const dict = useDict();
  const { users, pagination, isLoading } = useUsers();
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

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !users || users.length === 0 ? (
    <NoData type={NoDataType.Packages} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={packageSubscribersList.map((pkg) => ({
          key: pkg.id,
          id: pkg.id,
          username: pkg.username,
          phone: pkg.phoneNumber,

          price: pkg.packagePriceAtPurchase.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }),
          vat: pkg.addedTax.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          }),
          from: DateTimeHelpers.formatDate(pkg.subscriptionPeriodFrom),
          to: DateTimeHelpers.formatDate(pkg.subscriptionPeriodTo),
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
            // deleteAdmin(isDeleteWarningOpen);
          }
        }}
        busy={false}
        type={DeleteWarningType.ADMIN}
      />
      <ActivateAdmin />
      <DeactivateAdmin />
    </>
  );
};
