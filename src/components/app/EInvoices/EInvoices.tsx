"use client";

import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { ExportButton } from "@/components/app/shared/button/ExportButton";
import { useDict } from "@/hooks/useDict";
import { ZatcaInvoiceService } from "@/services/zatca-invoice.service";
import { ZATCA_INVOICE_STATUSES, ZatcaInvoiceStatus } from "@/types/zatca-invoice";
import { showErrorMessage } from "@/utils/show.message";
import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";
import { EInvoicesFilter } from "./EInvoicesFilter";
import { EInvoicesList } from "./EInvoicesList";
import { StatusChip } from "./StatusChip";
import { useEInvoiceParams, useEInvoices } from "./useEInvoices";

/** Counts per status (for the other active filters); clicking one filters the list by it. */
const StatusSummary = () => {
  const { data } = useEInvoices();
  const [status, setStatus] = useQueryState("status");
  const [, setPage] = useQueryState("page");
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {ZATCA_INVOICE_STATUSES.map((key: ZatcaInvoiceStatus) => (
        <button
          key={key}
          type="button"
          onClick={() => {
            setStatus(status === key ? null : key);
            setPage(null);
          }}
          className={twMerge(
            "dark:bg-dark-black grid gap-2 rounded-xl border border-[#F0F1F5] bg-white p-4 text-start transition-colors dark:border-white/10",
            status === key && "border-app-primary",
          )}
        >
          <StatusChip status={key} />
          <span className="text-title text-2xl font-bold dark:text-white">{data?.summary[key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
};

export const EInvoices = () => {
  const dict = useDict();
  const params = useEInvoiceParams();
  return (
    <PageWrapper>
      <PageBar title={dict.eInvoices.title} className="grid grid-cols-1 gap-2 md:flex">
        <ExportButton
          onPress={() => ZatcaInvoiceService.exportToExcel(params).catch((error) => showErrorMessage(error))}
        />
      </PageBar>
      <Gap className="h-8" />
      <StatusSummary />
      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <EInvoicesFilter />
        <EInvoicesList />
      </div>
    </PageWrapper>
  );
};
