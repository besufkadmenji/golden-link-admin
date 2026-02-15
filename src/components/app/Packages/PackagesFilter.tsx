import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";

export const PackagesFilter = () => {
  const dict = useDict();

  const packageStatusMap = {
    ACTIVE: dict.common.statuses.ACTIVE,
    INACTIVE: dict.common.statuses.INACTIVE,
  };
  const durationMap = {
    MONTH: dict.common.duration.MONTH,
    YEAR: dict.common.duration.YEAR,
  };
  const packageStatusOptions = Object.keys(packageStatusMap).map((key) => ({
    label: packageStatusMap[key as keyof typeof packageStatusMap],
    key: key,
  }));
  const durationOptions = Object.keys(durationMap).map((key) => ({
    label: durationMap[key as keyof typeof durationMap],
    key: key,
  }));
  const [status, setStatus] = useQueryState("status");
  const [duration, setDuration] = useQueryState("duration");

  return (
    <div className="grid grid-cols-3 items-center gap-4 lg:flex">
      <SearchInput className="w-full md:w-max" />
      <FilterSelect
        options={durationOptions}
        placeholder={dict.packages.filters.duration}
        className="w-full md:w-max"
        values={duration ? [duration] : []}
        onValueChange={(values) => {
          setDuration(values[0] || null);
        }}
      />
      <FilterSelect
        options={packageStatusOptions}
        placeholder={dict.packages.filters.status}
        className="w-full md:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
        }}
      />
    </div>
  );
};
