import { cn, Textarea } from "@heroui/react";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";

export const FormAreaInput = ({
  label,
  placeholder,
  value,
  onChange,
  isOptional = false,
  errorMessage,
  readOnly,
  className,
  dir,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isOptional?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  className?: string;
  dir?: "rtl" | "ltr";
}) => {
  const lng = useLang();
  const enOptional = "after:content-['(Optional)']";
  const arOptional = "after:content-['(اختياري)]";
  const optionalClass = lng === "ar" ? arOptional : enOptional;
  return (
    <div dir={dir} className={className}>
      <Textarea
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        variant="bordered"
        minRows={7}
        className={className}
        classNames={{
          inputWrapper: cn(
            "h-12 rounded-lg bg-gray-border dark:bg-dark-gray-2 dark:border-dark-gray-3 border border-gray-border-alt data-[hover=true]:border-app-primary group-data-[focus=true]:border-app-primary",

            readOnly && "border-gray-border-alt!",
          ),
          label: twMerge(
            "text-[#4D5464]! dark:text-white! text-sm! font-semibold! leading-5 tracking-tight after:text-subTitle after:font-normal after:text-sm after:ms-1 dark:after:text-white/70",
            isOptional && optionalClass,
          ),
          input:
            "placeholder:[#4D5464] dark:placeholder:text-white/50 dark:text-white text-secondary text-sm font-semibold leading-5 tracking-tight",
        }}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        readOnly={readOnly}
      />
    </div>
  );
};
