import en from "./locales/en.json";

/**
 * Supported locale keys
 */
export type Lang = "en" | "ar";

/**
 * Dictionary shape derived from the English file (canonical shape)
 * This ensures both `en.json` and `ar.json` follow the same structure.
 */
export type Dictionary = typeof en;

export default Dictionary;
