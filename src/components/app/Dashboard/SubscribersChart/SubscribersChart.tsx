"use client";

import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";
import FilterIcon from "@/assets/icons/app/filter.svg";
import { useMonthlySubscriptionsComparison } from "@/components/app/Dashboard/useDashboard";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import type { SubscriptionComparisonParams } from "@/types/home";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { createChartData } from "./chartConfig";
import { chartOptions } from "./chartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const MIN_YEAR = 2000;
const MAX_YEAR = 2050;
const MONTHS = Array.from({ length: 12 }, (_, index) => index);
const YEARS = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, index) => MAX_YEAR - index,
);

const getPreviousMonth = (monthIndex: number, year: number) => ({
  monthIndex: monthIndex === 0 ? 11 : monthIndex - 1,
  year: monthIndex === 0 ? year - 1 : year,
});

const isMonthIndex = (value: number) => value >= 0 && value <= 11;
const isYear = (value: number) => value >= MIN_YEAR && value <= MAX_YEAR;

const selectionValue = (keys: "all" | Set<React.Key>) => {
  if (keys === "all") return undefined;
  const key = Array.from(keys)[0];
  return key === undefined ? undefined : Number(key);
};

const selectClassNames = {
  trigger:
    "bg-white border border-[#EEEEEE] dark:bg-dark-black dark:border-dark-border shadow-none data-[hover=true]:border-app-primary data-[open=true]:border-app-primary data-[focus=true]:border-app-primary",
  value: "text-sm text-[#A2A2A2]!",
  selectorIcon: "size-5",
  popoverContent: "w-max",
};

interface MonthYearSelectProps {
  label: string;
  monthLabel: string;
  yearLabel: string;
  monthIndex: number;
  year: number;
  monthNames: string[];
  onMonthChange: (monthIndex: number) => void;
  onYearChange: (year: number) => void;
}

const MonthYearSelect = ({
  label,
  monthLabel,
  yearLabel,
  monthIndex,
  year,
  monthNames,
  onMonthChange,
  onYearChange,
}: MonthYearSelectProps) => (
  <div className="grid grid-cols-1 gap-2">
    <span className="text-title dark:text-dark-title text-xs font-medium">
      {label}
    </span>
    <div className="grid grid-cols-[minmax(0,1fr)_7rem] gap-2">
      <Select
        aria-label={monthLabel}
        selectedKeys={[String(monthIndex)]}
        onSelectionChange={(keys) => {
          const value = selectionValue(keys);
          if (value !== undefined) onMonthChange(value);
        }}
        className="w-full"
        classNames={selectClassNames}
        variant="bordered"
        selectorIcon={<ChevronDownBoldIcon className="dark:text-white" />}
      >
        {MONTHS.map((index) => (
          <SelectItem key={String(index)} textValue={monthNames[index]}>
            {monthNames[index]}
          </SelectItem>
        ))}
      </Select>
      <Select
        aria-label={yearLabel}
        selectedKeys={[String(year)]}
        isVirtualized={false}
        onSelectionChange={(keys) => {
          const value = selectionValue(keys);
          if (value !== undefined) onYearChange(value);
        }}
        className="w-full"
        classNames={selectClassNames}
        variant="bordered"
        selectorIcon={<ChevronDownBoldIcon className="dark:text-white" />}
      >
        {YEARS.map((yearOption) => (
          <SelectItem key={String(yearOption)} textValue={String(yearOption)}>
            {String(yearOption)}
          </SelectItem>
        ))}
      </Select>
    </div>
  </div>
);

