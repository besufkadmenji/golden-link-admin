"use client";
import { useLang } from "@/hooks/useLang";
import { SettingService } from "@/services/setting.service";
import { useQuery } from "@tanstack/react-query";

export const useSetting = (key: string, enabled = true) => {
  const lang = useLang();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting", key],
    queryFn: () => SettingService.getSettingByKey(key),
    enabled,
  });

  return {
    setting: data,
    isLoading,
    isError,
    error,
  };
};
