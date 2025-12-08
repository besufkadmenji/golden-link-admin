"use client";
import { NotificationsList } from "@/components/app/Notifications/NotificationsList";
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
import { AddButton, AddButtonType } from "../shared/button/AddButton";
import { TimeFilter } from "../shared/TimeFilter";
import { NotificationsFilter } from "./NotificationsFilter";
import { useNotifications } from "./useNotifications";
export const Notifications = () => {
  const dict = useDict();
  const router = useRouter();
  const pathname = usePathname();
  const { notifications, pagination, isLoading } = useNotifications();

  return (
    <PageWrapper>
      <PageBar title={dict.notifications_page.title}>
        <AddButton
          type={AddButtonType.Notification}
          onPress={() => {
            router.push(`${pathname}/add`);
          }}
        />
      </PageBar>
      <Gap className="h-8" />
      {isLoading ? (
        <SummaryCardSkeleton />
      ) : (
        <SummaryCard
          type={SummaryCardType.NOTIFICATIONS}
          value={pagination?.totalItems || 0}
          endContent={<TimeFilter />}
        />
      )}

      <Gap className="h-6" />
      <div className="grid grid-cols-1 gap-4">
        <NotificationsFilter />
        <NotificationsList />
      </div>
    </PageWrapper>
  );
};
