"use client";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import { FormAreaInput } from "../shared/forms/FormAreaInput";
import { useManageSettingsForm } from "./useForm";
import { useManageSetting } from "./useManageSetting";
export const Terms = () => {
  const dict = useDict();
  const { valueAr, valueEn, setValueAr, setValueEn } = useManageSettingsForm();
  const { updateSetting, busy } = useManageSetting();

  return (
    <PageWrapper>
      <PageBar title={dict.terms_conditions.title}>
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
        <FormSection title={dict.terms_conditions.section_title}>
          <div className="grid grid-cols-1 gap-4">
            <FormAreaInput
              label={"محتوي النص"}
              placeholder={""}
              value={valueAr}
              onChange={setValueAr}
              dir="rtl"
            />
            <FormAreaInput
              label={"Text Content"}
              placeholder={""}
              value={valueEn}
              onChange={setValueEn}
              dir="ltr"
            />
          </div>
        </FormSection>
      </div>
    </PageWrapper>
  );
};
