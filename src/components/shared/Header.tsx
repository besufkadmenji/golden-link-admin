import LogoIcon from "@/assets/icons/logo.horizontal.svg";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { SelectLanguage } from "@/components/app/shared/SelectLanguage";
import { ThemeSwitcher } from "../app/shared/ThemeSwitcher";
export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 flex h-22 items-center justify-between bg-white px-8 dark:bg-black">
      <AppLink href={"/dashboard"}>
        <LogoIcon className="h-10 w-44 text-[#2E2E2E] dark:text-white" />
      </AppLink>
      <div className="flex items-center gap-5">
        <ThemeSwitcher />
        <SelectLanguage />
      </div>
    </header>
  );
};
