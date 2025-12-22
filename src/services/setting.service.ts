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
    params?: GetSettingsParams,
    lang?: string,
  ): Promise<SettingsResponse | null> {
    try {
      const response = await axiosClient.get<SettingsResponse>("/settings", {
        params,
        headers: lang ? { "Accept-Language": lang } : {},
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
    key: string,
    lang?: string,
  ): Promise<Setting | null> {
    try {
      const response = await axiosClient.get<Setting>(`/settings/key/${key}`, {
        headers: lang ? { "Accept-Language": lang } : {},
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

  static async updateSetting(
    key: string,
    dto: UpdateSettingDto,
    lang?: string,
  ): Promise<Setting | null> {
    try {
      const response = await axiosClient.put<Setting>(
        `/settings/${key}/key`,
        dto,
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
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
