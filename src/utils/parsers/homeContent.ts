import {
  ClientLogo,
  ClientsSectionContent,
  FeatureItem,
  HeaderButtonMap,
  HomePageContent,
  NavigationMenuItem,
  PricingPackage,
  SocialMediaLinks,
} from "@/types/home";

export type RawSettings = Record<string, unknown>;

export interface RawSettingEntry {
  key?: unknown;
  value?: unknown;
  [key: string]: unknown;
}

export type RawSettingsInput =
  | RawSettings
  | RawSettingEntry[]
  | null
  | undefined;

type SharpModule = typeof import("sharp");

let sharpModule: SharpModule | null = null;
const imageDimensionCache = new Map<
  string,
  { width: number; height: number }
>();

const loadSharp = async (): Promise<SharpModule> => {
  if (sharpModule) {
    return sharpModule;
  }
  const mod = await import("sharp");
  sharpModule = (mod.default ?? mod) as SharpModule;
  return sharpModule;
};

const parseMaybeJson = (value: unknown): unknown => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    const looksJson =
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"));

    if (looksJson) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return value;
      }
    }
  }

  return value;
};

const ensureString = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
};

const ensureNumber = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const coercePositiveNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return undefined;
};

const ensureArray = <T>(value: unknown): T[] => {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed)) {
    return parsed as T[];
  }
  return [];
};

const ensureRecord = (value: unknown): Record<string, unknown> => {
  const parsed = parseMaybeJson(value);
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    return parsed as Record<string, unknown>;
  }
  return {};
};

const ensureLocalizedString = (value: unknown, lang: string): string => {
  const parsed = parseMaybeJson(value);

  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const record = parsed as Record<string, unknown>;
    const localizedValue = record[lang];
    if (typeof localizedValue === "string" && localizedValue.trim()) {
      return localizedValue;
    }

    const fallbackEntry = Object.values(record).find(
      (val): val is string => typeof val === "string" && val.trim().length > 0,
    );
    if (fallbackEntry) {
      return fallbackEntry;
    }
  }

  if (Array.isArray(parsed)) {
    return parsed
      .map((item) => ensureString(item))
      .filter(Boolean)
      .join(" ");
  }

  return ensureString(parsed);
};

const resolveLocalizedField = (
  record: Record<string, unknown>,
  key: string,
  lang: string,
): string => {
  const normalizedLang = lang.toLowerCase();
  const capitalized =
    normalizedLang.charAt(0).toUpperCase() + normalizedLang.slice(1);
  const variants = [
    `${key}${capitalized}`,
    `${key}${normalizedLang.toUpperCase()}`,
    `${key}_${normalizedLang}`,
    `${key}-${normalizedLang}`,
  ];

  for (const variantKey of variants) {
    if (variantKey in record) {
      const value = record[variantKey];
      if (value !== undefined && value !== null) {
        const resolved = ensureLocalizedString(value, lang);
        if (resolved) {
          return resolved;
        }
      }
    }
  }

  const baseValue = record[key];
  if (baseValue !== undefined && baseValue !== null) {
    return ensureLocalizedString(baseValue, lang);
  }

  return "";
};

