"use client";

import {
  useForm,
  useManageForm,
} from "@/components/app/Categories/Main/manage/useForm";
import { useManageCategory } from "@/components/app/Categories/Main/manage/useManageCategory";
import { useMainCategory } from "@/components/app/Categories/Main/useMainCategory";
import { AppLoading } from "@/components/app/shared/AppLoading";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormValidation } from "./useFormValidation";

export const EditCategory = ({ categoryId }: { categoryId: string }) => {
  const { data } = useMainCategory(categoryId);
  const category = data?.data;
  const { form, setForm, reset } = useManageForm(category);
  const dict = useDict();
  const router = useRouter();
  const { busy, updateCategory } = useManageCategory();
  const { errors, validateForm, clearError } = useFormValidation(form);
  const ready = useForm((state) => state.ready);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return !ready ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm
        type={FormType.MainCategory}
        onSubmit={() => {
          if (validateForm()) {
            updateCategory(categoryId);
          }
        }}
        onCancel={() => {
          reset();
          router.push("/categories/main");
        }}
        busy={busy}
        action="edit"
      >
        <FormSection type={FormType.MainCategory}>
          <FormInput
            label={dict.categories.addMainCategory.categoryName}
            placeholder={
              dict.categories.addMainCategory.categoryNamePlaceholder
            }
            value={form.name}
            onChange={(value: string): void => {
              setForm({ name: value, nameAr: value });
              clearError("name");
            }}
            errorMessage={errors.name}
          />
          <FormAreaInput
            label={dict.categories.addMainCategory.shortDescription}
            placeholder={
              dict.categories.addMainCategory.shortDescriptionPlaceholder
            }
            value={form.description}
            onChange={(value: string): void => {
              setForm({ description: value });
              clearError("description");
            }}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </FormSection>
      </AppForm>
    </div>
  );
};
