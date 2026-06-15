import { useDict } from "@/hooks/useDict";
import {
  isValidSaudiPhoneNumber,
  normalizeSaudiPhoneNumber,
} from "@/utils/saudi.phone";
import { useCallback, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PROTOCOLS = new Set(["http:", "https:"]);

export interface ContactManagementErrors {
  phoneNumber?: string;
  phoneNumbers?: Record<number, string>;
  whatsapp?: string;
  email?: string;
  socialMediaPlatforms?: Record<number, string>;
  socialMediaLinks?: Record<number, string>;
}

export const useContactManagementValidation = () => {
  const dict = useDict();
  const [errors, setErrors] = useState<ContactManagementErrors>({});
  const validation = dict.contact_settings.validation;

  const validatePhoneNumber = useCallback(
    (value: string, required = true): string | null => {
      const trimmed = value.trim();

      if (!trimmed) {
        return required ? validation.phoneRequired : null;
      }
      if (!isValidSaudiPhoneNumber(trimmed)) {
        return validation.phoneInvalid;
      }

      return null;
    },
    [validation],
  );

  const validateEmail = useCallback(
    (value: string): string | null => {
      const trimmed = value.trim();

      if (!trimmed) {
        return validation.emailRequired;
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        return validation.emailInvalid;
      }

      return null;
    },
    [validation],
  );

  const validateSocialMediaLink = useCallback(
    (value: string): string | null => {
      const trimmed = value.trim();

      if (!trimmed) {
        return validation.socialMediaLinkRequired;
      }

      try {
        const url = new URL(trimmed);
        if (!URL_PROTOCOLS.has(url.protocol)) {
          return validation.socialMediaLinkInvalid;
        }
      } catch {
        return validation.socialMediaLinkInvalid;
      }

      return null;
    },
    [validation],
  );

  const validateNewPhoneNumber = useCallback(
    (value: string, existingPhoneNumbers: string[]) => {
      const phoneError = validatePhoneNumber(value);
      if (phoneError) {
        setErrors((current) => ({ ...current, phoneNumber: phoneError }));
        return false;
      }

      const normalizedValue = normalizeSaudiPhoneNumber(value);
      const isDuplicate = existingPhoneNumbers.some(
        (phone) => normalizeSaudiPhoneNumber(phone) === normalizedValue,
      );

      if (isDuplicate) {
        setErrors((current) => ({
          ...current,
          phoneNumber: validation.phoneDuplicate,
        }));
        return false;
      }

      setErrors((current) => ({ ...current, phoneNumber: undefined }));
      return true;
    },
    [validatePhoneNumber, validation],
  );

  const validateForm = useCallback(
    ({
      phoneNumbers,
      whatsapp,
      email,
      socialMediaLinks,
    }: {
      phoneNumbers: string[];
      whatsapp: string;
      email: string;
      socialMediaLinks: { key: string; value: string }[];
    }) => {
      const nextErrors: ContactManagementErrors = {};
      const seenPhoneNumbers = new Map<string, number>();
      const seenSocialMediaPlatforms = new Map<string, number>();

      phoneNumbers.forEach((phoneNumber, index) => {
        const phoneError = validatePhoneNumber(phoneNumber);
        const normalizedPhone = normalizeSaudiPhoneNumber(phoneNumber);
        const firstDuplicateIndex = seenPhoneNumbers.get(normalizedPhone);

        if (phoneError) {
          nextErrors.phoneNumbers = {
            ...nextErrors.phoneNumbers,
            [index]: phoneError,
          };
        } else if (firstDuplicateIndex !== undefined) {
          nextErrors.phoneNumbers = {
            ...nextErrors.phoneNumbers,
            [firstDuplicateIndex]: validation.phoneDuplicate,
            [index]: validation.phoneDuplicate,
          };
        } else {
          seenPhoneNumbers.set(normalizedPhone, index);
        }
      });

      const whatsappError = validatePhoneNumber(whatsapp);
      if (whatsappError) {
        nextErrors.whatsapp = whatsappError;
      }

      const emailError = validateEmail(email);
      if (emailError) {
        nextErrors.email = emailError;
      }

      socialMediaLinks.forEach((link, index) => {
        const platform = link.key.trim();
        const normalizedPlatform = platform.toLowerCase();
        const firstDuplicateIndex =
          seenSocialMediaPlatforms.get(normalizedPlatform);
        const linkError = validateSocialMediaLink(link.value);

        if (!platform) {
          nextErrors.socialMediaPlatforms = {
            ...nextErrors.socialMediaPlatforms,
            [index]: validation.socialMediaPlatformRequired,
          };
        } else if (firstDuplicateIndex !== undefined) {
          nextErrors.socialMediaPlatforms = {
            ...nextErrors.socialMediaPlatforms,
            [firstDuplicateIndex]: validation.socialMediaPlatformDuplicate,
            [index]: validation.socialMediaPlatformDuplicate,
          };
        } else {
          seenSocialMediaPlatforms.set(normalizedPlatform, index);
        }

        if (linkError) {
          nextErrors.socialMediaLinks = {
            ...nextErrors.socialMediaLinks,
            [index]: linkError,
          };
        }
      });

      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [validateEmail, validatePhoneNumber, validateSocialMediaLink, validation],
  );

  const clearError = useCallback((field: keyof ContactManagementErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  return {
    errors,
    clearError,
    validateForm,
    validateNewPhoneNumber,
  };
};
