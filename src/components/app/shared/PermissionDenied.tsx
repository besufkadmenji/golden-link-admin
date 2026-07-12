"use client";

import { PrimaryButton } from "@/components/app/shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
import { queryClient } from "@/utils/query.client";
import { useState } from "react";

export const PermissionDenied = () => {
  const dict = useDict();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["me"] }),
        queryClient.invalidateQueries({ queryKey: ["userPermissions"] }),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <div className="max-w-md text-center">
        <p className="text-lg font-semibold tracking-tight text-[#1A1C21] dark:text-white">
          {dict.common.permission_denied.title}
        </p>
        <p className="text-dark-gray mt-2 text-sm leading-6 dark:text-white/70">
          {dict.common.permission_denied.description}
        </p>
      </div>
      <PrimaryButton
        onPress={handleRefresh}
        isLoading={isRefreshing}
        isDisabled={isRefreshing}
      >
        {dict.common.actions.refresh}
      </PrimaryButton>
    </div>
  );
};
