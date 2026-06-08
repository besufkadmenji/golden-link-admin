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
    params?: GetFeaturesParams
  ): Promise<FeaturesData | null> {
    try {
      const response = await axiosClient.get("/features", {
        params,
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

  static async getFeatureById(
    id: number
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.get(`/features/${id}`);
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

  static async createFeature(
    data: CreateFeatureDto
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

  static async updateFeature(
    id: number,
    data: CreateFeatureDto
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

  static async deleteFeature(
    id: number
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.delete(`/features/${id}`);
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

  static async activateFeature(
    id: number
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.patch(
        `/features/${id}/activate`,
        {},
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

  static async deactivateFeature(
    id: number,
    reason: string
  ): Promise<Feature | null> {
    try {
      const response = await axiosClient.patch(
        `/features/${id}/deactivate`,
        { reason },
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
