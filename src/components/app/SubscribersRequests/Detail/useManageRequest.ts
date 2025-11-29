import { SubscriptionService } from "@/services/subscription.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useManageRequest = () => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] =
    useQueryState("showSuccessMessage");
  const approveRequest = async (id: string) => {
    setBusy(true);
    try {
      const response = await SubscriptionService.approveSubscriptionRequest(id);
      if (response) {
        setShowSuccessMessage("true");
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request", id],
        });
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const rejectRequest = async (id: string, reason: string) => {
    setBusy(true);
    try {
      const response = await SubscriptionService.rejectSubscriptionRequest(
        id,
        reason,
      );
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request", id],
        });
        router.push(`/subscribers/requests`);
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    approveRequest,
    rejectRequest,
  };
};
