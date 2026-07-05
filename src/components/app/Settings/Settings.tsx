"use client";
import { DEFAULT_COUNTRY_CODE } from "@/assets/misc/country_code_list";
import PasswordIcon from "@/assets/icons/app/password.key.svg";
import { ChangePassword } from "@/components/app/Settings/ChangePassword";
import { useManageSettingsForm } from "@/components/app/Settings/useForm";
import { useManageSetting } from "@/components/app/Settings/useManageSetting";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { CountryCodeSelect } from "@/components/app/shared/forms/CountryCodeSelect";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { UploadInput } from "@/components/app/shared/UploadInput";
import { useDict } from "@/hooks/useDict";
import { usePermissions } from "@/hooks/useHasPermissions";
import { useMe } from "@/hooks/useMe";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import { useQueryState } from "nuqs";
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
    setProfileImageRemoved,
    vatRateReady,
    trialPeriodDurationReady,
  } = useManageSettingsForm();
  const { updateSetting, busy } = useManageSetting();
  const { hasPermission } = usePermissions();
  const canUpdate = hasPermission("settings", "update");
  const [changePassword, setChangePassword] = useQueryState("changePassword");
  return (
    <>
      <PageWrapper>
        <PageBar title={dict.settings_page.title}>
          {canUpdate && (
            <SaveButton
              type={SaveButtonType.Settings}
              onPress={() => {
                updateSetting();
              }}
              isDisabled={busy}
              isLoading={busy}
            />
          )}
        </PageBar>
        <div className="grid grid-cols-1 gap-8 py-8">
          <FormSection title={dict.settings_page.sections.general_settings}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {vatRateReady && (
                <FormInput
                  label={dict.settings_page.labels.vat_rate}
                  placeholder={dict.settings_page.labels.vat_rate}
                  value={vatRate}
                  onChange={(value: string): void => {
                    setVatRate(value);
                  }}
                  readOnly={!canUpdate}
                  endContent={
                    <div className="text-gray-4 text-sm font-semibold">%</div>
                  }
                />
              )}
              {trialPeriodDurationReady && (
                <FormInput
                  label={dict.settings_page.labels.trial_period_duration}
                  placeholder={dict.settings_page.labels.trial_period_duration}
                  value={trialPeriodDuration}
                  onChange={(value: string): void => {
                    setTrialPeriodDuration(value);
                  }}
                  readOnly={!canUpdate}
                />
              )}
            </div>
          </FormSection>
          <FormSection title={dict.settings_page.sections.personal_profile}>
            {me && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                  label={dict.settings_page.labels.full_name}
                  placeholder={dict.settings_page.labels.full_name}
                  value={updateProfile.fullName ?? ""}
                  onChange={(value: string): void => {
                    setUpdateProfile({ fullName: value });
                  }}
                  readOnly={!canUpdate}
                  className="md:col-span-2"
                />

                <FormInput
                  label={dict.settings_page.labels.email}
                  placeholder={dict.settings_page.labels.email}
                  value={updateProfile.email ?? ""}
                  onChange={(value: string): void => {
                    setUpdateProfile({ email: value });
                  }}
                  readOnly={!canUpdate}
                />
                <FormInput
                  label={dict.settings_page.labels.phone_number}
                  placeholder={dict.settings_page.labels.phone_number}
                  value={updateProfile.phoneNumber ?? ""}
                  startContent={
                    <CountryCodeSelect
                      value={updateProfile.countryCode ?? DEFAULT_COUNTRY_CODE}
                      isDisabled={!canUpdate}
                      onChange={(countryCode) => {
                        setUpdateProfile({ countryCode });
                      }}
                    />
                  }
                  onChange={(value: string): void => {
                    setUpdateProfile({ phoneNumber: value });
                  }}
                  readOnly={!canUpdate}
                />

                <div className="md:col-span-2">
                  <button
                    onClick={() => {
                      setChangePassword("true");
                    }}
                    className="text-app-primary dark:bg-dark-black flex cursor-pointer items-center gap-4 bg-white px-0 text-sm font-bold underline"
                  >
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
                    if (file) {
                      setProfileImageRemoved(false);
                    } else {
                      setExistingPicture(null);
                      setProfileImageRemoved(true);
                    }
                  }}
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                  }}
                  initUrl={existingPicture || undefined}
                  className="md:col-span-2"
                />
              </div>
            )}
          </FormSection>
        </div>
      </PageWrapper>
      <ChangePassword />
    </>
  );
};
