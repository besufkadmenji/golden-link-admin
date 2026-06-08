import { CreateFeatureDto, Feature } from "@/types/feature";
import { useLayoutEffect } from "react";
import { create } from "zustand";

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
      existingPicture: null,
    })),
  existingPicture: null,
  setExistingPicture: (picture) =>
    set(() => ({
      existingPicture: picture,
    })),
}));

export const useManageForm = (id: number, feature?: Feature | null) => {
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);

  useLayoutEffect(() => {
    reset();
  }, [id, reset]);

  useLayoutEffect(() => {
    if (!feature || feature.id !== id) {
      return;
    }

    setForm({
      name: feature.name,
      isActive: feature.isActive,
      nameAr: feature.nameAr,
      description: feature.description,
      descriptionAr: feature.descriptionAr,
    });
    setExistingPicture(feature.featurePhotoPath || null);
    setReady(true);
  }, [id, feature, setExistingPicture, setForm, setReady]);

  return { form, setForm, reset, ready };
};
