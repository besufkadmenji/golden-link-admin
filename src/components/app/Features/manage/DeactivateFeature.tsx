import { DeactivateModal } from "../../shared/DeactivateModal";
import { useDict } from "@/hooks/useDict";
import { useManageFeature } from "./useManageFeature";

export const DeactivateFeature = () => {
  const dict = useDict();
  const { deactivateFeature, busy } = useManageFeature();

  return (
    <DeactivateModal
      queryParamName="deactivateFeature"
      onConfirm={(value) => deactivateFeature(Number(value))}
      busy={busy}
      title={dict.deactivate_feature_reason_form.title}
      description={dict.deactivate_feature_reason_form.description}
    />
  );
};
