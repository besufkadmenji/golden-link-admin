import { useDict } from "@/hooks/useDict";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";
import { useQueryState } from "nuqs";
import { PackageService } from "@/services/package.service";
import { useLang } from "@/hooks/useLang";

export const useManagePackage = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const features = useForm((state) => state.features);
  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");

  const createPackage = async () => {
    setBusy(true);
    try {
      const response = await PackageService.createPackage(
        {
          ...form,
          features: features,
        }
      );
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ["packages"],
        });
        setShowSuccess("create");
      }
      resetForm();
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const updatePackage = async (id: string) => {
    setBusy(true);
    try {
      const {
        form: currentForm,
        features: currentFeatures,
        initialIconPath,
        existingIcon,
      } = useForm.getState();

      const shouldClearIcon =
        !!initialIconPath && !existingIcon && !currentForm.icon;

      const response = await PackageService.updatePackage(
        id,
        {
          ...currentForm,
          features: currentFeatures,
          ...(shouldClearIcon ? { iconPath: "" } : {}),
        }
      );
      if (response) {
        showSuccessMessage(dict.packages.messages.updateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["package", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["packages"],
        });
        router.push("/packages");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deletePackage = async (id: string) => {
    setBusy(true);
    try {
      await PackageService.deletePackage(id);
      showSuccessMessage(dict.packages.messages.deleteSuccess);
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["package", id],
      });
      router.push("/packages");
    } catch (error) {
      console.error("Delete package error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  const togglePackageStatus = async (
    id: string,
    status: "ACTIVE" | "INACTIVE",
  ) => {
    setBusy(true);
    try {
      const response = await PackageService.togglePackageStatus(
        id,
        status
      );
      if (response) {
        showSuccessMessage(
          status === "ACTIVE"
            ? dict.packages.messages.activateSuccess
            : dict.packages.messages.deactivateSuccess,
        );
        queryClient.invalidateQueries({
          queryKey: ["packages"],
        });
        queryClient.invalidateQueries({
          queryKey: ["package", id],
        });
      }
    } catch (error) {
      console.error("Toggle package status error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    createPackage,
    updatePackage,
    deletePackage,
    togglePackageStatus,
  };
};
