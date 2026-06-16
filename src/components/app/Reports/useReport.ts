"use client";
import { useLang } from "@/hooks/useLang";
import { ReportService } from "@/services/report.service";
import { AdminReportParams } from "@/types/report";
import { ReportPeriod } from "@/types/report.params";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

export const useReport = () => {
  const lang = useLang();
  const [period] = useQueryState("period", { defaultValue: "ALL" });
  const [startDate] = useQueryState("startDate");
  const [endDate] = useQueryState("endDate");
  const params: AdminReportParams = {
    period: period ? (period as ReportPeriod) : "ALL",
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["report", period, startDate, endDate],
    queryFn: () => ReportService.getAdminReport(params),
  });

  return {
    report: data,
    isLoading,
    isError,
    error,
  };
};
