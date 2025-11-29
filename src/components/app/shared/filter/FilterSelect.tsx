import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";
import { Select, SelectItem } from "@heroui/react";
import { twMerge } from "tailwind-merge";
export const FilterSelect = ({
  options,
  placeholder,
  className,
  values,
  onValueChange,
}: {
  options: { label: string; key: string }[];
  placeholder: string;
  className?: string;
  values?: string[];
  onValueChange?: (values: string[]) => void;
}) => {
  return (
    <Select
      aria-label={placeholder}
      items={options}
      placeholder={placeholder}
      variant="bordered"
      className={twMerge("w-max", className)}
      classNames={{
        trigger: twMerge(
          "w-max shadow-none h-10 bg-white border dark:bg-dark-black rounded-lg",
          "data-[hover=true]:border-app-primary data-[open=true]:border-app-primary data-[focus=true]:border-app-primary",
          className,
        ),
        innerWrapper: "min-w-[20vw] pe-8",
        selectorIcon: "size-6! ",
      }}
      selectorIcon={<ChevronDownBoldIcon className="dark:text-white" />}
      selectedKeys={values}
      onSelectionChange={(keys) => {
        onValueChange?.(Array.from(keys) as string[]);
      }}
    >
      {(option) => <SelectItem key={option.key}>{option.label}</SelectItem>}
    </Select>
  );
};
