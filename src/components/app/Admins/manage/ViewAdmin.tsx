"use client";

import { Permissions } from "@/components/app/Admins/manage/Permissions";
import { statusMap } from "@/components/app/Admins/renderCell";
import {
  AppForm,
  FormSection,
  FormType,
} from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { FormSelect } from "@/components/app/shared/forms/FormSelect";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { AppLoading } from "../../shared/AppLoading";
import { useUserById } from "../useAdmins";
import { useManageForm } from "@/components/app/Admins/manage/useForm";

export const ViewAdmin = ({ id }: { id: string }) => {
  const { user } = useUserById(id);
  const { form, setForm } = useManageForm(id, user);
  const dict = useDict();
  const router = useRouter();
  return !user ? (
    <AppLoading className="h-[84vh]" />
  ) : (
    <div className="grid grid-cols-1">
      <AppForm type={FormType.Admins} action="view">
        <FormSection title={dict.edit_admin_form.sections.admin_information}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={dict.edit_admin_form.labels.admin_name}
              placeholder={dict.edit_admin_form.placeholders.admin_name}
              value={user.fullName}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormInput
              label={dict.edit_admin_form.labels.phone_number}
              placeholder={dict.edit_admin_form.placeholders.phone_number}
              value={user.phoneNumber}
              onChange={(value: string): void => {}}
              readOnly
            />
            <FormSelect
              label={dict.add_new_admin_form.labels.status}
              placeholder={dict.add_new_admin_form.labels.status}
              value={user.status}
              onChange={(value: string): void => {}}
              options={Object.entries(statusMap(dict)).map(([key, value]) => ({
                label: value,
                key: key,
              }))}
              readOnly
            />
          </div>
        </FormSection>
        <FormSection title={dict.edit_admin_form.sections.login_information}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={dict.edit_admin_form.labels.email}
              placeholder={dict.edit_admin_form.labels.email}
              value={user.email}
              onChange={(value: string): void => {}}
              readOnly
            />
          </div>
        </FormSection>
        <FormSection title="">
          <div className="grid grid-cols-1 gap-4"></div>
        </FormSection>
        <Permissions readOnly />
      </AppForm>
    </div>
  );
};
