import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";
import { Select, SelectItem } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { SearchableFilterSelect } from "./SearchableFilterSelect";

const filterTriggerClassName = (className?: string) =>
  twMerge(
    "w-max shadow-none h-10 bg-white border dark:bg-dark-black rounded-lg min-w-[20vw]",
    "data-[hover=true]:border-app-primary data-[open=true]:border-app-primary data-[focus=true]:border-app-primary",
    className,
  );

export const FilterSelect = ({
  options,
  placeholder,
  className,
  values,
  onValueChange,
  isSearchable = false,
}: {
  options: { label: string; key: string }[];
  placeholder: string;
  className?: string;
  values?: string[];
  onValueChange?: (values: string[]) => void;
  isSearchable?: boolean;
}) => {
  if (isSearchable) {
    return (
      <SearchableFilterSelect
        options={options}
        placeholder={placeholder}
        className={className}
        values={values}
        onValueChange={onValueChange}
      />
    );
  }

  return (
    <Select
      aria-label={placeholder}
      items={options}
      placeholder={placeholder}
      variant="bordered"
      className={twMerge("w-max", className)}
      classNames={{
        trigger: filterTriggerClassName(className),
        innerWrapper: "min-w-[20vw] pe-8",
        selectorIcon: "size-6! ",
        popoverContent: "w-max",
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
