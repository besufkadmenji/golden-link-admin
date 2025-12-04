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
      console.error(
        "Error fetching permissions:",
        extractAxiosErrorMessage(error, "Failed to fetch permissions"),
      );
      return null;
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
      console.error(
        "Error assigning permissions:",
        extractAxiosErrorMessage(error, "Failed to assign permissions"),
      );
      return null;
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
      console.error(
        "Error fetching user permissions:",
        extractAxiosErrorMessage(error, "Failed to fetch user permissions"),
      );
      return null;
    }
  }
}
