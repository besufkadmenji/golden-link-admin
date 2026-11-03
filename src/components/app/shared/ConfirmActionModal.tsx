import { useDict } from "@/hooks/useDict";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";

interface ConfirmActionModalProps {
  /** URL query param holding the record id; the modal is open while it is set. */
  queryParamName: string;
  onConfirm: (id: string) => void;
  busy: boolean;
  title: string;
  description: string;
  confirmLabel: string;
}

/** Like ActivateModal, with a configurable confirm label for any action. */
export const ConfirmActionModal = ({
  queryParamName,
  onConfirm,
  busy,
  title,
  description,
  confirmLabel,
}: ConfirmActionModalProps) => {
  const [id, setId] = useQueryState(queryParamName);
  const dict = useDict();

  return (
    <Modal isOpen={!!id} onClose={() => setId(null)} hideCloseButton>
      <ModalContent>
        <div className="grid auto-rows-max grid-cols-1 items-center justify-items-center gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4 text-center">
            <h1 className="text-xl font-bold text-[#1E1E1E] dark:text-white">
              {title}
            </h1>
            <p className="text-[#A5A7A5] dark:text-[#A5A7A5]">{description}</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="h-12 rounded-lg bg-[#4285F41A] font-semibold text-[#4285F4]"
              onPress={() => setId(null)}
              isDisabled={busy}
            >
              {dict.common.actions.cancel}
            </Button>
            <Button
              className="bg-app-primary h-12 rounded-lg font-semibold text-white"
              onPress={() => {
                if (id) onConfirm(id);
              }}
              isDisabled={busy}
              isLoading={busy}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
