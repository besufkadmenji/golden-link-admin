import { ActivateModal } from "../../shared/ActivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageAdmin } from "./useManageAdmin";

export const ActivateAdmin = () => {
  const dict = useDict();
  const { activateAdmin, busy } = useManageAdmin();

  return (
    <ActivateModal
      queryParamName="activateAdmin"
      onConfirm={activateAdmin}
      busy={busy}
      title={dict.activate_admin_confirmation.title}
      description={dict.activate_admin_confirmation.description}
    />
  );
};
