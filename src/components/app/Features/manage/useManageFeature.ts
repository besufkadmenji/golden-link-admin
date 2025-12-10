import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { FeatureService } from "@/services/feature.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "./useForm";
import { queryClient } from "@/utils/query.client";

export const useManageFeature = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [, setActivateFeature] = useQueryState("activateFeature");
  const [, setDeactivateFeature] = useQueryState("deactivateFeature");

  const createFeature = async () => {
    setBusy(true);
    try {
      const response = await FeatureService.createFeature(form);
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["features"],
        });
        queryClient.invalidateQueries({
          queryKey: ["feature"],
        });
        showSuccessMessage(dict.features_management.messages.createSuccess);
        router.push("/content/features");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const updateFeature = async (id: number) => {
    setBusy(true);
    try {
      const response = await FeatureService.updateFeature(id, form);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.updateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["feature", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["features"],
        });
        router.push("/content/features");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteFeature = async (id: number) => {
    setBusy(true);
    try {
      const success = await FeatureService.deleteFeature(id);
      if (success) {
        showSuccessMessage(dict.features_management.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["features"],
        });
        queryClient.invalidateQueries({
          queryKey: ["feature", id],
        });
        router.push("/content/features");
      } else {
        showErrorMessage("Failed to delete feature.");
      }
    } catch (error) {
      console.error("Delete feature error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  const activateFeature = async (id: number) => {
    setBusy(true);
    try {
      const success = await FeatureService.activateFeature(id, lang);
      console.log("Activate feature success:", success);
      if (success) {
        showSuccessMessage(dict.features_management.messages.activateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["features"],
        });
        queryClient.invalidateQueries({
          queryKey: ["feature", id],
        });
        setActivateFeature(null);
      } else {
        showErrorMessage("Failed to activate feature.");
      }
    } catch (error) {
      console.error("Activate feature error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deactivateFeature = async (id: number, reason?: string) => {
    setBusy(true);
    try {
      const success = await FeatureService.deactivateFeature(
        id,
        reason ?? "",
        lang,
      );
      if (success) {
        showSuccessMessage(dict.features_management.messages.deactivateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["features"],
        });
        queryClient.invalidateQueries({
          queryKey: ["feature", id],
        });
        setDeactivateFeature(null);
      } else {
        showErrorMessage("Failed to deactivate feature.");
      }
    } catch (error) {
      console.error("Deactivate feature error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    createFeature,
    updateFeature,
    deleteFeature,
    activateFeature,
    deactivateFeature,
  };
};
