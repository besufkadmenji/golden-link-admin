import { SubscriptionRequestDetail } from "@/types/subscription";
import moment from "moment";
import ApproveIcon from "@/assets/icons/app/approve.svg";
import RejectIcon from "@/assets/icons/app/reject.svg";
import { PrimaryButton } from "../../shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { useQueryState } from "nuqs";
import { usePermissions } from "@/hooks/useHasPermissions";
import { twMerge } from "tailwind-merge";

const statusStyles: Record<string, string> = {
  PENDING: "bg-[#FDF1E8] text-[#E46A11]",
  APPROVED: "bg-[#E7F4EE] text-[#1EB564]",
  REJECTED: "bg-[#FCEAEA] text-[#EA5455]",
};

export const RequestAction = ({
  request,
}: {
  request: SubscriptionRequestDetail;
}) => {
  const dict = useDict();
  const { hasPermission } = usePermissions();
  const canApprove = hasPermission("subscriptionRequest", "update");
  const canReject = hasPermission("subscriptionRequest", "delete");
  const { approveRequest, busy } = useManageRequest();
  const [, setShowRejectModal] = useQueryState("showRejectModal");
  const isPending = request.status === "PENDING";
  const statusLabel =
    dict.subscription_requests_page.status[
      request.status.toLowerCase() as keyof typeof dict.subscription_requests_page.status
    ] ?? request.status;

  return (
    <div className="flex items-center gap-4">
      <p>{moment(request.createdAt).format("DD/MM/YYYY h:mm a")}</p>
      {isPending ? (
        <div className="flex gap-4">
          {canApprove && (
            <PrimaryButton
              startContent={<ApproveIcon className="size-5" />}
              onPress={() => {
                approveRequest(request.id);
              }}
              isLoading={busy}
              isDisabled={busy}
            >
              {dict.subscription_request_detail_page.buttons.approve}
            </PrimaryButton>
          )}
          {canReject && (
            <PrimaryButton
              startContent={<RejectIcon className="size-5" />}
              className="bg-[#EA5455]"
              onPress={() => {
                setShowRejectModal("true");
              }}
            >
              {dict.subscription_request_detail_page.buttons.reject}
            </PrimaryButton>
          )}
        </div>
      ) : (
        <p
          className={twMerge(
            "grid h-8 items-center rounded-full px-4 text-sm font-medium",
            statusStyles[request.status] ?? statusStyles.PENDING,
          )}
        >
          {statusLabel}
        </p>
      )}
    </div>
  );
};
