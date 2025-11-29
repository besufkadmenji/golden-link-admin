"use client";

import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { queryClient } from "@/utils/query.client";
import { ToastProvider } from "@heroui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

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
          <ToastProvider placement="top-right" />
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
};
