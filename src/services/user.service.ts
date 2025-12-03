import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  User,
  UsersListResponse,
  GetUsersParams,
  CreateUserDto,
  UpdateUserDto,
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
      return unwrapAxiosResponse(response);
    } catch (error) {
      console.error(
        "Error fetching user:",
        extractAxiosErrorMessage(error, "Failed to fetch user"),
      );
      return null;
    }
  }

  /**
   * Create a new user
   */
  static async createUser(
    data: CreateUserDto,
    lang?: string,
  ): Promise<UserResponse | null> {
    try {
      const response = await axiosClient.post("/users", data, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response);
    } catch (error) {
      console.error(
        "Error creating user:",
        extractAxiosErrorMessage(error, "Failed to create user"),
      );
      return null;
    }
  }

  /**
   * Update user information
   */
  static async updateUser(
    id: string,
    data: UpdateUserDto,
    lang?: string,
  ): Promise<UserResponse | null> {
    try {
      const response = await axiosClient.patch(`/users/${id}`, data, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response);
    } catch (error) {
      console.error(
        "Error updating user:",
        extractAxiosErrorMessage(error, "Failed to update user"),
      );
      return null;
    }
  }

  /**
   * Deactivate user with optional reason
   */
  static async deactivateUser(
    id: string,
    data?: DeactivateUserDto,
    lang?: string,
  ): Promise<boolean | null> {
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
      return null;
    }
  }

  /**
   * Delete user permanently
   */
  static async deleteUser(id: string, lang?: string): Promise<boolean | null> {
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
      return null;
    }
  }
}
