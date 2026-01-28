"use client";

import { useLatestJoinRequests } from "@/components/app/Dashboard/useDashboard";
import {
  DeleteWarning,
  DeleteWarningType,
} from "@/components/app/shared/DeleteWarning";
import { useDict } from "@/hooks/useDict";
import moment from "moment";
import { AppTable, ColumnType } from "../shared/tables/AppTable";
import { renderCell as renderCellFn } from "./renderCell";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useManageSubscriber } from "@/components/app/Subscribers/Detail/useManageSubscriber";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { RejectReasonModal } from "../SubscribersRequests/Detail/RejectReasonModal";

export const DashboardTable = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { joinRequests } = useLatestJoinRequests();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const { deleteSubscriber, busy } = useManageSubscriber();
  const {
    approveRequest,
    rejectRequest,
    busy: requestBusy,
  } = useManageRequest();
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  const request = joinRequests?.find(
    (req) => req.id === showRejectModal,
  );
  const columns: ColumnType[] = [
    {
      key: "id",
      label: dict.dashboard.table.headers.id,
    },
    {
      key: "name",
      label: dict.dashboard.table.headers.name,
    },
    {
      key: "organizationName",
      label: dict.dashboard.table.headers.organization_name,
    },
    {
      key: "email",
      label: dict.dashboard.table.headers.email,
    },
    {
      key: "phoneNumber",
      label: dict.dashboard.table.headers.phone_number,
    },
    {
      key: "type",
      label: dict.dashboard.table.headers.type,
      align: "center",
    },
    {
      key: "createdAt",
      label: dict.dashboard.table.headers.created_date,
      align: "center",
    },
    {
      key: "action",
      label: dict.dashboard.table.headers.actions,
      align: "center",
    },
  ];

  return !joinRequests ? (
    <AppLoading className="h-[90vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1 gap-2">
        <h2 className="text-title dark:text-dark-title text-lg leading-7 font-semibold tracking-[0.4px]">
          {dict.dashboard.latest_join_requests}
        </h2>
        <AppTable
          label="Dashboard"
          columns={columns}
          rows={joinRequests.map((entry) => ({
            key: entry.id.toString(),
            id: entry.order.toString(),
            name: entry.name,
            organizationName: entry.organizationName,
            email: entry.email,
            phoneNumber: entry.phone.number,
            type: entry.type,
            createdAt: moment(entry.requestedAt).format("MMM D, YYYY"),
          }))}
          renderCell={(row, column) =>
            renderCellFn(row, column, dict, {
              onView: () => {
                router.push(`/subscribers/requests/${row.key}`);
              },
              onApprove: () => {
                approveRequest(row.key);
              },
              onReject: () => {
                setShowRejectModal(row.key, { history: "push" });
              },
            })
          }
        />
        {request && <RejectReasonModal id={request.id} />}
      </div>
      <DeleteWarning
        isOpen={!!isDeleteWarningOpen}
        onClose={() => setIsDeleteWarningOpen(null)}
        onConfirm={() => {
          if (isDeleteWarningOpen) {
            deleteSubscriber(isDeleteWarningOpen);
          }
        }}
        busy={busy}
        type={DeleteWarningType.SUBSCRIBER}
      />
    </>
  );
};
