import { DeactivateModal } from "../../shared/DeactivateModal";
import { useDict } from "@/hooks/useDict";
import { useManagePackage } from "./useManagePackage";

export const DeactivatePackage = () => {
  const dict = useDict();
  const { togglePackageStatus, busy } = useManagePackage();

  return (
    <DeactivateModal
      queryParamName="deactivatePackage"
      onConfirm={(reason) => {}}
      busy={busy}
      title={dict.deactivate_package_reason_form.title}
      description={dict.deactivate_package_reason_form.description}
      showReason={true}
      reasonLabel={
        dict.deactivate_package_reason_form.labels.deactivation_reason
      }
      reasonPlaceholder={
        dict.deactivate_package_reason_form.placeholders.deactivation_reason
      }
    />
  );
};
