import { MoonIcon, SunIcon } from "@/assets/icons/app/header";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dark:border-dark-border grid h-7 w-14 grid-cols-2 items-center rounded-full border border-[#E0E2E7]">
      <Button
        isIconOnly
        className={twMerge(
          "h-full min-h-0 w-full min-w-0 bg-transparent p-0",
          theme === "dark"
            ? "text-[#565758] dark:text-white"
            : "text-[#D9D9D9]",
        )}
        onPress={() => setTheme("dark")}
      >
        <MoonIcon className="size-4" />
      </Button>
      <Button
        isIconOnly
        className={twMerge(
          "h-full min-h-0 w-full min-w-0 rounded-full bg-transparent p-0",
          theme !== "dark"
            ? "text-[#565758]"
            : "dark:text-dark-gray-4 text-[#D9D9D9]",
        )}
        onPress={() => setTheme("light")}
      >
        <SunIcon className="size-4" />
      </Button>
    </div>
  );
};
