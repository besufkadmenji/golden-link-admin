import { LogoutWarning } from "@/components/app/shared/LogoutWarning";
import { useMe } from "@/hooks/useMe";
import { useDisclosure } from "@heroui/react";

export const useLogoutConfirmation = () => {
  const { logout } = useMe();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const LogoutConfirmationModal = () => (
    <LogoutWarning
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        onClose();
        logout();
      }}
    />
  );

  return {
    requestLogout: onOpen,
    LogoutConfirmationModal,
  };
};
