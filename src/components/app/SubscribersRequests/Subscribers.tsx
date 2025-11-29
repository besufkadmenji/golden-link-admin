"use client";
import {
  RequestsFilter
} from "@/components/app/SubscribersRequests/RequestsFilter";
import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { useDict } from "@/hooks/useDict";
import { usePathname, useRouter } from "next/navigation";

import { RequestsList } from "@/components/app/SubscribersRequests/RequestsList";
import { useRequests } from "@/components/app/SubscribersRequests/useRequest";
import { SummaryCardSkeleton } from "../shared/summary/SummaryCardSkeleton";

export const SubscriberRequests = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useRequests();

  return (
    <PageWrapper>
      <PageBar title={dict.subscription_requests_page.title} />
      <Gap className="h-8" />
      {isLoading || !data ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.SUBSCRIBERS_REQUESTS}
          value={data.pagination.totalItems}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <RequestsFilter />
        <RequestsList />
      </div>
    </PageWrapper>
  );
};
