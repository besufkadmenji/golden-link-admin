"use client";

import ChevronDownBoldIcon from "@/assets/icons/app/chevron.down.bold.svg";
import { Input } from "@heroui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const filterTriggerClassName = (className?: string) =>
  twMerge(
    "w-max shadow-none h-10 bg-white border dark:bg-dark-black rounded-lg min-w-[20vw]",
    "data-[hover=true]:border-app-primary data-[open=true]:border-app-primary data-[focus=true]:border-app-primary",
    className,
  );

export const SearchableFilterSelect = ({
  options,
  placeholder,
  className,
  values,
  onValueChange,
}: {
  options: { label: string; key: string }[];
  placeholder: string;
  className?: string;
  values?: string[];
  onValueChange?: (values: string[]) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedKey = values?.[0] ?? null;
  const selectedOption = options.find((option) => option.key === selectedKey);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => option.label.includes(normalizedQuery));
  }, [options, query]);

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery("");
  };

  const selectOption = (key: string) => {
    onValueChange?.([key]);
    closeDropdown();
  };

  const submitQuery = () => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      onValueChange?.([]);
      closeDropdown();
      return;
    }

    const exactMatch = options.find(
      (option) => option.label === normalizedQuery,
    );
    if (exactMatch) {
      selectOption(exactMatch.key);
      return;
    }

    if (filteredOptions.length > 0) {
      selectOption(filteredOptions[0].key);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={twMerge("relative w-max", className)}
    >
      <Input
        aria-label={placeholder}
        variant="bordered"
        placeholder={placeholder}
        value={isOpen ? query : (selectedOption?.label ?? "")}
        onValueChange={(value) => {
          setQuery(value);
          setIsOpen(true);

          if (selectedKey && value !== selectedOption?.label) {
            onValueChange?.([]);
          }
        }}
        onFocus={() => {
          setIsOpen(true);
          setQuery(selectedOption?.label ?? "");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submitQuery();
          }

          if (event.key === "Escape") {
            closeDropdown();
          }
        }}
        classNames={{
          base: twMerge("w-max", className),
          inputWrapper: filterTriggerClassName(className),
          input: "text-sm",
        }}
        endContent={
          <button
            type="button"
            aria-label={placeholder}
            className="flex items-center"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (isOpen) {
                closeDropdown();
                return;
              }

              setIsOpen(true);
              setQuery(selectedOption?.label ?? "");
            }}
          >
            <ChevronDownBoldIcon className="size-6 dark:text-white" />
          </button>
        }
      />

      {isOpen && (
        <ul className="border-gray-border-alt dark:border-dark-border dark:bg-dark-black absolute top-[calc(100%+4px)] z-50 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-[0px_4px_32px_0px_rgba(61,70,112,0.08)]">
          {filteredOptions.length === 0 ? (
            <li className="text-subTitle px-3 py-2 text-center text-sm">
              -
            </li>
          ) : (
            filteredOptions.map((option) => (
              <li key={option.key}>
                <button
                  type="button"
                  className={twMerge(
                    "hover:bg-default-100 w-full px-3 py-2 text-start text-sm",
                    option.key === selectedKey && "bg-default-100 font-medium",
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option.key)}
                >
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
