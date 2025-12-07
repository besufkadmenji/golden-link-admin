"use client";

import { Permissions } from "@/components/app/Admins/manage/Permissions";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import {
  FormInput,
  PasswordInput,
} from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { UploadInput } from "../../shared/UploadInput";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageAdmin } from "./useManageAdmin";
import { FormSelect } from "../../shared/forms/FormSelect";
import { statusMap } from "@/components/app/Admins/renderCell";
import { SuccessMessage } from "./SuccessMessage";
import { useQueryState } from "nuqs";

export const AddAdmin = () => {
  const { form, setForm } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createAdmin } = useManageAdmin();
  const { errors, validateForm, clearError } = useFormValidation(form);
  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Admins}
          onSubmit={() => {
            if (validateForm()) {
              createAdmin();
            }
          }}
          onCancel={() => {
            router.push("/admins");
          }}
          busy={busy}
          action="add"
        >
          <FormSection
            title={dict.add_new_admin_form.sections.admin_information}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.add_new_admin_form.labels.admin_name}
                placeholder={dict.add_new_admin_form.placeholders.admin_name}
                value={form.fullName}
                onChange={(value: string): void => {
                  setForm({ fullName: value });
                  clearError("fullName");
                }}
                errorMessage={errors.fullName}
              />
              <FormInput
                label={dict.add_new_admin_form.labels.phone_number}
                placeholder={dict.add_new_admin_form.placeholders.phone_number}
                value={form.phoneNumber}
                onChange={(value: string): void => {
                  setForm({ phoneNumber: value });
                  clearError("phoneNumber");
                }}
                errorMessage={errors.phoneNumber}
              />
              <FormSelect
                label={dict.add_new_admin_form.labels.status}
                placeholder={dict.add_new_admin_form.labels.status}
                value={form.status}
                onChange={(value: string): void => {
                  setForm({
                    status: value as
                      | "ACTIVE"
                      | "INACTIVE"
                      | "SUSPENDED"
                      | "PENDING_APPROVAL",
                  });
                  clearError("status");
                }}
                options={Object.entries(statusMap(dict)).map(
                  ([key, value]) => ({
                    label: value,
                    key: key,
                  }),
                )}
                errorMessage={errors.status}
              />
            </div>
          </FormSection>
          <FormSection
            title={dict.add_new_admin_form.sections.login_information}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.add_new_admin_form.labels.email}
                placeholder={dict.add_new_admin_form.labels.email}
                value={form.email}
                onChange={(value: string): void => {
                  setForm({ email: value });
                  clearError("email");
                }}
                errorMessage={errors.email}
              />
              <PasswordInput
                label={dict.add_new_admin_form.labels.password}
                placeholder={"********"}
                value={form.password}
                onChange={(value: string): void => {
                  setForm({ password: value });
                  clearError("password");
                }}
                errorMessage={errors.password}
              />
              <PasswordInput
                label={dict.add_new_admin_form.labels.confirm_password}
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
          <FormSection title="">
            <div className="grid grid-cols-1 gap-4">
              <UploadInput
                label={dict.add_new_admin_form.image.attach}
                desc={dict.add_new_admin_form.image.desc}
                file={form.profileImage}
                onChange={(file?: File): void => {
                  setForm({ profileImage: file });
                }}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
              />
            </div>
          </FormSection>
          <Permissions />
        </AppForm>
      </div>
      <SuccessMessage />
    </>
  );
};
