"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { FormSelect } from "../../shared/forms/FormSelect";
import { UploadInput } from "../../shared/UploadInput";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageFeature } from "./useManageFeature";
import { FormAreaInput } from "../../shared/forms/FormAreaInput";

export const AddFeature = () => {
  const { form, setForm } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createFeature } = useManageFeature();
  const { errors, validateForm, clearError } = useFormValidation(form);
  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Features}
          onSubmit={() => {
            if (validateForm()) {
              createFeature();
            }
          }}
          onCancel={() => {
            router.push("/content/features");
          }}
          busy={busy}
          action="add"
        >
          <FormSection title={dict.features_management.detail.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label={"اسم الميزة"}
                placeholder={dict.features_management.form.placeholders.name}
                value={form.nameAr}
                onChange={(value: string): void => {
                  setForm({ nameAr: value });
                  clearError("nameAr");
                }}
                errorMessage={errors.nameAr}
                dir="rtl"
              />

              <FormInput
                label={"Feature Name"}
                placeholder={dict.features_management.form.placeholders.name}
                value={form.name}
                onChange={(value: string): void => {
                  setForm({ name: value });
                  clearError("name");
                }}
                errorMessage={errors.name}
                dir="ltr"
              />

              <FormSelect
                label={dict.features_management.form.labels.status}
                placeholder={dict.features_management.form.labels.status}
                value={form.isActive ? "ACTIVE" : "INACTIVE"}
                onChange={(value: string): void => {
                  setForm({
                    isActive: value === "ACTIVE" ? true : false,
                  });
                  clearError("status");
                }}
                options={[
                  {
                    key: "ACTIVE",
                    label: dict.common.statuses.ACTIVE,
                  },
                  {
                    key: "INACTIVE",
                    label: dict.common.statuses.INACTIVE,
                  },
                ]}
                errorMessage={errors.status}
              />
              <FormAreaInput
                label={dict.features_management.form.labels.description_ar}
                placeholder={
                  dict.features_management.form.placeholders.description_ar
                }
                value={form.descriptionAr}
                onChange={(value: string): void => {
                  setForm({ descriptionAr: value });
                  clearError("descriptionAr");
                }}
                errorMessage={errors.descriptionAr}
                dir="rtl"
                className="md:col-span-2"
              />
              <FormAreaInput
                label={dict.features_management.form.labels.description_en}
                placeholder={
                  dict.features_management.form.placeholders.description_en
                }
                value={form.description}
                onChange={(value: string): void => {
                  setForm({ description: value });
                  clearError("description");
                }}
                errorMessage={errors.description}
                dir="ltr"
                className="md:col-span-2"
              />
            </div>
          </FormSection>

          <FormSection title="">
            <div className="grid grid-cols-1 gap-4">
              <UploadInput
                label={dict.features_management.form.upload_info.title}
                desc={dict.features_management.form.upload_info.description}
                file={form.featurePhoto}
                onChange={(file?: File): void => {
                  setForm({ featurePhoto: file });
                }}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
              />
            </div>
          </FormSection>
        </AppForm>
      </div>
    </>
  );
};
