import { CreateUserWithFileDto } from "@/services/user.service";
import { User } from "@/types/user";
import { useEffect } from "react";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateUserWithFileDto;
  setForm: (form: Partial<CreateUserWithFileDto>) => void;
  reset: () => void;
}

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  form: {
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    password: "",
    confirmPassword: "",
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
        countryCode: "",
        password: "",
        confirmPassword: "",
      },
    })),
}));

export const useManageForm = (admin?: User) => {
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);

  useEffect(() => {
    if (!ready && admin) {
      setForm({
        fullName: admin.fullName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        countryCode: admin.countryCode,
      });
      setReady(true);
    }
  }, [admin, ready, setForm, setReady]);

  return { form, setForm, reset };
};
