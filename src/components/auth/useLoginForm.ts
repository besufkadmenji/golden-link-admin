import { create } from "zustand";

type LoginForm = {
  email: string;
  password: string;
};

type LoginFormState = {
  form: LoginForm;
  setForm: (form: Partial<LoginForm>) => void;
  reset: () => void;
};

const initialState: LoginForm = {
  email: "",
  password: "",
};

export const useLoginForm = create<LoginFormState>((set) => ({
  form: initialState,
  setForm: (form) =>
    set((state) => ({
      form: {
        ...state.form,
        ...form,
      },
    })),
  reset: () => set({ form: initialState }),
}));
