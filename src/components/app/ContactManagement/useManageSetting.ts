import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { SettingService } from "@/services/setting.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.message";
import { useState } from "react";
import { useManageSettingsForm } from "./useForm";

export const useManageSetting = () => {
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const dict = useDict();
  const { me } = useMe();
  const { email, phoneNumbers, whatsapp, socialMediaLinks } =
    useManageSettingsForm();
  const updateSetting = async () => {
    setBusy(true);
    try {
      await SettingService.updateSetting(
        "contact_email",
        {
          value: email,
        },
        lang,
      );
      await SettingService.updateSetting(
        "contact_phones",
        {
          value: JSON.stringify(phoneNumbers),
        },
        lang,
      );
      await SettingService.updateSetting(
        "contact_whatsapp",
        {
          value: whatsapp,
        },
        lang,
      );
      await SettingService.updateSetting(
        "social_media_links",
        {
          value: JSON.stringify(
            Object.fromEntries(
              socialMediaLinks.map((link) => [link.key, link.value]),
            ),
          ),
        },
        lang,
      );
      showSuccessMessage(dict.contact_settings.messages.updateSuccess);
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
