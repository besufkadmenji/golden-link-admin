import axios, { AxiosError } from "axios";
import Cookie from "js-cookie";

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

  const accessToken = Cookie.get("accessToken");
  const refreshToken = Cookie.get("refreshToken");
  const accessTokenExpiry = Cookie.get("accessTokenExpiry");

  const bufferMs = 10_000;
  const isExpired = accessTokenExpiry
    ? new Date(accessTokenExpiry).getTime() - bufferMs <= Date.now()
    : false;

  try {
    let tokenToUse = accessToken;

    if (isExpired && refreshToken) {
      const res = await axios.post("/api/proxy/auth/refresh-token", {
        refreshToken,
      });
      Cookie.set("accessToken", res.data.accessToken);
      Cookie.set("accessTokenExpiry", res.data.accessTokenExpiry);
      tokenToUse = res.data.accessToken;
    }

    if (tokenToUse && config.headers) {
      config.headers.Authorization = `Bearer ${tokenToUse}`;
    }
  } catch (error) {}

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error),
);

export default axiosClient;
