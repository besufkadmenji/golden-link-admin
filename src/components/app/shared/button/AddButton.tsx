"use client";

import AddIcon from "@/assets/icons/app/add.svg";
import { PrimaryButton } from "@/components/app/shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
export enum AddButtonType {
  Admin,
  Subscriber,
}
export const AddButton = ({
  type,
  onPress,
  isLoading,
  isDisabled,
}: {
  type: AddButtonType;
  onPress?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}) => {
  const dict = useDict();
  const labelMap = {
    [AddButtonType.Admin]: dict.system_managers_page.buttons.add_new_manager,
    [AddButtonType.Subscriber]: dict.subscribers_page.buttons.add_subscriber,
  };
  return (
    <PrimaryButton
      startContent={<AddIcon className="size-5 shrink-0" />}
      onPress={onPress}
      isLoading={isLoading}
      isDisabled={isDisabled}
      className="px-2"
    >
      {labelMap[type]}
    </PrimaryButton>
  );
};
