"use client";
import { FormSection } from "@/components/app/shared/forms/AppForm";
import { PageBar } from "@/components/app/shared/PageBar";
import { PageWrapper } from "@/components/app/shared/PageWrapper";
import { useDict } from "@/hooks/useDict";
import { usePermissions } from "@/hooks/useHasPermissions";
import { SaveButton, SaveButtonType } from "../shared/button/SaveButton";
import { FormRichTextEditor } from "../shared/forms/FormRichTextEditor";
import { useManageSettingsForm } from "./useForm";
import { useManageSetting } from "./useManageSetting";
export const AboutPlatform = () => {
  const dict = useDict();
  const { valueAr, valueEn, setValueAr, setValueEn } = useManageSettingsForm();
  const { updateSetting, busy } = useManageSetting();
  const { hasPermission } = usePermissions();
  const canUpdate = hasPermission("settings", "update");

  return (
    <PageWrapper>
      <PageBar title={dict.about_platform.title}>
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
        <FormSection title={dict.about_platform.section_title}>
          <div className="grid grid-cols-1 gap-4">
            <FormRichTextEditor
              label={"محتوي النص"}
              placeholder={""}
              value={valueAr}
              onChange={setValueAr}
              dir="rtl"
              readOnly={!canUpdate}
            />
            <FormRichTextEditor
              label={"Text Content"}
              placeholder={""}
              value={valueEn}
              onChange={setValueEn}
              dir="ltr"
              readOnly={!canUpdate}
            />
          </div>
        </FormSection>
      </div>
    </PageWrapper>
  );
};
