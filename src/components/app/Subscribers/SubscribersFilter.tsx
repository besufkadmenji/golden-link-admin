import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";
import { typeMap } from "@/utils/subscriber.helpers";

export const SubscribersFilter = () => {
  const dict = useDict();

  const subscriberTypes = typeMap(dict);
  const types = Object.keys(subscriberTypes).map((key) => ({
    label: subscriberTypes[key as keyof typeof subscriberTypes],
    key: key,
  }));
  const statusMap = {
    ACTIVE: dict.common.statuses.ACTIVE,
    INACTIVE: dict.common.statuses.INACTIVE,
  };
  const statusOptions = Object.keys(statusMap).map((key) => ({
    label: statusMap[key as keyof typeof statusMap],
    key: key,
  }));
  const [type, setType] = useQueryState("type");
  const [status, setStatus] = useQueryState("status");

  return (
    <div className="grid grid-cols-3 items-center gap-4 lg:flex">
      <SearchInput className="w-full lg:w-max" />
      <FilterSelect
        options={types}
        placeholder={dict.subscribers_page.table_headers.type}
        className="w-full lg:w-max"
        values={type ? [type] : []}
        onValueChange={(values) => {
          setType(values[0] || null);
        }}
      />
      <FilterSelect
        options={statusOptions}
        placeholder={dict.subscribers_page.filter_placeholder}
        className="w-full lg:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
        }}
      />
    </div>
  );
};
