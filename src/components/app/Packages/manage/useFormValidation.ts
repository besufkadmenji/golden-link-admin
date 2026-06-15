import { useState, useCallback, useMemo } from "react";
import { CreatePackageDto, PackageFeatures } from "@/types/package";
import { useDict } from "@/hooks/useDict";

const PACKAGE_NAME_MIN_LENGTH = 3;
const PACKAGE_NAME_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;
const MIN_DURATION = 1;
const MAX_DURATION = 365;
const MIN_PRICE = 0;

export const useFormValidation = (
  form: CreatePackageDto,
  features: PackageFeatures,
  options?: { requireIcon?: boolean },
) => {
  const dict = useDict();
  const validation = dict.add_new_package_form.validation;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePackageName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return validation.packageName.required;
      }
      if (value.trim().length < PACKAGE_NAME_MIN_LENGTH) {
        return validation.packageName.minLength;
      }
      if (value.trim().length > PACKAGE_NAME_MAX_LENGTH) {
        return validation.packageName.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validatePackageDuration = useCallback(
    (value: string | number): string | null => {
      if (!value || value === "") {
        return validation.packageDuration.required;
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return validation.packageDuration.invalid;
      }
      if (numValue < MIN_DURATION) {
        return validation.packageDuration.min;
      }
      if (numValue > MAX_DURATION) {
        return validation.packageDuration.max;
      }
      return null;
    },
    [validation],
  );

  const validatePackagePrice = useCallback(
    (value: string | number): string | null => {
      if (!value || value === "") {
        return validation.packagePrice.required;
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return validation.packagePrice.invalid;
      }
      if (numValue < MIN_PRICE) {
        return validation.packagePrice.min;
      }
      return null;
    },
    [validation],
  );

  const validateFeatures = useCallback(
    (features: PackageFeatures): string | null => {
      const hasAtLeastOneFeature = Object.values(features).some(
        (value) => value === true,
      );
      if (!hasAtLeastOneFeature) {
        return validation.features.required;
      }
      return null;
    },
    [validation],
  );

  const validateDescription = useCallback(
    (value: string): string | null => {
      if (value && value.length > DESCRIPTION_MAX_LENGTH) {
        return validation.description.maxLength;
      }
      return null;
    },
    [validation],
  );

  const validateMaxWarehouses = useCallback(
    (value: number | undefined): string | null => {
      if (value !== undefined && value !== null) {
        if (isNaN(value)) {
          return validation.maxWarehouses.invalid;
        }
        if (value < 1) {
          return validation.maxWarehouses.min;
        }
      }
      return null;
    },
    [validation],
  );

  const validateMaxUsers = useCallback(
    (value: number | undefined): string | null => {
      if (value !== undefined && value !== null) {
        if (isNaN(value)) {
          return validation.maxUsers.invalid;
        }
        if (value < 1) {
          return validation.maxUsers.min;
        }
      }
      return null;
    },
    [validation],
  );

  const validateIcon = useCallback(
    (icon?: File): string | null => {
      if (options?.requireIcon && !icon) {
        return validation.icon.required;
      }
      return null;
    },
    [options?.requireIcon, validation],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const packageNameError = validatePackageName(form.packageName);
    if (packageNameError) newErrors.packageName = packageNameError;

    const durationError = validatePackageDuration(form.packageDuration);
    if (durationError) newErrors.packageDuration = durationError;

    const priceError = validatePackagePrice(form.packagePrice);
    if (priceError) newErrors.packagePrice = priceError;

    const featuresError = validateFeatures(features);
    if (featuresError) newErrors.features = featuresError;

    if (form.description) {
      const descriptionError = validateDescription(form.description);
      if (descriptionError) newErrors.description = descriptionError;
    }

    if (form.maxWarehouses !== undefined) {
      const maxWarehousesError = validateMaxWarehouses(form.maxWarehouses);
      if (maxWarehousesError) newErrors.maxWarehouses = maxWarehousesError;
    }

    if (form.maxUsers !== undefined) {
      const maxUsersError = validateMaxUsers(form.maxUsers);
      if (maxUsersError) newErrors.maxUsers = maxUsersError;
    }

    const iconError = validateIcon(form.icon);
    if (iconError) newErrors.icon = iconError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.packageName,
    form.packageDuration,
    form.packagePrice,
    form.description,
    form.maxWarehouses,
    form.maxUsers,
    form.icon,
    features,
    validatePackageName,
    validatePackageDuration,
    validatePackagePrice,
    validateFeatures,
    validateDescription,
    validateMaxWarehouses,
    validateMaxUsers,
    validateIcon,
  ]);

  const isFormValid = useMemo(() => {
    const packageNameError = validatePackageName(form.packageName);
    const durationError = validatePackageDuration(form.packageDuration);
    const priceError = validatePackagePrice(form.packagePrice);
    const featuresError = validateFeatures(features);
    const descriptionError = form.description
      ? validateDescription(form.description)
      : null;
    const maxWarehousesError =
      form.maxWarehouses !== undefined
        ? validateMaxWarehouses(form.maxWarehouses)
        : null;
    const maxUsersError =
      form.maxUsers !== undefined ? validateMaxUsers(form.maxUsers) : null;
    const iconError = validateIcon(form.icon);

    return (
      !packageNameError &&
      !durationError &&
      !priceError &&
      !featuresError &&
      !descriptionError &&
      !maxWarehousesError &&
      !maxUsersError &&
      !iconError
    );
  }, [
    form.packageName,
    form.packageDuration,
    form.packagePrice,
    form.description,
    form.maxWarehouses,
    form.maxUsers,
    form.icon,
    features,
    validatePackageName,
    validatePackageDuration,
    validatePackagePrice,
    validateFeatures,
    validateDescription,
    validateMaxWarehouses,
    validateMaxUsers,
    validateIcon,
  ]);

  const validateField = useCallback(
    (
      field: keyof CreatePackageDto | "features",
      value: string | number | PackageFeatures | File | undefined,
    ) => {
      let error = "";

      switch (field) {
        case "packageName":
          error = validatePackageName(value as string) || "";
          break;
        case "packageDuration":
          error = validatePackageDuration(value as string | number) || "";
          break;
        case "packagePrice":
          error = validatePackagePrice(value as string | number) || "";
          break;
        case "features":
          error = validateFeatures(value as PackageFeatures) || "";
          break;
        case "description":
          error = validateDescription(value as string) || "";
          break;
        case "maxWarehouses":
          error = validateMaxWarehouses(value as number) || "";
          break;
        case "maxUsers":
          error = validateMaxUsers(value as number) || "";
          break;
        case "icon":
          error = validateIcon(value as File) || "";
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
      validatePackageName,
      validatePackageDuration,
      validatePackagePrice,
      validateFeatures,
      validateDescription,
      validateMaxWarehouses,
      validateMaxUsers,
      validateIcon,
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
