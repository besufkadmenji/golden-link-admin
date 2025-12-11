"use client";

import { Permissions } from "@/components/app/Admins/manage/Permissions";
import { statusMap } from "@/components/app/Admins/renderCell";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { UploadInput } from "../../shared/UploadInput";
import { useUserById } from "../useAdmins";
import { useForm, useManageForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageAdmin } from "./useManageAdmin";

export const EditAdmin = ({ id }: { id: string }) => {
  const { user } = useUserById(id);
  console.log("Edit Admin User:", user);
  const { form, setForm } = useManageForm(id, user);
  const existingPicture = useForm((state) => state.existingPicture);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const dict = useDict();
  const router = useRouter();
  const { busy, updateAdmin } = useManageAdmin();
  const { errors, validateForm, clearError } = useFormValidation(form, "edit");
  console.log("existingPicture:", existingPicture, user?.profileImagePath);
  return (
    <div className="grid grid-cols-1">
      <AppForm
        type={FormType.Admins}
        onSubmit={() => {
          if (validateForm()) {
            updateAdmin(id);
          }
        }}
        onCancel={() => {
          router.push("/admins");
        }}
        busy={busy}
        action="edit"
      >
        <FormSection title={dict.edit_admin_form.sections.admin_information}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label={dict.edit_admin_form.labels.admin_name}
              placeholder={dict.edit_admin_form.placeholders.admin_name}
              value={form.fullName}
              onChange={(value: string): void => {
                setForm({ fullName: value });
                clearError("fullName");
              }}
              errorMessage={errors.fullName}
            />
            <FormInput
              label={dict.edit_admin_form.labels.phone_number}
              placeholder={dict.edit_admin_form.placeholders.phone_number}
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
              options={Object.entries(statusMap(dict)).map(([key, value]) => ({
                label: value,
                key: key,
              }))}
              errorMessage={errors.status}
            />
          </div>
        </FormSection>
        <FormSection title={dict.edit_admin_form.sections.login_information}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label={dict.edit_admin_form.labels.email}
              placeholder={dict.edit_admin_form.labels.email}
              value={form.email}
              onChange={(value: string): void => {
                setForm({ email: value });
                clearError("email");
              }}
              errorMessage={errors.email}
            />
          </div>
        </FormSection>
        <FormSection title="">
          <div className="grid grid-cols-1 gap-4">
            <UploadInput
              label={dict.edit_admin_form.image.attach}
              desc={dict.edit_admin_form.image.desc}
              file={form.profileImage}
              onChange={(file?: File): void => {
                setForm({ profileImage: file });
                if (!file) {
                  setExistingPicture(null);
                }
              }}
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              initUrl={existingPicture || undefined}
            />
          </div>
        </FormSection>
        <Permissions />
      </AppForm>
    </div>
  );
};
