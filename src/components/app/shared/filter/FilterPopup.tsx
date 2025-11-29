import FilterIcon from "@/assets/icons/app/filter.svg";
import { useDict } from "@/hooks/useDict";
import {
  Button,
  Checkbox,
  CheckboxIconProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
export const FilterPopup = ({
  children,
  defaultOpen,
  setOpenFilter,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
  setOpenFilter?: (open: boolean) => void;
}) => {
  const dict = useDict();
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <Popover
      placement="bottom"
      classNames={{
        base: "max-h-[48vh] h-full overflow-y-auto bg-red shadow-[0px_4px_32px_0px_rgba(61,70,112,0.08)] rounded-xl",
        content: "rounded-xl",
      }}
      isOpen={defaultOpen !== undefined ? defaultOpen : isOpen}
      onOpenChange={(open) => {
        if (setOpenFilter) {
          setOpenFilter(open);
        } else {
          setIsOpen(open);
        }
      }}
    >
      <PopoverTrigger>
        <Button
          variant="bordered"
          className="border-gray-border-alt text-subTitle relative h-10 rounded-lg border bg-white text-sm leading-5 font-medium tracking-tight shadow-none"
          endContent={<FilterIcon className="size-5" />}
        >
          {dict.common.actions.filter}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">{children}</PopoverContent>
    </Popover>
  );
};

export const FilterCheckbox = ({
  label,
  isSelected,
  onValueChange,
  classNames,
}: {
  label: string;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
  classNames?: {
    label?: string;
  };
}) => {
  return (
    <Checkbox
      isSelected={isSelected}
      onValueChange={onValueChange}
      radius={"sm"}
      classNames={{
        wrapper:
          "group-data-[selected=true]:after:bg-white border-1 border-[#CFD3D4]  rounded-md bg-white group-data-[selected=true]:border-app-primary before:hidden",
        icon: "size-4! bg-app-primary rounded",
        label: twMerge(
          "text-sm text-[#83898C] dark:text-white/80",
          classNames?.label,
        ),
      }}
      icon={
        <FilterIconCheckbox
          className=""
          data-checked={""}
          isSelected={false}
          isIndeterminate={false}
          disableAnimation={false}
        />
      }
    >
      {label}
    </Checkbox>
  );
};

const FilterIconCheckbox = (props: CheckboxIconProps) => {
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } =
    props;

  return <span {...otherProps} />;
};
