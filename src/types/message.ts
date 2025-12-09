export type MessageType = "REQUEST" | "SUGGESTION" | "INQUIRY" | "COMPLAINT" | "OTHER";
export type MessageStatus = "NOT_REPLIED" | "REPLIED";
export type SortOrder = "asc" | "desc";

export interface Message {
  id: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  messageType: MessageType;
  messageContent: string;
  status: MessageStatus;
  countryCode: string;
  replyContent: string | null;
  repliedBy: string | null;
  repliedAt: string | null;
  createdAt: string;
  updatedAt: string;
  replier: {
    id: string;
    fullName: string;
    email: string;
  } | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface MessagesResponse {
  messages: Message[];
  pagination: Pagination;
}

export interface GetMessagesParams {
  page?: number;
  limit?: number;
  search?: string;
  messageType?: MessageType;
  status?: MessageStatus;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface ReplyDto {
  replyContent: string;
}

export interface ReplyResponse {
  success: boolean;
  messageId: string;
  emailSent: boolean;
}
