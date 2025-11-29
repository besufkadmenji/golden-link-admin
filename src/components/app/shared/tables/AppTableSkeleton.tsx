import { Skeleton } from "@heroui/react";
import { twMerge } from "tailwind-merge";

export const AppTableSkeleton = ({
  columns = 5,
  rows = 5,
  classNames,
}: {
  columns?: number;
  rows?: number;
  classNames?: {
    table?: string;
    wrapper?: string;
  };
}) => {
  return (
    <div
      className={twMerge(
        "border-gray-border-alt dark:bg-dark-black dark:border-dark-border grid grid-cols-1 overflow-hidden rounded-lg border bg-white p-0 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]",
        classNames?.table,
      )}
    >
      <div
        className={twMerge(
          "border-gray-background dark:border-dark-border rounded-none border p-0 shadow-none",
          classNames?.wrapper,
        )}
      >
        {/* Table Header */}
        <div className="bg-gray-border dark:bg-title border-b-dark-white dark:border-b-dark-border border-b">
          <div
            className="grid gap-4 p-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton key={`header-${index}`} className="rounded-lg">
                <div className="bg-default-300 h-5 w-24 rounded-lg" />
              </Skeleton>
            ))}
          </div>
        </div>

        {/* Table Body */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="border-gray-background dark:border-dark-border h-12 border-b"
          >
            <div
              className="grid h-full items-center gap-4 p-3"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="rounded-lg"
                >
                  <div className="bg-default-300 h-5 w-full rounded-lg" />
                </Skeleton>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mx-2 my-3 flex justify-center gap-2">
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 size-8 rounded-lg" />
        </Skeleton>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={`pagination-${index}`} className="rounded-lg">
            <div className="bg-default-300 size-8 rounded-lg" />
          </Skeleton>
        ))}
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 size-8 rounded-lg" />
        </Skeleton>
      </div>
    </div>
  );
};
