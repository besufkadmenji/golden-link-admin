import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { SubscriberService } from "@/services/subscriber.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";
import { useQueryState } from "nuqs";

export const useManageSubscriber = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const commercialRegistrationImageFile = useForm(
    (state) => state.commercialRegistrationImageFile,
  );

  const taxRegistrationImageFile = useForm(
    (state) => state.taxRegistrationImageFile,
  );
  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");

  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();

  const createSubscriber = async () => {
    setBusy(true);
    try {
      const response = await SubscriberService.createSubscriber(
        {
          ...form,
          commercialRegistrationImagePath: commercialRegistrationImageFile,
          taxRegistrationImagePath: taxRegistrationImageFile,
        },
        lang,
      );
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setShowSuccess("true");
        router.push("/subscribers");
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
