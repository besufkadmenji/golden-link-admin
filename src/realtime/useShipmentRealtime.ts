import { useEffect } from "react";
import { useSocketContext } from "@/realtime/SocketProvider";

export function useShipmentRealtime(
  shipmentId: string | null | undefined,
): void {
  const { subscribeShipment, unsubscribeShipment } = useSocketContext();

  useEffect(() => {
    if (!shipmentId) return;
    subscribeShipment(shipmentId);
    return () => unsubscribeShipment(shipmentId);
  }, [shipmentId, subscribeShipment, unsubscribeShipment]);
}

export function useSubscribeDriverShipments(
  shipmentIds: Array<string | null | undefined>,
): void {
  const { subscribeShipment, unsubscribeShipment } = useSocketContext();
  const subscriptionKey = shipmentIds.filter(Boolean).join(",");

  useEffect(() => {
    const ids = [...new Set(subscriptionKey.split(",").filter(Boolean))];
    ids.forEach(subscribeShipment);
    return () => ids.forEach(unsubscribeShipment);
  }, [subscriptionKey, subscribeShipment, unsubscribeShipment]);
}
