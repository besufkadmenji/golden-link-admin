import { FormTitle } from "@/components/app/shared/forms/FormTitle";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { TitleBar } from "./TitleBar";
export enum FormType {
  SubscriberRequests,
  Subscribers,
}
export const AppForm = ({
  type,
  children,
  className,
  classNames,
  titleChildren,
}: {
  type: FormType;
  children: ReactNode;
  titleChildren?: ReactNode;
  className?: string;
  classNames?: {
    form?: string;
  };
  onSubmit?: () => void;
  onCancel?: () => void;
  busy?: boolean;
  action: "add" | "edit" | "view";
}) => {
  return (
    <div
      className={twMerge(
        "grid auto-rows-max grid-cols-1 items-start gap-6",
        className,
      )}
    >
      <TitleBar type={type}>{titleChildren}</TitleBar>
      <form
        className={twMerge("grid grid-cols-1 gap-4", classNames?.form)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </form>
    </div>
  );
};

export const FormSection = ({
  children,
  title,
  subTitle,
  className,
  classNames,
  titleEndContent,
}: {
  children: ReactNode;
  title?: string;
  subTitle?: string;
  className?: string;
  classNames?: {
    title?: string;
  };
  titleEndContent?: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "dark:bg-dark-black grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]",
        className,
      )}
    >
      {title === "" ? (
        <></>
      ) : (
        <FormTitle
          title={title}
          subTitle={subTitle}
          className={classNames?.title}
          endContent={titleEndContent}
        />
      )}

      <div className="grid grid-cols-1 gap-2">{children}</div>
    </div>
  );
};
