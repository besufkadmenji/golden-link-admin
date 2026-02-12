"use client";
import { ExportButton } from "@/components/app/shared/button/ExportButton";
import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { SummaryCardSkeleton } from "@/components/app/shared/summary/SummaryCardSkeleton";
import { TimeFilter } from "@/components/app/shared/TimeFilter";
import { useDict } from "@/hooks/useDict";
import { usePathname, useRouter } from "next/navigation";
import { PackageSubscribersFilter } from "./PackageSubscribersFilter";
import { PackageSubscribersList } from "./PackageSubscribersList";
import { useUsers } from "./useAdmins";
export const PackageSubscribers = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { users, pagination, isLoading } = useUsers();

  return (
    <PageWrapper>
      <PageBar title={dict.packages.subscribers.title}>
        <ExportButton model={""} />
      </PageBar>
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.PACKAGE_SUBSCRIBERS}
          value={pagination?.totalItems || 0}
          endContent={<TimeFilter />}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <PackageSubscribersFilter />
        <PackageSubscribersList />
      </div>
    </PageWrapper>
  );
};
