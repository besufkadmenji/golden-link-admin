import CalendarIcon from "@/assets/icons/app/calendar.svg";
import CloseIcon from "@/assets/icons/app/close.svg";
import { useDict } from "@/hooks/useDict";
import { Button } from "@heroui/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { FormDatePicker } from "../../shared/forms/FormDatePicker";
import { SearchInput } from "../../shared/filter/SearchInput";

export const PackageSubscribersFilter = () => {
  const dict = useDict();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [searchKey, setSearchKey] = useState(0);

  const hasActiveFilters = Boolean(search || startDate || endDate);

  const handleClear = () => {
    void setSearch(null);
    void setStartDate(null);
    void setEndDate(null);
    void setPage(1);
    setSearchKey((key) => key + 1);
  };

  return (
    <div className="flex w-full flex-wrap items-end gap-4 md:w-max">
      <div className="grid w-full grid-cols-2 gap-4 md:w-max md:grid-cols-3">
        <SearchInput
          key={searchKey}
          className="w-full xl:w-80 col-span-2 md:col-span-1"
          classNames={{
            inputWrapper:
              "h-10 min-h-10 gap-1 border-[#EEEEEE] px-3 py-2 data-[hover=true]:border-[#EEEEEE] group-data-[focus=true]:border-app-primary",
            innerWrapper: "gap-1",
            input:
              "text-sm font-normal leading-5 tracking-[0.07px] text-[#575757] dark:text-white placeholder:text-[#A2A2A2]",
          }}
        />
        <DateFilterInput
          placeholder={
            dict.packages.subscribers.table_headers.subscription_period_to
          }
          value={endDate}
          onChange={(value) => {
            void setPage(1);
            void setEndDate(value);
          }}
        />
        <DateFilterInput
          placeholder={
            dict.packages.subscribers.table_headers.subscription_period_from
          }
          value={startDate}
          onChange={(value) => {
            void setPage(1);
            void setStartDate(value);
          }}
        />
      </div>
      {hasActiveFilters && (
        <Button
          className="h-10 min-h-10 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm font-normal leading-5 tracking-[0.07px] text-[#575757] data-[hover=true]:border-[#EEEEEE] data-[hover=true]:bg-white"
          variant="bordered"
          startContent={<CloseIcon className="size-5 shrink-0 text-[#575757]" />}
          onPress={handleClear}
        >
          {dict.common.actions.clear}
        </Button>
      )}
    </div>
  );
};

const DateFilterInput = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => void;
}) => {
  return (
    <FormDatePicker
      label={placeholder}
      hideLabel
      value={value}
      onChange={onChange}
      className="w-full xl:w-80"
      selectorButtonPlacement="end"
      selectorIcon={<CalendarIcon />}
      classNames={{
        inputWrapper:
          "h-10 min-h-10 gap-1 rounded-lg border border-[#EEEEEE] bg-white px-3 py-2 shadow-none data-[hover=true]:border-[#EEEEEE] focus-within:border-app-primary focus-within:hover:border-app-primary",
        innerWrapper: "h-6 gap-1",
        input: "text-sm font-normal leading-5 tracking-[0.07px] text-[#575757]",
        label:
          "grow cursor-text text-sm! font-normal! leading-5 tracking-[0.07px] text-[#A2A2A2]!",
        segment:
          "text-sm font-normal leading-5 tracking-[0.07px] text-[#575757]",
        selectorButton:
          "size-6 min-w-6 shrink-0 rounded-none p-0 data-[hover=true]:bg-transparent",
        selectorIcon: "size-6 text-[#575757]",
      }}
    />
  );
};
