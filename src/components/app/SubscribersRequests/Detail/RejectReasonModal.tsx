import { useManageRequest } from "@/components/app/SubscribersRequests/Detail/useManageRequest";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { PrimaryButton } from "../../shared/button/PrimaryButton";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";
import { usePermissions } from "@/hooks/useHasPermissions";

export const RejectReasonModal = ({ id }: { id: string }) => {
  const [showRejectModal, setShowRejectModal] =
    useQueryState("showRejectModal");
  const dict = useDict();
  const { hasPermission } = usePermissions();
  const canReject = hasPermission("subscriptions", "update");
  const [reason, setReason] = useState("");
  const { rejectRequest, busy } = useManageRequest();

  return (
    <Modal
      isOpen={!!showRejectModal && canReject}
      onClose={() => {
        setShowRejectModal(null);
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
            className="w-full"
          />
          <PrimaryButton
            className="w-full"
            isDisabled={!reason.trim() || busy || !canReject}
            isLoading={busy}
            onPress={async () => {
              const success = await rejectRequest(id, reason);
              if (success) {
                setShowRejectModal(null);
              }
            }}
          >
            {dict.reject_subscription_form.buttons.send}
          </PrimaryButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
