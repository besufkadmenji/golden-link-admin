import { FormType } from "@/components/app/shared/forms/AppForm";
import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";

export const TitleBar = ({
  type,
  children,
}: {
  type: FormType;
  children?: ReactNode;
}) => {
  const dict = useDict();
  const labelMap = {
    [FormType.SubscriberRequests]: dict.subscription_request_detail_page.title,
    [FormType.Subscribers]: dict.subscribers_page.title,
    [FormType.Admins]: dict.add_new_admin_form.title,
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-dashboard-title text-2xl leading-9 font-bold tracking-tight dark:text-white">
        {labelMap[type]}
      </h1>
      {children}
    </div>
  );
};
