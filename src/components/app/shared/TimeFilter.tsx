import { useDict } from "@/hooks/useDict";
import { Button } from "@heroui/react";
import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

export const TimeFilter = () => {
  const dict = useDict();
  const [option, setOption] = useQueryState("option");
  return (
    <div className="border-dashboard-border dark:border-dark-dashboard-border flex h-10 items-center justify-self-start rounded-lg border bg-white p-1 dark:bg-black">
      <NavItem
        label={dict.common.timeFilters.today}
        active={option === "today"}
        onClick={(): void => {
          setOption("today");
        }}
      />
      <NavItem
        label={dict.common.timeFilters["7days"]}
        active={option === "week"}
        onClick={(): void => {
          setOption("week");
        }}
      />
      <NavItem
        label={dict.common.timeFilters["30days"]}
        active={option === "month"}
        onClick={(): void => {
          setOption("month");
        }}
      />
      <NavItem
        label={dict.common.timeFilters["12months"]}
        active={option === "12months"}
        onClick={(): void => {
          setOption("12months");
        }}
      />
      <NavItem
        label={dict.common.timeFilters.all}
        active={!option}
        onClick={(): void => {
          setOption(null);
        }}
      />
    </div>
  );
};

const NavItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      onPress={onClick}
      className={twMerge(
        "text-subTitle h-full min-h-0 min-w-0 rounded-md bg-inherit p-0 px-3 py-1.5 text-sm leading-5 font-medium tracking-tight dark:text-white",
        active && "bg-[#DEDEFA] text-[#4543AE] dark:text-[#4543AE]",
      )}
      size="lg"
    >
      {label}
    </Button>
  );
};
