import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import SuccessIcon from "@/assets/icons/app/check.success.svg";
export const SuccessMessage = () => {
  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");
  const router = useRouter();
  const dict = useDict();
  return (
    <Modal
      isOpen={!!showSuccess}
      onClose={() => {
        router.push("/admins");
      }}
      hideCloseButton
    >
      <ModalContent>
        <div className="grid grid-cols-1 justify-items-center gap-6 p-6">
          <SuccessIcon className="size-20" />
          <p className="text-lg leading-6 font-bold text-[#1E1E1E]">
            {dict.system_managers_page.messages.createSuccess}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};
