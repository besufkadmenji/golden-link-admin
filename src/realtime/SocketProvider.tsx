"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { createSocket } from "@/realtime/socket.client";
import {
  registerSocketHandlers,
  type SocketAppMode,
} from "@/realtime/socket.handlers";
import { SOCKET_EVENTS } from "@/realtime/socket.events";
import type { SocketErrorEvent } from "@/realtime/socket.types";
import { getValidAccessToken, hasAccessToken } from "@/utils/auth.token";

export type SocketStatus = "disconnected" | "connecting" | "connected";

type SocketContextValue = {
  status: SocketStatus;
  subscribeShipment: (shipmentId: string) => void;
  unsubscribeShipment: (shipmentId: string) => void;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: SocketAppMode;
}) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const subscribedShipmentsRef = useRef<Set<string>>(new Set());
  const cleanupHandlersRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<SocketStatus>("disconnected");

  const subscribeShipment = useCallback((shipmentId: string) => {
    const socket = socketRef.current;
    if (!socket?.connected || !shipmentId) return;
    if (!subscribedShipmentsRef.current.has(shipmentId)) {
      socket.emit(SOCKET_EVENTS.SHIPMENT_SUBSCRIBE, shipmentId);
      subscribedShipmentsRef.current.add(shipmentId);
    }
  }, []);

  const unsubscribeShipment = useCallback((shipmentId: string) => {
    const socket = socketRef.current;
    if (!socket || !shipmentId) return;
    if (subscribedShipmentsRef.current.has(shipmentId)) {
      socket.emit(SOCKET_EVENTS.SHIPMENT_UNSUBSCRIBE, shipmentId);
      subscribedShipmentsRef.current.delete(shipmentId);
    }
  }, []);

  const resubscribeAllShipments = useCallback(() => {
    const socket = socketRef.current;
    if (!socket?.connected) return;
    subscribedShipmentsRef.current.forEach((shipmentId) => {
      socket.emit(SOCKET_EVENTS.SHIPMENT_SUBSCRIBE, shipmentId);
    });
  }, []);

  const disconnect = useCallback(() => {
    cleanupHandlersRef.current?.();
    cleanupHandlersRef.current = null;

    const socket = socketRef.current;
    if (socket) {
      subscribedShipmentsRef.current.forEach((shipmentId) => {
        socket.emit(SOCKET_EVENTS.SHIPMENT_UNSUBSCRIBE, shipmentId);
      });
      subscribedShipmentsRef.current.clear();
      socket.disconnect();
      socketRef.current = null;
    }

    setStatus("disconnected");
  }, []);

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !hasAccessToken()) {
      disconnect();
      return;
    }

    const token = await getValidAccessToken();
    if (!token) {
      disconnect();
      return;
    }

    if (socketRef.current?.connected) {
      const currentQuery = socketRef.current.io.opts.query as {
        token?: string;
      };
      if (currentQuery?.token === token) return;
      disconnect();
    }

    setStatus("connecting");
    const socket = createSocket(token);
    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("connected");
      resubscribeAllShipments();
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });

    socket.on(SOCKET_EVENTS.ERROR, (error: SocketErrorEvent) => {
      if (error?.message?.toLowerCase().includes("unauthorized")) {
        disconnect();
        const lang = document.documentElement.lang || "en";
        window.location.href = `/${lang}/auth`;
      }
    });

    cleanupHandlersRef.current = registerSocketHandlers(
      socket,
      queryClient,
      mode,
    );

    socket.connect();
  }, [disconnect, mode, queryClient, resubscribeAllShipments]);

  useEffect(() => {
    void connect();

    const onFocus = (): void => {
      void connect();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      disconnect();
    };
  }, [connect, disconnect]);

  const value = useMemo(
    () => ({ status, subscribeShipment, unsubscribeShipment }),
    [status, subscribeShipment, unsubscribeShipment],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocketContext(): SocketContextValue {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within SocketProvider");
  }
  return context;
}
