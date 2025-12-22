"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";
import { FormSelect } from "../../shared/forms/FormSelect";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageNotification } from "./useManageNotification";
import { FormSelectMultiple } from "@/components/app/shared/forms/FormSelect";
import { useSubscribers } from "../../Subscribers/useSubscriber";

export const AddNotification = () => {
  const { form, setForm } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createNotification } = useManageNotification();
  const { errors, validateForm, clearError } = useFormValidation(form);
  const { data: subscribers } = useSubscribers();
  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Notifications}
          onSubmit={() => {
            if (validateForm()) {
              createNotification();
            }
          }}
          onCancel={() => {
            router.push("/notifications");
          }}
          busy={busy}
          action="add"
        >
          <FormSection
            title={
              dict.add_new_notification_form.sections.notification_information
            }
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
              <FormInput
                label={dict.add_new_notification_form.labels.title}
                placeholder={dict.add_new_notification_form.placeholders.title}
                value={form.title}
                onChange={(value: string): void => {
                  setForm({ title: value });
                  clearError("title");
                }}
                errorMessage={errors.title}
              />
              <FormSelectMultiple
                label={dict.add_new_notification_form.labels.recipients}
                placeholder={dict.add_new_notification_form.labels.recipients}
                values={form.recipientIds}
                onChange={(value: string[]): void => {
                  setForm({
                    recipientIds: value,
                  });
                  clearError("recipientIds");
                }}
                options={
                  subscribers?.subscribers
                    .filter((s) => s.status === "ACTIVE")
                    .map((subscriber) => ({
                      label: subscriber.fullName,
                      key: subscriber.id,
                    })) ?? []
                }
                errorMessage={errors.recipientIds}
              />
              <FormAreaInput
                label={dict.add_new_notification_form.labels.content}
                placeholder={
                  dict.add_new_notification_form.placeholders.content
                }
                value={form.content}
                onChange={(value: string): void => {
                  setForm({ content: value });
                  clearError("content");
                }}
                errorMessage={errors.content}
                className="md:col-span-2"
              />
            </div>
          </FormSection>
        </AppForm>
      </div>
    </>
  );
};
