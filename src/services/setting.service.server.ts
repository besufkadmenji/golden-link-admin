import { PublicSettingValue } from "@/types/setting";

export const getPublicSettingServerSide = async <TValue = string | object>(
  key: string,
  lang: string,
): Promise<PublicSettingValue<TValue> | null> => {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/settings/value/${key}`,
      {
        headers: { "Accept-Language": lang },
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    if (!payload || typeof payload !== "object") {
      return null;
    }

    const setting =
      "data" in payload ? (payload as { data?: unknown }).data : payload;

    return setting && typeof setting === "object"
      ? (setting as PublicSettingValue<TValue>)
      : null;
  } catch {
    return null;
  }
};

export const getHeaderLogoPathServerSide = async (lang: string) => {
  const setting = await getPublicSettingServerSide<string>("header_logo", lang);

  return typeof setting?.value === "string" ? setting.value : null;
};
