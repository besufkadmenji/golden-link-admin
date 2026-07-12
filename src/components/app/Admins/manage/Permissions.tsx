import { useForm } from "@/components/app/Admins/manage/useForm";
import { AppSwitch } from "@/components/app/shared/AppSwitch";
import { useDict } from "@/hooks/useDict";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission } from "@/types/permission";
import { useMemo } from "react";
import { AppCheckbox } from "../../shared/AppCheckbox";

const WRITE_ACTIONS = new Set(["create", "update", "delete"]);

export const Permissions = ({
  readOnly,
  errorMessage,
  onPermissionChange,
}: {
  readOnly?: boolean;
  ready?: boolean;
  errorMessage?: string;
  onPermissionChange?: () => void;
}) => {
  const dict = useDict();
  const { form, setForm, permissionIds, setPermissionIds } = useForm();
  const { permissions, isLoading } = usePermissions();

  // Group permissions by module
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((permission) => {
      if (!groups[permission.module]) {
        groups[permission.module] = [];
      }
      groups[permission.module].push(permission);
    });
    return groups;
  }, [permissions]);

  const updatePermissionIds = (ids: number[]) => {
    setPermissionIds(ids);
    onPermissionChange?.();
  };

  const handleModuleToggle = (module: string) => {
    const modulePermissions = groupedPermissions[module];
    const modulePermissionIds = modulePermissions.map((p) => p.id);
    const allSelected = modulePermissionIds.every((id) =>
      permissionIds.includes(id),
    );

    if (allSelected) {
      updatePermissionIds(
        permissionIds.filter((id) => !modulePermissionIds.includes(id)),
      );
    } else {
      updatePermissionIds([
        ...permissionIds.filter(
          (id) => !modulePermissionIds.includes(Number(id)),
        ),
        ...modulePermissionIds.map((id) => id),
      ]);
    }
  };

  const isModuleFullySelected = (module: string) => {
    const modulePermissions = groupedPermissions[module];
    return modulePermissions.every((p) => permissionIds.includes(p.id));
  };

  const isActionSelected = (module: string, action: string) => {
    const permission = groupedPermissions[module]?.find(
      (p) => p.action === action,
    );
    return permission ? permissionIds.includes(permission.id) : false;
  };

  const handleActionToggle = (module: string, action: string) => {
    const modulePermissions = groupedPermissions[module] || [];
    const permission = modulePermissions.find((p) => p.action === action);
    if (!permission) return;

    const isCurrentlySelected = permissionIds.includes(permission.id);

    if (isCurrentlySelected) {
      if (action === "read") {
        // View is required for other actions — clear the whole module
        const modulePermissionIds = new Set(modulePermissions.map((p) => p.id));
        updatePermissionIds(
          permissionIds.filter((id) => !modulePermissionIds.has(id)),
        );
        return;
      }

      updatePermissionIds(permissionIds.filter((id) => id !== permission.id));
      return;
    }

    const nextIds = new Set(permissionIds);
    nextIds.add(permission.id);

    // Auto-check view when add/edit/delete is selected
    if (WRITE_ACTIONS.has(action)) {
      const readPermission = modulePermissions.find((p) => p.action === "read");
      if (readPermission) {
        nextIds.add(readPermission.id);
      }
    }

    updatePermissionIds([...nextIds]);
  };

  return (
    !isLoading && (
      <div className="border-dashboard-border dark:border-dark-border dark:bg-dark-black overflow-hidden rounded-lg border bg-white">
        <div className="border-b-dashboard-border dark:border-b-dark-border dark:bg-dark-app-background flex h-11 items-center justify-between border-b bg-[#F9F9FC] px-3">
          <p className="text-sm leading-7 font-medium tracking-tight text-[#1A1C21] dark:text-white md:text-lg">
            {dict.add_new_admin_form.sections.permissions}
          </p>
          <div className="flex gap-2 md:gap-8">
            <AppCheckbox
              isSelected={
                form.permissionType === "ADMINISTRATOR" ||
                form.permissionType === "SUPER_ADMIN"
              }
              onValueChange={() => {
                setForm({ permissionType: "ADMINISTRATOR" });
                updatePermissionIds([]);
              }}
              isDisabled={readOnly}
            >
              {dict.add_new_admin_form.permissions.full_access}
            </AppCheckbox>
            <AppCheckbox
              isSelected={form.permissionType === "CUSTOM"}
              onValueChange={() => {
                setForm({ permissionType: "CUSTOM" });
                onPermissionChange?.();
              }}
              isDisabled={readOnly}
            >
              {dict.add_new_admin_form.permissions.limited_access}
            </AppCheckbox>
          </div>
        </div>

        {form.permissionType === "CUSTOM" && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
            {Object.entries(groupedPermissions).map(([module, perms]) => (
              <div
                key={module}
                className="dark:border-dark-border grid grid-cols-1 rounded-lg border border-[#EEEEEE] p-4 lg:p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-[#2E2E2E] dark:text-white">
                    {dict.admin_permissions_management.modules[
                      module as keyof typeof dict.admin_permissions_management.modules
                    ] || module}
                  </p>
                  <AppSwitch
                    size="sm"
                    isSelected={isModuleFullySelected(module)}
                    onValueChange={() => handleModuleToggle(module)}
                    isDisabled={readOnly}
                  />
                </div>
                <div className="dark:bg-dark-border my-5 h-[0.50px] w-full bg-[#EEEEEE]"></div>

                <div className="flex flex-wrap justify-start gap-4 lg:justify-start lg:gap-8">
                  {(["read", "create", "update", "delete"] as const).map(
                    (action) => {
                      const hasAction = perms.some((p) => p.action === action);
                      if (!hasAction) return null;

                      return (
                        <AppCheckbox
                          key={action}
                          isSelected={isActionSelected(module, action)}
                          onValueChange={() =>
                            handleActionToggle(module, action)
                          }
                          classNames={{
                            label: "text-xs leading-4",
                          }}
                          isDisabled={readOnly}
                        >
                          {dict.admin_permissions_management.permission_actions[
                            action
                          ] || action}
                        </AppCheckbox>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {errorMessage && (
          <p className="px-4 pb-4 text-sm text-red-500 md:px-6">{errorMessage}</p>
        )}
      </div>
    )
  );
};
