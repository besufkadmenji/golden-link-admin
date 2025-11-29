import { SubscriptionRequestDetail } from "@/types/subscription";
import moment from "moment";
import ApproveIcon from "@/assets/icons/app/approve.svg";
import RejectIcon from "@/assets/icons/app/reject.svg";
import { PrimaryButton } from "../../shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { useQueryState } from "nuqs";
export const RequestAction = ({
  request,
}: {
  request: SubscriptionRequestDetail;
}) => {
  const dict = useDict();
  const { approveRequest, busy } = useManageRequest();
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  return (
    <div className="flex items-center gap-4">
      <p>{moment(request.createdAt).format("DD/MM/YYYY h:mm a")}</p>
      <div className="flex gap-4">
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
        <PrimaryButton
          startContent={<RejectIcon className="size-5" />}
          className="bg-[#EA5455]"
          onPress={() => {
            setShowRejectModal("true");
          }}
        >
          {dict.subscription_request_detail_page.buttons.reject}
        </PrimaryButton>
      </div>
    </div>
  );
};
