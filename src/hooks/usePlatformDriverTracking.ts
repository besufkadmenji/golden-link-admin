"use client";

import {
  PLATFORM_DRIVER_QUERY_KEY,
  type PlatformDriverLocations,
} from "@/realtime/handlers/platform-driver.handler";
import { useQuery } from "@tanstack/react-query";

export function usePlatformDriverTracking() {
  return useQuery<PlatformDriverLocations>({
    queryKey: PLATFORM_DRIVER_QUERY_KEY,
    queryFn: () => ({}),
    initialData: {},
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
