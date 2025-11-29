import { Input } from "@heroui/react";
import SearchIcon from "@/assets/icons/app/search.svg";
import { useDict } from "@/hooks/useDict";
import { twMerge } from "tailwind-merge";
import { useQueryState } from "nuqs";
import { useState } from "react";
export const SearchInput = ({
  className,
  noSubmit,
  value,
  onChange,
}: {
  className?: string;
  noSubmit?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const dict = useDict();
  const [query, setQuery] = useQueryState("search", { defaultValue: "" });
  const [localQuery, setLocalQuery] = useState(value ?? query);
  return (
    <Input
      className={twMerge("w-max lg:min-w-[20vw]", className)}
      classNames={{
        inputWrapper:
          "shadow-none h-10 bg-white dark:border-dark-border dark:bg-dark-black  rounded-lg border border-gray-border-alt data-[hover=true]:border-app-primary placeholder:text-sm group-data-[focus=true]:border-app-primary placeholder:text-[#858D9D]",
      }}
      endContent={<SearchIcon className="size-6" />}
      variant="bordered"
      placeholder={dict.common.actions.search}
      value={localQuery}
      onValueChange={(v) => {
        if (onChange) {
          onChange(v);
        }
        return setLocalQuery(v);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !noSubmit) {
          setQuery(localQuery.trim(), { history: "push" });
        }
      }}
    />
  );
};
