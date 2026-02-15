import { useState, useCallback, useMemo } from "react";
import { CreatePackageDto, PackageFeatures } from "@/types/package";
import { useDict } from "@/hooks/useDict";

const PACKAGE_NAME_MIN_LENGTH = 3;
const PACKAGE_NAME_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;
const MIN_DURATION = 1;
const MAX_DURATION = 365; // Max 365 days (1 year in days, or could mean months)
const MIN_PRICE = 0.01;

export const useFormValidation = (
  form: CreatePackageDto,
  features: PackageFeatures,
) => {
  const dict = useDict();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePackageName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return "Package name is required";
      }
      if (value.trim().length < PACKAGE_NAME_MIN_LENGTH) {
        return `Package name must be at least ${PACKAGE_NAME_MIN_LENGTH} characters`;
      }
      if (value.trim().length > PACKAGE_NAME_MAX_LENGTH) {
        return `Package name must not exceed ${PACKAGE_NAME_MAX_LENGTH} characters`;
      }
      return null;
    },
    [],
  );

  const validatePackageDuration = useCallback(
    (value: string | number): string | null => {
      if (!value || value === "") {
        return "Package duration is required";
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return "Package duration must be a valid number";
      }
      if (numValue < MIN_DURATION) {
        return `Package duration must be at least ${MIN_DURATION}`;
      }
      if (numValue > MAX_DURATION) {
        return `Package duration must not exceed ${MAX_DURATION}`;
      }
      return null;
    },
    [],
  );

  const validatePackagePrice = useCallback(
    (value: string | number): string | null => {
      if (!value || value === "") {
        return "Package price is required";
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return "Package price must be a valid number";
      }
      if (numValue < MIN_PRICE) {
        return `Package price must be at least ${MIN_PRICE}`;
      }
      return null;
    },
    [],
  );

  const validateFeatures = useCallback(
    (features: PackageFeatures): string | null => {
      const hasAtLeastOneFeature = Object.values(features).some(
        (value) => value === true,
      );
      if (!hasAtLeastOneFeature) {
        return "At least one feature must be enabled";
      }
      return null;
    },
    [],
  );

  const validateDescription = useCallback(
    (value: string): string | null => {
      if (value && value.length > DESCRIPTION_MAX_LENGTH) {
        return `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`;
      }
      return null;
    },
    [],
  );

  const validateMaxWarehouses = useCallback(
    (value: number | undefined): string | null => {
      if (value !== undefined && value !== null) {
        if (isNaN(value)) {
          return "Max warehouses must be a valid number";
        }
        if (value < 1) {
          return "Max warehouses must be at least 1";
        }
      }
      return null;
    },
    [],
  );

  const validateMaxUsers = useCallback(
    (value: number | undefined): string | null => {
      if (value !== undefined && value !== null) {
        if (isNaN(value)) {
          return "Max users must be a valid number";
        }
        if (value < 1) {
          return "Max users must be at least 1";
        }
      }
      return null;
    },
    [],
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.packageName,
    form.packageDuration,
    form.packagePrice,
    form.description,
    form.maxWarehouses,
    form.maxUsers,
    features,
    validatePackageName,
    validatePackageDuration,
    validatePackagePrice,
    validateFeatures,
    validateDescription,
    validateMaxWarehouses,
    validateMaxUsers,
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

    return (
      !packageNameError &&
      !durationError &&
      !priceError &&
      !featuresError &&
      !descriptionError &&
      !maxWarehousesError &&
      !maxUsersError
    );
  }, [
    form.packageName,
    form.packageDuration,
    form.packagePrice,
    form.description,
    form.maxWarehouses,
    form.maxUsers,
    features,
    validatePackageName,
    validatePackageDuration,
    validatePackagePrice,
    validateFeatures,
    validateDescription,
    validateMaxWarehouses,
    validateMaxUsers,
  ]);

  const validateField = useCallback(
    (
      field: keyof CreatePackageDto | "features",
      value: string | number | PackageFeatures | undefined,
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
