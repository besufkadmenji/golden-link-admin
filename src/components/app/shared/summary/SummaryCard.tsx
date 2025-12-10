import SubscriberRequestsIcon from "@/assets/icons/app/summary/subscriber.requests.svg";
import SubscribersIcon from "@/assets/icons/app/summary/subscribers.svg";
import AdminsIcon from "@/assets/icons/app/summary/admins.svg";
import NotificationsIcon from "@/assets/icons/app/summary/notifications.svg";
import MessagesIcon from "@/assets/icons/app/summary/messages.svg";
import ClientsIcon from "@/assets/icons/app/summary/clients.svg";
import FeaturesIcon from "@/assets/icons/app/summary/features.svg";
import { Dictionary } from "@/config/i18n/types";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
export enum SummaryCardType {
  SUBSCRIBERS_REQUESTS = "SUBSCRIBERS_REQUESTS",
  SUBSCRIBERS = "SUBSCRIBERS",
  ADMINS = "ADMINS",
  NOTIFICATIONS = "NOTIFICATIONS",
  MESSAGES = "MESSAGES",
  CLIENTS = "CLIENTS",
  FEATURES = "FEATURES",
}

const iconMap = {
  [SummaryCardType.SUBSCRIBERS_REQUESTS]: (
    <SubscriberRequestsIcon className="size-8.5" />
  ),
  [SummaryCardType.SUBSCRIBERS]: <SubscribersIcon className="size-8.5" />,
  [SummaryCardType.ADMINS]: <AdminsIcon className="size-8.5" />,
  [SummaryCardType.NOTIFICATIONS]: <NotificationsIcon className="size-8.5" />,
  [SummaryCardType.MESSAGES]: <MessagesIcon className="size-8.5" />,
  [SummaryCardType.CLIENTS]: <ClientsIcon className="size-8.5" />,
  [SummaryCardType.FEATURES]: <FeaturesIcon className="size-8.5" />,
};

export type SummaryCardProps = {
  type: SummaryCardType;
  title?: string;
  value?: string | number;
};

const labelMap = (dict: Dictionary) => ({
  [SummaryCardType.SUBSCRIBERS_REQUESTS]:
    dict.subscription_requests_page.total_requests,
  [SummaryCardType.SUBSCRIBERS]: dict.subscribers_page.total_subscribers,
  [SummaryCardType.ADMINS]: dict.system_managers_page.total_managers,
  [SummaryCardType.NOTIFICATIONS]: dict.notifications_page.total_notifications,
  [SummaryCardType.MESSAGES]: dict.contact_messages_page.total_messages,
  [SummaryCardType.CLIENTS]: dict.clients_management.total_clients,
  [SummaryCardType.FEATURES]: dict.features_management.total_features,
});

const subLabelMap = (dict: Dictionary) => ({
  [SummaryCardType.SUBSCRIBERS_REQUESTS]:
    dict.subscription_requests_page.total_count,
  [SummaryCardType.SUBSCRIBERS]: dict.subscribers_page.total_count,
  [SummaryCardType.ADMINS]: dict.system_managers_page.total_count,
  [SummaryCardType.NOTIFICATIONS]: dict.notifications_page.total_count,
  [SummaryCardType.MESSAGES]: dict.contact_messages_page.total_count,
  [SummaryCardType.CLIENTS]: dict.clients_management.total_count,
  [SummaryCardType.FEATURES]: dict.features_management.total_count,
});

export const SummaryCard = ({
  type,
  value,
  endContent,
}: {
  type: SummaryCardType;
  value: number;
  endContent?: ReactNode;
}) => {
  const dict = useDict();
  const icon = iconMap[type];

  const label = labelMap(dict)[type];
  const subLabel = subLabelMap(dict)[type];

  return (
    <div className="border-gray-border-alt dark:border-dark-border dark:bg-dark-black grid grid-cols-[1fr_auto] items-start gap-4 rounded-lg border bg-white p-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <div className="grid grid-cols-1 gap-4">
        <div>{icon}</div>
        <div className="grid grid-cols-1 gap-2">
          <p className="text-title dark:text-dark-white text-base leading-6 font-medium tracking-tight">
            {label}
          </p>
          <div className="flex items-center gap-2">
            <h3 className="dark:text-dark-white text-2xl leading-8 font-bold tracking-tight text-black">
              {value}
            </h3>
            <p className="text-subTitle-alt dark:text-dark-gray-4 text-sm leading-8 font-medium tracking-tight">
              {subLabel}
            </p>
          </div>
        </div>
      </div>
      {endContent && (
        <div className="grid grid-cols-1 justify-self-end">{endContent}</div>
      )}
    </div>
  );
};
