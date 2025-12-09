"use client";
import { useManageSettingsForm } from "@/components/app/Settings/useForm";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import PasswordIcon from "@/assets/icons/app/password.key.svg";
import { Button } from "@heroui/react";
import { useManageSetting } from "@/components/app/Settings/useManageSetting";
import { UploadInput } from "@/components/app/shared/UploadInput";
export const Settings = () => {
  const dict = useDict();
  const { me } = useMe();
  const {
    vatRate,
    setTrialPeriodDuration,
    trialPeriodDuration,
    setVatRate,
    updateProfile,
    setUpdateProfile,
    existingPicture,
    setExistingPicture,
  } = useManageSettingsForm();
  const { updateSetting, busy } = useManageSetting();
  return (
    <PageWrapper>
      <PageBar title={dict.settings_page.title}>
        <SaveButton
          type={SaveButtonType.Settings}
          onPress={() => {
            updateSetting();
          }}
          isDisabled={busy}
          isLoading={busy}
        />
      </PageBar>
      <div className="grid grid-cols-1 gap-8 py-8">
        <FormSection title={dict.settings_page.sections.general_settings}>
          <div className="grid grid-cols-2 gap-4">
            {vatRate && (
              <FormInput
                label={dict.settings_page.labels.vat_rate}
                placeholder={dict.settings_page.labels.vat_rate}
                value={vatRate}
                onChange={(value: string): void => {
                  setVatRate(value);
                }}
                endContent={
                  <div className="text-gray-4 text-sm font-semibold">%</div>
                }
              />
            )}
            {trialPeriodDuration && (
              <FormInput
                label={dict.settings_page.labels.trial_period_duration}
                placeholder={dict.settings_page.labels.trial_period_duration}
                value={trialPeriodDuration}
                onChange={(value: string): void => {
                  setTrialPeriodDuration(value);
                }}
              />
            )}
          </div>
        </FormSection>
        <FormSection title={dict.settings_page.sections.personal_profile}>
          {me && (
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.settings_page.labels.full_name}
                placeholder={dict.settings_page.labels.full_name}
                value={updateProfile.fullName ?? ""}
                onChange={(value: string): void => {
                  setUpdateProfile({ fullName: value });
                }}
                className="col-span-2"
              />

              <FormInput
                label={dict.settings_page.labels.email}
                placeholder={dict.settings_page.labels.email}
                value={updateProfile.email ?? ""}
                onChange={(value: string): void => {
                  setUpdateProfile({ email: value });
                }}
              />
              <FormInput
                label={dict.settings_page.labels.phone_number}
                placeholder={dict.settings_page.labels.email}
                value={updateProfile.phoneNumber ?? ""}
                onChange={(value: string): void => {
                  setUpdateProfile({ phoneNumber: value });
                }}
              />

              <div className="col-span-2">
                <button className="text-app-primary flex cursor-pointer items-center gap-4 bg-white px-0 text-sm font-bold underline">
                  {dict.reset_password.title}
                  <PasswordIcon className="size-9" />
                </button>
              </div>
              <UploadInput
                label={dict.edit_admin_form.image.attach}
                desc={dict.edit_admin_form.image.desc}
                file={updateProfile.profileImage}
                onChange={(file?: File): void => {
                  setUpdateProfile({ profileImage: file });
                  if (!file) {
                    setExistingPicture(null);
                  }
                }}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
                initUrl={existingPicture || undefined}
                className="col-span-2"
              />
            </div>
          )}
        </FormSection>
      </div>
    </PageWrapper>
  );
};
