import {
  COUNTRY_CODE_LIST,
  DEFAULT_COUNTRY_CODE,
  findCountryByCode,
} from "@/assets/misc/country_code_list";
import { useLang } from "@/hooks/useLang";
import { Select, SelectItem } from "@heroui/react";

export const CountryCodeSelect = ({
  value,
  onChange,
  isDisabled = false,
}: {
  value: string;
  onChange: (code: string) => void;
  isDisabled?: boolean;
}) => {
  const lang = useLang();
  const selectedCountry =
    findCountryByCode(value) ??
    findCountryByCode(DEFAULT_COUNTRY_CODE)!;
  const selectedKey = `${selectedCountry.code}|${selectedCountry.labelEn}`;

  return (
    <Select
      aria-label={lang === "ar" ? "رمز الدولة" : "Country code"}
      items={COUNTRY_CODE_LIST.map((country) => ({
        key: `${country.code}|${country.labelEn}`,
        label: country.value,
        name: lang === "ar" ? country.labelAr : country.labelEn,
        Flag: country.Flag,
      }))}
      selectedKeys={[selectedKey]}
      isDisabled={isDisabled}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0]?.toString();
        if (selected) {
          onChange(selected.split("|")[0]);
        }
      }}
      className="w-max min-w-24"
      classNames={{
        trigger:
          "h-8 min-h-8 w-max gap-2 rounded-none border-0 bg-transparent px-0 shadow-none data-[hover=true]:bg-transparent data-[open=true]:bg-transparent",
        innerWrapper: "w-max",
        selectorIcon: "hidden",
        value: "w-max",
        listboxWrapper: "w-max",
        listbox: "w-max",
        mainWrapper: "w-max",
        popoverContent: "w-max",
      }}
      renderValue={(items) =>
        items.map((item) => {
          const Flag = item.data!.Flag;

          return (
            <div key={item.key} className="flex items-center gap-2">
              <Flag className="h-5 w-7 shrink-0" />
              <span className="text-sm font-semibold text-secondary dark:text-white">
                {item.data?.label}
              </span>
              <span className="text-subTitle text-sm font-bold dark:text-white/50">
                |
              </span>
            </div>
          );
        })
      }
    >
      {(country) => {
        const Flag = country.Flag;

        return (
          <SelectItem
            startContent={<Flag className="h-5 w-7 shrink-0" />}
            textValue={`${country.name} ${country.label}`}
          >
            {`${country.label} ${country.name}`}
          </SelectItem>
        );
      }}
    </Select>
  );
};
