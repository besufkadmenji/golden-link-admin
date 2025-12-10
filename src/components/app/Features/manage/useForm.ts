import { CreateFeatureDto } from "@/types/feature";
import { useEffect } from "react";
import { create } from "zustand";
import { useFeatureById } from "../useFeatures";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateFeatureDto;
  setForm: (form: Partial<CreateFeatureDto>) => void;
  reset: () => void;
  existingPicture: string | null;
  setExistingPicture: (picture: string | null) => void;
}

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  form: {
    name: "",
    isActive: true,
    featurePhoto: undefined,
    nameAr: "",
    description: "",
    descriptionAr: "",
  },
  setForm: (form) =>
    set((state) => ({
      form: {
        ...state.form,
        ...form,
      },
    })),
  reset: () =>
    set(() => ({
      ready: false,
      form: {
        name: "",
        isActive: true,
        featurePhoto: undefined,
        nameAr: "",
        description: "",
        descriptionAr: "",
      },
    })),
  existingPicture: null,
  setExistingPicture: (picture) =>
    set(() => ({
      existingPicture: picture,
    })),
}));

export const useManageForm = (id: number) => {
  const { feature } = useFeatureById(id);
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);

  useEffect(() => {
    if (!ready && feature) {
      setForm({
        name: feature.name,
        isActive: feature.isActive,
        nameAr: feature.nameAr,
        description: feature.description,
        descriptionAr: feature.descriptionAr,
      });
      setExistingPicture(feature.featurePhotoPath || null);
      setReady(true);
    }
  }, [feature, ready, setExistingPicture, setForm, setReady]);

  return { form, setForm, reset };
};
