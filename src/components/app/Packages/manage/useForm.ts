import { CreatePackageDto, Package, PackageFeatures } from "@/types/package";
import { useEffect } from "react";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  setReady: (ready: boolean) => void;
  form: CreatePackageDto;
  setForm: (form: Partial<CreatePackageDto>) => void;
  reset: () => void;
  existingIcon: string | null;
  setExistingIcon: (icon: string | null) => void;
  features: PackageFeatures;
  setFeatures: (features: Partial<PackageFeatures>) => void;
}

const defaultFeatures: PackageFeatures = {
  inventoryOperations: false,
  products: false,
  categories: false,
  purchaseOrders: false,
  invoices: false,
  priceOffers: false,
  customers: false,
  suppliers: false,
  reportsAndAnalytics: false,
  shipmentTracking: false,
  drivers: false,
  rentedSpaces: false,
  settings: false,
  rolesAndPermissions: false,
  packagesAndSubscriptions: false,
};

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  form: {
    packageName: "",
    packageDuration: "",
    packagePrice: "",
    features: defaultFeatures,
    status: "ACTIVE",
    description: "",
    maxWarehouses: undefined,
    maxUsers: undefined,
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
        packageName: "",
        packageDuration: "",
        packagePrice: "",
        features: defaultFeatures,
        status: "ACTIVE",
        description: "",
        maxWarehouses: undefined,
        maxUsers: undefined,
      },
      existingIcon: null,
      features: defaultFeatures,
    })),
  existingIcon: null,
  setExistingIcon: (icon) =>
    set(() => ({
      existingIcon: icon,
    })),
  features: defaultFeatures,
  setFeatures: (features) =>
    set((state) => ({
      features: {
        ...state.features,
        ...features,
      },
    })),
}));

export const useManageForm = (id: string, packageData?: Package | null) => {
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingIcon = useForm((state) => state.setExistingIcon);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);
  const features = useForm((state) => state.features);
  const setFeatures = useForm((state) => state.setFeatures);

  useEffect(() => {
    if (!ready && packageData) {
      setForm({
        packageName: packageData.packageName,
        packageDuration: packageData.packageDuration,
        packagePrice: packageData.packagePrice,
        status: packageData.status,
        description: packageData.description || "",
        maxWarehouses: packageData.maxWarehouses || undefined,
        maxUsers: packageData.maxUsers || undefined,
      });
      setFeatures(packageData.features);
      setExistingIcon(packageData.iconPath || null);
      setReady(true);
    }
  }, [packageData, ready, setExistingIcon, setForm, setFeatures, setReady]);

  return { form, setForm, reset, ready, features, setFeatures };
};
