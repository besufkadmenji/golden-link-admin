import {
  HomeIcon,
  AdminsIcon,
  CmsIcon,
  CustomersIcon,
  GiftIcon,
  LogoutIcon,
  NotificationIcon,
  ReportsIcon,
  SettingsIcon,
  SubscribersIcon,
} from "@/assets/icons/sidebar";
import ChevronDown from "@/assets/icons/sidebar/chevron.down.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";

export const Sidebar = ({ className }: { className?: string }) => {
  const dict = useDict();
  return (
    <aside
      className={twMerge(
        "border-gray-background dark:border-dark-gray-background hidden auto-rows-max grid-cols-1 items-start gap-5 overflow-y-auto border-e bg-white shadow-[4px_0px_30px_0px_rgba(131,98,234,0.05)] md:grid dark:bg-black",
        className,
      )}
    >
      <AppLink
        href={"/dashboard"}
        className="relative mx-12 my-5 aspect-182/40 w-[12vw] justify-self-center text-[#2E2E2E] dark:text-white"
      >
        <LogoIcon className="h-full w-full" />
      </AppLink>
      <div className="grid grid-cols-1 gap-2 px-4 py-6">
        <OptionLink
          href="/dashboard"
          icon={<HomeIcon className="size-5" />}
          label={dict.navigation.home}
        />

        <OptionLink
          href="/admins"
          icon={<AdminsIcon className="size-5" />}
          label={dict.navigation.system_managers}
        />
        <ExpandableOption
          icon={<SubscribersIcon className="size-5" />}
          label={dict.navigation.subscribers}
          options={[
            {
              href: "/subscribers/requests",
              label: dict.navigation.subscription_requests,
            },
            {
              href: "/subscribers",
              label: dict.navigation.subscribers,
            },
          ]}
        />
        <OptionLink
          href="/packages"
          icon={<GiftIcon className="size-5" />}
          label={dict.navigation.package_management}
        />
        <OptionLink
          href="/reports"
          icon={<ReportsIcon className="size-5" />}
          label={dict.navigation.reports}
        />
        <OptionLink
          href="/customers"
          icon={<CustomersIcon className="size-5" />}
          label={dict.navigation.clients}
        />
        <OptionLink
          href="/settings"
          icon={<SettingsIcon className="size-5" />}
          label={dict.navigation.settings}
        />
        <ExpandableOption
          icon={<CmsIcon className="size-5" />}
          label={dict.navigation.website_content}
          options={[
            {
              href: "/content/contact-management",
              label: dict.navigation.contact_admin,
            },
            {
              href: "/content/about",
              label: dict.navigation.about,
            },
            {
              href: "/content/terms",
              label: dict.navigation.terms_and_conditions,
            },
            {
              href: "/content/privacy-policy",
              label: dict.navigation.privacy_policy,
            },
            {
              href: "/content/features",
              label: dict.navigation.features_management,
            },
            {
              href: "/content/contact-us",
              label: dict.navigation.contact_us,
            },
          ]}
        />
        <OptionLink
          href="/notifications"
          icon={<NotificationIcon className="size-5" />}
          label={dict.navigation.notifications}
        />
        <OptionLink
          href="/logout"
          icon={<LogoutIcon className="size-5" />}
          label={dict.navigation.logout}
        />
      </div>
    </aside>
  );
};

const OptionLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) => {
  const lng = useLang();
  const pathname = usePathname();
  const isActive = pathname === `/${lng}${href}`;
  return (
    <AppLink
      href={href}
      className={twMerge(
        "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        isActive
          ? "bg-app-primary text-white"
          : "text-dark-gray hover:bg-gray-background dark:hover:bg-dark-app-background",
      )}
    >
      {icon}
      <p className="text-sm font-semibold tracking-tight">{label}</p>
    </AppLink>
  );
};

const ExpandableOption = ({
  icon,
  label,
  options,
  href,
}: {
  icon: ReactNode;
  label: string;
  options: { href: string; label: string }[];
  href?: string;
}) => {
  const lng = useLang();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-2">
      <div
        className={twMerge(
          "text-dark-gray hover:bg-gray-background dark:hover:bg-dark-app-background flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        )}
        onClick={() => {
          if (href) {
            router.push(href);
          }
          return setExpanded(!expanded);
        }}
      >
        {icon}
        <p className="grow text-sm font-semibold tracking-tight">{label}</p>
        <ChevronDown
          className={twMerge(
            "size-2.5 duration-200 ease-in-out",
            expanded && "rotate-180",
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        {expanded &&
          options.map((option, index) => {
            const isActive = pathname === `/${lng}${option.href}`;
            return (
              <AppLink
                key={index}
                href={option.href}
                className={twMerge(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-app-primary text-white"
                    : "text-dark-gray hover:bg-gray-background dark:hover:bg-dark-app-background",
                )}
              >
                <p className="text-sm font-semibold tracking-tight">
                  {option.label}
                </p>
              </AppLink>
            );
          })}
      </div>
    </div>
  );
};

export const MobileSidebar = () => {
  const dict = useDict();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const lang = useLang();
  useEffect(() => {
    onClose();
    return () => {};
  }, [onClose, pathname]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="size-6 min-h-0 min-w-0 bg-transparent p-0 text-black md:hidden dark:text-white"
        isIconOnly
      >
        <MenuIcon className="size-5" />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={lang === "ar" ? "right" : "left"}
      >
        <DrawerContent className="p-0!">
          {(onClose) => (
            <>
              <DrawerBody className="p-0">
                <Sidebar className="grid h-screen" />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
