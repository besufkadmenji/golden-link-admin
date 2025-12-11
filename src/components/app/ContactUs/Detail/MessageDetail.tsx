"use client";
import SendIcon from "@/assets/icons/app/message.svg";
import { SendReply } from "@/components/app/ContactUs/Detail/SendReply";
import { typeMap } from "@/components/app/ContactUs/renderCell";
import { useGetMessageById } from "@/components/app/ContactUs/useMessage";
import { AppLoading } from "@/components/app/shared/AppLoading";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import moment from "moment";
import { PrimaryButton } from "../../shared/button/PrimaryButton";
import { useQueryState } from "nuqs";
export const MessageDetail = ({ id }: { id: string }) => {
  const { data: message } = useGetMessageById(id);
  const [, setSendReply] = useQueryState("sendReply");

  const dict = useDict();
  return !message ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Message}
          action="view"
          titleChildren={
            <PrimaryButton
              startContent={<SendIcon className="size-5" />}
              className="text-sm font-semibold"
              onPress={() => setSendReply("true")}
            >
              {dict.reply_message_form.buttons.send}
            </PrimaryButton>
          }
        >
          <FormSection title={dict.contact_us_form.sectionTitle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={dict.contact_us_form.labels.subscriber_name}
                placeholder={dict.contact_us_form.labels.subscriber_name}
                value={message.customerName}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={dict.contact_us_form.labels.phone_number}
                placeholder={dict.contact_us_form.labels.phone_number}
                value={message.mobileNumber}
                onChange={(value: string): void => {}}
                readOnly
              />

              <FormInput
                label={dict.contact_us_form.labels.email}
                placeholder={dict.contact_us_form.labels.email}
                value={message.email}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormSelect
                label={dict.contact_us_form.labels.message_type}
                placeholder={dict.contact_us_form.labels.message_type}
                value={message.messageType}
                onChange={(value: string): void => {}}
                readOnly
                options={Object.keys(typeMap(dict)).map((key) => ({
                  label: typeMap(dict)[key as keyof typeof typeMap],
                  key: key,
                }))}
              />

              <FormInput
                label={dict.contact_us_form.labels.received_date}
                placeholder={dict.contact_us_form.labels.received_date}
                value={moment(message.createdAt).format("DD/MM/YYYY hh:mm a")}
                onChange={(value: string): void => {}}
                readOnly
                className="md:col-span-2"
              />
              <FormAreaInput
                label={dict.contact_us_form.labels.message_content}
                placeholder={dict.contact_us_form.labels.message_content}
                value={message.messageContent}
                onChange={(value: string): void => {}}
                className="md:col-span-2"
                readOnly
              />
              <FormAreaInput
                label={dict.contact_us_form.labels.reply_content}
                placeholder={dict.contact_us_form.labels.reply_content}
                value={message.replyContent ?? "-"}
                onChange={(value: string): void => {}}
                className="md:col-span-2"
                readOnly
              />
            </div>
          </FormSection>
        </AppForm>
      </div>
      <SendReply />
    </>
  );
};
