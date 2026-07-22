"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageNotification } from "./useManageNotification";
import { FormSelectMultiple } from "@/components/app/shared/forms/FormSelect";
import { useSubscribers } from "../../Subscribers/useSubscriber";
import { useFormResetOnLeave } from "@/hooks/useFormResetOnLeave";
import { ALL_RECIPIENTS_KEY } from "./constants";
import { useRequirePermission } from "@/hooks/useRequirePermission";

export const AddNotification = () => {
  useRequirePermission("notifications", "create");
  const { form, setForm, reset } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createNotification } = useManageNotification();
  const { errors, validateForm, clearError, clearErrors } = useFormValidation(form);
  const formKey = useFormResetOnLeave(reset, {
    resetOnEnter: true,
    onReset: clearErrors,
  });
  const { data: subscribers } = useSubscribers();

  const recipientOptions = useMemo(
    () => [
      {
        label: dict.add_new_notification_form.labels.allRecipients,
        key: ALL_RECIPIENTS_KEY,
      },
      ...(subscribers?.subscribers
        .filter((subscriber) => subscriber.status === "ACTIVE")
        .map((subscriber) => ({
          label: subscriber.fullName,
          key: subscriber.id,
        })) ?? []),
    ],
    [subscribers, dict],
  );

  const handleRecipientsChange = (value: string[]): void => {
    const hadAll = form.recipientIds.includes(ALL_RECIPIENTS_KEY);
    const hasAll = value.includes(ALL_RECIPIENTS_KEY);

    if (hasAll && !hadAll) {
      setForm({ recipientIds: [ALL_RECIPIENTS_KEY] });
    } else if (hadAll && hasAll && value.length > 1) {
      setForm({
        recipientIds: value.filter((id) => id !== ALL_RECIPIENTS_KEY),
      });
    } else {
      setForm({ recipientIds: value });
    }

    clearError("recipientIds");
  };

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
            <div
              key={`notification-form-${formKey}`}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start"
            >
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
                onChange={handleRecipientsChange}
                options={recipientOptions}
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
