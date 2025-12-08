import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { SubscriberService } from "@/services/subscriber.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useManageSubscriber = () => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [, setActivateSubscriber] = useQueryState("activateSubscriber");
  const [, setDeactivateSubscriber] = useQueryState("deactivateSubscriber");
  const activateSubscriber = async (id: string) => {
    setBusy(true);
    try {
      const response = await SubscriberService.activateSubscriber(id, lang);
      if (response) {
        showSuccessMessage(dict.subscribers_page.messages.activateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscriber", id],
        });
      }
    } catch (error) {
      console.error("Activate subscriber error:", error);
      showErrorMessage(
        error instanceof Error
          ? error
          : (error as string) || "An error occurred.",
      );
    } finally {
      setBusy(false);
      setActivateSubscriber(null);
    }
  };

  const deactivateSubscriber = async (id: string, reason?: string) => {
    setBusy(true);
    try {
      const response = await SubscriberService.deactivateSubscriber(
        id,
        reason ?? "",
        lang,
      );
      if (response) {
        showSuccessMessage(dict.subscribers_page.messages.deactivateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscriber", id],
        });
      }
    } catch (error) {
      console.error("Deactivate subscriber error:", error);
      showErrorMessage(
        error instanceof Error
          ? error
          : (error as string) || "An error occurred.",
      );
    } finally {
      setBusy(false);
      setDeactivateSubscriber(null);
    }
  };

  const deleteSubscriber = async (id: string, reason?: string) => {
    setBusy(true);
    try {
      const response = await SubscriberService.deleteSubscriber(id, reason);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscribers", id],
        });
        router.push("/subscribers");
      }
    } catch (error) {
      console.error("Delete subscriber error wtf:", error);
      showErrorMessage(
        error instanceof Error
          ? error
          : (error as string) || "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  return {
    busy,
    activateSubscriber,
    deactivateSubscriber,
    deleteSubscriber,
  };
};
