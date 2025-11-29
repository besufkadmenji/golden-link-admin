import { useLang } from "@/hooks/useLang";
import { SubscriptionService } from "@/services/subscription.service";
import {
  GetSubscriptionsParams,
  SubscriptionRequestDetail,
  SubscriptionRequestsData,
  SubscriptionType,
} from "@/types/subscription";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useRequests = (
  initialParams?: GetSubscriptionsParams,
): UseQueryResult<SubscriptionRequestsData | null, Error> => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [type] = useQueryState("type", parseAsString.withDefault(""));

  const lang = useLang();
  const typeValue = type as SubscriptionType | undefined;

  const params: GetSubscriptionsParams = {
    page,
    limit,
    ...(search && { search }),
    ...(type && { type: typeValue }),
    ...initialParams,
  };

  return useQuery({
    queryKey: ["requests", lang, page, limit, search, status, type],
    queryFn: () => SubscriptionService.getSubscriptionRequests(params, lang),
  });
};

export const useRequest = (
  id: string,
): UseQueryResult<SubscriptionRequestDetail | null, Error> => {
  const lang = useLang();

  return useQuery({
    queryKey: ["request", id, lang],
    queryFn: () => SubscriptionService.getSubscriptionRequestDetail(id, lang),
    enabled: !!id,
  });
};
