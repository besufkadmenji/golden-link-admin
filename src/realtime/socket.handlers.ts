import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { registerNotificationHandlers } from "@/realtime/handlers/notification.handler";
import { registerPlatformDriverHandlers } from "@/realtime/handlers/platform-driver.handler";

export type SocketAppMode = "web" | "admin";

export function registerSocketHandlers(
  socket: Socket,
  queryClient: QueryClient,
  mode: SocketAppMode,
): () => void {
  const cleanups = [registerNotificationHandlers(socket, queryClient)];

  if (mode === "admin") {
    cleanups.push(registerPlatformDriverHandlers(socket, queryClient));
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
