import { SubscriptionService } from "@/services/subscription.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useState } from "react";

export const useManageRequest = () => {
  const [busy, setBusy] = useState(false);
  const approveRequest = async (id: string) => {
    setBusy(true);
    try {
      const response = await SubscriptionService.approveSubscriptionRequest(id);
      if (response) {
        showSuccessMessage(response.message);
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["latestJoinRequests"],
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

  const rejectRequest = async (id: string, reason: string): Promise<boolean> => {
    setBusy(true);
    try {
      const response = await SubscriptionService.rejectSubscriptionRequest(
        id,
        reason,
      );
      if (response) {
        showSuccessMessage(response.message);
        queryClient.invalidateQueries({
          queryKey: ["requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["latestJoinRequests"],
        });
        return true;
      }
      return false;
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
      return false;
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
