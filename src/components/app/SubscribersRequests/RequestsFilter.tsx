import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";
import { typeMap } from "@/utils/subscriber.helpers";

export const RequestsFilter = () => {
  const dict = useDict();

  const subscriberTypes = typeMap(dict);
  const types = Object.keys(subscriberTypes).map((key) => ({
    label: subscriberTypes[key as keyof typeof subscriberTypes],
    key: key,
  }));
  const [type, setType] = useQueryState("type");

  return (
    <div className="grid grid-cols-2 items-center gap-4 lg:flex">
      <SearchInput className="w-full lg:w-max" />
      <FilterSelect
        options={types}
        placeholder={dict.subscription_requests_page.table_headers.type}
        className="w-full lg:w-max"
        values={type ? [type] : []}
        onValueChange={(values) => {
          setType(values[0] || null);
        }}
      />
    </div>
  );
};
