import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  PermissionsListResponse,
  GetPermissionsParams,
  AssignPermissionsRequest,
  AssignedPermissionsResponse,
} from "@/types/permission";

export class PermissionService {
  /**
   * Get list of permissions with pagination
   */
  static async getPermissions(
    params?: GetPermissionsParams,
    lang?: string,
  ): Promise<PermissionsListResponse | null> {
    try {
      const response = await axiosClient.get("/permissions", {
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

  /**
   * Assign permissions to a user
   */
  static async assignPermissions(
    data: AssignPermissionsRequest,
    lang?: string,
  ): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.post("/permissions/assign", data, {
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

  /**
   * Get user's assigned permissions
   */
  static async getUserPermissions(
    userId: string,
    lang?: string,
  ): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.get(`/permissions/user/${userId}`, {
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
}
