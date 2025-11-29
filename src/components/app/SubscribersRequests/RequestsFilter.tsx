import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";

export const RequestsFilter = () => {
  const dict = useDict();

  const typeMap = {
    WAREHOUSE_OWNER: dict.common.warehouseOwner,
    SUPPLIER: dict.common.supplier,
  };
  const types = Object.keys(typeMap).map((key) => ({
    label: typeMap[key as keyof typeof typeMap],
    key: key,
  }));
  const [type, setType] = useQueryState("type");

  return (
    <div className="flex items-center gap-4">
      <SearchInput />
      <FilterSelect
        options={types}
        placeholder={dict.subscription_requests_page.table_headers.type}
        className=""
        values={type ? [type] : []}
        onValueChange={(values) => {
          setType(values[0] || null);
        }}
      />
    </div>
  );
};
