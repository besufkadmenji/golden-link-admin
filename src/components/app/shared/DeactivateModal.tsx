import { useDict } from "@/hooks/useDict";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { FormAreaInput } from "./forms/FormAreaInput";

interface DeactivateModalProps {
  queryParamName: string;
  onConfirm: (id: string, reason?: string) => void;
  busy: boolean;
  title?: string;
  description?: string;
  showReason?: boolean;
  reasonLabel?: string;
  reasonPlaceholder?: string;
}

export const DeactivateModal = ({
  queryParamName,
  onConfirm,
  busy,
  title,
  description,
  showReason = false,
  reasonLabel,
  reasonPlaceholder,
}: DeactivateModalProps) => {
  const [id, setId] = useQueryState(queryParamName);
  const [reason, setReason] = useState("");
  const dict = useDict();

  const handleConfirm = () => {
    if (id) {
      onConfirm(id, showReason ? reason : undefined);
    }
  };

  const handleClose = () => {
    setId(null);
    setReason("");
  };

  const modalTitle = title || "Deactivate";
  const modalDescription = description || "Are you sure?";

  return (
    <Modal isOpen={!!id} onClose={handleClose} hideCloseButton>
      <ModalContent>
        <div className="grid auto-rows-max grid-cols-1 items-center justify-items-center gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h1 className="text-xl font-bold text-[#1E1E1E]">{modalTitle}</h1>
            <p className="text-[#A5A7A5]">{modalDescription}</p>
          </div>
          {showReason && (
            <div className="grid w-full grid-cols-1">
              <FormAreaInput
                label={reasonLabel || "Reason"}
                placeholder={reasonPlaceholder || "Enter reason..."}
                value={reason}
                onChange={(value: string) => {
                  setReason(value);
                }}
              />
            </div>
          )}
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="h-12 rounded-lg bg-[#4285F41A] font-semibold text-[#4285F4]"
              onPress={handleClose}
              isDisabled={busy}
            >
              {dict.common.actions.cancel}
            </Button>
            <Button
              className="bg-[#E7515A] h-12 rounded-lg font-semibold text-white"
              onPress={handleConfirm}
              isDisabled={busy}
              isLoading={busy}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
