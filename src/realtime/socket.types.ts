export type ShipmentStatus =
  | "PENDING_ASSIGNMENT"
  | "ASSIGNED"
  | "PICKUP_IN_PROGRESS"
  | "WAITING_FOR_PICKUP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "DELAYED";

export interface SocketLocation {
  lat: number;
  lng: number;
  timestamp?: string;
}

export interface ShipmentDriverStatusEvent {
  shipmentId?: string;
  driverId?: string;
  status?: ShipmentStatus;
  notes?: string;
  timestamp?: string;
}

export interface ShipmentStatusUpdateEvent {
  shipmentId?: string;
  driverId?: string;
  status?: ShipmentStatus;
  notes?: string;
  timestamp?: string;
}

export interface PlatformDriverLocationEvent {
  driverId: string;
  location: SocketLocation & { timestamp: string };
  status?: string;
  driverName: string;
  warehouseName: string;
}

export interface PlatformDriverStatusEvent {
  shipmentId?: string;
  driverId?: string;
  status?: string;
  notes?: string;
  location?: SocketLocation;
  timestamp?: string;
  driverName?: string;
  warehouseName?: string;
}

export interface SocketErrorEvent {
  message?: string;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
}