export const SubscribersChart = () => {
  const now = new Date();
  const defaultActiveMonthIndex = now.getMonth();
  const defaultActiveYear = Math.min(
    Math.max(now.getFullYear(), MIN_YEAR),
    MAX_YEAR,
  );
  const defaultInactive = getPreviousMonth(
    defaultActiveMonthIndex,
    defaultActiveYear,
  );
  const defaultParams: SubscriptionComparisonParams = {
    activeMonthIndex: defaultActiveMonthIndex,
    activeYear: defaultActiveYear,
    inactiveMonthIndex: defaultInactive.monthIndex,
    inactiveYear: defaultInactive.year,
  };
  const [queryParams, setQueryParams] = useQueryStates({
    activeMonthIndex: parseAsInteger.withDefault(defaultActiveMonthIndex),
    activeYear: parseAsInteger.withDefault(defaultActiveYear),
    inactiveMonthIndex: parseAsInteger.withDefault(defaultInactive.monthIndex),
    inactiveYear: parseAsInteger.withDefault(defaultInactive.year),
  });

  const params: SubscriptionComparisonParams = {
    activeMonthIndex: isMonthIndex(queryParams.activeMonthIndex)
      ? queryParams.activeMonthIndex
      : defaultActiveMonthIndex,
    activeYear: isYear(queryParams.activeYear)
      ? queryParams.activeYear
      : defaultActiveYear,
    inactiveMonthIndex: isMonthIndex(queryParams.inactiveMonthIndex)
      ? queryParams.inactiveMonthIndex
      : defaultInactive.monthIndex,
    inactiveYear: isYear(queryParams.inactiveYear)
      ? queryParams.inactiveYear
      : defaultInactive.year,
  };
  const [draftParams, setDraftParams] =
    useState<SubscriptionComparisonParams>(params);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { subscriptionsComparison, isLoading } =
    useMonthlySubscriptionsComparison(params);
  const dict = useDict();
  const lang = useLang();
  const { theme } = useTheme();
  const orderedComparison = Object.entries(subscriptionsComparison || {}).sort(
    ([dayA], [dayB]) => Number(dayA) - Number(dayB),
  );
  const current = orderedComparison.map(
    ([, item]) => item.activeMonthNewSubscriptions,
  );
  const previous = orderedComparison.map(
    ([, item]) => item.previousMonthNewSubscriptions,
  );
  const monthFormatter = new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", {
    month: "long",
  });
  const monthNames = MONTHS.map((monthIndex) =>
    monthFormatter.format(new Date(2000, monthIndex, 1)),
  );
  const activePeriodLabel = `${monthNames[params.activeMonthIndex]} ${params.activeYear}`;
  const inactivePeriodLabel = `${monthNames[params.inactiveMonthIndex]} ${params.inactiveYear}`;
  const data = createChartData(
    activePeriodLabel,
    current,
    inactivePeriodLabel,
    previous,
  );
  const updateDraft = (
    key: keyof SubscriptionComparisonParams,
    value: number,
  ) => {
    setDraftParams((current) => ({ ...current, [key]: value }));
  };
  const clearFilter = () => {
    setDraftParams(defaultParams);
    void setQueryParams({
      activeMonthIndex: null,
      activeYear: null,
      inactiveMonthIndex: null,
      inactiveYear: null,
    });
    setIsFilterOpen(false);
  };
  const applyFilter = () => {
    void setQueryParams(draftParams);
    setIsFilterOpen(false);
  };

  if (isLoading) {
    return <AppLoading className="h-[40vh]" />;
  }

  if (!subscriptionsComparison) {
    return null;
  }

  return (
    subscriptionsComparison && (
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 rounded-lg bg-white p-4 shadow-[0px_4px_32px_0px_rgba(51,38,174,0.04)] lg:p-6 dark:bg-black">
        <div className="relative grid grid-cols-1 items-start gap-4.5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h3 className="text-title dark:text-dark-title text-lg leading-7 font-semibold tracking-[0.4px]">
              {dict.dashboard.chart.title}
            </h3>
            <Popover
              placement="bottom-end"
              isOpen={isFilterOpen}
              onOpenChange={(open) => {
                if (open) setDraftParams(params);
                setIsFilterOpen(open);
              }}
              classNames={{
                content:
                  "rounded-xl border border-[#EEEEEE] p-0 shadow-[0px_4px_32px_0px_rgba(61,70,112,0.12)] dark:border-dark-border",
              }}
            >
              <PopoverTrigger>
                <Button
                  variant="bordered"
                  className="border-gray-border-alt text-subTitle dark:bg-dark-black h-10 rounded-lg bg-white text-sm font-medium shadow-none dark:text-white"
                  endContent={<FilterIcon className="size-5" />}
                >
                  {dict.common.actions.filter}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid w-80 grid-cols-1 gap-4 p-4">
                  <h4 className="text-title dark:text-dark-title text-sm font-semibold">
                    {dict.dashboard.chart.filters.title}
                  </h4>
                  <MonthYearSelect
                    label={dict.dashboard.chart.filters.active_month}
                    monthLabel={dict.dashboard.chart.filters.month}
                    yearLabel={dict.dashboard.chart.filters.year}
                    monthIndex={draftParams.activeMonthIndex}
                    year={draftParams.activeYear}
                    monthNames={monthNames}
                    onMonthChange={(value) =>
                      updateDraft("activeMonthIndex", value)
                    }
                    onYearChange={(value) => updateDraft("activeYear", value)}
                  />
                  <MonthYearSelect
                    label={dict.dashboard.chart.filters.compare_with}
                    monthLabel={dict.dashboard.chart.filters.month}
                    yearLabel={dict.dashboard.chart.filters.year}
                    monthIndex={draftParams.inactiveMonthIndex}
                    year={draftParams.inactiveYear}
                    monthNames={monthNames}
                    onMonthChange={(value) =>
                      updateDraft("inactiveMonthIndex", value)
                    }
                    onYearChange={(value) => updateDraft("inactiveYear", value)}
                  />
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Button
                      variant="bordered"
                      className="dark:border-dark-dashboard-border h-9 rounded-lg border-[#53545C] text-[#53545C] dark:text-white"
                      onPress={clearFilter}
                    >
                      {dict.common.actions.clear}
                    </Button>
                    <Button
                      className="h-9 rounded-lg bg-[#2563EB] text-white"
                      onPress={applyFilter}
                    >
                      {dict.dashboard.chart.filters.show}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-end gap-2 lg:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-0.5 w-8 rounded-full bg-[#2563EB]" />
              <p className="text-xs leading-4 font-semibold tracking-[0.1px] text-[#9FA2B4]">
                {activePeriodLabel}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-0.5 w-4.5 rounded-full bg-[#9FA2B4]" />
              <p className="text-xs leading-4 font-semibold tracking-[0.1px] text-[#9FA2B4]">
                {inactivePeriodLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="grid h-40 grid-cols-1 md:h-60 lg:h-102.25">
          <Line data={data} options={chartOptions(theme ?? "light")} />
        </div>
      </div>
    )
  );
};
