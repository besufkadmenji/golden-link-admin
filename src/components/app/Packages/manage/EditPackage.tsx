"use client";

import { statusMap } from "@/components/app/Packages/renderCell";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { UploadInput } from "../../shared/UploadInput";
import { usePackageById } from "../usePackages";
import { useForm, useManageForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManagePackage } from "./useManagePackage";
import { useEffect } from "react";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { Checkbox } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { sar } from "@/assets/fonts/sar";

export const EditPackage = ({ id }: { id: string }) => {
  const { pkg } = usePackageById(id);
  const { form, setForm, reset, ready, features, setFeatures } = useManageForm(
    id,
    pkg,
  );
  const existingIcon = useForm((state) => state.existingIcon);
  const setExistingIcon = useForm((state) => state.setExistingIcon);
  const dict = useDict();
  const router = useRouter();
  const { busy, updatePackage } = useManagePackage();
  const { errors, validateForm, clearError } = useFormValidation(
    form,
    features,
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return !pkg || !ready ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm
        type={FormType.Packages}
        onSubmit={() => {
          if (validateForm()) {
            updatePackage(id);
          }
        }}
        onCancel={() => {
          router.push("/packages");
        }}
        busy={busy}
        action="edit"
      >
        <FormSection
          title={dict.edit_package_form.sections.package_information}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label={dict.edit_package_form.labels.package_name}
              placeholder={dict.edit_package_form.placeholders.package_name}
              value={form.packageName}
              onChange={(value: string): void => {
                setForm({ packageName: value });
                clearError("packageName");
              }}
              errorMessage={errors.packageName}
            />
            <FormInput
              label={dict.edit_package_form.labels.package_duration}
              placeholder={dict.edit_package_form.placeholders.package_duration}
              value={form.packageDuration.toString()}
              onChange={(value: string): void => {
                setForm({ packageDuration: value });
                clearError("packageDuration");
              }}
              type="number"
              errorMessage={errors.packageDuration}
            />
            <FormInput
              label={dict.edit_package_form.labels.package_price}
              placeholder={dict.edit_package_form.placeholders.package_price}
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
              label={dict.edit_package_form.labels.status}
              placeholder={dict.edit_package_form.labels.status}
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
            <FormInput
              label={dict.edit_package_form.labels.max_users}
              placeholder={dict.edit_package_form.placeholders.max_users}
              value={form.maxUsers?.toString() ?? ""}
              onChange={(value: string): void => {
                setForm({ maxUsers: value ? parseInt(value) : undefined });
                clearError("maxUsers");
              }}
              type="number"
              errorMessage={errors.maxUsers}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <FormAreaInput
              label={dict.edit_package_form.labels.description}
              placeholder={dict.edit_package_form.placeholders.description}
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

        <FormSection title={dict.edit_package_form.sections.features}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(dict.add_new_package_form.features).map(
              ([key, label]) => (
                <Checkbox
                  key={key}
                  isSelected={features[key as keyof typeof features] ?? false}
                  onValueChange={(checked: boolean): void => {
                    setFeatures({
                      [key]: checked,
                    });
                    clearError("features");
                  }}
                >
                  {label}
                </Checkbox>
              ),
            )}
          </div>
          {errors.features && (
            <p className="mt-2 text-sm text-red-500">{errors.features}</p>
          )}
        </FormSection>

        <FormSection title="">
          <div className="grid grid-cols-1 gap-4">
            <UploadInput
              label={dict.edit_package_form.image.attach}
              desc={dict.edit_package_form.image.desc}
              file={form.icon}
              onChange={(file?: File): void => {
                setForm({ icon: file });
                if (!file) {
                  setExistingIcon(null);
                }
              }}
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              initUrl={existingIcon || undefined}
            />
          </div>
        </FormSection>
      </AppForm>
    </div>
  );
};
