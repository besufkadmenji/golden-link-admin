import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { FilterSelect } from "../shared/filter/FilterSelect";
import { SearchInput } from "../shared/filter/SearchInput";
import { statusMap, typeMap } from "./renderCell";

export const MessagesFilter = () => {
  const dict = useDict();

  const messageStatusOptions = Object.keys(statusMap(dict)).map((key) => ({
    label: statusMap(dict)[key as keyof typeof statusMap],
    key: key,
  }));
  const [status, setStatus] = useQueryState("status");
  const messageTypeOptions = Object.keys(typeMap(dict)).map((key) => ({
    label: typeMap(dict)[key as keyof typeof typeMap],
    key: key,
  }));
  const [type, setType] = useQueryState("type");

  return (
    <div className="grid grid-cols-2 items-center gap-4 lg:flex">
      <SearchInput className="w-full md:w-max" />
      <FilterSelect
        options={messageStatusOptions}
        placeholder={dict.contact_messages_page.table_headers.status}
        className="w-full md:w-max"
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
        }}
      />
      <FilterSelect
        options={messageTypeOptions}
        placeholder={dict.contact_messages_page.table_headers.message_type}
        className="w-full md:w-max"
        values={type ? [type] : []}
        onValueChange={(values) => {
          setType(values[0] || null);
        }}
      />
    </div>
  );
};
