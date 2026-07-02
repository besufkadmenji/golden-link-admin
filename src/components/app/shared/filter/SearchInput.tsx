import { cn, Input } from "@heroui/react";
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
  classNames,
}: {
  className?: string;
  noSubmit?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  classNames?: {
    inputWrapper?: string;
    innerWrapper?: string;
    input?: string;
  };
}) => {
  const dict = useDict();
  const [query, setQuery] = useQueryState("search", { defaultValue: "" });
  const [localQuery, setLocalQuery] = useState(value ?? query);
  return (
    <Input
      className={twMerge("w-max lg:min-w-[20vw]", className)}
      classNames={{
        inputWrapper: cn(
          "shadow-none h-10 bg-white dark:border-dark-border dark:bg-dark-black rounded-lg border border-gray-border-alt data-[hover=true]:border-app-primary group-data-[focus=true]:border-app-primary",
          classNames?.inputWrapper,
        ),
        innerWrapper: classNames?.innerWrapper,
        input: cn(
          "placeholder:text-sm placeholder:text-[#858D9D]",
          classNames?.input,
        ),
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
