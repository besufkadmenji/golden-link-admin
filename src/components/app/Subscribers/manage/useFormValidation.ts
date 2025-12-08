import { useState, useCallback, useMemo } from "react";
import { CreateSubscriberDto } from "@/types/subscriber";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9\-+\s()]+$/;
const PHONE_MIN_LENGTH = 7;
const PHONE_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9@$!%*?&]{8,}$/;

interface FormWithPassword extends CreateSubscriberDto {
  confirmPassword: string;
}

export const useFormValidation = (
  form: FormWithPassword,
  mode: "add" | "edit" = "add",
) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateTaxNumber = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Tax number is required";
    }
    if (value.trim().length < 10) {
      return "Tax number must be at least 10 characters long";
    }
    return null;
  }, []);

  const validateCommercialRegistrationNumber = useCallback(
    (value: string): string | null => {
      // Optional field - only validate if provided
      if (value && value.trim() !== "") {
        if (value.trim().length < 5) {
          return "Commercial registration number must be at least 5 characters long";
        }
      }
      return null;
    },
    [],
  );

  const validateCommercialRegistrationImage = useCallback(
    (commercialRegNumber: string, file?: File): string | null => {
      // Only required if commercial registration number is provided
      if (commercialRegNumber && commercialRegNumber.trim() !== "") {
        if (!file) {
          return "Commercial registration image is required when commercial number is provided";
        }
      }
      return null;
    },
    [],
  );

  const validateTaxRegistrationImage = useCallback(
    (file?: File): string | null => {
      if (!file) {
        return "Tax registration image is required";
      }
      return null;
    },
    [],
  );

  const validateFullName = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Name is required";
    }
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }
    if (value.trim().length > 100) {
      return "Name must not exceed 100 characters";
    }
    return null;
  }, []);

  const validateEmail = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Email is required";
    }
    if (!EMAIL_REGEX.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  }, []);

  const validatePhoneNumber = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Phone number is required";
    }
    if (!PHONE_REGEX.test(value)) {
      return "Phone number format is invalid";
    }
    if (value.replace(/\D/g, "").length < PHONE_MIN_LENGTH) {
      return "Phone number must be at least 7 digits";
    }
    if (value.replace(/\D/g, "").length > PHONE_MAX_LENGTH) {
      return "Phone number must not exceed 20 digits";
    }
    return null;
  }, []);

  const validateCountryCode = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Country code is required";
    }
    return null;
  }, []);

  const validatePassword = useCallback((value: string): string | null => {
    if (!value || value === "") {
      return "Password is required";
    }
    if (value.length < PASSWORD_MIN_LENGTH) {
      return "Password must be at least 8 characters long";
    }
    if (!PASSWORD_REGEX.test(value)) {
      return "Password must contain uppercase, lowercase, and numeric characters";
    }
    return null;
  }, []);

  const validateConfirmPassword = useCallback(
    (password: string, confirm: string): string | null => {
      if (!confirm || confirm === "") {
        return "Please confirm your password";
      }
      if (password !== confirm) {
        return "Passwords do not match";
      }
      return null;
    },
    [],
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
    );
    if (commercialImageError)
      newErrors.commercialRegistrationImagePath = commercialImageError;

    const taxImageError = validateTaxRegistrationImage(
      form.taxRegistrationImagePath,
    );
    if (taxImageError) newErrors.taxRegistrationImagePath = taxImageError;

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
    form.taxRegistrationNumber,
    form.commercialRegistrationNumber,
    form.commercialRegistrationImagePath,
    form.taxRegistrationImagePath,
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
    );
    const taxImageError = validateTaxRegistrationImage(
      form.taxRegistrationImagePath,
    );

    // Skip password validation in edit mode
    if (mode === "edit") {
      return (
        !fullNameError &&
        !emailError &&
        !phoneError &&
        !countryCodeError &&
        !taxNumberError &&
        !commercialRegError &&
        !commercialImageError &&
        !taxImageError
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
