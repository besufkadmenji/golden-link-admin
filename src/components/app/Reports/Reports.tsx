"use client";

import { useDict } from "@/hooks/useDict";
import { ReportsHeader } from "@/components/app/Reports/ReportsHeader";
import { Summary } from "@/components/app/Reports/Summary";
import { RevenueClassification } from "@/components/app/Reports/RevenueClassification/RevenueClassification";
import { PackagesList } from "@/components/app/Reports/Packages/PackagesList";

export const Reports = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-4">
      <ReportsHeader />
      <Summary />
      <RevenueClassification />
      <PackagesList />
    </div>
  );
};
