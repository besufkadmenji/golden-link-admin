import SuccessCheckIcon from "@/assets/icons/app/check.success.svg";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";
import { PrimaryButton } from "../../shared/button/PrimaryButton";
import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { SubscriptionRequestDetail } from "@/types/subscription";
export const RejectReasonModal = ({
  request,
}: {
  request: SubscriptionRequestDetail;
}) => {
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  const dict = useDict();
  const router = useRouter();
  const [reason, setReason] = useState("");
  const { rejectRequest, busy } = useManageRequest();

  return (
    <Modal
      isOpen={!!showRejectModal}
      onClose={() => {
        router.push(`/subscribers/requests`);
      }}
      hideCloseButton
      size="md"
      isDismissable={true}
    >
      <ModalContent className="p-6">
        <div className="grid grid-cols-1 justify-items-center gap-6">
          <h1 className="text-center text-lg leading-6 font-bold text-[#1E1E1E]">
            {dict.reject_subscription_form.title}
          </h1>
          <FormAreaInput
            label={dict.reject_subscription_form.labels.reason}
            placeholder={dict.reject_subscription_form.placeholders.reason}
            value={reason}
            onChange={(value: string): void => {
              setReason(value);
            }}
          />
          <PrimaryButton
            className="w-full"
            isDisabled={!reason.trim() || busy}
            isLoading={busy}
            onPress={() => {
              rejectRequest(request.id, reason);
            }}
          >
            {dict.reject_subscription_form.buttons.send}
          </PrimaryButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
