import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useRequests } from "./useRequest";
import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { SuccessModal } from "@/components/app/SubscribersRequests/Detail/SuccessModal";
import { RejectReasonModal } from "@/components/app/SubscribersRequests/Detail/RejectReasonModal";

export const RequestsList = () => {
  const dict = useDict();
  const { data, isLoading } = useRequests();
  // const { deleteProduct, busy } = useManageProduct();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { approveRequest, rejectRequest, busy } = useManageRequest();
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  const request = data?.subscriptionRequests.find(
    (req) => req.id === showRejectModal,
  );
  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnType[] = [
    {
      key: "name",
      label: dict.subscription_requests_page.table_headers.name,
    },
    {
      key: "organizationName",
      label: dict.subscription_requests_page.table_headers.organization_name,
    },
    {
      key: "phone",
      label: dict.subscription_requests_page.table_headers.phone_number,
    },
    {
      key: "email",
      label: dict.subscription_requests_page.table_headers.email,
    },
    {
      key: "type",
      label: dict.subscription_requests_page.table_headers.type,
      align: "center",
    },
    {
      key: "date",
      label: dict.subscription_requests_page.table_headers.request_date,
      align: "center",
    },
    {
      key: "action",
      label: dict.subscription_requests_page.table_headers.actions,
      align: "center",
    },
  ];

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !data || data.subscriptionRequests.length === 0 ? (
    <NoData type={NoDataType.SubscriberRequests} />
  ) : (
    <>
      <AppTable
        label="Requests"
        columns={columns}
        rows={data.subscriptionRequests.map((request) => ({
          key: request.id,
          name: request.fullName,
          organizationName: request.organizationName,
          phone: request.phoneNumber,
          email: request.email,
          type: request.type,
          date: DateTimeHelpers.formatDate(request.createdAt),
        }))}
        renderCell={(row: RowType, column: Key): ReactNode =>
          renderCell(row, column, dict, {
            onView: () => {
              router.push(`${pathname}/${row.key}`);
            },
            onApprove: () => {
              approveRequest(row.key);
            },
            onReject: () => {
              setShowRejectModal(row.key, { history: "push" });
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
      <SuccessModal />
      {request && <RejectReasonModal id={request.id} />}
    </>
  );
};
