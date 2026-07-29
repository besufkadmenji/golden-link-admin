import axios, { AxiosError } from "axios";
import { getValidAccessToken, storeAccessToken } from "@/utils/auth.token";
import { getClientLocale } from "@/utils/locale.client";

const axiosClient = axios.create({
  baseURL: "/api/proxy/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") return config;

  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
    }
  }

  if (config.headers) {
    config.headers["Accept-Language"] = getClientLocale();
  }

  const tokenToUse = await getValidAccessToken();

  if (tokenToUse && config.headers) {
    config.headers.Authorization = `Bearer ${tokenToUse}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-new-access-token"];
    if (typeof newAccessToken === "string" && newAccessToken) {
      storeAccessToken(newAccessToken);
    }

    return response;
  },
  (error: AxiosError) => {
    const newAccessToken = error.response?.headers["x-new-access-token"];
    if (typeof newAccessToken === "string" && newAccessToken) {
      storeAccessToken(newAccessToken);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
