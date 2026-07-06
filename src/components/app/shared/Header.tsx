import { NotificationIcon } from "@/assets/icons/app/header";
import { ChevronDownIcon } from "@/assets/icons/app/header/index";
import NotificationItemIcon from "@/assets/icons/app/notification.alt.svg";
import LogoIcon from "@/assets/icons/logo.horizontal.svg";
import { AppLink } from "@/components/app/shared/NoPrefetchLink";
import { SelectLanguage } from "@/components/app/shared/SelectLanguage";
import { MobileSidebar } from "@/components/app/shared/Sidebar";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { usePermissions } from "@/hooks/useHasPermissions";
import { useLogoutConfirmation } from "@/hooks/useLogoutConfirmation";
import { useMe } from "@/hooks/useMe";
import {
  useMarkNotificationAsRead,
  usePopoverNotifications,
  useUnreadNotificationsCount,
} from "@/hooks/useNotification";
import { MyNotification } from "@/types/me.notification";
import { queryClient } from "@/utils/query.client";
import {
  resolveNotificationRoute,
  resolveUnreadCount,
} from "@/utils/notifications";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AppLoading } from "./AppLoading";

const ThemeSwitcher = dynamic(
  () => import("./ThemeSwitcher").then((mod) => mod.ThemeSwitcher),
  { ssr: false },
);

export const Header = () => {
  const { hasPermission } = usePermissions();
  const canViewNotifications = hasPermission("notification", "read");

  return (
    <header
      className={twMerge(
        "flex h-16 items-center justify-between gap-1 bg-white px-2 lg:justify-end lg:gap-5 lg:px-10 dark:bg-black",
      )}
    >
      <MobileSidebar />
      <div className="flex items-center gap-0 lg:gap-5">
        <ThemeSwitcher />
        <SelectLanguage />
        {canViewNotifications && <NotificationPopover />}
        <LoggedUser />
      </div>
    </header>
  );
};

const LoggedUser = () => {
  const { me } = useMe();
  const { requestLogout, LogoutConfirmationModal } = useLogoutConfirmation();
  const dict = useDict();
  return (
    me && (
      <>
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
                requestLogout();
              }
            }}
          >
            <DropdownItem key="logout">{dict.header.logout}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <LogoutConfirmationModal />
      </>
    )
  );
};

const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: unreadCount } = useUnreadNotificationsCount();
  const unreadNotificationCount = resolveUnreadCount(unreadCount);
  const dict = useDict();
  return (
    <Popover
      placement="bottom"
      showArrow={true}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
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
            color="danger"
            content={unreadNotificationCount}
            isInvisible={unreadNotificationCount === 0}
            placement="top-right"
            shape="circle"
            size="sm"
          >
            <NotificationIcon className="size-5" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid w-fit min-w-[80vw] auto-rows-max grid-cols-1 items-start gap-2 px-0 py-6 md:min-w-[50vw] lg:min-w-[32vw]">
        <div className="flex items-center gap-1 px-6">
          <div className="grid size-8 items-center justify-center">
            <NotificationIcon className="size-7 text-[#4F4F4F] dark:text-white" />
          </div>
          <p className="text-title text-2xl leading-4 font-semibold dark:text-white">
            {dict.common.notifications}
          </p>
        </div>
        <NotificationsList onNavigate={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

const NotificationsList = ({ onNavigate }: { onNavigate: () => void }) => {
  const dict = useDict();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopoverNotifications();
  const notificationList =
    data?.pages.flatMap((page) => page?.notifications ?? []) ?? [];

  return (
    <div className="grid max-h-[70vh] w-full grid-cols-1 gap-2 overflow-y-auto px-6 pt-7 lg:max-w-[36vw]">
      {isLoading ? (
        <AppLoading className="h-[50vh]" />
      ) : notificationList.length === 0 ? (
        <div className="p-6 font-semibold text-black">
          {dict.notifications_page.no_notifications_yet}
        </div>
      ) : (
        <>
          {notificationList.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onNavigate={onNavigate}
            />
          ))}
          {hasNextPage && (
            <Button
              fullWidth
              variant="light"
              className="text-app-primary font-semibold"
              isLoading={isFetchingNextPage}
              onPress={() => fetchNextPage()}
            >
              {dict.common.actions.showMore}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

const NotificationItem = ({
  notification,
  onNavigate,
}: {
  notification: MyNotification;
  onNavigate: () => void;
}) => {
  const lang = useLang();
  const router = useRouter();
  const { mutateAsync: markAsRead } = useMarkNotificationAsRead();
  const title =
    lang === "ar" && notification.titleAr
      ? notification.titleAr
      : notification.title;
  const content =
    lang === "ar" && notification.contentAr
      ? notification.contentAr
      : notification.content;
  const route = resolveNotificationRoute(
    notification.type,
    notification.entityId,
  );
  const isInteractive = !!route || !notification.readAt;

  const handleClick = async () => {
    if (!notification.readAt) {
      await markAsRead(notification.id);
    }

    if (route) {
      router.push(route);
      onNavigate();
    }
  };

  return (
    <div
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                void handleClick();
              }
            }
          : undefined
      }
      className={twMerge(
        "dark:border-dark-border grid grid-cols-[1fr_auto] items-center gap-5 rounded-xl border border-[#F8F7FC] p-4",
        notification.readAt && "dark:bg-dark-black bg-[#F8F7FC]",
        isInteractive &&
          "cursor-pointer transition-colors hover:bg-[#F0EEF8] dark:hover:bg-white/5",
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
            {title}
          </p>
          <p className="text-subTitle text-sm dark:text-white/70">{content}</p>
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
