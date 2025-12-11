"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/app/shared/Sidebar";
import { Header } from "./Header";
import { cairo } from "@/assets/fonts/cairo";
import { twMerge } from "tailwind-merge";

export const AppLayoutWrapper = ({
  children,
  hideSidebar,
}: {
  children: ReactNode;
  hideSidebar?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        `${cairo.className} bg-app-background dark:bg-dark-app-background grid h-screen w-screen grid-cols-1 md:grid-cols-[minmax(19vw,auto)_1fr]`,

        hideSidebar && "md:grid-cols-1",
      )}
    >
      {!hideSidebar && <Sidebar />}
      <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] overflow-y-auto">
        <Header showLogo={hideSidebar} />
        <div className="grid h-full auto-rows-max grid-cols-1 items-start overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
