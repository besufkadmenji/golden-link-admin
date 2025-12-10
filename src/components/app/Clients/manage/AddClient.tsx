"use client";

import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { FormSelect } from "../../shared/forms/FormSelect";
import { UploadInput } from "../../shared/UploadInput";
import { useForm } from "./useForm";
import { useFormValidation } from "./useFormValidation";
import { useManageClient } from "./useManageClient";

export const AddClient = () => {
  const { form, setForm } = useForm();
  const dict = useDict();
  const router = useRouter();
  const { busy, createClient } = useManageClient();
  const { errors, validateForm, clearError } = useFormValidation(form);
  return (
    <>
      <div className="grid grid-cols-1">
        <AppForm
          type={FormType.Clients}
          onSubmit={() => {
            if (validateForm()) {
              createClient();
            }
          }}
          onCancel={() => {
            router.push("/clients");
          }}
          busy={busy}
          action="add"
        >
          <FormSection title={dict.clients_management.detail.title}>
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label={dict.clients_management.form.labels.name}
                placeholder={dict.clients_management.form.placeholders.name}
                value={form.name}
                onChange={(value: string): void => {
                  setForm({ name: value });
                  clearError("name");
                }}
                errorMessage={errors.name}
              />

              <FormSelect
                label={dict.clients_management.form.labels.status}
                placeholder={dict.clients_management.form.labels.status}
                value={form.isActive ? "ACTIVE" : "INACTIVE"}
                onChange={(value: string): void => {
                  setForm({
                    isActive: value === "ACTIVE" ? true : false,
                  });
                  clearError("status");
                }}
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
                errorMessage={errors.status}
              />
            </div>
          </FormSection>

          <FormSection title="">
            <div className="grid grid-cols-1 gap-4">
              <UploadInput
                label={dict.clients_management.form.upload_info.title}
                desc={dict.clients_management.form.upload_info.description}
                file={form.clientLogo}
                onChange={(file?: File): void => {
                  setForm({ clientLogo: file });
                }}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
              />
            </div>
          </FormSection>
        </AppForm>
      </div>
    </>
  );
};
