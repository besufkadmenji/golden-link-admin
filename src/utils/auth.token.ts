import axios from "axios";
import Cookie from "js-cookie";
import { getClientLocale } from "@/utils/locale.client";

const TOKEN_BUFFER_MS = 10_000;

export async function getValidAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const accessToken = Cookie.get("accessToken");
  const refreshToken = Cookie.get("refreshToken");
  const accessTokenExpiry = Cookie.get("accessTokenExpiry");

  const isExpired = accessTokenExpiry
    ? new Date(accessTokenExpiry).getTime() - TOKEN_BUFFER_MS <= Date.now()
    : false;

  try {
    let tokenToUse = accessToken;

    if (isExpired && refreshToken) {
      const res = await axios.post(
        "/api/proxy/auth/refresh-token",
        { refreshToken },
        {
          headers: {
            "Accept-Language": getClientLocale(),
          },
        },
      );
      Cookie.set("accessToken", res.data.accessToken);
      Cookie.set("accessTokenExpiry", res.data.accessTokenExpiry);
      tokenToUse = res.data.accessToken;
    }

    return tokenToUse ?? null;
  } catch {
    return accessToken ?? null;
  }
}

export function hasAccessToken(): boolean {
  return Boolean(Cookie.get("accessToken"));
}
