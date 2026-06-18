import { useDict } from "@/hooks/useDict";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "./useForm";
import { useQueryState } from "nuqs";
import { UserService } from "@/services/user.service";
import { PermissionService } from "@/services/permission.service";
import { DeactivateUserDto } from "@/types/user";

export const useManageAdmin = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const permissionIds = useForm((state) => state.permissionIds);
  const router = useRouter();
  const dict = useDict();
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
            }
          );
        }
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
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

  const updateAdmin = async (id: string) => {
    setBusy(true);
    try {
      const {
        form: currentForm,
        permissionIds: currentPermissionIds,
        initialPermissionIds: currentInitialPermissionIds,
        profileImageRemoved,
        initialProfileImagePath,
        setPermissionIds,
        setInitialPermissionIds,
      } = useForm.getState();

      const shouldRemoveProfileImage =
        profileImageRemoved &&
        !!initialProfileImagePath &&
        !currentForm.profileImage;

      if (shouldRemoveProfileImage) {
        await UserService.deleteProfileImage(id);
      }

      const { password, confirmPassword, ...rest } = currentForm;
      const switchingToFullAccess =
        currentForm.permissionType !== "CUSTOM" &&
        currentInitialPermissionIds.length > 0;
      const profileFields = { ...rest };
      delete profileFields.permissionType;

      const response = await UserService.updateUser(
        id,
        switchingToFullAccess ? profileFields : rest,
      );
      if (response) {
        if (currentForm.permissionType === "CUSTOM") {
          const revokedIds = currentInitialPermissionIds.filter(
            (pid) => !currentPermissionIds.includes(pid),
          );
          const newlyAddedIds = currentPermissionIds.filter(
            (pid) => !currentInitialPermissionIds.includes(pid),
          );
          await Promise.all([
            ...(newlyAddedIds.length > 0
              ? [
                  PermissionService.assignPermissions(
                    {
                      userId: response.id,
                      permissionIds: newlyAddedIds,
                    }
                  ),
                ]
              : []),
            ...revokedIds.map((pid) =>
              PermissionService.revokePermission(
                pid,
                { userId: response.id }
              ),
            ),
          ]);
          setInitialPermissionIds(currentPermissionIds);
        } else if (switchingToFullAccess) {
          await Promise.all(
            currentInitialPermissionIds.map((pid) =>
              PermissionService.revokePermission(pid, {
                userId: response.id,
              }),
            ),
          );
          await UserService.updateUser(id, {
            permissionType: currentForm.permissionType,
          });
          setPermissionIds([]);
          setInitialPermissionIds([]);
        }
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["userPermissions", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        setShowSuccess("edit");
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
        showErrorMessage(dict.system_managers_page.messages.deleteError);
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
      const success = await UserService.activateUser(id);
      if (success) {
        showSuccessMessage(success);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        setActivateAdmin(null);
      } else {
        showErrorMessage(dict.system_managers_page.messages.activateError);
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

  const deactivateAdmin = async (id: string, reason?: string) => {
    setBusy(true);
    try {
      const deactivateData: DeactivateUserDto = reason ? { reason } : {};
      const success = await UserService.deactivateUser(
        id,
        deactivateData
      );
      if (success) {
        showSuccessMessage(success);
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
        setDeactivateAdmin(null);
      } else {
        showErrorMessage(dict.system_managers_page.messages.deactivateError);
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
