import { useLang } from "@/hooks/useLang";
import { SubscriberService } from "@/services/subscriber.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage } from "@/utils/show.message";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "./useForm";

export const useManageSubscriber = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);

  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");

  const resetForm = useForm((state) => state.reset);
  const lang = useLang();

  const createSubscriber = async () => {
    setBusy(true);
    try {
      const response = await SubscriberService.createSubscriber(form);
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setShowSuccess("create");
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
    createSubscriber,
  };
};
