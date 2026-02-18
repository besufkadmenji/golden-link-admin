"use client";
import { useLang } from "@/hooks/useLang";
import { PackageService } from "@/services/package.service";
import { GetPackagesParams } from "@/types/package";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const usePackages = (initialParams?: GetPackagesParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [status] = useQueryState("status");
  const [duration] = useQueryState("duration");

  const params: GetPackagesParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status: status as "ACTIVE" | "INACTIVE" }),
    ...(duration && { packageDuration: duration }),
    ...initialParams,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["packages", params, page, limit, search, status],
    queryFn: () => PackageService.getPackages(params, lang),
  });

  return {
    packages: data?.data,
    pagination: {
      total: data?.total || 0,
      page,
      limit,
      totalPages: data?.totalPages || 0,
    },
    isLoading,
    isError,
    error,
  };
};

export const usePackageById = (id: string | null) => {
  const lang = useLang();

  const {
    data: pkg,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: () => PackageService.getPackageById(id!, lang),
    enabled: !!id,
  });

  return {
    pkg,
    isLoading,
    isError,
    error,
  };
};
