"use client";

import SuccessIcon from "@/assets/icons/app/check.success.svg";
import { useLang } from "@/hooks/useLang";
import { Modal, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

export const AUTO_REDIRECT_SUCCESS_MS = 3000;

type AutoRedirectSuccessModalProps = {
  queryParam?: string;
  redirectTo: string;
  message?: string;
  getMessage?: (value: string) => string;
  autoHideMs?: number;
};

export const AutoRedirectSuccessModal = ({
  queryParam = "showSuccess",
  redirectTo,
  message,
  getMessage,
  autoHideMs = AUTO_REDIRECT_SUCCESS_MS,
}: AutoRedirectSuccessModalProps) => {
  const [showSuccess] = useQueryState(queryParam);
  const router = useRouter();
  const lang = useLang();
  const hasRedirected = useRef(false);

  const redirectPath = redirectTo.startsWith("/")
    ? `/${lang}${redirectTo}`
    : `/${lang}/${redirectTo}`;

  const resolvedMessage = showSuccess
    ? getMessage?.(showSuccess) ?? message
    : null;

  useEffect(() => {
    if (!showSuccess || hasRedirected.current) return;

    const timer = setTimeout(() => {
      hasRedirected.current = true;
      router.replace(redirectPath);
    }, autoHideMs);

    return () => clearTimeout(timer);
  }, [showSuccess, router, redirectPath, autoHideMs]);

  const handleClose = () => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    router.replace(redirectPath);
  };

  if (!showSuccess || !resolvedMessage) return null;

  return (
    <Modal
      isOpen
      hideCloseButton
      isDismissable={false}
      onClose={handleClose}
    >
      <ModalContent>
        <div className="grid grid-cols-1 justify-items-center gap-6 p-6">
          <SuccessIcon className="size-20" />
          <p className="text-center text-lg leading-6 font-bold text-[#1E1E1E]">
            {resolvedMessage}
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};
