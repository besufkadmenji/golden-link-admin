import { ReactNode } from "react";
import SubscribersIcon from "@/assets/icons/app/dashboard/subscribers.svg";
import WarehousesIcon from "@/assets/icons/app/dashboard/warehouses.svg";
import RevenueIcon from "@/assets/icons/app/dashboard/revenue.svg";
import RequestsIcon from "@/assets/icons/app/dashboard/requests.svg";
import { useDict } from "@/hooks/useDict";
import { twMerge } from "tailwind-merge";
import { inter } from "@/assets/fonts/inter";
import { useDashboard } from "@/components/app/Dashboard/useDashboard";
export const Summary = () => {
  const dict = useDict();
  const { dashboard } = useDashboard();

  return (
    dashboard && (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<SubscribersIcon />}
          title={dict.dashboard.cards.new_subscribers.title}
          value={dashboard.subscriptions.activated}
          delta={dashboard.subscriptions.changePercentage}
        />
        <SummaryCard
          icon={<WarehousesIcon />}
          title={dict.dashboard.cards.requests.title}
          value={dashboard.warehouses.created}
          delta={dashboard.warehouses.changePercentage}
        />
        <SummaryCard
          icon={<RevenueIcon />}
          title={dict.dashboard.cards.invoices.title}
          value={dashboard.revenue.total}
          delta={dashboard.revenue.changePercentage}
        />
        <SummaryCard
          icon={<RequestsIcon />}
          title={dict.dashboard.cards.new_subscription_requests.title}
          value={dashboard.joinRequests.total}
          delta={dashboard.joinRequests.changePercentage}
        />
      </div>
    )
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
  delta?: number;
}) => {
  const deltaValue = delta ? delta : 0;
  return (
    <div className="dark:bg-dark-black grid grid-cols-1 items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <div className="grid size-10">{icon}</div>
      <div className="grid grid-cols-1 gap-2">
        <h3 className="text-subTitle text-base leading-6 font-medium dark:text-white/70">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "text-title text-2xl leading-8 font-medium tracking-tight dark:text-white",
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
