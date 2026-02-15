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
import { AppLoading } from "../../shared/AppLoading";
import { usePackageById } from "../usePackages";
import { Checkbox } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { sar } from "@/assets/fonts/sar";

export const ViewPackage = ({ id }: { id: string }) => {
  const { pkg } = usePackageById(id);
  const dict = useDict();

  return !pkg ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm type={FormType.Packages} action="view">
        <FormSection
          title={dict.package_detail_page.sections.package_information}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label={dict.package_detail_page.labels.package_name}
              placeholder={dict.package_detail_page.labels.package_name}
              value={pkg.packageName}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormInput
              label={dict.package_detail_page.labels.package_duration}
              placeholder={dict.package_detail_page.labels.package_duration}
              value={pkg.packageDuration.toString()}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormInput
              label={dict.package_detail_page.labels.package_price}
              placeholder={dict.package_detail_page.labels.package_price}
              value={pkg.packagePrice.toString()}
              onChange={(value: string): void => {}}
              readOnly
              endContent={
                <span
                  className={twMerge("text-sm text-[#9FA2B4]", sar.className)}
                >
                  A
                </span>
              }
            />
            <FormSelect
              label={dict.package_detail_page.labels.status}
              placeholder={dict.package_detail_page.labels.status}
              value={pkg.status}
              onChange={(value: string): void => {}}
              options={[
                { label: statusMap(dict).ACTIVE, key: "ACTIVE" },
                { label: statusMap(dict).INACTIVE, key: "INACTIVE" },
              ]}
              readOnly
            />
            <FormInput
              label={dict.package_detail_page.labels.max_warehouses}
              placeholder={dict.package_detail_page.labels.max_warehouses}
              value={pkg.maxWarehouses?.toString() ?? "N/A"}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormInput
              label={dict.package_detail_page.labels.max_users}
              placeholder={dict.package_detail_page.labels.max_users}
              value={pkg.maxUsers?.toString() ?? "N/A"}
              onChange={(value: string): void => {}}
              readOnly
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <FormAreaInput
              label={dict.package_detail_page.labels.description}
              placeholder={dict.package_detail_page.labels.description}
              value={pkg.description ?? "N/A"}
              onChange={(value: string): void => {}}
              readOnly
            />
          </div>
        </FormSection>

        <FormSection title={dict.package_detail_page.sections.features}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(dict.add_new_package_form.features).map(
              ([key, label]) => (
                <Checkbox
                  key={key}
                  isSelected={pkg.features[key as keyof typeof pkg.features]}
                  isReadOnly
                  isDisabled
                >
                  {label}
                </Checkbox>
              ),
            )}
          </div>
        </FormSection>

        {pkg.iconPath && (
          <FormSection title="">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="mb-2 text-sm font-medium">
                  {dict.add_new_package_form.image.attach}
                </p>
                <img
                  src={pkg.iconPath}
                  alt={pkg.packageName}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </div>
            </div>
          </FormSection>
        )}
      </AppForm>
    </div>
  );
};
