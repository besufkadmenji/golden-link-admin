import { Checkbox } from "@heroui/react";
import { twMerge } from "tailwind-merge";
export const FormCheckbox = ({
  label,
  isSelected,
  onValueChange,
  classNames,
  readOnly,
}: {
  label: string;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
  classNames?: {
    label?: string;
  };
  readOnly?: boolean;
}) => {
  return (
    <Checkbox
      isSelected={isSelected}
      onValueChange={onValueChange}
      radius={"sm"}
      classNames={{
        wrapper:
          "rounded-md group-data-[selected=true]:after:bg-app-primary before:border-[#CFD3D4] before:border-1",
        label: twMerge(
          "text-sm text-[#83898C] dark:text-white/90",
          classNames?.label,
          readOnly && "cursor-forbidden",
        ),
        hiddenInput: twMerge(readOnly && "cursor-not-allowed!"),
      }}
      readOnly={readOnly}
    >
      {label}
    </Checkbox>
  );
};
