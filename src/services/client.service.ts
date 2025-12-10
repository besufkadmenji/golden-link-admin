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
    params?: GetClientsParams,
    lang?: string,
  ): Promise<ClientsData | null> {
    try {
      const response = await axiosClient.get("/clients", {
        params,
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching clients:",
        extractAxiosErrorMessage(error, "Failed to fetch clients"),
      );
      return null;
    }
  }

  static async getClientById(
    id: number,
    lang?: string,
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.get(`/clients/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error fetching client:",
        extractAxiosErrorMessage(error, "Failed to fetch client"),
      );
      return null;
    }
  }

  static async createClient(
    data: CreateClientDto,
    lang?: string,
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
          ...(lang && { "Accept-Language": lang }),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error creating client:",
        extractAxiosErrorMessage(error, "Failed to create client"),
      );
      return null;
    }
  }

  static async updateClient(
    id: number,
    data: CreateClientDto,
    lang?: string,
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
          ...(lang && { "Accept-Language": lang }),
        },
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error updating client:",
        extractAxiosErrorMessage(error, "Failed to update client"),
      );
      return null;
    }
  }

  static async deleteClient(
    id: number,
    lang?: string,
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.delete(`/clients/${id}`, {
        headers: lang ? { "Accept-Language": lang } : {},
      });
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error deleting client:",
        extractAxiosErrorMessage(error, "Failed to delete client"),
      );
      return null;
    }
  }

  static async activateClient(
    id: number,
    lang?: string,
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.patch(
        `/clients/${id}/activate`,
        {},
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error activating client:",
        extractAxiosErrorMessage(error, "Failed to activate client"),
      );
      return null;
    }
  }

  static async deactivateClient(
    id: number,
    reason: string,
    lang?: string,
  ): Promise<ClientDetail | null> {
    try {
      const response = await axiosClient.patch(
        `/clients/${id}/deactivate`,
        { reason },
        {
          headers: lang ? { "Accept-Language": lang } : {},
        },
      );
      return unwrapAxiosResponse(response.data);
    } catch (error) {
      console.error(
        "Error deactivating client:",
        extractAxiosErrorMessage(error, "Failed to deactivate client"),
      );
      return null;
    }
  }
}
