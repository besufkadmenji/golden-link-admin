import { useDict } from "@/hooks/useDict";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";
import { useQueryState } from "nuqs";
import { UserService } from "@/services/user.service";

export const useManageAdmin = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );

  const createAdmin = async () => {
    setBusy(true);
    try {
      const response = await UserService.createUser(form);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.createSuccess);
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        router.push("/admins");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const updateAdmin = async (id: string) => {
    setBusy(true);
    try {
      const response = await UserService.updateUser(id, form);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.updateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        router.push("/admins");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    setBusy(true);
    try {
      const response = await UserService.deleteUser(id);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        router.push("/admins");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  return {
    busy,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  };
};
