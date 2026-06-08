import { useState, useCallback, useMemo } from "react";
import { CreateClientDto } from "@/types/client";
import { useDict } from "@/hooks/useDict";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;

export const useFormValidation = (form: CreateClientDto) => {
  const dict = useDict();
  const validation = dict.clients_management.form.validation;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.name.required;
      }
      if (value.trim().length < NAME_MIN_LENGTH) {
        return validation.name.minLength;
      }
      if (value.trim().length > NAME_MAX_LENGTH) {
        return validation.name.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateName(form.name);
    if (nameError) newErrors.name = nameError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.name, validateName]);

  const isFormValid = useMemo(() => {
    const nameError = validateName(form.name);
    return !nameError;
  }, [form.name, validateName]);

  const validateField = useCallback(
    (field: keyof CreateClientDto, value: string) => {
      let error = "";

      if (field === "name") {
        error = validateName(value) || "";
      }

      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [validateName],
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
