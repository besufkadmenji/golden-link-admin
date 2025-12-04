"use client";

import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { useDict } from "@/hooks/useDict";
import { usePathname, useRouter } from "next/navigation";

import { SummaryCardSkeleton } from "../shared/summary/SummaryCardSkeleton";
import { SubscribersFilter } from "./SubscribersFilter";
import { SubscribersList } from "./SubscribersList";
import { useSubscribers } from "./useSubscriber";

export const Subscribers = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useSubscribers();

  return (
    <PageWrapper>
      <PageBar title={dict.subscribers_page.title} />
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.SUBSCRIBERS}
          value={data?.pagination.totalItems ?? 0}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <SubscribersFilter />
        <SubscribersList />
      </div>
    </PageWrapper>
  );
};
