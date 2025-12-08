import { NotificationIcon } from "@/assets/icons/app/header";
import { ChevronDownIcon } from "@/assets/icons/app/header/index";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { SelectLanguage } from "@/components/app/shared/SelectLanguage";
import { MobileSidebar } from "@/components/app/shared/Sidebar";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";
import {
  useNotifications,
  useUnreadNotificationsCount,
} from "@/hooks/useNotification";
import { Notification } from "@/types/notification";
import moment from "moment";

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
        <NotificationPopover />
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

const NotificationPopover = () => {
  const { data: notifications } = useNotifications();
  const { data: unreadCount } = useUnreadNotificationsCount();
  const dict = useDict();
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button
          isIconOnly
          className="overflow-visible rounded-full bg-white dark:bg-black"
        >
          <Badge
            classNames={{
              badge: "bg-app-primary text-white",
            }}
            content={unreadCount?.data.unreadCount || 0}
            isInvisible={(unreadCount?.data.unreadCount || 0) === 0}
          >
            <NotificationIcon className="size-5" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-1">
        <div className="grid w-full grid-cols-1 lg:max-w-[36vw]">
          {notifications?.data.pagination.totalItems === 0 ? (
            <div className="p-6 text-black font-semibold">{dict.notifications_page.no_notifications_yet}</div>
          ) : (
            notifications?.data.notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <div className="dark:border-dark-white grid grid-cols-1 border-b border-gray-200 p-4 last:border-0">
      <div className="grid grid-cols-[1fr_auto] items-center">
        <p className="text-lg font-semibold text-black">{notification.title}</p>
        <p className="text-gray-2 justify-self-end text-xs">
          {moment(notification.sentAt).fromNow()}
        </p>
      </div>
      <p className="text-gray text-sm">{notification.content}</p>
    </div>
  );
};
