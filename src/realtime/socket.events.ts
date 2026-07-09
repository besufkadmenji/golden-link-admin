export const SOCKET_EVENTS = {
  SHIPMENT_SUBSCRIBE: "shipment:subscribe",
  SHIPMENT_UNSUBSCRIBE: "shipment:unsubscribe",

  SHIPMENT_LOCATION_UPDATE: "shipment:location_update",
  SHIPMENT_STATUS_UPDATE: "shipment:status_update",
  SHIPMENT_DRIVER_LOCATION: "shipment:driver_location",
  SHIPMENT_DRIVER_STATUS: "shipment:driver_status",

  DRIVER_LOCATION_TRACKING: "driver:location_tracking",
  DRIVER_STATUS_TRACKING: "driver:status_tracking",

  NOTIFICATION: "notification",
  NOTIFICATION_NEW: "notification:new",
  NOTIFICATION_RECEIVED: "notification:received",
  NOTIFICATIONS_NEW: "notifications:new",

  SUBSCRIPTION_REQUEST_NEW: "subscription_request:new",
  SUBSCRIPTION_REQUEST_APPROVED: "subscription_request:approved",
  SUBSCRIPTION_REQUEST_REJECTED: "subscription_request:rejected",
  SUBSCRIBER_UPDATED: "subscriber:updated",

  ERROR: "error",
} as const;

export const NOTIFICATION_EVENTS = [
  SOCKET_EVENTS.NOTIFICATION,
  SOCKET_EVENTS.NOTIFICATION_NEW,
  SOCKET_EVENTS.NOTIFICATION_RECEIVED,
  SOCKET_EVENTS.NOTIFICATIONS_NEW,
] as const;

export const SUBSCRIPTION_REQUEST_EVENTS = [
  SOCKET_EVENTS.SUBSCRIPTION_REQUEST_NEW,
  SOCKET_EVENTS.SUBSCRIPTION_REQUEST_APPROVED,
  SOCKET_EVENTS.SUBSCRIPTION_REQUEST_REJECTED,
] as const;
