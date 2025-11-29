"use client";

import { getDictionary } from "@/config/i18n/dictionaries";
import { useLang } from "./useLang";
import type { Dictionary } from "@/config/i18n/types";

export const useDict = (): Dictionary => {
  const lng = useLang();
  const dict = getDictionary(lng.toString());
  return dict;
};
