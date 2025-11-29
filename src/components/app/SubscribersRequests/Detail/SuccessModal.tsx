import SuccessCheckIcon from "@/assets/icons/app/check.success.svg";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
export const SuccessModal = () => {
  const [showSuccess, setShowSuccess] = useQueryState("showSuccessMessage");
  const dict = useDict();
  const router = useRouter();

  return (
    <Modal
      isOpen={!!showSuccess}
      onClose={() => {
        router.push(`/subscribers/requests`);
      }}
      hideCloseButton
      size="md"
      isDismissable={true}
    >
      <ModalContent className="p-6">
        <div className="grid grid-cols-1 justify-items-center gap-6">
          <SuccessCheckIcon className="size-20" />
          <h1 className="text-center text-lg leading-6 font-bold text-[#1E1E1E]">
            {dict.messages.success.subscription_approved}
          </h1>
        </div>
      </ModalContent>
    </Modal>
  );
};
