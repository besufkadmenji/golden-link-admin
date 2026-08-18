import Cookie from "js-cookie";

type RefreshSessionData = {
  accessToken: string;
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
  user?: unknown;
};

type RefreshSessionResponse = {
  data?: RefreshSessionData | null;
};

let refreshPromise: Promise<string> | null = null;
let redirectingToLogin = false;

const cookieOptions = (expiry?: string) => ({
  path: "/",
  sameSite: "strict" as const,
  secure:
    typeof window !== "undefined" && window.location.protocol === "https:",
  ...(expiry ? { expires: new Date(expiry) } : {}),
});

function getAccessTokenExpiry(accessToken: string): string | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(normalizedPayload), (character) =>
      character.charCodeAt(0),
    );
    const decoded = JSON.parse(new TextDecoder().decode(bytes)) as {
      exp?: number;
    };

    return typeof decoded.exp === "number"
      ? new Date(decoded.exp * 1000).toISOString()
      : null;
  } catch {
    return null;
  }
}

export function storeAccessToken(
  accessToken: string,
  accessTokenExpiry?: string,
): void {
  if (typeof window === "undefined" || !accessToken) return;

  const expiry = accessTokenExpiry ?? getAccessTokenExpiry(accessToken);
  Cookie.set("accessToken", accessToken, cookieOptions(expiry ?? undefined));
  if (expiry) {
    Cookie.set("accessTokenExpiry", expiry, cookieOptions(expiry));
  }
}

export function storeRefreshTokenExpiry(refreshTokenExpiry?: string): void {
  if (typeof window === "undefined" || !refreshTokenExpiry) return;
  Cookie.set(
    "refreshTokenExpiry",
    refreshTokenExpiry,
    cookieOptions(refreshTokenExpiry),
  );
}

export function clearClientAuthState(): void {
  if (typeof window === "undefined") return;
  Cookie.remove("accessToken", { path: "/" });
  Cookie.remove("accessTokenExpiry", { path: "/" });
  Cookie.remove("refreshTokenExpiry", { path: "/" });
}

export function redirectToLogin(): void {
  if (typeof window === "undefined" || redirectingToLogin) return;
  redirectingToLogin = true;
  clearClientAuthState();

  const locale = window.location.pathname.split("/")[1] || "en";
  const loginPath = `/${locale}/login`;
  if (window.location.pathname !== loginPath) {
    window.location.replace(loginPath);
  }
}

export async function refreshAccessToken(): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Access tokens can only be refreshed in the browser.");
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch("/api/proxy/admin/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: "{}",
      });

      if (!response.ok) {
        throw new Error("Unable to refresh the admin session.");
      }

      const payload = (await response.json()) as
        RefreshSessionResponse | RefreshSessionData;
      const data =
        (payload as RefreshSessionResponse).data ??
        (payload as RefreshSessionData);
      if (!data?.accessToken) {
        throw new Error("Refresh response did not include an access token.");
      }

      storeAccessToken(data.accessToken, data.accessTokenExpiry);
      storeRefreshTokenExpiry(data.refreshTokenExpiry);
      return data.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function getValidAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return Cookie.get("accessToken") ?? null;
}

export function hasAccessToken(): boolean {
  return Boolean(Cookie.get("accessToken"));
}

export function hasRefreshSession(): boolean {
  const expiry = Cookie.get("refreshTokenExpiry");
  if (!expiry) return false;

  const expiryTime = Date.parse(expiry);
  return Number.isFinite(expiryTime) && expiryTime > Date.now();
}
