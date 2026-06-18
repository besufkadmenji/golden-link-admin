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
  initialProfileImagePath: string | null;
  setInitialProfileImagePath: (picture: string | null) => void;
  profileImageRemoved: boolean;
  setProfileImageRemoved: (removed: boolean) => void;
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
      initialProfileImagePath: null,
      profileImageRemoved: false,
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
  initialProfileImagePath: null,
  setInitialProfileImagePath: (picture) =>
    set(() => ({
      initialProfileImagePath: picture,
    })),
  profileImageRemoved: false,
  setProfileImageRemoved: (removed) =>
    set(() => ({
      profileImageRemoved: removed,
    })),
}));

export const useManageForm = (id: string, admin?: User | null) => {
  const {
    permissions,
    permissionType: assignedPermissionType,
    isLoading: isPermissionsLoading,
    isFetching,
  } = useUserPermission(id);
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const setExistingPicture = useForm((state) => state.setExistingPicture);
  const setInitialProfileImagePath = useForm(
    (state) => state.setInitialProfileImagePath,
  );
  const setProfileImageRemoved = useForm((state) => state.setProfileImageRemoved);
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
    reset();
  }, [id, reset]);

  useEffect(() => {
    if (
      ready ||
      permissionsReady ||
      isPermissionsLoading ||
      isFetching ||
      !admin ||
      admin.id !== id
    ) {
      return;
    }

    const newPermissionIds = permissions.map((p) => p.id);
    const permissionType = assignedPermissionType ?? admin.permissionType;

    setForm({
      fullName: admin.fullName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      countryCode: admin.countryCode || "+966",
      status: admin.status,
      permissionType,
    });
    setPermissionIds(newPermissionIds);
    setInitialPermissionIds(newPermissionIds);
    setExistingPicture(admin.profileImagePath || null);
    setInitialProfileImagePath(admin.profileImagePath || null);
    setProfileImageRemoved(false);
    setReady(true);
    setPermissionsReady(true);
  }, [
    admin,
    assignedPermissionType,
    id,
    isFetching,
    isPermissionsLoading,
    permissions,
    permissionsReady,
    ready,
    setExistingPicture,
    setForm,
    setInitialPermissionIds,
    setInitialProfileImagePath,
    setPermissionIds,
    setPermissionsReady,
    setProfileImageRemoved,
    setReady,
  ]);

  return { form, setForm, reset, ready, permissionsReady };
};
