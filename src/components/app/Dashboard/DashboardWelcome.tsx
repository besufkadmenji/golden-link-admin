"use client";

import { useDict } from "@/hooks/useDict";

export const DashboardWelcome = () => {
  const dict = useDict();

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <p className="text-dark-gray max-w-md text-center text-sm dark:text-white/70">
        {dict.dashboard.no_permission}
      </p>
    </div>
  );
};
