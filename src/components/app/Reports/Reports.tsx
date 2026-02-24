"use client";

import { PackagesList } from "@/components/app/Reports/Packages/PackagesList";
import { ReportsHeader } from "@/components/app/Reports/ReportsHeader";
import { RevenueClassification } from "@/components/app/Reports/RevenueClassification/RevenueClassification";
import { Summary } from "@/components/app/Reports/Summary";
import { useReport } from "@/components/app/Reports/useReport";
import { useDict } from "@/hooks/useDict";
import { AppLoading } from "../shared/AppLoading";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/useHasPermissions";
import { useEffect } from "react";

export const Reports = () => {
  const dict = useDict();
  const { isLoading, report } = useReport();
  const { hasPermission } = usePermissions();
  const router = useRouter();
  useEffect(() => {
    if (!hasPermission("report", "read")) {
      router.push("/404");
    }

    return () => {};
  }, [hasPermission]);
  return isLoading || !report ? (
    <AppLoading />
  ) : (
    <div className="grid grid-cols-1 gap-4">
      <ReportsHeader />
      <Summary report={report} />
      <RevenueClassification report={report} />
      <PackagesList report={report} />
    </div>
  );
};
