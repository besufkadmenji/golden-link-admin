import { ActivateClient } from "@/components/app/Clients/manage/ActivateClient";
import { DeactivateClient } from "@/components/app/Clients/manage/DeactivateClient";
import { useClients } from "@/components/app/Clients/useClients";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { DeleteWarning, DeleteWarningType } from "../shared/DeleteWarning";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { useManageClient } from "./manage/useManageClient";
import { renderCell } from "./renderCell";

export const ClientsList = () => {
  const dict = useDict();
  const { clients, pagination, isLoading } = useClients();
  const { deleteClient, busy } = useManageClient();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [activateClient, setActivateClient] = useQueryState("activateClient");
  const [deactivateClient, setDeactivateClient] =
    useQueryState("deactivateClient");

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.clients_management.table_headers.id,
    },
    {
      key: "name",
      label: dict.clients_management.table_headers.name,
    },
    {
      key: "date",
      label: dict.clients_management.table_headers.created_date,
    },
    {
      key: "status",
      label: dict.system_managers_page.table_headers.status,
    },
    {
      key: "action",
      label: dict.system_managers_page.table_headers.actions,
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !clients || clients.length === 0 ? (
    <NoData type={NoDataType.Clients} />
  ) : (
    <>
      <AppTable
        label="Clients"
        columns={columns}
        rows={clients.map((client) => ({
          key: client.id.toString(),
          id: client.id.toString(),
          name: client.name,
          status: client.isActive.toString(),
          date: DateTimeHelpers.formatDate(client.createdAt),
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
                setActivateClient(row.key, { history: "push" });
              } else {
                setDeactivateClient(row.key, { history: "push" });
              }
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
            deleteClient(Number(isDeleteWarningOpen));
          }
        }}
        busy={busy}
        type={DeleteWarningType.CLIENT}
      />
      <ActivateClient />
      <DeactivateClient />
    </>
  );
};
