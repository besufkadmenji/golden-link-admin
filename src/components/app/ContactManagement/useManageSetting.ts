import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { HomepageRevalidationService } from "@/services/homepage-revalidation.service";
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
        }
      );
      await SettingService.updateSetting(
        "contact_phones",
        {
          value: JSON.stringify(phoneNumbers),
        }
      );
      await SettingService.updateSetting(
        "contact_whatsapp",
        {
          value: whatsapp,
        }
      );
      await SettingService.updateSetting(
        "social_media_links",
        {
          value: JSON.stringify(
            Object.fromEntries(
              socialMediaLinks.map((link) => [link.key, link.value]),
            ),
          ),
        }
      );
      await HomepageRevalidationService.trigger();
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
