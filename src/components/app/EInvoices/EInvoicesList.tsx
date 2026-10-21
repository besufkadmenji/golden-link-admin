import { NoData, NoDataType } from "@/components/app/shared/NoData";
import { useDict } from "@/hooks/useDict";
import { ZatcaInvoiceService } from "@/services/zatca-invoice.service";
import { DateTimeHelpers } from "@/utils/date.time.helpers";
import { showErrorMessage } from "@/utils/show.message";
import { usePathname, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { Key, ReactNode } from "react";
import { AppTable, ColumnType, RowType } from "../shared/tables/AppTable";
import { AppTableSkeleton } from "../shared/tables/AppTableSkeleton";
import { renderCell } from "./renderCell";
import { useEInvoices } from "./useEInvoices";

export const EInvoicesList = () => {
  const dict = useDict();
  const { data, isLoading } = useEInvoices();
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const router = useRouter();
  const pathname = usePathname();
  const headers = dict.eInvoices.table;

  const columns: ColumnType[] = [
    { key: "invoiceNumber", label: headers.invoiceNumber },
    { key: "buyer", label: headers.buyer },
    { key: "subscription", label: headers.subscription },
    { key: "issuedAt", label: headers.issuedAt, align: "center" },
    { key: "total", label: headers.total, align: "center" },
    { key: "status", label: headers.status, align: "center" },
    { key: "action", label: headers.actions, align: "center" },
  ];

  const download = (promise: Promise<void>) => promise.catch((error) => showErrorMessage(error));

  return isLoading ? (
    <AppTableSkeleton columns={columns.length} rows={10} />
  ) : !data || data.invoices.length === 0 ? (
    <NoData type={NoDataType.EInvoices} />
  ) : (
    <AppTable
      label="E-Invoices"
      columns={columns}
      rows={data.invoices.map((invoice) => ({
        key: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        documentType: dict.eInvoices.documentTypes[invoice.documentType],
        buyer: invoice.buyer.name,
        buyerVat: invoice.buyer.vatNumber,
        subscription: invoice.subscription
          ? [invoice.subscription.packageName, invoice.subscription.subscriptionNumber].filter(Boolean).join(" · ")
          : "—",
        issuedAt: DateTimeHelpers.formatDate(invoice.issuedAt),
        total: invoice.taxInclusiveAmount,
        status: invoice.status,
        canDownloadPdf: invoice.canDownloadPdf ? "true" : "",
      }))}
      renderCell={(row: RowType, column: Key): ReactNode =>
        renderCell(row, column, dict, {
          onView: () => router.push(`${pathname}/${row.key}`),
          onDownloadPdf: row.canDownloadPdf
            ? () => download(ZatcaInvoiceService.downloadPdf(row.key, row.invoiceNumber))
            : undefined,
          onDownloadXml: () => download(ZatcaInvoiceService.downloadXml(row.key, row.invoiceNumber)),
        })
      }
      pagination={{
        page: data.pagination.currentPage,
        total: data.pagination.totalPages,
        onChange: (p) => setPage(p, { history: "push" }),
      }}
    />
  );
};
