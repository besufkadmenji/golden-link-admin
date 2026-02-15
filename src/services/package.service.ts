import {
  CreatePackageDto,
  GetPackagesParams,
  Package,
  PackagesListResponse,
  UpdatePackageDto,
} from "@/types/package";
import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";

export class PackageService {
  /**
   * Get list of packages with optional search and pagination
   * GET /packages
   */
  static async getPackages(
    params?: GetPackagesParams,
    lang?: string,
  ): Promise<PackagesListResponse | null> {
    try {
      const response = await axiosClient.get("/packages", {
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
   * Get package details by ID
   * GET /packages/:id
   */
  static async getPackageById(
    id: string | number,
    lang?: string,
  ): Promise<Package | null> {
    try {
      const response = await axiosClient.get(`/packages/${id}`, {
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
   * Create a new package with FormData support for icon upload
   * POST /packages
   */
  static async createPackage(
    data: CreatePackageDto,
    lang?: string,
  ): Promise<Package | null> {
    try {
      const formData = new FormData();

      // Append required fields
      formData.append("packageName", data.packageName);
      formData.append("packageDuration", String(data.packageDuration));
      formData.append("packagePrice", String(data.packagePrice));

      // Handle features - if it's an object, stringify it
      const featuresValue =
        typeof data.features === "string"
          ? data.features
          : JSON.stringify(data.features);
      formData.append("features", featuresValue);

      // Append optional fields
      if (data.status) {
        formData.append("status", data.status);
      }
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.maxWarehouses !== undefined) {
        formData.append("maxWarehouses", String(data.maxWarehouses));
      }
      if (data.maxUsers !== undefined) {
        formData.append("maxUsers", String(data.maxUsers));
      }

      // Append icon if provided
      if (data.icon) {
        formData.append("icon", data.icon);
      }

      const response = await axiosClient.post("/packages", formData, {
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
   * Update a package with FormData support for icon upload
   * PUT /packages/:id
   */
  static async updatePackage(
    id: string | number,
    data: UpdatePackageDto,
    lang?: string,
  ): Promise<Package | null> {
    try {
      const formData = new FormData();

      // Append optional fields in order
      if (data.packageName) {
        formData.append("packageName", data.packageName);
      }
      if (data.packageDuration !== undefined) {
        formData.append("packageDuration", String(data.packageDuration));
      }
      if (data.packagePrice !== undefined) {
        formData.append("packagePrice", String(data.packagePrice));
      }
      if (data.features) {
        const featuresValue =
          typeof data.features === "string"
            ? data.features
            : JSON.stringify(data.features);
        formData.append("features", featuresValue);
      }
      if (data.status) {
        formData.append("status", data.status);
      }
      if (data.description !== undefined) {
        formData.append("description", data.description);
      }
      if (data.maxWarehouses !== undefined) {
        formData.append("maxWarehouses", String(data.maxWarehouses));
      }
      if (data.maxUsers !== undefined) {
        formData.append("maxUsers", String(data.maxUsers));
      }

      // Append icon if provided
      if (data.icon) {
        formData.append("icon", data.icon);
      }

      const response = await axiosClient.put(`/packages/${id}`, formData, {
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
   * Delete a package
   * DELETE /packages/:id
   */
  static async deletePackage(
    id: string | number,
    lang?: string,
  ): Promise<void> {
    try {
      await axiosClient.delete(`/packages/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
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
   * Toggle package status (ACTIVE/INACTIVE)
   * PATCH /packages/:id/status
   */
  static async togglePackageStatus(
    id: string | number,
    status: "ACTIVE" | "INACTIVE",
    lang?: string,
  ): Promise<Package | null> {
    try {
      const response = await axiosClient.patch(
        `/packages/${id}/status`,
        { status },
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
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
