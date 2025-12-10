import { DeactivateModal } from "../../shared/DeactivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageClient } from "./useManageClient";

export const DeactivateClient = () => {
  const dict = useDict();
  const { deactivateClient, busy } = useManageClient();

  return (
    <DeactivateModal
      queryParamName="deactivateClient"
      onConfirm={(value, reason) => deactivateClient(Number(value), reason)}
      busy={busy}
      title={dict.deactivate_client_reason_form.title}
      description={dict.deactivate_client_reason_form.description}
      showReason={true}
      reasonLabel={
        dict.deactivate_client_reason_form.labels.deactivation_reason
      }
      reasonPlaceholder={
        dict.deactivate_client_reason_form.placeholders.deactivation_reason
      }
    />
  );
};
