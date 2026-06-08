import {
  endOfYear,
  startOfToday,
  startOfTomorrow,
  startOfYear,
  subDays,
} from "date-fns";
import moment from "moment";

/** Values written to the URL by `TimeFilter` */
export type TimeFilterQueryOption = "DAY" | "WEEK" | "MONTH" | "YEAR" | "ALL";

/** Normalized period used for date calculations */
export type TimeFilterPeriod = "today" | "week" | "month" | "12months";

export type TimeFilterOption = TimeFilterPeriod | null;

export interface DateRange {
  startDate: string;
  endDate: string;
}

export type InvoiceDateRangeValue = "TODAY" | "7_DAYS" | "30_DAYS" | "12_MONTHS";

export const rangeMap: Record<TimeFilterPeriod, InvoiceDateRangeValue> = {
  today: "TODAY",
  week: "7_DAYS",
  month: "30_DAYS",
  "12months": "12_MONTHS",
};

const queryOptionToPeriod: Record<
  TimeFilterQueryOption,
  TimeFilterPeriod | null
> = {
  DAY: "today",
  WEEK: "week",
  MONTH: "month",
  YEAR: "12months",
  ALL: null,
};

const isTimeFilterPeriod = (value: string): value is TimeFilterPeriod =>
  value === "today" ||
  value === "week" ||
  value === "month" ||
  value === "12months";

export const normalizeTimeFilterPeriod = (
  option: string | null | undefined,
): TimeFilterPeriod | null => {
  if (!option || option === "ALL") {
    return null;
  }

  if (option in queryOptionToPeriod) {
    return queryOptionToPeriod[option as TimeFilterQueryOption];
  }

  if (isTimeFilterPeriod(option)) {
    return option;
  }

  return null;
};

export const getDateRangeByOption = (
  option: string | null | undefined,
): DateRange | null => {
  const period = normalizeTimeFilterPeriod(option);
  if (!period) {
    return null;
  }

  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (period) {
    case "today":
      startDate = startOfToday();
      endDate = startOfTomorrow();
      break;
    case "week":
      startDate = subDays(today, 6);
      startDate.setHours(0, 0, 0, 0);
      endDate = startOfTomorrow();
      break;
    case "month":
      startDate = subDays(today, 29);
      startDate.setHours(0, 0, 0, 0);
      endDate = startOfTomorrow();
      break;
    case "12months":
      startDate = startOfYear(today);
      endDate = endOfYear(today);
      break;
    default:
      return null;
  }

  return {
    startDate: moment(startDate).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  };
};

export const getInvoiceDateRangeByOption = (
  option: string | null | undefined,
): InvoiceDateRangeValue | null => {
  const period = normalizeTimeFilterPeriod(option);
  if (!period) {
    return null;
  }

  return rangeMap[period];
};
