import { addToast } from "@heroui/react";
export const showErrorMessage = (message: string | Error) => {
  addToast({
    title: message instanceof Error ? message.message : message,
    color: "danger",
  });
};

export const showSuccessMessage = (message: string) => {
  addToast({
    title: message,
    color: "success",
  });
};
