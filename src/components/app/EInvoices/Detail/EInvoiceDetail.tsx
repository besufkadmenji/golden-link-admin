"use client";

import { AppLoading } from "@/components/app/shared/AppLoading";
import { ConfirmActionModal } from "@/components/app/shared/ConfirmActionModal";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { usePermissions } from "@/hooks/useHasPermissions";
import { ZatcaInvoiceService } from "@/services/zatca-invoice.service";
import { ZatcaMessage, ZatcaParty } from "@/types/zatca-invoice";
import { showErrorMessage } from "@/utils/show.message";
import { Button } from "@heroui/react";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { useQueryState } from "nuqs";
import { ReactNode, useState } from "react";
import { StatusChip } from "../StatusChip";
import { useEInvoice } from "../useEInvoices";
import { CONFIRM_PARAMS, useManageEInvoice } from "./useManageEInvoice";

const Card = ({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) => (
  <section
    className={`dark:bg-dark-black grid auto-rows-max gap-3 rounded-xl border border-[#F0F1F5] bg-white p-5 dark:border-white/10 ${className}`}
  >
    {title && <h2 className="text-title text-sm font-bold dark:text-white">{title}</h2>}
    {children}
  </section>
);

const Field = ({ label, value, ltr }: { label: string; value: ReactNode; ltr?: boolean }) => (
  <div className="grid grid-cols-[minmax(120px,40%)_1fr] gap-3 text-xs">
    <span className="text-subTitle dark:text-white/70">{label}</span>
    <span className="text-title break-all dark:text-white" dir={ltr ? "ltr" : undefined}>
      {value}
    </span>
  </div>
);

const formatDateTime = (value: string | null, fallback: string) =>
  value ? new Date(value).toLocaleString("en-GB", { calendar: "gregory", timeZone: "Asia/Riyadh" }) : fallback;

const PartyCard = ({ title, party }: { title: string; party: ZatcaParty }) => {
  const dict = useDict();
  const a = party.address;
  const address = [a.buildingNumber, a.street, a.district, a.city, a.postalCode, a.additionalNumber, a.countryCode]
    .filter(Boolean)
    .join(", ");
  return (
    <Card title={title}>
      <p className="text-title text-sm font-semibold dark:text-white">{party.registrationName}</p>
      <Field label={dict.eInvoices.detail.vatNumber} value={party.vatNumber ?? "—"} ltr />
      {party.crn && <Field label={dict.eInvoices.detail.crn} value={party.crn} ltr />}
      <Field label={dict.eInvoices.detail.address} value={address} />
    </Card>
  );
};

const Messages = ({ title, items, tone }: { title: string; items: ZatcaMessage[]; tone: "error" | "warning" }) =>
  items.length === 0 ? null : (
    <div className="grid gap-2">
      <h3 className="text-title text-xs font-bold dark:text-white">{title}</h3>
      {items.map((m, i) => (
        <div
          key={`${m.code}-${i}`}
          className={`rounded-lg border-s-4 px-3 py-2 text-xs ${
            tone === "error" ? "border-[#D92D20] bg-[#FDECEC] text-[#7A271A]" : "border-[#B7791F] bg-[#FEF6E1] text-[#7A4D0B]"
          }`}
        >
          <span className="font-semibold" dir="ltr">
            {m.code}
          </span>{" "}
          <span dir="ltr">{m.message}</span>
        </div>
      ))}
    </div>
  );

export const EInvoiceDetail = ({ id }: { id: string }) => {
  const dict = useDict();
  const t = dict.eInvoices.detail;
  const { data: invoice } = useEInvoice(id);
  const { hasPermission } = usePermissions();
  const canUpdate = hasPermission("e_invoices", "update");
  const { busy, retry, reissue, resendEmail } = useManageEInvoice();
  const [, setRetry] = useQueryState(CONFIRM_PARAMS.retry);
  const [, setReissue] = useQueryState(CONFIRM_PARAMS.reissue);
  const [, setResend] = useQueryState(CONFIRM_PARAMS.resend);
  const [downloading, setDownloading] = useState<"pdf" | "xml" | null>(null);

  if (!invoice) return <AppLoading className="h-[84vh]" />;

  const download = (kind: "pdf" | "xml") => {
    setDownloading(kind);
    const request =
      kind === "pdf"
        ? ZatcaInvoiceService.downloadPdf(invoice.id, invoice.invoiceNumber)
        : ZatcaInvoiceService.downloadXml(invoice.id, invoice.invoiceNumber);
    request.catch((error) => showErrorMessage(error)).finally(() => setDownloading(null));
  };

  const { errors, warnings } = invoice.messages;

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="grid gap-2">
              <p className="text-subTitle text-xs dark:text-white/70">
                {t.title} · {dict.eInvoices.documentTypes[invoice.documentType]}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-title text-xl font-bold dark:text-white" dir="ltr">
                  {invoice.invoiceNumber}
                </h1>
                <StatusChip status={invoice.status} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {invoice.canDownloadPdf && (
                <Button variant="bordered" className="h-9 rounded-lg" isLoading={downloading === "pdf"} onPress={() => download("pdf")}>
                  {dict.eInvoices.actions.downloadPdf}
                </Button>
              )}
              <Button variant="bordered" className="h-9 rounded-lg" isLoading={downloading === "xml"} onPress={() => download("xml")}>
                {dict.eInvoices.actions.downloadXml}
              </Button>
              {canUpdate && invoice.canRetry && (
                <Button className="bg-app-primary h-9 rounded-lg text-white" onPress={() => setRetry(invoice.id, { history: "push" })}>
                  {dict.eInvoices.actions.retry}
                </Button>
              )}
              {canUpdate && invoice.canReissue && (
                <Button className="bg-app-primary h-9 rounded-lg text-white" onPress={() => setReissue(invoice.id, { history: "push" })}>
                  {dict.eInvoices.actions.reissue}
                </Button>
              )}
              {canUpdate && invoice.canResendEmail && (
                <Button className="h-9 rounded-lg bg-[#4285F41A] text-[#4285F4]" onPress={() => setResend(invoice.id, { history: "push" })}>
                  {dict.eInvoices.actions.resendEmail}
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [t.amounts.taxExclusive, invoice.taxExclusiveAmount],
              [t.amounts.vat, invoice.vatAmount],
              [t.amounts.taxInclusive, invoice.taxInclusiveAmount],
            ].map(([label, amount]) => (
              <div key={label} className="grid gap-1 rounded-lg bg-[#F7F8FA] p-3 dark:bg-white/5">
                <span className="text-subTitle text-xs dark:text-white/70">{label}</span>
                <span className="text-title text-lg font-bold dark:text-white" dir="ltr">
                  {amount} SAR
                </span>
              </div>
            ))}
          </div>
          {(invoice.reissueOf || invoice.reissuedAs.length > 0 || invoice.subscription) && (
            <div className="grid gap-2">
              {invoice.subscription && (
                <Field
                  label={t.subscription}
                  value={[invoice.subscription.packageName, invoice.subscription.subscriptionNumber].filter(Boolean).join(" · ")}
                />
              )}
              {invoice.reissueOf && (
                <Field
                  label={t.reissueOf}
                  value={
                    <AppLink className="text-app-primary underline" href={`./${invoice.reissueOf.id}`}>
                      {invoice.reissueOf.invoiceNumber}
                    </AppLink>
                  }
                />
              )}
              {invoice.reissuedAs.map((r) => (
                <Field
                  key={r.id}
                  label={t.reissuedAs}
                  value={
                    <AppLink className="text-app-primary underline" href={`./${r.id}`}>
                      {r.invoiceNumber} ({dict.eInvoices.statuses[r.status]})
                    </AppLink>
                  }
                />
              ))}
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PartyCard title={t.seller} party={invoice.seller} />
          <PartyCard title={t.buyer} party={invoice.buyer} />
        </div>

        <Card title={`${t.zatcaErrors} / ${t.zatcaWarnings}`}>
          {errors.length === 0 && warnings.length === 0 && !invoice.lastError ? (
            <p className="text-subTitle text-xs dark:text-white/70">{t.noMessages}</p>
          ) : (
            <>
              <Messages title={t.zatcaErrors} items={errors} tone="error" />
              <Messages title={t.zatcaWarnings} items={warnings} tone="warning" />
              {invoice.lastError && errors.length === 0 && (
                <Field label={t.lastError} value={<span className="whitespace-pre-line">{invoice.lastError}</span>} ltr />
              )}
            </>
          )}
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title={t.timeline}>
            <Field label={t.issued} value={formatDateTime(invoice.issuedAt, t.notYet)} ltr />
            <Field label={t.submitted} value={formatDateTime(invoice.submittedAt, t.notYet)} ltr />
            <Field label={t.cleared} value={formatDateTime(invoice.clearedAt, t.notYet)} ltr />
            <Field label={t.emailed} value={formatDateTime(invoice.emailedAt, t.notYet)} ltr />
            <Field label={t.recipient} value={invoice.recipientEmail ?? t.notYet} ltr />
            <Field label={t.attempts} value={String(invoice.attempts)} />
          </Card>
          <Card title={t.technical}>
            <Field label={t.uuid} value={invoice.uuid} ltr />
            <Field label={t.icv} value={String(invoice.icv)} ltr />
            <Field label={t.invoiceHash} value={invoice.invoiceHash} ltr />
            <Field label={t.previousHash} value={invoice.previousHash} ltr />
          </Card>
        </div>
      </div>

      <ConfirmActionModal
        queryParamName={CONFIRM_PARAMS.retry}
        onConfirm={retry}
        busy={busy}
        title={dict.eInvoices.confirm.retryTitle}
        description={dict.eInvoices.confirm.retryDescription}
        confirmLabel={dict.eInvoices.actions.retry}
      />
      <ConfirmActionModal
        queryParamName={CONFIRM_PARAMS.reissue}
        onConfirm={reissue}
        busy={busy}
        title={dict.eInvoices.confirm.reissueTitle}
        description={dict.eInvoices.confirm.reissueDescription}
        confirmLabel={dict.eInvoices.actions.reissue}
      />
      <ConfirmActionModal
        queryParamName={CONFIRM_PARAMS.resend}
        onConfirm={resendEmail}
        busy={busy}
        title={dict.eInvoices.confirm.resendTitle}
        description={dict.eInvoices.confirm.resendDescription}
        confirmLabel={dict.eInvoices.actions.resendEmail}
      />
    </PageWrapper>
  );
};
