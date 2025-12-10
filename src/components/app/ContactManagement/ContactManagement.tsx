"use client";
import AddIcon from "@/assets/icons/app/add.svg";
import DeleteIcon from "@/assets/icons/app/trash.svg";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useState } from "react";
import { PrimaryButton } from "../shared/button/PrimaryButton";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import { useManageSettingsForm } from "./useForm";
import { useManageSetting } from "./useManageSetting";
export const ContactManagement = () => {
  const dict = useDict();
  const { me } = useMe();
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

  return (
    <PageWrapper>
      <PageBar title={dict.contact_settings.title}>
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
                  }}
                />
                <PrimaryButton
                  onPress={() => {
                    setPhoneNumbers([...phoneNumbers, phoneNumber]);
                    setPhoneNumber("");
                  }}
                  className="mb-2 self-end"
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
                    readOnly
                  />
                  <PrimaryButton
                    onPress={() => {
                      const updatedPhoneNumbers = phoneNumbers.filter(
                        (p, i) => i !== index,
                      );
                      setPhoneNumbers(updatedPhoneNumbers);
                    }}
                    className="h-12 w-14 self-end bg-[#FFDBDB] p-0 text-[#FF0000]"
                    isIconOnly
                  >
                    <DeleteIcon className="size-5.5" />
                  </PrimaryButton>
                </div>
              ))}
            </div>
            {whatsapp && (
              <FormInput
                label={dict.contact_settings.contact_info.labels.whatsapp}
                placeholder={
                  dict.contact_settings.contact_info.placeholders.whatsapp
                }
                value={whatsapp}
                onChange={(value: string): void => {
                  setWhatsapp(value);
                }}
              />
            )}
            {email && (
              <FormInput
                label={dict.contact_settings.contact_info.labels.email}
                placeholder={
                  dict.contact_settings.contact_info.placeholders.email
                }
                value={email}
                onChange={(value: string): void => {
                  setEmail(value);
                }}
              />
            )}
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
                  <FormInput
                    label={""}
                    placeholder={""}
                    value={link.key}
                    onChange={(value: string): void => {
                      const updatedSocialMediaLinks = [...socialMediaLinks];
                      updatedSocialMediaLinks[index].key = value;
                      setSocialMediaLinks(updatedSocialMediaLinks);
                    }}
                    startContent={
                      <div className="border-dashboard-border h-5 w-5 rounded-full border" />
                    }
                    classNames={{
                      inputWrapper: "shadow-none",
                    }}
                  />
                  <FormInput
                    label={""}
                    placeholder={""}
                    value={link.value}
                    onChange={(value: string): void => {
                      const updatedSocialMediaLinks = [...socialMediaLinks];
                      updatedSocialMediaLinks[index].value = value;
                      setSocialMediaLinks(updatedSocialMediaLinks);
                    }}
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
                    }}
                    className="h-12 w-14 self-end bg-[#FFDBDB] p-0 text-[#FF0000]"
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
