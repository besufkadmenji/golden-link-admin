import React from "react";
import { Skeleton } from "@heroui/react";

export const SummaryCardSkeleton = () => {
  return (
    <div className="border-gray-border-alt dark:border-dark-border dark:bg-dark-black grid grid-cols-[1fr_auto] items-start gap-4 rounded-lg border bg-white p-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="rounded-lg">
          <div className="size-8.5 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="grid grid-cols-1 gap-2">
          <Skeleton className="rounded-lg">
            <div className="h-6 w-32 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="flex items-center gap-2">
            <Skeleton className="rounded-lg">
              <div className="h-8 w-16 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-8 w-20 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
