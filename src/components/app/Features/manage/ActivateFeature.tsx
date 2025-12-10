import { ActivateModal } from "../../shared/ActivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageFeature } from "./useManageFeature";

export const ActivateFeature = () => {
  const dict = useDict();
  const { activateFeature, busy } = useManageFeature();

  return (
    <ActivateModal
      queryParamName="activateFeature"
      onConfirm={(value) => activateFeature(Number(value))}
      busy={busy}
      title={dict.activate_feature_confirmation.title}
      description={dict.activate_feature_confirmation.description}
    />
  );
};
