"use client";

import { AppSwitch } from "@/components/app/shared/AppSwitch";
import { SelectedFile } from "@/components/app/shared/SelectedFile";
import { typeMap } from "@/components/app/Subscribers/renderCell";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { AppLoading } from "../../shared/AppLoading";
import { AppForm, FormSection, FormType } from "../../shared/forms/AppForm";
import { FormInput } from "../../shared/forms/FormInput";
import { FormSelect } from "../../shared/forms/FormSelect";
import { useSubscriber } from "../useSubscriber";
import { ActivateSubscriber } from "@/components/app/Subscribers/ActivateSubscriber";
import { DeactivateSubscriber } from "@/components/app/Subscribers/DeactivateSubscriber";

export const SubscriberDetail = ({ id }: { id: string }) => {
  const dict = useDict();
  const router = useRouter();
  const { data: subscriber } = useSubscriber(id);
  const [activateSubscriber, setActivateSubscriber] =
    useQueryState("activateSubscriber");
  const [deactivateSubscriber, setDeactivateSubscriber] = useQueryState(
    "deactivateSubscriber",
  );
  console.log("Category Data:", subscriber, id);
  return !subscriber ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Subscribers}
          action="view"
          titleChildren={
            <AppSwitch
              isSelected={subscriber.status === "ACTIVE"}
              onValueChange={(value) => {
                if (value) {
                  setActivateSubscriber(subscriber.id, { history: "push" });
                } else {
                  setDeactivateSubscriber(subscriber.id, {
                    history: "push",
                  });
                }
              }}
            />
          }
        >
          <FormSection title={dict.view_subscriber.title}>
            <div className="grid grid-cols-2 items-start gap-4">
              <FormInput
                label={dict.add_new_subscriber_form.labels.name}
                placeholder={dict.add_new_subscriber_form.placeholders.name}
                value={subscriber.fullName}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={dict.add_new_subscriber_form.labels.organization_name}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.organization_name
                }
                value={subscriber.organizationName}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={dict.add_new_subscriber_form.labels.phone_number}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.phone_number
                }
                value={subscriber.phoneNumber}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormSelect
                label={dict.add_new_subscriber_form.labels.type}
                placeholder={dict.add_new_subscriber_form.labels.type}
                value={subscriber.roleName}
                onChange={(value: string): void => {}}
                options={Object.entries(typeMap(dict)).map(([key, value]) => ({
                  label: value,
                  key: key,
                }))}
                readOnly
              />
              <FormInput
                label={
                  dict.add_new_subscriber_form.labels
                    .commercial_registration_number
                }
                placeholder={
                  dict.add_new_subscriber_form.placeholders
                    .commercial_registration_number
                }
                value={subscriber.commercialRegistrationNumber}
                onChange={(value: string): void => {}}
                className="col-span-2"
                readOnly
              />
              <div className="col-span-2 grid grid-cols-1 gap-4">
                {subscriber.commercialRegistrationImagePath && (
                  <SelectedFile
                    initUrl={subscriber.commercialRegistrationImagePath}
                  />
                )}
              </div>
            </div>
          </FormSection>
          <FormSection
            title={dict.add_new_subscriber_form.sections.login_information}
          >
            <div className="grid grid-cols-2 items-start gap-4">
              <FormInput
                label={dict.add_new_subscriber_form.labels.email}
                placeholder={dict.add_new_subscriber_form.labels.email}
                value={subscriber.email}
                onChange={(value: string): void => {}}
                readOnly
              />
            </div>
          </FormSection>
          <FormSection
            title={
              dict.add_new_subscriber_form.sections.tax_registration_information
            }
          >
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label={dict.add_new_subscriber_form.labels.tax_number}
                placeholder={
                  dict.add_new_subscriber_form.placeholders.tax_number
                }
                value={subscriber.taxRegistrationNumber}
                onChange={(value: string): void => {}}
                readOnly
              />
              <div className="grid grid-cols-1 gap-4">
                {subscriber.taxRegistrationImagePath && (
                  <SelectedFile initUrl={subscriber.taxRegistrationImagePath} />
                )}
              </div>
            </div>
          </FormSection>
        </AppForm>
      </div>
      <ActivateSubscriber />
      <DeactivateSubscriber />
    </>
  );
};
