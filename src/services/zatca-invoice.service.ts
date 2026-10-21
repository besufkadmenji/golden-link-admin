import axios from "axios";
import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetZatcaInvoicesParams,
  ZatcaInvoiceDetail,
  ZatcaInvoicesData,
} from "@/types/zatca-invoice";

const BASE = "/admin/zatca-invoices";
const FALLBACK = "Something went wrong, try again later.";

/** Re-issue refused because the subscriber's VAT number or national address is incomplete. */
export class MissingBuyerDataError extends Error {
  constructor(
    message: string,
    readonly missing: string[],
  ) {
    super(message);
  }
}

/** Blob responses carry JSON errors as a Blob; read them so the toast shows the API message. */
const blobErrorMessage = async (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
    try {
      const payload = JSON.parse(await error.response.data.text());
      if (payload?.message) return String(payload.message);
    } catch {
      // not JSON
    }
  }
  return extractAxiosErrorMessage(error, fallback);
};

const fileNameFrom = (disposition: unknown, fallback: string) => {
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(String(disposition ?? ""));
  return match ? decodeURIComponent(match[1]) : fallback;
};

const download = async (path: string, fallbackName: string, params?: object) => {
  try {
    const response = await axiosClient.get(path, { params, responseType: "blob" });
    const url = window.URL.createObjectURL(response.data as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileNameFrom(response.headers["content-disposition"], fallbackName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(await blobErrorMessage(error, FALLBACK));
  }
};

export class ZatcaInvoiceService {
  /** GET /admin/zatca-invoices */
  static async getInvoices(params?: GetZatcaInvoicesParams): Promise<ZatcaInvoicesData | null> {
    try {
      const response = await axiosClient.get(BASE, { params });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(extractAxiosErrorMessage(error, FALLBACK));
    }
  }

  /** GET /admin/zatca-invoices/:id */
  static async getInvoice(id: string): Promise<ZatcaInvoiceDetail | null> {
    try {
      const response = await axiosClient.get(`${BASE}/${id}`);
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(extractAxiosErrorMessage(error, FALLBACK));
    }
  }

  /** POST /admin/zatca-invoices/:id/retry */
  static async retry(id: string): Promise<void> {
    try {
      await axiosClient.post(`${BASE}/${id}/retry`);
    } catch (error) {
      throw new Error(extractAxiosErrorMessage(error, FALLBACK));
    }
  }

  /** POST /admin/zatca-invoices/:id/reissue: returns the new invoice */
  static async reissue(id: string): Promise<{ id: string; invoiceNumber: string } | null> {
    try {
      const response = await axiosClient.post(`${BASE}/${id}/reissue`);
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      const message = extractAxiosErrorMessage(error, FALLBACK);
      const missing = axios.isAxiosError(error) ? error.response?.data?.details?.missing : undefined;
      if (Array.isArray(missing)) throw new MissingBuyerDataError(message, missing);
      throw new Error(message);
    }
  }

  /** POST /admin/zatca-invoices/:id/resend-email */
  static async resendEmail(id: string): Promise<void> {
    try {
      await axiosClient.post(`${BASE}/${id}/resend-email`);
    } catch (error) {
      throw new Error(extractAxiosErrorMessage(error, FALLBACK));
    }
  }

  static downloadPdf(id: string, invoiceNumber: string) {
    return download(`${BASE}/${id}/pdf`, `${invoiceNumber}.pdf`);
  }

  static downloadXml(id: string, invoiceNumber: string) {
    return download(`${BASE}/${id}/xml`, `${invoiceNumber}.xml`);
  }

  static exportToExcel(params?: GetZatcaInvoicesParams) {
    // Export every matching invoice, not one page
    const filters = { ...params };
    delete filters.page;
    delete filters.limit;
    return download(`${BASE}/export`, "zatca-e-invoices.xlsx", filters);
  }
}
