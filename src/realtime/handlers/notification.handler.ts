import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { NOTIFICATION_EVENTS } from "@/realtime/socket.events";

export function registerNotificationHandlers(
  socket: Socket,
  queryClient: QueryClient,
): () => void {
  const invalidate = (): void => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["popoverNotifications"] });
    queryClient.invalidateQueries({ queryKey: ["unreadNotificationsCount"] });
  };

  const handlers = NOTIFICATION_EVENTS.map(
    (event) => [event, invalidate] as const,
  );

  handlers.forEach(([event, handler]) => socket.on(event, handler));

  return () => {
    handlers.forEach(([event, handler]) => socket.off(event, handler));
  };
}
