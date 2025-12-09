import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  AdminLoginDto,
  AdminLoginResponse,
  AdminAuthData,
  AdminAuthPayload,
  ForgotPasswordDto,
  ForgotPasswordResponse,
  ForgotPasswordData,
  VerifyResetCodeDto,
  VerifyResetCodeResponse,
  VerifyResetCodeData,
  ResetPasswordDto,
  ResetPasswordResponse,
  ChangePasswordDto,
  ChangePasswordResponse,
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

  /**
   * Forgot password endpoint
   * POST /admin/auth/forgot-password
   * @param data - Email address for password reset
   * @param lang - Language preference (default: "en")
   * @returns Session ID for password reset flow
   */
  static async forgotPassword(
    data: ForgotPasswordDto,
    lang: string = "en",
  ): Promise<ForgotPasswordData | null> {
    try {
      const response = await axiosClient.post<ForgotPasswordResponse>(
        "/admin/auth/forgot-password",
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

      const result = unwrapAxiosResponse<ForgotPasswordResponse>(response);
      return result?.data || null;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to send password reset code."),
      );
    }
  }

  /**
   * Verify reset code endpoint
   * POST /admin/auth/verify-reset-code
   * @param data - Email, verification code, and session ID
   * @param lang - Language preference (default: "en")
   * @returns Verified session ID for password reset completion
   */
  static async verifyResetCode(
    data: VerifyResetCodeDto,
    lang: string = "en",
  ): Promise<VerifyResetCodeData | null> {
    try {
      const response = await axiosClient.post<VerifyResetCodeResponse>(
        "/admin/auth/verify-reset-code",
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

      const result = unwrapAxiosResponse<VerifyResetCodeResponse>(response);
      return result?.data || null;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to verify reset code."),
      );
    }
  }

  /**
   * Reset password endpoint
   * POST /admin/auth/reset-password
   * @param data - Email, new password, confirm password, and session ID
   * @param lang - Language preference (default: "en")
   * @returns null on successful password reset
   */
  static async resetPassword(
    data: ResetPasswordDto,
    lang: string = "en",
  ): Promise<boolean> {
    try {
      const response = await axiosClient.post<ResetPasswordResponse>(
        "/admin/auth/reset-password",
        data,
        {
          headers: {
            "Accept-Language": lang,
          },
        },
      );

      if (response.status === 200) {
        return true;
      }

      unwrapAxiosResponse<ResetPasswordResponse>(response);
      return false;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to reset password."),
      );
    }
  }

  /**
   * Change password endpoint
   * POST /admin/auth/change-password
   * @param data - Current password, new password, and confirm password
   * @param lang - Language preference (default: "en")
   * @returns true on successful password change
   */
  static async changePassword(
    data: ChangePasswordDto,
    lang: string = "en",
  ): Promise<boolean> {
    try {
      const response = await axiosClient.post<ChangePasswordResponse>(
        "/admin/auth/change-password",
        data,
        {
          headers: {
            "Accept-Language": lang,
          },
        },
      );

      if (response.status === 200) {
        return true;
      }

      unwrapAxiosResponse<ChangePasswordResponse>(response);
      return false;
    } catch (error) {
      throw new Error(
        extractAxiosErrorMessage(error, "Failed to change password."),
      );
    }
  }
}
