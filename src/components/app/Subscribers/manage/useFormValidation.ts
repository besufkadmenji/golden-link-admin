import { useDict } from "@/hooks/useDict";
import { CreateSubscriberDto } from "@/types/subscriber";
import { useState, useCallback, useMemo } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9\-+\s()]+$/;
const PHONE_MIN_LENGTH = 7;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9@$!%*?&]{8,}$/;
const FULL_NAME_MAX_LENGTH = 50;
const TAX_NUMBER_REGEX = /^\d{15}$/;

interface FormWithPassword extends CreateSubscriberDto {
  confirmPassword: string;
}

interface ExistingImages {
  commercialRegistrationImagePath?: string | null;
  taxRegistrationImagePath?: string | null;
}

export const useFormValidation = (
  form: FormWithPassword,
  mode: "add" | "edit" = "add",
  existingImages?: ExistingImages,
) => {
  const dict = useDict();
  const validation = dict.add_new_subscriber_form.validation;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateTaxNumber = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.taxNumberRequired;
      }
      if (!TAX_NUMBER_REGEX.test(value.trim())) {
        return validation.taxNumberInvalid;
      }
      return null;
    },
    [validation],
  );

  const validateCommercialRegistrationNumber = useCallback(
    (value: string): string | null => {
      if (value && value.trim() !== "") {
        if (value.trim().length < 5) {
          return validation.commercialRegistrationNumberMinLength;
        }
      }
      return null;
    },
    [validation],
  );

  const validateCommercialRegistrationImage = useCallback(
    (
      commercialRegNumber: string,
      file?: File,
      existingUrl?: string | null,
    ): string | null => {
      if (commercialRegNumber && commercialRegNumber.trim() !== "") {
        if (!file && !existingUrl) {
          return validation.commercialRegistrationImageRequired;
        }
      }
      return null;
    },
    [validation],
  );

  const validateTaxRegistrationImage = useCallback(
    (file?: File, existingUrl?: string | null): string | null => {
      if (!file && !existingUrl) {
        return validation.taxRegistrationImageRequired;
      }
      return null;
    },
    [validation],
  );

  const validateFullName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.fullNameRequired;
      }
      if (value.trim().length < 3) {
        return validation.fullNameMinLength;
      }
      if (value.trim().length > FULL_NAME_MAX_LENGTH) {
        return validation.fullNameMaxLength;
      }
      return null;
    },
    [validation],
  );

  const validateEmail = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.emailRequired;
      }
      if (!EMAIL_REGEX.test(value)) {
        return validation.emailInvalid;
      }
      return null;
    },
    [validation],
  );

  const validatePhoneNumber = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.phoneNumberRequired;
      }
      if (!PHONE_REGEX.test(value)) {
        return validation.phoneNumberInvalid;
      }
      if (value.replace(/\D/g, "").length < PHONE_MIN_LENGTH) {
        return validation.phoneNumberTooShort;
      }
      if (value.replace(/\D/g, "").length > PHONE_MAX_LENGTH) {
        return validation.phoneNumberTooLong;
      }
      return null;
    },
    [validation],
  );

  const validateCountryCode = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.countryCodeRequired;
      }
      return null;
    },
    [validation],
  );

  const validatePassword = useCallback(
    (value: string): string | null => {
      if (!value || value === "") {
        return validation.passwordRequired;
      }
      if (value.length < PASSWORD_MIN_LENGTH) {
        return validation.passwordMinLength;
      }
      if (!PASSWORD_REGEX.test(value)) {
        return validation.passwordWeak;
      }
      return null;
    },
    [validation],
  );

  const validateConfirmPassword = useCallback(
    (password: string, confirm: string): string | null => {
      if (!confirm || confirm === "") {
        return validation.confirmPasswordRequired;
      }
      if (password !== confirm) {
        return validation.confirmPasswordMismatch;
      }
      return null;
    },
    [validation],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const fullNameError = validateFullName(form.fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhoneNumber(form.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;

    const countryCodeError = validateCountryCode(form.countryCode);
    if (countryCodeError) newErrors.countryCode = countryCodeError;

    const taxNumberError = validateTaxNumber(form.taxRegistrationNumber);
    if (taxNumberError) newErrors.taxRegistrationNumber = taxNumberError;

    const commercialRegError = validateCommercialRegistrationNumber(
      form.commercialRegistrationNumber,
    );
    if (commercialRegError)
      newErrors.commercialRegistrationNumber = commercialRegError;

    const commercialImageError = validateCommercialRegistrationImage(
      form.commercialRegistrationNumber,
      form.commercialRegistrationImagePath,
      existingImages?.commercialRegistrationImagePath,
    );
    if (commercialImageError)
      newErrors.commercialRegistrationImagePath = commercialImageError;

    const taxImageError = validateTaxRegistrationImage(
      form.taxRegistrationImagePath,
      existingImages?.taxRegistrationImagePath,
    );
    if (taxImageError) newErrors.taxRegistrationImagePath = taxImageError;

    if (mode === "add") {
      const passwordError = validatePassword(form.password);
      if (passwordError) newErrors.password = passwordError;

      const confirmPasswordError = validateConfirmPassword(
        form.password,
        form.confirmPassword || "",
      );
      if (confirmPasswordError)
        newErrors.confirmPassword = confirmPasswordError;
    } else if (form.password) {
      const passwordError = validatePassword(form.password);
      if (passwordError) newErrors.password = passwordError;

      const confirmPasswordError = validateConfirmPassword(
        form.password,
        form.confirmPassword || "",
      );
      if (confirmPasswordError)
        newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.fullName,
    form.email,
    form.phoneNumber,
    form.countryCode,
    form.password,
    form.confirmPassword,
    form.taxRegistrationNumber,
    form.commercialRegistrationNumber,
    form.commercialRegistrationImagePath,
    form.taxRegistrationImagePath,
    existingImages?.commercialRegistrationImagePath,
    existingImages?.taxRegistrationImagePath,
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
    validateTaxNumber,
    validateCommercialRegistrationNumber,
    validateCommercialRegistrationImage,
    validateTaxRegistrationImage,
  ]);

  const isFormValid = useMemo(() => {
    const fullNameError = validateFullName(form.fullName);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhoneNumber(form.phoneNumber);
    const countryCodeError = validateCountryCode(form.countryCode);
    const taxNumberError = validateTaxNumber(form.taxRegistrationNumber);
    const commercialRegError = validateCommercialRegistrationNumber(
      form.commercialRegistrationNumber,
    );
    const commercialImageError = validateCommercialRegistrationImage(
      form.commercialRegistrationNumber,
      form.commercialRegistrationImagePath,
      existingImages?.commercialRegistrationImagePath,
    );
    const taxImageError = validateTaxRegistrationImage(
      form.taxRegistrationImagePath,
      existingImages?.taxRegistrationImagePath,
    );

    if (mode === "edit") {
      const passwordError = form.password
        ? validatePassword(form.password)
        : null;
      const confirmPasswordError = form.password
        ? validateConfirmPassword(form.password, form.confirmPassword || "")
        : null;

      return (
        !fullNameError &&
        !emailError &&
        !phoneError &&
        !countryCodeError &&
        !taxNumberError &&
        !commercialRegError &&
        !commercialImageError &&
        !taxImageError &&
        !passwordError &&
        !confirmPasswordError
      );
    }

    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.password,
      form.confirmPassword || "",
    );

    return (
      !fullNameError &&
      !emailError &&
      !phoneError &&
      !countryCodeError &&
      !taxNumberError &&
      !commercialRegError &&
      !commercialImageError &&
      !taxImageError &&
      !passwordError &&
      !confirmPasswordError
    );
  }, [
    form.fullName,
    form.email,
    form.phoneNumber,
    form.countryCode,
    form.password,
    form.confirmPassword,
    form.taxRegistrationNumber,
    form.commercialRegistrationNumber,
    form.commercialRegistrationImagePath,
    form.taxRegistrationImagePath,
    existingImages?.commercialRegistrationImagePath,
    existingImages?.taxRegistrationImagePath,
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
    validateTaxNumber,
    validateCommercialRegistrationNumber,
    validateCommercialRegistrationImage,
    validateTaxRegistrationImage,
  ]);

  const validateField = useCallback(
    (field: keyof FormWithPassword, value: string) => {
      let error = "";

      switch (field) {
        case "fullName":
          error = validateFullName(value) || "";
          break;
        case "email":
          error = validateEmail(value) || "";
          break;
        case "phoneNumber":
          error = validatePhoneNumber(value) || "";
          break;
        case "countryCode":
          error = validateCountryCode(value) || "";
          break;
        case "password":
          error = validatePassword(value) || "";
          break;
        case "confirmPassword":
          error = validateConfirmPassword(form.password, value) || "";
          break;
        case "taxRegistrationNumber":
          error = validateTaxNumber(value) || "";
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
      validateFullName,
      validateEmail,
      validatePhoneNumber,
      validateCountryCode,
      validatePassword,
      validateConfirmPassword,
      validateTaxNumber,
      form.password,
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
