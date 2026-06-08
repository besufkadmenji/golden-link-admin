import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  GetSettingsParams,
  SettingsResponse,
  Setting,
  UpdateSettingDto,
} from "@/types/setting";

export class SettingService {
  static async getSettings(
    params?: GetSettingsParams
  ): Promise<SettingsResponse | null> {
    try {
      const response = await axiosClient.get<SettingsResponse>("/settings", {
        params,
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

  static async getSettingByKey(
    key: string
  ): Promise<Setting | null> {
    try {
      const response = await axiosClient.get<Setting>(`/settings/key/${key}`);
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

  static async updateSetting(
    key: string,
    dto: UpdateSettingDto
  ): Promise<Setting | null> {
    try {
      const response = await axiosClient.put<Setting>(
        `/settings/${key}/key`,
        dto,
      );
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
