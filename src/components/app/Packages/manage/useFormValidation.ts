import { useState, useCallback, useMemo } from "react";
import { CreateUserDto } from "@/types/user";
import { useDict } from "@/hooks/useDict";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9\-+\s()]+$/;
const PHONE_MIN_LENGTH = 7;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9@$!%*?&]{8,}$/;

interface FormWithPassword extends CreateUserDto {
  confirmPassword?: string;
}

export const useFormValidation = (
  form: FormWithPassword,
  mode: "add" | "edit" = "add",
) => {
  const dict = useDict();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFullName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.add_new_admin_form.validation.fullNameRequired;
      }
      if (value.trim().length < 3) {
        return dict.add_new_admin_form.validation.fullNameMinLength;
      }
      if (value.trim().length > 100) {
        return dict.add_new_admin_form.validation.fullNameMaxLength;
      }
      return null;
    },
    [dict],
  );

  const validateEmail = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.add_new_admin_form.validation.emailRequired;
      }
      if (!EMAIL_REGEX.test(value)) {
        return dict.add_new_admin_form.validation.emailInvalid;
      }
      return null;
    },
    [dict],
  );

  const validatePhoneNumber = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.add_new_admin_form.validation.phoneNumberRequired;
      }
      if (!PHONE_REGEX.test(value)) {
        return dict.add_new_admin_form.validation.phoneNumberInvalid;
      }
      if (value.replace(/\D/g, "").length < PHONE_MIN_LENGTH) {
        return dict.add_new_admin_form.validation.phoneNumberTooShort;
      }
      if (value.replace(/\D/g, "").length > PHONE_MAX_LENGTH) {
        return dict.add_new_admin_form.validation.phoneNumberTooLong;
      }
      return null;
    },
    [dict],
  );

  const validateCountryCode = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.add_new_admin_form.validation.countryCodeRequired;
      }
      return null;
    },
    [dict],
  );

  const validatePassword = useCallback(
    (value: string): string | null => {
      if (!value || value === "") {
        return dict.add_new_admin_form.validation.passwordRequired;
      }
      if (value.length < PASSWORD_MIN_LENGTH) {
        return dict.add_new_admin_form.validation.passwordMinLength;
      }
      if (!PASSWORD_REGEX.test(value)) {
        return dict.add_new_admin_form.validation.passwordWeak;
      }
      return null;
    },
    [dict],
  );

  const validateConfirmPassword = useCallback(
    (password: string, confirm: string): string | null => {
      if (!confirm || confirm === "") {
        return dict.add_new_admin_form.validation.confirmPasswordRequired;
      }
      if (password !== confirm) {
        return dict.add_new_admin_form.validation.confirmPasswordMismatch;
      }
      return null;
    },
    [dict],
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

    // Only validate password in add mode
    if (mode === "add") {
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
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
  ]);

  const isFormValid = useMemo(() => {
    const fullNameError = validateFullName(form.fullName);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhoneNumber(form.phoneNumber);
    const countryCodeError = validateCountryCode(form.countryCode);

    // Skip password validation in edit mode
    if (mode === "edit") {
      return !fullNameError && !emailError && !phoneError && !countryCodeError;
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
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
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
