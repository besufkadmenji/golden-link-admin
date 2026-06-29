import { addToast } from "@heroui/react";
import { TOAST_CLASS_NAMES } from "@/utils/toast.classNames";

export const showErrorMessage = (message: string | Error) => {
  addToast({
    description: message instanceof Error ? message.message : message,
    color: "danger",
    classNames: TOAST_CLASS_NAMES,
  });
};

export const showSuccessMessage = (message: string) => {
  addToast({
    description: message,
    color: "success",
    classNames: TOAST_CLASS_NAMES,
  });
};
