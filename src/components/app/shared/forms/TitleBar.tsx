import { FormType } from "@/components/app/shared/forms/AppForm";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
import { CancelButton } from "../button/CancelButton";
import { SaveButton, SaveButtonType } from "../button/SaveButton";
import { twMerge } from "tailwind-merge";

export const TitleBar = ({
  type,
  children,
  onSubmit,
  onCancel,
  busy,
  action,
  className,
}: {
  type: FormType;
  children?: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  busy?: boolean;
  action: "add" | "edit" | "view";
  className?: string;
}) => {
  const dict = useDict();
  const labelMap = {
    [FormType.SubscriberRequests]: dict.subscription_request_detail_page.title,
    [FormType.Subscribers]: dict.subscribers_page.title,
    [FormType.Admins]:
      action === "add"
        ? dict.add_new_admin_form.title
        : action === "edit"
          ? dict.edit_admin.title
          : dict.view_admin.viewMainCategory.title,
    [FormType.Notifications]: dict.notifications_page.buttons.add_notification,
    [FormType.Message]: dict.contact_messages_page.title,
    [FormType.Clients]:
      action === "add"
        ? dict.clients_management.form.title_add
        : action === "edit"
          ? dict.clients_management.form.title_edit
          : dict.clients_management.detail.title,
    [FormType.Features]:
      action === "add"
        ? dict.features_management.form.title_add
        : action === "edit"
          ? dict.features_management.form.title_edit
          : dict.features_management.detail.title,
  };
  const saveType = SaveButtonType.Admin;

  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <h1 className="text-dashboard-title text-lg leading-9 font-bold tracking-tight md:text-xl lg:text-2xl dark:text-white">
        {labelMap[type]}
      </h1>
      {children ?? (
        <div className="flex items-center gap-2 lg:gap-4">
          {onSubmit && (
            <SaveButton
              type={saveType}
              onPress={onSubmit}
              isLoading={busy}
              isDisabled={busy}
            />
          )}
          {onCancel && <CancelButton onPress={onCancel} isDisabled={busy} />}
        </div>
      )}
    </div>
  );
};
