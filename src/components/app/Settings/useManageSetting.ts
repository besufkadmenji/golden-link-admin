import { useManageSettingsForm } from "@/components/app/Settings/useForm";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { SettingService } from "@/services/setting.service";
import { UserService } from "@/services/user.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useManageSetting = () => {
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useQueryState(
    "isDeleteWarningOpen",
  );
  const { me } = useMe();
  const { vatRate, trialPeriodDuration, updateProfile } =
    useManageSettingsForm();
  const updateSetting = async () => {
    setBusy(true);
    try {
      await SettingService.updateSetting(
        "vat_rate",
        {
          value: vatRate,
        },
        lang,
      );
      await SettingService.updateSetting(
        "trial_period_duration",
        {
          value: trialPeriodDuration,
        },
        lang,
      );
      await UserService.updateUser(me?.id ?? "", updateProfile, lang);
      showSuccessMessage(dict.settings_page.messages.updateSuccess);
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
