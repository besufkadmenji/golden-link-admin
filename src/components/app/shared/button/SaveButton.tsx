"use client";

import SaveIcon from "@/assets/icons/app/save.svg";
import { PrimaryButton } from "@/components/app/shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
export enum SaveButtonType {
  Admin,
}
export const SaveButton = ({
  type,
  onPress,
  isLoading,
  isDisabled,
}: {
  type: SaveButtonType;
  onPress?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}) => {
  const dict = useDict();
  const labelMap = {
    [SaveButtonType.Admin]: dict.system_managers_page.buttons.save,
  };
  return (
    <PrimaryButton
      startContent={<SaveIcon className="size-5" />}
      type="submit"
      onPress={onPress}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {labelMap[type]}
    </PrimaryButton>
  );
};
