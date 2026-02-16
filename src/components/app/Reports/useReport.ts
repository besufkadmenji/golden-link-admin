"use client";
import { useLang } from "@/hooks/useLang";
import { ReportService } from "@/services/report.service";
import { AdminReportParams } from "@/types/report";
import { ReportPeriod } from "@/types/report.params";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const useReport = () => {
  const lang = useLang();
  const [period] = useQueryState("period", { defaultValue: "CURRENT_YEAR" });
  const [startDate] = useQueryState("startDate");
  const [endDate] = useQueryState("endDate");
  const params: AdminReportParams = {
    period: period ? (period as ReportPeriod) : "CURRENT_YEAR",
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["report", period, startDate, endDate],
    queryFn: () => ReportService.getAdminReport(params, lang),
  });

  return {
    report: data,
    isLoading,
    isError,
    error,
  };
};
