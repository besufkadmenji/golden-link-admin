import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetMessagesParams,
  MessagesResponse,
  Message,
  ReplyDto,
  ReplyResponse,
} from "@/types/message";

export class MessageService {
  static async getMessages(
    params: GetMessagesParams,
    lang?: string,
  ): Promise<MessagesResponse | null> {
    try {
      const response = await axiosClient.get("/messages", {
        params,
        headers: {
          ...(lang ? { "Accept-Language": lang } : {}),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }

  static async getMessageById(
    id: string,
    lang?: string,
  ): Promise<Message | null> {
    try {
      const response = await axiosClient.get(`/messages/${id}`, {
        headers: {
          ...(lang ? { "Accept-Language": lang } : {}),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }

  static async replyToMessage(
    id: string,
    data: ReplyDto,
    lang?: string,
  ): Promise<ReplyResponse | null> {
    try {
      const response = await axiosClient.post(`/messages/${id}/reply`, data, {
        headers: {
          ...(lang ? { "Accept-Language": lang } : {}),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }
}
