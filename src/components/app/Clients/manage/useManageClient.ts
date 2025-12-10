import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { ClientService } from "@/services/client.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "./useForm";

export const useManageClient = () => {
  const [busy, setBusy] = useState(false);
  const form = useForm((state) => state.form);
  const resetForm = useForm((state) => state.reset);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const [, setActivateClient] = useQueryState("activateClient");
  const [, setDeactivateClient] = useQueryState("deactivateClient");

  const createClient = async () => {
    setBusy(true);
    try {
      const response = await ClientService.createClient(form);
      if (response) {
        resetForm();
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
        queryClient.invalidateQueries({
          queryKey: ["client"],
        });
        showSuccessMessage(dict.clients_management.messages.createSuccess);
        router.push("/clients");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const updateClient = async (id: number) => {
    setBusy(true);
    try {
      const response = await ClientService.updateClient(id, form);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.updateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["client", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
        router.push("/clients");
      }
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteClient = async (id: number) => {
    setBusy(true);
    try {
      const success = await ClientService.deleteClient(id);
      if (success) {
        showSuccessMessage(dict.clients_management.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
        queryClient.invalidateQueries({
          queryKey: ["client", id],
        });
        router.push("/clients");
      } else {
        showErrorMessage("Failed to delete client.");
      }
    } catch (error) {
      console.error("Delete client error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  const activateClient = async (id: number) => {
    setBusy(true);
    try {
      const success = await ClientService.activateClient(id, lang);
      console.log("Activate client success:", success);
      if (success) {
        showSuccessMessage(dict.clients_management.messages.activateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
        queryClient.invalidateQueries({
          queryKey: ["client", id],
        });
        setActivateClient(null);
      } else {
        showErrorMessage("Failed to activate client.");
      }
    } catch (error) {
      console.error("Activate client error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  const deactivateClient = async (id: number, reason?: string) => {
    setBusy(true);
    try {
      const success = await ClientService.deactivateClient(
        id,
        reason ?? "",
        lang,
      );
      if (success) {
        showSuccessMessage(dict.clients_management.messages.deactivateSuccess);
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
        queryClient.invalidateQueries({
          queryKey: ["client", id],
        });
        setDeactivateClient(null);
      } else {
        showErrorMessage("Failed to deactivate client.");
      }
    } catch (error) {
      console.error("Deactivate client error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    createClient,
    updateClient,
    deleteClient,
    activateClient,
    deactivateClient,
  };
};
