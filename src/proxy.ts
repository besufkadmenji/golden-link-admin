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

const preAuthPaths = (locale: string) => [`/${locale}/login`];

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
  const isLoggedIn = await getUser(request);
  if (!isLoggedIn) {
    if (!isPreAuthPath) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url),
      );
    }
  }

  if (isPreAuthPath && isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/dashboard`, request.url),
    );
  }

  return NextResponse.next();
}

const getUser = async (req: NextRequest) => {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return null;
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": getLocale(req) || fallbackLng,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
