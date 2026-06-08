import axiosClient from "@/utils/axios.client";
import { extractAxiosErrorMessage, unwrapAxiosResponse } from "@/utils/http";
import {
  ClientsData,
  GetClientsParams,
  ClientDetail,
  CreateClientDto,
} from "@/types/client";

export class ClientService {
  static async getClients(
    params?: GetClientsParams
  ): Promise<ClientsData | null> {
    try {
      const response = await axiosClient.get("/clients", {
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

  static async getClientById(
    id: number
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.get(`/clients/${id}`);
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

  static async createClient(
    data: CreateClientDto
  ): Promise<ClientDetail | null> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("isActive", String(data.isActive));

      if (data.clientLogo) {
        formData.append("clientLogo", data.clientLogo);
      }

      const response = await axiosClient.post("/clients", formData, {
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

  static async updateClient(
    id: number,
    data: CreateClientDto
  ): Promise<ClientDetail | null> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("isActive", String(data.isActive));

      if (data.clientLogo) {
        formData.append("clientLogo", data.clientLogo);
      }

      const response = await axiosClient.put(`/clients/${id}`, formData, {
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

  static async deleteClient(
    id: number
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.delete(`/clients/${id}`);
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

  static async activateClient(
    id: number
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.patch(
        `/clients/${id}/activate`,
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

  static async deactivateClient(
    id: number,
    reason: string
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.patch(
        `/clients/${id}/deactivate`,
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
