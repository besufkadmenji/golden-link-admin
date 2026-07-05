import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "https://api.iga.sa";

export function createSocket(accessToken: string): Socket {
  return io(SOCKET_URL, {
    query: { token: accessToken },
    auth: { token: accessToken },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    autoConnect: false,
  });
}
