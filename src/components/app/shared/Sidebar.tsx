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
import { CMS_SIDEBAR_ITEMS } from "@/config/routePermissions";
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
import { ReactNode, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";
import { useLogoutConfirmation } from "@/hooks/useLogoutConfirmation";
import { usePermissions } from "../../../hooks/useHasPermissions";

export const Sidebar = ({ className }: { className?: string }) => {
  const dict = useDict();
  const { requestLogout, LogoutConfirmationModal } = useLogoutConfirmation();
  const { hasPermission, hasAnyPermission } = usePermissions();

  const subscriberOptions = useMemo(() => {
    const options: { href: string; label: string }[] = [];
    if (hasPermission("subscriptionRequest", "read")) {
      options.push({
        href: "/subscribers/requests",
        label: dict.navigation.subscription_requests,
      });
    }
    if (hasPermission("subscriber", "read")) {
      options.push({
        href: "/subscribers",
        label: dict.navigation.subscribers,
      });
    }
    if (hasPermission("subscriber", "create")) {
      options.push({
        href: "/subscribers/add",
        label: dict.navigation.add_subscriber,
      });
    }
    return options;
  }, [dict.navigation, hasPermission]);

  const cmsOptions = useMemo(
    () =>
      CMS_SIDEBAR_ITEMS.filter(
        (item) =>
          item.modules.length === 0 ||
          hasAnyPermission(item.modules, "read"),
      ).map((item) => ({
        href: item.href,
        label: dict.navigation[item.labelKey],
      })),
    [dict.navigation, hasAnyPermission],
  );

  return (
    <aside
      className={twMerge(
        "border-gray-background dark:border-dark-gray-background hidden auto-rows-max grid-cols-1 items-start gap-5 overflow-y-auto border-e bg-white shadow-[4px_0px_30px_0px_rgba(131,98,234,0.05)] lg:grid dark:bg-black",
        className,
      )}
    >
      <AppLink
        href={"/dashboard"}
        className="relative mx-12 my-5 aspect-182/40 w-1/2 justify-self-center text-[#2E2E2E] lg:w-[12vw] dark:text-white"
      >
        <LogoIcon className="h-full w-full" />
      </AppLink>
      <div className="grid grid-cols-1 gap-2 px-4 py-6">
        <OptionLink
          href="/dashboard"
          icon={<HomeIcon className="size-5" />}
          label={dict.navigation.home}
        />

        {hasPermission("user", "read") && (
          <OptionLink
            href="/admins"
            icon={<AdminsIcon className="size-5" />}
            label={dict.navigation.system_managers}
          />
        )}
        {subscriberOptions.length > 0 && (
          <ExpandableOption
            icon={<SubscribersIcon className="size-5" />}
            label={dict.navigation.subscribers}
            options={subscriberOptions}
          />
        )}
        {hasPermission("package", "read") && (
          <OptionLink
            href="/packages"
            icon={<GiftIcon className="size-5" />}
            label={dict.navigation.package_management}
          />
        )}
        {hasPermission("report", "read") && (
          <OptionLink
            href="/reports"
            icon={<ReportsIcon className="size-5" />}
            label={dict.navigation.reports}
          />
        )}
        {hasPermission("client", "read") && (
          <OptionLink
            href="/clients"
            icon={<CustomersIcon className="size-5" />}
            label={dict.navigation.clients}
          />
        )}
        {hasPermission("settings", "read") && (
          <OptionLink
            href="/settings"
            icon={<SettingsIcon className="size-5" />}
            label={dict.navigation.settings}
          />
        )}
        {cmsOptions.length > 0 && (
          <ExpandableOption
            icon={<CmsIcon className="size-5" />}
            label={dict.navigation.website_content}
            options={cmsOptions}
          />
        )}
        {hasPermission("notification", "read") && (
          <OptionLink
            href="/notifications"
            icon={<NotificationIcon className="size-5" />}
            label={dict.navigation.notifications}
          />
        )}
        <OptionLink
          href="#"
          icon={<LogoutIcon className="size-5" />}
          label={dict.navigation.logout}
          onClick={(event) => {
            event.preventDefault();
            requestLogout();
          }}
        />
      </div>
      <LogoutConfirmationModal />
    </aside>
  );
};

const OptionLink = ({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const lng = useLang();
  const pathname = usePathname();
  const isActive = pathname === `/${lng}${href}`;
  return (
    <AppLink
      href={href}
      onClick={onClick}
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
  const isChildActive = options.some((option) => {
    const fullHref = `/${lng}${option.href}`;
    return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
  });
  const [expanded, setExpanded] = useState(isChildActive);
  const router = useRouter();

  useEffect(() => {
    if (isChildActive) {
      setExpanded(true);
    }
  }, [isChildActive]);
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
        className="size-6 min-h-0 min-w-0 shrink-0 bg-transparent p-0 text-black lg:hidden dark:text-white"
        isIconOnly
      >
        <MenuIcon className="size-5 text-[#292D32] dark:text-white" />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={lang === "ar" ? "right" : "left"}
      >
        <DrawerContent className="p-0!">
          {() => (
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
