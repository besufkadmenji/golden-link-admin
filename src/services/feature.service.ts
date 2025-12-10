import {
    CreateFeatureDto,
    Feature,
    FeaturesData,
    GetFeaturesParams,
} from "@/types/feature";
import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";

export class FeatureService {
  static async getFeatures(
    params?: GetFeaturesParams,
    lang?: string,
  ): Promise<FeaturesData | null> {
    try {
      const response = await axiosClient.get("/features", {
        params,
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching features:",
        extractAxiosErrorMessage(error, "Failed to fetch features"),
      );
      return null;
    }
  }

  static async getFeatureById(
    id: number,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.get(`/features/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching feature:",
        extractAxiosErrorMessage(error, "Failed to fetch feature"),
      );
      return null;
    }
  }

  static async createFeature(
    data: CreateFeatureDto,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("nameAr", data.nameAr);
      formData.append("description", data.description);
      formData.append("descriptionAr", data.descriptionAr);
      formData.append("isActive", String(data.isActive));

      if (data.featurePhoto) {
        formData.append("featurePhoto", data.featurePhoto);
      }

      const response = await axiosClient.post("/features", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(lang && { "Accept-Language": lang }),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error creating feature:",
        extractAxiosErrorMessage(error, "Failed to create feature"),
      );
      return null;
    }
  }

  static async updateFeature(
    id: number,
    data: CreateFeatureDto,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("nameAr", data.nameAr);
      formData.append("description", data.description);
      formData.append("descriptionAr", data.descriptionAr);
      formData.append("isActive", String(data.isActive));

      if (data.featurePhoto) {
        formData.append("featurePhoto", data.featurePhoto);
      }

      const response = await axiosClient.put(`/features/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(lang && { "Accept-Language": lang }),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error updating feature:",
        extractAxiosErrorMessage(error, "Failed to update feature"),
      );
      return null;
    }
  }

  static async deleteFeature(
    id: number,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.delete(`/features/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error deleting feature:",
        extractAxiosErrorMessage(error, "Failed to delete feature"),
      );
      return null;
    }
  }

  static async activateFeature(
    id: number,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.patch(
        `/features/${id}/activate`,
        {},
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error activating feature:",
        extractAxiosErrorMessage(error, "Failed to activate feature"),
      );
      return null;
    }
  }

  static async deactivateFeature(
    id: number,
    reason: string,
    lang?: string,
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.patch(
        `/features/${id}/deactivate`,
        { reason },
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error deactivating feature:",
        extractAxiosErrorMessage(error, "Failed to deactivate feature"),
      );
      return null;
    }
  }
}
