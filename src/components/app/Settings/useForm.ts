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
  initialProfileImagePath?: string | null;
  profileImageRemoved: boolean;

  setExistingPicture: (value: string | null) => void;
  setInitialProfileImagePath: (value: string | null) => void;
  setProfileImageRemoved: (value: boolean) => void;
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
  initialProfileImagePath: null,
  profileImageRemoved: false,

  setExistingPicture: (value) => set({ existingPicture: value }),
  setInitialProfileImagePath: (value) => set({ initialProfileImagePath: value }),
  setProfileImageRemoved: (value) => set({ profileImageRemoved: value }),
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
    initialProfileImagePath,
    profileImageRemoved,
    setInitialProfileImagePath,
    setProfileImageRemoved,
  } = useSettings();
  const { setting: trialPeriodDurationData } = useSetting(
    "trial_period_duration",
  );
  const { setting: vatRateData } = useSetting("vat_rate");
  const { me } = useMe();

  useEffect(() => {
    if (trialPeriodDurationData) {
      setTrialPeriodDuration(trialPeriodDurationData.value as string);
    }
    if (vatRateData) {
      setVatRate(vatRateData.value as string);
    }
    if (me) {
      setUpdateProfile({
        fullName: me.fullName,
        email: me.email,
        phoneNumber: me.phoneNumber || "",
      });
      const profileImagePath = me.profileImagePath || null;
      setExistingPicture(profileImagePath);
      setInitialProfileImagePath(profileImagePath);
      setProfileImageRemoved(false);
    }

    return () => {};
  }, [
    me,
    setExistingPicture,
    setInitialProfileImagePath,
    setProfileImageRemoved,
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
    initialProfileImagePath,
    profileImageRemoved,
    setProfileImageRemoved,
    vatRateReady: !!vatRateData,
    trialPeriodDurationReady: !!trialPeriodDurationData,
  };
};
