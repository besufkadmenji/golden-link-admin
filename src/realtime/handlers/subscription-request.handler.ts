import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS, SUBSCRIPTION_REQUEST_EVENTS } from "@/realtime/socket.events";

export function registerSubscriptionRequestHandlers(
  socket: Socket,
  queryClient: QueryClient,
): () => void {
  const invalidateRequests = (): void => {
    queryClient.invalidateQueries({ queryKey: ["requests"] });
    queryClient.invalidateQueries({ queryKey: ["request"] });
    queryClient.invalidateQueries({ queryKey: ["latestJoinRequests"] });
  };

  const invalidateSubscribers = (): void => {
    queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    queryClient.invalidateQueries({ queryKey: ["subscriber"] });
  };

  const requestHandlers = SUBSCRIPTION_REQUEST_EVENTS.map(
    (event) => [event, invalidateRequests] as const,
  );

  requestHandlers.forEach(([event, handler]) => socket.on(event, handler));
  socket.on(SOCKET_EVENTS.SUBSCRIBER_UPDATED, invalidateSubscribers);

  return () => {
    requestHandlers.forEach(([event, handler]) => socket.off(event, handler));
    socket.off(SOCKET_EVENTS.SUBSCRIBER_UPDATED, invalidateSubscribers);
  };
}
