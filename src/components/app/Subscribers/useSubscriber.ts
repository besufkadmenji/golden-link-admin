import { useLang } from "@/hooks/useLang";
import { SubscriberService } from "@/services/subscriber.service";
import {
  GetSubscribersParams,
  SubscriberDetail,
  SubscribersData,
} from "@/types/subscriber";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useSubscribers = (
  initialParams?: GetSubscribersParams,
): UseQueryResult<SubscribersData | null, Error> => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [type] = useQueryState("type", parseAsString.withDefault(""));

  const lang = useLang();

  const params: GetSubscribersParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && {
      status: status as
        | "ACTIVE"
        | "INACTIVE"
        | "SUSPENDED"
        | "PENDING_APPROVAL",
    }),
    ...(type && {
      type: type as "SUPPLIER" | "WAREHOUSE_OWNER" | "CUSTOMER",
    }),
    ...initialParams,
  };

  return useQuery({
    queryKey: ["subscribers", lang, page, limit, search, status, type],
    queryFn: () => SubscriberService.getSubscribers(params, lang),
  });
};

export const useSubscriber = (
  id: string,
): UseQueryResult<SubscriberDetail | null, Error> => {
  const lang = useLang();

  return useQuery({
    queryKey: ["subscriber", id, lang],
    queryFn: () => SubscriberService.getSubscriberById(id, lang),
    enabled: !!id,
  });
};
