import { ReactNode } from "react";
import SubscribersIcon from "@/assets/icons/app/dashboard/subscribers.svg";
import WarehousesIcon from "@/assets/icons/app/dashboard/warehouses.svg";
import RevenueIcon from "@/assets/icons/app/dashboard/revenue.svg";
import RequestsIcon from "@/assets/icons/app/dashboard/requests.svg";
import { useDict } from "@/hooks/useDict";
import { twMerge } from "tailwind-merge";
import { inter } from "@/assets/fonts/inter";
export const Summary = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-4 gap-6">
      <SummaryCard
        icon={<SubscribersIcon />}
        title={dict.dashboard.cards.new_subscribers.title}
        value={dict.dashboard.cards.new_subscribers.count}
        delta={dict.dashboard.cards.new_subscribers.change}
      />
      <SummaryCard
        icon={<WarehousesIcon />}
        title={dict.dashboard.cards.requests.title}
        value={dict.dashboard.cards.requests.count}
        delta={dict.dashboard.cards.requests.change}
      />
      <SummaryCard
        icon={<RevenueIcon />}
        title={dict.dashboard.cards.invoices.title}
        value={dict.dashboard.cards.invoices.count}
        delta={dict.dashboard.cards.invoices.change}
      />
      <SummaryCard
        icon={<RequestsIcon />}
        title={dict.dashboard.cards.new_subscription_requests.title}
        value={dict.dashboard.cards.new_subscription_requests.count}
        delta={dict.dashboard.cards.new_subscription_requests.change}
      />
    </div>
  );
};

const SummaryCard = ({
  icon,
  title,
  value,
  delta,
}: {
  icon: ReactNode;
  title: string;
  value: string | number;
  delta?: string;
}) => {
  const deltaValue = delta ? parseInt(delta) : 0;
  return (
    <div className="grid grid-cols-1 items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <div className="grid size-10">{icon}</div>
      <div className="grid grid-cols-1 gap-2">
        <h3 className="text-subTitle text-base leading-6 font-medium">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "text-title text-2xl leading-8 font-medium tracking-tight",
              inter.className,
            )}
          >
            {value}
          </p>
          {deltaValue !== 0 && (
            <div
              className={twMerge(
                "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                deltaValue > 0
                  ? "bg-[#E7F4EE] text-[#1EB564]"
                  : "bg-[#FEEDEC] text-[#FE3B00]",
                inter.className,
              )}
            >
              {deltaValue}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
