import { FormType } from "@/components/app/shared/forms/AppForm";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
import { CancelButton } from "../button/CancelButton";
import { SaveButton, SaveButtonType } from "../button/SaveButton";

export const TitleBar = ({
  type,
  children,
  onSubmit,
  onCancel,
  busy,
  action,
}: {
  type: FormType;
  children?: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  busy?: boolean;
  action: "add" | "edit" | "view";
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
    [FormType.Notifications]: dict.notifications_page.title,
    [FormType.Message]: dict.contact_messages_page.title,
  };
  const saveType = SaveButtonType.Admin;

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-dashboard-title text-2xl leading-9 font-bold tracking-tight dark:text-white">
        {labelMap[type]}
      </h1>
      {children ?? (
        <div className="flex items-center gap-4">
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
