import { useDict } from "@/hooks/useDict";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";
import { useQueryState } from "nuqs";
import { UserService } from "@/services/user.service";
import { PermissionService } from "@/services/permission.service";
import { useLang } from "@/hooks/useLang";
import { DeactivateUserDto } from "@/types/user";

export const useManageAdmin = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const permissionIds = useForm((state) => state.permissionIds);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [showSuccess, setShowSuccess] = useQueryState("showSuccess");
  const [, setActivateAdmin] = useQueryState("activateAdmin");
  const [, setDeactivateAdmin] = useQueryState("deactivateAdmin");

  const createAdmin = async () => {
    setBusy(true);
    try {
      const response = await UserService.createUser(form);
      if (response) {
        if (form.permissionType === "CUSTOM") {
          await PermissionService.assignPermissions(
            {
              userId: response.id,
              permissionIds: permissionIds || [],
            },
            lang,
          );
        }
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setShowSuccess("true");
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
      const success = await UserService.deleteUser(id);
      if (success) {
        showSuccessMessage(dict.system_managers_page.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        router.push("/admins");
      } else {
        showErrorMessage("Failed to delete admin.");
      }
    } catch (error) {
      console.error("Delete admin error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  const activateAdmin = async (id: string) => {
    setBusy(true);
    try {
      const success = await UserService.activateUser(id, lang);
      if (success) {
        showSuccessMessage(dict.system_managers_page.messages.activateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        setActivateAdmin(null);
      } else {
        showErrorMessage("Failed to activate admin.");
      }
    } catch (error) {
      console.error("Activate admin error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deactivateAdmin = async (id: string, data: DeactivateUserDto) => {
    setBusy(true);
    try {
      const success = await UserService.deactivateUser(id, data, lang);
      if (success) {
        showSuccessMessage(
          dict.system_managers_page.messages.deactivateSuccess,
        );
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        setDeactivateAdmin(null);
      } else {
        showErrorMessage("Failed to deactivate admin.");
      }
    } catch (error) {
      console.error("Deactivate admin error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    activateAdmin,
    deactivateAdmin,
  };
};
