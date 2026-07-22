"use client";

import { statusMap } from "@/components/app/Packages/renderCell";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useFormResetOnLeave } from "@/hooks/useFormResetOnLeave";
import { FormSelect } from "../../shared/forms/FormSelect";
import { UploadInput } from "../../shared/UploadInput";
import { SuccessMessage } from "./SuccessMessage";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManagePackage } from "./useManagePackage";
import { PackageFeaturesSection } from "./PackageFeaturesSection";
import { IMAGE_FILE_ACCEPT } from "@/utils/fileAccept";
import { twMerge } from "tailwind-merge";
import { sar } from "@/assets/fonts/sar";
import { useRequirePermission } from "@/hooks/useRequirePermission";

export const AddPackage = () => {
  useRequirePermission("packages", "create");
  const { form, setForm, features, setFeatures, reset } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createPackage } = useManagePackage();
  const { errors, validateForm, clearError } = useFormValidation(
    form,
    features,
    { requireIcon: true },
  );

  useFormResetOnLeave(reset);

  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Packages}
          onSubmit={() => {
            const result = validateForm();
            if (result.isValid) {
              createPackage();
            }
          }}
          onCancel={() => {
            router.push("/packages");
          }}
          busy={busy}
          action="add"
        >
          <FormSection
            title={dict.add_new_package_form.sections.package_information}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
              <FormInput
                label={dict.add_new_package_form.labels.package_name}
                placeholder={
                  dict.add_new_package_form.placeholders.package_name
                }
                value={form.packageName}
                onChange={(value: string): void => {
                  setForm({ packageName: value });
                  clearError("packageName");
                }}
                errorMessage={errors.packageName}
              />
              <FormInput
                label={dict.add_new_package_form.labels.package_duration}
                placeholder={
                  dict.add_new_package_form.placeholders.package_duration
                }
                value={form.packageDuration.toString()}
                onChange={(value: string): void => {
                  setForm({ packageDuration: value });
                  clearError("packageDuration");
                }}
                type="number"
                errorMessage={errors.packageDuration}
              />
              <FormInput
                label={dict.add_new_package_form.labels.package_price}
                placeholder={
                  dict.add_new_package_form.placeholders.package_price
                }
                value={form.packagePrice.toString()}
                onChange={(value: string): void => {
                  setForm({ packagePrice: value });
                  clearError("packagePrice");
                }}
                errorMessage={errors.packagePrice}
                endContent={
                  <span
                    className={twMerge("text-sm text-[#9FA2B4]", sar.className)}
                  >
                    A
                  </span>
                }
              />
              <FormSelect
                label={dict.add_new_package_form.labels.status}
                placeholder={dict.add_new_package_form.labels.status}
                value={form.status ?? "ACTIVE"}
                onChange={(value: string): void => {
                  setForm({ status: value as "ACTIVE" | "INACTIVE" });
                  clearError("status");
                }}
                options={[
                  { label: statusMap(dict).ACTIVE, key: "ACTIVE" },
                  { label: statusMap(dict).INACTIVE, key: "INACTIVE" },
                ]}
                errorMessage={errors.status}
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <UploadInput
                label={dict.add_new_package_form.image.attach}
                desc={dict.add_new_package_form.image.desc}
                file={form.icon}
                onChange={(file?: File): void => {
                  setForm({ icon: file });
                  clearError("icon");
                }}
                errorMessage={errors.icon}
                accept={IMAGE_FILE_ACCEPT}
              />
              <FormAreaInput
                label={dict.add_new_package_form.labels.description}
                placeholder={dict.add_new_package_form.placeholders.description}
                value={form.description ?? ""}
                onChange={(value: string): void => {
                  setForm({ description: value });
                  clearError("description");
                }}
                errorMessage={errors.description}
                isOptional
              />
            </div>
          </FormSection>

          <PackageFeaturesSection
            features={features}
            onChange={(partial) => {
              setFeatures(partial);
              clearError("features");
            }}
            errorMessage={errors.features}
          />
        </AppForm>
      </div>
      <SuccessMessage />
    </>
  );
};
