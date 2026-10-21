import { useLang } from "@/hooks/useLang";
import { ZatcaInvoiceService } from "@/services/zatca-invoice.service";
import {
  GetZatcaInvoicesParams,
  ZatcaDocumentType,
  ZatcaInvoiceDetail,
  ZatcaInvoicesData,
  ZatcaInvoiceStatus,
} from "@/types/zatca-invoice";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

/** The shared FilterByDate writes a preset `period`; the e-invoice API takes a date range. */
const periodRange = (period: string): { start?: Date; end?: Date } => {
  const now = new Date();
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  // Weeks start on Sunday in Saudi Arabia.
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  switch (period) {
    case "CURRENT_WEEK":
      return { start: weekStart, end: endOfDay(now) };
    case "LAST_WEEK":
      return {
        start: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7),
        end: new Date(weekStart.getTime() - 1),
      };
    case "CURRENT_MONTH":
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfDay(now) };
    case "LAST_MONTH":
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        end: new Date(new Date(now.getFullYear(), now.getMonth(), 1).getTime() - 1),
      };
    case "CURRENT_YEAR":
      return { start: new Date(now.getFullYear(), 0, 1), end: endOfDay(now) };
    case "LAST_YEAR":
      return { start: new Date(now.getFullYear() - 1, 0, 1), end: new Date(new Date(now.getFullYear(), 0, 1).getTime() - 1) };
    default:
      return {};
  }
};

export const useEInvoiceParams = (): GetZatcaInvoicesParams => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [documentType] = useQueryState("documentType", parseAsString.withDefault(""));
  const [period] = useQueryState("period", parseAsString.withDefault("ALL"));
  const [startDate] = useQueryState("startDate", parseAsString.withDefault(""));
  const [endDate] = useQueryState("endDate", parseAsString.withDefault(""));

  const range =
    period === "CUSTOM" && startDate && endDate
      ? { start: new Date(startDate), end: new Date(new Date(endDate).setHours(23, 59, 59, 999)) }
      : periodRange(period);

  return {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status: status as ZatcaInvoiceStatus }),
    ...(documentType && { documentType: documentType as ZatcaDocumentType }),
    ...(range.start && { startDate: range.start.toISOString() }),
    ...(range.end && { endDate: range.end.toISOString() }),
  };
};

export const useEInvoices = (): UseQueryResult<ZatcaInvoicesData | null, Error> => {
  const params = useEInvoiceParams();
  const lang = useLang();
  return useQuery({
    queryKey: ["e-invoices", lang, params],
    queryFn: () => ZatcaInvoiceService.getInvoices(params),
  });
};

export const useEInvoice = (id: string): UseQueryResult<ZatcaInvoiceDetail | null, Error> => {
  const lang = useLang();
  return useQuery({
    queryKey: ["e-invoice", id, lang],
    queryFn: () => ZatcaInvoiceService.getInvoice(id),
    enabled: !!id,
  });
};
