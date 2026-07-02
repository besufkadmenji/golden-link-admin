import CalendarIcon from "@/assets/icons/app/calendar.svg";
import { useDict } from "@/hooks/useDict";
import { parseAsInteger, useQueryState } from "nuqs";
import { FormDatePicker } from "../../shared/forms/FormDatePicker";
import { SearchInput } from "../../shared/filter/SearchInput";

export const PackageSubscribersFilter = () => {
  const dict = useDict();
  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div className="flex flex-col gap-4 xl:flex-row-reverse xl:items-center xl:justify-end">
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
      <SearchInput
        className="w-full xl:w-80"
        classNames={{
          inputWrapper:
            "h-10 min-h-10 gap-1 border-[#EEEEEE] px-3 py-2 data-[hover=true]:border-[#EEEEEE] group-data-[focus=true]:border-app-primary",
          innerWrapper: "gap-1",
          input:
            "text-sm font-normal leading-5 tracking-[0.07px] text-[#575757] placeholder:text-[#A2A2A2]",
        }}
      />
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
