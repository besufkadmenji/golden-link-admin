import { useManageSettingsForm } from "@/components/app/Settings/useForm";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { AuthService } from "@/services/auth.service";
import { SettingService } from "@/services/setting.service";
import { ChangePasswordDto } from "@/types/admin.auth";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { queryClient } from "@/utils/query.client";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useChangePasswordForm } from "@/components/app/Settings/useChangePasswordForm";
import { UserService } from "@/services/user.service";

export const useManageSetting = () => {
  const [busy, setBusy] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const [, setChangePassword] = useQueryState("changePassword");
  const { reset } = useChangePasswordForm();
  const { me } = useMe();
  const {
    vatRate,
    trialPeriodDuration,
    updateProfile,
    profileImageRemoved,
    initialProfileImagePath,
  } = useManageSettingsForm();
  const updateSetting = async () => {
    setBusy(true);
    try {
      await SettingService.updateSetting(
        "vat_rate",
        {
          value: vatRate,
        }
      );
      await SettingService.updateSetting(
        "trial_period_duration",
        {
          value: trialPeriodDuration,
        }
      );

      const userId = me?.id ?? "";
      const shouldRemoveProfileImage =
        profileImageRemoved &&
        !!initialProfileImagePath &&
        !updateProfile.profileImage;

      await UserService.updateUser(
        userId,
        {
          ...updateProfile,
          removeProfileImage: shouldRemoveProfileImage,
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
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
      await AuthService.changePassword(data);

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
