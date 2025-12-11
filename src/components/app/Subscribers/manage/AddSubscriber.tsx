"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import {
  FormInput,
  PasswordInput,
} from "@/components/app/shared/forms/FormInput";
import { useManageSubscriber } from "@/components/app/Subscribers/manage/useManageSubscriber";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { FormSelect } from "../../shared/forms/FormSelect";
import { UploadInput } from "../../shared/UploadInput";
import { typeMap } from "../renderCell";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { SuccessMessage } from "@/components/app/Subscribers/manage/SuccessMessage";

export const AddSubscriber = () => {
  const { form, setForm } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createSubscriber } = useManageSubscriber();
  const { errors, validateForm, clearError } = useFormValidation(form);
  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Subscribers}
          onSubmit={() => {
            if (validateForm()) {
              createSubscriber();
            }
          }}
          onCancel={() => {
            router.push("/subscribers");
          }}
          busy={busy}
          action="add"
          classNames={{
            title: "grid grid-cols-1 md:flex gap-2",
          }}
        >
          <FormSection
            title={dict.add_new_subscriber_form.sections.subscriber_information}
          >
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              <FormInput
                label={dict.add_new_subscriber_form.labels.name}
                placeholder={dict.add_new_subscriber_form.placeholders.name}
                value={form.fullName}
                onChange={(value: string): void => {
                  setForm({ fullName: value });
                  clearError("fullName");
                }}
                errorMessage={errors.fullName}
              />
              <FormInput
                label={dict.add_new_subscriber_form.labels.organization_name}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.organization_name
                }
                value={form.organizationName}
                onChange={(value: string): void => {
                  setForm({ organizationName: value });
                  clearError("organizationName");
                }}
                errorMessage={errors.organizationName}
              />
              <FormInput
                label={dict.add_new_subscriber_form.labels.phone_number}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.phone_number
                }
                value={form.phoneNumber}
                onChange={(value: string): void => {
                  setForm({ phoneNumber: value });
                  clearError("phoneNumber");
                }}
                errorMessage={errors.phoneNumber}
              />
              <FormSelect
                label={dict.add_new_subscriber_form.labels.type}
                placeholder={dict.add_new_subscriber_form.labels.type}
                value={form.type}
                onChange={(value: string): void => {
                  setForm({
                    type: value as "WAREHOUSE_OWNER" | "SUPPLIER" | "CUSTOMER",
                  });
                  clearError("type");
                }}
                options={Object.entries(typeMap(dict)).map(([key, value]) => ({
                  label: value,
                  key: key,
                }))}
                errorMessage={errors.status}
              />
              <FormInput
                label={
                  dict.add_new_subscriber_form.labels
                    .commercial_registration_number
                }
                placeholder={
                  dict.add_new_subscriber_form.placeholders
                    .commercial_registration_number
                }
                value={form.commercialRegistrationNumber}
                onChange={(value: string): void => {
                  setForm({ commercialRegistrationNumber: value });
                  clearError("commercialRegistrationNumber");
                }}
                errorMessage={errors.commercialRegistrationNumber}
                className="col-span-2"
              />
              <div className="md:col-span-2 grid grid-cols-1 gap-4">
                <UploadInput
                  label={dict.add_new_subscriber_form.image.attach}
                  desc={dict.add_new_subscriber_form.image.desc}
                  file={form.commercialRegistrationImagePath}
                  onChange={(file?: File): void => {
                    setForm({ commercialRegistrationImagePath: file });
                    clearError("commercialRegistrationImagePath");
                  }}
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "application/pdf": [],
                  }}
                  errorMessage={errors.commercialRegistrationImagePath}
                />
              </div>
            </div>
          </FormSection>
          <FormSection
            title={dict.add_new_subscriber_form.sections.login_information}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
              <FormInput
                label={dict.add_new_subscriber_form.labels.email}
                placeholder={dict.add_new_subscriber_form.labels.email}
                value={form.email}
                onChange={(value: string): void => {
                  setForm({ email: value });
                  clearError("email");
                }}
                errorMessage={errors.email}
              />
              <PasswordInput
                label={dict.add_new_subscriber_form.labels.password}
                placeholder={"********"}
                value={form.password}
                onChange={(value: string): void => {
                  setForm({ password: value });
                  clearError("password");
                }}
                errorMessage={errors.password}
              />
              <PasswordInput
                label={dict.add_new_subscriber_form.labels.confirm_password}
                placeholder={"********"}
                value={form.confirmPassword ?? ""}
                onChange={(value: string): void => {
                  setForm({ confirmPassword: value });
                  clearError("confirmPassword");
                }}
                errorMessage={errors.confirmPassword}
              />
            </div>
          </FormSection>
          <FormSection
            title={
              dict.add_new_subscriber_form.sections.tax_registration_information
            }
          >
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label={dict.add_new_subscriber_form.labels.tax_number}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.tax_number
                }
                value={form.taxRegistrationNumber}
                onChange={(value: string): void => {
                  setForm({ taxRegistrationNumber: value });
                  clearError("taxRegistrationNumber");
                }}
                errorMessage={errors.taxRegistrationNumber}
              />
              <div className="grid grid-cols-1 gap-4">
                <UploadInput
                  label={dict.add_new_subscriber_form.image.upload_tax_document}
                  desc={dict.add_new_subscriber_form.image.desc_tax}
                  file={form.taxRegistrationImagePath}
                  onChange={(file?: File): void => {
                    setForm({ taxRegistrationImagePath: file });
                    clearError("taxRegistrationImagePath");
                  }}
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "application/pdf": [],
                  }}
                  errorMessage={errors.taxRegistrationImagePath}
                />
              </div>
            </div>
          </FormSection>
        </AppForm>
      </div>
      <SuccessMessage />
    </>
  );
};
