import { CreateNotificationDto } from "@/types/notification";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateNotificationDto;
  setForm: (form: Partial<CreateNotificationDto>) => void;
  reset: () => void;
}

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  form: {
    title: "",
    content: "",
    recipientIds: [],
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
        title: "",
        content: "",
        recipientIds: [],
      },
    })),
}));
