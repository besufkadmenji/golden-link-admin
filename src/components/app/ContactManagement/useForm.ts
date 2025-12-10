import { useSetting } from "@/components/app/Settings/useSettings";
import { useEffect } from "react";
import { create } from "zustand";

interface SettingsState {
  phoneNumbers: string[];
  whatsapp: string;
  email: string;
  socialMediaLinks: {
    key: string;
    value: string;
  }[];

  setPhoneNumbers: (phoneNumbers: string[]) => void;
  setWhatsapp: (whatsapp: string) => void;
  setEmail: (email: string) => void;
  setSocialMediaLinks: (links: { key: string; value: string }[]) => void;

  reset: () => void;
}

export const useSettings = create<SettingsState>((set) => ({
  phoneNumbers: [],
  whatsapp: "",
  email: "",
  socialMediaLinks: [],

  setPhoneNumbers: (phoneNumbers) => set({ phoneNumbers }),
  setWhatsapp: (whatsapp) => set({ whatsapp }),
  setEmail: (email) => set({ email }),
  setSocialMediaLinks: (links) => set({ socialMediaLinks: [...links] }),

  reset: () =>
    set({
      phoneNumbers: [],
      whatsapp: "",
      email: "",
      socialMediaLinks: [],
    }),
}));

export const useManageSettingsForm = () => {
  const {
    phoneNumbers,
    whatsapp,
    email,
    socialMediaLinks,
    setPhoneNumbers,
    setWhatsapp,
    setEmail,
    setSocialMediaLinks,
  } = useSettings();
  const { setting: socialMediaLinksData } = useSetting("social_media_links");
  const { setting: emailData } = useSetting("contact_email");
  const { setting: phoneNumbersData } = useSetting("contact_phones");
  const { setting: whatsappData } = useSetting("contact_whatsapp");

  useEffect(() => {
    if (socialMediaLinksData) {
      const parsed = JSON.parse(socialMediaLinksData.value as string);

      setSocialMediaLinks(
        parsed && typeof parsed === "object"
          ? Object.entries(parsed).map(([key, value]) => ({
              key,
              value: String(value),
            }))
          : [],
      );
    }
    if (phoneNumbersData) {
      const parsed = JSON.parse(phoneNumbersData.value as string);
      setPhoneNumbers(Array.isArray(parsed) ? parsed : []);
    }
    if (emailData) {
      setEmail(emailData.value as string);
    }
    if (whatsappData) {
      setWhatsapp(whatsappData.value as string);
    }

    return () => {};
  }, [
    socialMediaLinksData,
    phoneNumbersData,
    emailData,
    setSocialMediaLinks,
    setPhoneNumbers,
    setEmail,
    whatsappData,
    setWhatsapp,
  ]);

  return {
    phoneNumbers,
    whatsapp,
    email,
    socialMediaLinks,
    setPhoneNumbers,
    setWhatsapp,
    setEmail,
    setSocialMediaLinks,
  };
};
