import { useUserPermission } from "@/hooks/usePermissions";
import { CreateUserWithFileDto, User } from "@/types/user";
import { useEffect } from "react";
import { create } from "zustand";

interface FormState {
  ready: boolean;
  permissionsReady: boolean;
  setReady: (ready: boolean) => void;
  setPermissionsReady: (ready: boolean) => void;
  form: CreateUserWithFileDto;
  setForm: (form: Partial<CreateUserWithFileDto>) => void;
  reset: () => void;
  permissionIds: number[];
  setPermissionIds: (ids: number[]) => void;
  initialPermissionIds: number[];
  setInitialPermissionIds: (ids: number[]) => void;
  existingPicture: string | null;
  setExistingPicture: (picture: string | null) => void;
}

export const useForm = create<FormState>((set) => ({
  ready: false,
  setReady: (ready) => set(() => ({ ready })),
  permissionsReady: false,
  setPermissionsReady: (ready) => set(() => ({ permissionsReady: ready })),
  form: {
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+966",
    password: "",
    confirmPassword: "",
    permissionType: "ADMINISTRATOR",
    status: "ACTIVE",
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
      permissionsReady: false,
      form: {
        fullName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+966",
        password: "",
        confirmPassword: "",
        permissionType: "ADMINISTRATOR",
        status: "ACTIVE",
      },
      existingPicture: null,
      permissionIds: [],
      initialPermissionIds: [],
    })),
  permissionIds: [],
  setPermissionIds: (ids) =>
    set(() => ({
      permissionIds: ids,
    })),
  initialPermissionIds: [],
  setInitialPermissionIds: (ids) =>
    set(() => ({
      initialPermissionIds: ids,
    })),
  existingPicture: null,
  setExistingPicture: (picture) =>
    set(() => ({
      existingPicture: picture,
    })),
}));

export const useManageForm = (id: string, admin?: User | null) => {
  const { permissions, isLoading: isPermissionsLoading, isFetching } =
    useUserPermission(id);
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);
  const permissionsReady = useForm((state) => state.permissionsReady);
  const setPermissionsReady = useForm((state) => state.setPermissionsReady);
  const setPermissionIds = useForm((state) => state.setPermissionIds);
  const setInitialPermissionIds = useForm(
    (state) => state.setInitialPermissionIds,
  );

  useEffect(() => {
    if (!ready && admin) {
      setForm({
        fullName: admin.fullName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        status: admin.status,
      });
      setExistingPicture(admin.profileImagePath || null);
      setReady(true);
    }
  }, [admin, ready, setExistingPicture, setForm, setReady]);

  useEffect(() => {
    // Initialize permissions only after the latest query response is settled.
    // This avoids seeding form state from stale cached data.
    if (permissionsReady || isPermissionsLoading || isFetching) return;

    const newPermissionIds = permissions.map((p) => p.id);
    setPermissionIds(newPermissionIds);
    setInitialPermissionIds(newPermissionIds);
    setForm({
      permissionType: newPermissionIds.length > 0 ? "CUSTOM" : "ADMINISTRATOR",
    });
    setPermissionsReady(true);
  }, [
    permissions,
    permissionsReady,
    isPermissionsLoading,
    isFetching,
    setPermissionIds,
    setInitialPermissionIds,
    setForm,
    setPermissionsReady,
  ]);

  return { form, setForm, reset, ready, permissionsReady };
};
