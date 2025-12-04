"use client";

import { DocumentDisplay } from "@/components/app/SubscribersRequests/Detail/DocumentDisplay";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { AppLoading } from "../../shared/AppLoading";
import { AppForm, FormSection, FormType } from "../../shared/forms/AppForm";
import { FormInput } from "../../shared/forms/FormInput";
import { FormSelect } from "../../shared/forms/FormSelect";
import { useSubscriber } from "../useSubscriber";

export const SubscriberDetail = ({ id }: { id: string }) => {
  const dict = useDict();
  const router = useRouter();
  const { data: subscriber } = useSubscriber(id);
  console.log("Category Data:", subscriber, id);
  return !subscriber ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm type={FormType.Subscribers} action="view">
          <FormSection
            title={dict.subscription_request_detail_page.resource_information}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.subscription_request_detail_page.labels.name}
                placeholder={dict.subscription_request_detail_page.labels.name}
                value={subscriber.fullName}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={
                  dict.subscription_request_detail_page.labels.organization_name
                }
                placeholder={
                  dict.subscription_request_detail_page.labels.organization_name
                }
                value={subscriber.organizationName}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={
                  dict.subscription_request_detail_page.labels.phone_number
                }
                placeholder={
                  dict.subscription_request_detail_page.labels.phone_number
                }
                value={subscriber.phoneNumber}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={dict.subscription_request_detail_page.labels.email}
                placeholder={dict.subscription_request_detail_page.labels.email}
                value={subscriber.email}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormSelect
                label={dict.subscription_request_detail_page.labels.type}
                placeholder={dict.subscription_request_detail_page.labels.type}
                value={subscriber.roleName}
                onChange={(value: string): void => {}}
                options={[
                  {
                    key: "WAREHOUSE_OWNER",
                    label: dict.common.warehouseOwner,
                  },
                  {
                    key: "SUPPLIER",
                    label: dict.common.supplier,
                  },
                ]}
                readOnly
              />
              <FormInput
                label={
                  dict.subscription_request_detail_page.labels
                    .commercial_registration_number
                }
                placeholder={
                  dict.subscription_request_detail_page.labels
                    .commercial_registration_number
                }
                value={subscriber.commercialRegistrationNumber || "-"}
                onChange={(value: string): void => {}}
                readOnly
              />
              <div className="col-start-1 col-end-3 grid justify-center p-10">
                <DocumentDisplay
                  documentPath={subscriber.commercialRegistrationImagePath}
                />
              </div>
            </div>
          </FormSection>
          <FormSection
            title={
              dict.subscription_request_detail_page.sections
                .commercial_registration
            }
          >
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label={dict.subscription_request_detail_page.labels.tax_number}
                placeholder={
                  dict.subscription_request_detail_page.labels.tax_number
                }
                value={subscriber.taxRegistrationNumber || "-"}
                onChange={(value: string): void => {}}
                readOnly
              />

              <div className="col-start-1 col-end-3 grid justify-center p-10">
                <DocumentDisplay
                  documentPath={subscriber.taxRegistrationImagePath}
                />
              </div>
            </div>
          </FormSection>
        </AppForm>
      </div>
    </>
  );
};
