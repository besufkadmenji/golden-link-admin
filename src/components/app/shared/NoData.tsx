import NoProductIcon from "@/assets/icons/app/no.product.svg";
import { useDict } from "@/hooks/useDict";

export enum NoDataType {
  SubscriberRequests = "SubscriberRequests",
  Subscribers = "Subscribers",
}

export const NoData = ({ type }: { type: NoDataType }) => {
  const dict = useDict();

  const messageMap = {
    [NoDataType.SubscriberRequests]: dict.noData.subscriberRequests,
    [NoDataType.Subscribers]: dict.noData.subscribers,
  };

  return (
    <div className="grid auto-rows-max items-center justify-items-center gap-2 pt-24">
      <NoProductIcon className="size-28" />
      <p className="text-subTitle dark:text-dark-light-gray text-center text-xl leading-8">
        {messageMap[type]}
      </p>
    </div>
  );
};
