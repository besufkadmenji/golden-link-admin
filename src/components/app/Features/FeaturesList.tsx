import { ActivateFeature } from "@/components/app/Features/manage/ActivateFeature";
import { DeactivateFeature } from "@/components/app/Features/manage/DeactivateFeature";
import { useFeatures } from "@/components/app/Features/useFeatures";
import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { DeleteWarning, DeleteWarningType } from "../shared/DeleteWarning";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { useManageFeature } from "./manage/useManageFeature";
import { renderCell } from "./renderCell";
import { useLang } from "@/hooks/useLang";

export const FeaturesList = () => {
  const dict = useDict();
  const lang = useLang();
  const { features, pagination, isLoading } = useFeatures();
  const { deleteFeature, busy } = useManageFeature();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [activateFeature, setActivateFeature] =
    useQueryState("activateFeature");
  const [deactivateFeature, setDeactivateFeature] =
    useQueryState("deactivateFeature");

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.features_management.table_headers.id,
    },
    {
      key: "name",
      label: dict.features_management.table_headers.name,
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
  ) : !features || features.length === 0 ? (
    <NoData type={NoDataType.Features} />
  ) : (
    <>
      <AppTable
        label="Features"
        columns={columns}
        rows={features.map((feature) => ({
          key: feature.id.toString(),
          id: feature.id.toString(),
          name: lang === "ar" ? feature.nameAr : feature.name,
          status: feature.isActive.toString(),
          date: DateTimeHelpers.formatDate(feature.createdAt),
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
                setActivateFeature(row.key, { history: "push" });
              } else {
                setDeactivateFeature(row.key, { history: "push" });
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
            deleteFeature(Number(isDeleteWarningOpen));
          }
        }}
        busy={busy}
        type={DeleteWarningType.FEATURE}
      />
      <ActivateFeature />
      <DeactivateFeature />
    </>
  );
};
