"use client";

import { ActivateFeature } from "@/components/app/Features/manage/ActivateFeature";
import { DeactivateFeature } from "@/components/app/Features/manage/DeactivateFeature";
import { AppSwitch } from "@/components/app/shared/AppSwitch";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormAreaInput } from "@/components/app/shared/forms/FormAreaInput";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import moment from "moment";
import { useQueryState } from "nuqs";
import { AppLoading } from "../../shared/AppLoading";
import { SelectedFile } from "../../shared/SelectedFile";
import { useFeatureById } from "../useFeatures";

export const ViewFeature = ({ id }: { id: string }) => {
  const { feature } = useFeatureById(Number(id));
  const [activateFeature, setActivateFeature] =
    useQueryState("activateFeature");
  const [deactivateFeature, setDeactivateFeature] =
    useQueryState("deactivateFeature");
  const dict = useDict();
  return !feature ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Features}
          action="view"
          titleChildren={
            <div className="flex items-center gap-4">
              <p>{moment(feature.createdAt).format("DD/MM/YYYY")}</p>
              <AppSwitch
                isSelected={feature.isActive}
                onValueChange={(value) => {
                  if (value) {
                    setActivateFeature(id);
                  } else {
                    setDeactivateFeature(id);
                  }
                }}
              />
            </div>
          }
        >
          <FormSection title={dict.features_management.detail.title}>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={"اسم الميزة"}
                placeholder={dict.features_management.form.placeholders.name}
                value={feature.nameAr}
                onChange={(value: string): void => {}}
                dir="rtl"
                readOnly
              />

              <FormInput
                label={"Feature Name"}
                placeholder={dict.features_management.form.placeholders.name}
                value={feature.name}
                onChange={(value: string): void => {}}
                dir="ltr"
                readOnly
              />

              <FormSelect
                label={dict.features_management.form.labels.status}
                placeholder={dict.features_management.form.labels.status}
                value={feature.isActive ? "ACTIVE" : "INACTIVE"}
                onChange={(value: string): void => {}}
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
                readOnly
              />
              <FormAreaInput
                label={dict.features_management.form.labels.description_ar}
                placeholder={
                  dict.features_management.form.placeholders.description_ar
                }
                value={feature.descriptionAr}
                onChange={(value: string): void => {}}
                dir="rtl"
                className="col-span-2"
                readOnly
              />
              <FormAreaInput
                label={dict.features_management.form.labels.description_en}
                placeholder={
                  dict.features_management.form.placeholders.description_en
                }
                value={feature.description}
                onChange={(value: string): void => {}}
                dir="ltr"
                className="col-span-2"
                readOnly
              />
            </div>
          </FormSection>

          <FormSection title="">
            <div className="grid grid-cols-1 gap-4 justify-items-center">
              <SelectedFile initUrl={feature.featurePhotoPath} />
            </div>
          </FormSection>
        </AppForm>
      </div>
      <ActivateFeature />
      <DeactivateFeature />
    </>
  );
};
