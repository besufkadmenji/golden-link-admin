import { useLang } from "@/hooks/useLang";
import { MessageService } from "@/services/message.service";
import { GetMessagesParams, MessageStatus, MessageType } from "@/types/message";
import { getDateRangeByOption, TimeFilterOption } from "@/utils/getDateRange";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useGetMessages = () => {
  const lang = useLang();

  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [type] = useQueryState("type", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [option] = useQueryState("option");
  const dateRange = getDateRangeByOption(option as TimeFilterOption);
  const params: GetMessagesParams = {
    page,
    limit,
    ...(search && { search }),
    ...(type && { type: type as MessageType }),
    ...(status && { status: status as MessageStatus }),
    ...(dateRange?.startDate && { startDate: dateRange.startDate }),
    ...(dateRange?.endDate && { endDate: dateRange.endDate }),
  };

  return useQuery({
    queryKey: ["messages", params],
    queryFn: async () => {
      const data = await MessageService.getMessages(params, lang);
      return data;
    },
    enabled: Boolean(params),
  });
};

export const useGetMessageById = (id: string) => {
  const lang = useLang();

  return useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      const data = await MessageService.getMessageById(id, lang);
      return data;
    },
    enabled: Boolean(id),
  });
};
