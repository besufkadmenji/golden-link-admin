import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { PasswordInput } from "@/components/app/shared/forms/FormInput";
import { PrimaryButton } from "@/components/app/shared/button/PrimaryButton";
import { useDict } from "@/hooks/useDict";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { useState } from "react";
import { useManageMessage } from "./useManageMessage";
import { useParams } from "next/navigation";

export const SendReply = () => {
  const [sendReply, setSendReply] = useQueryState("sendReply");
  const dict = useDict();
  const [reply, setReply] = useState("");
  const params = useParams();
  const id = params.id as string;
  const { sendReply: sendReplyHandle, busy } = useManageMessage();
  return (
    <Modal isOpen={!!sendReply} onClose={() => setSendReply(null)}>
      <ModalContent>
        <div className="grid grid-cols-1 gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h2 className="text-xl leading-7 font-bold text-[#1E1E1E]">
              {dict.reply_message_form.title}
            </h2>
            <p className="text-base font-medium text-[#A5A7A5]">
              {dict.reply_message_form.description}
            </p>
          </div>
          <FormAreaInput
            label={dict.reply_message_form.labels.message_content}
            placeholder={dict.reply_message_form.labels.message_content}
            value={reply}
            onChange={(value: string): void => setReply(value)}
            className="col-span-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <PrimaryButton
              className="bg-[#4285F41A] text-[#4285F4]"
              onPress={() => setSendReply(null)}
              isDisabled={busy}
            >
              {dict.reply_message_form.buttons.cancel}
            </PrimaryButton>
            <PrimaryButton
              onPress={() => sendReplyHandle(id, reply)}
              isLoading={busy}
              isDisabled={busy}
            >
              {dict.reply_message_form.buttons.send}
            </PrimaryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
