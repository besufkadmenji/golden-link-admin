import { GlobIcon } from "@/assets/icons/app/header";
import EnFlag from "@/assets/svgs/gb.svg";
import ArFlag from "@/assets/svgs/sa.svg";
import { changeLang } from "@/config/i18n/changeLang";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
const langMap: {
  [key: string]: { label: string; flag: ReactNode };
} = {
  ar: {
    label: "العربية",
    flag: <ArFlag className={"h-4 w-6 shrink-0"} />,
  },
  en: {
    label: "English",
    flag: <EnFlag className={"h-4 w-6 shrink-0"} />,
  },
};
export const SelectLanguage = () => {
  const pathname = usePathname();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          className="bg-white text-xs text-neutral-800 dark:bg-black dark:text-white"
          isIconOnly
        >
          <GlobIcon className="size-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select Language"
        onAction={(k) => {
          if (!k) return;
          changeLang(
            k.toString(),
            pathname.replace("/ar", "").replace("/en", ""),
            false,
          );
        }}
      >
        <DropdownItem key="ar" startContent={langMap["ar"].flag}>
          {langMap["ar"].label}
        </DropdownItem>
        <DropdownItem key="en" startContent={langMap["en"].flag}>
          {langMap["en"].label}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
