"use client";
import { useLang } from "@/hooks/useLang";
import { UserService } from "@/services/user.service";
import {
  CreateUserDto,
  DeactivateUserDto,
  GetUsersParams,
  UpdateUserDto,
  UserStatus,
} from "@/types/user";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useCreateUser = () => {
  const lang = useLang();
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: CreateUserDto) => UserService.createUser(data, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessMessage("Admin added successfully");
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  return {
    createUser,
    isPending,
    isError,
    error,
  };
};

export const useUpdateUser = () => {
  const lang = useLang();
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      UserService.updateUser(id, data, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessMessage("User updated successfully");
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  return {
    updateUser,
    isPending,
    isError,
    error,
  };
};

export const useDeactivateUser = () => {
  const lang = useLang();
  const queryClient = useQueryClient();

  const {
    mutate: deactivateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data?: DeactivateUserDto }) =>
      UserService.deactivateUser(id, data, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessMessage("User deactivated successfully");
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  return {
    deactivateUser,
    isPending,
    isError,
    error,
  };
};

export const useDeleteUser = () => {
  const lang = useLang();
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessMessage("User deleted successfully");
    },
    onError: (error: Error) => {
      showErrorMessage(error);
    },
  });

  return {
    deleteUser,
    isPending,
    isError,
    error,
  };
};
