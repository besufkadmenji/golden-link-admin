import { DeactivateModal } from "../../shared/DeactivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageAdmin } from "./useManageAdmin";

export const DeactivateAdmin = () => {
  const dict = useDict();
  const { deactivateAdmin, busy } = useManageAdmin();

  return (
    <DeactivateModal
      queryParamName="deactivateAdmin"
      onConfirm={deactivateAdmin}
      busy={busy}
      title={dict.deactivate_admin_reason_form.title}
      description={dict.deactivate_admin_reason_form.description}
      showReason={true}
      reasonLabel={dict.deactivate_admin_reason_form.labels.deactivation_reason}
      reasonPlaceholder={
        dict.deactivate_admin_reason_form.placeholders.deactivation_reason
      }
    />
  );
};
