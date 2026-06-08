import { useState, useCallback, useMemo } from "react";
import { CreateFeatureDto } from "@/types/feature";
import { useDict } from "@/hooks/useDict";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 500;

export const useFormValidation = (form: CreateFeatureDto) => {
  const dict = useDict();
  const validation = dict.features_management.form.validation;
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

  const validateNameAr = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.nameAr.required;
      }
      if (value.trim().length < NAME_MIN_LENGTH) {
        return validation.nameAr.minLength;
      }
      if (value.trim().length > NAME_MAX_LENGTH) {
        return validation.nameAr.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validateDescription = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.description.required;
      }
      if (value.trim().length < DESCRIPTION_MIN_LENGTH) {
        return validation.description.minLength;
      }
      if (value.trim().length > DESCRIPTION_MAX_LENGTH) {
        return validation.description.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validateDescriptionAr = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.descriptionAr.required;
      }
      if (value.trim().length < DESCRIPTION_MIN_LENGTH) {
        return validation.descriptionAr.minLength;
      }
      if (value.trim().length > DESCRIPTION_MAX_LENGTH) {
        return validation.descriptionAr.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateName(form.name);
    if (nameError) newErrors.name = nameError;

    const nameArError = validateNameAr(form.nameAr);
    if (nameArError) newErrors.nameAr = nameArError;

    const descriptionError = validateDescription(form.description);
    if (descriptionError) newErrors.description = descriptionError;

    const descriptionArError = validateDescriptionAr(form.descriptionAr);
    if (descriptionArError) newErrors.descriptionAr = descriptionArError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.name,
    form.nameAr,
    form.description,
    form.descriptionAr,
    validateName,
    validateNameAr,
    validateDescription,
    validateDescriptionAr,
  ]);

  const isFormValid = useMemo(() => {
    return (
      !validateName(form.name) &&
      !validateNameAr(form.nameAr) &&
      !validateDescription(form.description) &&
      !validateDescriptionAr(form.descriptionAr)
    );
  }, [
    form.name,
    form.nameAr,
    form.description,
    form.descriptionAr,
    validateName,
    validateNameAr,
    validateDescription,
    validateDescriptionAr,
  ]);

  const validateField = useCallback(
    (field: keyof CreateFeatureDto, value: string) => {
      let error = "";

      switch (field) {
        case "name":
          error = validateName(value) || "";
          break;
        case "nameAr":
          error = validateNameAr(value) || "";
          break;
        case "description":
          error = validateDescription(value) || "";
          break;
        case "descriptionAr":
          error = validateDescriptionAr(value) || "";
          break;
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
    [
      validateName,
      validateNameAr,
      validateDescription,
      validateDescriptionAr,
    ],
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
