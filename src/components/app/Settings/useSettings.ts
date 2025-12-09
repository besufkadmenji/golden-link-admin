"use client";
import { useLang } from "@/hooks/useLang";
import { SettingService } from "@/services/setting.service";
import { useQuery } from "@tanstack/react-query";

export const useSetting = (key: string) => {
  const lang = useLang();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting", key],
    queryFn: () => SettingService.getSettingByKey(key, lang),
  });

  return {
    setting: data,
    isLoading,
    isError,
    error,
  };
};
