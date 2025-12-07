import { useDict } from "@/hooks/useDict";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useManageAdmin } from "./useManageAdmin";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";
import { useState } from "react";

export const DeactivateAdmin = () => {
  const [deactivateAdmin, setDeactivateAdmin] =
    useQueryState("deactivateAdmin");
  const dict = useDict();
  const { deactivateAdmin: deactivateAdminHandler, busy } = useManageAdmin();
  const [reason, setReason] = useState("");
  return (
    <Modal
      isOpen={!!deactivateAdmin}
      onClose={() => {
        setDeactivateAdmin(null);
      }}
      hideCloseButton
    >
      <ModalContent>
        <div className="grid auto-rows-max grid-cols-1 items-center justify-items-center gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h1 className="text-xl font-bold text-[#1E1E1E]">
              {dict.deactivate_admin_reason_form.title}
            </h1>
            <p className="text-[#A5A7A5]">
              {dict.deactivate_admin_reason_form.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-1">
            <FormAreaInput
              label={
                dict.deactivate_admin_reason_form.labels.deactivation_reason
              }
              placeholder={
                dict.deactivate_admin_reason_form.placeholders
                  .deactivation_reason
              }
              value={reason}
              onChange={(value: string): void => {
                setReason(value);
              }}
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="h-12 rounded-lg bg-[#4285F41A] font-semibold text-[#4285F4]"
              onPress={() => {
                setDeactivateAdmin(null);
              }}
              isDisabled={busy}
            >
              {dict.deactivate_admin_confirmation.buttons.cancel}
            </Button>
            <Button
              className="bg-[#E7515A] h-12 rounded-lg font-semibold text-white"
              onPress={() => {
                if (deactivateAdmin) {
                  deactivateAdminHandler(deactivateAdmin, { reason });
                }
              }}
              isDisabled={busy}
              isLoading={busy}
            >
              {dict.deactivate_admin_confirmation.buttons.deactivate}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
