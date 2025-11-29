const FALLBACK_SITE_URL = "http://localhost:3000";

export const getSiteOrigin = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;

  if (!envUrl) {
    return FALLBACK_SITE_URL;
  }

  return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
};

export const buildProxyUrl = (path: string) => {
  const origin = getSiteOrigin();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!origin) {
    return normalizedPath;
  }

  return `${origin.replace(/\/$/, "")}${normalizedPath}`;
};
