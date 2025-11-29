import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  AdminLoginDto,
  AdminLoginResponse,
  AdminAuthData,
  AdminAuthPayload,
} from "@/types/admin.auth";

export interface AdminProfileResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: AdminAuthPayload;
}

export class AuthService {
  /**
   * Admin login endpoint
   * POST /admin/auth/login
   * @param data - Login credentials (email and password)
   * @param lang - Language preference (default: "en")
   * @returns Admin authentication data with tokens and user info
   */
  static async adminLogin(
    data: AdminLoginDto,
    lang: string = "en",
  ): Promise<AdminAuthData | null> {
    try {
      const response = await axiosClient.post<AdminLoginResponse>(
        "/admin/auth/login",
        data,
        {
          headers: {
            "Accept-Language": lang,
          },
        },
      );

      if (response.status === 204) {
        return null;
      }

      const result = unwrapAxiosResponse<AdminLoginResponse>(response);
      return result?.data || null;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to login as admin."),
      );
    }
  }

  /**
   * Get admin profile endpoint
   * GET /admin/auth/profile
   * @param lang - Language preference (default: "en")
   * @returns Admin profile information with JWT payload details
   */
  static async getAdminProfile(
    lang: string = "en",
  ): Promise<AdminAuthPayload | null> {
    try {
      const response = await axiosClient.get<AdminProfileResponse>(
        "/admin/auth/profile",
        {
          headers: {
            "Accept-Language": lang,
          },
        },
      );

      if (response.status === 204) {
        return null;
      }

      const result = unwrapAxiosResponse<AdminProfileResponse>(response);
      return result?.data || null;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to fetch admin profile."),
      );
    }
  }
}
