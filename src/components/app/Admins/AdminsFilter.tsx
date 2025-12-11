import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";

export const AdminsFilter = () => {
  const dict = useDict();

  const adminStatusMap = {
    ACTIVE: dict.common.statuses.ACTIVE,
    INACTIVE: dict.common.statuses.INACTIVE,
    SUSPENDED: dict.common.statuses.SUSPENDED,
    PENDING_APPROVAL: dict.common.statuses.PENDING_APPROVAL,
  };
  const adminStatusOptions = Object.keys(adminStatusMap).map((key) => ({
    label: adminStatusMap[key as keyof typeof adminStatusMap],
    key: key,
  }));
  const [status, setStatus] = useQueryState("status");

  return (
    <div className="grid grid-cols-2 items-center gap-4 lg:flex">
      <SearchInput className="w-full md:w-max" />
      <FilterSelect
        options={adminStatusOptions}
        placeholder={dict.subscription_requests_page.table_headers.type}
        className="w-full md:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
        }}
      />
    </div>
  );
};
