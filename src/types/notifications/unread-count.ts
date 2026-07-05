import { ApiResponse } from "@/types/response";

export interface UnreadCountData {
  unreadCount: number;
}

export type UnreadCountResponse = ApiResponse<UnreadCountData>;
