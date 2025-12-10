import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { PrimaryButton } from "./button/PrimaryButton";
export enum DeleteWarningType {
  ADMIN = "ADMIN",
  SUBSCRIBER = "SUBSCRIBER",
  CLIENT = "CLIENT",
}

export const DeleteWarning = ({
  isOpen,
  onClose,
  onConfirm,
  busy,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  busy: boolean;
  type: DeleteWarningType;
}) => {
  const dict = useDict();
  const title = {
    [DeleteWarningType.ADMIN]: dict.deleteConfirmation.deleteAdmin.title,
    [DeleteWarningType.SUBSCRIBER]:
      dict.deleteConfirmation.deleteSubscriber.title,
    [DeleteWarningType.CLIENT]: dict.deleteConfirmation.deleteClient.title,
  };
  const message = {
    [DeleteWarningType.ADMIN]: dict.deleteConfirmation.deleteAdmin.message,
    [DeleteWarningType.SUBSCRIBER]:
      dict.deleteConfirmation.deleteSubscriber.message,
    [DeleteWarningType.CLIENT]: dict.deleteConfirmation.deleteClient.message,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        <div className="grid grid-cols-1 justify-items-center gap-6 bg-white px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h3 className="text-xl leading-7 font-bold text-[#1E1E1E]">
              {title[type]}
            </h3>
            <p className="text-center leading-6 font-medium text-[#A5A7A5]">
              {message[type]}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <PrimaryButton
              className="bg-[#E7515A] font-bold text-white"
              onPress={onConfirm}
              isDisabled={busy}
              isLoading={busy}
            >
              {dict.deleteConfirmation.confirm}
            </PrimaryButton>
            <PrimaryButton
              className="bg-[#4285F41A] font-bold text-[#4285F4]"
              isDisabled={busy}
              onPress={onClose}
            >
              {dict.deleteConfirmation.cancel}
            </PrimaryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
