import SubscriberRequestsIcon from "@/assets/icons/app/summary/subscriber.requests.svg";
import SubscribersIcon from "@/assets/icons/app/summary/subscribers.svg";
import AdminsIcon from "@/assets/icons/app/summary/admins.svg";
import { Dictionary } from "@/config/i18n/types";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
export enum SummaryCardType {
  SUBSCRIBERS_REQUESTS = "SUBSCRIBERS_REQUESTS",
  SUBSCRIBERS = "SUBSCRIBERS",
  ADMINS = "ADMINS",
}

const iconMap = {
  [SummaryCardType.SUBSCRIBERS_REQUESTS]: (
    <SubscriberRequestsIcon className="size-8.5" />
  ),
  [SummaryCardType.SUBSCRIBERS]: <SubscribersIcon className="size-8.5" />,
  [SummaryCardType.ADMINS]: <AdminsIcon className="size-8.5" />,
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
});

const subLabelMap = (dict: Dictionary) => ({
  [SummaryCardType.SUBSCRIBERS_REQUESTS]:
    dict.subscription_requests_page.total_count,
  [SummaryCardType.SUBSCRIBERS]: dict.subscribers_page.total_count,
  [SummaryCardType.ADMINS]: dict.system_managers_page.total_count,
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
