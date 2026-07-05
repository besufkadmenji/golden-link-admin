"use client";

import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SocketProvider } from "@/realtime/SocketProvider";
import { queryClient } from "@/utils/query.client";
import { TOAST_CLASS_NAMES } from "@/utils/toast.classNames";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import {
  ArcElement,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import { Chart as ChartJS, Legend, Tooltip, Filler } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const AppHeroUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NuqsAdapter>
      <ThemeProvider
        enableSystem={false}
        defaultTheme="system"
        attribute="class"
      >
        <HeroUIProvider>
          <ToastProvider
            placement="top-right"
            toastProps={{ classNames: TOAST_CLASS_NAMES }}
          />
          <QueryClientProvider client={queryClient}>
            <SocketProvider mode="admin">
              {children}
            </SocketProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
};
