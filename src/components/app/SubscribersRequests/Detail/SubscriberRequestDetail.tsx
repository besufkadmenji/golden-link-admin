"use client";

import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { AppLoading } from "../../shared/AppLoading";
import { AppForm, FormSection, FormType } from "../../shared/forms/AppForm";
import { FormInput } from "../../shared/forms/FormInput";
import { useRequest } from "../useRequest";
import { FormSelect } from "../../shared/forms/FormSelect";
import Image from "next/image";
import { RequestAction } from "@/components/app/SubscribersRequests/Detail/RequestAction";
import { SuccessModal } from "@/components/app/SubscribersRequests/Detail/SuccessModal";
import { RejectReasonModal } from "@/components/app/SubscribersRequests/Detail/RejectReasonModal";

export const SubscriberRequestDetail = ({ id }: { id: string }) => {
  const dict = useDict();
  const router = useRouter();
  const { data: request } = useRequest(id);
  console.log("Category Data:", request, id);
  return !request ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.SubscriberRequests}
          action="view"
          titleChildren={<RequestAction request={request} />}
        >
          <FormSection
            title={dict.subscription_request_detail_page.resource_information}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.subscription_request_detail_page.labels.name}
                placeholder={dict.subscription_request_detail_page.labels.name}
                value={request.fullName}
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
                value={request.organizationName}
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
                value={request.phoneNumber}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormInput
                label={dict.subscription_request_detail_page.labels.email}
                placeholder={dict.subscription_request_detail_page.labels.email}
                value={request.email}
                onChange={(value: string): void => {}}
                readOnly
              />
              <FormSelect
                label={dict.subscription_request_detail_page.labels.type}
                placeholder={dict.subscription_request_detail_page.labels.type}
                value={request.type}
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
                value={request.commercialRegistrationNumber || "-"}
                onChange={(value: string): void => {}}
                readOnly
              />
              <div className="col-start-1 col-end-3 grid justify-center p-10">
                {request.commercialRegistrationImagePath && (
                  <div
                    className="bg-dashboard-border size-20 rounded-lg"
                    onClick={() => {
                      window.open(
                        request.commercialRegistrationImagePath,
                        "_blank",
                      );
                    }}
                  ></div>
                )}
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
                value={request.taxRegistrationNumber || "-"}
                onChange={(value: string): void => {}}
                readOnly
              />

              <div className="col-start-1 col-end-3 grid justify-center p-10">
                {request.taxRegistrationImagePath && (
                  <div
                    className="bg-dashboard-border size-20 rounded-lg"
                    onClick={() => {
                      window.open(request.taxRegistrationImagePath, "_blank");
                    }}
                  ></div>
                )}
              </div>
            </div>
          </FormSection>
        </AppForm>
      </div>
      <SuccessModal />
      <RejectReasonModal request={request} />
    </>
  );
};
