"use client";

import { AppCheckbox } from "@/components/app/shared/AppCheckbox";
import { AppSwitch } from "@/components/app/shared/AppSwitch";
import { useDict } from "@/hooks/useDict";
import { PackageFeatures } from "@/types/package";
import { useState } from "react";
import {
  ALL_PACKAGE_FEATURES_ENABLED,
  PACKAGE_FEATURE_GRID_ROWS,
} from "./packageFeatureGroups";

type PermissionType = "ALL" | "CUSTOM";

export const PackageFeaturesSection = ({
  features,
  onChange,
  errorMessage,
  readOnly,
}: {
  features: PackageFeatures;
  onChange: (partial: Partial<PackageFeatures>) => void;
  errorMessage?: string;
  readOnly?: boolean;
}) => {
  const dict = useDict();
  const [permissionType, setPermissionType] = useState<PermissionType>("CUSTOM");

  const handlePermissionTypeChange = (type: PermissionType) => {
    setPermissionType(type);
    if (type === "ALL") {
      onChange(ALL_PACKAGE_FEATURES_ENABLED);
    }
  };

  return (
    <div className="border-dashboard-border dark:border-dark-border dark:bg-dark-black overflow-hidden rounded-lg border bg-white shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]">
      <div className="border-b-dashboard-border dark:border-b-dark-border dark:bg-dark-app-background flex h-11 items-center justify-between border-b bg-[#F9F9FC] px-3">
        <p className="text-sm leading-7 font-medium tracking-tight text-[#1A1C21] md:text-lg dark:text-white">
          {dict.add_new_package_form.permissions.title}
        </p>
        <div className="flex gap-2 md:gap-8">
          <AppCheckbox
            isSelected={permissionType === "ALL"}
            onValueChange={() => handlePermissionTypeChange("ALL")}
            isDisabled={readOnly}
          >
            {dict.add_new_package_form.permissions.full_access}
          </AppCheckbox>
          <AppCheckbox
            isSelected={permissionType === "CUSTOM"}
            onValueChange={() => handlePermissionTypeChange("CUSTOM")}
            isDisabled={readOnly}
          >
            {dict.add_new_package_form.permissions.custom_access}
          </AppCheckbox>
        </div>
      </div>

      {permissionType === "CUSTOM" && (
        <div className="grid grid-cols-1 gap-5 p-4 md:p-6">
          {PACKAGE_FEATURE_GRID_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {row.map((key) => (
                <div
                  key={key}
                  className="dark:border-dark-border rounded-lg border border-[#EEEEEE] p-4 lg:p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-[#2E2E2E] dark:text-white">
                      {
                        dict.add_new_package_form.features[
                          key as keyof typeof dict.add_new_package_form.features
                        ]
                      }
                    </p>
                    <AppSwitch
                      size="sm"
                      isSelected={features[key] ?? false}
                      onValueChange={(checked: boolean) => {
                        onChange({ [key]: checked });
                      }}
                      isDisabled={readOnly}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {errorMessage && (
        <p className="text-danger-500 px-4 pb-4 text-sm md:px-6">{errorMessage}</p>
      )}
    </div>
  );
};
