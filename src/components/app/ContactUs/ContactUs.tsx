"use client";
import { useGetMessages } from "@/components/app/ContactUs/useMessage";
import { Gap } from "@/components/app/shared/Gap";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import {
  SummaryCard,
  SummaryCardType,
} from "@/components/app/shared/summary/SummaryCard";
import { SummaryCardSkeleton } from "@/components/app/shared/summary/SummaryCardSkeleton";
import { useDict } from "@/hooks/useDict";
import { MessagesFilter } from "./MessagesFilter";
import { MessagesList } from "./MessagesList";
import { TimeFilter } from "@/components/app/shared/TimeFilter";

export const ContactUs = () => {
  const dict = useDict();
  const { data, isLoading } = useGetMessages();
  return (
    <PageWrapper>
      <PageBar title={dict.contact_messages_page.title} />
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.MESSAGES}
          value={data?.pagination?.totalItems || 0}
          endContent={<TimeFilter />}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <MessagesFilter />
        <MessagesList />
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
