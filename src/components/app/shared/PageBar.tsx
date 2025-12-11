"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const PageBar = ({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <h1 className="text-dashboard-title dark:text-dark-dashboard-title text-lg leading-9 font-bold tracking-tight md:text-2xl">
        {title}
      </h1>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};
