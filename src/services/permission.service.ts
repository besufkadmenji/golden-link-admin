import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  PermissionsListResponse,
  GetPermissionsParams,
  AssignPermissionsRequest,
  AssignedPermissionsResponse,
  RevokePermissionRequest,
} from "@/types/permission";

export class PermissionService {
  /**
   * Get list of permissions with pagination
   */
  static async getPermissions(
    params?: GetPermissionsParams
  ): Promise<PermissionsListResponse | null> {
    try {
      const response = await axiosClient.get("/permissions", {
        params: { ...params, platform: "ADMIN" },
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
    data: AssignPermissionsRequest
  ): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.post("/permissions/assign", data);
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
   * Get the logged-in user's assigned permissions
   */
  static async getMyPermissions(): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.get("/permissions/user/me");
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
   * Get a user's assigned permissions (e.g. when editing another admin)
   */
  static async getUserPermissions(
    userId: string
  ): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.get(`/permissions/user/${userId}`);
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
   * Revoke a specific permission from a user
   */
  static async revokePermission(
    permissionId: string | number,
    data: RevokePermissionRequest
  ): Promise<AssignedPermissionsResponse | null> {
    try {
      const response = await axiosClient.post(
        `/permissions/revoke/${permissionId}`,
        data,
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
