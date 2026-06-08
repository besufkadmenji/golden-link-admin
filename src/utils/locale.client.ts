import { fallbackLng, languages } from "@/config/i18n/settings";
import Cookie from "js-cookie";

export function getClientLocale(): string {
  if (typeof window === "undefined") {
    return fallbackLng;
  }

  const pathnameMatch = window.location.pathname.match(/^\/([^/]+)/);
  const pathLocale = pathnameMatch?.[1];
  if (pathLocale && languages.includes(pathLocale)) {
    return pathLocale;
  }

  const lngCookie = Cookie.get("lng");
  if (lngCookie && languages.includes(lngCookie)) {
    return lngCookie;
  }

  return fallbackLng;
}
