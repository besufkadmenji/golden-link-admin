import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  User,
  UsersListResponse,
  GetUsersParams,
  CreateUserWithFileDto,
  UpdateUserWithFileDto,
  DeactivateUserDto,
  UserResponse,
} from "@/types/user";

export class UserService {
  /**
   * Get list of users with optional search and pagination
   */
  static async getUsers(
    params?: GetUsersParams,
    lang?: string,
  ): Promise<UsersListResponse | null> {
    try {
      const response = await axiosClient.get("/users", {
        params,
        headers: lang ? { "Accept-Language": lang } : {},
      });
      console.log("Users response:", response);
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        extractAxiosErrorMessage(error, "Failed to fetch users"),
      );
      return null;
    }
  }

  /**
   * Get user details by ID
   */
  static async getUserById(id: string, lang?: string): Promise<User | null> {
    try {
      const response = await axiosClient.get(`/users/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching user:",
        extractAxiosErrorMessage(error, "Failed to fetch user"),
      );
      return null;
    }
  }

  /**
   * Create a new user with FormData support for file upload
   */
  static async createUser(
    data: CreateUserWithFileDto,
    lang?: string,
  ): Promise<UserResponse | null> {
    try {
      const formData = new FormData();

      // Append file if provided
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }

      // Append form fields
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("countryCode", data.countryCode);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      if (data.permissionType) {
        formData.append("permissionType", data.permissionType);
      }

      const response = await axiosClient.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(lang ? { "Accept-Language": lang } : {}),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error creating user:",
        extractAxiosErrorMessage(error, "Failed to create user"),
      );
      return null;
    }
  }

  /**
   * Update user information with FormData support for file upload
   */
  static async updateUser(
    id: string,
    data: UpdateUserWithFileDto,
    lang?: string,
  ): Promise<UserResponse | null> {
    try {
      const formData = new FormData();

      // Append file if provided
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }

      // Append form fields
      if (data.fullName) {
        formData.append("fullName", data.fullName);
      }
      if (data.email) {
        formData.append("email", data.email);
      }
      if (data.countryCode) {
        formData.append("countryCode", data.countryCode);
      }
      if (data.phoneNumber) {
        formData.append("phoneNumber", data.phoneNumber);
      }
      if (data.status) {
        formData.append("status", data.status);
      }

      const response = await axiosClient.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(lang ? { "Accept-Language": lang } : {}),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error updating user:",
        extractAxiosErrorMessage(error, "Failed to update user"),
      );
      throw error;
    }
  }

  /**
   * Deactivate user with optional reason
   */
  static async deactivateUser(
    id: string,
    data?: DeactivateUserDto,
    lang?: string,
  ): Promise<boolean> {
    try {
      await axiosClient.post(`/users/${id}/deactivate`, data || {}, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return true;
    } catch (error) {
      console.error(
        "Error deactivating user:",
        extractAxiosErrorMessage(error, "Failed to deactivate user"),
      );
      return false;
    }
  }

  /**
   * Activate user
   */
  static async activateUser(id: string, lang?: string): Promise<boolean> {
    try {
      await axiosClient.post(
        `/users/${id}/activate`,
        {},
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return true;
    } catch (error) {
      console.error(
        "Error activating user:",
        extractAxiosErrorMessage(error, "Failed to activate user"),
      );
      return false;
    }
  }

  /**
   * Delete user permanently
   */
  static async deleteUser(id: string, lang?: string): Promise<boolean> {
    try {
      await axiosClient.delete(`/users/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return true;
    } catch (error) {
      console.error(
        "Error deleting user:",
        extractAxiosErrorMessage(error, "Failed to delete user"),
      );
      return false;
    }
  }
}
