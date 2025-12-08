import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { NotificationService } from "@/services/notification.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";

export const useManageNotification = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();

  const createNotification = async () => {
    setBusy(true);
    try {
      const response = await NotificationService.createAdminNotification(
        form,
        lang,
      );
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });
        showSuccessMessage(
          dict.add_new_notification_form.messages.createSuccess,
        );
        router.push("/notifications");
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
    createNotification,
  };
};
