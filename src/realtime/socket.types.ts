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
}

export interface ShipmentDriverLocationEvent {
  shipmentId?: string;
  driverId?: string;
  location?: SocketLocation;
  status?: ShipmentStatus;
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
  shipmentId?: string;
  driverId?: string;
  location?: SocketLocation;
  status?: string;
  driverName?: string;
  warehouseName?: string;
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
