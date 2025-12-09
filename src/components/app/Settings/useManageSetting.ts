import { useManageSettingsForm } from "@/components/app/Settings/useForm";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { AuthService } from "@/services/auth.service";
import { SettingService } from "@/services/setting.service";
import { UserService } from "@/services/user.service";
import { ChangePasswordDto } from "@/types/admin.auth";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useChangePasswordForm } from "@/components/app/Settings/useChangePasswordForm";

export const useManageSetting = () => {
  const [busy, setBusy] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const [, setChangePassword] = useQueryState("changePassword");
  const { reset } = useChangePasswordForm();
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
  const changePassword = async (data: ChangePasswordDto) => {
    setChangingPassword(true);
    try {
      await AuthService.changePassword(data, lang);

      showSuccessMessage(dict.settings_page.messages.passwordChangeSuccess);
      setChangePassword(null);
      reset();
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "An error occurred.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return {
    busy,
    changingPassword,
    updateSetting,
    changePassword,
  };
};
