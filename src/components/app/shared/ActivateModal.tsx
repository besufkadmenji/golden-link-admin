import { useDict } from "@/hooks/useDict";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";

interface ActivateModalProps {
  queryParamName: string;
  onConfirm: (id: string) => void;
  busy: boolean;
  title?: string;
  description?: string;
}

export const ActivateModal = ({
  queryParamName,
  onConfirm,
  busy,
  title,
  description,
}: ActivateModalProps) => {
  const [id, setId] = useQueryState(queryParamName);
  const dict = useDict();

  const modalTitle = title || "Activate";
  const modalDescription = description || "Are you sure?";
  const cancelText = dict.common.actions.cancel;
  const confirmText = "Activate";

  return (
    <Modal
      isOpen={!!id}
      onClose={() => {
        setId(null);
      }}
      hideCloseButton
    >
      <ModalContent>
        <div className="grid auto-rows-max grid-cols-1 items-center justify-items-center gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h1 className="text-xl font-bold text-[#1E1E1E] dark:text-white">
              {modalTitle}
            </h1>
            <p className="text-[#A5A7A5] dark:text-[#A5A7A5]">
              {modalDescription}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="h-12 rounded-lg bg-[#4285F41A] font-semibold text-[#4285F4]"
              onPress={() => {
                setId(null);
              }}
              isDisabled={busy}
            >
              {cancelText}
            </Button>
            <Button
              className="bg-app-primary h-12 rounded-lg font-semibold text-white"
              onPress={() => {
                if (id) {
                  onConfirm(id);
                }
              }}
              isDisabled={busy}
              isLoading={busy}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
