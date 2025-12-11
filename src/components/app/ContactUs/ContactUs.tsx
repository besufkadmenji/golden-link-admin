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
import { usePathname, useRouter } from "next/navigation";
import { MessagesFilter } from "./MessagesFilter";
import { MessagesList } from "./MessagesList";

export const ContactUs = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, error } = useGetMessages();
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
