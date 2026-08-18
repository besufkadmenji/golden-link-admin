import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getValidAccessToken,
  hasAccessToken,
  hasRefreshSession,
  redirectToLogin,
  refreshAccessToken,
  storeAccessToken,
} from "@/utils/auth.token";
import { getClientLocale } from "@/utils/locale.client";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const NON_REFRESHABLE_PATHS = [
  "/admin/auth/refresh-token",
  "/admin/auth/login",
  "/admin/auth/forgot-password",
  "/admin/auth/verify-reset-code",
  "/admin/auth/reset-password",
];

const canRefreshRequest = (config?: InternalAxiosRequestConfig): boolean => {
  const url = config?.url ?? "";
  return (
    (hasAccessToken() || hasRefreshSession()) &&
    !NON_REFRESHABLE_PATHS.some((path) => url.includes(path))
  );
};

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
  async (error: AxiosError) => {
    const newAccessToken = error.response?.headers["x-new-access-token"];
    if (typeof newAccessToken === "string" && newAccessToken) {
      storeAccessToken(newAccessToken);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      canRefreshRequest(originalRequest)
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch {
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
