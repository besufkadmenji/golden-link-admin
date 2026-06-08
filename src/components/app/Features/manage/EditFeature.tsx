"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { UploadInput } from "../../shared/UploadInput";
import { useFeatureById } from "../useFeatures";
import { useForm, useManageForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageFeature } from "./useManageFeature";
import { useFormResetOnLeave } from "@/hooks/useFormResetOnLeave";
import { AppLoading } from "@/components/app/shared/AppLoading";

export const EditFeature = ({ id }: { id: string }) => {
  const featureId = Number(id);
  const { feature, isLoading, isFetching } = useFeatureById(featureId);
  const { form, setForm, reset, ready } = useManageForm(featureId, feature);
  useFormResetOnLeave(reset);
  const existingPicture = useForm((state) => state.existingPicture);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const dict = useDict();
  const router = useRouter();
  const { busy, updateFeature } = useManageFeature();
  const { errors, validateForm, clearError } = useFormValidation(form);

  if (isLoading || isFetching || !feature || !ready) {
    return <AppLoading className="h-[84vh]" />;
  }

  return (
    <div className="grid grid-cols-1">
      <AppForm
        type={FormType.Features}
        onSubmit={() => {
          if (validateForm()) {
            updateFeature(featureId);
          }
        }}
        onCancel={() => {
          router.push("/content/features");
        }}
        busy={busy}
        action="edit"
      >
        <FormSection title={dict.features_management.detail.title}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label={dict.features_management.form.labels.name_ar}
              placeholder={dict.features_management.form.placeholders.name_ar}
              value={form.nameAr}
              onChange={(value: string): void => {
                setForm({ nameAr: value });
                clearError("nameAr");
              }}
              errorMessage={errors.nameAr}
              dir="rtl"
            />

            <FormInput
              label={dict.features_management.form.labels.name_en}
              placeholder={dict.features_management.form.placeholders.name_en}
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
              initUrl={existingPicture ?? ""}
              onChange={(file?: File): void => {
                setForm({ featurePhoto: file });
                if (!file) {
                  setExistingPicture(null);
                }
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
  );
};
