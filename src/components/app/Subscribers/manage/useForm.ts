import { CreateSubscriberDto } from "@/types/subscriber";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateSubscriberDto;
  setForm: (form: Partial<CreateSubscriberDto>) => void;
  reset: () => void;
  commercialRegistrationImageFile?: File;
  taxRegistrationImageFile?: File;
  setCommercialRegistrationImageFile: (file?: File) => void;
  setTaxRegistrationImageFile: (file?: File) => void;
}

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  form: {
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+966",
    organizationName: "",
    password: "",
    confirmPassword: "",
    commercialRegistrationNumber: "",
    taxRegistrationNumber: "",
    type: "WAREHOUSE_OWNER",
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
        fullName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+966",
        organizationName: "",
        password: "",
        confirmPassword: "",
        commercialRegistrationNumber: "",
        taxRegistrationNumber: "",
        type: "WAREHOUSE_OWNER",
      },
      commercialRegistrationImageFile: undefined,
      taxRegistrationImageFile: undefined,
    })),
  commercialRegistrationImageFile: undefined,
  taxRegistrationImageFile: undefined,
  setCommercialRegistrationImageFile: (file) =>
    set(() => ({ commercialRegistrationImageFile: file })),
  setTaxRegistrationImageFile: (file) =>
    set(() => ({ taxRegistrationImageFile: file })),
}));
