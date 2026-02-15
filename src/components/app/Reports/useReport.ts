"use client";
import { useLang } from "@/hooks/useLang";
import { ReportService } from "@/services/report.service";
import { useQuery } from "@tanstack/react-query";

export const useReport = () => {
  const lang = useLang();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["report"],
    queryFn: () => ReportService.getAdminReport(lang),
  });

  return {
    report: data,
    isLoading,
    isError,
    error,
  };
};
