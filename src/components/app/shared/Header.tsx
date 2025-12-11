import { NotificationIcon } from "@/assets/icons/app/header";
import { ChevronDownIcon } from "@/assets/icons/app/header/index";
import NotificationItemIcon from "@/assets/icons/app/notification.alt.svg";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { SelectLanguage } from "@/components/app/shared/SelectLanguage";
import { MobileSidebar } from "@/components/app/shared/Sidebar";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import {
  useNotifications,
  useUnreadNotificationsCount,
} from "@/hooks/useNotification";
import { MyNotification } from "@/types/me.notification";
import { queryClient } from "@/utils/query.client";
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
import moment from "moment";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import { AppLoading } from "./AppLoading";

const ThemeSwitcher = dynamic(
  () => import("./ThemeSwitcher").then((mod) => mod.ThemeSwitcher),
  { ssr: false },
);

export const Header = ({ showLogo }: { showLogo?: boolean }) => {
  const {} = useMe();
  return (
    <header
      className={twMerge(
        "flex h-16 items-center justify-between gap-1 bg-white px-2 md:justify-end lg:gap-5 lg:px-10 dark:bg-black",
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
      <div className="flex items-center gap-0 lg:gap-5">
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
            className="items-center rounded-lg bg-[#FEF5EA] px-2 text-xs text-black md:text-sm lg:px-4 lg:text-base"
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
  const { data: unreadCount } = useUnreadNotificationsCount();
  const dict = useDict();
  const { me } = useMe();
  console.log("Notifications for", me?.id);
  return (
    <Popover
      placement="bottom"
      showArrow={true}
      onClose={() => {
        queryClient.invalidateQueries({
          queryKey: ["unreadNotificationsCount"],
        });
      }}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          className="overflow-visible rounded-full bg-white dark:bg-black"
        >
          <Badge
            classNames={{
              badge: "bg-[#EA5455] text-white",
            }}
            content={unreadCount?.data.unreadCount || 0}
            isInvisible={(unreadCount?.data.unreadCount || 0) === 0}
          >
            <NotificationIcon className="size-5" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid auto-rows-max grid-cols-1 items-start gap-2 px-0 py-6 lg:w-[32vw]">
        <div className="flex items-center gap-1 px-6">
          <div className="grid size-8 items-center justify-center">
            <NotificationIcon className="size-7 text-[#4F4F4F] dark:text-white" />
          </div>
          <p className="text-title text-2xl leading-4 font-semibold dark:text-white">
            {dict.common.notifications}
          </p>
        </div>
        <NotificationsList />
      </PopoverContent>
    </Popover>
  );
};

const NotificationsList = () => {
  const dict = useDict();
  const { data: notifications, isLoading } = useNotifications();

  return (
    <div className="grid max-h-[70vh] w-full grid-cols-1 gap-2 overflow-y-auto px-6 pt-7 lg:max-w-[36vw]">
      {isLoading ? (
        <AppLoading className="h-[50vh]" />
      ) : notifications?.pagination.totalItems === 0 ? (
        <div className="p-6 font-semibold text-black">
          {dict.notifications_page.no_notifications_yet}
        </div>
      ) : (
        notifications?.notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

const NotificationItem = ({
  notification,
}: {
  notification: MyNotification;
}) => {
  return (
    <div
      className={twMerge(
        "dark:border-dark-border grid grid-cols-[1fr_auto] items-center gap-5 rounded-xl border border-[#F8F7FC] p-4",
        notification.readAt && "dark:bg-dark-black bg-[#F8F7FC]",
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <NotificationItemIcon
          className={twMerge(
            "dark:text-dark-gray-border-alt size-12 text-[#F8F7FC]",
            notification.readAt && "text-white dark:text-black",
          )}
        />
        <div className="grid grid-cols-1 items-center">
          <p className="text-lg font-semibold text-black dark:text-white">
            {notification.title}
          </p>
          <p className="text-subTitle text-sm dark:text-white/70">
            {notification.content}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-end gap-6">
        {!notification.readAt && (
          <div className={twMerge("bg-app-primary size-1.5 rounded-full")} />
        )}
        <p className="text-gray-4 justify-self-end text-xs dark:text-white/70">
          {moment(notification.sentAt).fromNow()}
        </p>
      </div>
    </div>
  );
};
