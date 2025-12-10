"use client";
import { useLang } from "@/hooks/useLang";
import { ClientService } from "@/services/client.service";
import { GetClientsParams } from "@/types/client";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useClients = (initialParams?: GetClientsParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [isActive] = useQueryState("isActive", parseAsString.withDefault(""));
  const isActiveValue = isActive === "true";
  const params: GetClientsParams = {
    page,
    limit,
    ...(search && { search }),
    ...(isActive && { isActive: isActiveValue }),
    ...initialParams,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["clients", params, page, limit, search, isActive],
    queryFn: () => ClientService.getClients(params, lang),
  });

  return {
    clients: data?.clients,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};

export const useClientById = (id: number) => {
  const lang = useLang();

  const {
    data: client,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => ClientService.getClientById(id, lang),
  });

  return {
    client,
    isLoading,
    isError,
    error,
  };
};
