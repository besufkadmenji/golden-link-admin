"use client";

import { ReactNode } from "react";

export const PageBar = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-dashboard-title dark:text-dark-dashboard-title text-2xl leading-9 font-bold tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};
