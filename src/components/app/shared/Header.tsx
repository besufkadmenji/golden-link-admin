import { NotificationIcon } from "@/assets/icons/app/header";
import { ChevronDownIcon } from "@/assets/icons/app/header/index";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { SelectLanguage } from "@/components/app/shared/SelectLanguage";
import { MobileSidebar } from "@/components/app/shared/Sidebar";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";

const ThemeSwitcher = dynamic(
  () => import("./ThemeSwitcher").then((mod) => mod.ThemeSwitcher),
  { ssr: false },
);

export const Header = ({ showLogo }: { showLogo?: boolean }) => {
  const {} = useMe();
  return (
    <header
      className={twMerge(
        "flex h-16 items-center justify-between gap-5 bg-white px-10 md:justify-end dark:bg-black",
        showLogo && "md:justify-between",
      )}
    >
      {showLogo && (
        <AppLink
          href={"/dashboard"}
          className="relative aspect-182/50 h-10 justify-self-center text-[#2E2E2E] dark:text-white"
        >
          <LogoIcon />
        </AppLink>
      )}
      <MobileSidebar />
      <div className="flex items-center gap-5">
        <ThemeSwitcher />
        <SelectLanguage />
        <Button isIconOnly className="rounded-full bg-white dark:bg-black">
          <NotificationIcon className="size-5" />
        </Button>
        <LoggedUser />
      </div>
    </header>
  );
};

const LoggedUser = () => {
  const { me, logout } = useMe();
  const dict = useDict();
  return (
    me && (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            endContent={<ChevronDownIcon className="size-2.5 shrink-0" />}
            className="dark:bg-dark-white items-center rounded-lg bg-[#FEF5EA] text-black"
          >
            {me?.fullName}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Options"
          onAction={(k) => {
            if (k === "logout") {
              logout();
            }
          }}
        >
          <DropdownItem key="logout">{dict.header.logout}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  );
};
