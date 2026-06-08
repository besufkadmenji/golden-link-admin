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
import { useDict } from "@/hooks/useDict";
import { PackageSubscribersFilter } from "./PackageSubscribersFilter";
import { PackageSubscribersList } from "./PackageSubscribersList";
import { useSubscribers } from "@/components/app/Subscribers/useSubscriber";
import { ExportModel } from "@/types/export/export.model";

export const PackageSubscribers = () => {
  const dict = useDict();
  const { data, isLoading } = useSubscribers();

  return (
    <PageWrapper>
      <PageBar title={dict.packages.subscribers.title}>
        <ExportButton model={ExportModel.SUBSCRIBER} />
      </PageBar>
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.PACKAGE_SUBSCRIBERS}
          value={data?.pagination?.totalItems || 0}
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
