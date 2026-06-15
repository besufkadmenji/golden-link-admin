import { CreateSubscriberDto, SubscriberDetail } from "@/types/subscriber";
import { normalizeSubscriberRole } from "@/utils/subscriber.helpers";
import { useEffect } from "react";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreateSubscriberDto;
  setForm: (form: Partial<CreateSubscriberDto>) => void;
  reset: () => void;
  existingCommercialRegistrationImage: string | null;
  setExistingCommercialRegistrationImage: (url: string | null) => void;
  existingTaxRegistrationImage: string | null;
  setExistingTaxRegistrationImage: (url: string | null) => void;
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
        commercialRegistrationImagePath: undefined,
        taxRegistrationImagePath: undefined,
        type: "WAREHOUSE_OWNER",
      },
      existingCommercialRegistrationImage: null,
      existingTaxRegistrationImage: null,
    })),
  existingCommercialRegistrationImage: null,
  setExistingCommercialRegistrationImage: (url) =>
    set(() => ({
      existingCommercialRegistrationImage: url,
    })),
  existingTaxRegistrationImage: null,
  setExistingTaxRegistrationImage: (url) =>
    set(() => ({
      existingTaxRegistrationImage: url,
    })),
}));

export const useManageForm = (
  id: string,
  subscriber?: SubscriberDetail | null,
) => {
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);
  const existingCommercialRegistrationImage = useForm(
    (state) => state.existingCommercialRegistrationImage,
  );
  const setExistingCommercialRegistrationImage = useForm(
    (state) => state.setExistingCommercialRegistrationImage,
  );
  const existingTaxRegistrationImage = useForm(
    (state) => state.existingTaxRegistrationImage,
  );
  const setExistingTaxRegistrationImage = useForm(
    (state) => state.setExistingTaxRegistrationImage,
  );

  useEffect(() => {
    reset();
  }, [id, reset]);

  useEffect(() => {
    if (!subscriber || subscriber.id !== id) {
      return;
    }

    const role = normalizeSubscriberRole(subscriber.roleName);
    setForm({
      fullName: subscriber.fullName,
      organizationName: subscriber.organizationName,
      email: subscriber.email,
      countryCode: subscriber.countryCode || "+966",
      phoneNumber: subscriber.phoneNumber,
      commercialRegistrationNumber: subscriber.commercialRegistrationNumber,
      taxRegistrationNumber: subscriber.taxRegistrationNumber,
      type:
        role === "SUPPLIER" || role === "CUSTOMER"
          ? role
          : "WAREHOUSE_OWNER",
      password: "",
      confirmPassword: "",
    });
    setExistingCommercialRegistrationImage(
      subscriber.commercialRegistrationImagePath || null,
    );
    setExistingTaxRegistrationImage(
      subscriber.taxRegistrationImagePath || null,
    );
    setReady(true);
  }, [
    id,
    subscriber,
    setExistingCommercialRegistrationImage,
    setExistingTaxRegistrationImage,
    setForm,
    setReady,
  ]);

  return {
    form,
    setForm,
    reset,
    ready,
    existingCommercialRegistrationImage,
    setExistingCommercialRegistrationImage,
    existingTaxRegistrationImage,
    setExistingTaxRegistrationImage,
  };
};
