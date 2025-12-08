import { useState, useCallback, useMemo } from "react";
import { CreateNotificationDto } from "@/types/notification";

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 255;
const CONTENT_MIN_LENGTH = 10;
const CONTENT_MAX_LENGTH = 5000;

export const useFormValidation = (form: CreateNotificationDto) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateTitle = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Notification title is required";
    }
    if (value.trim().length < TITLE_MIN_LENGTH) {
      return "Notification title must be at least 3 characters long";
    }
    if (value.trim().length > TITLE_MAX_LENGTH) {
      return "Notification title must not exceed 255 characters";
    }
    return null;
  }, []);

  const validateContent = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Notification content is required";
    }
    if (value.trim().length < CONTENT_MIN_LENGTH) {
      return "Notification content must be at least 10 characters long";
    }
    if (value.trim().length > CONTENT_MAX_LENGTH) {
      return "Notification content must not exceed 5000 characters";
    }
    return null;
  }, []);

  const validateRecipientIds = useCallback(
    (value: (string | number)[]): string | null => {
      if (!value || value.length === 0) {
        return "At least one recipient is required";
      }
      return null;
    },
    [],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const titleError = validateTitle(form.title);
    if (titleError) newErrors.title = titleError;

    const contentError = validateContent(form.content);
    if (contentError) newErrors.content = contentError;

    const recipientIdsError = validateRecipientIds(form.recipientIds);
    if (recipientIdsError) newErrors.recipientIds = recipientIdsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.title,
    form.content,
    form.recipientIds,
    validateTitle,
    validateContent,
    validateRecipientIds,
  ]);

  const isFormValid = useMemo(() => {
    const titleError = validateTitle(form.title);
    const contentError = validateContent(form.content);
    const recipientIdsError = validateRecipientIds(form.recipientIds);

    return !titleError && !contentError && !recipientIdsError;
  }, [
    form.title,
    form.content,
    form.recipientIds,
    validateTitle,
    validateContent,
    validateRecipientIds,
  ]);

  const validateField = useCallback(
    (
      field: keyof CreateNotificationDto,
      value: string | string[] | number[],
    ) => {
      let error = "";

      switch (field) {
        case "title":
          error = validateTitle(value as string) || "";
          break;
        case "content":
          error = validateContent(value as string) || "";
          break;
        case "recipientIds":
          error = validateRecipientIds(value as (string | number)[]) || "";
          break;
      }

      if (error) {
        setErrors((prev) => ({ ...prev, [field as string]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [validateTitle, validateContent, validateRecipientIds],
  );

  const clearError = useCallback(
    (field: string) => {
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    },
    [errors],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    isFormValid,
    clearError,
    clearErrors,
  };
};
