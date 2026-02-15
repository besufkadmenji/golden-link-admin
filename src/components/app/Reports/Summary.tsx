import { inter } from "@/assets/fonts/inter";
import { sar } from "@/assets/fonts/sar";
import ExchangeGoodsIcon from "@/assets/icons/app/analytics/exchange.goods.svg";
import GrowthRateIcon from "@/assets/icons/app/growth.rate.svg";
import TotalRevenueIcon from "@/assets/icons/app/total.revenue.svg";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import DeltaUpIcon from "@/assets/icons/delta.up.svg";
import DeltaDownIcon from "@/assets/icons/delta.down.svg";
import { AdminReportResponse } from "@/types/report";

export const Summary = ({ report }: { report: AdminReportResponse }) => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-2 gap-6">
      <SummaryItem
        icon={<TotalRevenueIcon className="size-10" />}
        label={dict.reports.cards.total_revenue}
        value={`${report.summary.totalRevenue}`}
        valueDesc={<span className={sar.className}>A</span>}
      />
      <SummaryItem
        icon={<GrowthRateIcon className="size-10" />}
        label={dict.reports.cards.growth_rate}
        value={`${report.summary.growthRate ?? 0}%`}
        valueDesc={
          <p className="text-xs font-light text-[#9FA2B4]">
            {dict.reports.cards.compared_to_last_week}
          </p>
        }
        delta={0}
      />
    </div>
  );
};

const SummaryItem = ({
  icon,
  label,
  value,
  delta,
  valueDesc,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
  valueDesc?: ReactNode;
}) => {
  return (
    <div className="border-gray-border-alt grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      {icon}
      <div className="grid grid-cols-1 gap-2">
        <p className="text-subTitle font-medium">{label}</p>
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "text-2xl leading-8 font-bold tracking-tight",
              inter.className,
            )}
          >
            {value}
          </p>
          {valueDesc && valueDesc}
          {delta && delta !== 0 ? (
            <div
              className={twMerge(
                "flex h-5.5 items-center text-xs leading-none font-semibold",
                inter.className,
                delta > 0 ? "text-green-main" : "text-[#FE3B00]",
              )}
            >
              {delta > 0 ? (
                <DeltaUpIcon className="size-3" />
              ) : (
                <DeltaDownIcon className="size-3" />
              )}
              {delta > 0 ? `${delta}` : delta}%
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
