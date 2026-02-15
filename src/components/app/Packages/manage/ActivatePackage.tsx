import { useDict } from "@/hooks/useDict";
import { ActivateModal } from "../../shared/ActivateModal";
import { useManagePackage } from "./useManagePackage";

export const ActivatePackage = () => {
  const dict = useDict();
  const { togglePackageStatus, busy } = useManagePackage();

  return (
    <ActivateModal
      queryParamName="activatePackage"
      onConfirm={() => {}}
      busy={busy}
      title={dict.activate_package_confirmation.title}
      description={dict.activate_package_confirmation.description}
    />
  );
};
