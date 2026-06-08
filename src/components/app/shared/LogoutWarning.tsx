import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { PrimaryButton } from "./button/PrimaryButton";

export const LogoutWarning = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const dict = useDict();

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
      <ModalContent>
        <div className="dark:bg-dark-app-background grid grid-cols-1 justify-items-center gap-6 bg-white px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h3 className="text-xl leading-7 font-bold text-[#1E1E1E] dark:text-white">
              {dict.logout_confirmation.title}
            </h3>
            <p className="text-center leading-6 font-medium text-[#A5A7A5] dark:text-[#A5A7A5]">
              {dict.logout_confirmation.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <PrimaryButton
              className="bg-[#4285F41A] font-bold text-[#4285F4]"
              onPress={onClose}
            >
              {dict.logout_confirmation.cancel}
            </PrimaryButton>
            <PrimaryButton
              className="bg-[#E7515A] font-bold text-white"
              onPress={onConfirm}
            >
              {dict.logout_confirmation.confirm}
            </PrimaryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
