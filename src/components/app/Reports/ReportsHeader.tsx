import { useDict } from "@/hooks/useDict";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import CalendarIcon from "@/assets/icons/app/calendar.svg";
import { twMerge } from "tailwind-merge";
import { cairo } from "@/assets/fonts/cairo";
import { FilterByDate } from "./FilterByDate";
import { ExportButton } from "../shared/button/ExportButton";
import { useState } from "react";
export const ReportsHeader = () => {
  const dict = useDict();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-start justify-between">
      <div className="grid grid-cols-1">
        <h1 className="text-dashboard-title text-2xl leading-9 font-bold tracking-tight">
          {dict.reports.title}
        </h1>
      </div>
      <div className="flex gap-4">
        <Popover
          placement="bottom"
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger>
            <Button
              className={twMerge(
                "rounded-sm border-[1.5px] border-[#53545C] px-9 text-xs text-[#53545C]",
                cairo.className,
              )}
              endContent={<CalendarIcon className="size-4" />}
              variant="bordered"
            >
              {dict.filterByDate.title}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <FilterByDate close={() => setIsOpen(false)} />
          </PopoverContent>
        </Popover>
        <ExportButton model={""} />
      </div>
    </div>
  );
};
