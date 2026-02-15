"use client";
import { useLang } from "@/hooks/useLang";
import { UserService } from "@/services/user.service";
import {
    GetUsersParams,
    UserStatus
} from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useUsers = (initialParams?: GetUsersParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const statusValue = status as UserStatus | undefined;
  const params: GetUsersParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status: statusValue }),
    ...initialParams,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", params, page, limit, search, status],
    queryFn: () => UserService.getUsers(params, lang),
  });

  return {
    users: data?.users,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};

export const useUserById = (id: string | null) => {
  const lang = useLang();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id!, lang),
    enabled: !!id,
  });

  return {
    user,
    isLoading,
    isError,
    error,
  };
};
