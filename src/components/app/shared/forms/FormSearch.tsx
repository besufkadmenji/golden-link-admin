import { FormInput } from "@/components/app/shared/forms/FormInput";
import SearchIcon from "@/assets/icons/app/search.svg";
import { AppCheckbox } from "../AppCheckbox";
import { useState } from "react";
export const FormSearch = ({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  isDisabled,
  suggestedItems,
  setSelectedItem,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled?: boolean;
  suggestedItems?: {
    id: string;
    name: string;
  }[];
  setSelectedItem?: (item: string) => void;
}) => {
  const [showSuggestion, setShowSuggestion] = useState(
    suggestedItems && suggestedItems.length > 0,
  );
  return (
    <div className="border-gray-border-alt dark:bg-dark-black dark:border-dark-border relative grid h-40 auto-rows-max grid-cols-1 content-center gap-3.5 rounded-lg border bg-white px-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <p className="text-lg leading-7 font-medium tracking-tight text-[#1A1C21]">
        {label}
      </p>
      <FormInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(value: string): void => {
          onChange(value);
        }}
        endContent={<SearchIcon className="size-5" />}
        hideLabel
        onSubmit={() => {
          if (!value) return;
          onSubmit();
        }}
        isDisabled={isDisabled}
        onFocus={() => setShowSuggestion(true)}
      />
      {suggestedItems && suggestedItems.length > 0 && showSuggestion && (
        <div className="absolute top-32 right-6 left-6 z-10 grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow">
          <div
            className="fixed top-0 right-0 bottom-0 left-0 h-screen w-screen bg-transparent"
            onClick={() => setShowSuggestion(false)}
          />
          {suggestedItems.map((item) => (
            <AppCheckbox
              key={item.id}
              onChange={() => setSelectedItem?.(item.id)}
            >
              {item.name}
            </AppCheckbox>
          ))}
        </div>
      )}
    </div>
  );
};
