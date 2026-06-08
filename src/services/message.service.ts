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
    params: GetMessagesParams
  ): Promise<MessagesResponse | null> {
    try {
      const response = await axiosClient.get("/messages", {
        params,
        headers: {
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
    id: string
  ): Promise<Message | null> {
    try {
      const response = await axiosClient.get(`/messages/${id}`);
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
    data: ReplyDto
  ): Promise<ReplyResponse | null> {
    try {
      const response = await axiosClient.post(`/messages/${id}/reply`, data);
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
