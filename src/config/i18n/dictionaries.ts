import en from "./locales/en.json";
import ar from "./locales/ar.json";
import type { Dictionary, Lang } from "./types";

const dictionaries: Record<Lang, Dictionary> = {
  en,
  // ar may not strictly match en's shape at compile time; cast to Dictionary
  ar: ar as unknown as Dictionary,
};

export const getDictionary = (locale: string): Dictionary => {
  const key: Lang = locale === "ar" ? "ar" : "en";
  return dictionaries[key];
};
