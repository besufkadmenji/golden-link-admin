"use client";
import AddIcon from "@/assets/icons/app/add.svg";
import DeleteIcon from "@/assets/icons/app/trash.svg";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { useState } from "react";
import { PrimaryButton } from "../shared/button/PrimaryButton";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import { SocialMediaPlatform, useManageSettingsForm } from "./useForm";
import { useManageSetting } from "./useManageSetting";
import { useContactManagementValidation } from "./useValidation";
export const ContactManagement = () => {
  const dict = useDict();
  const {
    phoneNumbers,
    email,
    whatsapp,
    socialMediaLinks,
    setPhoneNumbers,
    setEmail,
    setWhatsapp,
    setSocialMediaLinks,
  } = useManageSettingsForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { updateSetting, busy } = useManageSetting();
  const { errors, clearError, validateForm, validateNewPhoneNumber } =
    useContactManagementValidation();

  return (
    <PageWrapper>
      <PageBar title={dict.contact_settings.title}>
        <SaveButton
          type={SaveButtonType.Settings}
          onPress={() => {
            const isValid = validateForm({
              phoneNumbers,
              whatsapp,
              email,
              socialMediaLinks,
            });
            if (isValid) {
              updateSetting();
            }
          }}
          isDisabled={busy}
          isLoading={busy}
        />
      </PageBar>
      <div className="grid grid-cols-1 gap-8 py-8">
        <FormSection title={dict.contact_settings.contact_info.title}>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <FormInput
                  label={dict.contact_settings.contact_info.labels.phone_number}
                  placeholder={
                    dict.contact_settings.contact_info.placeholders.phone_number
                  }
                  value={phoneNumber}
                  onChange={(value: string): void => {
                    setPhoneNumber(value);
                    clearError("phoneNumber");
                  }}
                  errorMessage={errors.phoneNumber}
                />
                <PrimaryButton
                  onPress={() => {
                    const isValid = validateNewPhoneNumber(
                      phoneNumber,
                      phoneNumbers,
                    );
                    if (!isValid) {
                      return;
                    }

                    setPhoneNumbers([...phoneNumbers, phoneNumber.trim()]);
                    setPhoneNumber("");
                  }}
                  className="self-start mt-7"
                  startContent={<AddIcon className="size-5" />}
                  isDisabled={phoneNumber.trim() === ""}
                >
                  {dict.contact_settings.contact_info.add}
                </PrimaryButton>
              </div>
              {phoneNumbers.map((phone, index) => (
                <div
                  className="grid grid-cols-[1fr_auto] gap-2"
                  key={`${phone}-${index}`}
                >
                  <FormInput
                    label={""}
                    placeholder={
                      dict.contact_settings.contact_info.placeholders
                        .phone_number
                    }
                    value={phone}
                    onChange={(value: string): void => {}}
                    errorMessage={errors.phoneNumbers?.[index]}
                    readOnly
                  />
                  <PrimaryButton
                    onPress={() => {
                      const updatedPhoneNumbers = phoneNumbers.filter(
                        (p, i) => i !== index,
                      );
                      setPhoneNumbers(updatedPhoneNumbers);
                      clearError("phoneNumbers");
                    }}
                    className="h-12 w-14 self-start bg-[#FFDBDB] p-0 text-[#FF0000]"
                    isIconOnly
                  >
                    <DeleteIcon className="size-5.5" />
                  </PrimaryButton>
                </div>
              ))}
            </div>
            <FormInput
              label={dict.contact_settings.contact_info.labels.whatsapp}
              placeholder={dict.contact_settings.contact_info.placeholders.whatsapp}
              value={whatsapp}
              onChange={(value: string): void => {
                setWhatsapp(value);
                clearError("whatsapp");
              }}
              errorMessage={errors.whatsapp}
            />
            <FormInput
              label={dict.contact_settings.contact_info.labels.email}
              placeholder={dict.contact_settings.contact_info.placeholders.email}
              value={email}
              onChange={(value: string): void => {
                setEmail(value);
                clearError("email");
              }}
              errorMessage={errors.email}
            />
          </div>
        </FormSection>
        <FormSection title={""}>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-lg leading-7 font-bold tracking-tight text-[#1A1C21]">
              {dict.contact_settings.social_media.title}
            </p>
            <p className="text-xs text-[#9FA2B4]">
              {dict.contact_settings.social_media.description}
            </p>
          </div>
          <p className="text-lg leading-7 font-medium tracking-tight text-[#1A1C21]">
            {dict.contact_settings.social_media.section_title}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              {socialMediaLinks.map((link, index) => (
                <div
                  className="grid grid-cols-[1fr_2fr_auto] gap-2"
                  key={`${index}`}
                >
                  <FormSelect
                    label={""}
                    placeholder={
                      dict.contact_settings.social_media.labels.platform_name
                    }
                    value={link.key}
                    onChange={(value: string): void => {
                      const updatedSocialMediaLinks = [...socialMediaLinks];
                      updatedSocialMediaLinks[index].key = value;
                      setSocialMediaLinks(updatedSocialMediaLinks);
                      clearError("socialMediaPlatforms");
                    }}
                    errorMessage={errors.socialMediaPlatforms?.[index]}
                    options={Object.values(SocialMediaPlatform).map(
                      (platform) => ({
                        key: platform,
                        label:
                          dict.contact_settings.social_media.platforms[
                            platform.toLowerCase() as keyof typeof dict.contact_settings.social_media.platforms
                          ],
                      }),
                    )}
                  />
                  <FormInput
                    label={""}
                    placeholder={""}
                    value={link.value}
                    onChange={(value: string): void => {
                      const updatedSocialMediaLinks = [...socialMediaLinks];
                      updatedSocialMediaLinks[index].value = value;
                      setSocialMediaLinks(updatedSocialMediaLinks);
                      clearError("socialMediaLinks");
                    }}
                    errorMessage={errors.socialMediaLinks?.[index]}
                    classNames={{
                      inputWrapper: "bg-white shadow-none",
                    }}
                  />
                  <PrimaryButton
                    onPress={() => {
                      const updatedSocialMediaLinks = socialMediaLinks.filter(
                        (l, i) => i !== index,
                      );
                      setSocialMediaLinks(updatedSocialMediaLinks);
                      clearError("socialMediaPlatforms");
                      clearError("socialMediaLinks");
                    }}
                    className="h-12 w-14 self-start bg-[#FFDBDB] p-0 text-[#FF0000]"
                    isIconOnly
                  >
                    <DeleteIcon className="size-5.5" />
                  </PrimaryButton>
                </div>
              ))}
            </div>
          </div>
          <PrimaryButton
            startContent={<AddIcon className="size-5" />}
            onPress={() => {
              setSocialMediaLinks([
                ...socialMediaLinks,
                { key: "", value: "" },
              ]);
            }}
          >
            {dict.contact_settings.social_media.buttons.add}
          </PrimaryButton>
        </FormSection>
      </div>
    </PageWrapper>
  );
};
