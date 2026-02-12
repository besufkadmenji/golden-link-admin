import { cairo } from "@/assets/fonts/cairo";
import { useDict } from "@/hooks/useDict";
import { Button } from "@heroui/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export const FilterByDate = () => {
  const dict = useDict();
  const [selected, setSelected] = useState("");
  const options = [
    {
      label: dict.filterByDate.currentWeek,
      value: "currentWeek",
    },
    {
      label: dict.filterByDate.lastWeek,
      value: "lastWeek",
    },
    {
      label: dict.filterByDate.currentMonth,
      value: "currentMonth",
    },
    {
      label: dict.filterByDate.lastMonth,
      value: "lastMonth",
    },
    {
      label: dict.filterByDate.currentYear,
      value: "currentYear",
    },
    {
      label: dict.filterByDate.lastYear,
      value: "lastYear",
    },
  ];
  return (
    <div className="grid w-84 grid-cols-1 gap-3 px-3 py-6">
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <RadioItem
            isSelected={selected === option.value}
            label={option.label}
            onClick={(): void => {
              setSelected(option.value);
            }}
          />
        ))}
      </div>
      <div className="h-px bg-[#F0F1F5]" />
      <div className="grid grid-cols-1 gap-3">
        <RadioItem
          isSelected={selected === "custom"}
          label={dict.filterByDate.betweenDates}
          onClick={(): void => {
            setSelected("custom");
          }}
        />
        {selected === "custom" && (
          <div className="grid grid-cols-1 gap-4">
            <div className="grid h-7.5 grid-cols-2 rounded-lg bg-[#EBEEFD]">
              <div
                className={twMerge(
                  "grid items-center rounded-lg bg-[#2563EB] text-center text-sm leading-5 font-medium text-white",
                  cairo.className,
                )}
              >
                {dict.filterByDate.from}
              </div>
              <div
                className={twMerge(
                  "grid items-center text-center text-sm leading-5 font-medium text-[#2563EB]",
                  cairo.className,
                )}
              >
                {dict.filterByDate.to}
              </div>
            </div>
            <DayPicker
              mode="range"
              captionLayout="dropdown"
              classNames={{
                caption_label: twMerge(
                  "text-sm font-medium text-[#8B8D97] flex items-center gap-3 ltr:mr-6 rtl:ml-6",
                  cairo.className,
                ),
                chevron: "text-[#000000] size-4",
              }}
              formatters={{
                formatWeekdayName: (date, options) =>
                  date.toLocaleDateString(options!.locale!.labels! as string, {
                    weekday: "narrow",
                  }),
              }}
            />
          </div>
        )}
        <Button className="h-9 rounded-xl bg-[#2563EB] text-white">
          {dict.filterByDate.filterButton}
        </Button>
      </div>
    </div>
  );
};

const RadioItem = ({
  isSelected,
  label,
  onClick,
}: {
  isSelected: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex cursor-pointer gap-5" onClick={onClick}>
      <div
        className={twMerge(
          "grid size-6 grid-cols-1 rounded-lg border border-[#CFD3D4] p-px duration-50 ease-in",
          isSelected && "border-[#2563EB]",
        )}
      >
        <div
          className={twMerge(
            "scale-0 rounded-md bg-[#2563EB] duration-50 ease-in",
            isSelected && "scale-100",
          )}
        />
      </div>
      <p className="text-sm text-[#83898C]">{label}</p>
    </div>
  );
};
