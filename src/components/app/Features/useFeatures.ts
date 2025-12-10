"use client";
import { useLang } from "@/hooks/useLang";
import { FeatureService } from "@/services/feature.service";
import { GetFeaturesParams } from "@/types/feature";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export const useFeatures = (initialParams?: GetFeaturesParams) => {
  const lang = useLang();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [isActive] = useQueryState("isActive", parseAsString.withDefault(""));
  const isActiveValue = isActive === "true";
  const params: GetFeaturesParams = {
    page,
    limit,
    ...(search && { search }),
    ...(isActive && { isActive: isActiveValue }),
    ...initialParams,
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["features", params, page, limit, search, isActive],
    queryFn: () => FeatureService.getFeatures(params, lang),
  });

  return {
    features: data?.features,
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
};

export const useFeatureById = (id: number) => {
  const lang = useLang();

  const {
    data: feature,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feature", id],
    queryFn: () => FeatureService.getFeatureById(id, lang),
  });

  return {
    feature,
    isLoading,
    isError,
    error,
  };
};
