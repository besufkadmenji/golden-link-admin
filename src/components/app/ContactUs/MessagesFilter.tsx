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
    <div className="flex items-center gap-4">
      <SearchInput />
      <FilterSelect
        options={messageStatusOptions}
        placeholder={dict.contact_messages_page.table_headers.status}
        className=""
        values={status ? [status] : []}
        onValueChange={(values) => {
          setStatus(values[0] || null);
        }}
      />
      <FilterSelect
        options={messageTypeOptions}
        placeholder={dict.contact_messages_page.table_headers.message_type}
        className=""
        values={type ? [type] : []}
        onValueChange={(values) => {
          setType(values[0] || null);
        }}
      />
    </div>
  );
};
