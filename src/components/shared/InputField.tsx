import { ReactNode } from "react";
import { Input } from "@heroui/react";
export const InputField = ({
  icon,
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}) => {
  return (
    <Input
      startContent={icon}
      placeholder={placeholder}
      label={label}
      labelPlacement="outside"
      value={value}
      size="lg"
      variant="bordered"
      onValueChange={onChange}
      autoComplete="off"
      classNames={{
        inputWrapper:
          "h-12.5 border-[1.50px] px-5 border-border rounded-full group-data-[focus=true]:border-primary data-[hover=true]:border-primary shadow-none text-dark-gray text-sm placeholder:text-sm placeholder:text-gray",
        label: "font-light text-base leading-6 text-black",
      }}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
    />
  );
};
