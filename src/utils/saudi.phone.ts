const SA_PHONE_INPUT_REGEX = /^\+?[0-9\s\-()]+$/;

const SA_PHONE_FORMATS = [
  /^05\d{8}$/,
  /^5\d{8}$/,
  /^\+9665\d{8}$/,
  /^9665\d{8}$/,
] as const;

const stripFormatting = (value: string) => value.replace(/[\s\-()]/g, "");

export const isValidSaudiPhoneNumber = (value: string): boolean => {
  const trimmed = value.trim();

  if (!trimmed || !SA_PHONE_INPUT_REGEX.test(trimmed)) {
    return false;
  }

  const normalized = stripFormatting(trimmed);
  return SA_PHONE_FORMATS.some((pattern) => pattern.test(normalized));
};

export const normalizeSaudiPhoneNumber = (value: string): string => {
  const normalized = stripFormatting(value.trim());

  if (normalized.startsWith("+966")) {
    return normalized.slice(4);
  }

  if (normalized.startsWith("966")) {
    return normalized.slice(3);
  }

  if (normalized.startsWith("05")) {
    return normalized.slice(1);
  }

  return normalized;
};
