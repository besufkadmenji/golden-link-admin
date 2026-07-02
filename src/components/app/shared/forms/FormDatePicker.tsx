import CalendarIcon from "@/assets/icons/app/calendar.svg";
import { cn, DatePicker } from "@heroui/react";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import moment from "moment";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
export const FormDatePicker = ({
  label,
  className,
  onChange,
  value: initial,
  classNames,
  selectorIcon,
  selectorButtonPlacement,
  readOnly,
  errorMessage,
  hideLabel,
}: {
  label: string;
  className?: string;
  classNames?: {
    inputWrapper?: string;
    input?: string;
    innerWrapper?: string;
    label?: string;
    segment?: string;
    selectorButton?: string;
    selectorIcon?: string;
  };
  value: string | null;
  onChange: (date: string | null) => void;
  selectorIcon?: ReactNode;
  selectorButtonPlacement?: "start" | "end";
  readOnly?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
}) => {
  type PickerValue = ComponentProps<typeof DatePicker>["value"];

  const [value, setValue] = useState<PickerValue>(
    initial ? (parseDate(initial) as unknown as PickerValue) : null,
  );

  useEffect(() => {
    setValue(initial ? (parseDate(initial) as unknown as PickerValue) : null);
  }, [initial]);

  return (
    <DatePicker
      label={label}
      labelPlacement={hideLabel ? undefined : "outside"}
      variant="bordered"
      className={twMerge(className, readOnly && "opacity-100!")}
      selectorButtonPlacement={selectorButtonPlacement}
      selectorIcon={
        selectorIcon ?? <CalendarIcon className="size-3! text-white" />
      }
      value={value}
      onChange={(date: any) => {
        if (!date) {
          setValue(null);
          onChange(null);
          return;
        }
        setValue(date);
        onChange(moment(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD"));
      }}
      isDisabled={readOnly}
      classNames={{
        label: cn(
          "text-[#4D5464]! dark:text-white! text-sm! font-semibold! leading-5 tracking-tight after:text-subTitle after:font-normal after:text-sm after:ms-1 dark:after:text-white/70",
          hideLabel && value && "hidden",
          classNames?.label,
        ),
        selectorButton: cn("p-2", classNames?.selectorButton),
        selectorIcon: cn(
          "text-[#53545C] dark:text-white",
          classNames?.selectorIcon,
        ),
        inputWrapper: cn(
          "h-10 rounded-lg bg-gray-border border dark:bg-dark-gray-2 dark:border-dark-gray-3 border-gray-border-alt hover:border-app-primary focus-within:border-app-primary focus-within:hover:border-app-primary ",
          hideLabel && "flex-row items-center gap-1",
          classNames?.inputWrapper,
        ),
        innerWrapper: cn(
          hideLabel && !value && "w-auto",
          classNames?.innerWrapper,
        ),
        input: cn(
          "placeholder:[#4D5464] dark:placeholder:text-white/50 dark:text-white text-secondary text-sm font-semibold leading-5 tracking-tight",
          hideLabel && !value && "hidden",
          classNames?.input,
        ),
        segment: classNames?.segment,
      }}
      placeholderValue={undefined}
      calendarProps={{
        classNames: {
          cellButton:
            "data-[selected=true]:text-white data-[selected=true]:bg-app-primary data-[hover=true]:text-app-primary data-[selected=true]:data-[hover=true]:bg-app-primary data-[selected=true]:data-[hover=true]:text-white",
        },
      }}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
    />
  );
};
