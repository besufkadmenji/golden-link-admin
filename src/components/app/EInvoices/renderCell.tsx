import ViewIcon from "@/assets/icons/app/view.svg";
import { RowType } from "@/components/app/shared/tables/AppTable";
import Dictionary from "@/config/i18n/types";
import { ZatcaInvoiceStatus } from "@/types/zatca-invoice";
import { Button, Tooltip } from "@heroui/react";
import { Key, ReactNode } from "react";
import { StatusChip } from "./StatusChip";

const IconAction = ({ label, onPress, children }: { label: string; onPress: () => void; children: ReactNode }) => (
  <Tooltip content={label}>
    <Button
      isIconOnly
      aria-label={label}
      onPress={onPress}
      className="text-subTitle dark:text-dark-dashboard-title h-7 min-h-0 w-auto min-w-0 rounded bg-transparent px-1 text-[11px] font-semibold"
    >
      {children}
    </Button>
  </Tooltip>
);

export const renderCell = (
  row: RowType,
  column: Key,
  dict: Dictionary,
  action: {
    onView: () => void;
    onDownloadPdf?: () => void;
    onDownloadXml: () => void;
  },
) => {
  if (column === "action") {
    return (
      <div className="flex items-center justify-end gap-2">
        <IconAction label={dict.eInvoices.actions.view} onPress={action.onView}>
          <ViewIcon className="size-5" />
        </IconAction>
        {action.onDownloadPdf && (
          <IconAction label={dict.eInvoices.actions.downloadPdf} onPress={action.onDownloadPdf}>
            PDF
          </IconAction>
        )}
        <IconAction label={dict.eInvoices.actions.downloadXml} onPress={action.onDownloadXml}>
          XML
        </IconAction>
      </div>
    );
  }
  if (column === "status") {
    return (
      <div className="grid justify-items-center">
        <StatusChip status={row.status as ZatcaInvoiceStatus} />
      </div>
    );
  }
  if (column === "invoiceNumber") {
    return (
      <div className="grid w-max grid-cols-1 gap-1">
        <p className="text-title text-xs leading-4 font-semibold tracking-tight dark:text-white" dir="ltr">
          {row.invoiceNumber}
        </p>
        <p className="text-subTitle text-xs leading-4 tracking-tight dark:text-white/80">{row.documentType}</p>
      </div>
    );
  }
  if (column === "buyer") {
    return (
      <div className="grid max-w-[220px] grid-cols-1 gap-1">
        <p className="text-title text-xs leading-4 tracking-tight dark:text-white">{row.buyer}</p>
        <p className="text-subTitle text-xs leading-4 tracking-tight dark:text-white/80" dir="ltr">
          {row.buyerVat}
        </p>
      </div>
    );
  }
  if (column === "total") {
    return (
      <p className="text-xs font-semibold whitespace-nowrap" dir="ltr">
        {row.total} SAR
      </p>
    );
  }
  return <p className="max-w-[200px] break-all">{row[column as string]}</p>;
};
