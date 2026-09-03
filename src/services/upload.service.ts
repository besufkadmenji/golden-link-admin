import { UploadResult } from "@/types/upload";
import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";

export class UploadService {
  static async upload(
    file: File,
    fallbackMessage = "Unable to upload this file. Please try again.",
  ): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append("upload", file);

      const response = await axiosClient.post("/upload", formData);
      const result = unwrapAxiosResponse<UploadResult>(response.data);

      if (!result?.path) {
        throw new Error(fallbackMessage);
      }

      return result;
    } catch (error) {
      throw new Error(extractAxiosErrorMessage(error, fallbackMessage));
    }
  }
}
