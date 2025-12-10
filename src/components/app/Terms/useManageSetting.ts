import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { SettingService } from "@/services/setting.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useState } from "react";
import { useManageSettingsForm } from "./useForm";

export const useManageSetting = () => {
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const { valueAr, valueEn } = useManageSettingsForm();
  const updateSetting = async () => {
    setBusy(true);
    try {
      await SettingService.updateSetting(
        "terms_and_conditions",
        {
          value: JSON.stringify({ en: valueEn, ar: valueAr }),
        },
        lang,
      );

      showSuccessMessage(dict.terms_conditions.messages.updateSuccess);
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    updateSetting,
  };
};
