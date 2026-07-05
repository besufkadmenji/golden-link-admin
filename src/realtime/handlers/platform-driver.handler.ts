import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/realtime/socket.events";
import type {
  PlatformDriverLocationEvent,
  PlatformDriverStatusEvent,
} from "@/realtime/socket.types";

export interface PlatformDriverState {
  driverId: string;
  driverName?: string;
  warehouseName?: string;
  shipmentId?: string;
  location?: { lat: number; lng: number };
  status?: string;
  notes?: string;
  timestamp?: string;
  lastUpdate: string;
}

export type PlatformDriverLocations = Record<string, PlatformDriverState>;

const PLATFORM_DRIVER_QUERY_KEY = ["platformDriverLocations"] as const;

function patchPlatformDriver(
  queryClient: QueryClient,
  driverId: string,
  patch: Partial<PlatformDriverState>,
): void {
  queryClient.setQueryData<PlatformDriverLocations>(
    PLATFORM_DRIVER_QUERY_KEY,
    (old = {}) => ({
      ...old,
      [driverId]: {
        ...old[driverId],
        ...patch,
        driverId,
        lastUpdate: new Date().toISOString(),
      },
    }),
  );
}

export function registerPlatformDriverHandlers(
  socket: Socket,
  queryClient: QueryClient,
): () => void {
  const onLocation = (data: PlatformDriverLocationEvent): void => {
    if (!data.driverId) return;
    patchPlatformDriver(queryClient, data.driverId, {
      driverName: data.driverName,
      warehouseName: data.warehouseName,
      shipmentId: data.shipmentId,
      location: data.location,
      status: data.status,
    });
  };

  const onStatus = (data: PlatformDriverStatusEvent): void => {
    if (!data.driverId) return;
    patchPlatformDriver(queryClient, data.driverId, {
      driverName: data.driverName,
      warehouseName: data.warehouseName,
      shipmentId: data.shipmentId,
      status: data.status,
      notes: data.notes,
      location: data.location,
      timestamp: data.timestamp,
    });
  };

  socket.on(SOCKET_EVENTS.DRIVER_LOCATION_TRACKING, onLocation);
  socket.on(SOCKET_EVENTS.DRIVER_STATUS_TRACKING, onStatus);

  return () => {
    socket.off(SOCKET_EVENTS.DRIVER_LOCATION_TRACKING, onLocation);
    socket.off(SOCKET_EVENTS.DRIVER_STATUS_TRACKING, onStatus);
  };
}

export { PLATFORM_DRIVER_QUERY_KEY };
