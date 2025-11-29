import { Checkbox, CheckboxProps } from "@heroui/react";
import { twMerge } from "tailwind-merge";

export const AppCheckbox = ({ ...rest }: CheckboxProps) => {
  return (
    <Checkbox
      {...rest}
      color="primary"
      className={twMerge("inline-flex", rest.className)}
      classNames={{
        wrapper:
          "text-white group-data-[selected=true]:after:bg-app-primary before:border-[#858D9D]",
      }}
    />
  );
};
