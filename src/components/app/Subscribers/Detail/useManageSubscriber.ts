import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { UserService } from "@/services/user.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useManageSubscriber = () => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const dict = useDict();
  const lang = useLang();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );

  const deleteSubscriber = async (id: string) => {
    setBusy(true);
    try {
      const response = await UserService.deleteUser(id);
      if (response) {
        showSuccessMessage(dict.system_managers_page.messages.deleteSuccess);
        queryClient.invalidateQueries({
          queryKey: ["subscribers"],
        });
        queryClient.invalidateQueries({
          queryKey: ["subscribers", id],
        });
        router.push("/subscribers");
      }
    } catch (error) {
      console.error("Delete subscriber error wtf:", error);
      showErrorMessage(
        error instanceof Error
          ? error
          : (error as string) || "An error occurred.",
      );
    } finally {
      setBusy(false);
      setIsDeleteWarningOpen(null);
    }
  };

  return {
    busy,
    deleteSubscriber,
  };
};
