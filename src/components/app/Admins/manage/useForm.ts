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
    })),
  permissionIds: [],
  setPermissionIds: (ids) =>
    set(() => ({
      permissionIds: ids,
    })),
  existingPicture: null,
  setExistingPicture: (picture) =>
    set(() => ({
      existingPicture: picture,
    })),
}));

export const useManageForm = (id: string, admin?: User | null) => {
  const { permissions } = useUserPermission(id);
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const reset = useForm((state) => state.reset);
  const ready = useForm((state) => state.ready);
  const setReady = useForm((state) => state.setReady);
  const permissionsReady = useForm((state) => state.permissionsReady);
  const setPermissionsReady = useForm((state) => state.setPermissionsReady);
  const permissionIds = useForm((state) => state.permissionIds);
  const setPermissionIds = useForm((state) => state.setPermissionIds);

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
    if (permissions && permissions.length > 0 && permissionIds.length === 0) {
      const newPermissionIds = permissions.map((p) => p.id);
      setPermissionIds(newPermissionIds);
      setForm({
        permissionType: "CUSTOM",
      });
      setPermissionsReady(true);
    }
  }, [
    permissions,
    permissionIds.length,
    setPermissionIds,
    setForm,
    setPermissionsReady,
  ]);

  return { form, setForm, reset, ready, permissionsReady };
};
