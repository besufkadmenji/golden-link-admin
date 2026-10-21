import CalendarIcon from "@/assets/icons/app/calendar.svg";
import { useDict } from "@/hooks/useDict";
import { ZATCA_DOCUMENT_TYPES, ZATCA_INVOICE_STATUSES } from "@/types/zatca-invoice";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { FilterByDate } from "../Reports/FilterByDate";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";

export const EInvoicesFilter = () => {
  const dict = useDict();
  const [status, setStatus] = useQueryState("status");
  const [documentType, setDocumentType] = useQueryState("documentType");
  const [, setPage] = useQueryState("page");
  const [period] = useQueryState("period", { defaultValue: "ALL" });
  const [startDate] = useQueryState("startDate");
  const [endDate] = useQueryState("endDate");
  const [isDateOpen, setIsDateOpen] = useState(false);

  const statusOptions = ZATCA_INVOICE_STATUSES.map((key) => ({ key, label: dict.eInvoices.statuses[key] }));
  const typeOptions = ZATCA_DOCUMENT_TYPES.map((key) => ({ key, label: dict.eInvoices.documentTypes[key] }));

  return (
    <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-4 lg:flex">
      <SearchInput className="col-span-2 w-full md:col-span-1 lg:w-max" />
      <FilterSelect
        options={statusOptions}
        placeholder={dict.eInvoices.filters.status}
        className="w-full lg:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
          setPage(null);
        }}
      />
      <FilterSelect
        options={typeOptions}
        placeholder={dict.eInvoices.filters.documentType}
        className="w-full lg:w-max"
        values={documentType ? [documentType] : []}
        onValueChange={(values) => {
          setDocumentType(values[0] || null);
          setPage(null);
        }}
      />
      <Popover placement="bottom" isOpen={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger>
          <Button
            startContent={<CalendarIcon className="size-5" />}
            className="h-10 w-full rounded-lg bg-[#F0F1F5] px-3.5 text-sm text-[#53545C] lg:w-max dark:bg-[#F0F1F5]"
          >
            {period && period !== "ALL" ? `${dict.eInvoices.filters.issueDate} ✓` : dict.eInvoices.filters.issueDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FilterByDate key={`${period}-${startDate ?? ""}-${endDate ?? ""}`} close={() => setIsDateOpen(false)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
