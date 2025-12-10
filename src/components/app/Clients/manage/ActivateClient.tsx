import { ActivateModal } from "../../shared/ActivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageClient } from "./useManageClient";

export const ActivateClient = () => {
  const dict = useDict();
  const { activateClient, busy } = useManageClient();

  return (
    <ActivateModal
      queryParamName="activateClient"
      onConfirm={(value) => activateClient(Number(value))}
      busy={busy}
      title={dict.activate_client_confirmation.title}
      description={dict.activate_client_confirmation.description}
    />
  );
};
