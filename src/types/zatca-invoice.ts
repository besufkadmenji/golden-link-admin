// ZATCA e-invoices (admin API: /admin/zatca-invoices)

export type ZatcaInvoiceStatus =
  | "PENDING"
  | "CLEARED"
  | "CLEARED_WITH_WARNINGS"
  | "REJECTED"
  | "FAILED";

export type ZatcaDocumentType = "INVOICE" | "CREDIT_NOTE" | "DEBIT_NOTE";

export const ZATCA_INVOICE_STATUSES: ZatcaInvoiceStatus[] = [
  "PENDING",
  "CLEARED",
  "CLEARED_WITH_WARNINGS",
  "REJECTED",
  "FAILED",
];

export const ZATCA_DOCUMENT_TYPES: ZatcaDocumentType[] = [
  "INVOICE",
  "CREDIT_NOTE",
  "DEBIT_NOTE",
];

export interface ZatcaInvoiceRow {
  id: string;
  invoiceNumber: string;
  documentType: ZatcaDocumentType;
  status: ZatcaInvoiceStatus;
  issuedAt: string;
  clearedAt: string | null;
  emailedAt: string | null;
  attempts: number;
  /** Amounts in SAR, formatted with two decimals */
  taxExclusiveAmount: string;
  vatAmount: string;
  taxInclusiveAmount: string;
  buyer: { name: string; vatNumber: string };
  subscription: {
    id: string;
    subscriptionNumber: string;
    packageName: string | null;
  } | null;
  lastError: string | null;
  canRetry: boolean;
  canReissue: boolean;
  canResendEmail: boolean;
  canDownloadPdf: boolean;
}

export interface ZatcaParty {
  registrationName: string;
  vatNumber?: string;
  crn?: string;
  address: {
    street: string;
    buildingNumber: string;
    additionalNumber?: string;
    district: string;
    city: string;
    postalCode: string;
    countryCode: string;
  };
}

export interface ZatcaMessage {
  code: string;
  message: string;
}

export interface ZatcaInvoiceDetail extends Omit<ZatcaInvoiceRow, "buyer"> {
  uuid: string;
  icv: number;
  previousHash: string;
  invoiceHash: string;
  submittedAt: string | null;
  seller: ZatcaParty;
  buyer: ZatcaParty;
  recipientEmail: string | null;
  messages: { errors: ZatcaMessage[]; warnings: ZatcaMessage[] };
  reissueOf: { id: string; invoiceNumber: string } | null;
  reissuedAs: { id: string; invoiceNumber: string; status: ZatcaInvoiceStatus }[];
}

export interface ZatcaInvoicePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type ZatcaInvoiceSummary = Record<ZatcaInvoiceStatus, number>;

export interface ZatcaInvoicesData {
  invoices: ZatcaInvoiceRow[];
  pagination: ZatcaInvoicePagination;
  summary: ZatcaInvoiceSummary;
}

export interface GetZatcaInvoicesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ZatcaInvoiceStatus;
  documentType?: ZatcaDocumentType;
  startDate?: string;
  endDate?: string;
  sortBy?: "issuedAt" | "invoiceNumber" | "taxInclusiveAmount";
  sortOrder?: "asc" | "desc";
}
