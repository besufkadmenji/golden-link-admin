"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { AppLoading } from "../../shared/AppLoading";
import { useClientById } from "../useClients";
import { SelectedFile } from "../../shared/SelectedFile";
import { AppSwitch } from "@/components/app/shared/AppSwitch";
import { ActivateClient } from "@/components/app/Clients/manage/ActivateClient";
import { DeactivateClient } from "@/components/app/Clients/manage/DeactivateClient";
import { useQueryState } from "nuqs";
import { divide } from "lodash";
import moment from "moment";

export const ViewClient = ({ id }: { id: string }) => {
  const { client } = useClientById(Number(id));
  const [activateClient, setActivateClient] = useQueryState("activateClient");
  const [deactivateClient, setDeactivateClient] =
    useQueryState("deactivateClient");
  const dict = useDict();
  return !client ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Clients}
          action="view"
          titleChildren={
            <div className="flex items-center gap-4">
              <p>{moment(client.createdAt).format("DD/MM/YYYY")}</p>
              <AppSwitch
                isSelected={client.isActive}
                onValueChange={(value) => {
                  if (value) {
                    setActivateClient(id);
                  } else {
                    setDeactivateClient(id);
                  }
                }}
              />
            </div>
          }
        >
          <FormSection title={dict.clients_management.detail.title}>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.clients_management.detail.labels.name}
                placeholder={dict.clients_management.detail.labels.name}
                value={client.name}
                onChange={(value: string): void => {}}
                readOnly
              />

              <FormSelect
                label={dict.clients_management.detail.labels.status}
                placeholder={dict.clients_management.detail.labels.status}
                value={client.isActive ? "ACTIVE" : "INACTIVE"}
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
              <div className="col-span-2 grid justify-items-center">
                <SelectedFile initUrl={client.logoPath} />
              </div>
            </div>
          </FormSection>
        </AppForm>
      </div>
      <ActivateClient />
      <DeactivateClient />
    </>
  );
};
