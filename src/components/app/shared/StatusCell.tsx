import Dictionary from "@/config/i18n/types";
import { AppSwitch } from "./AppSwitch";

export const StatusCell = ({
  isActive,
  dict,
  onActivate,
  isDisabled,
}: {
  isActive: boolean;
  dict: Dictionary;
  onActivate?: (value: boolean) => void;
  isDisabled?: boolean;
}) => {
  if (!onActivate) {
    return (
      <p className="text-sm">
        {isActive ? dict.common.statuses.ACTIVE : dict.common.statuses.INACTIVE}
      </p>
    );
  }

  return (
    <AppSwitch
      isSelected={isActive}
      onValueChange={onActivate}
      isDisabled={isDisabled}
    />
  );
};
