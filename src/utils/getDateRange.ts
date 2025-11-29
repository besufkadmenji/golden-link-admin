import {
  endOfToday,
  endOfYear,
  startOfToday,
  startOfTomorrow,
  startOfYear,
  subDays,
} from "date-fns";
import moment from "moment";

export type TimeFilterOption = "today" | "week" | "month" | "12months" | null;

export interface DateRange {
  startDate: string;
  endDate: string;
}

export const rangeMap = {
  today: "TODAY",
  week: "7_DAYS",
  month: "30_DAYS",
  "12months": "12_MONTHS",
};

export const getDateRangeByOption = (
  option: TimeFilterOption,
): DateRange | null => {
  if (!option) {
    return null;
  }

  const today = new Date();
  let startDate: Date;
  let endDate: Date;
  console.log(startOfToday());
  switch (option) {
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
