"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useMainCategory } from "@/components/app/Categories/Main/useMainCategory";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { AppLoading } from "@/components/app/shared/AppLoading";

export const ViewCategory = ({ categoryId }: { categoryId: string }) => {
  const dict = useDict();
  const router = useRouter();
  const { data } = useMainCategory(categoryId);
  const category = data?.data;
  console.log("Category Data:", data, categoryId);
  return !category ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm type={FormType.MainCategory} action="view">
        <FormSection type={FormType.MainCategory}>
          <FormInput
            label={dict.categories.addMainCategory.categoryName}
            placeholder={
              dict.categories.addMainCategory.categoryNamePlaceholder
            }
            value={category.name}
            onChange={(value: string): void => {}}
            readOnly
          />
          <FormAreaInput
            label={dict.categories.addMainCategory.shortDescription}
            placeholder={
              dict.categories.addMainCategory.shortDescriptionPlaceholder
            }
            value={category.description}
            onChange={(value: string): void => {}}
            readOnly
          />
        </FormSection>
      </AppForm>
    </div>
  );
};
