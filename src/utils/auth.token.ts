import Cookie from "js-cookie";

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

  Cookie.set("accessToken", accessToken);

  const expiry = accessTokenExpiry ?? getAccessTokenExpiry(accessToken);
  if (expiry) {
    Cookie.set("accessTokenExpiry", expiry);
  }
}

export async function getValidAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return Cookie.get("accessToken") ?? null;
}

export function hasAccessToken(): boolean {
  return Boolean(Cookie.get("accessToken"));
}
