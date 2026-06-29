import { useDict } from "@/hooks/useDict";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";
import { usePackages } from "./usePackages";

export const PackagesFilter = () => {
  const dict = useDict();
  const { minPackageDuration, maxPackageDuration } = usePackages();

  const packageStatusMap = {
    ACTIVE: dict.common.statuses.ACTIVE,
    INACTIVE: dict.common.statuses.INACTIVE,
  };
  const packageStatusOptions = Object.keys(packageStatusMap).map((key) => ({
    label: packageStatusMap[key as keyof typeof packageStatusMap],
    key: key,
  }));
  const durationOptions = useMemo(() => {
    if (minPackageDuration == null || maxPackageDuration == null) {
      return [];
    }

    const options = [];
    for (let i = minPackageDuration; i <= maxPackageDuration; i++) {
      options.push({ label: i.toString(), key: i.toString() });
    }
    return options;
  }, [minPackageDuration, maxPackageDuration]);

  const [status, setStatus] = useQueryState("status");
  const [duration, setDuration] = useQueryState("duration", parseAsInteger);
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div className="grid grid-cols-3 items-center gap-4 lg:flex">
      <SearchInput className="w-full lg:w-max" />
      <FilterSelect
        isSearchable
        options={durationOptions}
        placeholder={dict.packages.filters.duration}
        className="w-full lg:w-max"
        values={duration != null ? [duration.toString()] : []}
        onValueChange={(values) => {
          void setPage(1);
          const selected = values[0];
          void setDuration(selected ? Number.parseInt(selected, 10) : null);
        }}
      />
      <FilterSelect
        options={packageStatusOptions}
        placeholder={dict.packages.filters.status}
        className="w-full lg:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          void setPage(1);
          setStatus(values[0] || null);
        }}
      />
    </div>
  );
};
