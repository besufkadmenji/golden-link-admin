import NoProductIcon from "@/assets/icons/app/no.product.svg";
import { useDict } from "@/hooks/useDict";

export enum NoDataType {
  SubscriberRequests = "SubscriberRequests",
  Subscribers = "Subscribers",
  Admins = "Admins",
  Notifications = "Notifications",
  Messages = "Messages",
  Clients = "Clients",
  Features = "Features",
  Packages = "Packages",
}

export const NoData = ({ type }: { type: NoDataType }) => {
  const dict = useDict();

  const messageMap = {
    [NoDataType.SubscriberRequests]: dict.noData.subscriberRequests,
    [NoDataType.Subscribers]: dict.noData.subscribers,
    [NoDataType.Admins]: dict.noData.admins,
    [NoDataType.Notifications]: dict.noData.notifications,
    [NoDataType.Messages]: dict.noData.messages,
    [NoDataType.Clients]: dict.noData.clients,
    [NoDataType.Features]: dict.noData.features,
    [NoDataType.Packages]: dict.noData.packages,
  };

  return (
    <div className="grid auto-rows-max items-center justify-items-center gap-2 pt-24">
      <NoProductIcon className="size-16 md:size-20 lg:size-28" />
      <p className="text-subTitle dark:text-dark-light-gray text-center text-sm leading-8 md:text-lg lg:text-xl">
        {messageMap[type]}
      </p>
    </div>
  );
};
