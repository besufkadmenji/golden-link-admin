import { cairo } from "@/assets/fonts/cairo";
import { useDict } from "@/hooks/useDict";
import { Button } from "@heroui/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { useQueryState } from "nuqs";

export const FilterByDate = ({ close }: { close: () => void }) => {
  const dict = useDict();
  const [period, setPeriod] = useQueryState("period", {
    defaultValue: "CURRENT_YEAR",
  });
  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [selected, setSelected] = useState(period);
  const [from, setFrom] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined,
  );
  const [to, setTo] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined,
  );

  const options = [
    {
      label: dict.filterByDate.currentWeek,
      value: "CURRENT_WEEK",
    },
    {
      label: dict.filterByDate.lastWeek,
      value: "LAST_WEEK",
    },
    {
      label: dict.filterByDate.currentMonth,
      value: "CURRENT_MONTH",
    },
    {
      label: dict.filterByDate.lastMonth,
      value: "LAST_MONTH",
    },
    {
      label: dict.filterByDate.currentYear,
      value: "CURRENT_YEAR",
    },
    {
      label: dict.filterByDate.lastYear,
      value: "LAST_YEAR",
    },
  ];
  return (
    <div className="grid w-84 grid-cols-1 gap-3 px-3 py-6">
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <RadioItem
            key={index}
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
          isSelected={selected === "CUSTOM"}
          label={dict.filterByDate.betweenDates}
          onClick={(): void => {
            setSelected("CUSTOM");
          }}
        />
        {selected === "CUSTOM" && (
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
              selected={{
                from,
                to,
              }}
              onSelect={(v) => {
                console.log(v?.from?.toISOString(), v?.to?.toISOString());
                setFrom(v?.from);
                setTo(v?.to);
              }}
            />
          </div>
        )}
        <Button
          className="h-9 rounded-xl bg-[#2563EB] text-white"
          onPress={() => {
            if (selected === "CUSTOM" && from && to) {
              setPeriod(selected);
              setStartDate(from?.toISOString());
              setEndDate(to?.toISOString());
            } else if (selected !== "CUSTOM") {
              setPeriod(selected);
              setStartDate(null);
              setEndDate(null);
            }
            close();
          }}
        >
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
