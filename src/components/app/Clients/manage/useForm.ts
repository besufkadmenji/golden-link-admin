import { CreateClientDto } from "@/types/client";
import { useEffect } from "react";
import { create } from "zustand";
import { useClientById } from "../useClients";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateClientDto;
  setForm: (form: Partial<CreateClientDto>) => void;
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
    clientLogo: undefined,
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
        clientLogo: undefined,
      },
    })),
  existingPicture: null,
  setExistingPicture: (picture) =>
    set(() => ({
      existingPicture: picture,
    })),
}));

export const useManageForm = (id: number) => {
  const { client } = useClientById(id);
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);

  useEffect(() => {
    if (!ready && client) {
      setForm({
        name: client.name,
        isActive: client.isActive,
      });
      setExistingPicture(client.logoPath || null);
      setReady(true);
    }
  }, [client, ready, setExistingPicture, setForm, setReady]);

  return { form, setForm, reset };
};
