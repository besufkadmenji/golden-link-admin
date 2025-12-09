import { useSetting } from "@/components/app/Settings/useSettings";
import { useMe } from "@/hooks/useMe";
import { UpdateUserWithFileDto } from "@/types/user";
import { useEffect } from "react";
import { create } from "zustand";

interface SettingsState {
  trialPeriodDuration: string;
  vatRate: string;
  updateProfile: UpdateUserWithFileDto;
  existingPicture?: string | null;

  setExistingPicture: (value: string | null) => void;
  setUpdateProfile: (value: Partial<UpdateUserWithFileDto>) => void;
  setTrialPeriodDuration: (value: string) => void;
  setVatRate: (value: string) => void;
  reset: () => void;
}

export const useSettings = create<SettingsState>((set) => ({
  trialPeriodDuration: "",
  vatRate: "",
  updateProfile: { fullName: "", email: "", phoneNumber: "" },
  existingPicture: null,

  setExistingPicture: (value) => set({ existingPicture: value }),
  setUpdateProfile: (value) =>
    set((state) => ({ updateProfile: { ...state.updateProfile, ...value } })),
  setTrialPeriodDuration: (value) => set({ trialPeriodDuration: value }),

  setVatRate: (value) => set({ vatRate: value }),

  reset: () =>
    set({
      trialPeriodDuration: "",
      vatRate: "",
    }),
}));

export const useManageSettingsForm = () => {
  const {
    setTrialPeriodDuration,
    setVatRate,
    vatRate,
    trialPeriodDuration,
    updateProfile,
    setUpdateProfile,
    existingPicture,
    setExistingPicture,
  } = useSettings();
  const { setting: trialPeriodDurationData } = useSetting(
    "trial_period_duration",
  );
  const { setting: vatRateData } = useSetting("vat_rate");
  const { me } = useMe();

  useEffect(() => {
    if (trialPeriodDurationData) {
      setTrialPeriodDuration(trialPeriodDurationData.value);
    }
    if (vatRateData) {
      setVatRate(vatRateData.value);
    }
    if (me) {
      setUpdateProfile({
        fullName: me.fullName,
        email: me.email,
        phoneNumber: me.phoneNumber || "",
      });
      setExistingPicture(me.profileImagePath || null);
    }

    return () => {};
  }, [
    me,
    setExistingPicture,
    setTrialPeriodDuration,
    setUpdateProfile,
    setVatRate,
    trialPeriodDurationData,
    vatRateData,
  ]);

  return {
    trialPeriodDuration,
    vatRate,
    setTrialPeriodDuration,
    setVatRate,
    updateProfile,
    setUpdateProfile,
    existingPicture,
    setExistingPicture,
  };
};
