import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "./config/i18n/settings";
acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)",
  ],
};

function getLocale(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";
  if (req.cookies.has("lng")) return req.cookies.get("lng")?.value;
  return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
}

const preAuthPaths = (locale: string) => [
  `/${locale}/login`,
  `/${locale}/forgot-password`,
  `/${locale}/verify-reset-code`,
  `/${locale}/reset-password`,
];

type RefreshPayload = {
  data?: {
    accessToken?: string;
    accessTokenExpiry?: string;
    refreshTokenExpiry?: string;
  } | null;
};

type ServerSession = {
  profile: unknown | null;
  accessToken?: string;
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
  refreshSetCookie?: string;
  clearCookies?: boolean;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentLocale = getLocale(request);
  const pathnameHasLocale =
    pathname.startsWith(`/${currentLocale}/`) ||
    pathname === `/${currentLocale}`;

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(
        `/${currentLocale}${pathname}${request.nextUrl.search}`,
        request.url,
      ),
    );
  }
  const isPreAuthPath = preAuthPaths(currentLocale ?? "ar").some(
    (path) => pathname === path,
  );
  const session = await resolveServerSession(request);
  const isLoggedIn = session.profile;
  const finalizeResponse = (response: NextResponse) =>
    applyServerSessionCookies(response, session);

  if (!isLoggedIn) {
    if (!isPreAuthPath) {
      return finalizeResponse(
        NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url)),
      );
    }
  }

  if (isPreAuthPath && isLoggedIn) {
    return finalizeResponse(
      NextResponse.redirect(
        new URL(`/${currentLocale}/dashboard`, request.url),
      ),
    );
  }

  return finalizeResponse(NextResponse.next());
}

const fetchAdminProfile = async (
  req: NextRequest,
  token: string,
): Promise<{ profile: unknown | null; status?: number }> => {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE_URL) return { profile: null };

  try {
    const response = await fetch(`${API_BASE_URL}/admin/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": getLocale(req) || fallbackLng,
      },
      cache: "no-store",
    });

    if (!response.ok) return { profile: null, status: response.status };

    return { profile: await response.json(), status: response.status };
  } catch {
    return { profile: null };
  }
};

const resolveServerSession = async (
  req: NextRequest,
): Promise<ServerSession> => {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (accessToken) {
    const currentSession = await fetchAdminProfile(req, accessToken);
    if (currentSession.profile || currentSession.status !== 401) {
      return { profile: currentSession.profile, accessToken };
    }
  }

  const refreshToken = req.cookies.get("adminRefreshToken")?.value;
  if (!refreshToken) {
    return { profile: null, accessToken };
  }

  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE_URL) return { profile: null, accessToken };

  try {
    const refreshResponse = await fetch(
      `${API_BASE_URL}/admin/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": getLocale(req) || fallbackLng,
          Cookie: `adminRefreshToken=${encodeURIComponent(refreshToken)}`,
        },
        body: "{}",
        cache: "no-store",
      },
    );

    if (!refreshResponse.ok) {
      return {
        profile: null,
        accessToken,
        clearCookies:
          refreshResponse.status >= 400 && refreshResponse.status < 500,
      };
    }

    const payload = (await refreshResponse.json()) as RefreshPayload;
    const refreshedSession = payload.data;
    if (!refreshedSession?.accessToken) {
      return { profile: null, accessToken, clearCookies: true };
    }

    const profileResponse = await fetchAdminProfile(
      req,
      refreshedSession.accessToken,
    );

    return {
      profile: profileResponse.profile,
      accessToken: refreshedSession.accessToken,
      accessTokenExpiry: refreshedSession.accessTokenExpiry,
      refreshTokenExpiry: refreshedSession.refreshTokenExpiry,
      refreshSetCookie: refreshResponse.headers.get("set-cookie") ?? undefined,
      clearCookies: profileResponse.status === 401,
    };
  } catch {
    return { profile: null, accessToken };
  }
};

const applyServerSessionCookies = (
  response: NextResponse,
  session: ServerSession,
): NextResponse => {
  if (session.clearCookies) {
    response.cookies.delete("accessToken");
    response.cookies.delete("accessTokenExpiry");
    response.cookies.delete("refreshTokenExpiry");
    response.cookies.delete("adminRefreshToken");
    return response;
  }

  if (!session.accessToken || !session.accessTokenExpiry) {
    return response;
  }

  const secure = process.env.NODE_ENV === "production";
  const accessTokenExpires = new Date(session.accessTokenExpiry);
  response.cookies.set("accessToken", session.accessToken, {
    path: "/",
    sameSite: "strict",
    secure,
    expires: accessTokenExpires,
  });
  response.cookies.set("accessTokenExpiry", session.accessTokenExpiry, {
    path: "/",
    sameSite: "strict",
    secure,
    expires: accessTokenExpires,
  });

  if (session.refreshTokenExpiry) {
    response.cookies.set("refreshTokenExpiry", session.refreshTokenExpiry, {
      path: "/",
      sameSite: "strict",
      secure,
      expires: new Date(session.refreshTokenExpiry),
    });
  }

  if (session.refreshSetCookie) {
    response.headers.append("set-cookie", session.refreshSetCookie);
  }

  return response;
};