const normalizeSettings = (input: RawSettingsInput): RawSettings => {
  if (Array.isArray(input)) {
    return input.reduce<RawSettings>((acc, entry) => {
      if (entry && typeof entry === "object") {
        const { key, value } = entry as RawSettingEntry;
        if (typeof key === "string" && key.length > 0) {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
  }

  if (input && typeof input === "object") {
    return input as RawSettings;
  }

  return {};
};

const getImageDimensions = async (
  url: string,
): Promise<{ width: number; height: number } | null> => {
  if (typeof window !== "undefined") {
    // Avoid running heavy image processing on the client.
    return null;
  }

  if (
    typeof process !== "undefined" &&
    (!process.versions || !process.versions.node)
  ) {
    return null;
  }

  if (typeof url !== "string" || url.trim().length === 0) {
    return null;
  }

  const normalizedUrl = url.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    return null;
  }

  const cached = imageDimensionCache.get(normalizedUrl);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(normalizedUrl, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sharp = await loadSharp();
    const metadata = await sharp(buffer).metadata();

    if (metadata.width && metadata.height) {
      const dimensions = { width: metadata.width, height: metadata.height };
      imageDimensionCache.set(normalizedUrl, dimensions);
      return dimensions;
    }
  } catch (error) {
  }

  return null;
};

const ensureStringArray = (value: unknown): string[] => {
  const parsed = parseMaybeJson(value);
  if (Array.isArray(parsed)) {
    return parsed.map((item) => ensureString(item)).filter(Boolean);
  }
  if (typeof parsed === "string" && parsed.trim().length > 0) {
    return parsed
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
};

const parseHeaderButtons = (value: unknown, lang: string): HeaderButtonMap => {
  const record = ensureRecord(value);
  const buttons: HeaderButtonMap = {};
  Object.entries(record).forEach(([key, val]) => {
    buttons[key] = ensureLocalizedString(val, lang);
  });
  return buttons;
};

const parseNavigationMenu = (
  value: unknown,
  lang: string,
): NavigationMenuItem[] => {
  const items = ensureArray<Record<string, unknown>>(value);
  return items.map((item) => ({
    label: ensureLocalizedString(item.label, lang),
    href: ensureString(item.href),
    order:
      item.order !== undefined && item.order !== null
        ? ensureNumber(item.order)
        : undefined,
    external: typeof item.external === "boolean" ? item.external : undefined,
    icon: item.icon ? ensureString(item.icon) : undefined,
  }));
};

const parseFeatures = (value: unknown, lang: string): FeatureItem[] => {
  const items = ensureArray<Record<string, unknown>>(value);
  return items.map((item) => ({
    id: item.id ? ensureString(item.id) : undefined,
    title:
      resolveLocalizedField(item, "title", lang) ||
      resolveLocalizedField(item, "name", lang),
    description: resolveLocalizedField(item, "description", lang),
    icon: ensureString(item.icon),
  }));
};

const parsePricingFeatures = (value: unknown, lang: string) => {
  const items = ensureArray<Record<string, unknown>>(value);
  return items.map((item) => ({
    id: item.id ? ensureString(item.id) : undefined,
    label: ensureLocalizedString(item.label ?? item.name, lang),
  }));
};

const parseClientLogos = async (
  value: unknown,
  lang: string,
): Promise<ClientLogo[]> => {
  const items = ensureArray<Record<string, unknown>>(value);
  if (items.length === 0) {
    return [];
  }

  const logos = await Promise.all(
    items.map(async (item) => {
      const logoUrl = ensureString(item.logo);
      const widthFromItem = coercePositiveNumber(
        (item as { width?: unknown }).width,
      );
      const heightFromItem = coercePositiveNumber(
        (item as { height?: unknown }).height,
      );

      let widthValue = widthFromItem;
      let heightValue = heightFromItem;

      if (!widthValue || !heightValue) {
        const dimensions = await getImageDimensions(logoUrl);
        widthValue = widthValue ?? dimensions?.width;
        heightValue = heightValue ?? dimensions?.height;
      }

      return {
        name:
          item.name && typeof item.name === "object"
            ? ensureLocalizedString(item.name, lang)
            : ensureString(item.name),
        logo: logoUrl,
        url: item.url ? ensureString(item.url) : undefined,
        width: widthValue ?? 0,
        height: heightValue ?? 0,
      } satisfies ClientLogo;
    }),
  );

  return logos;
};

const parsePricingPackages = (
  value: unknown,
  lang: string,
): PricingPackage[] => {
  const items = ensureArray<Record<string, unknown>>(value);
  return items.map((item) => ({
    id: item.id ? ensureString(item.id) : undefined,
    name: ensureLocalizedString(item.name, lang),
    description: ensureLocalizedString(item.description, lang),
    price:
      item.price !== undefined && item.price !== null
        ? ensureNumber(item.price)
        : undefined,
    currency: item.currency ? ensureString(item.currency) : undefined,
    billingCycle:
      item.billingCycle !== undefined && item.billingCycle !== null
        ? typeof item.billingCycle === "object"
          ? ensureLocalizedString(item.billingCycle, lang)
          : ensureString(item.billingCycle)
        : undefined,
    features: parsePricingFeatures(item.features, lang),
    isPopular:
      typeof item.isPopular === "boolean"
        ? item.isPopular
        : Boolean(item.isPopular),
    cta: ensureLocalizedString(item.cta, lang),
  }));
};

const parseSocialLinks = (value: unknown): SocialMediaLinks => {
  const record = ensureRecord(value);
  const links: SocialMediaLinks = {};
  Object.entries(record).forEach(([key, val]) => {
    if (typeof val === "string") {
      links[key] = val;
    }
  });
  return links;
};

export const mapSettingsToHomeContent = async (
  settings: RawSettingsInput,
  lang: string,
): Promise<HomePageContent> => {
  const normalized = normalizeSettings(settings);
  const logos = await parseClientLogos(normalized.clients_logos, lang);

  return {
    header: {
      navigationMenu: parseNavigationMenu(normalized.navigation_menu, lang),
      buttons: parseHeaderButtons(normalized.header_buttons, lang),
    },
    hero: {
      backgroundImage: ensureString(normalized.hero_background_image),
      mainHeading: ensureLocalizedString(normalized.hero_main_heading, lang),
      subHeading: ensureLocalizedString(normalized.hero_sub_heading, lang),
      description: ensureLocalizedString(normalized.hero_description, lang),
      supplierCta: ensureLocalizedString(normalized.hero_supplier_cta, lang),
      warehouseOwnerCta: ensureLocalizedString(
        normalized.hero_warehouse_owner_cta,
        lang,
      ),
      warehousePicture: ensureString(normalized.warehouse_picture),
    },
    about: {
      logo: ensureString(normalized.about_logo),
      heading: ensureLocalizedString(normalized.about_heading, lang),
      subHeading: ensureLocalizedString(normalized.about_sub_heading, lang),
      description: ensureLocalizedString(normalized.about_description, lang),
    },
    clients: {
      heading: ensureLocalizedString(normalized.clients_heading, lang),
      subHeading: ensureLocalizedString(normalized.clients_sub_heading, lang),
      logos,
    },
    why: {
      heading: ensureLocalizedString(normalized.features_heading, lang),
      subHeading: ensureLocalizedString(normalized.features_sub_heading, lang),
      features: parseFeatures(normalized.features_list, lang),
    },
    pricing: {
      heading: ensureLocalizedString(normalized.pricing_heading, lang),
      subHeading: ensureLocalizedString(normalized.pricing_sub_heading, lang),
      packages: parsePricingPackages(normalized.pricing_packages, lang),
      vatRate: ensureNumber(normalized.vat_rate),
      trialPeriodDuration: ensureNumber(normalized.trial_period_duration),
    },
    contact: {
      heading: ensureLocalizedString(normalized.contact_heading, lang),
      subHeading: ensureLocalizedString(normalized.contact_sub_heading, lang),
      form: {
        heading: ensureLocalizedString(normalized.contact_form_heading, lang),
        description: ensureLocalizedString(
          normalized.contact_form_description,
          lang,
        ),
        submitButton: ensureLocalizedString(
          normalized.contact_submit_button,
          lang,
        ),
      },
      email: ensureString(normalized.contact_email),
      whatsapp: ensureString(normalized.contact_whatsapp),
      phones: ensureStringArray(normalized.contact_phones),
    },
    footer: {
      logo: ensureString(normalized.footer_logo),
      tagline: ensureLocalizedString(normalized.footer_tagline, lang),
      description: ensureLocalizedString(normalized.footer_description, lang),
      copyright: ensureLocalizedString(normalized.footer_copyright, lang),
      termsAndConditions: ensureLocalizedString(
        normalized.terms_and_conditions,
        lang,
      ),
      privacyPolicy: ensureLocalizedString(normalized.privacy_policy, lang),
      socialMediaLinks: parseSocialLinks(normalized.social_media_links),
    },
  };
};

export const isHomePageContent = (value: unknown): value is HomePageContent => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const content = value as Record<string, unknown>;
  if (
    !("hero" in content) ||
    !("header" in content) ||
    !("pricing" in content)
  ) {
    return false;
  }

  const clients = content.clients as { logos?: unknown } | undefined;
  if (!clients || !Array.isArray(clients.logos)) {
    return false;
  }

  return clients.logos.every((logo) => {
    if (!logo || typeof logo !== "object") {
      return false;
    }
    const logoRecord = logo as Record<string, unknown>;
    return (
      typeof logoRecord.logo === "string" &&
      typeof logoRecord.width === "number" &&
      typeof logoRecord.height === "number"
    );
  });
};

const hasHomePageSections = (
  value: unknown,
): value is {
  header?: unknown;
  hero?: unknown;
  clients?: { logos?: unknown };
  pricing?: unknown;
} => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = value as Record<string, unknown>;
  const clients = content.clients;
  return (
    "hero" in content &&
    "header" in content &&
    "pricing" in content &&
    "clients" in content &&
    clients !== null &&
    typeof clients === "object"
  );
};

export const enrichHomePageContent = async (
  content: unknown,
  lang: string,
): Promise<HomePageContent | null> => {
  if (!hasHomePageSections(content)) {
    return null;
  }

  const existing = content as HomePageContent;
  const logos = await parseClientLogos(existing.clients?.logos, lang);
  const clientsSection = existing.clients as ClientsSectionContent;

  return {
    ...existing,
    clients: {
      ...clientsSection,
      logos,
    },
  };
};
