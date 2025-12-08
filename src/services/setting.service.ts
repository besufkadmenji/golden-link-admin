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
      console.error(
        "Error fetching settings:",
        extractAxiosErrorMessage(error, "Failed to fetch settings"),
      );
      return null;
    }
  }

  static async updateSetting(
    key: string,
    dto: UpdateSettingDto,
    lang?: string,
  ): Promise<Setting | null> {
    try {
      const response = await axiosClient.put<Setting>(
        `/settings/${key}`,
        dto,
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error updating setting:",
        extractAxiosErrorMessage(error, "Failed to update setting"),
      );
      return null;
    }
  }
}
