import { useDict } from "@/hooks/useDict";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useManageAdmin } from "./useManageAdmin";

export const ActivateAdmin = () => {
  const [activateAdmin, setActivateAdmin] = useQueryState("activateAdmin");
  const dict = useDict();
  const { activateAdmin: activateAdminHandler, busy } = useManageAdmin();
  return (
    <Modal
      isOpen={!!activateAdmin}
      onClose={() => {
        setActivateAdmin(null);
      }}
      hideCloseButton
    >
      <ModalContent>
        <div className="grid auto-rows-max grid-cols-1 items-center justify-items-center gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h1 className="text-xl font-bold text-[#1E1E1E]">
              {dict.activate_admin_confirmation.title}
            </h1>
            <p className="text-[#A5A7A5]">
              {dict.activate_admin_confirmation.description}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              className="h-12 rounded-lg bg-[#4285F41A] font-semibold text-[#4285F4]"
              onPress={() => {
                setActivateAdmin(null);
              }}
              isDisabled={busy}
            >
              {dict.activate_admin_confirmation.buttons.cancel}
            </Button>
            <Button
              className="bg-app-primary h-12 rounded-lg font-semibold text-white"
              onPress={() => {
                if (activateAdmin) {
                  activateAdminHandler(activateAdmin);
                }
              }}
              isDisabled={busy}
              isLoading={busy}
            >
              {dict.activate_admin_confirmation.buttons.activate}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
