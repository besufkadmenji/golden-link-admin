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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      formData.append("status", data.status);

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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
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
      throw new Error(
        extractAxiosErrorMessage(
          error,
          "Something went wrong, try again later.",
        ),
      );
    }
  }
}
