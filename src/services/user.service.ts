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
    params?: GetUsersParams
  ): Promise<UsersListResponse | null> {
    try {
      const response = await axiosClient.get("/users", {
        params,
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
  static async getUserById(id: string): Promise<User | null> {
    try {
      const response = await axiosClient.get(`/users/${id}`);
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
    data: CreateUserWithFileDto
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
   * Delete user profile image
   * DELETE /users/:id/profile-image
   */
  static async deleteProfileImage(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/users/${id}/profile-image`);
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
    data: UpdateUserWithFileDto
  ): Promise<UserResponse | null> {
    try {

      if (data.profileImage) {
        const formData = new FormData();
        formData.append("profileImage", data.profileImage);

        if (data.fullName !== undefined) {
          formData.append("fullName", data.fullName);
        }
        if (data.email !== undefined) {
          formData.append("email", data.email);
        }
        if (data.countryCode !== undefined) {
          formData.append("countryCode", data.countryCode);
        }
        if (data.phoneNumber !== undefined) {
          formData.append("phoneNumber", data.phoneNumber);
        }
        if (data.status !== undefined) {
          formData.append("status", data.status);
        }

        const response = await axiosClient.put(`/users/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return unwrapAxiosResponse(response.data);
      }

      const { removeProfileImage, ...fields } = data;
      const payload = {
        ...fields,
        ...(removeProfileImage ? { profileImagePath: "" } : {}),
      };

      const response = await axiosClient.put(`/users/${id}`, payload);
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
    data?: DeactivateUserDto
  ): Promise<string> {
    try {
      const response = await axiosClient.post(
        `/users/${id}/deactivate`,
        data || {},
      );
      return response.data.message || "";
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
  static async activateUser(id: string): Promise<string> {
    try {
      const response = await axiosClient.post(
        `/users/${id}/activate`,
        {},
      );
      console.log("Activate user response:", response);
      return response.data.message || "";
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
  static async deleteUser(id: string): Promise<string> {
    try {
      const response = await axiosClient.delete(`/users/${id}`);
      return response.data.message || "";
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
