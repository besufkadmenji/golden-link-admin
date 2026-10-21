import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { MissingBuyerDataError, ZatcaInvoiceService } from "@/services/zatca-invoice.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

/** URL params that open the confirm modals (one per action). */
export const CONFIRM_PARAMS = {
  retry: "retryEInvoice",
  reissue: "reissueEInvoice",
  resend: "resendEInvoice",
} as const;

export const useManageEInvoice = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLang();
  const [busy, setBusy] = useState(false);
  const [, setRetry] = useQueryState(CONFIRM_PARAMS.retry);
  const [, setReissue] = useQueryState(CONFIRM_PARAMS.reissue);
  const [, setResend] = useQueryState(CONFIRM_PARAMS.resend);

  const refresh = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ["e-invoices"] });
    queryClient.invalidateQueries({ queryKey: ["e-invoice", id] });
  };

  const run = async (id: string, action: () => Promise<void>, close: () => void) => {
    setBusy(true);
    try {
      await action();
      refresh(id);
    } catch (error) {
      showErrorMessage(error instanceof Error ? error : String(error));
    } finally {
      setBusy(false);
      close();
    }
  };

  const retry = (id: string) =>
    run(
      id,
      async () => {
        await ZatcaInvoiceService.retry(id);
        showSuccessMessage(dict.eInvoices.messages.retryQueued);
      },
      () => setRetry(null),
    );

  const reissue = (id: string) =>
    run(
      id,
      async () => {
        try {
          const created = await ZatcaInvoiceService.reissue(id);
          showSuccessMessage(dict.eInvoices.messages.reissued.replace("{number}", created?.invoiceNumber ?? ""));
          // Open the new invoice: same route, last segment swapped for the new id.
          if (created) router.push(pathname.replace(/[^/]+$/, created.id));
        } catch (error) {
          if (error instanceof MissingBuyerDataError) {
            const labels = dict.eInvoices.missingFields as Record<string, string>;
            const fields = error.missing.map((field) => labels[field] ?? field).join(lang === "ar" ? "، " : ", ");
            throw new Error(dict.eInvoices.messages.missingBuyerData.replace("{fields}", fields));
          }
          throw error;
        }
      },
      () => setReissue(null),
    );

  const resendEmail = (id: string) =>
    run(
      id,
      async () => {
        await ZatcaInvoiceService.resendEmail(id);
        showSuccessMessage(dict.eInvoices.messages.resendQueued);
      },
      () => setResend(null),
    );

  return { busy, retry, reissue, resendEmail };
};
