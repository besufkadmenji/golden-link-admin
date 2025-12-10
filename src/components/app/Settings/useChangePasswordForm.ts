import { create } from "zustand";

interface ChangePasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setForm: (data: Partial<ChangePasswordFormState>) => void;
  reset: () => void;
}

export const useChangePasswordForm = create<ChangePasswordFormState>((set) => ({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  setForm: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
  reset: () =>
    set({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
}));
