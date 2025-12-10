import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { MessageService } from "@/services/message.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useManageMessage = () => {
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const [, setSendReply] = useQueryState("sendReply");

  const sendReply = async (id: string, reply: string) => {
    setBusy(true);
    try {
      await MessageService.replyToMessage(
        id,
        {
          replyContent: reply,
        },
        lang,
      );
      setSendReply(null);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["message"] });
      showSuccessMessage(dict.reply_message_form.messages.updateSuccess);
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
    sendReply,
  };
};
