import { cairo } from "@/assets/fonts/cairo";
import { sar } from "@/assets/fonts/sar";
import { useLang } from "@/hooks/useLang";
import { Button, cn, Input } from "@heroui/react";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import EyeIcon from "@/assets/icons/app/eye.svg";
import EyeOffIcon from "@/assets/icons/app/eye-off.svg";
export const FormInput = ({
  label,
  placeholder,
  value,
  onChange,
  isOptional = false,
  startContent,
  endContent,
  hideLabel = false,
  onSubmit,
  isDisabled = false,
  classNames,
  onFocus,
  onBlur,
  errorMessage,
  readOnly,
  type,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isOptional?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  hideLabel?: boolean;
  onSubmit?: () => void;
  isDisabled?: boolean;
  classNames?: {
    inputWrapper?: string;
    input?: string;
    label?: string;
  };
  onFocus?: () => void;
  onBlur?: () => void;
  errorMessage?: string;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
}) => {
  const lng = useLang();
  const enOptional = "after:content-['(Optional)']";
  const arOptional = "after:content-['(اختياري)]";
  const optionalClass = lng === "ar" ? arOptional : enOptional;
  return (
    <Input
      labelPlacement="outside"
      label={hideLabel ? null : label}
      aria-label={label}
      placeholder={placeholder}
      value={value}
      onValueChange={onChange}
      variant="bordered"
      size="lg"
      className={cairo.className}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
      classNames={{
        inputWrapper: cn(
          "h-12 rounded-lg border  bg-gray-border  dark:bg-dark-gray-2 dark:border-dark-gray-3 border-gray-border-alt data-[hover=true]:border-app-primary group-data-[focus=true]:border-app-primary",
          classNames?.inputWrapper,
          readOnly && "border-gray-border-alt!",
        ),
        label: twMerge(
          "text-[#4D5464]! dark:text-white! text-sm! font-semibold! leading-5 tracking-tight after:text-subTitle after:font-normal after:text-sm after:ms-1 dark:after:text-white/70",
          isOptional && optionalClass,
          classNames?.label,
        ),
        input: twMerge(
          "placeholder:[#4D5464] dark:placeholder:text-white/50 dark:text-white text-secondary text-sm font-semibold leading-5 tracking-tight",
          classNames?.input,
        ),
      }}
      startContent={startContent}
      endContent={endContent}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit?.();
        }
      }}
      isDisabled={isDisabled}
      onFocus={onFocus}
      onBlur={onBlur}
      readOnly={readOnly}
      type={type}
    />
  );
};

export const CurrencyInput = ({
  label,
  placeholder,
  value,
  onChange,
  isOptional = false,
  isDisabled,
  errorMessage,
  readOnly,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isOptional?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
}) => {
  return (
    <FormInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isOptional={isOptional}
      endContent={
        <div className={twMerge("text-subTitle text-xs", sar.className)}>A</div>
      }
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      readOnly={readOnly}
    />
  );
};

export const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  isOptional = false,
  isDisabled,
  errorMessage,
  readOnly,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isOptional?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isOptional={isOptional}
      endContent={
        <Button
          className="bg-transparent min-h-0 min-w-0 p-0 size-5"
          onPress={() => setShowPassword(!showPassword)}
          isIconOnly
        >
          {showPassword ? (
            <EyeOffIcon className="size-5 text-subTitle" />
          ) : (
            <EyeIcon className="size-5 text-subTitle" />
          )}
        </Button>
      }
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      readOnly={readOnly}
      type={showPassword ? "text" : "password"}
    />
  );
};
