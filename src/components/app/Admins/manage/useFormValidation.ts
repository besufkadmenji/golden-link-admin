import { useState, useCallback, useMemo } from "react";
import { CreateUserDto } from "@/types/user";
import { Permission } from "@/types/permission";
import { useDict } from "@/hooks/useDict";
import { showErrorMessage } from "@/utils/show.message";

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
  permissionIds: number[] = [],
  permissions: Permission[] = [],
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

  const validatePermissions = useCallback(
    (
      permissionType: string | undefined,
      selectedPermissionIds: number[],
      availablePermissions: Permission[],
    ): string | null => {
      if (permissionType !== "CUSTOM") {
        return null;
      }

      const readPermissionIds = new Set(
        availablePermissions
          .filter((permission) => permission.action === "read")
          .map((permission) => permission.id),
      );
      const hasViewPermission = selectedPermissionIds.some((id) =>
        readPermissionIds.has(id),
      );

      if (!hasViewPermission) {
        return dict.add_new_admin_form.validation.viewPermissionRequired;
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

    const permissionsError = validatePermissions(
      form.permissionType,
      permissionIds,
      permissions,
    );
    if (permissionsError) {
      newErrors.permissions = permissionsError;
      showErrorMessage(permissionsError);
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
    form.permissionType,
    permissionIds,
    permissions,
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
    validatePermissions,
  ]);

  const isFormValid = useMemo(() => {
    const fullNameError = validateFullName(form.fullName);
    const emailError = validateEmail(form.email);
    const phoneError = validatePhoneNumber(form.phoneNumber);
    const countryCodeError = validateCountryCode(form.countryCode);
    const permissionsError = validatePermissions(
      form.permissionType,
      permissionIds,
      permissions,
    );

    // Skip password validation in edit mode
    if (mode === "edit") {
      return (
        !fullNameError &&
        !emailError &&
        !phoneError &&
        !countryCodeError &&
        !permissionsError
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
      !passwordError &&
      !confirmPasswordError &&
      !permissionsError
    );
  }, [
    form.fullName,
    form.email,
    form.phoneNumber,
    form.countryCode,
    form.password,
    form.confirmPassword,
    form.permissionType,
    permissionIds,
    permissions,
    mode,
    validateFullName,
    validateEmail,
    validatePhoneNumber,
    validateCountryCode,
    validatePassword,
    validateConfirmPassword,
    validatePermissions,
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
