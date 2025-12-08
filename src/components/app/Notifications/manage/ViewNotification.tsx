"use client";

import { useNotificationById } from "@/components/app/Notifications/useNotifications";
import { useSubscribers } from "@/components/app/Subscribers/useSubscriber";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelectMultiple } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { AppLoading } from "../../shared/AppLoading";

export const ViewNotification = ({ id }: { id: string }) => {
  const { notification } = useNotificationById(id);
  const dict = useDict();
  const router = useRouter();
  const { data: subscribers } = useSubscribers();

  return !notification ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm type={FormType.Notifications} action="view">
        <FormSection
          title={
            dict.notification_detail_page.sections.notification_information
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={dict.add_new_notification_form.labels.title}
              placeholder={dict.add_new_notification_form.placeholders.title}
              value={notification.title}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormSelectMultiple
              label={dict.add_new_notification_form.labels.recipients}
              placeholder={dict.add_new_notification_form.labels.recipients}
              values={notification.recipients.map((r) => r.userId)}
              onChange={(value: string[]): void => {}}
              options={
                subscribers?.subscribers.map((subscriber) => ({
                  label: subscriber.fullName,
                  key: subscriber.id,
                })) ?? []
              }
              readOnly
            />
            <FormAreaInput
              label={dict.notification_detail_page.labels.content}
              placeholder={dict.add_new_notification_form.placeholders.content}
              value={notification.content}
              onChange={(value: string): void => {}}
              className="col-span-2"
              readOnly
            />
          </div>
        </FormSection>
      </AppForm>
    </div>
  );
};
