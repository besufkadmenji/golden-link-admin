import { useDict } from "@/hooks/useDict";
import { SubscriberService } from "@/services/subscriber.service";
import { queryClient } from "@/utils/query.client";
import { resolveImageFile } from "@/utils/fetchUrlAsFile";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "./useForm";

export const useManageSubscriber = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");

  const resetForm = useForm((state) => state.reset);

  const createSubscriber = async () => {
    setBusy(true);
    try {
      const { form: currentForm } = useForm.getState();
      const response = await SubscriberService.createSubscriber(currentForm);
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscriber"],
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

  const updateSubscriber = async (id: string) => {
    setBusy(true);
    try {
      const {
        form: currentForm,
        existingCommercialRegistrationImage,
        existingTaxRegistrationImage,
      } = useForm.getState();
      const { password, confirmPassword, ...rest } = currentForm;

      const [commercialRegistrationImagePath, taxRegistrationImagePath] =
        await Promise.all([
          resolveImageFile(
            currentForm.commercialRegistrationImagePath,
            existingCommercialRegistrationImage,
          ),
          resolveImageFile(
            currentForm.taxRegistrationImagePath,
            existingTaxRegistrationImage,
          ),
        ]);

      const response = await SubscriberService.updateSubscriber(id, {
        ...rest,
        ...(password ? { password, confirmPassword } : {}),
        commercialRegistrationImagePath,
        taxRegistrationImagePath,
      });
      if (response) {
        showSuccessMessage(dict.edit_subscriber_form.messages.updateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscriber", id],
        });
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
    updateSubscriber,
  };
};
